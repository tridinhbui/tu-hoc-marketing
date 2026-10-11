/* Bảng thuật ngữ (assets/js/data/glossary.js): cấu trúc, liên kết bài, độ phủ thuật ngữ bắt buộc, công thức chuẩn. */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { rel, loadLessons } from './helpers.mjs';

const ctx = vm.createContext({ console });
vm.runInContext(fs.readFileSync(rel('assets/js/data/glossary.js'), 'utf8'), ctx, { filename: 'glossary.js' });
const GLOSSARY = vm.runInContext('GLOSSARY', ctx);
const GROUPS = vm.runInContext('GLOSSARY_GROUPS', ctx);
const LESSON_IDS = new Set(loadLessons().map((l) => l.id));

/* Giống normVN trong app.js, thêm chuẩn hoá dấu toán học để so chuỗi công thức. */
const norm = (t) => String(t || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd')
  .replace(/[−–]/g, '-').replace(/\s+/g, ' ').trim();
const byId = Object.fromEntries(GLOSSARY.map((g) => [g.id, g]));

test('có khoảng 70 thuật ngữ trở lên', () => {
  assert.ok(GLOSSARY.length >= 65, `chỉ có ${GLOSSARY.length}`);
});

test('id duy nhất, dạng neo hợp lệ, không đụng id của khung trang', () => {
  const seen = new Set(), bad = [];
  const reserved = new Set(['main', 'app', 'toast', 'acct', 'topxpchip', 'q', 'list', 'az', 'groups', 'count']);
  for (const g of GLOSSARY) {
    if (seen.has(g.id)) bad.push(`trùng ${g.id}`);
    seen.add(g.id);
    if (!/^[a-z0-9][a-z0-9-]*$/.test(g.id)) bad.push(`id xấu ${g.id}`);
    if (reserved.has(g.id.toLowerCase())) bad.push(`id dành riêng ${g.id}`);
  }
  assert.deepEqual(bad, []);
});

test('không trùng tên tiếng Việt', () => {
  const seen = new Map(), dup = [];
  for (const g of GLOSSARY) { const k = norm(g.vi); if (seen.has(k)) dup.push(g.vi); seen.set(k, 1); }
  assert.deepEqual(dup, []);
});

test('mỗi mục đủ trường, đúng nhóm, def ≥ 40 ký tự', () => {
  const gids = new Set(GROUPS.map((x) => x.id)), bad = [];
  for (const g of GLOSSARY) {
    for (const k of ['vi', 'en', 'def', 'confuse', 'example']) if (!String(g[k] || '').trim()) bad.push(`${g.id}: thiếu ${k}`);
    if (String(g.def || '').length < 40) bad.push(`${g.id}: def quá ngắn`);
    if (!gids.has(g.group)) bad.push(`${g.id}: nhóm lạ ${g.group}`);
    if (typeof g.formula !== 'string') bad.push(`${g.id}: formula phải là chuỗi`);
    if (!Array.isArray(g.lessons) || !g.lessons.length) bad.push(`${g.id}: thiếu lessons`);
  }
  assert.deepEqual(bad, []);
  for (const gr of GROUPS) assert.ok(GLOSSARY.some((g) => g.group === gr.id), `nhóm rỗng: ${gr.t}`);
});

test('mọi lessons[] trỏ tới bài có thật', () => {
  const bad = [];
  for (const g of GLOSSARY) for (const l of g.lessons) if (!LESSON_IDS.has(l)) bad.push(`${g.id} → ${l}`);
  assert.deepEqual(bad, []);
});

test('đủ thuật ngữ bắt buộc (khớp theo vi hoặc en)', () => {
  /* mỗi mục bắt buộc: danh sách cụm khoá; khớp nếu một cụm nằm trong vi hoặc en đã chuẩn hoá. */
  const REQUIRED = {
    'marketing': ['marketing'], 'STP': ['stp'], 'phân khúc': ['phan khuc'], 'định vị': ['dinh vi', 'positioning'],
    '4P/7P': ['4p'], 'value proposition': ['value proposition'], 'insight': ['insight'], 'JTBD': ['jtbd', 'jobs-to-be-done'],
    'persona': ['persona'], 'funnel/phễu': ['phieu', 'funnel'], 'customer journey': ['customer journey'],
    'brand equity': ['brand equity'], 'mental availability': ['mental availability'], 'physical availability': ['physical availability'],
    'CEP': ['cep', 'category entry'], 'distinctive assets': ['distinctive'], 'share of voice': ['share of voice'],
    'reach': ['reach'], 'tần suất': ['tan suat', 'frequency'], 'GRP': ['grp'], 'CPM': ['cpm'], 'CPC': ['cpc'], 'CTR': ['ctr'],
    'CPA': ['cpa'], 'CVR': ['cvr', 'ti le chuyen doi'], 'CAC': ['cac'], 'LTV': ['ltv'], 'payback': ['payback', 'hoan von'],
    'churn': ['churn'], 'retention': ['retention'], 'cohort': ['cohort'], 'ROAS': ['roas ('], 'ROAS hoà vốn': ['roas hoa von', 'break-even roas'],
    'MER': ['mer'], 'ROI': ['roi'], 'lãi gộp': ['lai gop'], 'contribution margin': ['contribution margin'],
    'chi phí biên': ['chi phi bien'], 'AOV': ['aov'], 'A/B test': ['a/b'], 'ý nghĩa thống kê': ['y nghia thong ke'],
    'cỡ mẫu': ['co mau'], 'nhiễu/may rủi': ['nhieu', 'noise'], 'nhân quả vs tương quan': ['nhan qua'],
    'đối chứng (holdout)': ['holdout'], 'incrementality': ['incrementality'], 'attribution': ['attribution'],
    'UTM': ['utm'], 'GA4 key event': ['ga4'], 'SEO': ['seo'], 'search intent': ['search intent'],
    'organic/paid': ['organic'], 'owned/earned': ['owned'], 'KOL': ['kol'], 'KOC': ['koc'], 'affiliate': ['affiliate'],
    'CRM': ['crm'], 'opt-in': ['opt-in'], 'remarketing': ['remarketing'], 'ODAX': ['odax', 'outcome-driven'],
    'Pixel/Conversions API': ['conversions api'], 'brief': ['brief'], 'KPI': ['kpi'], 'OKR': ['okr'],
    'north star': ['north star'], 'leading/lagging': ['leading'], 'vanity metric': ['vanity'],
    'go-to-market': ['go-to-market'], 'pricing': ['pricing'], 'giá tham chiếu': ['gia tham chieu'],
    'giảm giá/khuyến mại': ['khuyen mai', 'giam gia'],
  };
  const hay = GLOSSARY.map((g) => ' ' + norm(g.vi) + ' | ' + norm(g.en) + ' ');
  const word = (h, k) => new RegExp(`(^|[^a-z0-9])${k.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&')}`).test(h);
  const missing = Object.entries(REQUIRED).filter(([, keys]) => !hay.some((h) => keys.some((k) => word(h, k)))).map(([n]) => n);
  assert.deepEqual(missing, []);
});

test('công thức chuẩn ở CAC, ROAS, ROI, CTR, CPM, CVR, AOV', () => {
  const EXPECT = {
    cac: ['chi phi marketing va ban hang', '÷ so khach hang moi'],
    roas: ['doanh thu', '÷ chi phi quang cao'],
    roi: ['- chi phi dau tu) ÷ chi phi dau tu × 100%'],
    ctr: ['so luot nhap ÷ so luot hien thi × 100%'],
    cpm: ['chi phi quang cao ÷ so luot hien thi × 1.000'],
    cvr: ['so chuyen doi ÷', '× 100%'],
    aov: ['doanh thu ÷ so don hang'],
  };
  const bad = [];
  for (const [id, parts] of Object.entries(EXPECT)) {
    const g = byId[id];
    if (!g) { bad.push(`thiếu mục ${id}`); continue; }
    const f = norm(g.formula);
    for (const p of parts) if (!f.includes(p)) bad.push(`${id}: công thức thiếu "${p}" — đang là "${g.formula}"`);
  }
  /* ROAS là tỉ lệ doanh thu, không được viết bằng lợi nhuận; ROI phải trừ chi phí. */
  if (norm(byId.roas?.formula).includes('loi nhuan')) bad.push('roas: không dùng lợi nhuận');
  assert.deepEqual(bad, []);
});

test('ví dụ công thức tự nhất quán: ROAS hoà vốn = 1 ÷ biên', () => {
  assert.match(norm(byId['roas-hoa-von'].formula), /1 ÷ bien/);
  assert.match(byId['roas-hoa-von'].example, /1 ÷ 0,4 = 2,5/);
});
