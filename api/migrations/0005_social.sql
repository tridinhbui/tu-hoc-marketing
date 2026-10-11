-- Ảnh đại diện, mã mời bạn, chat người học ↔ quản trị, sự kiện đo lường.
ALTER TABLE users ADD COLUMN avatar_url TEXT;
ALTER TABLE users ADD COLUMN invite_code TEXT;
ALTER TABLE users ADD COLUMN invited_by TEXT;
CREATE UNIQUE INDEX IF NOT EXISTS idx_users_invite ON users(invite_code);

CREATE TABLE IF NOT EXISTS referrals (
  invitee_id  TEXT PRIMARY KEY,
  inviter_id  TEXT NOT NULL,
  created_at  INTEGER NOT NULL,
  rewarded_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_ref_inviter ON referrals(inviter_id);

-- Mỗi người học một luồng chat với quản trị; sender cho biết ai viết.
CREATE TABLE IF NOT EXISTS chat_messages (
  id             TEXT PRIMARY KEY,
  thread_user_id TEXT NOT NULL,
  sender         TEXT NOT NULL CHECK (sender IN ('user','admin')),
  body           TEXT NOT NULL,
  created_at     INTEGER NOT NULL,
  read_at        INTEGER
);
CREATE INDEX IF NOT EXISTS idx_chat_thread ON chat_messages(thread_user_id, created_at);
CREATE INDEX IF NOT EXISTS idx_chat_unread ON chat_messages(sender, read_at);

-- Sự kiện đo lường nhẹ: lượt mở trang / bấm tính năng. Không lưu nội dung người dùng gõ.
CREATE TABLE IF NOT EXISTS app_events (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id    TEXT,
  kind       TEXT NOT NULL,
  target     TEXT,
  day        TEXT NOT NULL,
  created_at INTEGER NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_day ON app_events(day, kind);
