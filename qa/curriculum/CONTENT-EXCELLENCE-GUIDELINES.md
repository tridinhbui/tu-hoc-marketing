# Chuẩn nội dung xuất sắc — tuhocmarketing.org (Chuẩn bài v2, 11/2026)

Tài liệu này là chuẩn biên tập cho mọi bài học, câu hỏi và case. Thang chấm: `qa/curriculum/RUBRIC-100.md`. Quy trình chấm: `qa/curriculum/AUDIT-PROTOCOL.md`. Kiểm máy: `node tools_validate_bai.mjs` (bài khai `std: 2` chịu luật v2).

## 1. Một bài dạy một quyết định, và người học phải chứng minh được là đã học

Giữ nguyên năm nguyên tắc của `KE-HOACH-700-BAI.md` (một quyết định/bài · mở bằng tình huống Việt Nam có số · 7 câu không đoán được bằng mẹo · ≤ 7 phút · không bịa cho đủ số). Thêm ba yêu cầu:

1. **Mục tiêu đo được** (`goals`, 2–4 dòng, mở đầu bằng động từ: *tính được, chẩn đoán được, so sánh được, thiết kế được*). Người học đọc mục tiêu trước và tự kiểm sau. Không viết "hiểu về…".
2. **Khái niệm có biên**: phần `counter` nói **khi nào khái niệm sai** (điều kiện biên, dấu hiệu nhận ra), phần `deeper` nói **đánh đổi, phương án thay thế bị loại và vì sao, khái niệm kề cận**. Hai phần này là bắt buộc ở chuẩn v2 (419/789 bài hiện chưa có).
3. **Ít nhất một câu hỏi mức L4+** (đọc dữ liệu → chẩn đoán, hoặc chọn giữa hai phương án đúng một phần và biện hộ theo ràng buộc). Tối đa 3/7 câu ở mức nhớ/hiểu.

## 2. Lược đồ bài chuẩn v2 (mở rộng tương thích ngược)

Trường cũ giữ nguyên nghĩa (`assets/js/data/bai/README.md`). Trường mới, mọi trường đều **tuỳ chọn với bài cũ, bắt buộc khi `std: 2`**:

```js
{ id, t, skill, read,
  std: 2,                              // bài đã nâng theo chuẩn này
  goals: ['Tính được CAC trên khách mới…', 'Chẩn đoán được…'],
  prereq: ['B:dl01-01'],               // nên học trước (tuỳ chọn)
  fresh: 'evergreen' | 'periodic' | 'fast',
  checked: '2026-11-07',               // ngày người biên tập kiểm lần cuối
  assume: true,                        // số trong tình huống/ví dụ là minh hoạ tự khớp
  src: [{ t:'Tên nguồn', u:'https://…', d:'2026-11-07', st:'doc'|'tim'|'chua' }],  // bắt buộc khi fresh ≠ evergreen
  situation, concept:{name, body}, example, points[], counter, deeper, takeaway, apply, mistakes[], rel[], how[], fig,
  q:[ 7 câu ] }
```

Trang `bai.html` hiện: "Sau bài này bạn làm được" (goals + prereq), nhãn độ tươi kèm ngày kiểm, nhãn "Số liệu giả định", mục "Nguồn chính thức". Không cần sửa giao diện khi thêm bài v2.

## 3. Ba loại kiến thức và chu kỳ rà soát

| Loại | Ví dụ | `fresh` | Yêu cầu | Rà soát |
|---|---|---|---|---|
| Nền | CAC, biên đóng góp, STP, phễu, hành vi, định vị | `evergreen` | Không cần nguồn cho khái niệm; số ví dụ gắn `assume` | 24 tháng |
| Định kỳ | Benchmark, nghiên cứu học thuật, công cụ đo, luật VN | `periodic` | `src` có ngày; không nêu benchmark như hằng số; luật chỉ nêu tên văn bản, không nêu mức phạt | 6–12 tháng |
| Nhanh | Giao diện/tính năng Meta, Google, TikTok, Shopee, Zalo; thuật toán đề xuất; AI | `fast` | `src` trang chính thức + ngày; câu "nếu màn hình khác, tin trang chính thức"; không mô tả nút bấm quá chi tiết | 3 tháng |

Module hiện thuộc loại nhanh nhưng **chưa có nguồn**: kn06, kn11, kn13, kn14, kn15, kn16, dl07 (GA4). Đây là ưu tiên gắn `src` hoặc hạ xuống mức nguyên lý.

## 4. Chính sách nguồn và bằng chứng

