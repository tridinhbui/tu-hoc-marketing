/* MARKETING LAB · LƯU TIẾN ĐỘ — dùng lại cơ chế của app: trạng thái S ('thmc.v1') và flags được đồng bộ lên máy chủ
   theo tài khoản đang đăng nhập (người học chỉ ghi được vào trạng thái CỦA MÌNH). Cần app.js (S, scheduleSync, GW) nạp trước.
   Cấu trúc: flags.lab = { v, meta:{ draft, attempts[], used }, case:{ skincare:{ meta:{attemptId} } } } */
const LabStore = {
  KEY: 'lab', MAX_ATTEMPTS: 40,
  empty() { return { v: 1, meta: { draft: null, attempts: [] }, case: {} }; },
  all() { const f = (S.get().flags || {}); const l = f[this.KEY]; return l && l.v === 1 ? l : this.empty(); },
  save(lab) {
    const s = S.get();
    S.set({ flags: { ...(s.flags || {}), [this.KEY]: lab } });
    if (typeof scheduleSync === 'function') scheduleSync();
  },
  tool(id) { return this.all()[id] || { draft: null, attempts: [] }; },
  setDraft(id, draft) { const l = this.all(); l[id] = { ...this.tool(id), draft }; this.save(l); },
  clearDraft(id) { this.setDraft(id, null); },
  addAttempt(id, attempt) {
    const l = this.all(), t = this.tool(id);
    const a = { ...attempt, id: attempt.id || 'a' + Date.now().toString(36), at: Date.now() };
    l[id] = { ...t, attempts: [...t.attempts, a].slice(-this.MAX_ATTEMPTS) };
    this.save(l); return a;
  },
  attempts(id, filter = {}) {
    return this.tool(id).attempts.filter((a) => Object.entries(filter).every(([k, v]) => a[k] === v));
  },
  best(id, filter = {}) { return this.attempts(id, filter).reduce((b, a) => !b || a.score.total > b.score.total ? a : b, null); },
  /* Chọn một lượt chạy làm đầu vào cho case xuyên suốt (GA4 sẽ đọc `feed`). */
  pickForCase(caseId, toolId, attemptId) {
    const l = this.all(); l.case = { ...l.case, [caseId]: { ...(l.case[caseId] || {}), [toolId]: { attemptId, at: Date.now() } } }; this.save(l);
  },
  picked(caseId, toolId) { const p = ((this.all().case || {})[caseId] || {})[toolId]; if (!p) return null; return this.attempts(toolId).find((a) => a.id === p.attemptId) || null; },
  last() {   // phiên gần nhất trong mọi công cụ — cho "Tiếp tục"
    const l = this.all(); let best = null;
    for (const id of ['meta']) { const t = l[id]; if (!t) continue;
      const when = Math.max(t.draft ? t.draft.at || 0 : 0, ...(t.attempts || []).map((a) => a.at || 0), 0);
      if (when && (!best || when > best.when)) best = { tool: id, when, draft: t.draft, attempt: (t.attempts || []).slice(-1)[0] || null }; }
    return best;
  },
};
if (typeof module !== 'undefined') module.exports = LabStore;
