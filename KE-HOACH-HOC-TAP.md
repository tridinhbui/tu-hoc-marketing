# Kế hoạch: bài dày · quiz · thi vượt chặng · lớp game

Phụ lục chi tiết cho Phase 4 trong `PLAN.md`. Viết ngày 27.09.2026.

Kế hoạch này **không dựng lại từ đầu**. Thứ đã có và sẽ được dùng tiếp:

| Đã có | Số lượng | Dùng vào việc gì |
|---|---|---|
| `curriculum.js` — chặng → module → bài | 6 chặng · 13 module · 48 slot | Khung của toàn bộ chương trình |
| `lessons.js` | 26 bài ngắn | Nguyên liệu để "dày hoá" |
| `principles.js` | 22 nguyên lý | Nguồn câu hỏi khái niệm |
| `campaigns.js` / `brands.js` | 20 case · 14 brand | Nguồn câu hỏi tình huống |
| `taste.js` | 10 cặp A/B | Thành item loại `judge` gần như nguyên xi |
| `drills.js` + `ERRORS` | 12 bài tính · hệ mã lỗi | Hạt giống của ngân hàng đề và của ôn lỗi |
| 7 bàn làm việc | seg · pos · int · map · cep · assets · audit | Phần "làm thật", không thay bằng quiz |

Thiếu: bài đủ dày, ngân hàng câu hỏi, đề thi chặng, và luật game.

---

## 1. Bài dày — định nghĩa cụ thể

Bài hiện tại là 5–10 phút (`Idea · Real world · Why · Look closer · Try it`). Bài dày là **18–25 phút**, bảy khối, thứ tự cố định:

| # | Khối | Vì sao có mặt |
|---|---|---|
| 1 | **Đoán trước** — một tình huống, buộc chọn/đoán trước khi đọc | Đoán sai rồi mới đọc thì nhớ lâu hơn đọc trước rồi gật đầu |
| 2 | **Ý chính** — một câu, rồi *cơ chế* vì sao nó đúng | Không có cơ chế thì chỉ là khẩu hiệu |
| 3 | **Bằng chứng** — case thật + số thật | Trỏ sang `campaigns.js`, không viết lại |
| 4 | **Khi nào nguyên lý này SAI** | Khối quan trọng nhất và hầu hết khoá học không có. Biết biên của một nguyên lý mới là hiểu nó |
| 5 | **Nhìn gần** — chi tiết marketer thường bỏ qua | Giữ từ bài ngắn |
| 6 | **Kiểm tại chỗ** — 2–3 item, mở đáp án ngay, không tính điểm | Truy hồi chủ động, không phải kiểm tra |
| 7 | **Mang ra đời thật** — một việc làm trong 48h + ô ghi vào sổ tay | Nối bài học với hành vi |

Metadata bắt buộc mỗi bài:

```js
{ day:53, minutes:22, stage:'s1', mod:'s1m1',
  needs:['P:positioning'],        // tiên quyết
  teaches:['P:segmentation'],     // nguyên lý bài này dạy
  errors:['SAI_MAU_SO'],          // mã lỗi bài này chữa
  items:['q.seg.001','q.seg.004'] // item kiểm tại chỗ
}
```

**Luật cắt phạm vi:** một bài chỉ được dày hoá khi có chặng cần tới nó. Không dày hoá cả 26 bài rồi mới làm chặng 01.

---

## 2. Ngân hàng câu hỏi — một lược đồ cho mọi loại

Quiz trong bài, quiz cuối module, đề thi chặng và ôn lỗi **dùng chung một ngân hàng**. Không có ba hệ thống song song.

```js
// assets/js/data/items.js
{ id:'q.cac.003',
  type:'mcq',            // mcq | calc | judge | order | case
  stage:'s5', mod:'s5m2',
  core:true,             // item cốt lõi: sai là trượt dù tổng điểm đủ
  teaches:['P:cac'], errors:['QUEN_CHI_PHI_CO_DINH'],
  difficulty:2,          // 1 nhận biết · 2 vận dụng · 3 phán đoán
  minutes:1.5,
  source:'L:65',         // bài sinh ra nó — để truy ngược khi item hỏng
  stem:'…',
  options:[{k:'a',t:'…'},{k:'b',t:'…'},{k:'c',t:'…'},{k:'d',t:'…'}],
  answer:'c',
  why:{ c:'…', a:'…', b:'…', d:'…' }   // giải thích TỪNG phương án
}
```

