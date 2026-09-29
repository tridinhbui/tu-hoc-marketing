-- Nhìn thấy · lược đồ D1
-- Phase 0 chỉ dùng bảng subscribers. Các bảng còn lại tạo sẵn để Phase 1–2
-- không phải sửa lược đồ giữa chừng.

CREATE TABLE IF NOT EXISTS subscribers (
  email       TEXT PRIMARY KEY,
  source      TEXT,                       -- trang nào để lại email
  created_at  INTEGER NOT NULL,
  confirmed   INTEGER NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS users (
  id          TEXT PRIMARY KEY,
  email       TEXT UNIQUE NOT NULL,
  created_at  INTEGER NOT NULL,
  plan        TEXT NOT NULL DEFAULT 'free',   -- free | pro
  plan_until  INTEGER,
  display_name TEXT,                          -- tên hiện trên cộng đồng và bảng xếp hạng
  persona     TEXT
);

CREATE TABLE IF NOT EXISTS progress (
  user_id     TEXT NOT NULL,
  kind        TEXT NOT NULL,              -- lesson | case | brand | principle | challenge | taste
  ref         TEXT NOT NULL,
  state       TEXT,
  updated_at  INTEGER NOT NULL,
  PRIMARY KEY (user_id, kind, ref)
);

CREATE TABLE IF NOT EXISTS submissions (
  id           TEXT PRIMARY KEY,
  user_id      TEXT NOT NULL,
  bench        TEXT NOT NULL,             -- segmentation | positioning | interview | customer-map | ...
  payload_json TEXT NOT NULL,
  created_at   INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_sub_user ON submissions(user_id, created_at);

CREATE TABLE IF NOT EXISTS feedback (
  id             TEXT PRIMARY KEY,
  submission_id  TEXT NOT NULL,
  model          TEXT NOT NULL,
  rubric_version TEXT NOT NULL,
  verdict_json   TEXT NOT NULL,
  cost_usd       REAL NOT NULL DEFAULT 0, -- ghi từng lượt để biết tháng này AI ăn bao nhiêu
  created_at     INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_fb_sub ON feedback(submission_id);

CREATE TABLE IF NOT EXISTS srs (
  user_id       TEXT NOT NULL,
  principle_id  TEXT NOT NULL,
  due_at        INTEGER NOT NULL,
  interval_days INTEGER NOT NULL DEFAULT 1,
  ease          REAL NOT NULL DEFAULT 2.5,
  PRIMARY KEY (user_id, principle_id)
);
CREATE INDEX IF NOT EXISTS idx_srs_due ON srs(user_id, due_at);

-- ---------- Tự Học Marketing Case: đồng bộ, xếp hạng, cộng đồng, AI ----------

-- Toàn bộ trạng thái học (bản gộp mới nhất), một dòng mỗi người.
CREATE TABLE IF NOT EXISTS user_state (
  user_id     TEXT PRIMARY KEY,
  state_json  TEXT NOT NULL,
  updated_at  INTEGER NOT NULL
);

-- Điểm tuần, tính lại ở server mỗi lần đồng bộ từ nhật ký hoạt động.
CREATE TABLE IF NOT EXISTS weekly (
  user_id     TEXT NOT NULL,
  week        TEXT NOT NULL,                  -- ngày thứ Hai đầu tuần, YYYY-MM-DD
  xp          INTEGER NOT NULL DEFAULT 0,
  streak      INTEGER NOT NULL DEFAULT 0,
  cases       INTEGER NOT NULL DEFAULT 0,
  updated_at  INTEGER NOT NULL,
  PRIMARY KEY (user_id, week)
);
CREATE INDEX IF NOT EXISTS idx_weekly_xp ON weekly(week, xp DESC);

CREATE TABLE IF NOT EXISTS posts (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL,
  kind        TEXT NOT NULL,                  -- phan-tich | phong-van | hoi
  title       TEXT NOT NULL,
  body        TEXT NOT NULL,
  likes       INTEGER NOT NULL DEFAULT 0,
  comments    INTEGER NOT NULL DEFAULT 0,
  reports     INTEGER NOT NULL DEFAULT 0,
  hidden      INTEGER NOT NULL DEFAULT 0,     -- 1 = ẩn chờ quản trị xem
  created_at  INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_posts_new ON posts(hidden, created_at DESC);

CREATE TABLE IF NOT EXISTS comments (
  id          TEXT PRIMARY KEY,
  post_id     TEXT NOT NULL,
  user_id     TEXT NOT NULL,
  body        TEXT NOT NULL,
  reports     INTEGER NOT NULL DEFAULT 0,
  hidden      INTEGER NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_comments_post ON comments(post_id, created_at);

CREATE TABLE IF NOT EXISTS likes (
  post_id     TEXT NOT NULL,
  user_id     TEXT NOT NULL,
  PRIMARY KEY (post_id, user_id)
);

CREATE TABLE IF NOT EXISTS reports (
  target_type TEXT NOT NULL,                  -- post | comment
  target_id   TEXT NOT NULL,
  user_id     TEXT NOT NULL,
  reason      TEXT,
  created_at  INTEGER NOT NULL,
  PRIMARY KEY (target_type, target_id, user_id)
);

-- Hạn mức AI: đếm theo người, theo kỳ (tháng YYYY-MM hoặc ngày YYYY-MM-DD).
CREATE TABLE IF NOT EXISTS ai_usage (
  user_id     TEXT NOT NULL,
  kind        TEXT NOT NULL,                  -- grade | interview | assist
  period      TEXT NOT NULL,
  count       INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, kind, period)
);

-- Mỗi lượt gọi AI: để biết tháng này tốn bao nhiêu.
CREATE TABLE IF NOT EXISTS ai_calls (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL,
  kind        TEXT NOT NULL,
  model       TEXT,
  cost_usd    REAL NOT NULL DEFAULT 0,
  created_at  INTEGER NOT NULL
);
