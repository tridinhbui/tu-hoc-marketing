/* KHUNG CHUNG CHO CÁC GAME TRONG VƯƠNG QUỐC — sao, kỷ lục, thưởng XP.
   Sao lưu ở S.gw.stars[gameId] (0–3). XP chỉ trả cho SAO MỚI, qua award('game') nên chịu trần ngày của app. */
const GW = {
  stars(id) { return ((S.get().gw || {}).stars || {})[id] || 0; },
  best(id) { return ((S.get().gw || {}).best || {})[id]; },
  /* Ghi kết quả một lượt chơi. Trả {prev, stars, gain, xp}. */
  report(id, stars, score) {
    const s = S.get(), gw = s.gw || {}, st = { ...(gw.stars || {}) }, bs = { ...(gw.best || {}) };
    const prev = st[id] || 0, gain = Math.max(0, stars - prev);
    if (stars > prev) st[id] = stars;
    if (!(id in bs) || score > bs[id]) bs[id] = score;
    S.set({ gw: { ...gw, stars: st, best: bs } });
    if (stars > prev && typeof scheduleSync === 'function') scheduleSync();     // sao mới thì đồng bộ (kể cả khi XP đã chạm trần ngày)
    let xp = 0;
    if (gain > 0) { award('game', id, gain); xp = award.last || 0; }
    return { prev, stars, gain, xp };
  },
  starsText(n, max = 3) { return '★'.repeat(n) + '☆'.repeat(Math.max(0, max - n)); },
  /* Khối kết quả dùng chung cho mọi game. */
  resultHTML(r, { goal } = {}) {
    const msg = r.gain > 0
      ? (r.xp > 0 ? `Sao mới: +${r.gain} → +${r.xp} XP.` : `Sao mới: +${r.gain}. Hôm nay đã đủ XP từ game — sao vẫn được ghi.`)
      : (r.stars >= 3 ? 'Bạn đã đạt tối đa. Chơi lại để thử chiến lược khác — XP chỉ tính cho sao mới.' : 'Chưa có sao mới. XP chỉ tính cho sao mới, nên chơi lại để lấy thêm sao.');
    return `<div class="gw-result"><div class="gw-stars" aria-label="${r.stars} trên 3 sao">${this.starsText(r.stars)}</div>
      <p>${msg}</p>${goal ? `<p class="gw-goal">${goal}</p>` : ''}
      <div class="gw-actions"><a class="gw-btn" href="kingdom.html">← Về bản đồ vương quốc</a></div></div>`;
  },
};
if (typeof module !== 'undefined') module.exports = GW;
