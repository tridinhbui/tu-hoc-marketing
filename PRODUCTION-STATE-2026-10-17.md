# Trạng thái production ổn định — 2026-10-17

## Đang chạy
- Worker `tu-hoc-marketing`, phiên bản **`5adc44af-33f6-478c-bece-e05a1e4c77cd`** (tạo 2026-10-17 20:29 UTC), 100% lưu lượng.
- Build từ nhánh `deploy/2026-10-12` ở commit merge **`b3045a3`** (cha: `bafbb8b` và `ad6e68d`). Nhánh deploy **chưa push** lên origin.
- `origin/main` = **`ad6e68d`** (đã push). `ad6e68d` nằm trong bản đang chạy. Phần chỉ có trong deploy: commit merge `b3045a3` và các file sinh ra khi build (`api/src/generated/bank.json`, `case/*.html` sau khi thay `SITE_URL`) — các file sinh ra này chưa commit trong worktree `tuhocmarketing-deploy`.

## Kiểm tra gần nhất
| Mục | Kết quả |
|---|---|
| `GET /api/health` | `{"ok":true}` |
| `GET /api/stats` | `{"learners":30,"joined_7d":30,"lessons_done":1}` (khớp D1: 30 / 1) |
| `/dang-nhap.html` | 200, hiển thị "30 người đã đăng ký" và "1 lượt hoàn thành bài" |
| `wrangler deployments list` | chỉ còn `5adc44af` ở 100% (chưa có rollback nào) |

## Phiên bản trước (đích rollback)
- `a08e5a33-1674-4704-9c9c-da79f2b97aa6` (tạo 2026-10-12 13:50 UTC) — bản trước khi có thống kê mới, nội dung mở rộng 293 bài và các commit sau `ad6e68d`.

## Quy trình rollback (chỉ dùng khi có sự cố thật)
1. Xác nhận sự cố: `curl https://tuhocmarketing.org/api/health`, `/api/stats`, mở `/dang-nhap.html`. Ghi lại triệu chứng và thời điểm.
2. Rollback (một lệnh, vài giây, không đụng D1 vì không có migration):
   ```bash
   cd api && npx wrangler rollback a08e5a33-1674-4704-9c9c-da79f2b97aa6 --message "rollback: <lý do>"
   ```
3. Kiểm tra lại `/api/health`, `/api/stats` (bản cũ chỉ trả `learners`, `joined_7d`; giao diện cũ vẫn dùng được), `/dang-nhap.html`.
4. Sửa lỗi trên nhánh riêng, test (`cd api && npm test`; `node --test tests/*.test.mjs`), rồi deploy lại bằng quy trình: merge main vào `deploy/*` → `node api/tools/build-bank.mjs` → `SITE_URL=https://tuhocmarketing.org node tools_build.mjs` → `cd api && npx wrangler deploy`.
5. Lệnh `wrangler rollback` hỏi ghi chú rồi chờ Enter; nếu gõ nhầm, nhấn **Ctrl+C** trước khi Enter thì không có gì thay đổi.
