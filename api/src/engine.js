/* Learning Engine phía server — các hàm thuần (không đụng DB) để kiểm được bằng unit test.
   Nguyên tắc: tổng XP là phép cộng của sổ cái; mọi tổng hợp (level, streak) tính lại được từ sự kiện.
   Server KHÔNG tin số XP trình duyệt gửi: mỗi dòng sổ cái bị kẹp theo luật trong app_config. */

export const DEFAULTS = {
  xp_once: { lesson: 10, learned: 5, solid: 10, exam: 50, drill: 15, talk: 10, case: 40 },
  xp_daily_cap: { review: 40, quiz: 60, game: 50, focus: 15, daily: 10, quest: 30 },
  legacy_cap: 2000,
  levels: [0, 30, 100, 250, 500, 900, 1500, 2400, 3600, 5200, 7500, 10500, 14500, 20000, 27000,
    35000, 44000, 54000, 65000, 77000, 90000, 104000, 120000, 138000, 158000, 180000, 205000, 233000, 265000, 300000],
  streak: { free_freezes: 3, restore_xp: 150, restore_days: 3,
    kinds: ['lesson', 'learned', 'solid', 'review', 'drill', 'talk', 'case', 'exam', 'focus', 'daily'] },
  quests: [],
};

const DAY = /^\d{4}-\d{2}-\d{2}$/;

/* Một dòng sổ cái của trình duyệt → một sự kiện hợp lệ, hoặc null nếu bị loại.
   Khoá có ba dạng: "kind:ref" (một lần), "kind@YYYY-MM-DD" (trần ngày), "spend:restore:YYYY-MM-DD", "legacy:base". */
export function validateEntry(key, e, cfg) {
  if (typeof key !== 'string' || key.length > 200 || !e || typeof e !== 'object') return null;
  const x = Math.trunc(Number(e.x) || 0);
  const d = DAY.test(e.d) ? e.d : null;
  if (!d) return null;

  if (key === 'legacy:base') return { source: 'legacy', ref: key, amount: Math.max(0, Math.min(x, cfg.legacy_cap)), day: d };

  const spend = key.match(/^spend:restore:(\d{4}-\d{2}-\d{2})$/);
  if (spend) return { source: 'spend', ref: key, amount: -cfg.streak.restore_xp, day: spend[1] };   // luôn đúng giá, không tin số gửi lên

  const capped = key.match(/^([a-z]+)@(\d{4}-\d{2}-\d{2})$/);
  if (capped) {
    const cap = cfg.xp_daily_cap[capped[1]];
    if (cap == null) return null;
    return { source: capped[1], ref: key, amount: Math.max(0, Math.min(x, cap)), day: capped[2] };
  }

  const once = key.match(/^([a-z]+):(.+)$/);
  if (once) {
    const src = once[1];
    // "learned" và "lesson" dùng chung khoá lesson:<id>; mức tối đa là mức của bài đạt.
    const max = cfg.xp_once[src];
    if (max == null) return null;
    return { source: src, ref: key, amount: Math.max(0, Math.min(x, max)), day: d };
  }
  return null;
}

export function ingestLedger(xpl, cfg) {
  const out = [];
  for (const [k, e] of Object.entries(xpl || {})) {
    const v = validateEntry(k, e, cfg);
    if (v) out.push(v);
  }
  return out;
}

export function levelOf(xp, levels) {
  let n = 1;
  for (let i = 0; i < levels.length; i++) if (xp >= levels[i]) n = i + 1;
  return n;
}

const dnum = (d) => Math.round(Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10)) / 864e5);

/* Chuỗi ngày: phát lại lịch sử ngày học theo thứ tự.
   - cách 1 ngày: +1
   - bỏ lỡ và còn thẻ: tốn 1 thẻ, chuỗi vẫn +1
   - bỏ lỡ và hết thẻ: chuỗi về 1, nhớ chuỗi cũ để mua lại
   - ngày có sự kiện mua lại: chuỗi = chuỗi cũ (nếu mua trong hạn) */
export function replayStreak(days, restores, cfg, freezesBought = 0) {
  const uniq = [...new Set(days)].filter((d) => DAY.test(d)).sort();
  const rest = new Set(restores || []);
  let streak = 0, longest = 0, used = 0, brokeFrom = null, brokeAt = null, last = null;
  const allowance = cfg.streak.free_freezes + freezesBought;
  for (const d of uniq) {
    if (last == null) streak = 1;
    else {
      const gap = dnum(d) - dnum(last);
      if (gap === 1) streak++;
      else if (gap > 1 && used < allowance) { used++; streak++; }
      else if (gap > 1) { brokeFrom = streak; brokeAt = d; streak = 1; }
    }
    if (rest.has(d) && brokeFrom && brokeFrom > streak && dnum(d) - dnum(brokeAt) <= cfg.streak.restore_days) {
      streak = brokeFrom; brokeFrom = null; brokeAt = null;
    }
    if (streak > 1 && brokeFrom && streak >= brokeFrom) { brokeFrom = null; brokeAt = null; }
    longest = Math.max(longest, streak);
    last = d;
  }
  return { current: streak, longest, lastDay: last, freezesUsed: used, freezesLeft: Math.max(0, allowance - used), brokeFrom, brokeAt };
}

/* Chuỗi hiện tại tính tới "hôm nay": nếu hôm qua không học mà hôm nay chưa học, chuỗi vẫn còn
   (người học còn cả ngày để giữ); chỉ coi là gãy khi đã qua trọn một ngày không học. */
export function streakAsOf(st, today) {
  if (!st.lastDay) return 0;
  const gap = dnum(today) - dnum(st.lastDay);
  if (gap <= 1) return st.current;
  return gap - 1 <= st.freezesLeft ? st.current : 0;
}

export function computeStats(events, cfg, today, freezesBought = 0) {
  const total = Math.max(0, events.reduce((n, e) => n + e.amount, 0));
  const kinds = new Set(cfg.streak.kinds);
  const days = events.filter((e) => e.amount > 0 && kinds.has(e.source)).map((e) => e.day);
  const restores = events.filter((e) => e.source === 'spend').map((e) => e.day);
  const st = replayStreak(days, restores, cfg, freezesBought);
  return { total_xp: total, level: levelOf(total, cfg.levels), streak: streakAsOf(st, today), streak_longest: st.longest,
    last_active_day: st.lastDay, freezes_used: st.freezesUsed, freezes_left: st.freezesLeft };
}

/* Nhiệm vụ ngày: đủ điều kiện khi sổ cái hôm nay có sự kiện đúng loại. Server tự kiểm, không tin client. */
export function questStatus(quests, events, day) {
  const todays = events.filter((e) => e.day === day && e.amount > 0);
  return quests.map((q) => {
    const have = todays.filter((e) => q.need.any.includes(e.source)).length;
    return { id: q.id, t: q.t, xp: q.xp, have: Math.min(have, q.need.n), need: q.need.n, done: have >= q.need.n };
  });
}
