/* Sinh lại assets/js/data/bai-index.js từ các file assets/js/data/bai/<mã>.js.
   Chạy: node tools_bai_index.mjs
   MODULES là danh sách 70 module theo KE-HOACH-700-BAI.md. `n` = số bài MỚI cần viết
   (10 trừ số bài cũ L:/P: đã xếp vào module đó). Module chưa có file thì chưa xuất bản. */
import fs from 'fs';
import vm from 'vm';

export const MODULES = [
  // Bước 1 · Quan sát
  { id:'ob01', step:'observe', n:7,  t:'Marketing là gì khi nhìn từ quầy bán hàng', old:['L:53','L:56','L:61'] },
  { id:'ob02', step:'observe', n:10, t:'Đọc kệ hàng, menu và trang sàn' },
  { id:'ob03', step:'observe', n:10, t:'Ngành hàng (category) và luật chơi của nó' },
  { id:'ob04', step:'observe', n:9,  t:'Đối thủ: ai đang lấy tiền của khách bạn', old:['L:73'] },
  { id:'ob05', step:'observe', n:10, t:'Tín hiệu hành vi: khách làm gì, không phải khách nói gì' },
  { id:'ob06', step:'observe', n:10, t:'Bối cảnh thị trường Việt Nam: kênh, vùng, mùa vụ, Tết' },
  { id:'ob07', step:'observe', n:7,  t:'Tư duy bằng dữ kiện: số nào đáng tin', old:['L:57','L:71','L:74'] },
  // Bước 2 · Hiểu khách hàng
  { id:'kh01', step:'understand', n:9,  t:'Phân khúc: chia thị trường theo nhu cầu, không theo tuổi', old:['P:segmentation'] },
  { id:'kh02', step:'understand', n:9,  t:'Chọn tệp: phục vụ ai trước', old:['P:targeting'] },
  { id:'kh03', step:'understand', n:9,  t:'Jobs-to-be-done: khách "thuê" sản phẩm để làm gì', old:['P:jobs-to-be-done'] },
  { id:'kh04', step:'understand', n:9,  t:'Insight: sự thật chưa ai nói ra', old:['P:consumer-insight'] },
  { id:'kh05', step:'understand', n:8,  t:'Phỏng vấn khách hàng không dẫn dắt', old:['L:58','L:64'] },
  { id:'kh06', step:'understand', n:10, t:'Hành trình mua: từ lúc nghĩ tới đến lúc mua lại' },
  { id:'kh07', step:'understand', n:7,  t:'Tâm lý quyết định: mỏ neo, mặc định, sợ mất', old:['L:54','L:70','L:75'] },
  { id:'kh08', step:'understand', n:8,  t:'Bằng chứng xã hội và khan hiếm dùng đúng cách', old:['P:social-proof','P:scarcity'] },
  { id:'kh09', step:'understand', n:10, t:'Khách B2B: nhiều người quyết định, chu kỳ dài' },
  { id:'kh10', step:'understand', n:10, t:'Gen Z, phụ huynh, người tỉnh: ba nhóm hay bị hiểu sai' },
  // Bước 3 · Đặt giả thuyết
  { id:'gt01', step:'hypothesis', n:10, t:'Viết vấn đề trước khi viết giải pháp' },
  { id:'gt02', step:'hypothesis', n:10, t:'Cây vấn đề: doanh thu giảm thì tách ra sao' },
  { id:'gt03', step:'hypothesis', n:10, t:'Giả thuyết kiểm chứng được' },
  { id:'gt04', step:'hypothesis', n:10, t:'Ưu tiên: làm gì trước khi tiền và người có hạn' },
  { id:'gt05', step:'hypothesis', n:9,  t:'Brief một trang', old:['L:74'] },
  { id:'gt06', step:'hypothesis', n:10, t:'Mục tiêu marketing gắn với mục tiêu kinh doanh' },
  // Bước 4 · Tạo thông điệp
  { id:'tp01', step:'message', n:9,  t:'Định vị: đứng ở đâu so với lựa chọn thay thế', old:['P:positioning'] },
  { id:'tp02', step:'message', n:9,  t:'Cửa vào ngành hàng (category entry points)', old:['P:category-entry-point'] },
  { id:'tp03', step:'message', n:9,  t:'Tên, câu slogan và lời hứa thương hiệu', old:['L:55'] },
  { id:'tp04', step:'message', n:7,  t:'Tài sản nhận diện riêng', old:['P:distinctive-assets','L:60','L:69'] },
  { id:'tp05', step:'message', n:8,  t:'Tài sản thương hiệu và giá trị dài hạn', old:['P:brand-equity','L:78'] },
  { id:'tp06', step:'message', n:7,  t:'Được nhớ tới: salience, mental availability', old:['P:awareness','P:salience','P:mental-availability'] },
  { id:'tp07', step:'message', n:9,  t:'Viết quảng cáo: dữ kiện thay tính từ', old:['L:57'] },
  { id:'tp08', step:'message', n:9,  t:'Ý tưởng sáng tạo và big idea', old:['L:68'] },
  { id:'tp09', step:'message', n:10, t:'Kể chuyện thương hiệu không sến' },
  { id:'tp10', step:'message', n:10, t:'Thông điệp theo từng bước phễu' },
  { id:'tp11', step:'message', n:8,  t:'Giá là một thông điệp', old:['P:pricing','L:63'] },
  // Bước 5 · Chọn kênh
  { id:'kn01', step:'channel', n:10, t:'Owned, earned, paid: bạn có bao nhiêu media' },
  { id:'kn02', step:'channel', n:8,  t:'Phân phối và độ phủ điểm bán', old:['L:77','P:physical-availability'] },
  { id:'kn03', step:'channel', n:10, t:'Sàn TMĐT: Shopee, Lazada, TikTok Shop' },
  { id:'kn04', step:'channel', n:8,  t:'Social và content theo nền tảng', old:['L:62','L:67'] },
  { id:'kn05', step:'channel', n:9,  t:'KOL, KOC, affiliate', old:['L:76'] },
  { id:'kn06', step:'channel', n:9,  t:'Quảng cáo trả tiền: Meta, Google, TikTok', old:['L:65'] },
  { id:'kn07', step:'channel', n:8,  t:'Ngân sách media và share of voice', old:['P:share-of-voice','L:72'] },
  { id:'kn08', step:'channel', n:10, t:'CRM, Zalo OA, email: kênh của khách cũ' },
  { id:'kn09', step:'channel', n:10, t:'PR và truyền thông khủng hoảng' },
  { id:'kn10', step:'channel', n:10, t:'Kế hoạch truyền thông tích hợp (IMC)' },
  // Bước 6 · Thử nghiệm
  { id:'tn01', step:'test', n:10, t:'Thử nhỏ trước khi chi lớn' },
  { id:'tn02', step:'test', n:10, t:'A/B test: thiết kế, cỡ mẫu, đọc kết quả' },
  { id:'tn03', step:'test', n:10, t:'Thử sáng tạo: creative testing' },
  { id:'tn04', step:'test', n:10, t:'Thử giá và khuyến mãi' },
  { id:'tn05', step:'test', n:9,  t:'Ra mắt sản phẩm là bài toán thứ tự', old:['L:66'] },
  { id:'tn06', step:'test', n:10, t:'Thử kênh mới không đốt tiền' },
  // Bước 7 · Đo lường
  { id:'dl01', step:'measure', n:8,  t:'Phễu và tỉ lệ chuyển đổi', old:['P:funnel','P:conversion'] },
  { id:'dl02', step:'measure', n:8,  t:'CAC, LTV và kinh tế đơn vị', old:['P:cac','P:ltv'] },
  { id:'dl03', step:'measure', n:10, t:'ROAS, lãi gộp, lợi nhuận sau quảng cáo' },
  { id:'dl04', step:'measure', n:8,  t:'Giữ chân, cohort và cái xô thủng', old:['L:59','P:retention'] },
  { id:'dl05', step:'measure', n:10, t:'Đo thương hiệu: nhận biết, cân nhắc, sức khoẻ' },
  { id:'dl06', step:'measure', n:10, t:'Attribution: kênh nào được công' },
  { id:'dl07', step:'measure', n:10, t:'GA4 và dashboard đọc được' },
  { id:'dl08', step:'measure', n:10, t:'Chỉ số phù phiếm và chỉ số ra quyết định' },
  { id:'dl09', step:'measure', n:10, t:'Trình bày số cho sếp' },
  // Bước 8 · Tối ưu
  { id:'tu01', step:'optimize', n:10, t:'Tối ưu chuyển đổi trang đích' },
  { id:'tu02', step:'optimize', n:10, t:'Tối ưu ngân sách quảng cáo' },
  { id:'tu03', step:'optimize', n:10, t:'Khuyến mãi không phá giá' },
  { id:'tu04', step:'optimize', n:9,  t:'Giới thiệu và truyền miệng', old:['P:referral'] },
  { id:'tu05', step:'optimize', n:10, t:'Tăng mua lặp lại và giá trị đơn' },
  { id:'tu06', step:'optimize', n:10, t:'Khi nào dừng một chiến dịch' },
  // Bước 9 · Rút insight
  { id:'in01', step:'insight', n:10, t:'Đọc lại chiến dịch: post-mortem' },
  { id:'in02', step:'insight', n:10, t:'Case thương hiệu Việt' },
  { id:'in03', step:'insight', n:10, t:'Case quốc tế đáng học' },
  { id:'in04', step:'insight', n:10, t:'Viết đề xuất: What / Why / How' },
  { id:'in05', step:'insight', n:10, t:'Phỏng vấn và case round' },
];

