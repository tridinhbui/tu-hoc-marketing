/* MARKETING LAB · NHIỆM VỤ PHÂN TÍCH & CHẤM ĐIỂM CHO GA4 — thuần, test được bằng node.
   Câu hỏi và đáp án được SINH TỪ CHÍNH DATASET (không gõ cứng), nên luôn khớp với chiến dịch mà người học đã chạy.
   Tổng 100: Đọc số liệu 40 · Chẩn đoán nguyên nhân 30 · Quyết định phân bổ 20 · Thiết lập đo lường 10. */
(function (root) {
  const E = root.LabEngine || require('./engine.js');
  const A = root.GA4Sim || require('./ga4-sim.js');
  const F = E.fmt;
  const NAME = { meta: 'Meta (Paid Social)', gads: 'Google Ads (Paid Search)', organic: 'Organic Search', direct: 'Direct', referral: 'Referral' };

  const GA4Eval = {
    NAME,
    /* Trả về danh sách câu hỏi. Mỗi câu: id, group (read|diagnose|decide), module, prompt, options[{id,t}], answer, why, hint, pts. */
    questions(ds) {
      const all = A.aggregate(ds, 1, ds.days), t = all.total, bc = all.byCh, q = [];
      const paid = ['meta', 'gads'].filter((id) => bc[id].cost > 0);
      const opt = (arr) => arr.map(([id, tx]) => ({ id, t: tx }));
      const f = A.funnel(t);

      if (paid.length === 2) {
        const best = paid.slice().sort((a, b) => bc[a].cpa - bc[b].cpa)[0];
        q.push({ id: 'r1', group: 'read', module: 'traffic', pts: 10, prompt: 'Trong hai kênh trả phí, kênh nào có chi phí mỗi chuyển đổi (CPA) thấp hơn theo GA4?',
          options: opt(paid.map((id) => [id, NAME[id]])), answer: best,
          why: `${NAME.meta}: CPA ${F.vnd(bc.meta.cpa)}; ${NAME.gads}: CPA ${F.vnd(bc.gads.cpa)}. CPA = chi phí ÷ chuyển đổi, tính trong báo cáo "Thu nạp lưu lượng".`, hint: 'Mở Thu nạp lưu lượng, so cột chi phí và chuyển đổi.' });
      }
      q.push({ id: 'r2', group: 'read', module: 'funnel', pts: 10, prompt: 'Ở phễu của TOÀN BỘ lưu lượng, bước chuyển nào mất nhiều người nhất (tỉ lệ rơi cao nhất)?',
        options: opt(f.steps.slice(1).map((s, i) => [s.id, `${f.steps[i].t} → ${s.t}`])), answer: f.worst ? f.worst.id : 'purchase',
        why: f.worst ? `Bước "${f.worst.t}" mất ${F.pct(f.worst.drop, 0)} người so với bước trước. Đây là chỗ đáng sửa đầu tiên vì cải thiện ở đây nhân lên toàn bộ các bước sau.` : '',
        hint: 'Xem cột "Rơi" trong báo cáo phễu.' });
      const lands = A.landings(ds, 1, ds.days, Object.keys(A.CHANNELS)).filter((l) => l.sessions >= 30);
      if (lands.length > 1) {
        const worst = lands.slice().sort((a, b) => a.cvr - b.cvr)[0];
        q.push({ id: 'r3', group: 'read', module: 'landing', pts: 10, prompt: 'Trang đích nào (có từ 30 phiên trở lên) có tỉ lệ chuyển đổi thấp nhất?',
          options: opt(lands.map((l) => [l.id, l.t])), answer: worst.id,
          why: `${worst.t}: ${F.int(worst.sessions)} phiên, tỉ lệ chuyển đổi ${F.pct(worst.cvr)} — thấp nhất trong các trang có đủ phiên.`, hint: 'Báo cáo Trang đích, cột tỉ lệ chuyển đổi.' });
      }
      const chans = Object.keys(bc).filter((id) => bc[id].sessions >= 30);
      const lowEng = chans.slice().sort((a, b) => bc[a].engRate - bc[b].engRate)[0];
      q.push({ id: 'r4', group: 'read', module: 'traffic', pts: 10, prompt: 'Nguồn nào có tỉ lệ tương tác (engagement rate) thấp nhất?',
        options: opt(chans.map((id) => [id, NAME[id]])), answer: lowEng,
        why: `${NAME[lowEng]} có tỉ lệ tương tác ${F.pct(bc[lowEng].engRate, 0)} — thấp nhất. Phiên tương tác là phiên kéo dài trên 10 giây, có sự kiện chuyển đổi hoặc từ 2 lượt xem trang trở lên.`, hint: 'Cột Tỉ lệ tương tác trong Thu nạp lưu lượng.' });

      const rep = (id) => ds.feeds[id] && ds.feeds[id].reported ? ds.feeds[id].reported.conversions : 0;
      const gap = paid.reduce((s, id) => s + rep(id) - bc[id].conversions, 0);
      q.push({ id: 'd1', group: 'diagnose', module: 'attribution', pts: 15, prompt: `Meta/Google báo tổng ${F.int(paid.reduce((s, id) => s + rep(id), 0))} chuyển đổi nhưng GA4 chỉ thấy ${F.int(paid.reduce((s, id) => s + bc[id].conversions, 0))}. Nguyên nhân hợp lý nhất?`,
        options: opt([['attr', 'Khác cửa sổ và mô hình attribution, cộng với phiên mất do chặn theo dõi'], ['bug', 'GA4 bị lỗi nên đếm thiếu'], ['fake', 'Nền tảng quảng cáo cố tình báo khống'], ['budget', 'Do ngân sách chi khác nhau']]),
        answer: 'attr', why: `Chênh ${F.int(gap)} chuyển đổi. Nền tảng quảng cáo tính cửa sổ 7 ngày nhấp / 1 ngày xem và nhận công cho mình khi có nhiều điểm chạm; GA4 dùng last-click và mất một phần phiên do chặn cookie/tải chậm. Hai con số không "sai", chúng đo hai thứ khác nhau.`,
        hint: 'Đọc phần giả định attribution trong báo cáo Attribution.' });
      q.push({ id: 'd2', group: 'diagnose', module: 'traffic', pts: 15, prompt: 'Vì sao Paid Social thường có tỉ lệ tương tác và chuyển đổi thấp hơn Paid Search?',
        options: opt([['intent', 'Người xem quảng cáo xã hội chưa chủ động tìm mua, trong khi người gõ từ khoá đã có nhu cầu'], ['tech', 'Do GA4 đo mạng xã hội kém chính xác'], ['price', 'Do giá sản phẩm khác nhau giữa hai kênh'], ['time', 'Do chạy ở khung giờ khác nhau']]),
        answer: 'intent', why: 'Meta đi tìm người (interrupt), Google bắt người đang tìm. Ý định mua khác nhau nên CVR khác nhau; Meta vẫn đóng vai trò tạo nhu cầu và hỗ trợ chuyển đổi (xem Attribution).', hint: 'So sánh cách người dùng đến trang.' });

      if (paid.length === 2) {
        const [hi, lo] = paid.slice().sort((a, b) => bc[b].roas - bc[a].roas);
        const be = 1 / 0.6, anyOk = bc[hi].roas >= be;
        q.push({ id: 'x1', group: 'decide', module: 'attribution', pts: 20, prompt: `Bạn có thêm 3 triệu ngân sách. ROAS theo GA4: Meta ${F.x(bc.meta.roas)}, Google ${F.x(bc.gads.roas)} (hoà vốn ${F.x(be)}). Quyết định hợp lý nhất?`,
          options: opt([['hi', `Tăng ngân sách ${NAME[hi]}, giữ ${NAME[lo]} để duy trì nhu cầu`], ['lo', `Dồn toàn bộ vào ${NAME[lo]}`], ['both', 'Chia đều cho hai kênh'], ['stop', 'Chưa thêm tiền: sửa phễu/từ khoá trước vì cả hai kênh chưa hoà vốn']]),
          answer: anyOk ? 'hi' : 'stop',
          why: anyOk ? `${NAME[hi]} có ROAS ${F.x(bc[hi].roas)}, cao hơn ${NAME[lo]} (${F.x(bc[lo].roas)}) và vượt hoà vốn. Thêm tiền vào kênh hiệu quả hơn là hợp lý; không nên cắt hẳn kênh còn lại vì Paid Social tạo nhu cầu và hỗ trợ chuyển đổi (xem first-click). Lưu ý lợi ích giảm dần: ROAS biên thấp hơn ROAS trung bình.` : `Cả hai kênh đều dưới điểm hoà vốn ${F.x(be)}: thêm tiền chỉ nhân lỗ. Hãy sửa phễu, từ khoá hoặc nội dung trước.`,
          hint: 'So ROAS hai kênh rồi nghĩ tới vai trò hỗ trợ.' });
      }
      return q;
    },

    /* answers: {qid: optionId} · keyEvents: mảng tên sự kiện đã đánh dấu. */
    evaluate(ds, answers, keyEvents) {
      const qs = this.questions(ds), parts = [], decisions = [], recs = [];
      const gp = { read: ['Đọc số liệu', 0, 0], diagnose: ['Chẩn đoán nguyên nhân', 0, 0], decide: ['Quyết định phân bổ', 0, 0] };
      for (const q of qs) {
        const ok = answers[q.id] === q.answer; gp[q.group][2] += q.pts; if (ok) gp[q.group][1] += q.pts;
        const chosen = (q.options.find((o) => o.id === answers[q.id]) || {}).t;
        decisions.push({ tone: ok ? 'ok' : (answers[q.id] ? 'bad' : 'warn'), title: q.prompt, body: (ok ? 'Đúng. ' : answers[q.id] ? `Bạn chọn "${chosen}". ` : 'Bạn chưa trả lời. ') + q.why });
        if (!ok) recs.push(q.hint ? `${q.hint} (${q.prompt.slice(0, 60)}…)` : q.prompt);
      }
      for (const k of ['read', 'diagnose', 'decide']) parts.push({ key: k, label: gp[k][0], got: gp[k][1], max: gp[k][2] });
      const junk = ['page_view', 'session_start', 'scroll', 'first_visit', 'user_engagement', 'click'].filter((e) => keyEvents.includes(e));
      const pur = keyEvents.includes('purchase');
      const hyg = pur && !junk.length ? 10 : pur ? 5 : 0;
      parts.push({ key: 'setup', label: 'Thiết lập đo lường', got: hyg, max: 10 });
      decisions.push({ tone: hyg === 10 ? 'ok' : hyg ? 'warn' : 'bad', title: 'Sự kiện chính (key events)',
        body: hyg === 10 ? 'Chỉ đánh dấu hành động tạo giá trị kinh doanh (purchase). Báo cáo chuyển đổi sạch.'
          : !pur ? 'Chưa đánh dấu purchase là sự kiện chính nên GA4 không tính chuyển đổi mua hàng.' : `Bạn đánh dấu cả sự kiện không tạo giá trị (${junk.join(', ')}). Chúng làm số chuyển đổi phồng lên và che mất kênh hiệu quả thật.` });
      if (hyg < 10) recs.push('Chỉ đánh dấu các hành động tạo giá trị (purchase, có thể begin_checkout). Bỏ page_view/scroll/click khỏi key events.');
      const total = parts.reduce((s, p) => s + p.got, 0), max = parts.reduce((s, p) => s + p.max, 0) || 1;
      const scaled = Math.round(total / max * 100);
      return { total: scaled, raw: total, max, stars: scaled >= 90 ? 3 : scaled >= 70 ? 2 : scaled >= 50 ? 1 : 0, parts, decisions, recommendations: recs.slice(0, 4), answered: Object.keys(answers).length, of: qs.length };
    },
  };
  root.GA4Eval = GA4Eval;
  if (typeof module !== 'undefined') module.exports = GA4Eval;
})(typeof globalThis !== 'undefined' ? globalThis : this);
