# Báo cáo kiểm định tự động — đợt nâng cấp 11/2026

## 1. Bộ kiểm có sẵn (không hạ chuẩn nào)

| Lệnh | Trước đợt | Sau đợt |
|---|---|---|
| `node tools_validate_bai.mjs` | 789 bài · 5.523 câu · 0 lỗi · 0 cảnh báo | 789 bài · 5.523 câu · 0 lỗi · 0 cảnh báo · **12 bài theo chuẩn v2** |
| `node --test tests/*.test.mjs` | 192/192 | 192/192 |
| `cd api && npm test` | 49/49 | 49/49 (sau khi dựng lại `bank.json`) |
| `node api/tools/build-bank.mjs` | — | dựng lại để đáp án máy chủ khớp nội dung mới |

`tests/baselines.json` (ngưỡng ratchet) không đổi.

## 2. Kiểm định thêm trong đợt này

| Cơ chế | File | Kiểm gì |
|---|---|---|
| Chuẩn bài v2 (opt-in bằng `std: 2`) | `tools_validate_bai.mjs` → `checkStd2` | 2–4 `goals` mở đầu bằng động từ đo được; `fresh` ∈ evergreen/periodic/fast; `checked` YYYY-MM-DD; `fresh ≠ evergreen` ⇒ bắt buộc `src` {t,u,d,st}; ví dụ có số ⇒ `assume:true` hoặc `src`; `prereq` trỏ bài có thật; ≥ 1 câu L4+ theo heuristic; cảnh báo khi > 3 câu L1–L2; bắt buộc `counter` và `deeper` |
| Heuristic Bloom dùng chung | `qa/curriculum/bloom.mjs` | Dấu hiệu mức tư duy từ thân câu; dùng cho inventory, validator và báo cáo (không thay chấm tay) |
| Kho dữ liệu chương trình | `qa/curriculum/build-inventory.mjs` → `inventory.json` | 837 bài, 90 module, trường có/thiếu, số từ, số câu tính, nhãn minh hoạ, tham chiếu bài cũ, điểm audit cũ |
| Gộp điểm độc lập | `qa/curriculum/aggregate-scores.mjs` → `baseline.json` | Kiểm lược đồ file điểm, tổng = tổng 8 chiều, trần từng chiều, id có thật; thống kê theo bước/module/chiều/Bloom/độ tươi |
| Thay một bài an toàn | `qa/curriculum/replace-lesson.mjs` | Thay đúng một object bài bằng quét ngoặc có nhận biết chuỗi; nạp lại kiểm số bài, id, skill, read không đổi; lỗi thì không ghi |
| Gắn nhãn minh hoạ | `qa/curriculum/label-assume.mjs` | Thêm `assume:true` cho bài B: chưa có (trừ in02/in03) |
| In bài để chấm | `qa/curriculum/dump-module.mjs` | Văn bản thuần một module/bài/48 bài cũ kèm đáp án, lời giải, task |

## 3. Kiểm định của người chấm độc lập (33 lượt, 91 file điểm)

- Mọi câu tính trong 789 bài: **1.018/1.018** tính lại bằng `node -e` đúng trong `tol`.
- 38 câu calc đề chặng + 12 bài tính số: tính lại đúng.
- 37 bài thực hành và 3 ads case: số trong bài làm mẫu và dashboard tính lại đúng.
- Lỗi tìm thấy nằm ở: nhãn mã lỗi của giá trị sai lệch với lỗi thật (nhiều câu), nhất quán số giữa tình huống ↔ ví dụ ↔ câu hỏi, và khái niệm (không phải số học).

## 4. Kiểm giao diện

`bai.html?id=B:ob01-02` chạy trên máy chủ tĩnh cục bộ (`python3 -m http.server 4321`): phần "Sau bài này bạn làm được" (3 mục tiêu + "Nên học trước"), nhãn "Kiến thức nền · kiểm 2026-11-07", nhãn "Số liệu giả định" ở Ví dụ, và câu tính mới hiện đúng. Lỗi console duy nhất: `/api/me` 404 và `/api/track` 501 vì không có máy chủ API cục bộ (không liên quan nội dung).

## 5. Rủi ro còn lại

- Heuristic Bloom chỉ nhìn thân câu; 12 bài v2 được người chấm độc lập gán Bloom tay (xem BEFORE-AFTER.md).
- `src` với `st:'chua'` là con trỏ chưa mở trang; người biên tập phải mở và đổi thành `doc` trước khi phát hành.
- Nhãn `assume:true` hàng loạt dựa trên tuyên bố của chính dữ liệu ("mọi số là minh hoạ"); bài nào có số thật được xác minh sau này cần bỏ nhãn và thêm `src`.
- Hai sửa P0 (B:kn01-01 Q1, B:qc06-06 Q1) và sửa case `khoa-hoc-online-cac/q3` đổi lời văn/đề, không đổi khoá đáp án; cơ chế phân bổ trong một tài khoản Google Ads được sửa theo tài liệu mô hình phân bổ, nên được người có tài khoản thật đối chiếu.
