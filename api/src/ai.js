/* AI có hạn mức mỗi người: phỏng vấn mô phỏng và trợ lý nổi.
   Hạn mức đếm trong D1 theo người — không theo IP — vì phải đăng nhập mới dùng được. */
import Anthropic from '@anthropic-ai/sdk';
import { json, now, rid, str, month, today, currentUser, body } from './lib.js';

const MODEL = 'claude-opus-5';
const PRICE = { in: 5, out: 25 };            // $ / 1M token, dùng để ghi chi phí mỗi lượt
const MAX_TURNS = 6;                          // số câu trả lời của người học trong một buổi phỏng vấn

export async function useQuota(env, uid, kind, period, limit) {
  const r = await env.DB.prepare('SELECT count FROM ai_usage WHERE user_id = ?1 AND kind = ?2 AND period = ?3').bind(uid, kind, period).first();
  const used = r ? r.count : 0;
  if (used >= limit) return { ok: false, used, limit };
  await env.DB.prepare(`INSERT INTO ai_usage (user_id, kind, period, count) VALUES (?1, ?2, ?3, 1)
    ON CONFLICT(user_id, kind, period) DO UPDATE SET count = count + 1`).bind(uid, kind, period).run();
  return { ok: true, used: used + 1, limit };
}
async function refund(env, uid, kind, period) {
  await env.DB.prepare('UPDATE ai_usage SET count = MAX(count - 1, 0) WHERE user_id = ?1 AND kind = ?2 AND period = ?3').bind(uid, kind, period).run();
}

/* Một lượt gọi Claude. Bật fallback mặc định của server: nếu model từ chối vì bộ lọc an toàn,
   API tự chạy lại trên model Anthropic khuyến nghị cho loại từ chối đó. */
async function ask(env, uid, kind, { system, messages, maxTokens, effort }) {
  const client = new Anthropic({ apiKey: env.ANTHROPIC_API_KEY });
  const res = await client.beta.messages.create({
    model: MODEL,
    max_tokens: maxTokens,
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    output_config: { effort },
    system: [{ type: 'text', text: system, cache_control: { type: 'ephemeral' } }],
    messages,
  });
  const u = res.usage || {};
  const inTok = (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
  const cost = (inTok / 1e6) * PRICE.in + ((u.output_tokens || 0) / 1e6) * PRICE.out;
  try {
    await env.DB.prepare('INSERT INTO ai_calls (id, user_id, kind, model, cost_usd, created_at) VALUES (?1, ?2, ?3, ?4, ?5, ?6)')
      .bind(rid(), uid, kind, res.model || MODEL, Number(cost.toFixed(6)), now()).run();
  } catch { /* ghi chi phí hỏng thì vẫn trả lời người học */ }
  if (res.stop_reason === 'refusal') return { text: null, refused: true, content: res.content };
  const text = res.content.filter((b) => b.type === 'text').map((b) => b.text).join('\n').trim();
  return { text, refused: false, content: res.content };
}

/* ---------------- phỏng vấn mô phỏng ---------------- */
const TRACKS = {
  mt: 'vòng phỏng vấn Management Trainee khối marketing của một công ty hàng tiêu dùng tại Việt Nam',
  brand: 'vị trí Brand Executive / Assistant Brand Manager',
  perf: 'vị trí Performance Marketing Specialist ở một công ty thương mại điện tử',
  case: 'vòng hỏi đáp sau phần thuyết trình của một cuộc thi case marketing',
};
const INTERVIEW_SYSTEM = (track) => `Bạn đóng vai người phỏng vấn cho ${TRACKS[track]}. Người đối diện là một người học marketing đang luyện tập.

Cách bạn làm việc:
- Mở đầu bằng một tình huống kinh doanh ngắn có vài con số (tự đặt, ghi rõ là số liệu minh hoạ), rồi hỏi đúng một câu.
- Mỗi lượt chỉ hỏi một câu. Khi câu trả lời thiếu số, mơ hồ, hoặc nhảy thẳng tới giải pháp mà chưa nói vì sao, hãy hỏi vặn đúng chỗ đó — như một người phỏng vấn thật.
- Không giảng bài và không đưa đáp án trong lúc phỏng vấn. Nếu người học hỏi ngược lại, trả lời ngắn như người phỏng vấn thật rồi quay về câu hỏi.
- Viết tiếng Việt tự nhiên, xưng "tôi" và gọi người học là "bạn". Mỗi lượt ngắn, không quá khoảng 120 chữ.

Khi nhận được chỉ dẫn kết thúc buổi, dừng hỏi và viết phần nhận xét:
Nhận xét theo bốn tiêu chí — cấu trúc, tính toán, insight, đề xuất — mỗi tiêu chí một đến hai câu, dựa vào chính những gì người học đã nói. Sau đó nêu một điều họ làm tốt nhất và một việc cụ thể nên luyện tiếp. Không cho điểm số.`;

export async function interview(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'not_configured' }, 503);
  const b = await body(req, 8000);
  const limit = Number(env.AI_INTERVIEW_PER_MONTH || 3);

  let sid = str(b.session_id, 64), sess;
  if (!sid) {
    const track = TRACKS[b.track] ? b.track : 'mt';
    const q = await useQuota(env, u.id, 'interview', month(), limit);
    if (!q.ok) return json({ error: 'quota_exceeded', used: q.used, limit }, 402);
    sid = rid();
    sess = { uid: u.id, track, msgs: [{ role: 'user', content: 'Chào anh/chị, em sẵn sàng rồi ạ.' }], turns: 0, done: false };
    try {
      const r = await ask(env, u.id, 'interview', { system: INTERVIEW_SYSTEM(track), messages: sess.msgs, maxTokens: 2000, effort: 'medium' });
      if (r.refused) throw new Error('refused');
      sess.msgs.push({ role: 'assistant', content: r.content });
      await env.SESSIONS.put(`iv:${sid}`, JSON.stringify(sess), { expirationTtl: 3 * 3600 });
      return json({ session_id: sid, reply: r.text, turns_left: MAX_TURNS, done: false, quota: { used: q.used, limit } });
    } catch (e) {
      await refund(env, u.id, 'interview', month());
      return json({ error: 'ai_failed' }, 502);
    }
  }

  const raw = await env.SESSIONS.get(`iv:${sid}`);
  if (!raw) return json({ error: 'session_expired' }, 404);
  sess = JSON.parse(raw);
  if (sess.uid !== u.id) return json({ error: 'forbidden' }, 403);
  if (sess.done) return json({ error: 'session_done' }, 409);
  const msg = str(b.message, 1500);
  if (msg.length < 2) return json({ error: 'empty_message' }, 400);

  sess.turns++;
  const finish = sess.turns >= MAX_TURNS || b.finish === true;
  sess.msgs.push({ role: 'user', content: msg });
  const messages = finish
    ? [...sess.msgs, { role: 'system', content: 'Buổi phỏng vấn kết thúc ở đây. Dừng hỏi và viết phần nhận xét như đã thống nhất.' }]
    : sess.msgs;
  try {
    const r = await ask(env, u.id, 'interview', { system: INTERVIEW_SYSTEM(sess.track), messages, maxTokens: finish ? 4000 : 2000, effort: 'medium' });
    const reply = r.refused ? 'Tôi không tiếp tục được với câu trả lời này. Bạn thử diễn đạt lại theo hướng khác nhé.' : r.text;
    if (r.refused) { sess.msgs.pop(); sess.turns--; }
    else {
      if (finish) sess.msgs.push({ role: 'system', content: 'Buổi phỏng vấn kết thúc ở đây. Dừng hỏi và viết phần nhận xét như đã thống nhất.' });
      sess.msgs.push({ role: 'assistant', content: r.content });
      sess.done = finish;
    }
    await env.SESSIONS.put(`iv:${sid}`, JSON.stringify(sess), { expirationTtl: 3 * 3600 });
    return json({ session_id: sid, reply, turns_left: Math.max(0, MAX_TURNS - sess.turns), done: sess.done });
  } catch (e) {
    sess.msgs.pop(); sess.turns--;
    return json({ error: 'ai_failed' }, 502);
  }
}

