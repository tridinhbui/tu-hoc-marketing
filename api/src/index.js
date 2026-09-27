/**
 * Nhìn thấy · API
 * Phase 0: chỉ nhận email. Mọi thứ khác trả 404 để bề mặt tấn công nhỏ nhất có thể.
 *
 * Đặt route nhinthay.xx/api/* trỏ vào Worker này => front-end gọi cùng origin,
 * không cần CORS, không cần cấu hình gì thêm ở trình duyệt.
 */

import { grade } from './grade.js';
import { RUBRICS } from './rubrics.js';

const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', ...extra },
  });

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/health') return json({ ok: true });

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

      /* Quota. Phase 1 sẽ đổi sang tính theo tài khoản; giờ tạm tính theo IP. */
      const ip = request.headers.get('cf-connecting-ip') || 'unknown';
      const month = new Date().toISOString().slice(0, 7);
      const qkey = `q:grade:${month}:${ip}`;
      const used = Number((await env.SESSIONS.get(qkey)) || 0);
      const limit = Number(env.FREE_GRADES_PER_MONTH || 3);
      if (used >= limit) return json({ error: 'quota_exceeded', used, limit }, 402);

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
        return json({ error: 'grade_failed', detail: String(e.message || e) }, 502);
      }

      await env.SESSIONS.put(qkey, String(used + 1), { expirationTtl: 60 * 60 * 24 * 40 });

      /* Lưu lại để sau này đọc xem rubric có đang chấm đúng không, và AI ăn bao nhiêu tiền. */
      const sid = crypto.randomUUID();
      try {
        await env.DB.batch([
          env.DB.prepare(`INSERT INTO submissions (id, user_id, bench, payload_json, created_at)
                          VALUES (?1, ?2, ?3, ?4, ?5)`)
            .bind(sid, body.user_id || ('anon:' + ip), bench, JSON.stringify(payload), Date.now()),
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
