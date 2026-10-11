-- Thăm dò nhanh mỗi ngày trên trang cộng đồng: mỗi người một phiếu cho mỗi câu hỏi.
CREATE TABLE IF NOT EXISTS poll_votes (
  poll_id    TEXT NOT NULL,
  user_id    TEXT NOT NULL,
  choice     TEXT NOT NULL CHECK (choice IN ('a','b')),
  created_at INTEGER NOT NULL,
  PRIMARY KEY (poll_id, user_id)
);
CREATE INDEX IF NOT EXISTS idx_poll_votes ON poll_votes(poll_id, choice);
