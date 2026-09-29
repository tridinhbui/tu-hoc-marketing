-- Kinh tế (xu, cửa hàng, rương, booster) và Game Kingdom (World Boss, PvP bóng ma, mùa giải).
CREATE TABLE IF NOT EXISTS user_inventory (
  user_id  TEXT NOT NULL,
  item_id  TEXT NOT NULL,
  qty      INTEGER NOT NULL DEFAULT 0,
  PRIMARY KEY (user_id, item_id)
);
CREATE TABLE IF NOT EXISTS user_boosters (
  user_id  TEXT NOT NULL,
  kind     TEXT NOT NULL,
  mult     REAL NOT NULL,
  until_at INTEGER NOT NULL,
  PRIMARY KEY (user_id, kind)
);
CREATE TABLE IF NOT EXISTS user_chests (
  id          TEXT PRIMARY KEY,
  user_id     TEXT NOT NULL,
  source      TEXT NOT NULL,
  source_ref  TEXT NOT NULL,
  reward_json TEXT,
  created_at  INTEGER NOT NULL,
  opened_at   INTEGER,
  UNIQUE (user_id, source, source_ref)
);
CREATE TABLE IF NOT EXISTS boss_state (
  week    TEXT PRIMARY KEY,
  hp      INTEGER NOT NULL,
  max_hp  INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS boss_hits (
  user_id    TEXT NOT NULL,
  week       TEXT NOT NULL,
  items_json TEXT,
  correct    INTEGER,
  damage     INTEGER,
  xp         INTEGER,
  coins      INTEGER,
  started_at INTEGER NOT NULL,
  submitted_at INTEGER,
  PRIMARY KEY (user_id, week)
);
CREATE TABLE IF NOT EXISTS pvp_results (
  id           TEXT PRIMARY KEY,
  user_id      TEXT NOT NULL,
  week         TEXT NOT NULL,
  day_local    TEXT NOT NULL,
  items_json   TEXT,
  correct      INTEGER,
  total        INTEGER,
  opponent_id  TEXT,
  opponent_correct INTEGER,
  outcome      TEXT,
  bet          INTEGER,
  xp           INTEGER,
  coins        INTEGER,
  started_at   INTEGER NOT NULL,
  submitted_at INTEGER
);
CREATE INDEX IF NOT EXISTS idx_pvp_week ON pvp_results(week, submitted_at);
CREATE TABLE IF NOT EXISTS kingdom_visits (
  user_id    TEXT NOT NULL,
  building   TEXT NOT NULL,
  day_local  TEXT NOT NULL,
  PRIMARY KEY (user_id, building, day_local)
);
INSERT OR IGNORE INTO app_config (key, value, updated_at) VALUES
  ('shop', '[{"id":"streak_freeze","t":"Thẻ đóng băng chuỗi","d":"Giữ chuỗi ngày khi bận một ngày. Cộng vào hạn mức thẻ.","price":200,"kind":"freeze"},{"id":"chest_small","t":"Rương nhỏ","d":"15% ra một thẻ đóng băng, còn lại 30–80 xu.","price":50,"kind":"chest"},{"id":"booster_xp_24h","t":"Booster XP ×2 trong 24 giờ","d":"Nhân đôi XP từ World Boss và đấu PvP. Không áp cho bài học.","price":250,"kind":"booster","min_level":8,"mult":2},{"id":"title_observer","t":"Danh hiệu: Người đọc kệ hàng","d":"Hiện cạnh tên trên bảng xếp hạng.","price":120,"kind":"title"},{"id":"title_numbers","t":"Danh hiệu: Người không tin ROAS","d":"Hiện cạnh tên trên bảng xếp hạng.","price":150,"kind":"title"},{"id":"frame_streak_30","t":"Khung avatar chuỗi 30 ngày","d":"Cần chuỗi dài nhất từ 30 ngày.","price":300,"kind":"frame","min_streak":30}]', 0),
  ('chest', '{"weekly_quests":2,"rewards":[{"t":"Danh hiệu: Người hỏi “so với cái gì?”","xp":0},{"t":"Danh hiệu: Thợ viết brief","xp":0},{"t":"Danh hiệu: Người che logo","xp":0},{"t":"Danh hiệu: Kẻ săn insight","xp":0},{"t":"Danh hiệu: Người giữ nhịp","xp":0},{"t":"+10 XP","xp":10},{"t":"+15 XP","xp":15},{"t":"Giao diện: Hổ phách","xp":0},{"t":"Giao diện: Chu sa","xp":0}]}', 0),
  ('boss', '{"max_hp":1000000,"damage_per_correct":6000,"questions":15,"per_lesson":2,"xp_per_correct":5,"xp_cap":50,"coins_per_correct":35}', 0),
  ('pvp', '{"questions":5,"bet_min":10,"bet_max":200,"xp":{"win":50,"draw":25,"lose":10},"per_day":5,"ghost_default":3}', 0),
  ('kingdom', '[{"id":"case","t":"Phòng họp case","d":"Case có bấm giờ theo ngành","href":"case-thu-vien.html","min_level":1},{"id":"quiz","t":"Sảnh phản xạ","d":"Quiz 60 giây từ bài đã học","href":"quiz.html","min_level":1},{"id":"boss","t":"Tháp World Boss","d":"Cả server cùng hạ một boss mỗi tuần","href":"boss.html","min_level":1},{"id":"pvp","t":"Đấu trường","d":"Đấu với bóng ma của người học thật","href":"pvp.html","min_level":1},{"id":"game","t":"Toà điều hành thương hiệu","d":"Điều hành một thương hiệu qua 8 quý","href":"tro-choi.html","min_level":1},{"id":"shop","t":"Chợ","d":"Đổi xu lấy thẻ đóng băng, rương, booster","href":"shop.html","min_level":1},{"id":"growth","t":"Phòng lab tăng trưởng","d":"Bàn tính unit economics và giá","href":"unit-economics.html","min_level":3},{"id":"library","t":"Thư viện case","d":"Đọc case thật không bấm giờ","href":"gallery.html","min_level":1}]', 0),
  ('coins', '{"quest":10,"visit":5,"stage_exam":50}', 0);