if (import.meta.url === `file://${process.argv[1]}`) {
  const mods = [], index = [];
  for (const m of MODULES) {
    const f = `assets/js/data/bai/${m.id}.js`;
    if (!fs.existsSync(f)) continue;
    let pack = null;
    const ctx = vm.createContext({ BAI_ADD: (p) => { pack = p; } });
    vm.runInContext(fs.readFileSync(f, 'utf8'), ctx, { filename: f });
    if (!pack || !pack.lessons.length) continue;
    mods.push(m);
    pack.lessons.forEach(l => index.push({ id:l.id, mod:m.id, skill:l.skill, read:l.read || '6 phút', t:l.t }));
  }
  const src = fs.readFileSync('assets/js/data/bai-index.js', 'utf8');
  const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  const modsJs = `const BAI_MODS = [\n${mods.map(m => `  { id:${q(m.id)}, step:${q(m.step)}, t:${q(m.t)} },`).join('\n')}\n];`;
  const idxJs = `const BAI_INDEX = [\n${index.map(b => `  { id:${q(b.id)}, mod:${q(b.mod)}, skill:${q(b.skill)}, read:${q(b.read)}, t:${q(b.t)} },`).join('\n')}\n];`;
  const out = src.replace(/const BAI_MODS = \[[\s\S]*?\n\];/, modsJs).replace(/const BAI_INDEX = \[[\s\S]*?\n\];/, idxJs)
                 .replace(/const BAI_V = \d+;/, (m) => `const BAI_V = ${+m.match(/\d+/)[0] + 1};`);
  fs.writeFileSync('assets/js/data/bai-index.js', out);
  console.log(`bai-index.js: ${mods.length} module · ${index.length} bài`);
}
