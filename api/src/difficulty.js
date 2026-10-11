/* Độ khó theo KỸ NĂNG cần vận dụng, không theo độ dài câu hỏi.
   1 = nhớ / nhận biết  : hỏi định nghĩa hay nhận diện một khái niệm, không có số để xử lý.
   2 = vận dụng một bước: áp một khái niệm hoặc một phép tính vào tình huống.
   3 = nhiều bước / phản biện: tính nhiều bước, đọc bảng nhiều dòng, hoặc đánh giá một lập luận / kết luận có sẵn.
   Bài mới (B:) không khai độ khó nên mặc định 2 hết; hàm này suy ra từ chính câu hỏi. Câu đã được người viết gán
   1 hoặc 3 thì giữ nguyên (chỉ thay mặc định 2). Chạy ở build-bank; kiểm bằng test/difficulty.test.mjs. */
const strip = (s) => String(s || '').replace(/<[^>]+>/g, ' ');
const nums = (s) => (strip(s).match(/\d+(?:[.,]\d+)?/g) || []).length;
const DEFINE = /(\blà gì\b|nghĩa là gì|định nghĩa|được gọi là|thuật ngữ nào|khái niệm nào|chỉ số nào (đo|cho biết))/i;
const CRITIQUE = /(sai sót|sai ở đâu|lập luận|phát hiện|đánh giá nhận định|nhận định nào|có căn cứ|kết luận nào|đánh đổi|điều gì sẽ|ngầm giả định|giả định nào)/i;

export function deriveDifficulty(it) {
  if (it.difficulty && it.difficulty !== 2) return it.difficulty;
  const stem = `${it.ctx || ''} ${it.stem || ''}`;
  if (it.type === 'calc') {
    const steps = (it.steps || []).length, n = nums(stem);
    if (steps >= 3 || n >= 4 || (it.wrong || []).length >= 3) return 3;
    return 2;
  }
  const rows = (it.rows || []).length;
  if (rows >= 3 || CRITIQUE.test(stem) || nums(stem) >= 5) return 3;
  if (DEFINE.test(stem) && nums(stem) === 0) return 1;
  return 2;
}
