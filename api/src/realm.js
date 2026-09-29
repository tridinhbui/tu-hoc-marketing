/* Kinh tế + Game Kingdom.
   Xu là sổ cái riêng (coin_events), số dư = tổng sổ. Mọi giá kiểm ở server; giá trên giao diện chỉ để hiển thị.
   World Boss và PvP chỉ chấm câu có đáp án, câu rút từ bài người chơi đã học, đề cố định theo (người, tuần). */
import { json, now, rid, str, currentUser, body, publicName } from './lib.js';
import { loadConfig, vnToday, recompute } from './progress.js';
import { weekStart } from './state.js';
import { grantXp } from './learn.js';
import BANK from './generated/bank.json';
import { gradeItem, publicItem, pickSpread, seeded, hashStr } from './learn-core.js';

const HOUR = 3600e3;
const LEARNED = "('learned','passed','solid','mastered')";

export async function coinBalance(env, uid) {
  return (await env.DB.prepare('SELECT COALESCE(SUM(amount),0) AS n FROM coin_events WHERE user_id = ?1').bind(uid).first()).n;
}
export async function grantCoins(env, uid, source, ref, amount) {
  const r = await env.DB.prepare('INSERT OR IGNORE INTO coin_events (user_id, source, source_ref, amount, created_at) VALUES (?1, ?2, ?3, ?4, ?5)')
    .bind(uid, source, ref, amount, now()).run();
  return r.meta && r.meta.changes ? amount : 0;
}
export async function grantChest(env, uid, source, ref) {
  const r = await env.DB.prepare('INSERT OR IGNORE INTO user_chests (id, user_id, source, source_ref, created_at) VALUES (?1, ?2, ?3, ?4, ?5)')
    .bind(rid(), uid, source, ref, now()).run();
  return !!(r.meta && r.meta.changes);
}
async function boosterMult(env, uid) {
  const b = await env.DB.prepare(`SELECT mult FROM user_boosters WHERE user_id = ?1 AND kind = 'xp' AND until_at > ?2`).bind(uid, now()).first();
  return Math.min(3, b ? b.mult : 1);                                // kẹp tối đa ×3
}
async function addInventory(env, uid, item, n = 1) {
  await env.DB.prepare(`INSERT INTO user_inventory (user_id, item_id, qty) VALUES (?1, ?2, ?3)
    ON CONFLICT(user_id, item_id) DO UPDATE SET qty = qty + excluded.qty`).bind(uid, item, n).run();
}
/* Thẻ đóng băng mua thêm: tăng hạn mức trọn đời, ghi cả vào trạng thái để trình duyệt biết. */
async function addFreeze(env, uid) {
  await addInventory(env, uid, 'freeze_total', 1);
  const row = await env.DB.prepare('SELECT state_json FROM user_state WHERE user_id = ?1').bind(uid).first();
  if (row) { const s = JSON.parse(row.state_json); s.fzBought = (s.fzBought || 0) + 1;
    await env.DB.prepare('UPDATE user_state SET state_json = ?1, updated_at = ?2 WHERE user_id = ?3').bind(JSON.stringify(s), now(), uid).run(); }
}
export async function freezesBought(env, uid) {
  const r = await env.DB.prepare(`SELECT qty FROM user_inventory WHERE user_id = ?1 AND item_id = 'freeze_total'`).bind(uid).first();
  return r ? r.qty : 0;
}

/* ---------- ví, cửa hàng, rương ---------- */
export async function wallet(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const cfg = await loadConfig(env);
  const stats = await recompute(env, u.id, cfg);
  const inv = (await env.DB.prepare('SELECT item_id, qty FROM user_inventory WHERE user_id = ?1').bind(u.id).all()).results || [];
  const chests = (await env.DB.prepare('SELECT id, source, source_ref, reward_json, opened_at FROM user_chests WHERE user_id = ?1 ORDER BY created_at DESC LIMIT 30').bind(u.id).all()).results || [];
  const b = await env.DB.prepare(`SELECT mult, until_at FROM user_boosters WHERE user_id = ?1 AND kind = 'xp' AND until_at > ?2`).bind(u.id, now()).first();
  return json({ coins: await coinBalance(env, u.id), level: stats.level, total_xp: stats.total_xp, streak_longest: stats.streak_longest,
    freezes_left: stats.freezes_left, inventory: inv, booster: b || null, chests: chests.map((c) => ({ ...c, reward: c.reward_json ? JSON.parse(c.reward_json) : null })),
    shop: (cfg.shop || []).map((i) => ({ ...i, locked: (i.min_level && stats.level < i.min_level) || (i.min_streak && stats.streak_longest < i.min_streak) })) });
}

