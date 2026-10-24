/* CAPSTONE MEDIA PLAN ĐA KÊNH — soát kế hoạch, thuần, không DOM. Dùng cho quang-cao-capstone.html và tests/ads-cases.test.mjs.
   Kế hoạch: { name, goal, aov, margin (biên đóng góp, 0–1), budget (triệu/tháng),
               channels:[{ name, role, budget (triệu), kpi, cpa (đồng, CPA mục tiêu), stop, track (true nếu đã có cách đo) }],
               test, incr, risk }
   Trả danh sách nhận xét {lv:'ok'|'warn'|'bad', k, msg}. Không chấm "đúng/sai" chiến lược — chỉ soát độ nhất quán và điều bắt buộc. */
const AdsPlanEval = {
  /* Sự kiện tối thiểu mỗi tuần để một nhóm quảng cáo có tín hiệu đọc được. Meta nêu ~50 sự kiện tối ưu/tuần để ra khỏi giai đoạn học;
     dưới 15/tuần thì gần như không đọc được gì. Đây là ngưỡng soát của bài tập, không phải quy định nền tảng. */
  LEARN: 50, FLOOR: 15, WEEKS: 30 / 7,
  words(s) { return String(s || '').trim().split(/\s+/).filter(Boolean).length; },
  cpaMax(p) { return (+p.aov || 0) * (+p.margin || 0); },
  eventsPerWeek(ch) { const c = +ch.cpa || 0; return c > 0 ? (+ch.budget || 0) * 1e6 / this.WEEKS / c : 0; },

  check(p) {
    const out = [], add = (lv, k, msg) => out.push({ lv, k, msg });
    const chs = (p.channels || []).filter(c => String(c.name || '').trim());
    const cmax = this.cpaMax(p);
    if (!(+p.aov > 0) || !(+p.margin > 0 && +p.margin < 1)) add('bad', 'econ', 'Điền giá trị đơn (hoặc giá trị hợp đồng) và biên đóng góp (0–100%) để tính CPA trần.');
    else add('ok', 'econ', `CPA trần (hoà vốn trên đơn đầu) ≈ ${Math.round(cmax).toLocaleString('vi-VN')}đ.`);
    if (this.words(p.goal) < 6) add('bad', 'goal', 'Mục tiêu kinh doanh cần một câu có con số và thời hạn (ví dụ: "lãi sau quảng cáo dương, thêm 40% đơn trong quý").');
    if (!chs.length) { add('bad', 'channels', 'Chưa có kênh nào.'); return out; }

    const sum = chs.reduce((s, c) => s + (+c.budget || 0), 0);
    if (Math.abs(sum - (+p.budget || 0)) > 0.5) add('bad', 'sum', `Tổng ngân sách các kênh là ${sum} triệu, ngân sách tháng là ${+p.budget || 0} triệu.`);
    else add('ok', 'sum', 'Tổng ngân sách các kênh khớp ngân sách tháng.');
    if (chs.length > 4 && (+p.budget || 0) < 100) add('warn', 'spread', `${chs.length} kênh với ${+p.budget} triệu/tháng: tiền bị chia mỏng, kênh nào cũng khó có đủ số để đọc.`);

    for (const c of chs) {
      const n = c.name.trim();
      if (!String(c.role || '').trim()) add('warn', 'role:' + n, `${n}: ghi vai trò (bắt nhu cầu / tạo nhu cầu / nhắc lại / chăm sóc).`);
      if (!(+c.cpa > 0)) add('bad', 'cpa:' + n, `${n}: thiếu CPA mục tiêu (hoặc chi phí mỗi lead đạt chuẩn) để biết khi nào là tốt.`);
      else {
        if (cmax > 0 && +c.cpa > cmax) add('bad', 'cpa:' + n, `${n}: CPA mục tiêu ${(+c.cpa).toLocaleString('vi-VN')}đ cao hơn CPA trần ${Math.round(cmax).toLocaleString('vi-VN')}đ — mỗi đơn đầu lỗ, cần lý do từ LTV.`);
        const ev = this.eventsPerWeek(c);
        if (ev < this.FLOOR) add('bad', 'learn:' + n, `${n}: ~${Math.round(ev)} kết quả/tuần — quá ít để đọc. Gộp nhóm, tăng tiền, hoặc tối ưu sự kiện sớm hơn trong phễu.`);
        else if (ev < this.LEARN) add('warn', 'learn:' + n, `${n}: ~${Math.round(ev)} kết quả/tuần — dưới mốc ~50/tuần (mốc Meta nêu cho giai đoạn học; nền tảng khác có mốc riêng). Giữ ít nhóm quảng cáo.`);
      }
      if (!String(c.kpi || '').trim()) add('warn', 'kpi:' + n, `${n}: ghi KPI chính của kênh.`);
      if (this.words(c.stop) < 4) add('bad', 'stop:' + n, `${n}: viết quy tắc dừng/tăng trước khi chạy (ví dụ: "CPA > 1,3× mục tiêu sau 2 tuần thì giảm 30%").`);
      if (!c.track) add('bad', 'track:' + n, `${n}: chưa có cách đo (Pixel/CAPI, Google tag, Events API, UTM, CRM). Không đo được thì không tối ưu được.`);
    }
    if (this.words(p.test) < 8) add('bad', 'test', 'Kế hoạch thử nghiệm cần: giả thuyết, một biến thay đổi, chỉ số, thời gian.');
    if (this.words(p.incr) < 6) add('warn', 'incr', 'Ghi cách kiểm phần tăng thêm (tắt một vùng, nhóm đối chứng, so MER trước/sau) — số nền tảng tự báo không đủ.');
    if (this.words(p.risk) < 6) add('warn', 'risk', 'Ghi rủi ro chính sách/luật cần kiểm (ngành hạn chế, dữ liệu khách, câu cảnh báo, người chuyển tải quảng cáo).');
    return out;
  },
  summary(list) { const n = (lv) => list.filter(x => x.lv === lv).length; return { ok: n('ok'), warn: n('warn'), bad: n('bad'), ready: n('bad') === 0 }; },

  /* Xuất văn bản thuần để nộp/lưu. */
  text(p, list) {
    const L = [`MEDIA PLAN — ${p.name || 'chưa đặt tên'}`, `Mục tiêu: ${p.goal || ''}`,
      `Giá trị đơn: ${(+p.aov || 0).toLocaleString('vi-VN')}đ · Biên đóng góp: ${Math.round((+p.margin || 0) * 100)}% · CPA trần: ${Math.round(this.cpaMax(p)).toLocaleString('vi-VN')}đ`,
      `Ngân sách: ${+p.budget || 0} triệu/tháng`, '', 'KÊNH'];
    (p.channels || []).filter(c => String(c.name || '').trim()).forEach(c => L.push(`- ${c.name} · ${c.role || ''} · ${c.budget} triệu · KPI: ${c.kpi || ''} · CPA mục tiêu: ${(+c.cpa || 0).toLocaleString('vi-VN')}đ · Dừng/tăng: ${c.stop || ''} · Đo: ${c.track ? 'có' : 'CHƯA'}`));
    L.push('', `THỬ NGHIỆM: ${p.test || ''}`, `PHẦN TĂNG THÊM: ${p.incr || ''}`, `RỦI RO CHÍNH SÁCH: ${p.risk || ''}`, '', 'TỰ SOÁT');
    (list || this.check(p)).forEach(x => L.push(`[${x.lv === 'ok' ? 'ổn' : x.lv === 'warn' ? 'lưu ý' : 'cần sửa'}] ${x.msg}`));
    return L.join('\n');
  },

  /* Kế hoạch mẫu theo case xuyên suốt — để trang mở ra ở trạng thái làm việc thật, có nhãn "mẫu". */
  sample() {
    return { name:'Bếp Nhà Lá — tháng 1 (mẫu)', goal:'Lãi sau quảng cáo dương mỗi tháng, thêm 40% đơn trong quý so với quý trước',
      aov:450000, margin:0.37, budget:120,
      channels:[
        { name:'Meta Ads → website', role:'Tạo nhu cầu bằng video món ăn', budget:45, kpi:'CPA, MER', cpa:150000, stop:'CPA > 200.000đ hai tuần liền thì giảm 30% và thay creative', track:true },
        { name:'Shopee (Tìm kiếm + Khám phá)', role:'Bắt nhu cầu trên sàn', budget:35, kpi:'ROAS theo Doanh số, lãi sau phí sàn', cpa:125000, stop:'ROAS < 3,2 một tuần thì hạ giá thầu từ khoá kém', track:true },
        { name:'TikTok Shop GMV Max + Spark Ads', role:'Video bán hàng, khách mới', budget:25, kpi:'Đơn tăng thêm so với tuần không chạy', cpa:100000, stop:'Đơn tổng TikTok Shop không tăng sau 3 tuần thì giảm một nửa', track:true },
        { name:'Google Search', role:'Từ khoá thương hiệu + từ khoá dài', budget:15, kpi:'CPA', cpa:125000, stop:'CPA > 170.000đ thì thu về từ khoá thương hiệu', track:true },
      ],
      test:'Giả thuyết: video mở bằng tiếng giòn khi cắt gà giữ người xem lâu hơn câu chữ. Đổi một biến (3 giây đầu), cùng ngân sách, đo CTR và CPA sau 7 ngày.',
      incr:'Tắt TikTok Spark Ads ở Đà Nẵng 2 tuần, so đơn TikTok Shop Đà Nẵng với Hà Nội; theo dõi MER mỗi tuần.',
      risk:'Không nói "tốt nhất", "an toàn tuyệt đối" khi chưa có chứng nhận; danh sách khách cũ tải lên Meta chỉ gồm người đã đồng ý nhận quảng cáo.' };
  },
};
if (typeof globalThis !== 'undefined') globalThis.AdsPlanEval = AdsPlanEval;
if (typeof module !== 'undefined') module.exports = AdsPlanEval;
