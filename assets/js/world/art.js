/* TRANH VẼ BẢN ĐỒ VƯƠNG QUỐC — chuỗi SVG thuần, không ảnh ngoài, không ngẫu nhiên (hạt giống cố định).
   Phong cách minh hoạ game: bầu trời, đảo nổi có vách đá, cầu, rừng thông, toà nhà có cờ, biển hiệu có sao.
   Màu lấy từ biến CSS --wa-* để đổi theo theme sáng/tối. Chỉ vẽ; luật đi lại, trạng thái nằm ở kingdom.html. */
const WorldArt = (() => {
  const rng = (seed) => { let a = seed >>> 0; return () => { a = (a + 0x6D2B79F5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; };
  const f = (n) => Math.round(n * 10) / 10;
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* đường viền hữu cơ khép kín quanh (cx,cy) */
  function blob(cx, cy, rx, ry, seed, n = 20, jit = 0.1) {
    const r = rng(seed), pts = [];
    for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2, k = 1 + (r() - 0.5) * 2 * jit;
      pts.push([cx + Math.cos(a) * rx * k, cy + Math.sin(a) * ry * k]); }
    const mid = (a, b) => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2], m0 = mid(pts[n - 1], pts[0]);
    let d = `M${f(m0[0])} ${f(m0[1])}`;
    for (let i = 0; i < n; i++) { const p = pts[i], m = mid(p, pts[(i + 1) % n]); d += `Q${f(p[0])} ${f(p[1])} ${f(m[0])} ${f(m[1])}`; }
    return d + 'Z';
  }

  const PAL = { plaza: ['plaza', '#F0B97A'], court: ['court', '#8E73B8'], people: ['people', '#6B9A52'], data: ['data', '#5E9FBE'] };
  const ROOF = { plaza: '#D2562B', court: '#6E3FA3', people: '#1F7A63', data: '#2F6FC0' };

  const GLYPH = { // 24×24, nét đơn
    quiz: '<path d="M12 3l2.6 5.6 6 .7-4.5 4.1 1.2 6L12 16.4 6.7 19.4l1.2-6L3.4 9.3l6-.7z"/>',
    shop: '<path d="M5 9h14l-1 11H6zM8 9V7a4 4 0 018 0v2"/>',
    library: '<path d="M4 5h6a2 2 0 012 2v12a2 2 0 00-2-2H4zM20 5h-6a2 2 0 00-2 2v12a2 2 0 012-2h6z"/>',
    case: '<path d="M12 4v16M5 7h14M7 7l-3 7a3 3 0 006 0zM17 7l-3 7a3 3 0 006 0z"/>',
    pvp: '<path d="M5 19L19 5M14 5h5v5M19 19L5 5M10 5H5v5"/>',
    boss: '<path d="M4 18h16l1-10-5 4-4-7-4 7-5-4z"/>',
    game: '<path d="M4 19V9M10 19V5M16 19v-7M22 19H2"/>',
    growth: '<path d="M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/>',
    g2: '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17.5" cy="9" r="2.4"/>',
    g3: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r="1"/>',
    g4: '<path d="M4 14v-4l11-5v14zM15 9a4 4 0 010 6M7 14l1 5"/>',
    g5: '<path d="M3 4h18l-7 8v7l-4 2v-9z"/>',
    g6: '<path d="M4 5h16v11H9l-5 4z"/>',
  };
  const kindOf = (id) => (id === 'case' || id === 'boss') ? 'castle' : (id === 'shop' || id === 'library') ? 'shop' : 'house';

  function star(cx, cy, r, on) {
    const p = []; for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * 0.45 : r; p.push(`${f(cx + Math.cos(a) * rr)},${f(cy + Math.sin(a) * rr)}`); }
    return `<polygon points="${p.join(' ')}" fill="${on ? '#F6B91B' : 'rgba(255,255,255,.55)'}" stroke="${on ? '#C98A00' : 'rgba(120,90,50,.55)'}" stroke-width="1.2" stroke-linejoin="round"/>`;
  }

  function tree(x, y, s, kind, c1, c2) {
    if (kind === 0) return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})"><rect x="-1.6" y="8" width="3.2" height="7" fill="#7A5535"/>
      <path d="M0-26L11-6H-11z" fill="${c2}"/><path d="M0-18L13 2H-13z" fill="${c1}"/><path d="M0-8L15 11H-15z" fill="${c2}"/></g>`;
    return `<g transform="translate(${f(x)} ${f(y)}) scale(${s})"><rect x="-1.6" y="4" width="3.2" height="9" fill="#7A5535"/>
      <circle cx="0" cy="-3" r="11" fill="${c2}"/><circle cx="-5" cy="-8" r="8" fill="${c1}"/><circle cx="6" cy="-6" r="7" fill="${c1}"/></g>`;
  }

  function cloud(x, y, s, o = 0.9) {
    return `<g class="wa-cloud" transform="translate(${x} ${y}) scale(${s})" opacity="${o}"><ellipse cx="0" cy="8" rx="46" ry="12" fill="#fff"/><circle cx="-18" cy="0" r="16" fill="#fff"/><circle cx="6" cy="-8" r="20" fill="#fff"/><circle cx="26" cy="1" r="14" fill="#fff"/></g>`;
  }

  function ribbon(r) {
    const x = r.x, y = Math.max(104, r.y - r.ry * 0.94 - 14), w = Math.max(190, r.t.length * 10.5 + 56), h = 36, c = ROOF[r.id] || r.c;
    return `<g class="wa-rib" transform="translate(${f(x)} ${f(y)})">
      <path d="M${-w / 2 - 18} 6L${-w / 2 + 4} 6V${h + 6}L${-w / 2 - 18} ${h + 6}L${-w / 2 - 8} ${h / 2 + 6}Z" fill="${c}" opacity=".8"/>
      <path d="M${w / 2 + 18} 6L${w / 2 - 4} 6V${h + 6}L${w / 2 + 18} ${h + 6}L${w / 2 + 8} ${h / 2 + 6}Z" fill="${c}" opacity=".8"/>
      <path d="M${-w / 2} 0Q0 -8 ${w / 2} 0V${h}Q0 ${h - 8} ${-w / 2} ${h}Z" fill="${c}"/>
      <path d="M${-w / 2} 0Q0 -8 ${w / 2} 0" fill="none" stroke="rgba(255,255,255,.4)" stroke-width="2"/>
      <text x="0" y="${h / 2 + 6}" text-anchor="middle" font-family="var(--sans,system-ui)" font-weight="800" font-size="15" letter-spacing=".06em" fill="#fff" style="text-transform:uppercase">${esc(r.t)}</text></g>`;
  }

  function building(p, o) {
    const c = ROOF[p.region] || '#C85A32', k = kindOf(p.id), wall = '#FFF1D4', wall2 = '#EBCB97', dark = 'rgba(0,0,0,.18)';
    const flag = (x, y) => `<g class="wa-flag"><rect x="${x}" y="${y - 22}" width="2" height="22" fill="#6B4A2B"/><path d="M${x + 2} ${y - 22}h16l-4 5 4 5H${x + 2}z" fill="${c}"/></g>`;
    let body;
    if (k === 'castle') {
      body = `<rect x="-40" y="-26" width="80" height="50" rx="3" fill="${wall}" stroke="${wall2}" stroke-width="2"/><rect x="-40" y="10" width="80" height="14" fill="${wall2}" opacity=".5"/>
        <rect x="-58" y="-38" width="26" height="62" rx="3" fill="${wall}" stroke="${wall2}" stroke-width="2"/><rect x="32" y="-38" width="26" height="62" rx="3" fill="${wall}" stroke="${wall2}" stroke-width="2"/>
        <path d="M-62 -36L-45-70L-28-36z" fill="${c}"/><path d="M28-36L45-70L62-36z" fill="${c}"/>
        <rect x="-22" y="-44" width="44" height="30" rx="3" fill="${wall}" stroke="${wall2}" stroke-width="2"/><path d="M-27-42L0-82L27-42z" fill="${c}"/>
        <path d="M-12 24v-18a12 12 0 0124 0v18z" fill="${dark}"/><path d="M-9 24v-16a9 9 0 0118 0v16z" fill="#6B4A2B"/>
        ${flag(-1, -82)}${flag(-46, -70)}${flag(44, -70)}`;
    } else if (k === 'shop') {
      body = `<rect x="-34" y="-14" width="68" height="38" rx="3" fill="${wall}" stroke="${wall2}" stroke-width="2"/>
        <path d="M-40-14h80l-6-16h-68z" fill="${c}"/>${[0, 1, 2, 3, 4].map((i) => `<path d="M${-40 + i * 16} -14h16l-2 10h-12z" fill="${i % 2 ? '#fff' : c}" opacity=".95"/>`).join('')}
        <rect x="-26" y="0" width="14" height="14" rx="2" fill="#8FD0F0"/><rect x="-6" y="2" width="20" height="22" rx="3" fill="#6B4A2B"/><rect x="18" y="0" width="12" height="14" rx="2" fill="#8FD0F0"/>
        <path d="M-34-30L0-50L34-30z" fill="${c}" opacity=".0"/>${flag(0, -30)}`;
    } else {
      body = `<rect x="-34" y="-18" width="68" height="42" rx="4" fill="${wall}" stroke="${wall2}" stroke-width="2"/><rect x="-34" y="12" width="68" height="12" fill="${wall2}" opacity=".5"/>
        <path d="M-44-16L0-56L44-16z" fill="${c}"/><path d="M-44-16L0-56L0-46L-30-16z" fill="rgba(255,255,255,.18)"/>
        <rect x="14" y="-52" width="10" height="18" fill="${wall2}"/>
        <rect x="-26" y="-8" width="14" height="14" rx="2" fill="#8FD0F0" stroke="#fff" stroke-width="2"/><rect x="-6" y="0" width="20" height="24" rx="3" fill="#6B4A2B"/><rect x="18" y="-8" width="12" height="14" rx="2" fill="#8FD0F0" stroke="#fff" stroke-width="2"/>
        ${flag(-1, -56)}`;
    }
    const g = GLYPH[p.id] ? `<g transform="translate(-9 ${k === 'castle' ? -9 : -4}) scale(.75)" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round">${GLYPH[p.id]}</g>` : '';
    const med = `<circle cx="0" cy="${k === 'castle' ? 0 : 5}" r="13" fill="#fff" stroke="${c}" stroke-width="2.5"/><g transform="translate(0 ${k === 'castle' ? 0 : 5})">${g.replace(/translate\(-9 [^)]+\)/, 'translate(-9 -9)')}</g>`;
    const sc = k === 'castle' ? 1.12 : 1;
    return `<ellipse cx="0" cy="26" rx="${k === 'castle' ? 66 : 48}" ry="9" fill="#000" opacity=".16"/>
      <g class="body" transform="scale(${sc})">${body}${o.locked ? '' : ''}</g>`;
  }

  function place(p, o) {
    const c = ROOF[p.region] || '#C85A32', name = p.t, w = Math.max(96, name.length * 7.7 + 28);
    const chip = o.state === 'soon' ? 'SẮP CÓ' : o.state === 'locked' ? 'MỞ Ở CẤP ' + p.min_level : '';
    const rowH = (o.stars !== null || chip || o.visited) ? 18 : 0, ph = 28 + rowH;
    const starsRow = o.stars !== null ? [0, 1, 2].map((i) => star(-18 + i * 18, 0, 7, i < o.stars)).join('') : '';
    const lock = o.state === 'locked' ? `<g transform="translate(0 -4)"><circle r="15" fill="rgba(40,30,25,.72)"/><rect x="-7" y="-2" width="14" height="11" rx="2.5" fill="#fff"/><path d="M-4.5-2v-3.5a4.5 4.5 0 019 0v3.5" fill="none" stroke="#fff" stroke-width="2.4"/></g>` : '';
    return `<g class="pl" data-id="${p.id}" data-state="${o.state}" transform="translate(${p.x},${p.y})" role="button" tabindex="0" aria-label="${esc(name)}">
      <ellipse class="ring" cx="0" cy="26" rx="80" ry="22" fill="#FFD36B" opacity=".0"/>
      ${building(p, o)}
      <g transform="translate(0 ${o.state === 'soon' ? 0 : 0})">${o.state === 'soon' || o.state === 'locked' ? lock : ''}</g>
      <g transform="translate(0 ${p.id === 'case' || p.id === 'boss' ? 46 : 42})">
        <rect x="${-w / 2}" y="0" width="${w}" height="${ph}" rx="10" fill="#FFF8EA" stroke="${c}" stroke-opacity=".55" stroke-width="1.5"/>
        <text class="nm" y="19" text-anchor="middle">${esc(name)}</text>
        ${starsRow ? `<g transform="translate(0 ${ph - 9})">${starsRow}</g>` : ''}
        ${chip && !starsRow ? `<text class="sub" y="${ph - 6}" text-anchor="middle">${chip}</text>` : ''}
        ${o.visited && !starsRow ? `<text class="sub" y="${ph - 6}" text-anchor="middle" style="fill:#3D7A45">ĐÃ GHÉ HÔM NAY</text>` : ''}
      </g>
      ${o.visited ? `<g transform="translate(${p.id === 'case' || p.id === 'boss' ? 46 : 38} -38)"><circle r="12" fill="#3D9A52" stroke="#fff" stroke-width="2.5"/><path d="M-5 0l3.5 3.5L6-4" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></g>` : ''}
    </g>`;
  }

  function world(W, o) {
    const defs = `<defs>
      <linearGradient id="waSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--wa-sky1)"/><stop offset=".7" style="stop-color:var(--wa-sky2)"/><stop offset="1" style="stop-color:var(--wa-sky3)"/></linearGradient>
      <linearGradient id="waSea" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--wa-sea1)"/><stop offset="1" style="stop-color:var(--wa-sea2)"/></linearGradient>
      ${W.regions.map((r) => `<linearGradient id="waTop-${r.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--wa-${r.id}-1)"/><stop offset="1" style="stop-color:var(--wa-${r.id}-2)"/></linearGradient>
        <linearGradient id="waCl-${r.id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" style="stop-color:var(--wa-${r.id}-c1)"/><stop offset="1" style="stop-color:var(--wa-${r.id}-c2)"/></linearGradient>`).join('')}
      <filter id="waBlur" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="9"/></filter>
    </defs>`;
    const mount = `<g opacity=".95"><path d="M0 300L90 170L170 250L260 120L360 260L420 330V380H0z" style="fill:var(--wa-mt1)"/><path d="M260 120L300 175L270 168L250 195L230 165z" fill="#fff" opacity=".85"/>
      <path d="M760 340L850 190L930 270L1030 130L1120 250L1200 200V380H760z" style="fill:var(--wa-mt1)"/><path d="M1030 130L1070 185L1040 178L1020 205L1000 172z" fill="#fff" opacity=".85"/>
      <path d="M380 320L470 220L560 300V380H380z" style="fill:var(--wa-mt2)" opacity=".7"/><path d="M640 330L730 230L820 310V380H640z" style="fill:var(--wa-mt2)" opacity=".7"/></g>`;
    const clouds = [[70, 90, 1.1, .9], [1130, 70, 1.2, .9], [210, 690, 1.3, .85], [980, 720, 1.4, .85], [590, 40, .9, .8], [40, 440, 1.0, .8], [1170, 480, 1.0, .8], [380, 60, .7, .7], [830, 40, .8, .7]]
      .map(([x, y, s, op]) => cloud(x, y, s, op)).join('');
    const sea = `<ellipse cx="600" cy="420" rx="640" ry="400" fill="url(#waSea)" opacity=".95"/>
      <path d="M120 600C260 650 420 690 600 690S960 650 1080 600" fill="none" stroke="#fff" stroke-width="3" opacity=".35" stroke-dasharray="2 12" stroke-linecap="round"/>`;
    /* đảo: vẽ vách + mặt cho từng vùng; quảng trường vẽ cuối để nằm trên cùng */
    const order = ['court', 'people', 'data', 'plaza'].map((id) => W.regions.find((r) => r.id === id)).filter(Boolean);
    const islands = order.map((r, i) => {
      const k = 0.94, d = blob(r.x, r.y, r.rx * k, r.ry * k, 11 + i * 7), dc = blob(r.x, r.y + 20, r.rx * k, r.ry * k, 11 + i * 7);
      return `<path d="${dc}" fill="rgba(30,60,90,.28)" filter="url(#waBlur)" transform="translate(0 14)"/>
        <path d="${dc}" fill="url(#waCl-${r.id})"/>
        <path d="${d}" fill="url(#waTop-${r.id})" stroke="rgba(255,255,255,.55)" stroke-width="3"/>
        <path d="${d}" fill="none" stroke="rgba(0,0,0,.08)" stroke-width="1.2" transform="translate(0 4)"/>`; }).join('');
    /* đường đi: cổng → quảng trường → (cầu) → trung tâm từng khu → từng toà */
    const st = W.start, hub = { plaza: { x: 600, y: 530 }, court: { x: 600, y: 345 }, people: { x: 305, y: 455 }, data: { x: 880, y: 470 } };
    const segs = [[st, hub.plaza], [hub.plaza, hub.court], [hub.plaza, hub.people], [hub.plaza, hub.data]];
    W.places.forEach((p) => segs.push([hub[p.region] || hub.plaza, { x: p.x, y: p.y + 36 }]));
    const bend = (a, b, k = 0.12) => { const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2, dx = b.x - a.x, dy = b.y - a.y; return { x: mx - dy * k, y: my + dx * k }; };
    const roadD = segs.map(([a, b]) => { const c = bend(a, b); return `M${f(a.x)} ${f(a.y)}Q${f(c.x)} ${f(c.y)} ${f(b.x)} ${f(b.y)}`; });
    const roads = roadD.map((d) => `<path d="${d}" fill="none" stroke="var(--wa-road-edge)" stroke-width="17" stroke-linecap="round"/>`).join('') +
      roadD.map((d) => `<path d="${d}" fill="none" stroke="var(--wa-road)" stroke-width="11" stroke-linecap="round"/>`).join('');
    const bridge = (a, b) => { const c = bend(a, b), mx = (a.x + b.x) / 2 + (c.x - (a.x + b.x) / 2) / 2, my = (a.y + b.y) / 2 + (c.y - (a.y + b.y) / 2) / 2, ang = Math.atan2(b.y - a.y, b.x - a.x) * 180 / Math.PI;
      return `<g transform="translate(${f(mx)} ${f(my)}) rotate(${f(ang)})"><rect x="-36" y="-13" width="72" height="26" rx="6" fill="#B58A58"/>${[-28, -16, -4, 8, 20].map((x) => `<rect x="${x}" y="-13" width="9" height="26" fill="#D8B27C"/>`).join('')}<rect x="-36" y="-15" width="72" height="3" fill="#7A5535"/><rect x="-36" y="12" width="72" height="3" fill="#7A5535"/></g>`; };
    const bridges = bridge(hub.plaza, hub.court) + bridge(hub.plaza, hub.people) + bridge(hub.plaza, hub.data);
    /* cây: vị trí cố định theo hạt giống, tránh toà nhà và đường */
    const samples = []; segs.forEach(([a, b]) => { const c = bend(a, b);
      for (let u = 0; u <= 1; u += 0.1) samples.push([(1 - u) ** 2 * a.x + 2 * (1 - u) * u * c.x + u * u * b.x, (1 - u) ** 2 * a.y + 2 * (1 - u) * u * c.y + u * u * b.y]); });
    const trees = [];
    W.regions.forEach((r, ri) => { const R = rng(900 + ri * 31), cnt = r.id === 'plaza' ? 26 : 34;
      for (let n = 0; n < cnt * 4 && trees.filter((t) => t.r === r.id).length < cnt; n++) {
        const a = R() * Math.PI * 2, d = Math.sqrt(R()) * 0.84, x = r.x + Math.cos(a) * r.rx * d, y = r.y + Math.sin(a) * r.ry * d;
        if (W.places.some((p) => Math.hypot(p.x - x, p.y + 6 - y) < 78) || Math.hypot(st.x - x, st.y - y) < 60) continue;
        if (samples.some(([sx, sy]) => Math.hypot(sx - x, sy - y) < 26)) continue;
        if (trees.some((t) => Math.hypot(t.x - x, t.y - y) < 22)) continue;
        trees.push({ x, y, r: r.id, s: 0.7 + R() * 0.5, k: R() < 0.62 ? 0 : 1 }); } });
    const tcol = { plaza: ['#7CB25A', '#5E9A44'], court: ['#6FAE7A', '#4B8E5E'], people: ['#6DB35C', '#4A9142'], data: ['#78BE8C', '#4F9E73'] };
    const treeSVG = trees.sort((a, b) => a.y - b.y).map((t) => tree(t.x, t.y, t.s, t.k, ...tcol[t.r])).join('');
    /* thác nước ở mép dưới các đảo ngoài */
    const falls = [[150, 640], [1030, 690], [330, 620]].map(([x, y]) => `<g opacity=".75"><rect x="${x}" y="${y}" width="9" height="46" rx="4" fill="#E8F6FF"/><rect x="${x + 14}" y="${y + 6}" width="6" height="36" rx="3" fill="#CFEAFB"/></g>`).join('');
    const rib = W.regions.map(ribbon).join('');
    const places = W.places.map((p) => place(p, o.placeOpts(p))).join('');
    const me = `<g id="me"><ellipse cx="0" cy="22" rx="16" ry="5.5" fill="#000" opacity=".22"/>
      <path d="M-13 18c0-10 5-16 13-16s13 6 13 16z" id="meBody" fill="${o.fill}" stroke="#fff" stroke-width="2.5"/>
      <circle cx="0" cy="-6" r="14" fill="#fff" stroke="#E7D6BC" stroke-width="2"/><circle cx="0" cy="-5" r="10" fill="#3A2A22"/>
      <circle cx="-3.6" cy="-6" r="2" fill="#fff"/><circle cx="3.6" cy="-6" r="2" fill="#fff"/><path d="M-3.5 -1.5q3.5 3 7 0" fill="none" stroke="#fff" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M-8-19l3.5 5L0-22l4.5 8L8-19l1 8H-9z" fill="#F6B91B" stroke="#C98A00" stroke-width="1.2" stroke-linejoin="round"/></g>`;
    return `<svg viewBox="0 0 ${W.w} ${W.h}" id="svg" role="img" aria-label="Bản đồ vương quốc marketing">${defs}
      <rect width="${W.w}" height="${W.h}" fill="url(#waSky)"/>${mount}${clouds}${sea}${islands}${bridges}${roads}${falls}${treeSVG}${rib}${places}${me}</svg>`;
  }
  return { world, blob, star };
})();
if (typeof module !== 'undefined') module.exports = WorldArt;