export async function buy(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 2000), cfg = await loadConfig(env);
  const item = (cfg.shop || []).find((i) => i.id === str(b.item_id, 40));
  if (!item) return json({ error: 'unknown_item' }, 404);
  const stats = await recompute(env, u.id, cfg);
  if (item.min_level && stats.level < item.min_level) return json({ error: 'level_required', need: item.min_level }, 403);
  if (item.min_streak && stats.streak_longest < item.min_streak) return json({ error: 'streak_required', need: item.min_streak }, 403);
  if ((item.kind === 'title' || item.kind === 'frame')) {
    const own = await env.DB.prepare('SELECT qty FROM user_inventory WHERE user_id = ?1 AND item_id = ?2').bind(u.id, item.id).first();
    if (own && own.qty > 0) return json({ error: 'already_owned' }, 409);
  }
  const bal = await coinBalance(env, u.id);
  if (bal < item.price) return json({ error: 'not_enough_coins', coins: bal, price: item.price }, 402);
  const ref = `${item.id}:${rid()}`;
  await grantCoins(env, u.id, 'shop', ref, -item.price);
  let result = {};
  if (item.kind === 'freeze') { await addFreeze(env, u.id); result = { freeze: 1 }; }
  else if (item.kind === 'chest') { await grantChest(env, u.id, 'shop', ref); result = { chest: 1 }; }
  else if (item.kind === 'booster') {
    await env.DB.prepare(`INSERT INTO user_boosters (user_id, kind, mult, until_at) VALUES (?1, 'xp', ?2, ?3)
      ON CONFLICT(user_id, kind) DO UPDATE SET mult = excluded.mult, until_at = MAX(user_boosters.until_at, ?4) + 86400000`)
      .bind(u.id, Math.min(3, item.mult || 2), now() + 24 * HOUR, now()).run();
    result = { booster: item.mult || 2 };
  } else await addInventory(env, u.id, item.id, 1);
  return json({ ok: true, item: item.id, coins: await coinBalance(env, u.id), ...result });
}

export async function openChest(req, env, id) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const c = await env.DB.prepare('SELECT * FROM user_chests WHERE id = ?1 AND user_id = ?2').bind(id, u.id).first();
  if (!c) return json({ error: 'not_found' }, 404);
  if (c.opened_at) return json({ error: 'already_opened', reward: JSON.parse(c.reward_json) }, 409);
  const cfg = await loadConfig(env);
  const rnd = crypto.getRandomValues(new Uint32Array(2));
  let reward;
  if (c.source === 'shop' && c.source_ref.startsWith('chest_small')) {
    reward = rnd[0] % 100 < 15 ? { t: 'Thẻ đóng băng', freeze: 1 } : { t: 'Xu', coins: 30 + (rnd[1] % 51) };
  } else {
    const list = cfg.chest.rewards; reward = list[rnd[0] % list.length];      // đều trong 9 phần thưởng
  }
  const up = await env.DB.prepare('UPDATE user_chests SET opened_at = ?1, reward_json = ?2 WHERE id = ?3 AND opened_at IS NULL').bind(now(), JSON.stringify(reward), c.id).run();
  if (!up.meta || !up.meta.changes) return json({ error: 'already_opened' }, 409);
  if (reward.freeze) await addFreeze(env, u.id);
  if (reward.coins) await grantCoins(env, u.id, 'chest', 'chest:' + c.id, reward.coins);
  if (reward.xp) await grantXp(env, u.id, 'chest', 'chest:' + c.id, reward.xp);
  if (reward.t && reward.t.startsWith('Danh hiệu') || (reward.t || '').startsWith('Giao diện')) await addInventory(env, u.id, 'reward:' + reward.t, 1);
  return json({ ok: true, reward, coins: await coinBalance(env, u.id) });
}

/* Gọi khi nhận thưởng nhiệm vụ: +xu, và đủ số nhiệm vụ thật trong tuần thì được một rương. */
export async function onQuestClaimed(env, uid, questId, day) {
  const cfg = await loadConfig(env);
  await grantCoins(env, uid, 'quest', `quest:${questId}@${day}`, (cfg.coins || {}).quest ?? 10);
  const w = weekStart();
  const n = (await env.DB.prepare('SELECT COUNT(*) AS n FROM quest_claims WHERE user_id = ?1 AND day_local >= ?2 AND xp > 0').bind(uid, w).first()).n;
  if (n >= ((cfg.chest || {}).weekly_quests ?? 2)) await grantChest(env, uid, 'weekly', w);
}
export async function onStagePassed(env, uid, stageId) {
  const cfg = await loadConfig(env);
  await grantCoins(env, uid, 'stage_exam', 'stage:' + stageId, (cfg.coins || {}).stage_exam ?? 50);
  await grantChest(env, uid, 'stage', stageId);
}

