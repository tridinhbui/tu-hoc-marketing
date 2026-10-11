/* Thế giới game (S.gw): sao và kỷ lục lấy lớn hơn, rương lấy ngày sớm hơn, trang phục/vị trí theo bản mới. Cùng quy tắc với client. */
export function mergeGw(a = {}, b = {}) {
  const max = (x = {}, y = {}) => { const o = { ...x }; for (const [k, v] of Object.entries(y)) o[k] = Math.max(Number(o[k]) || 0, Number(v) || 0); return o; };
  const early = (x = {}, y = {}) => { const o = { ...x }; for (const [k, v] of Object.entries(y)) o[k] = !o[k] || String(v) < String(o[k]) ? v : o[k]; return o; };
  const stars = max(a.stars, b.stars); for (const k of Object.keys(stars)) stars[k] = Math.min(3, stars[k]);
  return { ...a, ...b, stars, best: max(a.best, b.best), chests: early(a.chests, b.chests) };
}
