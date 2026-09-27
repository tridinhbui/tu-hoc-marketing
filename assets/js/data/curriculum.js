/* CHƯƠNG TRÌNH — chặng → module → bài.
   Mỗi bài trỏ về nội dung đã có: 'L:<day>' là daily lesson (lessons.js), 'P:<id>' là nguyên lý (principles.js).
   Không có con số nào được gõ tay ở đây: mọi số đếm trên trang đều tính từ mảng này. */
const STAGES = [
  { id:'s1', n:'01', t:'Nền tảng', q:'Marketing thật sự là làm gì khi không có ai nhìn?',
    mods:[
      { id:'s1m1', t:'Marketing trong đời thật', lessons:['L:53','L:56','L:61'],
        caseLink:{t:'Case: Highlands chiếm chỗ ngồi của thành phố', href:'campaign.html?id=highlands-third-place'} },
      { id:'s1m2', t:'Tư duy bằng dữ kiện', lessons:['L:57','L:71','L:74'],
        caseLink:{t:'Case: Ogilvy viết cho Rolls-Royce', href:'campaign.html?id=ogilvy-rolls'} },
    ]},
  { id:'s2', n:'02', t:'Hiểu khách hàng', q:'Ai mua, trong tình huống nào, và họ đang thay thế cái gì?',
    mods:[
      { id:'s2m1', t:'Phân khúc và chọn tệp', lessons:['P:segmentation','P:targeting','L:73'],
        caseLink:{t:'Bàn làm việc: bốn phân khúc theo dịp', href:'segmentation.html'} },
      { id:'s2m2', t:'Insight và công việc cần làm', lessons:['P:consumer-insight','P:jobs-to-be-done','L:58','L:64'],
        caseLink:{t:'Bàn làm việc: năm cuộc phỏng vấn', href:'interview.html'} },
      { id:'s2m3', t:'Tâm lý khi ra quyết định', lessons:['L:54','L:70','P:social-proof','P:scarcity','L:75'],
        caseLink:{t:'Bàn làm việc: bản đồ khách hàng', href:'customer-map.html'} },
    ]},
  { id:'s3', n:'03', t:'Thương hiệu & định vị', q:'Bạn đứng ở đâu so với lựa chọn thay thế — và khách có nhớ ra bạn không?',
    mods:[
      { id:'s3m1', t:'Định vị', lessons:['P:positioning','L:55','P:category-entry-point'],
        caseLink:{t:'Bàn làm việc: năm câu định vị', href:'positioning.html'} },
      { id:'s3m2', t:'Tài sản thương hiệu', lessons:['P:brand-equity','P:distinctive-assets','L:60','L:69','L:78'],
        caseLink:{t:'Bàn làm việc: che logo đi', href:'assets-audit.html'} },
      { id:'s3m3', t:'Được nhớ tới', lessons:['P:awareness','P:salience','P:mental-availability'],
        caseLink:{t:'Bàn làm việc: mười cửa vào category', href:'cep.html'} },
    ]},
  { id:'s4', n:'04', t:'Kênh & truyền thông', q:'Tiền truyền thông đi đâu, và có ai thật sự nhìn thấy?',
    mods:[
      { id:'s4m1', t:'Kênh và phân phối', lessons:['L:77','P:physical-availability','L:76'],
        caseLink:{t:'Case: Grab từ gọi xe thành thói quen', href:'campaign.html?id=grab-super-app'} },
      { id:'s4m2', t:'Nội dung và sáng tạo', lessons:['L:62','L:67','L:68'],
        caseLink:{t:'Case: Duolingo trên TikTok', href:'campaign.html?id=duolingo-tiktok'} },
      { id:'s4m3', t:'Ngân sách media', lessons:['P:share-of-voice','L:72','L:65'],
        caseLink:{t:'Case: Shopee ngày đôi và âm thanh thương hiệu', href:'campaign.html?id=shopee-hattrick'} },
    ]},
  { id:'s5', n:'05', t:'Đo lường & tăng trưởng', q:'Mỗi khách mới làm bạn giàu lên hay nghèo đi?',
    mods:[
      { id:'s5m1', t:'Phễu và chuyển đổi', lessons:['P:funnel','P:conversion'],
        caseLink:{t:'Case: Spotify Wrapped', href:'campaign.html?id=spotify-wrapped'} },
      { id:'s5m2', t:'Kinh tế đơn vị', lessons:['P:cac','P:ltv','L:59','P:retention','P:referral'],
        caseLink:{t:'Bàn làm việc: ở mức CAC nào thì chết', href:'unit-economics.html'} },
      { id:'s5m3', t:'Giá và ra mắt', lessons:['P:pricing','L:63','L:66'],
        caseLink:{t:'Bàn làm việc: năm cách tính giá', href:'pricing.html'} },
    ]},
  { id:'s6', n:'06', t:'Case tổng hợp', q:'Ghép mọi thứ lại dưới áp lực thời gian.',
    mods:[
      { id:'s6m1', t:'Brand audit', lessons:[], caseLink:{t:'Bàn làm việc: brand audit', href:'brand-audit.html'} },
      { id:'s6m2', t:'Thư viện case', lessons:[], caseLink:{t:'Toàn bộ case trong thư viện', href:'gallery.html'} },
    ]},
];