/* ---------- Kingdom ---------- */
export async function kingdom(req, env) {
  const u = await currentUser(req, env), cfg = await loadConfig(env);
  const lv = u ? (await recompute(env, u.id, cfg)).level : 1;
  const day = vnToday();
  const visited = u ? new Set(((await env.DB.prepare('SELECT building FROM kingdom_visits WHERE user_id = ?1 AND day_local = ?2').bind(u.id, day).all()).results || []).map((r) => r.building)) : new Set();
  return json({ level: lv, coins: u ? await coinBalance(env, u.id) : null,
    buildings: (cfg.kingdom || []).map((b) => ({ ...b, locked: lv < (b.min_level || 1), visited: visited.has(b.id) })) });
}
export async function visit(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const b = await body(req, 1000), cfg = await loadConfig(env);
  const bld = (cfg.kingdom || []).find((x) => x.id === str(b.building, 40));
  if (!bld) return json({ error: 'unknown_building' }, 404);
  const lv = (await recompute(env, u.id, cfg)).level;
  if (lv < (bld.min_level || 1)) return json({ error: 'level_required', need: bld.min_level }, 403);
  const day = vnToday();
  const ins = await env.DB.prepare('INSERT OR IGNORE INTO kingdom_visits (user_id, building, day_local) VALUES (?1, ?2, ?3)').bind(u.id, bld.id, day).run();
  const got = ins.meta && ins.meta.changes ? await grantCoins(env, u.id, 'visit', `visit:${bld.id}@${day}`, (cfg.coins || {}).visit ?? 5) : 0;
  return json({ ok: true, coins_gained: got, href: bld.href });
}

/* Câu từ bài đã học (tối đa perLesson câu mỗi bài); chưa học đủ 8 bài thì dùng kho cố định của chặng 1. */
async function learnedPool(env, uid) {
  const rows = (await env.DB.prepare(`SELECT lesson_id FROM lesson_progress WHERE user_id = ?1 AND state IN ${LEARNED}`).bind(uid).all()).results || [];
  const lessons = rows.map((r) => r.lesson_id).filter((k) => BANK.lessons[k]);
  if (lessons.length < 8) return { pool: BANK.stages.s1 || [], fixed: true };
  return { pool: lessons.flatMap((k) => BANK.lessons[k]), fixed: false };
}

