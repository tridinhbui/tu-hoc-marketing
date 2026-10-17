/* Sáu case bấm giờ về phân khúc, hành vi khách, định vị, thông điệp, tâm lý giá, được nhớ tới.
   Khoá: cấu trúc giống 12 case cũ, mã lỗi và mã bài có thật, số liệu tự khớp (tính lại độc lập), phủ các năng lực trước đây không có case,
   và đáp án đúng không luôn là phương án dài nhất / không dồn một vị trí. */
import test from 'node:test';
import assert from 'node:assert/strict';
import { loadContent } from './helpers.mjs';

const { get } = loadContent({ withBai: false });
const CASES = get('CASES'), COMPS = get('COMPETENCIES'), ERRORS = get('ERRORS'), PRIN = get('PRINCIPLES'), LESSONS = get('LESSONS');
const NEW = ['phan-khuc-sua-hat', 'hanh-vi-rau-huu-co', 'dinh-vi-so-ngay', 'thong-diep-excel-ke-toan', 'mo-than-goi-gia', 'duoc-nho-ca-phe-lon'];
const byId = (id) => CASES.find((c) => c.id === id);
const validLesson = new Set([...PRIN.map((p) => 'P:' + p.id), ...LESSONS.map((l) => 'L:' + (l.day ?? l.id)), ...COMPS.flatMap((c) => c.lessons)]);

test('mọi case (18): cấu trúc, mã lỗi, mã bài, năng lực hợp lệ', () => {
  assert.equal(CASES.length, 18);
  assert.equal(new Set(CASES.map((c) => c.id)).size, CASES.length);
  const compIds = new Set(COMPS.map((c) => c.id));
  const mins = { 'Dễ': 15, 'Trung bình': 20, 'Khó': 25 };
  for (const c of CASES) {
    assert.equal(mins[c.level], c.minutes, `${c.id}: level/minutes`);
    assert.ok(c.asks.length >= 4 && c.asks.filter((a) => a.key).length >= 3 && c.asks.some((a) => !a.key), `${c.id}: asks`);
    assert.equal(new Set(c.asks.map((a) => a.id)).size, c.asks.length);
    const calc = c.qs.filter((q) => q.crit === 'calc');
    assert.ok(calc.length >= 1 && c.qs.filter((q) => q.crit === 'insight').length === 1 && c.qs.filter((q) => q.crit === 'rec').length === 1, `${c.id}: calc/insight/rec`);
    for (const q of c.qs) {
      assert.ok(q.why && q.why.length >= 15, `${c.id}/${q.id}: thiếu lời giải`);
      assert.ok(validLesson.has(q.lesson), `${c.id}/${q.id}: mã bài ${q.lesson}`);
      if (q.kind === 'pick') assert.equal(q.opts.filter((o) => o[1]).length, 1, `${c.id}/${q.id}: đúng một đáp án`);
      if (q.kind === 'num') {
        assert.ok(q.ans !== undefined && q.tol > 0);
        for (const [v, code] of q.wrong || []) {
          assert.ok(ERRORS[code], `${c.id}/${q.id}: mã lỗi ${code}`);
          assert.ok(Math.abs(v - q.ans) > Math.max(Math.abs(q.ans) * q.tol, 1e-9), `${c.id}/${q.id}: wrong ${v} trùng ans`);
        }
      }
    }
    assert.ok(c.model.c && c.model.r.length === 3 && c.model.n && c.talkPrompt);
    for (const [crit, ids] of Object.entries(c.comps)) { assert.ok(['calc', 'insight', 'rec', 'structure'].includes(crit)); for (const id of ids) assert.ok(compIds.has(id), `${c.id}: năng lực ${id}`); }
  }
});

test('sáu case mới lấp các năng lực trước đây không có case mở: phân khúc, insight, định vị, tâm lý, tài sản, được nhớ tới, nội dung', () => {
  const old = new Set(CASES.filter((c) => !NEW.includes(c.id)).flatMap((c) => Object.values(c.comps).flat()));
  const added = new Set(NEW.flatMap((id) => Object.values(byId(id).comps).flat()));
  // c01, c02, c04, c05, c08 không có case cũ nào (audit 17/10/2026); c06 đã có case cũ nhưng chỉ ở mức chia ngân sách media
  for (const id of ['c01', 'c02', 'c04', 'c05', 'c08']) { assert.ok(!old.has(id), `${id} đã có case cũ`); assert.ok(added.has(id), `${id} chưa có case mới`); }
  assert.ok(added.has('c06'));
  assert.ok(['c01', 'c02', 'c04', 'c06', 'c08'].every((id) => NEW.some((n) => ['insight', 'rec'].some((k) => byId(n).comps[k].includes(id)))), 'phải đạt được qua insight/rec');
  assert.ok(NEW.some((id) => byId(id).level === 'Khó') && NEW.some((id) => byId(id).level === 'Dễ'));
});