Năm loại item và nguồn nguyên liệu:

| Loại | Đo cái gì | Lấy từ đâu |
|---|---|---|
| `mcq` | Khái niệm, phân biệt dễ nhầm | 22 nguyên lý |
| `calc` | Tính CAC/LTV/phễu, đọc số | `drills.js` (đã có 12) |
| `judge` | Gu: A hay B mạnh hơn, vì sao | `taste.js` (đã có 10 cặp) |
| `order` | Sắp đúng thứ tự phễu / các bước ra mắt | Soạn mới |
| `case` | Đọc 150 chữ tình huống → 2–3 câu | 20 case + 14 brand |

**Luật viết item — kiểm trước khi đưa vào bank:**

1. Phương án sai phải là **lỗi có thật**, lấy từ bảng `ERRORS`. Không bịa phương án ngớ ngẩn cho đủ bốn.
2. Không có "tất cả đều đúng" / "không đáp án nào".
3. Mọi phương án đều phải có lời giải thích. **Phần dạy nằm ở đây**, không nằm ở câu hỏi.
4. Đọc stem mà đoán được đáp án nhờ độ dài hoặc văn phong thì loại.
5. Item `calc` phải tính lại được hoàn toàn từ số trong đề.
6. Mỗi item gắn ít nhất một `teaches` và (nếu là lỗi) một mã `errors`.

---

## 3. Quiz — hai chỗ, hai mục đích khác nhau

**Trong bài (khối 6):** 2–3 item, mở đáp án ngay sau mỗi câu, **không tính điểm, không lưu điểm**. Mục đích là truy hồi, không phải đánh giá. Sai ở đây không ghi vào hồ sơ mã lỗi.

**Cuối module:** 6–8 item, đủ **5/8** thì module được đánh dấu xong.
- Sai câu nào → mã lỗi của câu đó vào hàng ôn: **1 · 3 · 7 · 21 ngày**.
- Không hiện phần trăm. Hiện: "xong" hoặc "còn 3 mã lỗi cần ôn".

---

## 4. Thi vượt chặng

### Cấu trúc đề (blueprint cố định theo chặng)

| Loại | Số câu | Ghi chú |
|---|---|---|
| `mcq` | 6 | 2 câu độ khó 3 |
| `calc` | 4 | luôn có 1 câu bẫy mẫu số |
| `judge` | 3 | |
| `case` | 3 | cùng một tình huống, hỏi ba góc |
| **Tổng** | **16** | 25 phút, đồng hồ hiện nhưng không đếm ngược gây hoảng |

### Luật qua

Phải thoả **cả hai**:
- Đúng ≥ **12/16**
- Sai ≤ **1** trong số các item `core:true` (mỗi đề có 5 item core)

Lý do có điều kiện thứ hai: nếu chỉ lấy tổng, người học gỡ điểm ở câu dễ và vẫn không nắm được cái cốt lõi của chặng.

### Thi lại

- Trượt → khoá **24 giờ**.
- Trong 24h đó phải hoàn thành **ôn lỗi** của các mã đã sai thì đề mới mở lại.
- Không giới hạn số lần. Đề lấy ngẫu nhiên từ pool, không lặp lại đề cũ.

### Quy mô pool — đây là chi phí thật

Để thi lại không trùng đề, mỗi chặng cần **≥ 3× kích thước đề**:

```
16 câu/đề × 3 = 48 item/chặng × 6 chặng ≈ 290 item
```

Cộng quiz module (13 module × 8 = 104, dùng chung pool). **Con số cần nhớ: ~300 item.**

### Chống học vẹt đáp án

