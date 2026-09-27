/**
 * Rubric cho từng bàn làm việc.
 *
 * Nguyên tắc chia việc:
 *   - `checks`  — kiểm bằng code. Miễn phí, không bao giờ sai, chạy trước.
 *   - `criteria` — chỉ những thứ code không kiểm nổi mới đưa cho Claude.
 * Nếu một tiêu chí có thể viết thành regex thì nó KHÔNG thuộc về phần AI.
 */

const txt = (v) => String(v || '').trim();
const words = (v) => txt(v).split(/\s+/).filter(Boolean).length;

/* Những từ mà đối thủ nào cũng viết được, nên chúng không mang thông tin. */
export const EMPTY_WORDS = [
  'chất lượng cao', 'chất lượng tốt', 'uy tín', 'hàng đầu', 'tận tâm', 'chuyên nghiệp',
  'giá hợp lý', 'giá tốt', 'tốt nhất', 'số 1', 'số một', 'đa dạng', 'phong phú',
  'tiên phong', 'đẳng cấp', 'giải pháp toàn diện', 'tối ưu', 'đáng tin cậy', 'sự hài lòng',
];
const emptyIn = (s) => EMPTY_WORDS.filter((w) => txt(s).toLowerCase().includes(w));

export const RUBRICS = {
  /* ---------------------------------------------------------------- */
  positioning: {
    version: 'pos-1',
    label: 'Năm câu định vị',
    task: 'Viết 5 câu định vị cho cùng một sản phẩm, mỗi câu nhắm một lựa chọn thay thế khác nhau.',
    render(p) {
      const list = (p.list || p.st || []).filter((x) => x && (x.we || x.diff));
      return [
        `Sản phẩm: ${txt(p.prod) || '(chưa ghi)'}`,
        ...list.map((s, i) => [
          `--- Câu ${i + 1}`,
          `Đối thủ / cái thay thế: ${txt(s.rival || s.alt)}`,
          `Cho ai: ${txt(s.for || s.who)}`,
          `Khác với: ${txt(s.unlike || s.alt)}`,
          `Chúng tôi là: ${txt(s.we || s.diff)}`,
          `Vì: ${txt(s.because || s.proof)}`,
          `Chấp nhận mất: ${txt(s.giveup || s.not)}`,
        ].join('\n')),
      ].join('\n\n');
    },
    checks(p) {
      const list = (p.list || p.st || []).filter((x) => x && (x.we || x.diff));
      const out = [];
      out.push({
        id: 'has-exclusion',
        label: 'Mỗi câu có nêu thứ mình chấp nhận mất',
        pass: list.length > 0 && list.every((s) => txt(s.giveup || s.not).length > 2),
        note: 'Câu không loại trừ ai thì chưa chiếm chỗ nào — đó là mô tả, không phải định vị.',
      });
      const found = list.flatMap((s) => emptyIn([s.we || s.diff, s.because || s.proof].join(' ')));
      out.push({
        id: 'no-empty-words',
        label: 'Không dùng chữ rỗng',
        pass: found.length === 0,
        note: found.length ? `Còn: “${[...new Set(found)].join('”, “')}”.` : '',
      });
      out.push({
        id: 'enough',
        label: 'Đủ ít nhất 3 câu để so sánh được',
        pass: list.length >= 3,
        note: 'Dưới 3 câu thì chưa thấy được mình đang lặp lại chính mình hay không.',
      });
      return out;
    },
    criteria: [
      { id: 'rival-fit', label: 'Khác biệt đúng với đối thủ đã nêu',
        ask: 'Với mỗi câu: nếu thay tên đối thủ bằng một đối thủ khác thì câu đó có sai đi không? Nếu vẫn đúng nguyên, khác biệt đang nói về bản thân chứ không đặt cạnh ai.' },
      { id: 'proof-is-fact', label: 'Lý do tin là dữ kiện, không phải lời hứa',
        ask: 'Phần “Vì” có phải thứ người ngoài kiểm chứng được không (con số, quy trình, nguồn gốc, cam kết có ràng buộc)? Hay chỉ là một lời hứa tự phong?' },
      { id: 'not-interchangeable', label: 'Năm câu không hoán đổi được cho nhau',
        ask: 'Có cặp nào đang nói cùng một khác biệt cho hai lựa chọn thay thế khác nhau không? Nếu có, hoặc hai đối thủ đó thật ra là một, hoặc người viết chưa hiểu một trong hai.' },
      { id: 'costly-choice', label: 'Thứ chấp nhận mất là mất thật',
        ask: 'Phần “chấp nhận mất” có thật sự tốn kém không, hay chỉ là nhóm khách mà sản phẩm vốn không phục vụ được? Loại trừ không tốn gì thì không phải là lựa chọn.' },
    ],
  },

  /* ---------------------------------------------------------------- */
  segmentation: {
    version: 'seg-1',
    label: 'Phân khúc theo dịp',
    task: 'Chia 4 phân khúc theo dịp sử dụng; mỗi phân khúc phải dẫn tới một việc phải làm khác nhau.',
    render(p) {
      const segs = (p.segs || []).filter((s) => s && (s.name || s.occ));
      return [
        `Ngành / sản phẩm: ${txt(p.field) || '(chưa ghi)'}`,
        ...segs.map((s, i) => [
          `--- Phân khúc ${i + 1}: ${txt(s.name) || '(chưa đặt tên)'}`,
          `Dịp: ${txt(s.occ)}`,
          `Việc cần làm: ${txt(s.job)}`,
          `Thay thế: ${txt(s.alt)}`,
          `Tiêu chí chọn: ${txt(s.crit)}`,
          `Nên tôi phải làm khác ở chỗ: ${txt(s.plan)}`,
        ].join('\n')),
      ].join('\n\n');
    },
    checks(p) {
      const segs = (p.segs || []).filter((s) => s && (s.name || s.occ));
      const full = segs.filter((s) => ['occ', 'job', 'alt', 'crit', 'plan'].every((k) => txt(s[k]).length > 2));
      return [
        { id: 'enough', label: 'Ít nhất 2 phân khúc điền đủ', pass: full.length >= 2,
          note: 'Chưa đủ để so sánh xem hai phân khúc có khác nhau thật không.' },
        { id: 'has-nothing-alt', label: 'Có phân khúc nào coi “không làm gì” là lựa chọn thay thế',
          pass: segs.some((s) => /không làm gì|tự làm|để đó|không mua/i.test(txt(s.alt))),
          note: 'Trong hầu hết category, “không làm gì” là đối thủ lớn nhất. Không ai nhắc tới nó là dấu hiệu đang đánh giá quá cao nhu cầu.' },
        { id: 'plan-specific', label: 'Dòng “phải làm khác” đủ cụ thể',
          pass: full.every((s) => words(s.plan) >= 6),
          note: 'Dưới 6 chữ thường là một tính từ chứ chưa phải một việc bắt tay làm được.' },
      ];
    },
    criteria: [
      { id: 'occasion-not-demographic', label: 'Chia theo dịp, không theo nhân khẩu học',
        ask: 'Các phân khúc có được định nghĩa bằng tình huống sử dụng không, hay thực chất vẫn là mô tả con người (tuổi, giới, thu nhập) được viết lại?' },
      { id: 'plans-differ', label: 'Mỗi phân khúc dẫn tới một kế hoạch khác nhau',
        ask: 'Có hai phân khúc nào mà dòng “phải làm khác” dẫn tới cùng một việc không? Nếu có thì đó là một phân khúc bị tách đôi.' },
      { id: 'job-is-real', label: 'Việc cần làm là việc của khách, không phải tính năng của sản phẩm',
        ask: 'Phần “việc cần làm” có mô tả điều khách đang cố hoàn thành trong đời sống của họ không, hay chỉ mô tả sản phẩm làm được gì?' },
    ],
  },

  /* ---------------------------------------------------------------- */
  interview: {
    version: 'int-1',
    label: 'Năm cuộc phỏng vấn',
    task: 'Ghi lại 5 cuộc phỏng vấn về lần mua gần nhất — hành vi đã xảy ra, không phải ý định.',
    render(p) {
      const pp = (p.pp || []).filter((x) => x && (x.who || x.last));
      return [
        `Category: ${txt(p.cat) || '(chưa ghi)'}`,
        `Giả thuyết ban đầu: ${txt(p.hyp) || '(chưa ghi)'}`,
        ...pp.map((x, i) => [
          `--- Người ${i + 1}: ${txt(x.who)}`,
          `Lần gần nhất: ${txt(x.last)}`,
          `Đã cân nhắc gì khác: ${txt(x.alts)}`,
          `Suýt không mua vì: ${txt(x.almost)}`,
          `Câu đáng nhớ: ${txt(x.quote)}`,
        ].join('\n')),
      ].join('\n\n');
    },
    checks(p) {
      const pp = (p.pp || []).filter((x) => x && (x.who || x.last));
      const full = pp.filter((x) => ['who', 'last', 'alts', 'almost', 'quote'].every((k) => txt(x[k]).length > 2));
      const future = /\bsẽ\b|chắc là|có thể sẽ|nếu mà|nếu có|trong tương lai/i;
      return [
        { id: 'enough', label: 'Ít nhất 3 người', pass: full.length >= 3,
          note: 'Ba người là ngưỡng tối thiểu để bắt đầu thấy trùng lặp.' },
        { id: 'past-tense', label: 'Ghi hành vi đã xảy ra, không phải dự đoán',
          pass: !pp.some((x) => future.test([x.last, x.quote].join(' '))),
          note: 'Có câu đang nói về tương lai. Đó là dự đoán — con người dự đoán bản thân rất tệ.' },
        { id: 'nothing-option', label: 'Có người nhắc tới “không làm gì cả”',
          pass: pp.some((x) => /không làm gì|không mua|tự làm|vẫn dùng cái cũ/i.test(txt(x.alts))),
          note: 'Chưa ai nhắc tới nó — khả năng cao câu hỏi đang gợi ý sẵn câu trả lời.' },
      ];
    },
    criteria: [
      { id: 'verbatim', label: 'Chép nguyên văn, không tóm tắt hộ',
        ask: 'Các câu trích có nghe như lời người thật nói không (có chi tiết thừa, cách nói riêng), hay đã bị viết lại thành ngôn ngữ marketing của người phỏng vấn?' },
      { id: 'context-rich', label: 'Có ngữ cảnh của lần mua',
        ask: 'Phần “lần gần nhất” có nói được hôm đó đang xảy ra chuyện gì không? Không có ngữ cảnh thì không suy ra được dịp sử dụng.' },
      { id: 'barrier-real', label: 'Rào cản là rào cản thật',
        ask: 'Phần “suýt không mua vì” có phải một trở ngại cụ thể không, hay chỉ là “giá” nói chung — thứ người ta hay nói khi không muốn giải thích lý do thật?' },
    ],
  },

  /* ---------------------------------------------------------------- */
  'customer-map': {
    version: 'map-1',
    label: 'Bản đồ khách hàng',
    task: 'Với mỗi phân khúc, viết một insight có cấu trúc “muốn — nhưng — nên”, gắn với trích dẫn của người thật.',
    render(p, extra = {}) {
      const rows = Object.entries(p.rows || {});
      const quotes = extra.quotes || {};
      return rows.map(([i, r]) => [
        `--- Phân khúc ${Number(i) + 1}`,
        `Insight: ${txt(r.ins)}`,
        `Trích dẫn đã gắn: ${(r.q || []).map((id) => quotes[id] || id).join(' | ') || '(chưa gắn)'}`,
      ].join('\n')).join('\n\n');
    },
    checks(p) {
      const rows = Object.values(p.rows || {}).filter((r) => txt(r.ins).length > 10);
      return [
        { id: 'has-insight', label: 'Có ít nhất một insight', pass: rows.length > 0, note: '' },
        { id: 'tension', label: 'Insight có căng thẳng (chữ “nhưng”)',
          pass: rows.length > 0 && rows.every((r) => /\bnhưng\b|\btuy nhiên\b|\bmà lại\b/i.test(r.ins)),
          note: 'Không có mâu thuẫn thì đó là quan sát, chưa phải insight.' },
        { id: 'evidence', label: 'Mỗi insight có ít nhất một trích dẫn thật',
          pass: rows.length > 0 && rows.every((r) => (r.q || []).length > 0),
          note: 'Insight không có bằng chứng vẫn đúng — nhưng đúng theo cách người viết nghĩ.' },
      ];
    },
    criteria: [
      { id: 'quote-supports', label: 'Trích dẫn thật sự chống đỡ được insight',
        ask: 'Câu trích được gắn có nói đúng điều mà insight khẳng định không, hay chỉ nằm cùng chủ đề?' },
      { id: 'tension-real', label: 'Mâu thuẫn là mâu thuẫn thật',
        ask: 'Vế sau chữ “nhưng” có phải một lực cản thật sự đối nghịch với mong muốn ở vế trước không, hay chỉ là một mệnh đề nối thêm cho đủ mẫu?' },
      { id: 'actionable', label: 'Insight mở ra được hướng làm',
        ask: 'Từ insight này có nghĩ ra được ít nhất một việc cụ thể để làm khác đi không? Nếu không, nó đang quá chung.' },
    ],
  },
};

export const listRubrics = () => Object.keys(RUBRICS);
