-- Đánh giá phía server: đề lưu danh sách câu để chấm lại được; đồ thị điều kiện tiên quyết; cấu hình đề.
ALTER TABLE exam_attempts ADD COLUMN items_json TEXT;
CREATE TABLE IF NOT EXISTS prerequisites (
  lesson_id          TEXT NOT NULL,
  requires_lesson_id TEXT NOT NULL,
  PRIMARY KEY (lesson_id, requires_lesson_id)
);
CREATE TABLE IF NOT EXISTS admin_unlocks (
  user_id    TEXT NOT NULL,
  lesson_id  TEXT NOT NULL,
  granted_by TEXT,
  reason     TEXT,
  granted_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, lesson_id)
);
INSERT OR IGNORE INTO app_config (key, value, updated_at) VALUES
  ('stage_exam', '{"count":15,"pass":0.8,"cooldown_min":60,"min_pool":30}', 0),
  ('placement',  '{"stages":["s1","s2","s3","s4","s5"],"per_stage":4,"pass":0.8,"retry_days":7}', 0),
  ('open_first_n', '7', 0),
  ('review', '{"session":10,"due_R":0.85}', 0);
