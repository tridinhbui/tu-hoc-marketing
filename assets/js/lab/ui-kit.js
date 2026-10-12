/* MARKETING LAB · TIỆN ÍCH GIAO DIỆN DÙNG CHUNG cho các simulator mới (Google Ads, sau này GA4/SEO). */
const LabUI = {
  dt: (t) => new Date(t).toLocaleString('vi-VN', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }),
  stars: (n) => '★'.repeat(n) + '☆'.repeat(3 - n),
  /* Biểu đồ đường theo ngày. accessor(row) → số; fmt(số) → chuỗi. */
  chart(rows, accessor, fmt) {
    const W = 640, H = 210, L = 50, B = 26, T = 10, R = 10;
    const ys = rows.map((r) => accessor(r) ?? 0), max = Math.max(...ys, 1e-9);
    const px = (i) => L + (rows.length > 1 ? i / (rows.length - 1) : 0.5) * (W - L - R), py = (y) => T + (1 - y / max) * (H - T - B);
    const pts = ys.map((y, i) => `${px(i).toFixed(1)},${py(y).toFixed(1)}`).join(' ');
    const grid = [0, 0.5, 1].map((g) => `<line x1="${L}" x2="${W - R}" y1="${py(max * g)}" y2="${py(max * g)}" stroke="currentColor" opacity=".13"/><text x="${L - 6}" y="${py(max * g) + 4}" text-anchor="end">${fmt(max * g)}</text>`).join('');
    const step = Math.ceil(rows.length / 10);
    const xl = rows.map((r, i) => i % step === 0 ? `<text x="${px(i)}" y="${H - 8}" text-anchor="middle">N${r.day}</text>` : '').join('');
    return `<svg class="chart" viewBox="0 0 ${W} ${H}" role="img" aria-label="Biểu đồ theo ngày"><g style="color:var(--lb-ink)">${grid}</g>
      <polygon points="${L},${H - B} ${pts} ${px(ys.length - 1).toFixed(1)},${H - B}" fill="var(--lb-acc)" opacity=".12"/>
      <polyline points="${pts}" fill="none" stroke="var(--lb-acc)" stroke-width="2.4" stroke-linejoin="round"/>
      ${ys.map((y, i) => `<circle cx="${px(i)}" cy="${py(y)}" r="3" fill="var(--lb-acc)"><title>Ngày ${rows[i].day}: ${fmt(y)}</title></circle>`).join('')}${xl}</svg>`;
  },
  /* Bấm thuật ngữ → hiện/ẩn giải thích ngay trong khối [data-tipbox] gần nhất. */
  bindTerms(root, terms) {
    root.addEventListener('click', (e) => {
      const b = e.target.closest('.term'); if (!b) return;
      const box = b.closest('[data-tipbox]') || b.parentElement, id = b.dataset.term, old = box.querySelector(`.termtip[data-for="${id}"]`);
      if (old) { old.remove(); return; }
      const tip = document.createElement('span'); tip.className = 'termtip'; tip.dataset.for = id; tip.textContent = terms[id][1]; box.appendChild(tip);
    });
  },
};
if (typeof globalThis !== 'undefined') globalThis.LabUI = LabUI;
