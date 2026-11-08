/* Heuristic mức tư duy (Bloom) của một câu hỏi, dùng chung cho inventory, validator và báo cáo.
   Chỉ là dấu hiệu từ thân câu; chấm thật nằm ở audit. Trả về 'L1'…'L5'. */
const strip = (h) => String(h || '').replace(/<[^>]+>/g, ' ').toLowerCase();
export const BLOOM_RANK = { L1: 1, L2: 2, L3: 3, L4: 4, L5: 5, L6: 6 };
export function bloomOf(q) {
  const s = strip(q.stem);
  if (q.type === 'calc') return (q.steps || []).length >= 3 ? 'L4' : 'L3';
  if (/thiết kế|lập kế hoạch|đề xuất (một|kế hoạch|lộ trình)|viết lại|dựng (kế hoạch|thí nghiệm)|xếp thứ tự ưu tiên/.test(s)) return 'L5';
  if (/đánh đổi|nên chọn|ưu tiên|biện hộ|chấp nhận|đáng làm|có nên|bạn làm gì|nên làm gì|quyết (định|gì)|bạn chọn gì|chọn (cái|phương án|hướng) nào/.test(s)) return 'L4';
  if (/vì sao|đọc thế nào|giải thích|nguyên nhân|chẩn đoán|dấu hiệu|sai ở đâu|kết luận|nhận định nào|hợp lý|số nào|tin (số|ai|cái) nào|đọc (số|bảng|kết quả)/.test(s)) return 'L3';
  if (/là gì|định nghĩa|gọi là|khái niệm|thuật ngữ/.test(s)) return 'L1';
  return 'L2';
}
export function maxBloom(qs) { return (qs || []).map(bloomOf).sort((a, b) => BLOOM_RANK[b] - BLOOM_RANK[a])[0] || 'L1'; }
