/* Đăng nhập bằng Google — OAuth 2.0 authorization code + PKCE, OpenID Connect.
   - state + code_verifier lưu trong KV 10 phút, dùng một lần (chống CSRF và chặn đánh tráo mã).
   - id_token nhận TRỰC TIẾP từ token endpoint của Google qua TLS nên theo OIDC Core §3.1.3.7
     không cần tự kiểm chữ ký; vẫn kiểm iss, aud, exp và email_verified.
   - Liên kết: theo (google, sub) trước; nếu chưa có thì theo email đã xác minh (gộp với tài khoản
     đã đăng nhập bằng link email); nếu chưa có nữa thì tạo tài khoản mới. */
import { json, now, rid, randomToken, sessionCookie } from './lib.js';

const AUTH = 'https://accounts.google.com/o/oauth2/v2/auth';
const TOKEN = 'https://oauth2.googleapis.com/token';
const SESSION_TTL = 30 * 24 * 3600;
const ISS = new Set(['https://accounts.google.com', 'accounts.google.com']);

const b64url = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf))).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
const fromB64url = (s) => new TextDecoder().decode(Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), (c) => c.charCodeAt(0)));
const origin = (req, env) => env.APP_ORIGIN || new URL(req.url).origin;
const redirectUri = (req, env) => `${origin(req, env)}/api/auth/google/callback`;
/* Chỉ cho quay về đường dẫn nội bộ, không bao giờ về trang ngoài (chống open redirect). */
const safeNext = (n) => (typeof n === 'string' && /^\/[A-Za-z0-9\-_.\/?=&%]*$/.test(n) && !n.startsWith('//')) ? n : '/tai-khoan.html?dang-nhap=ok';

export async function start(req, env) {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) return json({ error: 'google_not_configured' }, 503);
  const url = new URL(req.url);
  const state = randomToken(16), verifier = randomToken(32);
  const challenge = b64url(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier)));
  await env.SESSIONS.put(`og:${state}`, JSON.stringify({ verifier, next: safeNext(url.searchParams.get('next')) }), { expirationTtl: 600 });
  const q = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID, redirect_uri: redirectUri(req, env), response_type: 'code',
    scope: 'openid email profile', state, code_challenge: challenge, code_challenge_method: 'S256', prompt: 'select_account',
  });
  return Response.redirect(`${AUTH}?${q}`, 302);
}

export async function callback(req, env) {
  const url = new URL(req.url);
  const back = (q) => Response.redirect(`${origin(req, env)}/tai-khoan.html?${q}`, 302);
  if (url.searchParams.get('error')) return back('loi=google-huy');
  const state = url.searchParams.get('state') || '', code = url.searchParams.get('code') || '';
  if (!/^[a-f0-9]{32}$/.test(state) || !code) return back('loi=google');
  const raw = await env.SESSIONS.get(`og:${state}`);
  if (!raw) return back('loi=het-han');
  await env.SESSIONS.delete(`og:${state}`);           // một lần duy nhất
  const { verifier, next } = JSON.parse(raw);

  /* GOOGLE_TOKEN_URL chỉ để chạy thử với máy chủ giả trên máy; production không đặt biến này. */
  const tr = await fetch(env.GOOGLE_TOKEN_URL || TOKEN, {
    method: 'POST', headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ code, client_id: env.GOOGLE_CLIENT_ID, client_secret: env.GOOGLE_CLIENT_SECRET,
      redirect_uri: redirectUri(req, env), grant_type: 'authorization_code', code_verifier: verifier }),
  });
  if (!tr.ok) return back('loi=google');
  const tok = await tr.json();
  let claims;
  try { claims = JSON.parse(fromB64url(String(tok.id_token).split('.')[1])); } catch { return back('loi=google'); }
  const email = String(claims.email || '').toLowerCase();
  if (!ISS.has(claims.iss) || claims.aud !== env.GOOGLE_CLIENT_ID || !(claims.exp * 1000 > now())
      || claims.email_verified !== true || !claims.sub || !email) return back('loi=google');

  const uid = await linkUser(env, 'google', String(claims.sub), email, claims.name);
  const sid = randomToken(32);
  await env.SESSIONS.put(`s:${sid}`, uid, { expirationTtl: SESSION_TTL });
  return new Response(null, { status: 302, headers: {
    location: `${origin(req, env)}${next}`,
    'set-cookie': sessionCookie(sid, SESSION_TTL, url.protocol === 'https:'),
  } });
}

export async function linkUser(env, provider, subject, email, name) {
  const idn = await env.DB.prepare('SELECT user_id FROM user_identities WHERE provider = ?1 AND subject = ?2').bind(provider, subject).first();
  if (idn) return idn.user_id;
  let u = await env.DB.prepare('SELECT id FROM users WHERE email = ?1').bind(email).first();
  if (!u) {
    u = { id: rid() };
    const display = String(name || '').replace(/[\u0000-\u001f<>]/g, '').slice(0, 40) || null;
    await env.DB.prepare('INSERT INTO users (id, email, created_at, display_name) VALUES (?1, ?2, ?3, ?4)').bind(u.id, email, now(), display).run();
  }
  await env.DB.prepare('INSERT OR IGNORE INTO user_identities (provider, subject, user_id, email, created_at) VALUES (?1, ?2, ?3, ?4, ?5)')
    .bind(provider, subject, u.id, email, now()).run();
  return u.id;
}
