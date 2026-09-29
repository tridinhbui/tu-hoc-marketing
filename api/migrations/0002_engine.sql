-- Tự Học Marketing Case · Learning Engine phía server
-- Ba lớp: SỰ KIỆN (chỉ ghi thêm) → TRẠNG THÁI DẪN XUẤT (tính lại được) → CẤU HÌNH.
-- Viết cho D1 (SQLite).

-- Đăng nhập bằng nhà cung cấp ngoài (Google). Một người có thể có nhiều cách đăng nhập.
CREATE TABLE IF NOT EXISTS user_identities (
  provider    TEXT NOT NULL,                 -- google
  subject     TEXT NOT NULL,                 -- id bất biến của nhà cung cấp (Google "sub")
  user_id     TEXT NOT NULL,
  email       TEXT,
  created_at  INTEGER NOT NULL,
  PRIMARY KEY (provider, subject)
);
CREATE INDEX IF NOT EXISTS idx_ident_user ON user_identities(user_id);

-- ========== SỰ KIỆN ==========
-- Sổ cái XP. Tổng XP = SUM(amount). Khoá duy nhất chặn cộng trùng giữa các máy và các lần gửi lại.
CREATE TABLE IF NOT EXISTS xp_events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     TEXT NOT NULL,
  source      TEXT NOT NULL,                 -- lesson | drill | quiz | review | quest | spend | legacy ...
  source_ref  TEXT NOT NULL,                 -- khoá sổ cái, ví dụ "lesson:L:57" hoặc "quiz@2026-09-29"
  amount      INTEGER NOT NULL,
  day_local   TEXT NOT NULL,                 -- YYYY-MM-DD theo giờ người học
  created_at  INTEGER NOT NULL,
  UNIQUE (user_id, source, source_ref)
);
CREATE INDEX IF NOT EXISTS idx_xp_user_day ON xp_events(user_id, day_local);
CREATE INDEX IF NOT EXISTS idx_xp_day ON xp_events(day_local);

