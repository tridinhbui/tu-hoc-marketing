import { json } from './lib.js';

/* Số thật cho trang chủ / đăng nhập. learners = tài khoản đã đăng ký; lessons_done = tổng LƯỢT hoàn thành bài
   (người × bài, chỉ bài học thật, không tính đề vượt chặng/xếp lớp/quản trị) — không phải số bài khác nhau.
   lesson_progress có khoá chính (user_id, lesson_id) nên mỗi cặp chỉ một dòng, không đếm nhiều trạng thái của cùng một bài.
   Chỉ đếm, không lộ ai; cache ngắn để trang không gõ D1 mỗi lượt xem. */
/* Học viên các lớp trước (học ngoài website, trước khi có hệ thống này). Số do chủ dự án xác nhận ngày 18/10/2026:
   1.000 học viên, 10.000 lượt hoàn thành bài. Đây là hằng số cố định, KHÔNG tăng theo thời gian — chỉ phần đếm từ
   database mới tăng. Trang hiển thị luôn kèm chú thích "gồm học viên các lớp trước". Muốn đổi thì sửa ở đây. */
export const PRIOR_CLASSES = { learners: 1000, lessons_done: 10000 };

export async function publicStats(env, now = Date.now()) {
  const r = await env.DB.prepare(`SELECT
      (SELECT COUNT(*) FROM users WHERE email NOT LIKE '%@system.invalid') AS learners,
      (SELECT COUNT(*) FROM users WHERE created_at > ?1 AND email NOT LIKE '%@system.invalid') AS joined_7d,
      (SELECT COUNT(*) FROM lesson_progress lp JOIN users u ON u.id = lp.user_id
         WHERE lp.state IN ('learned','passed','solid','mastered') AND lp.completion_source = 'lesson'
           AND u.email NOT LIKE '%@system.invalid') AS lessons_done`)
    .bind(now - 7 * 864e5).first();
  const learners = r?.learners || 0, lessons_done = r?.lessons_done || 0;
  /* learners / lessons_done giữ nguyên là số đếm từ website; tổng hiển thị = số website + lớp trước, tách riêng để không lẫn. */
  return json({ learners, joined_7d: r?.joined_7d || 0, lessons_done,
                prior: PRIOR_CLASSES,
                total_learners: learners + PRIOR_CLASSES.learners, total_lessons_done: lessons_done + PRIOR_CLASSES.lessons_done }, 200,
              { 'cache-control': 'public, max-age=60' });
}