- Pool đủ lớn (điều kiện trên).
- Item `calc` sinh số ngẫu nhiên trong biên cho trước → cùng một item, mỗi lần một bộ số.
- Xáo thứ tự phương án mỗi lần render.
- Không hiện lại toàn bộ đề sau khi trượt — chỉ hiện **mã lỗi** đã mắc.

---

## 5. Lớp game — luật, và những thứ cố tình không làm

### Có

| Cơ chế | Chi tiết | Vì sao |
|---|---|---|
| **Triện chặng** | Qua chặng → đóng một dấu triện son vào sổ tay, có ngày tháng | Hợp art direction Hoả; một con dấu có sức nặng hơn một huy hiệu hoạt hình |
| **Mở khoá chặng** | Chặng n+1 mở khi qua chặng n | Có cửa thì mới có cảm giác vượt |
| **Hé cửa** | Luôn cho đọc **1 bài** của chặng kế tiếp | Tò mò kéo đi tiếp tốt hơn là khoá kín |
| **Cấp bậc** | Observer → … → Marketing Director gắn với **số chặng đã qua**, không gắn với điểm cộng dồn | Điểm cộng dồn thưởng cho việc bấm nhiều, chặng thưởng cho việc hiểu |
| **Chuỗi ngày** | Đã có. Thêm **1 ngày bảo hiểm/tuần** | Phạt quá tay thì người ta bỏ luôn sau lần đứt đầu tiên |
| **Bản đồ mã lỗi** | Sổ tay hiện các mã lỗi và "sức khoẻ" 0–4 của từng mã | So với chính mình tháng trước |

### Không làm — và lý do

- **Bảng xếp hạng.** Học một mình; so với người lạ làm hỏng động lực nội tại và đẻ ra hành vi cày điểm.
- **Điểm số phần trăm.** Người học sẽ tối ưu con số thay vì tối ưu hiểu.
- **Mạng / tim / trừ điểm khi sai.** Sai là dữ liệu, không phải tội.
- **Hiệu ứng XP bay, confetti.** Brief gốc đã cấm; Hoả càng không hợp.

---

## 6. Ôn lỗi — nối vào thứ đã có

`ERRORS` và trang `on-loi.html` đã tồn tại. Cần thêm lịch:

```js
// state.errors = { QUEN_CHI_PHI_CO_DINH: { health: 2, due: 1790000000000, seen: 5, wrong: 3 } }
```

- Sai một mã → `health = max(0, health-1)`, hẹn ôn sau **1 → 3 → 7 → 21** ngày theo `health`.
- Đúng khi ôn → `health+1`. Đạt 4 → mã coi như đã chữa, rút khỏi hàng.
- Trang ôn lỗi mỗi ngày gom **tối đa 8 item** thuộc các mã đang tới hạn.

---

## 7. Kỹ thuật — file và state

**File mới**

```
assets/js/data/items.js      ngân hàng câu hỏi (~300 item, tách theo chặng nếu quá 150KB)
assets/js/data/exams.js      blueprint 6 đề + luật qua
assets/js/quiz.js            engine: render item, chấm, xáo phương án, sinh số cho calc
thi.html                     phòng thi (?stage=s2)
```

**State bổ sung** (vẫn `localStorage`, khoá `nhinthay.v1`)

```js
{ stages:  { s1:{ passed:1790000000000, attempts:2 } },
  modules: { s1m1:{ done:true, score:6 } },
  errors:  { MA_LOI:{ health, due, seen, wrong } },
  examLock:{ s2: 1790086400000 } }
```

**Quy tắc kỹ thuật**

- Engine không biết nội dung; mọi thứ đọc từ `items.js`. Thêm câu hỏi = sửa data, không sửa code.
- Đề thi dựng **phía client** từ pool — chấp nhận được vì không có bằng cấp, không có gì để gian lận ngoài chính mình. Khi có tài khoản (Phase 1) thì chuyển việc chấm sang Worker.
- Mỗi item có `source` để khi thống kê thấy item hỏng thì truy được về bài đã sinh ra nó.

---

## 8. Khối lượng — con số thật

