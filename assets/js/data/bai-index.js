/* MỤC LỤC BÀI HỌC MỚI (mã 'B:') — nhẹ, tải ở mọi trang.
   Nội dung từng bài nằm ở assets/js/data/bai/<mã module>.js, chỉ trang bài học tải file đó.
   Kế hoạch đầy đủ 70 module: KE-HOACH-700-BAI.md. Lược đồ: assets/js/data/bai/README.md.

   Phải tải SAU curriculum.js và TRƯỚC app.js: file này ghép module đã xuất bản vào STAGES/JOURNEY
   để hành trình, kỹ năng, "hôm nay" thấy bài mới mà không cần tải nội dung. */

const BAI_V = 2;   // tăng khi sửa nội dung bất kỳ file bài/*.js

/* Bước hành trình → chặng nội dung (đề vượt chặng, cổng mở khoá). */
const STEP_STAGE = { observe:'s1', understand:'s2', hypothesis:'s2', message:'s3', channel:'s4',
                     test:'s5', measure:'s5', optimize:'s5', insight:'s6' };

/* Module đã xuất bản. Thêm một dòng khi một module qua kiểm định và người duyệt. */
const BAI_MODS = [
  { id:'ob02', step:'observe', t:'Đọc kệ hàng, menu và trang sàn' },
];

/* Mục lục bài: id · tiêu đề · module · kỹ năng (khớp SKILLS trong app.js) · thời lượng. */
const BAI_INDEX = [
  { id:'B:ob02-01', mod:'ob02', skill:'insight', read:'6 phút', t:'Kệ hàng nói gì trước khi bạn đọc nhãn?' },
  { id:'B:ob02-02', mod:'ob02', skill:'insight', read:'6 phút', t:'Vì sao hàng đặt ngang tầm mắt bán chạy hơn?' },
  { id:'B:ob02-03', mod:'ob02', skill:'measure', read:'6 phút', t:'Đọc menu: món nào quán thật sự muốn bán?' },
  { id:'B:ob02-04', mod:'ob02', skill:'measure', read:'7 phút', t:'Giá theo gram: cách khách so hai gói hàng' },
  { id:'B:ob02-05', mod:'ob02', skill:'channel', read:'6 phút', t:'Trang sản phẩm trên sàn: 3 giây đầu tiên' },
  { id:'B:ob02-06', mod:'ob02', skill:'insight', read:'6 phút', t:'Đánh giá 1 sao đáng đọc hơn đánh giá 5 sao' },
  { id:'B:ob02-07', mod:'ob02', skill:'channel', read:'6 phút', t:'Quầy thu ngân: vì sao kẹo luôn nằm ở đó?' },
  { id:'B:ob02-08', mod:'ob02', skill:'brand', read:'6 phút', t:'Nhãn riêng của siêu thị đang cạnh tranh với ai?' },
  { id:'B:ob02-09', mod:'ob02', skill:'measure', read:'7 phút', t:'Khuyến mãi trên kệ: mua 2 tặng 1 có rẻ thật không?' },
  { id:'B:ob02-10', mod:'ob02', skill:'comm', read:'7 phút', t:'Viết một bản quan sát điểm bán trong 10 phút' },
];

/* Nội dung bài (được các file bài/*.js điền vào khi tải). */
const BAI = {};
function BAI_ADD(pack){
  const mod = BAI_MODS.find(m => m.id === pack.mod), stage = mod && STEP_STAGE[mod.step];
  pack.lessons.forEach(l => {
    BAI[l.id] = l;
    /* Câu hỏi của bài vào chung ngân hàng câu: quiz, ôn lỗi, thi dùng lại được. #1 đoán trước, #2 quyết định. */
    if (typeof EXAM_ITEMS !== 'undefined') (l.q || []).forEach((it, i) => {
      const id = `${l.id}#${i + 1}`;
      if (!EXAM_ITEMS.some(x => x.id === id))
        EXAM_ITEMS.push({ core:false, difficulty:2, minutes:1, ...it, id, source:l.id, stage, mod:pack.mod,
                          teaches: it.teaches || [l.id] });
    });
  });
}

/* Ghép module đã xuất bản vào chương trình. */
(() => {
  if (typeof STAGES === 'undefined') return;
  BAI_MODS.forEach(m => {
    const st = STAGES.find(s => s.id === STEP_STAGE[m.step]); if (!st || st.mods.some(x => x.id === m.id)) return;
    st.mods.push({ id:m.id, t:m.t, lessons:BAI_INDEX.filter(b => b.mod === m.id).map(b => b.id),
      caseLink:{ t:'Áp dụng vào một case có bấm giờ', href:'case-thu-vien.html' } });
    const j = typeof JOURNEY !== 'undefined' && JOURNEY.find(x => x.k === m.step);
    if (j && !j.mods.includes(m.id)) j.mods.push(m.id);
  });
})();