test('số liệu tự khớp: tính lại độc lập từng đáp án số', () => {
  const ans = (id, q) => byId(id).qs.find((x) => x.id === q).ans;
  const close = (a, b) => assert.ok(Math.abs(a - b) <= Math.max(Math.abs(b) * 0.001, 1e-6), `${a} ≠ ${b}`);
  // phân khúc
  close(ans('phan-khuc-sua-hat', 'q1'), 8 * 35000 * 0.45 * 5);
  close(ans('phan-khuc-sua-hat', 'q2'), (12 * 30000 * 0.4 * 8) / 200000);
  close(ans('phan-khuc-sua-hat', 'q3'), (600e6 / 200000) * (12 * 30000 * 0.4 * 8 - 200000));
  // hành vi
  close(ans('hanh-vi-rau-huu-co', 'q1'), (18 / 72) * 100);
  close(ans('hanh-vi-rau-huu-co', 'q2'), (0.72 - 0.18) * 5000 * (240000 - 200000));
  close(ans('hanh-vi-rau-huu-co', 'q3'), 5000 * (0.18 * (240000 - 168000) + 0.82 * (200000 - 130000)));
  // định vị
  const imp = [0.3, 0.25, 0.2, 0.15, 0.1], us = [8.5, 5, 7, 9, 7], A = [5, 9, 9, 6, 9], w = (r) => r.reduce((s, x, i) => s + x * imp[i], 0);
  close(ans('dinh-vi-so-ngay', 'q1'), w(us)); close(ans('dinh-vi-so-ngay', 'q2'), w(us) - w(A));
  close(ans('dinh-vi-so-ngay', 'q3'), w([8.5, 7, 7, 9, 7]));
  assert.ok(Math.abs(imp.reduce((s, x) => s + x, 0) - 1) < 1e-9);
  // thông điệp
  close(ans('thong-diep-excel-ke-toan', 'q1'), 10e6 / 30);
  close(ans('thong-diep-excel-ke-toan', 'q2'), ((10e6 / 20 - 10e6 / 30) / (10e6 / 30)) * 100);
  close(ans('thong-diep-excel-ke-toan', 'q3'), (20 / 100000) * 1000);
  // gói giá
  const mean = (sh, pr) => sh.reduce((s, x, i) => s + x * pr[i], 0);
  close(ans('mo-than-goi-gia', 'q1'), 50 * mean([0.7, 0.3], [99000, 249000]));
  close(ans('mo-than-goi-gia', 'q2'), 44 * mean([0.45, 0.05, 0.5], [99000, 229000, 249000]));
  const p1 = 50 * mean([0.7, 0.3], [99000 - 30000, 249000 - 60000]), p2 = 44 * mean([0.45, 0.05, 0.5], [99000 - 30000, 229000 - 55000, 249000 - 60000]);
  assert.ok(Math.abs((p2 / p1 - 1) * 100 - ans('mo-than-goi-gia', 'q3')) <= ans('mo-than-goi-gia', 'q3') * 0.01);
  // được nhớ tới
  const vol = [0.7, 0.55, 0.4, 0.25], ours = [8, 22, 35, 5], a = [55, 40, 30, 30], s = (v) => v.reduce((t, x, i) => t + x * vol[i], 0);
  close(ans('duoc-nho-ca-phe-lon', 'q1'), s(ours)); close(s(a), 80);
  assert.ok(Math.abs((s(ours) / s(a)) * 100 - ans('duoc-nho-ca-phe-lon', 'q2')) <= 0.5);
  close(ans('duoc-nho-ca-phe-lon', 'q3'), s(ours) + 0.55 * 10);
});

test('mỗi thương hiệu giả định ghi rõ là giả định; nhóm trong mỗi tình huống cộng không vượt 100%', () => {
  for (const id of NEW) assert.match(byId(id).brand, /giả định/, `${id}: phải ghi “giả định”`);
  const cep = byId('duoc-nho-ca-phe-lon').asks.find((a) => a.id === 'e2').rows;
  for (const [, v] of cep) { const n = [...v.matchAll(/(\d+)%/g)].reduce((t, m) => t + +m[1], 0); assert.ok(n <= 100, v); }
});

test('chống lộ đáp án: đáp án đúng không luôn dài nhất, không dồn một vị trí (sáu case mới)', () => {
  let longest = 0, n = 0; const pos = {};
  for (const id of NEW) for (const q of byId(id).qs.filter((x) => x.kind === 'pick')) {
    const L = q.opts.map((o) => o[0].length), ti = q.opts.findIndex((o) => o[1]); n++; pos[ti] = (pos[ti] || 0) + 1;
    if (L[ti] === Math.max(...L)) longest++;
  }
  assert.ok(longest / n <= 0.6, `đáp án dài nhất ở ${longest}/${n} câu`);
  assert.ok(Math.max(...Object.values(pos)) / n <= 0.5, JSON.stringify(pos));
});
