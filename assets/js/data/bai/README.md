# Bài học mới (mã `B:`)

Mỗi module một file `<mã>.js`, gọi `BAI_ADD({ mod, lessons:[...] })`. Kế hoạch: `KE-HOACH-700-BAI.md`.

## Thêm một module

1. Viết `assets/js/data/bai/<mã>.js` theo lược đồ dưới.
2. Thêm module vào `BAI_MODS` và 10 dòng vào `BAI_INDEX` trong `assets/js/data/bai-index.js`.
3. `node tools_validate_bai.mjs <mã>` → phải **0 lỗi, 0 cảnh báo**.
4. Người duyệt đọc lại; tăng `BAI_V` khi sửa nội dung đã xuất bản.

## Lược đồ một bài

```js
{ id:'B:ob02-01', t:'Tiêu đề là một câu hỏi/tình huống',
  situation:'Tình huống thật, có số (40–120 chữ)',
  concept:{ name:'Tên khung', body:'Giải thích bằng lời thường (50–170 chữ)' },
  example:'Chạy khái niệm qua đúng tình huống, có số (50–170 chữ)',
  takeaway:'Một câu mang theo (≤ 28 chữ)',
  apply:'Nhiệm vụ nói/viết 60 giây',
  mistakes:['Lỗi hay gặp 1', 'Lỗi hay gặp 2'],
  q:[ /* đúng 7 câu: #1 đoán trước · #2 quyết định ("bạn làm gì") · #3–#7 quiz */ ] }
```

Câu trắc nghiệm: `{ type:'mcq', stem, options:[{k,t}×4], answer, why:{a,b,c,d} }`.
Câu tính: `{ type:'calc', stem, unit, ans, tol, steps:[...], wrong:[[giá_trị,'MÃ_LỖI']], errors:['MÃ_LỖI'] }` — mã lỗi lấy từ `ERRORS` trong `drills.js`.
`id`, `source`, `stage`, `mod`, `teaches` được `BAI_ADD` tự gán.
