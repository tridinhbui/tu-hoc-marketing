/* Đăng nhập bằng link gửi qua email. Không có mật khẩu để lộ.
   Link dùng được một lần, sống 15 phút. Phiên sống 30 ngày trong KV. */
import { json, now, rid, str, sha256, randomToken, sessionCookie, currentUser, allow, body, publicName, COOKIE } from './lib.js';

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const LINK_TTL = 15 * 60, SESSION_TTL = 30 * 24 * 3600;

export async function start(req, env) {
  const b = await body(req, 2000);
  const email = str(b.email, 200).toLowerCase();
  if (!EMAIL.test(email)) return json({ error: 'email_invalid' }, 400);

  const ip = req.headers.get('cf-connecting-ip') || 'unknown';
  if (!(await allow(env, `rl:auth:ip:${ip}`, 8, 3600))) return json({ error: 'rate_limited' }, 429);
  if (!(await allow(env, `rl:auth:em:${await sha256(email)}`, 3, 900))) return json({ error: 'rate_limited' }, 429);

  const token = randomToken(32);
  await env.SESSIONS.put(`ml:${await sha256(token)}`, email, { expirationTtl: LINK_TTL });
  const origin = env.APP_ORIGIN || new URL(req.url).origin;
  const link = `${origin}/api/auth/verify?t=${token}`;

  /* Môi trường dev: trả link luôn, không gửi mail. Biến này chỉ đặt trong .dev.vars. */
  if (env.DEV_SHOW_LINK === '1') return json({ ok: true, dev_link: link });
  if (!env.EMAIL) return json({ error: 'email_not_configured' }, 503);

  await env.EMAIL.send({
    to: email,
    from: { email: env.MAIL_FROM, name: 'Tự Học Marketing Case' },
    subject: 'Link đăng nhập Tự Học Marketing Case',
    text: `Bấm link dưới đây để đăng nhập (dùng được một lần, hết hạn sau 15 phút):\n\n${link}\n\nNếu bạn không yêu cầu, cứ bỏ qua email này.`,
    html: `<p>Bấm để đăng nhập — link dùng được một lần, hết hạn sau 15 phút:</p>
<p><a href="${link}">Đăng nhập Tự Học Marketing Case</a></p>
<p style="color:#666">Nếu bạn không yêu cầu, cứ bỏ qua email này.</p>`,
  });
  return json({ ok: true });
}

export async function verify(req, env) {
  const url = new URL(req.url);
  const t = url.searchParams.get('t') || '';
  const back = (q) => Response.redirect(`${env.APP_ORIGIN || url.origin}/tai-khoan.html?${q}`, 302);
  if (!/^[a-f0-9]{64}$/.test(t)) return back('loi=link');
  const key = `ml:${await sha256(t)}`;
  const email = await env.SESSIONS.get(key);
  if (!email) return back('loi=het-han');
  await env.SESSIONS.delete(key);                     // một lần duy nhất

  let u = await env.DB.prepare('SELECT id FROM users WHERE email = ?1').bind(email).first();
  if (!u) {
    u = { id: rid() };
    await env.DB.prepare('INSERT INTO users (id, email, created_at) VALUES (?1, ?2, ?3)').bind(u.id, email, now()).run();
  }
  const sid = randomToken(32);
  await env.SESSIONS.put(`s:${sid}`, u.id, { expirationTtl: SESSION_TTL });
  const res = back('dang-nhap=ok');
  return new Response(null, { status: 302, headers: {
    location: res.headers.get('location'),
    'set-cookie': sessionCookie(sid, SESSION_TTL, url.protocol === 'https:'),
  } });
}

export async function logout(req, env) {
  const u = await currentUser(req, env);
  if (u) await env.SESSIONS.delete(`s:${u.sid}`);
  return json({ ok: true }, 200, { 'set-cookie': `${COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0` });
}

export async function me(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ user: null });
  return json({ user: { id: u.id, email: u.email, name: publicName(u), display_name: u.display_name, persona: u.persona } });
}

export async function updateMe(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 2000);
  const name = str(b.display_name, 40).replace(/[\u0000-\u001f<>]/g, '');
  if (name && name.length < 2) return json({ error: 'name_too_short' }, 400);
  const persona = ['student', 'mt', 'comp', 'worker'].includes(b.persona) ? b.persona : u.persona;
  await env.DB.prepare('UPDATE users SET display_name = ?1, persona = ?2 WHERE id = ?3').bind(name || null, persona || null, u.id).run();
  return json({ ok: true, name: name || publicName({ id: u.id }) });
}
