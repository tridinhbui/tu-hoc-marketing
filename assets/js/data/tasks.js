/* BÀI THỰC HÀNH CÓ ĐẦU RA — soạn riêng cho từng bài (mã 'B:'), thay phần "nói 60 giây".
   Lược đồ: BAI_TASKS['B:dl02-03'] = { given: [[nhãn, giá trị], …] | 'html', output: 'việc cần làm, đầu ra cụ thể',
     rubric: ['tiêu chí tự kiểm', …], model: 'html bài làm mẫu' }
   Bài nào chưa có ở đây thì bai.html dùng `apply` của bài + tiêu chí suy ra từ chính bài. Kiểm bằng tests/tasks.test.mjs.
   File này chỉ khai báo kho; nội dung nằm ở tasks-a.js và tasks-b.js. */
const BAI_TASKS = {};
