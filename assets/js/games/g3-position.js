/* G3 · BẢN ĐỒ ĐỊNH VỊ — mô hình thuần, không ngẫu nhiên. Mọi số là MINH HOẠ.
   Lưới 5×5: trục ngang là GIÁ (rẻ → cao), trục dọc là một thuộc tính (đổi theo vòng). Mỗi ô có nhu cầu (khách muốn ở đó).
   Bạn đặt thương hiệu vào MỘT ô. Khách ở mỗi ô chọn thương hiệu GẦN NHẤT (bằng nhau thì chia đều).
   Điểm = phần nhu cầu bạn lấy được so với vị trí tốt nhất. Nguyên lý: chỗ đông khách chưa chắc là chỗ có phần cho bạn;
   đứng cạnh người mạnh thì chia nhỏ, đứng ở khoảng trống đủ khách mới thắng. */
const G3 = {
  N: 5,
  rounds: [
    { id: 'm1', t: 'Cà phê đóng chai', x: ['Rẻ', 'Cao'], y: ['Tiện lợi', 'Trải nghiệm'],
      brief: 'Ba thương hiệu chen nhau ở giữa và phía dưới. Khách đông nhất nằm gần trung tâm, nhưng đó cũng là chỗ đông người bán nhất.',
      blobs: [[2, 2, 9, 1.3], [3, 3, 5, 1.0], [0, 1, 4, 0.9]], rivals: [[2, 2], [2, 3], [1, 2]] },
    { id: 'm2', t: 'Ví điện tử cho người mới', x: ['Phí thấp', 'Phí cao'], y: ['Đơn giản', 'Nhiều tính năng'],
      brief: 'Nhu cầu chia làm hai cụm: người cần đơn giản và người cần đủ tính năng. Đối thủ chiếm cụm đơn giản và ngay giữa; cụm nhiều tính năng gần như không ai phục vụ kỹ.',
      blobs: [[1, 0, 8, 1.0], [3, 4, 7, 1.0], [2, 2, 3, 1.0]], rivals: [[1, 0], [2, 2], [3, 3]] },
    { id: 'm3', t: 'Sữa chua uống', x: ['Giá thấp', 'Giá cao'], y: ['Vị truyền thống', 'Vị mới lạ'],
      brief: 'Ba đối thủ đứng khá đều. Có một khoảng trống đủ khách ở phía giá cao, vị mới lạ — nhưng sát nhà cao cấp.',
      blobs: [[1, 1, 7, 1.1], [3, 3, 6, 1.0], [4, 1, 4, 0.9], [2, 4, 3, 0.8]], rivals: [[1, 1], [1, 2], [3, 2]] },
  ],
  demand(round) {
    const D = [];
    for (let y = 0; y < this.N; y++) { D.push([]); for (let x = 0; x < this.N; x++) {
      D[y].push(round.blobs.reduce((s, [cx, cy, a, sg]) => s + a * Math.exp(-((x - cx) ** 2 + (y - cy) ** 2) / (2 * sg * sg)), 0)); } }
    return D;
  },
  /* chia nhu cầu cho từng thương hiệu: rivals + bạn ở `me`=[x,y]. Trả {mine, total, owner: ma trận chỉ số hoặc -1(hoà)} */
  split(round, me) {
    const D = this.demand(round), brands = [...round.rivals, me]; let mine = 0, total = 0; const owner = [];
    for (let y = 0; y < this.N; y++) { owner.push([]); for (let x = 0; x < this.N; x++) {
      const ds = brands.map(([bx, by]) => Math.hypot(bx - x, by - y)), m = Math.min(...ds), w = ds.map((d) => Math.abs(d - m) < 1e-9);
      const k = w.filter(Boolean).length; total += D[y][x];
      if (w[brands.length - 1]) mine += D[y][x] / k;
      owner[y].push(k === 1 ? w.indexOf(true) : -1); } }
    return { mine, total, owner };
  },
  best(round) {
    let top = { v: -1, cell: null };
    for (let y = 0; y < this.N; y++) for (let x = 0; x < this.N; x++) { const v = this.split(round, [x, y]).mine; if (v > top.v) top = { v, cell: [x, y] }; }
    return top;
  },
  score(picks) { return picks.length ? picks.reduce((s, p, i) => s + this.split(this.rounds[i], p).mine / this.best(this.rounds[i]).v, 0) / picks.length : 0; },
  stars(s) { return s >= 0.97 ? 3 : s >= 0.85 ? 2 : s >= 0.6 ? 1 : 0; },
};
if (typeof module !== 'undefined') module.exports = G3;