-- Mỗi câu trả lời, ở mọi nơi (bài, ôn, đề, game). Nguồn của mastery.
CREATE TABLE IF NOT EXISTS answer_events (
  id               INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id          TEXT NOT NULL,
  question_id      TEXT NOT NULL,
  lesson_id        TEXT,
  skill_id         TEXT,
  context          TEXT NOT NULL,            -- lesson | checkpoint | review | stage_exam | placement | game
  attempt_id       TEXT,
  chosen           INTEGER,
  correct          INTEGER NOT NULL,
  is_first_attempt INTEGER NOT NULL DEFAULT 0,
  answered_at      INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_ans_user ON answer_events(user_id, answered_at);

CREATE TABLE IF NOT EXISTS exam_attempts (
  id           TEXT PRIMARY KEY,
  user_id      TEXT NOT NULL,
  kind         TEXT NOT NULL,                -- stage | placement | level
  stage_id     TEXT,
  seed         INTEGER,
  score        INTEGER,
  total        INTEGER,
  passed       INTEGER,
  started_at   INTEGER NOT NULL,
  submitted_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_exam_user ON exam_attempts(user_id, kind, stage_id, started_at);

-- Nhiệm vụ đã nhận thưởng: mỗi (người, nhiệm vụ, ngày) một lần.
CREATE TABLE IF NOT EXISTS quest_claims (
  user_id     TEXT NOT NULL,
  quest_id    TEXT NOT NULL,
  day_local   TEXT NOT NULL,
  xp          INTEGER NOT NULL,
  created_at  INTEGER NOT NULL,
  PRIMARY KEY (user_id, quest_id, day_local)
);

-- Sổ cái xu (tiền ảo): mua thẻ đóng băng, mở rương.
CREATE TABLE IF NOT EXISTS coin_events (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id     TEXT NOT NULL,
  source      TEXT NOT NULL,
  source_ref  TEXT NOT NULL,
  amount      INTEGER NOT NULL,
  created_at  INTEGER NOT NULL,
  UNIQUE (user_id, source, source_ref)
);

-- ========== TRẠNG THÁI DẪN XUẤT ==========
CREATE TABLE IF NOT EXISTS lesson_progress (
  user_id           TEXT NOT NULL,
  lesson_id         TEXT NOT NULL,
  state             TEXT NOT NULL CHECK (state IN ('in_progress','learned','passed','solid','mastered')),
  first_score       INTEGER,
  completion_source TEXT CHECK (completion_source IN ('lesson','stage_exam','placement','admin','legacy')),
  completed_at      TEXT,
  updated_at        INTEGER NOT NULL,
  PRIMARY KEY (user_id, lesson_id)
);

CREATE TABLE IF NOT EXISTS skill_mastery (
  user_id          TEXT NOT NULL,
  skill_id         TEXT NOT NULL,
  p                REAL NOT NULL DEFAULT 0,
  stability_days   REAL NOT NULL DEFAULT 2,
  n_answers        INTEGER NOT NULL DEFAULT 0,
  last_answered_at INTEGER,
  due_at           INTEGER,
  PRIMARY KEY (user_id, skill_id)
);

CREATE TABLE IF NOT EXISTS question_memory (
  user_id     TEXT NOT NULL,
  question_id TEXT NOT NULL,
  wrong_count INTEGER NOT NULL DEFAULT 0,
  last_correct INTEGER,
  due_at      INTEGER,
  PRIMARY KEY (user_id, question_id)
);

-- Tổng hợp của một người — luôn tính lại được từ xp_events + lịch sử ngày học.
CREATE TABLE IF NOT EXISTS user_stats (
  user_id          TEXT PRIMARY KEY,
  total_xp         INTEGER NOT NULL DEFAULT 0,
  level            INTEGER NOT NULL DEFAULT 1,
  streak_current   INTEGER NOT NULL DEFAULT 0,
  streak_longest   INTEGER NOT NULL DEFAULT 0,
  last_active_day  TEXT,
  freezes_used     INTEGER NOT NULL DEFAULT 0,
  freezes_bought   INTEGER NOT NULL DEFAULT 0,
  coins            INTEGER NOT NULL DEFAULT 0,
  recomputed_at    INTEGER
);

-- ========== CẤU HÌNH ==========
-- Mọi con số của sản phẩm nằm ở đây, đổi không cần deploy.
CREATE TABLE IF NOT EXISTS app_config (
  key         TEXT PRIMARY KEY,
  value       TEXT NOT NULL,                 -- JSON
  updated_by  TEXT,
  updated_at  INTEGER NOT NULL
);
INSERT OR IGNORE INTO app_config (key, value, updated_at) VALUES
  ('xp_once',   '{"lesson":10,"learned":5,"solid":10,"exam":50,"drill":15,"talk":10,"case":40}', 0),
  ('xp_daily_cap', '{"review":40,"quiz":60,"game":50,"focus":15,"daily":10,"quest":30}', 0),
  ('legacy_cap', '2000', 0),
  ('levels', '[0,30,100,250,500,900,1500,2400,3600,5200,7500,10500,14500,20000,27000,35000,44000,54000,65000,77000,90000,104000,120000,138000,158000,180000,205000,233000,265000,300000]', 0),
  ('streak', '{"free_freezes":3,"restore_xp":150,"restore_days":3,"kinds":["lesson","learned","solid","review","drill","talk","case","exam","focus","daily"]}', 0),
  ('quests', '[{"id":"q_lesson","t":"Hoàn thành 1 bài học","xp":10,"need":{"any":["lesson","learned","solid"],"n":1}},{"id":"q_review","t":"Ôn 1 lỗi hoặc làm 1 bài tính số","xp":10,"need":{"any":["review","drill"],"n":1}},{"id":"q_focus","t":"Một phiên tập trung 25 phút","xp":10,"need":{"any":["focus"],"n":1}}]', 0),
  ('lesson_pass_ratio', '0.6', 0),
  ('unlock_mode', '"soft"', 0);
