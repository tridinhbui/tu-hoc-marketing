# Quy trình chấm một module (dành cho người/agent chấm độc lập)

1. Đọc `qa/curriculum/RUBRIC-100.md`. Không sửa bất kỳ file nội dung nào — đây là bước chấm, không phải bước sửa.
2. In nội dung: `node qa/curriculum/dump-module.mjs <mã module>` (hoặc `legacy` cho bài L:/P:). Đọc trọn từng bài, kể cả 7 câu hỏi và lời giải.
3. Với **mỗi câu tính (calc)**: tính lại bằng tay hoặc bằng `node -e` từ số trong đề; đối chiếu `ans`, `tol`, các bước; kiểm các đáp án sai định danh có đúng là lỗi được nêu không. Ghi `calc_check`.
4. Với **mỗi câu trắc nghiệm**: tự giải trước khi nhìn đáp án; ghi P0 nếu có ≥2 phương án bênh được, hoặc đáp án sai. Ghi P1 nếu đáp án đoán được bằng hình thức.
5. Đối chiếu số giữa tình huống ↔ ví dụ ↔ câu hỏi: cùng một con số phải nhất quán.
6. Liệt kê mọi khẳng định có tên thương hiệu thật, luật, nền tảng, benchmark, nghiên cứu → gắn nhãn bằng chứng. Không tra web ở bước này (ghi `unverified`), trừ khi bài đã có `src`.
7. Chấm 8 chiều, ghi tổng, Bloom từng câu, độ tươi, 1–2 điểm mạnh, và một kế hoạch nâng cấp cụ thể (việc cần làm để đạt ≥ 85).
8. Ghi nhận xét cấp module: tiến trình bài này → bài sau có hợp lý không, bài nào trùng ý, chủ đề cốt lõi còn thiếu trong module.
9. Ghi file `qa/curriculum/scores/<mã module>.json` đúng lược đồ dưới. Chạy `node -e "JSON.parse(require('fs').readFileSync('qa/curriculum/scores/<mã>.json','utf8'))"` để chắc file hợp lệ.

## Lược đồ file điểm

```json
{
  "mod": "dl02", "scored_at": "2026-11-07", "scorer": "independent-agent", "rubric": "RUBRIC-100 v1",
  "lessons": [
    { "id": "B:dl02-02",
      "scores": { "accuracy": 12, "depth": 10, "practical": 15, "examples": 10, "pedagogy": 8, "assessment": 7, "data": 8, "clarity": 4 },
      "total": 74,
      "bloom_items": ["L2","L4","L3","L3","L4","L4","L2"], "bloom_max": "L4",
      "freshness": "evergreen",
      "defects": [ { "sev": "P1", "where": "Q5", "quote": "…", "issue": "…", "fix": "…" } ],
      "calc_check": { "n": 1, "ok": 1, "notes": "Q3: 60.000.000/300 = 200.000 ✓" },
      "claims": [ { "claim": "…", "status": "illustrative-labelled", "note": "" } ],
      "strengths": "…",
      "upgrade": "…" }
  ],
  "module_notes": { "progression": "…", "overlap": ["…"], "gaps": ["…"], "best_lesson": "B:dl02-06", "weakest_lesson": "B:dl02-02" }
}
```

Quy ước: `total` = tổng 8 chiều. `defects` rỗng nếu không có. Mọi `quote` phải là trích dẫn nguyên văn ngắn từ bài. Không viết nhận xét chung chung kiểu "có thể sâu hơn" — nói rõ sâu ở chỗ nào, thêm gì.
