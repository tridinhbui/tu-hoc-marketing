# Đợt sửa P1 (P1 sweep) — quy tắc cho người/agent sửa

Mục tiêu: xử lý **từng lỗi P0/P1 đã được người chấm độc lập xác nhận** trong `qa/curriculum/p1-worklist/<mod>.json`, bằng sửa nhỏ nhất đủ để lỗi biến mất. Đây KHÔNG phải đợt viết lại bài; không thêm trường chuẩn v2, không đổi cấu trúc, không "làm sâu" ngoài phạm vi lỗi.

## Được làm
- Sửa số cho nhất quán giữa tình huống ↔ ví dụ ↔ câu hỏi ↔ `steps` (chọn cách sửa ít lan nhất; nếu phải đổi `ans` của calc thì đổi cả `steps`, `wrong` và mọi chỗ nhắc con số đó).
- Thêm điều kiện/giả định còn thiếu bằng một câu; đổi "luôn/chắc chắn" thành câu có điều kiện; đổi kết luận nhân quả từ so trước–sau thành "tín hiệu, cần đối chứng".
- Khẳng định nền tảng/nghiên cứu/luật không nguồn: **hedge** ("theo tài liệu X tại ngày kiểm", "theo hiểu biết chung, cần kiểm") và/hoặc thêm `src:[{t,u,d:'2026-11-07',st:'chua'}]` với URL trang chính thức/tra cứu mà bạn chắc là đúng domain; nếu không chắc URL, chỉ hedge và ghi `needs-human`. Không bịa nguồn, không bịa số.
- Nhiễu làm lộ đáp án (dài nhất, duy nhất có số, từ tuyệt đối): viết lại NHIỄU cho cụ thể và dài tương đương; không cắt đáp án đúng.
- Hai phương án cùng bênh được: thêm dữ kiện vào đề để loại một phương án, hoặc sửa phương án sai thành sai rõ. Giữ khoá đáp án trừ khi đáp án cũ sai thật — khi đó đổi và ghi rõ trong log.
- Nhãn mã lỗi của giá trị sai lệch lỗi thật: đổi sang mã đúng trong `ERRORS` (drills.js) — có sẵn thêm NHAM_DON_VI, THIEU_TU_SO, TINH_CA_DON_TU_NHIEN, SO_KHAC_CUA_SO, QUEN_DOI_CHUNG. Không thêm mã mới.
- Lời giải mâu thuẫn phần đọc: sửa bên sai (thường là lời giải), giữ khoá.

## Không được làm
- Không đổi `id`, thứ tự, `skill`, `read`, số câu (7), số phương án (4), loại câu.
- Không sửa 12 bài thí điểm (không có trong worklist). Không sửa file ngoài `assets/js/data/bai/<mod>.js`.
- Không xoá nội dung, không gộp bài, không thêm bài.
- Không chấp nhận một lỗi chỉ vì người chấm nói vậy: tự kiểm lại; nếu người chấm sai, ghi `rejected` kèm lý do ngắn.
- Không "sửa" điều cần người thật (luật, số nền tảng chưa chắc): ghi `needs-human` với câu hỏi cụ thể.

## Cách làm
1. `cat qa/curriculum/p1-worklist/<mod>.json`; `node qa/curriculum/dump-module.mjs <mod>` để đọc bài.
2. Sửa trực tiếp trong `assets/js/data/bai/<mod>.js` (giữ định dạng file). Giữ chuỗi trong dấu nháy đơn; dùng “ ” cho trích dẫn trong câu.
3. `node tools_validate_bai.mjs <mod>` → phải **0 lỗi**; nếu validator báo lộ đáp án bằng độ dài/vị trí do bạn gây ra, sửa nhiễu, không sửa đáp án.
4. `node --test tests/content-integrity.test.mjs tests/quiz-quality.test.mjs` → pass.
5. Ghi `qa/curriculum/p1-log/<mod>.json`:
```json
{ "mod":"ob01", "fixed_at":"2026-11-07", "items":[
  { "id":"B:ob01-05", "where":"Q3", "status":"fixed|rejected|needs-human", "change":"một câu mô tả sửa gì (số cũ → số mới)", "key_changed":false, "note":"" } ],
  "validator":"0 lỗi", "tests":"pass" }
```
Mỗi lỗi trong worklist phải có một dòng trong log.