/* ---------- World Boss: máu chung, một lượt mỗi người mỗi tuần ---------- */
export async function bossGet(req, env) {
  const cfg = (await loadConfig(env)).boss, w = weekStart();
  await env.DB.prepare('INSERT OR IGNORE INTO boss_state (week, hp, max_hp) VALUES (?1, ?2, ?2)').bind(w, cfg.max_hp).run();
  const st = await env.DB.prepare('SELECT hp, max_hp FROM boss_state WHERE week = ?1').bind(w).first();
  const top = (await env.DB.prepare(`SELECT h.user_id, h.damage, u.display_name FROM boss_hits h JOIN users u ON u.id = h.user_id
     WHERE h.week = ?1 AND h.submitted_at IS NOT NULL ORDER BY h.damage DESC LIMIT 10`).bind(w).all()).results || [];
  const u = await currentUser(req, env);
  const out = { week: w, hp: st.hp, max_hp: st.max_hp, damage_per_correct: cfg.damage_per_correct,
    top: top.map((t) => ({ name: publicName({ id: t.user_id, display_name: t.display_name }), damage: t.damage })) };
  if (!u) return json(out);
  let hit = await env.DB.prepare('SELECT * FROM boss_hits WHERE user_id = ?1 AND week = ?2').bind(u.id, w).first();
  if (hit && hit.submitted_at) return json({ ...out, done: true, mine: { correct: hit.correct, damage: hit.damage, xp: hit.xp, coins: hit.coins } });
  if (!hit) {
    const { pool, fixed } = await learnedPool(env, u.id);
    const items = pickSpread(pool, BANK, cfg.questions, seeded(hashStr(u.id + w + 'boss')), cfg.per_lesson);   // cố định theo (người, tuần)
    await env.DB.prepare('INSERT OR IGNORE INTO boss_hits (user_id, week, items_json, started_at) VALUES (?1, ?2, ?3, ?4)').bind(u.id, w, JSON.stringify({ items, fixed }), now()).run();
    hit = await env.DB.prepare('SELECT * FROM boss_hits WHERE user_id = ?1 AND week = ?2').bind(u.id, w).first();
  }
  const { items, fixed } = JSON.parse(hit.items_json);
  return json({ ...out, done: false, fixed_pool: fixed, items: items.map((id) => publicItem(BANK.items[id])) });
}
export async function bossPost(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const cfg = (await loadConfig(env)).boss, w = weekStart(), b = await body(req, 20000);
  const hit = await env.DB.prepare('SELECT * FROM boss_hits WHERE user_id = ?1 AND week = ?2').bind(u.id, w).first();
  if (!hit) return json({ error: 'no_raid' }, 404);
  if (hit.submitted_at) return json({ error: 'already_submitted' }, 409);
  const { items } = JSON.parse(hit.items_json);
  const detail = items.map((id) => ({ id, ...gradeItem(BANK.items[id], (b.answers || {})[id]) }));
  const correct = detail.filter((d) => d.correct).length;
  const damage = correct * cfg.damage_per_correct;                    // sát thương tính ở server, bỏ qua số client gửi
  const mult = await boosterMult(env, u.id);
  const xpAmt = Math.floor(Math.min(cfg.xp_cap, correct * cfg.xp_per_correct) * mult);   // booster áp sau trần
  const coinAmt = Math.floor(correct * cfg.coins_per_correct * mult);
  const up = await env.DB.prepare('UPDATE boss_hits SET correct = ?1, damage = ?2, xp = ?3, coins = ?4, submitted_at = ?5 WHERE user_id = ?6 AND week = ?7 AND submitted_at IS NULL')
    .bind(correct, damage, xpAmt, coinAmt, now(), u.id, w).run();
  if (!up.meta || !up.meta.changes) return json({ error: 'already_submitted' }, 409);
  await env.DB.prepare('UPDATE boss_state SET hp = MAX(0, hp - ?1) WHERE week = ?2').bind(damage, w).run();   // nguyên tử
  if (xpAmt) await grantXp(env, u.id, 'boss', 'boss:' + w, xpAmt);
  if (coinAmt) await grantCoins(env, u.id, 'boss', 'boss:' + w, coinAmt);
  const st = await env.DB.prepare('SELECT hp, max_hp FROM boss_state WHERE week = ?1').bind(w).first();
  return json({ correct, total: items.length, damage, xp: xpAmt, coins: coinAmt, booster: mult, hp: st.hp, max_hp: st.max_hp, detail });
}

