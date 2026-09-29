/**
 * Tự Học Marketing Case · API
 * Đăng nhập bằng link email, đồng bộ tiến độ, bảng xếp hạng, cộng đồng, AI có hạn mức.
 * Mọi đường dẫn không khai báo trả 404 để bề mặt tấn công nhỏ nhất có thể.
 *
 * Đặt route nhinthay.xx/api/* trỏ vào Worker này => front-end gọi cùng origin,
 * không cần CORS, không cần cấu hình gì thêm ở trình duyệt.
 */

import { json, month, currentUser } from './lib.js';
import * as auth from './auth.js';
import * as st from './state.js';
import * as cm from './community.js';
import * as ai from './ai.js';
import * as pg from './progress.js';
import * as google from './google.js';
import * as ln from './learn.js';
import * as rm from './realm.js';

/* Chống CSRF: mọi request thay đổi dữ liệu phải mang header riêng.
   Trình duyệt không gửi header tuỳ ý sang origin khác nếu không có CORS — mà API này không bật CORS. */
const MUTATING = new Set(['POST', 'PUT', 'PATCH', 'DELETE']);
const CSRF_EXEMPT = new Set(['/api/subscribe']);

async function route(request, env, url) {
  const p = url.pathname, m = request.method;
  let mm;
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
  if ((mm = p.match(/^\/api\/quiz\/lesson\/([LPB]:[A-Za-z0-9_.-]+)$/)) && m === 'GET') return ln.lessonQuiz(request, env, decodeURIComponent(mm[1]));
  if (p === '/api/answers' && m === 'POST') return ln.answer(request, env);
  if ((mm = p.match(/^\/api\/lessons\/([LPB]:[A-Za-z0-9_.-]+)\/complete$/)) && m === 'POST') return ln.completeLesson(request, env, decodeURIComponent(mm[1]));
  if (p === '/api/review/session' && m === 'GET') return ln.reviewSessionApi(request, env);
  if ((mm = p.match(/^\/api\/exams\/stage\/(s\d{1,2})$/)) && m === 'GET') return ln.stageExamGet(request, env, mm[1]);
  if ((mm = p.match(/^\/api\/exams\/stage\/(s\d{1,2})$/)) && m === 'POST') return ln.stageExamPost(request, env, mm[1]);
  if (p === '/api/placement' && m === 'GET') return ln.placementGet(request, env);
  if (p === '/api/placement' && m === 'POST') return ln.placementPost(request, env);
  if (p === '/api/tracks' && m === 'GET') return ln.tracks(request, env);
  if (p === '/api/me/mastery' && m === 'GET') return ln.mastery(request, env);
  if (p === '/api/me/next' && m === 'GET') return ln.next(request, env);
  if (p === '/api/wallet' && m === 'GET') return rm.wallet(request, env);
  if (p === '/api/shop/buy' && m === 'POST') return rm.buy(request, env);
  if ((mm = p.match(/^\/api\/chests\/([0-9a-f-]{36})\/open$/)) && m === 'POST') return rm.openChest(request, env, mm[1]);
  if (p === '/api/kingdom' && m === 'GET') return rm.kingdom(request, env);
  if (p === '/api/kingdom/visit' && m === 'POST') return rm.visit(request, env);
  if (p === '/api/boss' && m === 'GET') return rm.bossGet(request, env);
  if (p === '/api/boss' && m === 'POST') return rm.bossPost(request, env);
  if (p === '/api/pvp' && m === 'GET') return rm.pvpGet(request, env);
  if (p === '/api/pvp' && m === 'POST') return rm.pvpPost(request, env);
  if (p === '/api/season' && m === 'GET') return rm.season(request, env);
  if (p === '/api/admin/config' && m === 'GET') return ln.adminConfigGet(request, env);
  if ((mm = p.match(/^\/api\/admin\/config\/([a-z_]+)$/)) && m === 'PUT') return ln.adminConfigPut(request, env, mm[1]);
  if (p === '/api/admin/lint' && m === 'GET') return ln.adminLint(request, env);
  if (p === '/api/auth/google/start' && m === 'GET') return google.start(request, env);
  if (p === '/api/auth/google/callback' && m === 'GET') return google.callback(request, env);
  if (p === '/api/auth/providers' && m === 'GET') return json({ email: env.DEV_SHOW_LINK === '1' || !!(env.EMAIL && env.MAIL_FROM && !env.MAIL_FROM.includes('<')), google: !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET) });

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

    /* Không chấm tự luận: mọi việc chấm là tự động và chỉ cho câu có đáp án duy nhất (trắc nghiệm, điền số). */
    if (url.pathname === '/api/grade') return json({ error: 'essay_grading_disabled' }, 410);

    return json({ error: 'not_found' }, 404);
  },
};
