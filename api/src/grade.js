/**
 * Chấm bài: code kiểm trước, Claude kiểm phần còn lại.
 *
 * Ranh giới sư phạm — cứng, không thương lượng:
 *   không viết lại bài hộ người học, không cho điểm số.
 *   Chỉ nói tiêu chí nào chưa đạt, vì sao, và hỏi lại một câu.
 * Viết hộ thì người học có bài đẹp mà không khá lên; cho điểm thì họ tối ưu điểm.
 */
import Anthropic from '@anthropic-ai/sdk';
import { z } from 'zod';
import { zodOutputFormat } from '@anthropic-ai/sdk/helpers/zod';
import { RUBRICS } from './rubrics.js';

/* $ / 1M token. Dùng để ghi chi phí từng lượt vào D1. */
const PRICE = {
  'claude-opus-5':   { in: 5, out: 25 },
  'claude-sonnet-5': { in: 3, out: 15 },
  'claude-haiku-4-5': { in: 1, out: 5 },
};

const Verdict = z.object({
  criteria: z.array(z.object({
    id: z.string(),
    met: z.boolean(),
    why: z.string().describe('Một câu, nói thẳng, dựa vào chính chữ người học viết'),
    question: z.string().describe('Một câu hỏi để họ tự sửa. Không đưa đáp án.'),
  })),
  strongest: z.string().describe('Phần làm tốt nhất, nêu cụ thể chứ không khen chung'),
  next_move: z.string().describe('Một việc duy nhất nên làm tiếp'),
});

const SYSTEM = (r) => `Bạn là người hướng dẫn marketing, đang đọc bài tập của một người mới vào nghề.

BÀI TẬP: ${r.label}
ĐỀ: ${r.task}

Chấm theo đúng các tiêu chí dưới đây, không thêm tiêu chí của riêng bạn:
${r.criteria.map((c, i) => `${i + 1}. [${c.id}] ${c.label}\n   Cách kiểm: ${c.ask}`).join('\n')}

QUY TẮC:
- Không viết lại bài hộ. Không đưa ví dụ mẫu để họ chép.
- Không cho điểm, không xếp loại.
- Mỗi tiêu chí: nói rõ đạt hay chưa, vì sao (trích chính chữ họ viết), rồi hỏi lại một câu.
- Nếu chưa đạt, câu hỏi phải chỉ đúng chỗ hỏng, không hỏi chung chung.
- Viết tiếng Việt, xưng "bạn", ngắn. Mỗi trường tối đa hai câu.
- Nghiêm khắc nhưng không mỉa mai. Người học đang cố gắng.`;

export async function grade({ bench, payload, extra = {}, apiKey, model = 'claude-opus-5' }) {
  const r = RUBRICS[bench];
  if (!r) throw new Error('rubric_not_found');

  /* 1. Phần kiểm bằng code — miễn phí, chạy trước, không bao giờ sai. */
  const checks = r.checks(payload);

  /* 2. Nếu bài còn quá sơ sài thì không gọi AI. Tốn tiền mà không dạy được gì. */
  const body = r.render(payload, extra);
  if (body.replace(/\s/g, '').length < 120) {
    return { bench, rubric_version: r.version, checks, criteria: [],
      strongest: '', next_move: 'Viết thêm đã — bài còn quá ngắn để đọc được gì.',
      model: null, cost_usd: 0 };
  }

  /* 3. Phần chỉ AI kiểm được. Rubric nằm trong system và được cache — nó đứng yên
        giữa mọi lượt chấm, chỉ bài của người học là thay đổi. */
  const client = new Anthropic({ apiKey });
  const res = await client.messages.parse({
    model,
    max_tokens: 2000,
    system: [{ type: 'text', text: SYSTEM(r), cache_control: { type: 'ephemeral' } }],
    messages: [{ role: 'user', content: `Đây là bài của người học:\n\n${body}` }],
    output_config: { format: zodOutputFormat(Verdict) },
  });

  const u = res.usage || {};
  const p = PRICE[model] || PRICE['claude-opus-5'];
  /* Token đọc từ cache rẻ hơn giá input thường, nên con số này là mức trần. */
  const inTok = (u.input_tokens || 0) + (u.cache_read_input_tokens || 0) + (u.cache_creation_input_tokens || 0);
  const cost = (inTok / 1e6) * p.in + ((u.output_tokens || 0) / 1e6) * p.out;

  const v = res.parsed_output;
  if (!v) throw new Error('parse_failed');

  return {
    bench, rubric_version: r.version, checks,
    criteria: v.criteria, strongest: v.strongest, next_move: v.next_move,
    model, cost_usd: Number(cost.toFixed(6)),
    usage: { in: inTok, out: u.output_tokens || 0, cached: u.cache_read_input_tokens || 0 },
  };
}
