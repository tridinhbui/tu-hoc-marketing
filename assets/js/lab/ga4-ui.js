/* MARKETING LAB · GIAO DIỆN GA4 — báo cáo mô phỏng đọc dữ liệu từ Meta/Google Ads Lab (qua feed đã chọn cho case xuyên suốt).
   Logic ở ga4-sim.js / ga4-eval.js. Cần: app.js, frame.js, engine, scenario, gads-data, meta-sim, gads-sim, store, ui-kit. */
(function () {
  appShell('');
  const E = LabEngine, F = E.fmt, U = LabUI, CASE = LAB_CASES.skincare, TOOL = 'ga4', GID = 'lab-ga4', app = document.getElementById('app');
  const dt = U.dt, MODES = {
    learn: { t: 'Học từng bước', d: 'Đọc từng báo cáo cùng lời giải thích, trả lời câu hỏi có phản hồi ngay.' },
    practice: { t: 'Tự luyện', d: 'Tự điều tra dữ liệu, phản hồi ngay sau mỗi câu, ít giải thích.' },
    challenge: { t: 'Thử thách', d: 'Điều tra không gợi ý. Đáp án và giải thích chỉ hiện sau khi nộp bài.' },
  };
  const q = new URLSearchParams(location.search);
  const TABS = [['overview', 'Tổng quan'], ['realtime', 'Thời gian thực'], ['userAcq', 'Thu nạp người dùng'], ['traffic', 'Thu nạp lưu lượng'], ['events', 'Sự kiện'], ['key', 'Sự kiện chính'],
    ['funnel', 'Phễu'], ['landing', 'Trang đích'], ['attr', 'Attribution'], ['tasks', 'Nhiệm vụ']];
  const HELP = {
    overview: 'Đây là bức tranh toàn cảnh. Nhìn xem phiên, người dùng và doanh thu đến từ đâu, rồi đi sâu vào từng báo cáo bên cạnh.',
    realtime: 'Báo cáo thời gian thực cho biết điều đang xảy ra trong 30 phút gần nhất. Nó dùng để kiểm tra chiến dịch vừa bật có đang đưa người vào không, không dùng để đánh giá hiệu quả.',
    userAcq: 'Thu nạp người dùng nhìn vào lần đầu người dùng đến. Dùng nó để trả lời: kênh nào mang về người mới?',
    traffic: 'Thu nạp lưu lượng nhìn vào nguồn của từng PHIÊN. Cột tỉ lệ tương tác cho biết phiên có đáng giá không; cột ROAS cho biết kênh trả phí có lãi không.',
    events: 'Mọi hành động đo được là một sự kiện. Chỉ một số ít sự kiện đáng được đánh dấu là sự kiện chính.',
    key: 'Sự kiện chính là hành động tạo giá trị kinh doanh. Đánh dấu thừa sẽ làm số chuyển đổi phồng lên và sai lệch quyết định phân bổ.',
    funnel: 'Phễu cho thấy người dùng rơi ở đâu. Sửa bước rơi nhiều nhất thường có lợi hơn là mua thêm traffic.',
    landing: 'Trang đích là trang đầu tiên người dùng thấy. Trang có nhiều phiên nhưng chuyển đổi thấp là cơ hội tối ưu nhanh.',
    attr: 'Attribution quyết định kênh nào được ghi công. Cùng một đơn hàng có thể được tính cho kênh khác nhau tuỳ mô hình, nên đừng đánh giá kênh chỉ bằng last-click.',
    tasks: 'Trả lời các câu hỏi dựa trên dữ liệu bạn vừa xem. Câu hỏi và đáp án sinh từ chính chiến dịch của bạn.',
  };
  const GA_REF = {  // cấu hình tham chiếu khi người học chưa chọn lần chạy nào (vẫn là mô phỏng, không phải số ngẫu nhiên)
    meta: () => ({ ...MetaSim.emptyConfig(), name: 'Meta · mẫu tham chiếu', objective: 'sales', age: ['a2534', 'a3544'], gender: 'female', location: ['hcm', 'hn'], interests: ['skincare', 'beauty'],
      dailyBudget: 350000, duration: 14, creative: { format: 'video', headline: 'Chống nắng nhẹ, không bết dính', cta: 'shop_now',
        primary: 'Kem chống nắng SPF50+ PA++++ thấm nhanh, không bết dính, hợp da dầu. Đã kiểm nghiệm da liễu, giảm 15% cho đơn đầu tiên.' } }),
    gads: () => ({ ...GadsSim.emptyConfig(), name: 'Google · mẫu tham chiếu', objective: 'sales', bidStrategy: 'manual', bid: 6000, dailyBudget: 200000, duration: 14, landing: 'product',
      ad: { h: ['Mua kem chống nắng SPF50+', 'Chống nắng không bết dính', 'Giảm 15% đơn đầu tiên', 'Hợp da dầu, nhẹ mặt', ''], d: ['Kem chống nắng thấm nhanh, không bết dính. Đã kiểm nghiệm da liễu.', 'Đặt hàng hôm nay, freeship toàn quốc cho đơn từ 250k.'] },
      keywords: [['k2', 'phrase'], ['k3', 'phrase'], ['k4', 'phrase'], ['k1', 'phrase'], ['k11', 'exact']].map(([id, match]) => ({ id, match })), negatives: ['miễn phí', 'là gì', 'tự làm', 'cho bé'] }),
  };
  const base = { aov: CASE.aov, grossMargin: CASE.grossMargin, leadToSale: CASE.leadToSale };

  /* ---------- nguồn dữ liệu ---------- */
  function sources() {
    const out = {}, notes = [];
    for (const id of ['meta', 'gads']) {
      const p = LabStore.picked(CASE.id, id);
      if (p && p.feed) { out[id] = p.feed; notes.push({ id, real: true, t: `${id === 'meta' ? 'Meta Ads' : 'Google Ads'}: lần chạy ${dt(p.at)} · ${F.int(p.feed.sessions)} phiên · chi ${F.vnd(p.feed.cost)}` }); }
      else {
        const sim = id === 'meta' ? MetaSim.simulate(GA_REF.meta(), { ...base, seed: CASE.seed, budget: 1e9 }) : GadsSim.simulate(GA_REF.gads(), { ...base, seed: CASE.seed + 7, budget: 1e9 });
        out[id] = sim.feed; notes.push({ id, real: false, t: `${id === 'meta' ? 'Meta Ads' : 'Google Ads'}: dữ liệu mẫu từ cấu hình tham chiếu (bạn chưa chọn lần chạy cho case)` });
      }
    }
    return { feeds: out, notes };
  }
  const SRC = sources();
  const DS = GA4Sim.build(SRC.feeds, { aov: CASE.aov, seed: CASE.seed });
  const RANGES = GA4Sim.ranges(DS);

  /* ---------- trạng thái ---------- */
  const saved = LabStore.tool(TOOL).draft;
  let mode = MODES[q.get('mode')] ? q.get('mode') : null, view = 'start', tab = 'overview', range = 'all', filter = 'all', compare = false, group = 'sm', rtMin = 14 * 60 + 5;
  let answers = {}, keyEvents = ['purchase'], shown = null, rtTimer = null;
  const reportMode = () => mode === 'challenge' ? 'deferred' : 'instant';
  const R = () => RANGES.find((r) => r.id === range) || RANGES[0];
  const chs = () => GA4Sim.channelsOf(DS, filter);
  const NAME = GA4Eval.NAME;
  const smName = (id) => `${GA4Sim.CHANNELS[id].source} / ${GA4Sim.CHANNELS[id].medium}`;
  const grpName = (id) => GA4Sim.CHANNELS[id].group;
  const agg = (from, to) => GA4Sim.aggregate(DS, from, to, chs());
  const prev = () => { const r = R(), n = r.to - r.from + 1; return r.from - n >= 1 ? { from: r.from - n, to: r.from - 1 } : null; };
  const qs = () => GA4Eval.questions(DS);

  function save() { LabStore.setDraft(TOOL, { mode, answers, keyEvents, tab, range, filter, at: Date.now(), step: 0 }); }
  function load(d) { mode = d.mode; answers = d.answers || {}; keyEvents = d.keyEvents || ['purchase']; tab = d.tab || 'overview'; range = d.range || 'all'; filter = d.filter || 'all'; }

  const delta = (cur, pre, better = 1) => {
    if (!compare || pre === null || pre === undefined || cur === null) return '';
    if (pre === 0) return '';
    const p = (cur - pre) / Math.abs(pre), v = Math.abs(p) < 0.005 ? 'flat' : (p * better > 0 ? 'better' : 'worse');
    return `<em data-v="${v}">${p > 0 ? '▲' : p < 0 ? '▼' : ''} ${F.num(Math.abs(p) * 100, 0)}% so với kỳ trước</em>`;
  };
  const kpi = (label, val, extra = '') => `<div class="kpi"><span>${label}</span><b>${val}</b>${extra}</div>`;

  /* ---------- các báo cáo ---------- */
  function tOverview() {
    const r = R(), cur = agg(r.from, r.to).total, pv = prev(), pre = compare && pv ? agg(pv.from, pv.to).total : null;
    const days = DS.rows.filter((x) => chs().includes(x.ch)), byDay = {};
    for (const x of days) { const o = byDay[x.day] || (byDay[x.day] = { day: x.day, sessions: 0, conversions: 0, revenue: 0, cost: 0 }); o.sessions += x.sessions; o.conversions += x.conversions; o.revenue += x.revenue; o.cost += x.cost; }
    const rows = Object.values(byDay).filter((x) => x.day >= r.from && x.day <= r.to).sort((a, b) => a.day - b.day);
    const g = (k) => pre ? pre[k] : null;
    return `<div class="kpis">
      ${kpi('Người dùng', F.int(cur.users), delta(cur.users, g('users')))}${kpi('Phiên', F.int(cur.sessions), delta(cur.sessions, g('sessions')))}
      ${kpi('Tỉ lệ tương tác', F.pct(cur.engRate, 0), delta(cur.engRate, g('engRate')))}${kpi('Sự kiện chính', F.int(keyCount(cur)), delta(keyCount(cur), pre ? keyCount(pre) : null))}
      ${kpi('Doanh thu', F.vnd(cur.revenue), delta(cur.revenue, g('revenue')))}${kpi('Chi phí quảng cáo', F.vnd(cur.cost), delta(cur.cost, g('cost'), -1))}
      ${kpi('ROAS (kênh trả phí)', cur.roas === null ? '—' : F.x(cur.roas), delta(cur.roas, g('roas')))}</div>
      <div class="tabs" role="group">${[['sessions', 'Phiên'], ['conversions', 'Chuyển đổi'], ['revenue', 'Doanh thu'], ['cost', 'Chi phí']].map(([k, t]) => `<button type="button" data-act="metric" data-k="${k}" aria-pressed="${ovMetric === k}">${t}</button>`).join('')}</div>
      ${U.chart(rows.map((x) => ({ ...x, day: x.day })), (x) => x[ovMetric], ovMetric === 'revenue' || ovMetric === 'cost' ? F.vndShort : F.int)}
      <h3 style="margin-top:20px">Theo nhóm kênh</h3>${trafficTable(agg(r.from, r.to), 'grp')}`;
  }
  let ovMetric = 'sessions';
  function keyCount(a) { return keyEvents.reduce((s, e) => s + (a.events[e] || 0), 0); }

  function tRealtime() {
    const rt = GA4Sim.realtime(DS, rtMin), max = Math.max(1, ...Object.values(rt.by));
    const hh = String(rt.hour).padStart(2, '0') + ':' + String(rtMin % 60).padStart(2, '0');
    return `<p class="lb-lede" style="margin-top:0">Giờ mô phỏng ${hh}. Số liệu suy ra từ lượng phiên của từng kênh trong chiến dịch của bạn, không phải giờ thật.</p>
      <div class="kpis">${kpi('Người dùng trong 30 phút qua', F.int(rt.users))}</div>
      <h3 style="margin-top:18px">Theo nguồn</h3>
      ${Object.entries(rt.by).sort((a, b) => b[1] - a[1]).map(([id, n]) => `<div class="part"><span>${smName(id)}</span><div class="meter"><i style="width:${n / max * 100}%"></i></div><b>${n}</b></div>`).join('')}
      <h3 style="margin-top:18px">Trang đang xem</h3>
      <table class="tbl"><tbody>${rt.pages.map((p) => `<tr><td>${escH(p.t)}<br><small>${escH(p.path)}</small></td><td style="text-align:right"><b>${p.users}</b></td></tr>`).join('')}</tbody></table>`;
  }

  function tUserAcq() {
    const r = R(), a = agg(r.from, r.to), ids = chs().filter((id) => a.byCh[id].users > 0);
    return `<p class="lb-lede" style="margin-top:0">Nguồn của lần đầu người dùng đến. Chi phí mỗi người dùng mới = chi phí ÷ người dùng mới (chỉ kênh trả phí).</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Nguồn đầu tiên</th><th>Người dùng mới</th><th>Người dùng</th><th>Tương tác</th><th>Chuyển đổi</th><th>Chi phí / người mới</th></tr></thead><tbody>
      ${ids.map((id) => { const o = a.byCh[id]; return `<tr><td>${escH(smName(id))}</td><td>${F.int(o.newUsers)}</td><td>${F.int(o.users)}</td><td>${F.pct(o.engRate, 0)}</td><td>${F.int(o.conversions)}</td><td>${o.cost > 0 ? F.vnd(o.cost / o.newUsers) : '—'}</td></tr>`; }).join('')}
      </tbody></table></div>`;
  }

  function trafficTable(a, by) {
    const rows = by === 'grp' ? [...new Set(chs().map(grpName))].map((g) => {
      const ids = chs().filter((id) => grpName(id) === g), o = { sessions: 0, engaged: 0, engTime: 0, users: 0, conversions: 0, revenue: 0, cost: 0 };
      for (const id of ids) for (const k in o) o[k] += a.byCh[id][k];
      return { name: g, ...o };
    }) : chs().map((id) => ({ name: smName(id), ...a.byCh[id] }));
    return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>${by === 'grp' ? 'Nhóm kênh' : 'Nguồn / phương tiện'}</th><th>Phiên</th><th>Tương tác</th><th>TG tương tác TB</th><th>Chuyển đổi</th><th>Tỉ lệ CĐ</th><th>Doanh thu</th><th>Chi phí</th><th>CPA</th><th>ROAS</th></tr></thead><tbody>
      ${rows.filter((x) => x.sessions > 0).map((x) => `<tr><td>${escH(x.name)}</td><td>${F.int(x.sessions)}</td><td>${F.pct(E.div(x.engaged, x.sessions), 0)}</td><td>${x.users ? Math.round(x.engTime / x.users) + ' giây' : '—'}</td>
        <td>${F.int(x.conversions)}</td><td>${F.pct(E.div(x.conversions, x.sessions))}</td><td>${F.vnd(x.revenue)}</td><td>${x.cost ? F.vnd(x.cost) : '—'}</td><td>${x.cost && x.conversions ? F.vnd(x.cost / x.conversions) : '—'}</td><td>${x.cost ? F.x(x.revenue / x.cost) : '—'}</td></tr>`).join('')}
      </tbody></table></div>`;
  }
  function tTraffic() {
    const r = R(), a = agg(r.from, r.to), all = GA4Sim.aggregate(DS, r.from, r.to, GA4Sim.channelsOf(DS, 'all')).byCh;
    const sum = (ids) => ids.reduce((o, id) => { for (const k of ['sessions', 'engaged', 'conversions', 'revenue', 'cost']) o[k] += all[id][k]; return o; }, { sessions: 0, engaged: 0, conversions: 0, revenue: 0, cost: 0 });
    const pd = sum(['meta', 'gads']), og = sum(['organic', 'direct', 'referral']);
    const row = (t, o) => `<tr><td><b>${t}</b></td><td>${F.int(o.sessions)}</td><td>${F.pct(E.div(o.engaged, o.sessions), 0)}</td><td>${F.pct(E.div(o.conversions, o.sessions))}</td><td>${F.vnd(E.div(o.revenue, o.sessions))}</td><td>${o.cost ? F.vnd(o.cost) : '—'}</td></tr>`;
    return `<div class="seg" role="radiogroup" style="margin-bottom:14px"><label><input type="radio" name="grp" data-f="group" value="sm" ${group === 'sm' ? 'checked' : ''}>Nguồn / phương tiện</label><label><input type="radio" name="grp" data-f="group" value="grp" ${group === 'grp' ? 'checked' : ''}>Nhóm kênh</label></div>
      ${trafficTable(a, group)}
      <h3 style="margin-top:22px">Organic và trả phí</h3><p class="lb-lede" style="margin-top:4px">Không lọc theo nguồn. Doanh thu/phiên cho biết một phiên đáng giá bao nhiêu.</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Nhóm</th><th>Phiên</th><th>Tương tác</th><th>Tỉ lệ CĐ</th><th>Doanh thu / phiên</th><th>Chi phí</th></tr></thead><tbody>${row('Trả phí (Meta + Google)', pd)}${row('Không trả phí (organic, direct, referral)', og)}</tbody></table></div>
      <p class="lb-lede" style="font-size:14px">Lưu ý: Direct và Organic một phần là hệ quả của quảng cáo (người xem quảng cáo rồi quay lại gõ tên hoặc tìm tên thương hiệu). Trong dữ liệu này, direct được mô phỏng tăng theo phiên quảng cáo.</p>`;
  }

  function tEvents() {
    const r = R(), t = agg(r.from, r.to).total;
    return `<p class="lb-lede" style="margin-top:0">Đánh dấu một sự kiện là "sự kiện chính" khi nó tạo giá trị kinh doanh. Thay đổi được lưu và áp dụng cho mọi báo cáo.</p>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sự kiện</th><th>Loại</th><th>Số lượng</th><th>Sự kiện chính</th></tr></thead><tbody>
      ${GA4Sim.EVENTS.map(([id, kind]) => `<tr><td><code>${id}</code></td><td>${kind}</td><td>${F.int(t.events[id])}</td><td><label class="chip" style="min-height:34px"><input type="checkbox" data-f="key" value="${id}" ${keyEvents.includes(id) ? 'checked' : ''}> Chính</label></td></tr>`).join('')}
      </tbody></table></div>`;
  }
  function tKey() {
    const r = R(), a = agg(r.from, r.to);
    if (!keyEvents.length) return '<div class="lb-note lb-note--warn"><b>Chưa có sự kiện chính nào</b>Vào "Sự kiện" và đánh dấu hành động tạo giá trị, ví dụ purchase.</div>';
    return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Sự kiện chính</th><th>Số lượng</th>${chs().map((id) => `<th>${escH(grpName(id))}</th>`).join('')}</tr></thead><tbody>
      ${keyEvents.map((e) => `<tr><td><code>${e}</code></td><td><b>${F.int(a.total.events[e])}</b></td>${chs().map((id) => `<td>${F.int(a.byCh[id].events[e])}</td>`).join('')}</tr>`).join('')}
      </tbody></table></div>
      ${keyEvents.some((e) => ['page_view', 'session_start', 'scroll', 'click', 'first_visit', 'user_engagement'].includes(e)) ? '<div class="lb-note lb-note--warn"><b>Cẩn thận</b>Bạn đang đếm cả sự kiện xảy ra ở mọi phiên. Số chuyển đổi này sẽ phồng lên và che mất kênh hiệu quả thật.</div>' : ''}`;
  }

  function tFunnel() {
    const r = R(), a = agg(r.from, r.to), f = GA4Sim.funnel(a.total), top = f.steps[0].n || 1;
    const per = chs().filter((id) => a.byCh[id].sessions > 0);
    return `<div>${f.steps.map((s) => `<div class="part" style="grid-template-columns:minmax(150px,1fr) 3fr 150px"><span>${s.t}</span><div class="meter"><i style="width:${s.n / top * 100}%"></i></div>
        <b>${F.int(s.n)}${s.drop !== null ? ` <small style="font-weight:500;color:${f.worst && f.worst.id === s.id ? 'var(--lb-bad)' : 'var(--lb-ink3)'}">−${F.pct(s.drop, 0)}</small>` : ''}</b></div>`).join('')}</div>
      ${f.worst ? `<div class="lb-note lb-note--warn"><b>Điểm rơi lớn nhất: ${f.steps[f.steps.findIndex((s) => s.id === f.worst.id) - 1].t} → ${f.worst.t}</b>Mất ${F.pct(f.worst.drop, 0)} người ở bước này. Với kênh nào thì tệ nhất? Xem bảng bên dưới.</div>` : ''}
      <h3 style="margin-top:20px">Tỉ lệ giữ lại theo kênh</h3>
      <div class="tbl-wrap"><table class="tbl"><thead><tr><th>Kênh</th><th>Phiên</th>${f.steps.slice(1).map((s) => `<th>${s.t}</th>`).join('')}</tr></thead><tbody>
      ${per.map((id) => { const fs = GA4Sim.funnel(a.byCh[id]).steps; return `<tr><td>${escH(grpName(id))}</td><td>${F.int(fs[0].n)}</td>${fs.slice(1).map((s) => `<td>${F.pct(s.keep, 0)}</td>`).join('')}</tr>`; }).join('')}
      </tbody></table></div>`;
  }

  function tLanding() {
    const r = R(), L = GA4Sim.landings(DS, r.from, r.to, chs()).filter((x) => x.sessions > 0).sort((a, b) => b.sessions - a.sessions);
    return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Trang đích</th><th>Phiên</th><th>Tương tác</th><th>Chuyển đổi</th><th>Tỉ lệ CĐ</th><th>Doanh thu</th></tr></thead><tbody>
      ${L.map((x) => `<tr><td>${escH(x.t)}<br><small>${escH(x.path)}</small></td><td>${F.int(x.sessions)}</td><td>${F.pct(x.engRate, 0)}</td><td>${F.int(x.conversions)}</td><td>${F.pct(x.cvr)}</td><td>${F.vnd(x.revenue)}</td></tr>`).join('')}
      </tbody></table></div><p class="lb-lede" style="font-size:14px">Phiên chia theo trang đích bạn đã chọn ở Google Ads (và cơ cấu trang của từng nguồn); chuyển đổi theo mức khớp giữa trang và ý định.</p>`;
  }

  function tAttr() {
    const r = R(), at = GA4Sim.attribution(DS, r.from, r.to), ids = Object.keys(GA4Sim.CHANNELS);
    const tot = (o) => Object.values(o).reduce((s, x) => s + x, 0);
    return `<div class="tbl-wrap"><table class="tbl"><thead><tr><th>Kênh</th><th>Nền tảng tự báo</th><th>Last click</th><th>First click</th><th>Linear</th></tr></thead><tbody>
      ${ids.map((id) => `<tr><td>${escH(smName(id))}</td><td>${at.reported[id] ? F.int(at.reported[id].conversions) : '—'}</td><td>${F.num(at.last[id], 1)}</td><td>${F.num(at.first[id], 1)}</td><td>${F.num(at.linear[id], 1)}</td></tr>`).join('')}
      <tr><td><b>Tổng</b></td><td>${F.int(Object.values(at.reported).filter(Boolean).reduce((s, x) => s + x.conversions, 0))}</td><td><b>${F.num(tot(at.last), 1)}</b></td><td><b>${F.num(tot(at.first), 1)}</b></td><td><b>${F.num(tot(at.linear), 1)}</b></td></tr>
      </tbody></table></div>
      <div class="lb-note"><b>Giả định (công khai)</b>${F.pct(at.assumptions.gadsFromMeta, 0)} chuyển đổi của Paid Search có lần chạm đầu từ Paid Social; ${F.pct(at.assumptions.directFromPaid, 0)} chuyển đổi Direct có lần chạm đầu từ quảng cáo trả phí.
        Ba mô hình của GA4 cộng ra cùng tổng; chỉ cách chia công cho kênh khác nhau. "Nền tảng tự báo" cao hơn vì tính cửa sổ 7 ngày nhấp / 1 ngày xem và nhận công cho mình khi có nhiều điểm chạm, đồng thời GA4 mất một phần phiên do chặn theo dõi.</div>
      <p class="lb-lede" style="font-size:14px">Đọc thế nào: nếu một kênh tăng điểm ở First click, nó đóng vai trò tạo nhu cầu. Nếu giảm, nó chủ yếu đóng đơn.</p>`;
  }

  function tTasks() {
    const Q = qs(), inst = reportMode() === 'instant', grp = { read: 'Đọc số liệu', diagnose: 'Chẩn đoán nguyên nhân', decide: 'Quyết định phân bổ' };
    const answered = Object.keys(answers).filter((k) => Q.some((x) => x.id === k)).length;
    return `<p class="lb-lede" style="margin-top:0">${answered}/${Q.length} câu đã trả lời. ${inst ? 'Phản hồi hiện ngay sau khi chọn.' : 'Đáp án và giải thích hiện sau khi nộp bài.'}</p>
      ${['read', 'diagnose', 'decide'].map((g) => { const items = Q.filter((x) => x.group === g); return items.length ? `<h3 style="margin-top:20px">${grp[g]}</h3>
        ${items.map((x) => `<div class="fld"><span class="lbl">${escH(x.prompt)} ${mode === 'practice' || mode === 'learn' ? `<small style="font-weight:400">· xem tại: ${escH(TABS.find((t) => t[0] === x.module)[1])}</small>` : ''}</span>
          <div class="opts" role="radiogroup">${x.options.map((o) => `<label class="opt"><input type="radio" name="${x.id}" data-f="ans" data-q="${x.id}" value="${o.id}" ${answers[x.id] === o.id ? 'checked' : ''}><span><b style="font-weight:500">${escH(o.t)}</b></span></label>`).join('')}</div>
          ${inst && answers[x.id] ? `<div class="lb-note lb-note--${answers[x.id] === x.answer ? 'ok' : 'bad'}"><b>${answers[x.id] === x.answer ? 'Đúng' : 'Chưa đúng'}</b>${escH(x.why)}</div>` : ''}</div>`).join('')}` : ''; }).join('')}
      <div class="actions"><button class="lb-btn" data-act="submit" ${answered ? '' : 'disabled'}>Nộp bài phân tích</button></div>
      <p class="lb-lede" style="font-size:14px">Kèm theo: thiết lập sự kiện chính của bạn cũng được chấm (${keyEvents.length ? keyEvents.map((k) => '<code>' + k + '</code>').join(', ') : 'chưa đánh dấu'}).</p>`;
  }

  const VIEWS = { overview: tOverview, realtime: tRealtime, userAcq: tUserAcq, traffic: tTraffic, events: tEvents, key: tKey, funnel: tFunnel, landing: tLanding, attr: tAttr, tasks: tTasks };

  /* ---------- màn hình ---------- */
  function renderStart() {
    const t = LabStore.tool(TOOL), atts = t.attempts, d = t.draft;
    app.innerHTML = `<div class="lb"><div class="lb-top"><a class="lb-back" href="lab.html">← Marketing Lab</a><span class="lb-eyebrow">Google Analytics 4 · mô phỏng</span></div>
      <h1>Đọc kết quả marketing bằng GA4</h1>
      <p class="lb-lede">Dữ liệu GA4 ở đây được dựng từ chính các chiến dịch Meta và Google Ads mà bạn đã chạy. Bạn sẽ đọc báo cáo, so sánh kênh, tìm điểm rơi của phễu, hiểu vì sao các con số lệch nhau và quyết định nên đặt tiền ở đâu.</p>
      <div class="lb-note"><b>Nguồn dữ liệu</b>${SRC.notes.map((n) => `<div>${n.real ? '' : '<span class="lb-tag" style="margin-right:6px">Mẫu</span>'}${escH(n.t)}</div>`).join('')}
        ${SRC.notes.some((n) => !n.real) ? '<div style="margin-top:8px"><a href="lab-meta.html">Chạy Meta</a> · <a href="lab-gads.html">Chạy Google Ads</a> rồi bấm "Dùng lần chạy này cho case xuyên suốt" để GA4 dùng số liệu của bạn.</div>' : ''}</div>
      ${d ? `<div class="lb-note"><b>Bạn có bài đang làm dở</b>Chế độ ${escH(MODES[d.mode].t)}, lưu lúc ${dt(d.at)}.<div class="actions" style="margin-top:10px"><button class="lb-btn lb-btn--sm" data-act="resume">Tiếp tục</button><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="drop">Bỏ</button></div></div>` : ''}
      <section class="lb-sec"><h2>Chọn chế độ</h2>${Object.entries(MODES).map(([id, m]) => { const a = atts.filter((x) => x.mode === id), best = a.reduce((b, x) => Math.max(b, x.summary.score), 0);
        return `<div class="lb-row"><div><h3>${m.t}</h3><small>${a.length ? `${a.length} lượt · điểm cao nhất ${best}` : 'Chưa làm'}</small></div><p>${m.d}</p><button class="lb-btn${id === 'learn' ? '' : ' lb-btn--ghost'}" data-act="start" data-m="${id}">${a.length ? 'Làm lượt mới' : 'Bắt đầu'}</button></div>`; }).join('')}</section>
      ${atts.length ? `<section class="lb-sec"><h2>Lịch sử</h2><div class="tbl-wrap"><table class="tbl"><thead><tr><th>Lúc</th><th>Chế độ</th><th>Câu trả lời</th><th>Điểm</th><th></th></tr></thead><tbody>
        ${atts.slice().reverse().map((a) => `<tr><td>${dt(a.at)}</td><td>${MODES[a.mode].t}</td><td>${a.summary.answered}/${a.summary.of}</td><td>${a.summary.score}</td><td><button class="lb-btn lb-btn--text" data-act="open" data-id="${a.id}">Xem</button></td></tr>`).join('')}</tbody></table></div></section>` : ''}</div>`;
  }

  function renderWork() {
    const r = R(), pv = prev();
    app.innerHTML = `<div class="lb"><div class="lb-top"><a class="lb-back" href="#" data-act="exit">← Chế độ & lịch sử</a><span class="lb-eyebrow">${MODES[mode].t} · GA4</span></div>
      <h1 style="font-size:clamp(1.4rem,2.6vw,1.9rem)">${escH(CASE.brand)} · báo cáo GA4</h1>
      <div class="fld" style="display:flex;gap:14px;flex-wrap:wrap;align-items:end;border:0;padding:12px 0 0">
        <label style="margin:0">Khoảng ngày<br><select class="pick" data-f="range">${RANGES.map((x) => `<option value="${x.id}" ${x.id === range ? 'selected' : ''}>${x.t}</option>`).join('')}</select></label>
        <label style="margin:0">Nguồn / phương tiện<br><select class="pick" data-f="filter">${[['all', 'Tất cả'], ['paid', 'Chỉ trả phí'], ['nonpaid', 'Không trả phí']].concat(Object.keys(GA4Sim.CHANNELS).map((id) => [id, smName(id)])).map(([v, t]) => `<option value="${v}" ${v === filter ? 'selected' : ''}>${escH(t)}</option>`).join('')}</select></label>
        <label class="chip" style="margin:0"><input type="checkbox" data-f="compare" ${compare ? 'checked' : ''} ${pv ? '' : 'disabled'}> So với kỳ trước</label>
        ${r.from && DS.start ? `<small style="color:var(--lb-ink3)">${DS.rows.find((x) => x.day === r.from).date} → ${DS.rows.find((x) => x.day === r.to).date}</small>` : ''}</div>
      <nav class="steps" aria-label="Báo cáo">${TABS.map(([id, t]) => `<button type="button" data-act="tab" data-t="${id}" ${id === tab ? 'aria-current="step"' : ''}>${t}</button>`).join('')}</nav>
      <div class="ws"><div class="pane"><h2>${TABS.find((x) => x[0] === tab)[1]}</h2><div id="body">${VIEWS[tab]()}</div></div>
        <aside class="side"><section><h3>Nguồn dữ liệu</h3>${SRC.notes.map((n) => `<p>${n.real ? '' : '<b>Mẫu · </b>'}${escH(n.t)}</p>`).join('')}</section>
        ${mode === 'learn' ? `<section><h3>Cách đọc báo cáo này</h3><p>${HELP[tab]}</p></section>` : ''}
        <section><h3>Nhiệm vụ</h3><p>${Object.keys(answers).length}/${qs().length} câu đã trả lời.</p><button class="lb-btn lb-btn--ghost lb-btn--sm" data-act="tab" data-t="tasks">Mở nhiệm vụ</button></section></aside></div></div>`;
    clearInterval(rtTimer);
    if (tab === 'realtime') rtTimer = setInterval(() => { rtMin += 1; const el = document.getElementById('body'); if (el && tab === 'realtime') el.innerHTML = tRealtime(); else clearInterval(rtTimer); }, 3000);
  }

  function renderResult() {
    const { a, ev } = shown, mType = a.mode === 'challenge', Q = qs();
    app.innerHTML = `<div class="lb"><div class="lb-top"><a class="lb-back" href="#" data-act="exit">← Chế độ & lịch sử</a><span class="lb-eyebrow">Kết quả · ${MODES[a.mode].t}</span></div>
      <h1>Kết quả phân tích GA4</h1>
      <div class="score" style="margin-top:18px"><b>${ev.total}</b><span>/ 100 điểm${mType ? ` <span class="stars">${U.stars(ev.stars)}</span>` : ''}</span></div>
      <p class="lb-lede" style="margin-top:6px">${shown.gw ? (shown.gw.gain > 0 ? (shown.gw.xp > 0 ? `Sao mới +${shown.gw.gain} → +${shown.gw.xp} XP.` : `Sao mới +${shown.gw.gain}; hôm nay đã đủ XP từ game.`) : 'Chưa có sao mới. XP chỉ tính cho sao mới.') : `Chế độ ${MODES[a.mode].t} cho điểm để bạn so sánh, nhưng chỉ Thử thách mới tính sao và XP.`}</p>
      <div class="parts">${ev.parts.map((p) => `<div class="part"><span>${escH(p.label)}</span><div class="meter"><i style="width:${p.got / p.max * 100}%"></i></div><b>${p.got}/${p.max}</b></div>`).join('')}</div>
      <section class="lb-sec"><h2>Vì sao</h2>${ev.decisions.map((x) => `<div class="dec" data-t="${x.tone}"><b>${escH(x.title)}</b><p>${escH(x.body)}</p></div>`).join('')}</section>
      <section class="lb-sec"><h2>Nên luyện thêm</h2>${ev.recommendations.length ? `<ol style="padding-left:20px">${ev.recommendations.map((r) => `<li style="margin:8px 0">${escH(r)}</li>`).join('')}</ol>` : '<p>Bạn đã đọc đúng dữ liệu. Thử quay lại các nhóm kênh khác hoặc đổi khoảng ngày để kiểm chứng kết luận.</p>'}</section>
      <div class="actions"><button class="lb-btn" data-act="retry">Làm lại với cùng dữ liệu</button><a class="lb-btn lb-btn--ghost" href="lab-meta.html">Chạy lại Meta</a><a class="lb-btn lb-btn--ghost" href="lab-gads.html">Chạy lại Google Ads</a><a class="lb-btn lb-btn--ghost" href="lab.html">Về Marketing Lab</a></div></div>`;
  }

  function render() {
    clearInterval(rtTimer);
    if (view === 'work') renderWork(); else if (view === 'result' && shown) renderResult(); else { view = 'start'; renderStart(); }
    const u = new URL(location.href); if (mode && view !== 'start') u.searchParams.set('mode', mode); else u.searchParams.delete('mode'); history.replaceState(null, '', u);
  }

  app.addEventListener('change', (e) => {
    const el = e.target, f = el.dataset && el.dataset.f; if (!f) return;
    if (f === 'range') { range = el.value; if (!prev()) compare = false; }
    else if (f === 'filter') filter = el.value;
    else if (f === 'compare') compare = el.checked;
    else if (f === 'group') group = el.value;
    else if (f === 'key') { keyEvents = el.checked ? [...new Set([...keyEvents, el.value])] : keyEvents.filter((x) => x !== el.value); }
    else if (f === 'ans') answers[el.dataset.q] = el.value;
    save(); renderWork();
    if (f === 'ans') { const n = document.querySelector(`input[name="${el.dataset.q}"]:checked`); if (n) n.focus(); }
  });
  app.addEventListener('click', (e) => {
    const b = e.target.closest('[data-act]'); if (!b || b.tagName === 'SELECT') return; const act = b.dataset.act;
    if (act === 'exit') { e.preventDefault(); if (view === 'work') save(); view = 'start'; shown = null; render(); }
    else if (act === 'start') { const d = LabStore.tool(TOOL).draft; if (d && d.mode === b.dataset.m) load(d); else { mode = b.dataset.m; answers = {}; keyEvents = ['purchase']; tab = 'overview'; range = 'all'; filter = 'all'; compare = false; } view = 'work'; render(); }
    else if (act === 'resume') { const d = LabStore.tool(TOOL).draft; if (d) { load(d); view = 'work'; render(); } }
    else if (act === 'drop') { LabStore.clearDraft(TOOL); render(); }
    else if (act === 'tab') { tab = b.dataset.t; save(); renderWork(); window.scrollTo(0, 0); }
    else if (act === 'metric') { ovMetric = b.dataset.k; renderWork(); }
    else if (act === 'submit') {
      const ev = GA4Eval.evaluate(DS, answers, keyEvents), gw = mode === 'challenge' ? GW.report(GID, ev.stars, ev.total) : null;
      const a = LabStore.addAttempt(TOOL, { mode, answers: { ...answers }, keyEvents: [...keyEvents], label: '', summary: { score: ev.total, stars: ev.stars, answered: ev.answered, of: ev.of } });
      LabStore.clearDraft(TOOL); shown = { a, ev, gw }; view = 'result'; render(); window.scrollTo(0, 0);
    }
    else if (act === 'open') { const a = LabStore.attempts(TOOL).find((x) => x.id === b.dataset.id); if (a) { mode = a.mode; shown = { a, ev: GA4Eval.evaluate(DS, a.answers, a.keyEvents || ['purchase']), gw: null }; view = 'result'; render(); } }
    else if (act === 'retry') { mode = shown.a.mode; answers = {}; keyEvents = ['purchase']; tab = 'tasks'; view = 'work'; render(); }
  });

  if (mode) { if (saved && saved.mode === mode) load(saved); view = 'work'; }
  render();
})();
