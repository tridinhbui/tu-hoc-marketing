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
  plan_until  INTEGER
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
