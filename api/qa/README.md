# Kiểm thử API tích hợp (cần worker chạy cục bộ)

Không nằm trong `npm test` vì cần `wrangler dev` + `DEV_SHOW_LINK=1`. Chạy trước mỗi lần phát hành:

```bash
cd api
# terminal 1 — D1/KV mô phỏng, link đăng nhập trả thẳng trong phản hồi
echo 'DEV_SHOW_LINK=1' > .dev.vars && npx wrangler d1 migrations apply DB --local && npx wrangler dev --port 8788
# terminal 2
B=http://localhost:8788 node qa/forge.mjs   # tài khoản mới tự khai XP/bài/đề giả: phải bị kẹp (≤ 300 XP, bảng xếp hạng tuần 0)
B=http://localhost:8788 node qa/legit.mjs   # làm bài thật (qua /api/answers + /complete với khoá mã hoá %3A): +10 XP, lặp lại không nhân đôi
B=http://localhost:8788 node qa/exam.mjs    # đề chặng theo lượt: 429 cooldown, attempt của người khác 404, khai exam giả không có XP
B=http://localhost:8788 node qa/leak.mjs    # không API nào trả đáp án trước khi chấm
```

Giới hạn 8 yêu cầu đăng nhập/giờ/IP: xoá KV cục bộ (`rm -rf .wrangler/state/v3/kv`) giữa các lượt chạy.
