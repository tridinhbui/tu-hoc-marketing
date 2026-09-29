/**
 * Tự Học Marketing Case · API
 * Đăng nhập bằng link email, đồng bộ tiến độ, bảng xếp hạng, cộng đồng, AI có hạn mức.
 * Mọi đường dẫn không khai báo trả 404 để bề mặt tấn công nhỏ nhất có thể.
 *
 * Đặt route nhinthay.xx/api/* trỏ vào Worker này => front-end gọi cùng origin,
 * không cần CORS, không cần cấu hình gì thêm ở trình duyệt.
 */

import { grade } from './grade.js';
import { RUBRICS } from './rubrics.js';
import { json, month, currentUser } from './lib.js';
import * as auth from './auth.js';
import * as st from './state.js';
import * as cm from './community.js';
import * as ai from './ai.js';
import * as pg from './progress.js';
import * as google from './google.js';

/* Chống CSRF: mọi request thay đổi dữ liệu phải mang header riêng.
   Trình duyệt không gửi header tuỳ ý sang origin khác nếu không có CORS — mà API này không bật CORS. */
const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const CSRF_EXEMPT = new Set(['/api/subscribe']);

async function route(request, env, url) {
  const p = url.pathname, m = request.method;
  if (MUTATING.has(m) && !CSRF_EXEMPT.has(p) && request.headers.get('x-thmc') !== '1') return json({ error: 'csrf' }, 403);

  if (p === '/api/auth/start' && m === 'POST') return auth.start(request, env);
  if (p === '/api/auth/verify' && m === 'GET') return auth.verify(request, env);
  if (p === '/api/auth/logout' && m === 'POST') return auth.logout(request, env);
  if (p === '/api/me' && m === 'GET') return auth.me(request, env);
  if (p === '/api/me' && m === 'PATCH') return auth.updateMe(request, env);

  if (p === '/api/state' && m === 'GET') return st.getState(request, env);
  if (p === '/api/state' && m === 'PUT') return st.putState(request, env);
  if (p === '/api/leaderboard' && m === 'GET') return st.leaderboard(request, env);
  if (p === '/api/me/stats' && m === 'GET') return pg.myStats(request, env);
  if (p === '/api/quests/claim' && m === 'POST') return pg.claimQuest(request, env);
  if (p === '/api/auth/google/start' && m === 'GET') return google.start(request, env);
  if (p === '/api/auth/google/callback' && m === 'GET') return google.callback(request, env);
  if (p === '/api/auth/providers' && m === 'GET') return json({ email: !!(env.EMAIL || env.DEV_SHOW_LINK === '1'), google: !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) });

  /* Số thật cho trang chủ. Chỉ đếm, không lộ ai; cache ngắn để trang chủ không gõ D1 mỗi lượt xem. */
  if (p === '/api/stats' && m === 'GET') {
    const r = await env.DB.prepare(`SELECT
        (SELECT COUNT(*) FROM users) AS learners,
        (SELECT COUNT(*) FROM users WHERE created_at > ?1) AS joined_7d`)
      .bind(Date.now() - 7 * 864e5).first();
    return json({ learners: r?.learners || 0, joined_7d: r?.joined_7d || 0 }, 200,
                { 'cache-control': 'public, max-age=300' });
  }

  if (p === '/api/posts' && m === 'GET') return cm.listPosts(request, env);
  if (p === '/api/posts' && m === 'POST') return cm.createPost(request, env);
  let mm;
  if ((mm = p.match(/^\/api\/posts\/([0-9a-f-]{36})$/)) && m === 'GET') return cm.getPost(request, env, mm[1]);
  if ((mm = p.match(/^\/api\/posts\/([0-9a-f-]{36})\/comments$/)) && m === 'POST') return cm.createComment(request, env, mm[1]);
  if ((mm = p.match(/^\/api\/posts\/([0-9a-f-]{36})\/like$/)) && m === 'POST') return cm.toggleLike(request, env, mm[1]);
  if (p === '/api/report' && m === 'POST') return cm.report(request, env);
  if (p === '/api/admin/queue' && m === 'GET') return cm.adminQueue(request, env);
  if (p === '/api/admin/moderate' && m === 'POST') return cm.moderate(request, env);

  if (p === '/api/ai/quota' && m === 'GET') return ai.quotas(request, env);
  if (p === '/api/ai/interview' && m === 'POST') return ai.interview(request, env);
  if (p === '/api/ai/assist' && m === 'POST') return ai.assist(request, env);
  return null;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    /* Khi chạy thử cục bộ bằng `wrangler dev --assets`, mọi thứ ngoài /api/ là file tĩnh. */
    if (!url.pathname.startsWith('/api/') && env.ASSETS) return env.ASSETS.fetch(request);

    if (url.pathname === '/api/health') return json({ ok: true });

    try {
      const r = await route(request, env, url);
      if (r) return r;
    } catch (e) {
      if (e && e.status) return json({ error: e.message }, e.status);
      return json({ error: 'server_error' }, 500);
    }

    if (url.pathname === '/api/subscribe' && request.method === 'POST') {
      let body;
      try { body = await request.json(); } catch { return json({ error: 'bad_json' }, 400); }

      const email = String(body.email || '').trim().toLowerCase();
      const source = String(body.source || '').slice(0, 120);
      if (!EMAIL.test(email) || email.length > 200) return json({ error: 'email_invalid' }, 400);

      /* Chặn spam theo IP: 5 lần mỗi giờ là quá đủ cho người thật. */
      const ip = request.headers.get('cf-connecting-ip') || 'unknown';
      const key = `rl:sub:${ip}`;
      const hits = Number((await env.SESSIONS.get(key)) || 0);
      if (hits >= 5) return json({ error: 'rate_limited' }, 429);
      await env.SESSIONS.put(key, String(hits + 1), { expirationTtl: 3600 });

      await env.DB.prepare(
        `INSERT INTO subscribers (email, source, created_at) VALUES (?1, ?2, ?3)
         ON CONFLICT(email) DO UPDATE SET source = excluded.source`
      ).bind(email, source, Date.now()).run();

      return json({ ok: true });
    }

    if (url.pathname === '/api/grade' && request.method === 'POST') {
      if (!env.ANTHROPIC_API_KEY) return json({ error: 'not_configured' }, 503);

      let body;
      try { body = await request.json(); } catch { return json({ error: 'bad_json' }, 400); }
      const bench = String(body.bench || '');
      if (!RUBRICS[bench]) return json({ error: 'unknown_bench' }, 400);

      /* Hạn mức: đã đăng nhập thì tính theo người (D1), chưa đăng nhập thì tạm tính theo IP. */
      if (request.headers.get('x-thmc') !== '1') return json({ error: 'csrf' }, 403);
      const ip = request.headers.get('cf-connecting-ip') || 'unknown';
      const user = await currentUser(request, env);
      let used, limit;
      if (user) {
        limit = Number(env.AI_GRADE_PER_MONTH || 5);
        const q = await ai.useQuota(env, user.id, 'grade', month(), limit);
        if (!q.ok) return json({ error: 'quota_exceeded', used: q.used, limit }, 402);
        used = q.used - 1;
      } else {
        limit = Number(env.FREE_GRADES_PER_MONTH || 3);
        used = Number((await env.SESSIONS.get(`q:grade:${month()}:${ip}`)) || 0);
        if (used >= limit) return json({ error: 'quota_exceeded', used, limit }, 402);
      }

      const payload = body.payload || {};
      if (JSON.stringify(payload).length > 20000) return json({ error: 'too_large' }, 413);

      let verdict;
      try {
        verdict = await grade({
          bench, payload, extra: body.extra || {},
          apiKey: env.ANTHROPIC_API_KEY,
          model: env.GRADING_MODEL || 'claude-opus-5',
        });
      } catch (e) {
        if (user) await env.DB.prepare('UPDATE ai_usage SET count = MAX(count - 1, 0) WHERE user_id = ?1 AND kind = ?2 AND period = ?3')
          .bind(user.id, 'grade', month()).run();
        return json({ error: 'grade_failed', detail: String(e.message || e) }, 502);
      }

      if (!user) await env.SESSIONS.put(`q:grade:${month()}:${ip}`, String(used + 1), { expirationTtl: 60 * 60 * 24 * 40 });

      /* Lưu lại để sau này đọc xem rubric có đang chấm đúng không, và AI ăn bao nhiêu tiền. */
      const sid = crypto.randomUUID();
      try {
        await env.DB.batch([
          env.DB.prepare(`INSERT INTO submissions (id, user_id, bench, payload_json, created_at)
                          VALUES (?1, ?2, ?3, ?4, ?5)`)
            .bind(sid, user ? user.id : ('anon:' + ip), bench, JSON.stringify(payload), Date.now()),
          env.DB.prepare(`INSERT INTO feedback (id, submission_id, model, rubric_version, verdict_json, cost_usd, created_at)
                          VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)`)
            .bind(crypto.randomUUID(), sid, verdict.model || 'none', verdict.rubric_version,
                  JSON.stringify(verdict), verdict.cost_usd, Date.now()),
        ]);
      } catch { /* lưu hỏng thì vẫn trả nhận xét cho người học */ }

      return json({ ...verdict, quota: { used: used + 1, limit } });
    }

    return json({ error: 'not_found' }, 404);
  },
};