| Việc | Đơn giá | Tổng |
|---|---|---|
| Dày hoá 48 bài | ~2h/bài | 96h |
| 300 item (có giải thích từng phương án) | ~12 phút/item | 60h |
| 6 blueprint + thử đề + hiệu chỉnh | | 12h |
| Engine quiz + phòng thi + ôn lỗi | | 24h |
| **Tổng** | | **~190h** |

Ở nhịp 10h/tuần → **19 tuần** nếu làm hết. Quá dài để chờ.

**Cắt phạm vi:** phát hành theo chặng. Làm xong chặng 01–02 là mở cửa được.

| Mốc | Nội dung | Giờ | Tuần |
|---|---|---|---|
| **A. Engine** | quiz.js + thi.html + lịch ôn lỗi + state | 24h | 1–3 |
| **B. Chặng 01** | 6 bài dày · 50 item · 1 đề | 32h | 4–6 |
| **C. Chặng 02** | 12 bài dày · 60 item · 1 đề | 50h | 7–11 |
| **D. Hiệu chỉnh** | thống kê item, loại item hỏng, sửa ngưỡng qua | 12h | 12 |
| **E. Chặng 03–04** | 20 bài dày · 100 item · 2 đề | 74h | 13–20 |

Sau mốc B đã có một vòng khép kín: học → quiz → thi → triện → ôn lỗi. Chặng 03 trở đi chỉ là lặp lại quy trình.

---

## 9. Soạn nội dung nhanh mà không ẩu

1. **Đi theo mã lỗi, không đi theo chủ đề.** Mở `ERRORS`, mỗi mã lỗi viết 3–4 item. Đảm bảo mọi item đều dạy một lỗi có thật.
2. **Vắt kiệt thứ đã có trước khi viết mới.** 10 cặp taste → 10 item `judge` gần như nguyên xi. 20 case → mỗi case 2 item `case` = 40 item. 22 nguyên lý → mỗi cái 3 item = 66. Cộng lại đã **116 item** từ nguyên liệu có sẵn.
3. **Soạn theo lô cùng loại**, không nhảy qua lại: một buổi chỉ viết `calc`, buổi khác chỉ viết `case`.
4. **Chạy checklist 6 điểm ở mục 2** trước khi commit. Item không có giải thích từng phương án thì chưa được tính là xong.

---

## 10. Biết nó có chạy không

| Chỉ số | Ngưỡng lành mạnh | Nếu lệch |
|---|---|---|
| Tỉ lệ qua chặng **lần đầu** | 55–70% | >70% đề dễ quá · <55% quá khó hoặc bài chưa dạy đủ |
| `p` của từng item (tỉ lệ đúng) | 0.35–0.85 | >0.95 bỏ · <0.25 xem lại đề, thường là stem tối nghĩa |
| Độ phân biệt | nhóm qua đúng nhiều hơn nhóm trượt rõ rệt | Nếu ngược: item sai đáp án hoặc đánh lừa |
| Thời gian làm đề | 15–25 phút | >30 phút: đề dài hoặc tính toán rườm |
| Tỉ lệ quay lại ôn lỗi sau 3 ngày | >40% | Dưới: lịch nhắc chưa đủ hoặc ôn lỗi chán |

Chỉ số quan trọng nhất không nằm trong bảng: **người học có làm được việc thật ở bàn làm việc sau khi qua chặng không.** Quiz chỉ là đường dẫn tới đó.

---

## 11. Tình trạng thực tế (cập nhật 27.09.2026)

Kế hoạch trên viết trước khi đọc kỹ repo. Sau khi kiểm kê, **ba trong bốn phần đã tồn tại**:

| Phần | Trạng thái thật |
|---|---|
| Bài dày | `bai.html` đã có 10 khối: Tình huống · Ý chính · Vì sao · **Phản ví dụ** · Chỗ hay sai · Bài tập áp dụng · Lời giải · Nói 60 giây |
| Quiz | `quiz.html` — quiz phản xạ 60 giây, 3 lượt/ngày, bank sinh tự động từ bài đã học |
| Game | `app.js` — 30 cấp, XP, streak kèm thẻ đóng băng, mã lỗi ôn 1·3·7 |
| Thi vượt chặng | **Đã dựng ở Mốc A–B** (mục dưới) |

