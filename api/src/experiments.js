/* Cờ thí nghiệm + sự kiện học theo bước (EXP-01 · lối vào quiz).
   Mọi cờ đọc từ app_config và CHỈ bật khi giá trị đúng bằng `true` (mặc định TẮT; thiếu khoá, sai kiểu, JSON hỏng → tắt).
   Tắt cờ = quay về hành vi cũ ngay (cache cấu hình tối đa 60 giây; admin PUT xoá cache của isolate đó).
   Module này không import bank.json/progress.js để kiểm thử được bằng node thuần: cấu hình được truyền vào. */
import { json, now, str, body, currentUser, isAdmin, allow } from './lib.js';

export const FLAG_KEYS = { quiz_entry: 'exp_quiz_entry', pre_ungraded: 'exp_pre_ungraded', events: 'events_enabled' };

/* cfg: đối tượng cấu hình đã gộp mặc định (loadConfig). Chỉ `=== true` mới là bật. */
export function flagsFromConfig(cfg) {
  const c = cfg || {};
  const quiz_entry = c[FLAG_KEYS.quiz_entry] === true;
  return {
    quiz_entry,
    pre_ungraded: c[FLAG_KEYS.pre_ungraded] === true,
    events: c[FLAG_KEYS.events] === true,
    release: quiz_entry ? 'r1' : 'r0',
  };
}

/* Tài khoản nội bộ: admin (ADMIN_EMAILS), tài khoản hệ thống, hoặc id nằm trong app_config.internal_user_ids. */
export function isInternalUser(u, env, cfg) {
  if (!u) return false;
  if (isAdmin(u, env)) return true;
  if (String(u.email || '').toLowerCase().endsWith('@system.invalid')) return true;
  const ids = Array.isArray(cfg && cfg.internal_user_ids) ? cfg.internal_user_ids : [];
  return ids.includes(u.id);
}

const bool = (v) => v === true || v === false;
const int = (lo, hi) => (v) => Number.isInteger(v) && v >= lo && v <= hi;
const oneOf = (...xs) => (v) => xs.includes(v);

/* Allow-list: sự kiện nào gửi được từ trình duyệt và thuộc tính nào được giữ. Khoá lạ bị bỏ, giá trị sai kiểu bị bỏ.
   Không có chỗ nào cho chuỗi tự do → không thể lưu nội dung người dùng gõ. */
export const CLIENT_EVENTS = {
  lesson_opened:    { mode: oneOf('full', 'intro'), lesson_kind: oneOf('B', 'L', 'P'), is_first_lesson: bool },
  quiz_visible:     { unlocked: bool, answered: int(0, 20) },
  quiz_started:     { n_items: int(0, 20), unlocked_by: oneOf('checkpoint', 'recall', 'state', 'none') },
  quiz_cta_clicked: { answered: int(0, 20) },
  quiz_submitted:   { n_answered: int(0, 20) },
};
/* Do server ghi, không nhận từ trình duyệt. */
export const SERVER_EVENTS = { lesson_completed: { state: oneOf('learned', 'passed'), score_bucket: oneOf('0-39', '40-59', '60-79', '80-100'), is_first_lesson: bool } };

export function cleanProps(spec, props) {
  const out = {};
  if (!props || typeof props !== 'object') return out;
  for (const [k, ok] of Object.entries(spec)) if (k in props && ok(props[k])) out[k] = props[k];
  return out;
}
export const scoreBucket = (s) => (s >= 80 ? '80-100' : s >= 60 ? '60-79' : s >= 40 ? '40-59' : '0-39');

const LSID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/;
const LESSON = /^[LPB]:[A-Za-z0-9_.-]{1,40}$/;
const RELEASE = /^r\d{1,2}$/;
export const vnDay = (t = now()) => new Date(t + 7 * 3600e3).toISOString().slice(0, 10);

const INSERT = `INSERT OR IGNORE INTO learning_events (idem, ts, day_vn, user_id, lsid, lesson_id, event, props, device_class, release, is_internal)
  VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11)`;

/* POST /api/events — lô ≤20 sự kiện từ trang bài. user_id lấy từ phiên (trình duyệt không gửi danh tính).
   Cờ events_enabled tắt → không ghi gì, trả ok để trình duyệt không thử lại.
   Giới hạn tần suất theo LÔ (1 thao tác KV/lô), không theo từng sự kiện. Lỗi D1 không bao giờ làm hỏng việc học. */
export async function postEvents(req, env, cfg) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  if (!flagsFromConfig(cfg).events) return json({ ok: true, disabled: true });
  const b = await body(req, 8000);
  const list = Array.isArray(b.events) ? b.events.slice(0, 20) : [];
  if (!list.length) return json({ ok: true, accepted: 0 });
  if (!(await allow(env, `rl:ev:${u.id}`, 60, 600))) return json({ ok: true, dropped: 'rate_limited' });
  const internal = isInternalUser(u, env, cfg) ? 1 : 0, t = now(), day = vnDay(t);
  const stmts = [];
  for (const e of list) {
    const spec = e && CLIENT_EVENTS[e.event];
    const lsid = e && String(e.lsid || '');
    if (!spec || !LSID.test(lsid)) continue;
    const lesson = LESSON.test(String(e.lesson_id || '')) ? String(e.lesson_id) : null;
    const release = RELEASE.test(String(e.release || '')) ? String(e.release) : 'r0';
    const device = e.device_class === 'mobile' ? 'mobile' : 'desktop';
    const props = cleanProps(spec, e.props);
    stmts.push([`${lsid}:${e.event}`, t, day, u.id, lsid, lesson, e.event, JSON.stringify(props), device, release, internal]);
  }
  if (!stmts.length) return json({ ok: true, accepted: 0 });
  /* Mọi lỗi lưu trữ (kể cả chưa áp dụng migration) → báo ok để trình duyệt không thử lại; việc học không bị ảnh hưởng. */
  try { await env.DB.batch(stmts.map((a) => env.DB.prepare(INSERT).bind(...a))); } catch { return json({ ok: true, dropped: 'storage' }); }
  return json({ ok: true, accepted: stmts.length });
}

/* Server ghi `lesson_completed` đúng một lần cho (người × bài): idem theo cặp nên chấm lại/nộp lại không tạo dòng thứ hai.
   Không có sự kiện thì không có gì thay đổi cho việc chấm bài: mọi lỗi nuốt tại đây. */
export async function recordLessonCompleted(env, cfg, u, lessonKey, { state, score, isFirst, lsid, release }) {
  try {
    if (!flagsFromConfig(cfg).events || !u) return false;
    const spec = SERVER_EVENTS.lesson_completed;
    const props = cleanProps(spec, { state, score_bucket: scoreBucket(score), is_first_lesson: !!isFirst });
    const t = now();
    await env.DB.prepare(INSERT).bind(`lc:${u.id}:${lessonKey}`, t, vnDay(t), u.id, LSID.test(String(lsid || '')) ? lsid : 'server', lessonKey,
      'lesson_completed', JSON.stringify(props), null, RELEASE.test(String(release || '')) ? release : 'r0', isInternalUser(u, env, cfg) ? 1 : 0).run();
    return true;
  } catch { return false; }
}
