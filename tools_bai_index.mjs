/* Sinh lại assets/js/data/bai-index.js từ các file assets/js/data/bai/<mã>.js.
   Chạy: node tools_bai_index.mjs
   MODULES là danh sách 70 module theo KE-HOACH-700-BAI.md. `n` = số bài MỚI cần viết
   (10 trừ số bài cũ L:/P: đã xếp vào module đó). Module chưa có file thì chưa xuất bản. */
import fs from 'fs';
import vm from 'vm';

export const MODULES = [
  // Bước 1 · Quan sát
  { id:'ob01', tags:'4p marketing mix bán hàng nhu cầu giá trị cảm nhận', step:'observe', n:7,  t:'Marketing là gì khi nhìn từ quầy bán hàng', old:['L:53','L:56','L:61'] },
  { id:'ob02', tags:'kệ hàng siêu thị menu shopee lazada trang sản phẩm facing đánh giá nhãn riêng khuyến mãi', step:'observe', n:10, t:'Đọc kệ hàng, menu và trang sàn' },
  { id:'ob03', tags:'ngành hàng category thị phần quy mô biên lợi nhuận mùa vụ', step:'observe', n:10, t:'Ngành hàng (category) và luật chơi của nó' },
  { id:'ob04', tags:'đối thủ cạnh tranh thư viện quảng cáo meta ad library giá khuyến mãi', step:'observe', n:9,  t:'Đối thủ: ai đang lấy tiền của khách bạn', old:['L:73'] },
  { id:'ob05', tags:'hành vi giỏ hàng bỏ dở tìm kiếm google tiktok livestream cod bom hàng mua lại', step:'observe', n:10, t:'Tín hiệu hành vi: khách làm gì, không phải khách nói gì' },
  { id:'ob06', tags:'thị trường việt nam tết ngày đôi 9.9 11.11 zalo cod tạp hoá siêu thị', step:'observe', n:10, t:'Bối cảnh thị trường Việt Nam: kênh, vùng, mùa vụ, Tết' },
  { id:'ob07', tags:'dữ liệu số liệu trung bình mẫu tương quan phần trăm tăng trưởng cùng kỳ', step:'observe', n:7,  t:'Đọc số cho đúng: số nào đáng tin', old:['L:57','L:71','L:74'] },
  // Bước 2 · Hiểu khách hàng
  { id:'kh01', tags:'phân khúc segmentation persona thị trường', step:'understand', n:9,  t:'Phân khúc: chia thị trường theo nhu cầu, không theo tuổi', old:['P:segmentation'] },
  { id:'kh02', tags:'chọn tệp targeting khách mục tiêu', step:'understand', n:9,  t:'Chọn tệp: phục vụ ai trước', old:['P:targeting'] },
  { id:'kh03', tags:'jobs to be done jtbd khách thuê sản phẩm', step:'understand', n:9,  t:'Jobs-to-be-done: khách "thuê" sản phẩm để làm gì', old:['P:jobs-to-be-done'] },
  { id:'kh04', tags:'insight sự thật ngầm bình luận', step:'understand', n:9,  t:'Insight: sự thật chưa ai nói ra', old:['P:consumer-insight'] },
  { id:'kh05', tags:'phỏng vấn khách khảo sát survey', step:'understand', n:8,  t:'Phỏng vấn khách hàng không dẫn dắt', old:['L:58','L:64'] },
  { id:'kh06', tags:'hành trình mua customer journey trigger điểm chạm', step:'understand', n:10, t:'Hành trình mua: từ lúc nghĩ tới đến lúc mua lại' },
  { id:'kh07', tags:'tâm lý mỏ neo mặc định sợ mất decoy dark pattern', step:'understand', n:7,  t:'Tâm lý quyết định: mỏ neo, mặc định, sợ mất', old:['L:54','L:70','L:75'] },
  { id:'kh08', tags:'bằng chứng xã hội social proof khan hiếm flash sale review', step:'understand', n:8,  t:'Bằng chứng xã hội và khan hiếm dùng đúng cách', old:['P:social-proof','P:scarcity'] },
  { id:'kh09', tags:'b2b doanh nghiệp lead hợp đồng đấu thầu', step:'understand', n:10, t:'Khách B2B: nhiều người quyết định, chu kỳ dài' },
  { id:'kh10', tags:'gen z phụ huynh người tỉnh tiktok nhóm facebook', step:'understand', n:10, t:'Gen Z, phụ huynh, người tỉnh: ba nhóm hay bị hiểu sai' },
  // Bước 3 · Đặt giả thuyết
  { id:'gt01', tags:'vấn đề problem statement triệu chứng', step:'hypothesis', n:10, t:'Viết vấn đề trước khi viết giải pháp' },
  { id:'gt02', tags:'cây vấn đề mece doanh thu giảm', step:'hypothesis', n:10, t:'Cây vấn đề: doanh thu giảm thì tách ra sao' },
  { id:'gt03', tags:'giả thuyết hypothesis kiểm chứng', step:'hypothesis', n:10, t:'Giả thuyết kiểm chứng được' },
  { id:'gt04', tags:'ưu tiên ice rice tác động công sức chi phí cơ hội', step:'hypothesis', n:10, t:'Ưu tiên: làm gì trước khi tiền và người có hạn' },
  { id:'gt05', tags:'brief agency kol một trang', step:'hypothesis', n:9,  t:'Brief một trang', old:['L:74'] },
  { id:'gt06', tags:'mục tiêu okr smart north star leading lagging', step:'hypothesis', n:10, t:'Mục tiêu marketing gắn với mục tiêu kinh doanh' },
  // Bước 4 · Tạo thông điệp
  { id:'tp01', tags:'định vị positioning bản đồ định vị', step:'message', n:9,  t:'Định vị: đứng ở đâu so với lựa chọn thay thế', old:['P:positioning'] },
  { id:'tp02', tags:'category entry point cửa vào ngành hàng', step:'message', n:9,  t:'Cửa vào ngành hàng (category entry points)', old:['P:category-entry-point'] },
  { id:'tp03', tags:'tên thương hiệu slogan lời hứa', step:'message', n:9,  t:'Tên, câu slogan và lời hứa thương hiệu', old:['L:55'] },
  { id:'tp04', tags:'tài sản nhận diện logo màu âm thanh linh vật', step:'message', n:7,  t:'Tài sản nhận diện riêng', old:['P:distinctive-assets','L:60','L:69'] },
  { id:'tp05', tags:'brand equity tài sản thương hiệu mở rộng thương hiệu', step:'message', n:8,  t:'Tài sản thương hiệu và giá trị dài hạn', old:['P:brand-equity','L:78'] },
  { id:'tp06', tags:'nhận biết salience mental availability', step:'message', n:7,  t:'Được nhớ tới: salience, mental availability', old:['P:awareness','P:salience','P:mental-availability'] },
  { id:'tp07', tags:'viết quảng cáo copywriting tiêu đề caption banner cta', step:'message', n:9,  t:'Viết quảng cáo: dữ kiện thay tính từ', old:['L:57'] },
  { id:'tp08', tags:'big idea ý tưởng sáng tạo trend hài hước', step:'message', n:9,  t:'Ý tưởng sáng tạo và big idea', old:['L:68'] },
  { id:'tp09', tags:'kể chuyện storytelling ugc', step:'message', n:10, t:'Kể chuyện thương hiệu không sến' },
  { id:'tp10', tags:'thông điệp phễu retargeting landing email bỏ giỏ', step:'message', n:10, t:'Thông điệp theo từng bước phễu' },
  { id:'tp11', tags:'giá thông điệp giá lẻ freeship tăng giá gói đăng ký', step:'message', n:8,  t:'Giá là một thông điệp', old:['P:pricing','L:63'] },
  // Bước 5 · Chọn kênh
  { id:'kn01', tags:'owned earned paid media fanpage', step:'channel', n:10, t:'Owned, earned, paid: bạn có bao nhiêu media' },
  { id:'kn02', tags:'phân phối độ phủ đại lý nhà phân phối chiết khấu', step:'channel', n:8,  t:'Phân phối và độ phủ điểm bán', old:['L:77','P:physical-availability'] },
  { id:'kn03', tags:'sàn thương mại điện tử shopee lazada tiktok shop livestream mall phí sàn', step:'channel', n:10, t:'Sàn TMĐT: Shopee, Lazada, TikTok Shop' },
  { id:'kn04', tags:'social content facebook tiktok youtube instagram zalo trụ cột nội dung', step:'channel', n:8,  t:'Social và content theo nền tảng', old:['L:62','L:67'] },
  { id:'kn05', tags:'kol koc affiliate influencer hoa hồng', step:'channel', n:9,  t:'KOL, KOC, affiliate', old:['L:76'] },
  { id:'kn06', tags:'quảng cáo trả tiền meta ads facebook ads google ads tiktok ads cpm cpc cpa pixel retargeting đấu giá', step:'channel', n:9,  t:'Quảng cáo trả tiền: Meta, Google, TikTok', old:['L:65'] },
  { id:'kn07', tags:'ngân sách media share of voice esov reach tần suất grp', step:'channel', n:8,  t:'Ngân sách media và share of voice', old:['P:share-of-voice','L:72'] },
  { id:'kn08', tags:'crm zalo oa sms email rfm tích điểm', step:'channel', n:10, t:'CRM, Zalo OA, email: kênh của khách cũ' },
  { id:'kn09', tags:'pr khủng hoảng truyền thông thông cáo báo chí', step:'channel', n:10, t:'PR và truyền thông khủng hoảng' },
  { id:'kn10', tags:'imc tích hợp kế hoạch truyền thông agency', step:'channel', n:10, t:'Kế hoạch truyền thông tích hợp (IMC)' },
  // Bước 6 · Thử nghiệm
  { id:'tn01', tags:'thử nhỏ mvp pre-order đặt cọc', step:'test', n:10, t:'Thử nhỏ trước khi chi lớn' },
  { id:'tn02', tags:'a/b test cỡ mẫu ab testing', step:'test', n:10, t:'A/B test: thiết kế, cỡ mẫu, đọc kết quả' },
  { id:'tn03', tags:'creative testing thử sáng tạo hook thumb-stop ctr', step:'test', n:10, t:'Thử sáng tạo: creative testing' },
  { id:'tn04', tags:'thử giá khuyến mãi hoà vốn freeship combo', step:'test', n:10, t:'Thử giá và khuyến mãi' },
  { id:'tn05', tags:'ra mắt sản phẩm launch soft launch teaser', step:'test', n:9,  t:'Ra mắt sản phẩm là bài toán thứ tự', old:['L:66'] },
  { id:'tn06', tags:'thử kênh mới incrementality ngân sách thử', step:'test', n:10, t:'Thử kênh mới không đốt tiền' },
  // Bước 7 · Đo lường
  { id:'dl01', tags:'phễu funnel tỉ lệ chuyển đổi cvr', step:'measure', n:8,  t:'Phễu và tỉ lệ chuyển đổi', old:['P:funnel','P:conversion'] },
  { id:'dl02', tags:'cac ltv kinh tế đơn vị payback', step:'measure', n:8,  t:'CAC, LTV và kinh tế đơn vị', old:['P:cac','P:ltv'] },
  { id:'dl03', tags:'roas lãi gộp lợi nhuận mer biên lãi', step:'measure', n:10, t:'ROAS, lãi gộp, lợi nhuận sau quảng cáo' },
  { id:'dl04', tags:'giữ chân retention cohort churn', step:'measure', n:8,  t:'Giữ chân, cohort và cái xô thủng', old:['L:59','P:retention'] },
  { id:'dl05', tags:'đo thương hiệu brand lift nps share of search', step:'measure', n:10, t:'Đo thương hiệu: nhận biết, cân nhắc, sức khoẻ' },
  { id:'dl06', tags:'attribution last click utm incrementality marketing mix', step:'measure', n:10, t:'Attribution: kênh nào được công' },
  { id:'dl07', tags:'ga4 google analytics dashboard sự kiện utm biểu đồ', step:'measure', n:10, t:'GA4 và dashboard đọc được' },
  { id:'dl08', tags:'chỉ số phù phiếm vanity metric goodhart', step:'measure', n:10, t:'Chỉ số phù phiếm và chỉ số ra quyết định' },
  { id:'dl09', tags:'trình bày số báo cáo sếp', step:'measure', n:10, t:'Trình bày số cho sếp' },
  // Bước 8 · Tối ưu
  { id:'tu01', tags:'landing page tối ưu chuyển đổi cro form tốc độ', step:'optimize', n:10, t:'Tối ưu chuyển đổi trang đích' },
  { id:'tu02', tags:'tối ưu ngân sách quảng cáo từ khoá phủ định tần suất lợi suất giảm dần', step:'optimize', n:10, t:'Tối ưu ngân sách quảng cáo' },
  { id:'tu03', tags:'khuyến mãi voucher quà tặng xả tồn', step:'optimize', n:10, t:'Khuyến mãi không phá giá' },
  { id:'tu04', tags:'giới thiệu referral truyền miệng hệ số lan truyền', step:'optimize', n:9,  t:'Giới thiệu và truyền miệng', old:['P:referral'] },
  { id:'tu05', tags:'mua lặp lại upsell cross-sell giá trị đơn gói định kỳ', step:'optimize', n:10, t:'Tăng mua lặp lại và giá trị đơn' },
  { id:'tu06', tags:'dừng chiến dịch chi phí chìm', step:'optimize', n:10, t:'Khi nào dừng một chiến dịch' },
  // Bước 9 · Rút insight
  { id:'in01', tags:'post-mortem tổng kết chiến dịch', step:'insight', n:10, t:'Đọc lại chiến dịch: post-mortem' },
  { id:'in02', tags:'case thương hiệu việt highlands biti vinamilk thế giới di động mixue grab kido trung nguyên shopee', step:'insight', n:10, t:'Case thương hiệu Việt' },
  { id:'in03', tags:'case quốc tế spotify dove nike apple old spice airbnb duolingo ikea coca-cola mcdonald', step:'insight', n:10, t:'Case quốc tế đáng học' },
  { id:'in04', tags:'đề xuất proposal what why how', step:'insight', n:10, t:'Viết đề xuất: What / Why / How' },
  { id:'in05', tags:'phỏng vấn case round market sizing star', step:'insight', n:10, t:'Phỏng vấn và case round' },
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
    pack.lessons.forEach(l => index.push({ id:l.id, mod:m.id, skill:l.skill, read:l.read || '6 phút', t:l.t, c:(l.concept && l.concept.name) || '' }));
  }
  const src = fs.readFileSync('assets/js/data/bai-index.js', 'utf8');
  const q = (s) => `'${String(s).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
  const modsJs = `const BAI_MODS = [\n${mods.map(m => `  { id:${q(m.id)}, step:${q(m.step)}, t:${q(m.t)}, tags:${q(m.tags || '')} },`).join('\n')}\n];`;
  const idxJs = `const BAI_INDEX = [\n${index.map(b => `  { id:${q(b.id)}, mod:${q(b.mod)}, skill:${q(b.skill)}, read:${q(b.read)}, t:${q(b.t)}, c:${q(b.c || '')} },`).join('\n')}\n];`;
  const out = src.replace(/const BAI_MODS = \[[\s\S]*?\n\];/, modsJs).replace(/const BAI_INDEX = \[[\s\S]*?\n\];/, idxJs)
                 .replace(/const BAI_V = \d+;/, (m) => `const BAI_V = ${+m.match(/\d+/)[0] + 1};`);
  fs.writeFileSync('assets/js/data/bai-index.js', out);
  console.log(`bai-index.js: ${mods.length} module · ${index.length} bài`);
}
