-- Sự kiện học theo bước (EXP-01 · lối vào quiz). Chỉ ghi khi cờ app_config.events_enabled = true (mặc định TẮT).
-- Không lưu nội dung người dùng viết, không lưu đáp án chọn, không lưu IP hay email. user_id là mã nội bộ ngẫu nhiên.
-- idem UNIQUE: gửi lại cùng một sự kiện (refresh, mạng chập chờn) không tạo dòng thứ hai.
-- Migration này CHƯA được áp dụng lên production — cần phê duyệt riêng (xem docs/exp01/RELEASE.md).
CREATE TABLE IF NOT EXISTS learning_events (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  idem         TEXT NOT NULL UNIQUE,
  ts           INTEGER NOT NULL,
  day_vn       TEXT NOT NULL,
  user_id      TEXT NOT NULL,
  lsid         TEXT NOT NULL,
  lesson_id    TEXT,
  event        TEXT NOT NULL,
  props        TEXT,
  device_class TEXT,
  release      TEXT NOT NULL,
  is_internal  INTEGER NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS idx_le_day  ON learning_events(day_vn, event);
CREATE INDEX IF NOT EXISTS idx_le_les  ON learning_events(lesson_id, event);
CREATE INDEX IF NOT EXISTS idx_le_user ON learning_events(user_id, ts);
