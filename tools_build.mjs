/* Sinh trang tĩnh cho từng case và từng thương hiệu.
   Lý do: campaign.html?id=nike và ?id=apple hiện trả về CÙNG một khối HTML —
   cùng <title>, cùng description, cùng OG. Với công cụ tìm kiếm và trình quét
   mạng xã hội, 20 case đang là một trang duy nhất. Đây là lỗi SEO lớn nhất của site. */
import fs from 'node:fs';
import vm from 'node:vm';

const SITE = process.env.SITE_URL || 'https://nhinthay.pages.dev';
const ctx = vm.createContext({});
for (const f of fs.readdirSync('assets/js/data'))
  vm.runInContext(fs.readFileSync('assets/js/data/' + f, 'utf8'), ctx, { filename: f });
const g = (n) => vm.runInContext(n, ctx);

const esc = (s) => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const clip = (s, n) => { s = String(s).replace(/<[^>]+>/g, ''); return s.length > n ? s.slice(0, n - 1) + '…' : s; };

/* Lấy khung của trang gốc rồi thay phần đầu — giữ nguyên toàn bộ JS phía dưới,
   nên trang sinh ra không bao giờ lệch với trang gốc. */
function pageFrom(srcFile, { title, desc, og, canonical, injectId }) {
  let s = fs.readFileSync(srcFile, 'utf8');
  s = s.replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`);
  s = s.replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`);
  s = s.replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(title)}">`);
  s = s.replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`);
  s = s.replace('<meta property="og:type" content="website">',
    `<meta property="og:type" content="article">
<meta property="og:url" content="${canonical}">
<meta property="og:image" content="${SITE}/assets/og/${og}.png">
<meta name="twitter:card" content="summary_large_image">
<link rel="canonical" href="${canonical}">`);
  /* Trang nằm trong thư mục con. Không viết lại từng đường dẫn — link do JS sinh
     (lesson.html?day=..., campaign.html?id=...) nằm ngoài tầm với của build.
     <base href="/"> giải quyết cả hai loại cùng lúc. */
  s = s.replace('<head>', '<head>\n<base href="/">');
  /* id lấy từ chính trang, không lấy từ query string */
  s = s.replace('<script src="assets/js/core.js?v=7"></script>',
    `<script>window.__ID__=${JSON.stringify(injectId)}</script>\n<script src="assets/js/core.js?v=7"></script>`);
  return s;
}

let made = 0;
const urls = [];

fs.mkdirSync('case', { recursive: true });
for (const c of g('CAMPAIGNS')) {
  const url = `${SITE}/case/${c.id}.html`;
  fs.writeFileSync(`case/${c.id}.html`, pageFrom('campaign.html', {
    title: `${c.brand} — ${c.title} (${c.year}) · Case study marketing`,
    desc: clip(`${c.insight} Bối cảnh, big idea, cách thực thi và bài học cho marketer.`, 158),
    og: 'case-' + c.id, canonical: url, injectId: c.id,
  }));
  urls.push([url, '0.8']); made++;
}

fs.mkdirSync('thuong-hieu', { recursive: true });
for (const b of g('BRANDS')) {
  const url = `${SITE}/thuong-hieu/${b.id}.html`;
  fs.writeFileSync(`thuong-hieu/${b.id}.html`, pageFrom('brand.html', {
    title: `Bóc tách thương hiệu ${b.name} · Brand X-Ray`,
    desc: clip(`${b.q[0].q} Tự trả lời trước, phân tích mở ra sau. ${b.cat} · ${b.market}.`, 158),
    og: 'brand-' + b.id, canonical: url, injectId: b.id,
  }));
  urls.push([url, '0.7']); made++;
}

/* sitemap gồm cả trang gốc lẫn trang sinh */
const roots = fs.readdirSync('.').filter(f => f.endsWith('.html') && !f.startsWith('_'));
for (const f of roots) urls.unshift([`${SITE}/${f === 'index.html' ? '' : f}`, f === 'index.html' ? '1.0' : '0.6']);
const today = new Date().toISOString().slice(0, 10);
fs.writeFileSync('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(([u, p]) => `  <url><loc>${u}</loc><lastmod>${today}</lastmod><priority>${p}</priority></url>`).join('\n') +
  `\n</urlset>\n`);

fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);

/* ---- gói dist: chỉ những gì được phép công khai ----
   Deploy cả thư mục gốc sẽ đẩy luôn api/, PLAN.md và tools_* lên mạng. */
const PUBLIC_DIRS = ['assets', 'case', 'thuong-hieu'];
const PUBLIC_FILES = ['sitemap.xml', 'robots.txt'];
const SKIP_HTML = f => f.startsWith('tools_') || f.startsWith('_');

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist', { recursive: true });
for (const d of PUBLIC_DIRS) if (fs.existsSync(d)) fs.cpSync(d, `dist/${d}`, { recursive: true });
for (const f of PUBLIC_FILES) if (fs.existsSync(f)) fs.copyFileSync(f, `dist/${f}`);
let copied = 0;
for (const f of fs.readdirSync('.')) {
  if (!f.endsWith('.html') || SKIP_HTML(f)) continue;
  fs.copyFileSync(f, `dist/${f}`); copied++;
}
const du = (p) => fs.readdirSync(p, { withFileTypes: true })
  .reduce((n, e) => n + (e.isDirectory() ? du(p + '/' + e.name) : fs.statSync(p + '/' + e.name).size), 0);

console.log(`đã sinh ${made} trang · sitemap ${urls.length} URL · SITE=${SITE}`);
console.log(`dist/: ${copied} trang gốc + ${made} trang sinh · ${(du('dist') / 1e6).toFixed(1)} MB`);
console.log(`không đưa vào dist: api/ · tools_* · *.md`);
