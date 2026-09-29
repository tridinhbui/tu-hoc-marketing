/* ĐỀ THI VƯỢT CHẶNG — blueprint, không phải đề cụ thể.
   Đề được dựng lại mỗi lần thi từ EXAM_ITEMS theo tỉ lệ dưới đây.

   Luật qua phải thoả CẢ HAI:
     - đúng >= pass
     - sai <= coreMiss trong số item core
   Chỉ lấy tổng điểm thì người học gỡ điểm ở câu dễ mà vẫn không nắm cốt lõi.

   pool >= 3 x size là mức cần để thi lại không trùng đề. Chặng nào chưa đủ thì
   trang thi tự nói thẳng ra, không giấu. */

const EXAMS = {
  s1: { size:12, pass:9, core:4, coreMiss:1, minutes:20,
        mix:{ mcq:5, case:3, calc:2, judge:2 },
        title:'Nền tảng',
        intro:'Chặng này hỏi ba thứ: marketing ở đâu trong đời thật, media nào bạn đã sở hữu, và vì sao dữ kiện thắng tính từ.' },
  s2: { size:12, pass:9, core:4, coreMiss:1, minutes:20,
        mix:{ mcq:5, case:3, calc:2, judge:2 },
        title:'Hiểu khách hàng',
        intro:'Chặng này hỏi: ai mua, trong tình huống nào, họ đang thay thế cái gì — và vì sao câu khách nói ra thường không phải lý do thật.' },
  s3: { size:12, pass:9, core:4, coreMiss:1, minutes:20,
        mix:{ mcq:5, case:3, calc:2, judge:2 },
        title:'Thương hiệu & định vị',
        intro:'Chặng này hỏi: bạn đứng ở đâu so với lựa chọn thay thế, thứ gì giúp khách nhận ra bạn khi che logo, và họ có nhớ ra bạn đúng lúc cần mua không.' },
  s4: { size:12, pass:9, core:4, coreMiss:1, minutes:20,
        mix:{ mcq:5, case:3, calc:2, judge:2 },
        title:'Kênh & truyền thông',
        intro:'Chặng này hỏi: tiền truyền thông đi đâu, có ai thật sự nhìn thấy, và vì sao đo được chính xác không có nghĩa là quan trọng.' },
  /* Chặng nặng số nhất: 4 bài tính thay vì 2. */
  s5: { size:12, pass:9, core:4, coreMiss:1, minutes:25,
        mix:{ mcq:4, case:3, calc:4, judge:1 },
        title:'Đo lường & tăng trưởng',
        intro:'Chặng này hỏi một câu duy nhất theo nhiều cách: mỗi khách mới làm bạn giàu lên hay nghèo đi?' },
  /* Chặng cuối không thi trắc nghiệm. 12 câu rời rạc không đo được việc ghép mọi thứ
     lại dưới áp lực thời gian — đó là việc của case bấm giờ (giai-case.html).
     Ba điều kiện, cùng tinh thần "tổng + cốt lõi" của các đề trước:
       need  — số case đạt trong giờ (theo luật đạt của chính giai-case)
       full  — trong đó bao nhiêu case đạt đủ 4/4, tức phần nói 60 giây cũng đạt
       hard  — phải có ít nhất một case độ Khó: không vượt được bằng cách chọn case dễ */
  s6: { kind:'cases', need:3, full:2, hard:true, inTime:true,
        title:'Case tổng hợp',
        intro:'Chặng cuối không có đề trắc nghiệm. Bạn vượt chặng bằng cách giải case thật, có bấm giờ, và trình bày được kết luận trong 60 giây.' },
};

/* Số item tối thiểu nên có để đề không lặp. Trang thi dùng để cảnh báo. */
const EXAM_POOL_TARGET = (sid) => (EXAMS[sid] && EXAMS[sid].size ? EXAMS[sid].size * 3 : 0);

/* Mã lỗi KHÁI NIỆM. Sai bài tính thì đã có mã (NHAM_CTR_CVR…); sai câu hiểu thì trước đây
   không để lại dấu gì. Mỗi nguyên lý có một mã KN_<id>, đi chung hàng ôn 1·3·7 với mã số.
   Đăng ký ở đây vì file này được nạp sau drills.js ở mọi trang có hàng ôn. */
if (typeof ERRORS !== 'undefined' && typeof PRINCIPLES !== 'undefined') {
  PRINCIPLES.forEach(p => {
    const k = 'KN_' + p.id.replace(/-/g, '_').toUpperCase();
    if (!ERRORS[k]) ERRORS[k] = 'Hiểu chưa chắc: ' + p.vi;
  });
}
/* Bài mới 'B:' cũng có mã khái niệm riêng, tên lỗi là tên bài. */
if (typeof ERRORS !== 'undefined' && typeof BAI_INDEX !== 'undefined')
  BAI_INDEX.forEach(b => { const k = 'KN_' + b.id.replace(/-/g, '_').toUpperCase(); if (!ERRORS[k]) ERRORS[k] = 'Hiểu chưa chắc: ' + b.t; });
const conceptCode = (pid) => 'KN_' + String(pid).replace(/^P:/, '').replace(/-/g, '_').toUpperCase();