/* Nhóm người học chọn khi bắt đầu. Mỗi nhóm được gợi ý một lộ trình; đổi lúc nào cũng được. */
const PERSONAS = [
  { id:'student', t:'Sinh viên mới bắt đầu', d:'Chưa có nền tảng, muốn đi đủ từ đầu.', path:'full' },
  { id:'mt', t:'Ứng viên MT / Brand Associate', d:'Chuẩn bị phỏng vấn, cần nói gọn và có số.', path:'mt' },
  { id:'comp', t:'Đội thi case', d:'Cần khung phân tích nhanh và đọc số chắc tay.', path:'case' },
  { id:'worker', t:'Người đi làm', d:'Sales, content, chủ shop online muốn nghĩ như brand hay growth.', path:'perf' },
];

/* Lộ trình theo đích đến — mỗi lộ trình là một danh sách bài cụ thể, theo đúng thứ tự học. */
const PATHS = [
  { id:'full', t:'Đi đủ từ đầu', d:'Toàn bộ chương trình, theo thứ tự chặng.', lessons:null },
  { id:'mt', t:'Phỏng vấn Management Trainee', d:'Những câu sếp và giám khảo hỏi nhiều nhất: định vị, insight, số cơ bản.',
    lessons:['L:57','P:segmentation','P:targeting','P:positioning','P:consumer-insight','L:58','P:funnel','P:conversion','P:cac','P:ltv','L:65','L:74','L:66'] },
  { id:'case', t:'Thi case', d:'Khung phân tích, đọc số nhanh, đề xuất có ngân sách.',
    lessons:['L:57','L:71','P:segmentation','P:jobs-to-be-done','L:73','P:positioning','P:category-entry-point','P:funnel','P:cac','P:ltv','L:59','P:share-of-voice','L:72','P:pricing','L:63','L:74'] },
  { id:'perf', t:'Performance marketing', d:'Phễu, chuyển đổi, CAC/LTV, ngân sách và giới hạn của quảng cáo hiệu suất.',
    lessons:['P:funnel','P:conversion','L:71','P:cac','P:ltv','L:59','P:retention','P:referral','L:65','L:72','L:67','L:68','L:63'] },
  { id:'brand', t:'Brand marketing', d:'Định vị, tài sản thương hiệu, được nhớ tới, nhất quán.',
    lessons:['P:positioning','L:55','P:brand-equity','P:distinctive-assets','L:60','L:69','P:salience','P:mental-availability','P:category-entry-point','P:share-of-voice','L:78','L:77'] },
];
