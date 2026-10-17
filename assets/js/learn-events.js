/* Sự kiện học theo bước (EXP-01). Chạy trong trang bài; gửi lô tới POST /api/events.
   - Chỉ hoạt động khi máy chủ bật cờ `events` (enabled=true). Tắt → mọi hàm là no-op: không ghi bộ nhớ, không gọi mạng.
   - Không gửi danh tính: máy chủ lấy người dùng từ phiên. Không gửi chữ người dùng gõ, không gửi đáp án đã chọn.
   - Không đếm trùng: lsid (một lượt mở bài) lưu trong sessionStorage 30 phút nên refresh giữ nguyên lsid;
     mỗi (lsid, sự kiện) chỉ phát một lần; máy chủ còn chặn lần nữa bằng khoá idem UNIQUE.
   - Nhẹ cho D1: gom lô (≤20 sự kiện, 5 sự kiện hoặc 10 giây), gửi nốt khi rời/ẩn trang bằng fetch keepalive. */
const LearnEvents = (() => {
  const TTL = 30 * 60e3, MAX_BATCH = 20, FLUSH_N = 5, FLUSH_MS = 10000;
  const ALLOWED = ['lesson_opened', 'quiz_visible', 'quiz_started', 'quiz_cta_clicked', 'quiz_submitted'];

  /* o = { enabled, lesson, release, device, storage, now(), uuid(), send(batch) → Promise, setTimer(fn,ms), clearTimer(id) }
     Mọi phụ thuộc được truyền vào để kiểm thử bằng node không cần trình duyệt. */
  function create(o) {
    const enabled = !!(o && o.enabled && o.lesson);
    const noop = { enabled: false, lsid: null, emit: () => false, flush: () => {}, pending: () => 0 };
    if (!enabled) return noop;

    const store = o.storage;
    const read = (k) => { try { return store.getItem(k); } catch (e) { return null; } };
    const write = (k, v) => { try { store.setItem(k, v); } catch (e) { /* bộ nhớ đầy/bị chặn: vẫn chạy, chỉ mất chống trùng qua refresh */ } };

    const key = 'thmc.lsid.' + o.lesson, t0 = o.now();
    let rec = null;
    try { rec = JSON.parse(read(key) || 'null'); } catch (e) { rec = null; }
    if (!rec || typeof rec.id !== 'string' || typeof rec.t !== 'number' || t0 - rec.t > TTL) rec = { id: o.uuid(), t: t0, sent: {} };
    else { rec.t = t0; rec.sent = rec.sent && typeof rec.sent === 'object' ? rec.sent : {}; }
    const save = () => write(key, JSON.stringify(rec));
    save();

    let queue = [], timer = null;
    const stop = () => { if (timer !== null) { o.clearTimer(timer); timer = null; } };
    function flush() {
      stop();
      if (!queue.length) return;
      const batch = queue.splice(0, MAX_BATCH);
      let p; try { p = o.send(batch); } catch (e) { p = Promise.reject(e); }
      /* Lỗi mạng: thử lại đúng một lần (đánh dấu try), sau đó bỏ — đo lường không được làm phiền người học. */
      Promise.resolve(p).catch(() => {
        const again = batch.filter((e) => !e.__retried).map((e) => Object.assign({}, e, { __retried: true }));
        if (again.length) { queue.unshift(...again); schedule(); }
      });
      if (queue.length) schedule();
    }
    function schedule() { if (timer === null) timer = o.setTimer(flush, FLUSH_MS); }

    function emit(name, props) {
      if (ALLOWED.indexOf(name) < 0 || rec.sent[name]) return false;
      rec.sent[name] = 1; rec.t = o.now(); save();
      queue.push({ event: name, lsid: rec.id, lesson_id: o.lesson, release: o.release, device_class: o.device, props: props || {} });
      if (queue.length >= FLUSH_N) flush(); else schedule();
      return true;
    }
    return { enabled: true, lsid: rec.id, emit, flush, pending: () => queue.length };
  }

  /* Gắn vào trình duyệt thật. */
  function forBrowser(opt) {
    const send = (batch) => fetch('/api/events', { method: 'POST', credentials: 'same-origin', keepalive: true,
      headers: { 'x-thmc': '1', 'content-type': 'application/json' },
      body: JSON.stringify({ events: batch.map(({ __retried, ...e }) => e) }) }).then((r) => { if (!r.ok && r.status >= 500) throw new Error('server'); });
    const ev = create(Object.assign({}, opt, {
      storage: (() => { try { return window.sessionStorage; } catch (e) { return { getItem: () => null, setItem: () => {} }; } })(),
      now: () => Date.now(),
      uuid: () => (window.crypto && crypto.randomUUID ? crypto.randomUUID() : '00000000-0000-4000-8000-' + String(Date.now()).padStart(12, '0')),
      send, setTimer: (f, ms) => setTimeout(f, ms), clearTimer: (i) => clearTimeout(i),
    }));
    if (ev.enabled) {
      addEventListener('pagehide', () => ev.flush());
      document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') ev.flush(); });
    }
    return ev;
  }
  return { create, forBrowser, ALLOWED };
})();
if (typeof module !== 'undefined') module.exports = LearnEvents;