### Đã hoàn thành

**Mốc A — engine**
- `assets/js/exam.js` — dựng đề theo blueprint, xáo câu và xáo phương án, chấm, khoá 24h, đóng triện. Không chứa nội dung.
- `assets/js/data/exams.js` — blueprint từng chặng.
- `thi.html` — phòng thi, một câu mỗi màn, không quay lại.
- `stageOpen()` trong `app.js`: cổng chặng là **đề thi**, không còn là tỉ lệ bài đã đọc. Chặng chưa có đề vẫn dùng luật 60% cũ.

**Mốc B — nội dung**
- Chặng 01: **37** · 02: **39** · 03: **38** · 04: **41** · 05: **43** · tổng **198 item**,
  mọi item có giải thích từng phương án (calc có lời giải từng bước và bẫy gắn mã lỗi).
- Cả năm chặng đều đạt pool ≥ 3× kích thước đề. Chặng 05 dùng tỉ lệ riêng (4 bài tính thay vì 2, 25 phút).
- **Cả 21 mã lỗi** trong `ERRORS` đều có ít nhất một câu thi kiểm.
- Stress test 10.000 đề dựng tự động: đề nào cũng đúng 12 câu, đúng 4 câu cốt lõi, không lặp item.
- Kiểm tự động khi soạn: đáp án khớp bước cuối lời giải · mã lỗi tồn tại · bẫy không trùng đáp án.

**Mốc C — chặng cuối vượt bằng case**
- Chặng 06 không có đề trắc nghiệm. Cổng đọc thẳng kết quả `giai-case.html` (`s.cases`), không dựng hệ chấm thứ hai.
- Vượt khi thoả cả ba: đạt ≥3/5 case **trong giờ** · ≥2 case đạt đủ 4/4 (kể cả phần nói 60 giây) · ≥1 case độ Khó.
- Ngày đóng triện = ngày điều kiện cuối cùng được thoả, không phải ngày mở trang.
- Case làm trước khi chặng mở vẫn được tính, nhưng triện chỉ đóng khi đã qua đề chặng 05.

**Mốc D — luyện tập và ôn lỗi khái niệm**
- `luyen.html?mod=…` — luyện cuối module: 8 câu, hiện giải thích **cả 4 phương án** ngay sau mỗi câu,
  không khoá, làm lại tuỳ ý. Đây là nơi duy nhất học viên đọc được lời giải thích — đề thi cố ý giấu.
- Luyện chỉ rút **câu thường**. Câu cốt lõi để dành cho đề thi, nên điều kiện "sai ≤1 câu cốt lõi"
  đo hiểu biết trên câu chưa từng gặp chứ không đo trí nhớ đáp án.
- Mọi module đủ 8 câu luyện (bổ sung 17 câu thường).
- Sai câu khái niệm giờ cũng vào hàng ôn: 22 mã `KN_<nguyên lý>`, đi chung lịch 1·3·7 với mã số.
- Bản đồ hiện "Luyện cuối module →" cho từng module của chặng đã mở.

**Lối vào** — `ban-do.html` hiện nút thi ở cuối mỗi chặng đã mở, và nhãn khoá nói đúng luật đang chạy
("mở khi qua đề chặng NN" thay vì "60% chặng trước"). Trước mốc này không trang nào link tới `thi.html`.

### Khác với kế hoạch ban đầu

- Đề **12 câu** thay vì 16 → pool cần 36/chặng, không phải 48. Con số "~300 item cho 6 chặng" giảm còn **~220**.
- Quiz cuối module chưa làm — quiz phản xạ sẵn có đang gánh phần này.
- Ôn lỗi giữ lịch **1·3·7** của `app.js`, chưa mở rộng thành 1·3·7·21 với thang sức khoẻ 0–4.

### Còn lại

| Việc | Ước lượng |
|---|---|
| Lịch ôn mở rộng 1·3·7·21 (hiện vẫn 1·3·7 của `app.js`) | ~3h |
| Thống kê item (p-value, độ phân biệt) để loại item hỏng | ~10h |