- Mọi con số đi kèm tên thương hiệu thật phải có một trong ba nhãn: **đã xác minh** (nguồn bấm được, ngày kiểm, ai đo) · **dựng từ dữ kiện công khai** (nói rõ phần nào là dựng) · **minh hoạ** (`assume: true`). Không có nhãn thì bỏ số hoặc bỏ tên.
- Không bịa trích dẫn, nghiên cứu, benchmark, kết quả chiến dịch. Khung học thuật (Ehrenberg-Bass, Binet–Field, Kahneman, Christensen…) được nêu tên, nhưng con số từ nghiên cứu chỉ nêu khi có nguồn.
- Hiệu ứng tâm lý không viết như luật phổ quát: nêu điều kiện, nêu "đã có nghiên cứu không tái lập" khi đúng là vậy, nêu dấu hiệu để tự kiểm trong dữ liệu của mình.
- Nền tảng quảng cáo: không khẳng định thuật toán "ưu tiên" gì nếu không có tài liệu chính thức; dùng "theo tài liệu Meta ngày…". Mọi mô tả giao diện mang nhãn "sơ đồ minh hoạ, không phải ảnh chụp".
- Luật Việt Nam: nêu tên và số hiệu văn bản, hiệu lực; **không** diễn giải điều khoản hay mức phạt khi chưa có pháp chế đọc toàn văn; kết bằng "dừng lại hỏi pháp chế khi…".

## 5. Quy tắc định lượng

1. Mọi phép tính trong bài có đủ **giả định · công thức · đơn vị · bước**; cùng một số phải nhất quán giữa tình huống, ví dụ và câu hỏi.
2. Câu `calc`: tính lại được hoàn toàn từ đề; `tol` hợp lý với đơn vị; mỗi đáp án sai định danh gắn mã lỗi trong `ERRORS` (drills.js) và thật sự là lỗi đó. Thêm mã lỗi mới vào `ERRORS` khi gặp hiểu lầm chưa có mã.
3. Công thức chuẩn phải đúng: CAC = chi thu hút ÷ **khách mới**; LTV trên **lãi gộp**; ROAS hoà vốn = 1 ÷ biên đóng góp; sản lượng cần thêm khi giảm giá d với biên m = d ÷ (m − d); giữ chân luỹ thừa, không trừ tuyến tính; ROI (%) ≠ ROAS (lần); MER = tổng doanh thu ÷ tổng chi quảng cáo.
4. Số có nhiễu phải nói độ chắc: mẫu nhỏ, chênh lệch trong sai số, mùa vụ, tương quan ≠ nhân quả.
5. Kiểm máy: `node tools_validate_bai.mjs <mod>`; `node --test tests/*.test.mjs`; người chấm tính lại bằng `node -e`.

## 6. Chuẩn câu hỏi (7 câu/bài)

| # | Vai trò | Mức | Yêu cầu |
|---|---|---|---|
| 1 | Đoán trước | L2–L3 | Không chấm; buộc người học cam kết một dự đoán |
| 2 | Quyết định giữa bài | L4 | "Bạn làm gì?" — phương án sai là quyết định thật người ta hay làm |
| 3–7 | Quiz | ≥1 calc nếu bài có số; ≥1 tình huống mới; ≥1 L4 chẩn đoán từ dữ liệu; ≤3 câu L1–L2 | Lời giải phương án sai nêu đúng hiểu lầm; 4 phương án cùng kiểu mở đầu, dài tương đương; không "tất cả/không đáp án nào" |

Câu **L5** trong bài: hai phương án đều đúng một phần, ràng buộc trong đề (tiền, thời gian, dữ liệu có) quyết định phương án tốt hơn; lời giải nói rõ ràng buộc nào đổi thì đáp án đổi. Câu **L6** (thiết kế) nằm ở `BAI_TASKS` (bài thực hành có đầu ra, chấm rubric 5–7 tiêu chí quan sát được) — mục tiêu mỗi module có ≥1.

## 7. Khuôn case ứng dụng (case bấm giờ, ads case, task lớn)

Mười phần bắt buộc: bối cảnh kinh doanh · mục tiêu quyết định · dữ liệu (có bảng, có nhiễu, có dữ liệu làm mất giờ) · ràng buộc rõ · ≥2 giả thuyết đều có lý · việc phân tích · phép tính · đề xuất kèm lập luận · phương án thay thế và đánh đổi · kế hoạch triển khai và đo. Đáp án **không được** lộ từ brief. Nhãn: thương hiệu giả định, số minh hoạ tự khớp — hoặc case thật theo khung `campaigns-deep.js` (ba nhãn bằng chứng, nguồn, ai đo, điều chưa biết).

## 8. Quy tắc sửa bài (toàn vẹn)

Giữ `id`, thứ tự, `skill`, `read`, đúng 7 câu, 4 phương án a–d, lược đồ calc. Không xoá/gộp/đổi tên bài (người học đang có tiến độ). Không đổi đáp án đúng trừ khi đã chứng minh đáp án cũ sai và ghi vào `qa/curriculum/UPGRADE-TRACKER.md`. Sau khi sửa: tăng `BAI_V` trong `bai-index.js`, chạy validator + test, ghi tracker. Không commit/deploy khi chưa được duyệt.

## 9. Lộ trình năng lực

Foundation (ob, kh) → Practitioner (gt, tp, kn) → Analyst (tn, dl) → Strategist (tu, in, capstone) → Specialist (qc, module chuyên sâu tương lai). Mỗi bài v2 khai `prereq` khi cần một bài khác để làm được phép tính/chẩn đoán trong bài; `rel` dẫn sang bài sâu hơn. Mục tiêu dài hạn: cổng chặng theo bằng chứng năng lực (bài tính, case, task), không chỉ theo % bài đã đọc.
