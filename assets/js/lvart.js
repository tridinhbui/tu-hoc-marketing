/* LvArt(n) — minh hoạ riêng cho từng cấp trong 30 cấp học viên, sinh bằng mã (không cần file ảnh).
   6 bậc = 6 bảng màu ấm + 6 hình biểu tượng (kính lúp, cột số, loa, bia, phễu, vương miện);
   5 cấp trong bậc = đồi cao dần, hình lớn dần, thêm một ngôi sao mỗi cấp. */
const LvArt = (() => {
  const PAL = [['#F8E7D2','#EBC59F','#C85A32'], ['#EFE9D3','#CFC79E','#7F8F5F'], ['#F7DDD2','#E3A18F','#9E4A3C'],
               ['#F9EBC2','#EBC25C','#946A1B'], ['#F8DAC6','#E58E66','#7A2E14'], ['#5A382A','#7A4A32','#E5B24B']];
  const INK = '#2A1A12';
  const motif = (t, s, c) => {   // vẽ quanh (80,38); s = 0..4
    const k = 0.82 + s * 0.09, ink = t === 5 ? '#F6EEDF' : INK;
    const g = (inner) => `<g transform="translate(80 38) scale(${k}) translate(-80 -38)">${inner}</g>`;
    switch (t) {
      case 0: return g(`<circle cx="74" cy="34" r="13" fill="none" stroke="${ink}" stroke-width="4"/><path d="M84 44l12 12" stroke="${ink}" stroke-width="5" stroke-linecap="round"/>`);
      case 1: return g(`<rect x="58" y="42" width="9" height="12" rx="2" fill="${c}"/><rect x="71" y="32" width="9" height="22" rx="2" fill="${c}"/><rect x="84" y="22" width="9" height="32" rx="2" fill="${c}"/><rect x="97" y="30" width="9" height="24" rx="2" fill="${ink}" opacity=".75"/>`);
      case 2: return g(`<path d="M62 32l26-12v34L62 42z" fill="${c}"/><rect x="55" y="31" width="9" height="12" rx="3" fill="${ink}"/><path d="M94 30q8 7 0 14M100 25q13 12 0 24" fill="none" stroke="${ink}" stroke-width="3" stroke-linecap="round"/>`);
      case 3: return g(`<circle cx="80" cy="38" r="20" fill="#fff" opacity=".85"/><circle cx="80" cy="38" r="14" fill="${c}" opacity=".9"/><circle cx="80" cy="38" r="8" fill="#fff"/><circle cx="80" cy="38" r="3.5" fill="${ink}"/>`);
      case 4: return g(`<path d="M56 22h48l-8 12H64z" fill="${c}" opacity=".6"/><path d="M64 36h32l-6 11H70z" fill="${c}" opacity=".85"/><path d="M71 49h18l-3 8H74z" fill="${c}"/>`);
      default: return g(`<path d="M58 50l-4-26 16 14 10-18 10 18 16-14-4 26z" fill="${c}"/><circle cx="54" cy="24" r="3.5" fill="#fff"/><circle cx="80" cy="20" r="3.5" fill="#fff"/><circle cx="106" cy="24" r="3.5" fill="#fff"/>`);
    }
  };
  return (n) => {
    const t = Math.floor((n - 1) / 5), s = (n - 1) % 5, [bg, mid, fg] = PAL[t];
    const peak = 70 - s * 4, stars = Array.from({ length: s + 1 }, (_, i) =>
      `<path transform="translate(${80 - s * 7 + i * 14} 90)" d="M0-5l1.5 3.4 3.6.4-2.7 2.5.8 3.6L0 2.2-3.2 4.9l.8-3.6-2.7-2.5 3.6-.4z" fill="#E5B24B"/>`).join('');
    const deco = [
      '',
      `<ellipse cx="124" cy="22" rx="16" ry="5" fill="#fff" opacity=".7"/><ellipse cx="136" cy="18" rx="10" ry="4" fill="#fff" opacity=".7"/>`,
      `<path d="M118 20q4-5 8 0q4-5 8 0M132 30q3-4 6 0q3-4 6 0" fill="none" stroke="${INK}" stroke-width="1.6" stroke-linecap="round" opacity=".7"/>`,
      `<path d="M128 74l7-22 7 22z" fill="${INK}" opacity=".55"/><path d="M140 76l6-17 6 17z" fill="${INK}" opacity=".4"/>`,
      `<path d="M10 14q70 14 140 0" fill="none" stroke="${INK}" stroke-width="1.4" opacity=".6"/>${[26,52,80,108,134].map((x,i)=>`<path d="M${x} ${19+Math.sin(x/22)*3}l5 0-2.5 7z" fill="${i%2?'#E5B24B':fg}"/>`).join('')}`
    ][s];
    return `<svg viewBox="0 0 160 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="160" height="100" fill="${bg}"/>
      <circle cx="${28 + s * 6}" cy="${26 - s * 2}" r="${10 + s}" fill="#FFF3CF" opacity=".9"/>
      <path d="M0 74C30 58 52 70 84 60S134 56 160 68V100H0z" fill="${mid}"/>
      <path d="M0 86C40 ${peak} 90 ${peak + 14} 160 82V100H0z" fill="${fg}"/>
      ${deco}
      ${motif(t, s, fg === '#E5B24B' ? '#C85A32' : (t === 5 ? '#E5B24B' : fg))}
      ${stars}
    </svg>`;
  };
})();
