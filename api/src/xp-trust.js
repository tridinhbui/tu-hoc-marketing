/* Lọc sổ cái do trình duyệt gửi lên. Trình duyệt tự khai XP, nên server chỉ nhận một dòng khi nó có bằng chứng
   phía server (bài đã được /complete, đề chặng đã chấm đạt) hoặc tham chiếu tới thứ có thật (bài, case).
   Hàm thuần: không đụng DB, kiểm được bằng unit test. */

const DAY_MS = 864e5;
const dnum = (d) => Math.round(Date.UTC(+d.slice(0, 4), +d.slice(5, 7) - 1, +d.slice(8, 10)) / DAY_MS);

/* Nguồn XP chỉ server mới được cấp. Trình duyệt gửi lên thì bỏ. */
const SERVER_ONLY = new Set(['quest', 'referral', 'chest', 'boss', 'pvp']);
/* Nguồn tự khai nhưng có trần ngày trong cấu hình (xp_daily_cap): chỉ cần cửa sổ ngày hợp lệ. */
const SELF_CAPPED = new Set(['review', 'quiz', 'game', 'focus', 'daily', 'readcap']);

export const WINDOW_BACK_DAYS = 7, WINDOW_FWD_DAYS = 1;   // học ngoại tuyến quá 7 ngày thì phần cũ hơn không được ghi

/* ctx: {
     today: 'YYYY-MM-DD' (giờ VN),
     existing: Map(ref -> {day, amount}),      // dòng đã có trong DB
     attestedLessons: Set(lessonKey),          // bài có lesson_progress do server ghi (lesson | stage_exam | placement)
     passedStages: Set('s1'…),                 // đề chặng đã chấm đạt ở server
     hasServerEvents: boolean,                 // tài khoản đã có XP do server cấp
     knownLessons: Set(lessonKey),             // khoá bài có trong ngân hàng
     knownCases: Set(caseId)
   }
   Trả {accepted: [...], rejected: [{ref, why}]} */
export function filterClientLedger(evs, ctx) {
  const accepted = [], rejected = [];
  const lo = dnum(ctx.today) - WINDOW_BACK_DAYS, hi = dnum(ctx.today) + WINDOW_FWD_DAYS;
  const rej = (e, why) => rejected.push({ ref: e.ref, why });
  for (const e of evs) {
    const old = ctx.existing.get(e.ref);
    let day = e.day;
    if (old) day = old.day;                                   // không cho dời ngày của sự kiện đã ghi
    else { const n = dnum(day); if (!(n >= lo && n <= hi)) { rej(e, 'day_out_of_window'); continue; } }
    const keep = (amount) => accepted.push({ ...e, day, amount: old ? Math.max(old.amount, Math.min(amount, e.amount)) : amount });
    const key = e.ref.slice(e.source.length + 1);
    switch (e.source) {
      case 'legacy':
        if (old || !ctx.hasServerEvents) keep(old ? Math.min(e.amount, old.amount) : e.amount); else rej(e, 'legacy_after_server_events');
        break;
      case 'spend': keep(e.amount); break;                    // giá do server đặt (validateEntry)
      case 'lesson': case 'learned':
        if (old) break;                                       // server tự cấp và tự bù phần chênh (completeLesson); không để client sửa
        ctx.attestedLessons.has(key) ? keep(e.amount) : rej(e, 'lesson_not_attested'); break;
      case 'solid': case 'drill': case 'talk':
        ctx.attestedLessons.has(key) ? keep(e.amount) : rej(e, 'lesson_not_attested'); break;
      case 'exam':
        if (old) break;
        ctx.passedStages.has(key) ? keep(e.amount) : rej(e, 'exam_not_passed'); break;
      case 'case':
        ctx.knownCases.has(key) ? keep(e.amount) : rej(e, 'unknown_case'); break;
      default:
        if (SERVER_ONLY.has(e.source)) rej(e, 'server_only');
        else if (SELF_CAPPED.has(e.source)) keep(e.amount);
        else rej(e, 'unknown_source');
    }
  }
  return { accepted, rejected };
}