/* ---------------- trợ lý nổi ---------------- */
const ASSIST_SYSTEM = `Bạn là trợ lý học tập của Tự Học Marketing Case, một nền tảng tự học marketing miễn phí cho người Việt.
Trả lời câu hỏi về marketing ngắn gọn, bằng tiếng Việt tự nhiên, giữ nguyên thuật ngữ tiếng Anh ngành vẫn dùng (CTR, ROAS, brand equity).
Khi có ví dụ số, ghi rõ đó là số minh hoạ. Không bịa số liệu về thương hiệu thật.
Nếu gợi ý nên học gì tiếp, chỉ chọn trong danh sách bài học được gửi kèm và ghi đúng mã bài (ví dụ P:cac, L:65) để giao diện tạo được đường dẫn.
Nếu câu hỏi nằm ngoài việc học marketing, nói ngắn rằng bạn chỉ hỗ trợ việc học marketing trên nền tảng này.`;

export async function assist(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  if (!env.ANTHROPIC_API_KEY) return json({ error: 'not_configured' }, 503);
  const b = await body(req, 12000);
  const q = str(b.question, 600);
  if (q.length < 3) return json({ error: 'empty_question' }, 400);
  const ctx = b.context && typeof b.context === 'object' ? JSON.stringify(b.context).slice(0, 8000) : '{}';
  const limit = Number(env.AI_ASSIST_PER_DAY || 10);
  const quota = await useQuota(env, u.id, 'assist', today(), limit);
  if (!quota.ok) return json({ error: 'quota_exceeded', used: quota.used, limit }, 402);
  try {
    const r = await ask(env, u.id, 'assist', {
      system: ASSIST_SYSTEM, maxTokens: 1500, effort: 'low',
      messages: [{ role: 'user', content: `Tiến độ và danh sách bài của tôi (JSON):\n${ctx}\n\nCâu hỏi: ${q}` }],
    });
    return json({ reply: r.refused ? 'Mình không trả lời được câu này. Bạn thử hỏi theo hướng khác nhé.' : r.text, quota: { used: quota.used, limit } });
  } catch {
    await refund(env, u.id, 'assist', today());
    return json({ error: 'ai_failed' }, 502);
  }
}

export async function quotas(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const get = async (kind, period) => (await env.DB.prepare('SELECT count FROM ai_usage WHERE user_id = ?1 AND kind = ?2 AND period = ?3').bind(u.id, kind, period).first())?.count || 0;
  return json({
    configured: !!env.ANTHROPIC_API_KEY,
    interview: { used: await get('interview', month()), limit: Number(env.AI_INTERVIEW_PER_MONTH || 3), per: 'tháng' },
    grade: { used: await get('grade', month()), limit: Number(env.AI_GRADE_PER_MONTH || 5), per: 'tháng' },
    assist: { used: await get('assist', today()), limit: Number(env.AI_ASSIST_PER_DAY || 10), per: 'ngày' },
  });
}
