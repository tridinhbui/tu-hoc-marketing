/* Dữ liệu thử cục bộ có kiểm soát: 8 người học với XP/chuỗi ngày khác nhau + người dùng QA (qa@example.com).
   Chạy SAU khi QA đã đăng nhập một lần (để dòng users của họ tồn tại):
   Dùng:  node tools/seed-dev.mjs > /tmp/seed.sql && npx wrangler d1 execute tuhocmarketing --local --file /tmp/seed.sql
   Chỉ dành cho máy dev — không bao giờ chạy với --remote. */
const VN = 7 * 3600e3, day = (n) => new Date(Date.now() + VN - n * 86400e3).toISOString().slice(0, 10);
const weekStart = (() => { const v = new Date(Date.now() + VN); const x = new Date(Date.UTC(v.getUTCFullYear(), v.getUTCMonth(), v.getUTCDate())); x.setUTCDate(x.getUTCDate() - ((x.getUTCDay() + 6) % 7)); return x.toISOString().slice(0, 10); })();
const T = Date.now();
const people = [
  ['qa@example.com', 'Quỳnh Anh', 11, 40], ['mai@example.com', 'Mai Phương', 14, 60], ['linh@example.com', 'Khánh Linh', 9, 55], ['hung@example.com', 'Đức Hùng', 5, 80],
  ['thao@example.com', 'Thanh Thảo', 3, 45], ['nam@example.com', 'Hoàng Nam', 1, 30], ['vy@example.com', 'Tường Vy', 0, 0],
  ['a-very-long-display-name-to-test-ellipsis@example.com', 'Nguyễn Thị Phương Anh Thư Trúc Quỳnh Mai', 6, 50], ['an@example.com', 'Bảo An', 2, 70],
];
const out = [];
people.forEach(([email, name, streak, xpPerDay], i) => {
  const id = i === 0 ? `(SELECT id FROM users WHERE email='${email}')` : `'qa-user-${i}'`;
  if (i) out.push(`INSERT OR IGNORE INTO users (id,email,created_at,display_name) VALUES ('qa-user-${i}','${email}',${T},'${name.replace(/'/g, "''")}');`);
  else out.push(`UPDATE users SET display_name='${name}' WHERE email='${email}';`);
  let weekTotal = 0;
  for (let d = 0; d < streak; d++) {
    const dl = day(d), amt = xpPerDay + (d % 3) * 10;
    out.push(`INSERT OR IGNORE INTO xp_events (user_id,source,source_ref,amount,day_local,created_at) VALUES (${id},'lesson','seed:${dl}',${amt},'${dl}',${T});`);
    if (dl >= weekStart) weekTotal += amt;
  }
  if (streak) out.push(`INSERT OR REPLACE INTO weekly (user_id,week,xp,streak,cases,updated_at) VALUES (${id},'${weekStart}',${weekTotal},${streak},${i % 4},${T});`);
});
console.log(out.join('\n'));
