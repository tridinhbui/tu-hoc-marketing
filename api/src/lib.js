/* Tiện ích dùng chung: phản hồi JSON, cookie phiên, người dùng hiện tại, giới hạn tần suất. */

export const json = (data, status = 200, extra = {}) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...extra },
  });

export const now = () => Date.now();
export const today = () => new Date().toISOString().slice(0, 10);
export const month = () => new Date().toISOString().slice(0, 7);
export const rid = () => crypto.randomUUID();
export const str = (v, max) => String(v ?? '').trim().slice(0, max);

export async function sha256(s) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, '0')).join('');
}
export function randomToken(bytes = 32) {
  const a = new Uint8Array(bytes); crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, '0')).join('');
}

export const COOKIE = 'thmc_s';
export function readCookie(req, name) {
  const c = req.headers.get('cookie') || '';
  for (const part of c.split(';')) {
    const [k, ...v] = part.trim().split('=');
    if (k === name) return decodeURIComponent(v.join('='));
  }
  return null;
}
export function sessionCookie(sid, maxAge, secure) {
  return `${COOKIE}=${sid}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${secure ? '; Secure' : ''}`;
}

/* Người dùng từ cookie phiên. Phiên nằm trong KV, hết hạn tự xoá. */
export async function currentUser(req, env) {
  const sid = readCookie(req, COOKIE);
  if (!sid || !/^[a-f0-9]{64}$/.test(sid)) return null;
  const uid = await env.SESSIONS.get(`s:${sid}`);
  if (!uid) return null;
  const u = await env.DB.prepare('SELECT id, email, display_name, persona FROM users WHERE id = ?1').bind(uid).first();
  return u ? { ...u, sid } : null;
}
export const isAdmin = (u, env) =>
  !!u && String(env.ADMIN_EMAILS || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean).includes(u.email);

/* Đếm trong KV theo cửa sổ thời gian. Trả true nếu còn được phép. */
export async function allow(env, key, limit, ttl) {
  const n = Number((await env.SESSIONS.get(key)) || 0);
  if (n >= limit) return false;
  await env.SESSIONS.put(key, String(n + 1), { expirationTtl: ttl });
  return true;
}

export async function body(req, max = 20000) {
  const t = await req.text();
  if (t.length > max) throw Object.assign(new Error('too_large'), { status: 413 });
  try { return JSON.parse(t || '{}'); } catch { throw Object.assign(new Error('bad_json'), { status: 400 }); }
}

export const publicName = (u) => u.display_name || `Học viên ${String(u.id).slice(0, 4).toUpperCase()}`;