/* ---------- PvP bóng ma: đối thủ là kết quả thật đã ghi của người khác trong 7 ngày ---------- */
export async function pvpGet(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const cfg = (await loadConfig(env)).pvp, w = weekStart(), day = vnToday();
  const today = (await env.DB.prepare('SELECT COUNT(*) AS n FROM pvp_results WHERE user_id = ?1 AND day_local = ?2').bind(u.id, day).first()).n;
  if (today >= cfg.per_day) return json({ error: 'daily_limit', per_day: cfg.per_day }, 429);
  const open = await env.DB.prepare('SELECT * FROM pvp_results WHERE user_id = ?1 AND submitted_at IS NULL ORDER BY started_at DESC LIMIT 1').bind(u.id).first();
  let duel = open;
  if (!duel) {
    const ghosts = (await env.DB.prepare(`SELECT p.user_id, p.correct, u.display_name FROM pvp_results p JOIN users u ON u.id = p.user_id
       WHERE p.user_id != ?1 AND p.submitted_at > ?2 ORDER BY p.submitted_at`).bind(u.id, now() - 7 * 24 * HOUR).all()).results || [];
    const g = ghosts.length ? ghosts[hashStr(u.id + w + today) % ghosts.length] : null;
    const { pool } = await learnedPool(env, u.id);
    const items = pickSpread(pool, BANK, cfg.questions, seeded(hashStr(u.id + w + today + 'pvp')), 1);
    const id = rid();
    await env.DB.prepare(`INSERT INTO pvp_results (id, user_id, week, day_local, items_json, total, opponent_id, opponent_correct, started_at)
       VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9)`).bind(id, u.id, w, day, JSON.stringify(items), items.length, g ? g.user_id : null, g ? g.correct : cfg.ghost_default, now()).run();
    duel = await env.DB.prepare('SELECT * FROM pvp_results WHERE id = ?1').bind(id).first();
  }
  const opp = duel.opponent_id ? await env.DB.prepare('SELECT id, display_name FROM users WHERE id = ?1').bind(duel.opponent_id).first() : null;
  return json({ duel_id: duel.id, opponent: opp ? publicName(opp) : 'Bóng ma luyện tập', opponent_real: !!opp, opponent_correct: duel.opponent_correct,
    coins: await coinBalance(env, u.id), bet_min: cfg.bet_min, bet_max: cfg.bet_max, left_today: cfg.per_day - today,
    items: JSON.parse(duel.items_json).map((id) => publicItem(BANK.items[id])) });
}
export async function pvpPost(req, env) {
  const u = await currentUser(req, env);
  if (!u) return json({ error: 'login_required' }, 401);
  const cfg = (await loadConfig(env)).pvp, b = await body(req, 20000);
  const d = await env.DB.prepare('SELECT * FROM pvp_results WHERE id = ?1 AND user_id = ?2').bind(str(b.duel_id, 64), u.id).first();
  if (!d) return json({ error: 'not_found' }, 404);
  if (d.submitted_at) return json({ error: 'already_submitted' }, 409);
  const bet = Math.trunc(Number(b.bet) || 0);
  if (bet && (bet < cfg.bet_min || bet > cfg.bet_max)) return json({ error: 'bad_bet', min: cfg.bet_min, max: cfg.bet_max }, 400);
  if (bet > await coinBalance(env, u.id)) return json({ error: 'not_enough_coins' }, 402);
  const items = JSON.parse(d.items_json);
  const detail = items.map((id) => ({ id, ...gradeItem(BANK.items[id], (b.answers || {})[id]) }));
  const correct = detail.filter((x) => x.correct).length;
  const outcome = correct > d.opponent_correct ? 'win' : correct === d.opponent_correct ? 'draw' : 'lose';
  const mult = await boosterMult(env, u.id);
  const xpAmt = Math.floor(cfg.xp[outcome] * mult);
  const coinDelta = outcome === 'win' ? bet : outcome === 'lose' ? -bet : 0;
  const up = await env.DB.prepare(`UPDATE pvp_results SET correct = ?1, outcome = ?2, bet = ?3, xp = ?4, coins = ?5, submitted_at = ?6 WHERE id = ?7 AND submitted_at IS NULL`)
    .bind(correct, outcome, bet, xpAmt, coinDelta, now(), d.id).run();
  if (!up.meta || !up.meta.changes) return json({ error: 'already_submitted' }, 409);
  await grantXp(env, u.id, 'pvp', 'pvp:' + d.id, xpAmt);
  if (coinDelta) await grantCoins(env, u.id, 'pvp', 'pvp:' + d.id, coinDelta);
  return json({ correct, total: items.length, opponent_correct: d.opponent_correct, outcome, xp: xpAmt, coins_delta: coinDelta, coins: await coinBalance(env, u.id), detail });
}

/* ---------- mùa giải: 4 tuần (UTC); điểm = sát thương boss + điểm PvP (thắng 3, hoà 1) ---------- */
export function seasonOf(t = Date.now()) {
  const day = Math.floor(t / 864e5), week = Math.floor((day - 4) / 7);  // tuần bắt đầu thứ Hai, mốc 1970-01-05
  const s = Math.floor(week / 4), startDay = s * 28 + 4;
  const iso = (d) => new Date(d * 864e5).toISOString().slice(0, 10);
  return { id: 'S' + s, start: iso(startDay), end: iso(startDay + 27) };
}
export async function season(req, env) {
  const s = seasonOf();
  const rows = (await env.DB.prepare(`
    SELECT u.id, u.display_name,
      COALESCE((SELECT SUM(damage) FROM boss_hits b WHERE b.user_id = u.id AND b.week BETWEEN ?1 AND ?2 AND b.submitted_at IS NOT NULL), 0) AS boss,
      COALESCE((SELECT SUM(CASE outcome WHEN 'win' THEN 3 WHEN 'draw' THEN 1 ELSE 0 END) FROM pvp_results p WHERE p.user_id = u.id AND p.day_local BETWEEN ?1 AND ?2), 0) AS pvp
    FROM users u`).bind(s.start, s.end).all()).results || [];
  const list = rows.map((r) => ({ name: publicName({ id: r.id, display_name: r.display_name }), boss: r.boss, pvp: r.pvp, points: Math.round(r.boss / 6000) + r.pvp }))
    .filter((r) => r.points > 0).sort((a, b) => b.points - a.points).slice(0, 50);
  return json({ season: s, rows: list });
}
