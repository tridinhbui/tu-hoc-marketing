/* Bài thực hành — phần A. Xem tasks.js. Mọi con số là MINH HOẠ, tự khớp nhau, đã tính lại bằng script. */
Object.assign(BAI_TASKS, {

/* ---------------------------------------------------------------- ob04-06 */
'B:ob04-06': {
  given: [
    ['Sản phẩm', 'Kem chống nắng 50ml, shop bán online'],
    ['Giá bán hiện tại', '250.000đ/chai'],
    ['Chi phí biến đổi (hàng, hộp, ship hỗ trợ)', '175.000đ/chai'],
    ['Sản lượng hiện tại', '1.200 chai/tháng'],
    ['Đối thủ', 'Giảm 15% trong 2 tuần, đã báo trước ngày kết thúc'],
    ['Phương án 1', 'Giảm theo 15%'],
    ['Phương án 2', 'Giảm 10%'],
    ['Phương án 3', 'Giữ giá, tặng chai mini giá vốn 15.000đ']
  ],
  output: 'Tính lãi gộp mỗi chai và tổng lãi gộp tháng hiện tại. Với từng phương án, tính lãi gộp mỗi chai mới, số chai cần bán để giữ nguyên tổng lãi gộp và mức tăng sản lượng (%). Kết bằng một câu chọn phương án, có nhắc thời hạn đợt giảm của đối thủ.',
  rubric: [
    'Tính trên lãi gộp mỗi chai (giá − chi phí biến đổi), không tính trên doanh thu.',
    'Có tổng lãi gộp hiện tại: 1.200 × 75.000đ = 90 triệu.',
    'Mỗi phương án có đủ ba số: lãi mỗi chai, số chai cần bán, % tăng sản lượng.',
    'Không mắc lỗi "giảm 15% thì chỉ cần bán thêm 15%".',
    'Câu kết có dùng thông tin đợt giảm của đối thủ chỉ kéo dài 2 tuần.'
  ],
  model: `<div class="scroll"><table class="t"><thead><tr><th>Phương án</th><th>Lãi gộp/chai</th><th>Chai cần bán</th><th>Tăng sản lượng</th></tr></thead><tbody>
<tr><td>Hiện tại (250.000đ)</td><td class="n">75.000đ</td><td class="n">1.200</td><td class="n">—</td></tr>
<tr><td>Giảm 15% (212.500đ)</td><td class="n">37.500đ</td><td class="n">2.400</td><td class="n">+100%</td></tr>
<tr><td>Giảm 10% (225.000đ)</td><td class="n">50.000đ</td><td class="n">1.800</td><td class="n">+50%</td></tr>
<tr><td>Tặng mini (vốn 15.000đ)</td><td class="n">60.000đ</td><td class="n">1.500</td><td class="n">+25%</td></tr>
</tbody></table></div>
<p>Tổng lãi gộp hiện tại: 1.200 × 75.000đ = 90 triệu/tháng. Số chai cần bán = 90 triệu ÷ lãi mỗi chai mới.</p>
<p><b>Đề xuất:</b> không giảm theo. Đợt giảm của đối thủ chỉ 2 tuần, mà giảm 15% đòi bán gấp đôi. Chọn tặng chai mini cho đơn trong 2 tuần đó — chỉ cần bán thêm 25% là giữ lãi, và hết đợt thì bỏ quà mà không phải "tăng giá lại".</p>`
},

/* ---------------------------------------------------------------- ob04-08 */
'B:ob04-08': {
  given: `<div class="scroll"><table class="t"><thead><tr><th>Bình giữ nhiệt 500ml</th><th>Thị phần trên sàn</th><th>Giá</th><th>Giữ nóng</th><th>Trọng lượng</th><th>Bảo hành</th><th>Điểm bán offline</th><th>Số màu</th></tr></thead><tbody>
<tr><td><b>Mình</b></td><td class="n">6%</td><td class="n">289.000đ</td><td class="n">12 giờ</td><td class="n">280g</td><td class="n">12 tháng</td><td class="n">15</td><td class="n">6</td></tr>
<tr><td>Hãng A</td><td class="n">32%</td><td class="n">349.000đ</td><td class="n">12 giờ</td><td class="n">320g</td><td class="n">24 tháng</td><td class="n">60</td><td class="n">4</td></tr>
<tr><td>Hãng B</td><td class="n">25%</td><td class="n">199.000đ</td><td class="n">6 giờ</td><td class="n">350g</td><td class="n">6 tháng</td><td class="n">40</td><td class="n">8</td></tr>
<tr><td>Hãng C</td><td class="n">18%</td><td class="n">259.000đ</td><td class="n">10 giờ</td><td class="n">300g</td><td class="n">12 tháng</td><td class="n">25</td><td class="n">5</td></tr>
<tr><td>Hãng D</td><td class="n">4%</td><td class="n">450.000đ</td><td class="n">24 giờ</td><td class="n">400g</td><td class="n">36 tháng</td><td class="n">5</td><td class="n">3</td></tr>
<tr><td>Hãng E</td><td class="n">3%</td><td class="n">159.000đ</td><td class="n">4 giờ</td><td class="n">260g</td><td class="n">3 tháng</td><td class="n">0</td><td class="n">10</td></tr>
</tbody></table></div>
<p class="small muted">Khảo sát 200 khách: lý do chọn bình — giữ nóng bao lâu 62%, giá 55%, mua được ở gần nhà 40%, trọng lượng 31%, màu sắc 12%, khắc tên 5%.</p>`,
  output: 'Làm bảng so sánh một trang: hàng là 4 tiêu chí khách nêu nhiều nhất, cột là mình và 3 đối thủ chiếm thị phần lớn nhất; mỗi ô là một con số. Dưới bảng viết đúng 3 dòng: thắng ở đâu, thua ở đâu, đề xuất một việc.',
  rubric: [
    'Chỉ giữ 3 đối thủ lớn nhất (A, B, C — cộng 75% thị phần); D và E đưa ra ngoài.',
    'Chỉ giữ 4 tiêu chí khách nêu nhiều nhất; màu sắc và khắc tên bị bỏ.',
    'Không ô nào ghi tính từ ("tốt", "nhẹ", "rẻ") — ô nào cũng là số có đơn vị.',
    'Có đủ 3 dòng thắng – thua – đề xuất, mỗi dòng dẫn một con số từ bảng.',
    'Đề xuất là một việc cụ thể, gắn với điểm thua hoặc điểm thắng.'
  ],
  model: `<div class="scroll"><table class="t"><thead><tr><th>Tiêu chí (tỉ lệ khách nêu)</th><th>Mình</th><th>A</th><th>B</th><th>C</th></tr></thead><tbody>
<tr><td>Giữ nóng (62%)</td><td class="n">12 giờ</td><td class="n">12 giờ</td><td class="n">6 giờ</td><td class="n">10 giờ</td></tr>
<tr><td>Giá (55%)</td><td class="n">289.000đ</td><td class="n">349.000đ</td><td class="n">199.000đ</td><td class="n">259.000đ</td></tr>
<tr><td>Điểm bán gần nhà (40%)</td><td class="n">15</td><td class="n">60</td><td class="n">40</td><td class="n">25</td></tr>
<tr><td>Trọng lượng (31%)</td><td class="n">280g</td><td class="n">320g</td><td class="n">350g</td><td class="n">300g</td></tr>
</tbody></table></div>
<p><b>Thắng:</b> giữ nóng 12 giờ ngang A nhưng rẻ hơn 60.000đ, và nhẹ nhất (280g).</p>
<p><b>Thua:</b> điểm bán — 15 so với 60 của A, ít nhất trong bốn hãng.</p>
<p><b>Đề xuất:</b> đưa "12 giờ · 280g · 289.000đ" lên ảnh chính trên sàn, và dùng ngân sách quý tới mở thêm điểm bán ở nhà sách, siêu thị mini.</p>`
},

/* ---------------------------------------------------------------- ob07-05 */
'B:ob07-05': {
  given: [
    ['Tiêu đề trong báo cáo nội bộ', '"App cơm chay Y tăng trưởng 400%, chúng ta chỉ tăng 10%"'],
    ['App Y — quý 1', '300 đơn/tháng (trung bình)'],
    ['App Y — quý 2', '1.500 đơn/tháng (trung bình)'],
    ['App Y — từng tháng quý 2', 'Tháng 4: 1.400 · Tháng 5: 1.550 · Tháng 6: 1.550'],
    ['Mình — quý 1', '18.000 đơn/tháng'],
    ['Mình — quý 2', '19.800 đơn/tháng']
  ],
  output: 'Tính cho mỗi bên: số đơn tăng thêm mỗi tháng và % tăng; tính quy mô của mình gấp bao nhiêu lần Y ở quý 2. Viết lại tiêu đề trung thực (dưới 30 chữ, có cả số nền và số tuyệt đối), và một câu khuyến nghị dựa trên xu hướng ba tháng của Y.',
  rubric: [
    'Có số tuyệt đối tăng thêm cho cả hai bên: Y +1.200 đơn, mình +1.800 đơn.',
    'Có so quy mô: 19.800 ÷ 1.500 = 13,2 lần.',
    'Tiêu đề mới có số nền (từ bao nhiêu lên bao nhiêu), không chỉ có phần trăm.',
    'Khuyến nghị dựa vào xu hướng từng tháng của Y, không dựa vào một con số quý.',
    'Không kết luận "Y không đáng lo" mà không nêu điều kiện sẽ theo dõi.'
  ],
  model: `<p>Y: 300 → 1.500 đơn/tháng, +1.200 đơn (+400%). Mình: 18.000 → 19.800, +1.800 đơn (+10%). Phần tăng của mình gấp 1,5 lần phần tăng của Y; quy mô của mình gấp 13,2 lần.</p>
<p><b>Tiêu đề viết lại:</b> "Quý 2: mình thêm 1.800 đơn/tháng (lên 19.800); app Y thêm 1.200 (từ 300 lên 1.500)."</p>
<p><b>Khuyến nghị:</b> Y tăng vọt ở tháng 4 (1.400) rồi đi ngang 1.550 trong hai tháng sau — chưa phải đà nhân đôi. Chưa dồn ngân sách phản công; theo dõi đơn của Y mỗi tháng, nếu vượt 3.000 đơn/tháng thì họp lại.</p>`
},

/* ---------------------------------------------------------------- kh01-06 */
'B:kh01-06': {
  given: [
    ['Dịch vụ', 'Giặt giày thể thao lấy – trả tận nơi ở Đà Nẵng, 80.000đ/đôi/lần'],
    ['Dân số Đà Nẵng (để đối chiếu)', '1.200.000 người'],
    ['Người 18–35 tuổi đi học, đi làm ở các quận trung tâm', '300.000 người (niên giám, nguồn khá chắc)'],
    ['Có ít nhất một đôi giày thể thao từ 1 triệu trở lên', '30% (khảo sát 150 người ở 2 trường và 1 toà văn phòng)'],
    ['Trong số đó, sẵn sàng trả tiền thuê giặt', '25% (hỏi 40 người, nguồn yếu)'],
    ['Số lần giặt mỗi năm của người sẵn sàng trả', '4 lần']
  ],
  output: 'Viết chuỗi phép nhân từ dưới lên ra số khách, số lượt giặt và quy mô (tỉ đồng/năm), mỗi bước ghi nguồn. Chỉ ra tỉ lệ yếu nhất và tính lại quy mô nếu tỉ lệ đó là 15% và 35%.',
  rubric: [
    'Bắt đầu từ 300.000 người trong nhóm liên quan, không lấy 1,2 triệu dân nhân một tỉ lệ đoán.',
    'Có nhân tần suất 4 lần/năm — không tính như mỗi người chỉ giặt một lần.',
    'Mỗi tỉ lệ có ghi nguồn bên cạnh.',
    'Gọi tên tỉ lệ 25% là giả định yếu nhất và nói vì sao (chỉ hỏi 40 người).',
    'Có khoảng quy mô khi đổi tỉ lệ yếu: 4,32 – 10,08 tỉ đồng/năm.'
  ],
  model: `<p>300.000 người (niên giám) × 30% có giày từ 1 triệu (khảo sát 150 người) = 90.000 người.<br>
× 25% sẵn sàng trả (hỏi 40 người) = 22.500 khách tiềm năng.<br>
× 4 lần/năm = 90.000 lượt giặt/năm.<br>
× 80.000đ = <b>7,2 tỉ đồng/năm</b>.</p>
<p><b>Giả định yếu nhất:</b> 25% sẵn sàng trả — mẫu chỉ 40 người. Nếu thật ra là 15%: 4,32 tỉ; nếu 35%: 10,08 tỉ. Quy mô nằm khoảng 4–10 tỉ, cùng bậc độ lớn.</p>
<p>Việc tiếp: hỏi thêm 200 người ở phòng gym và sân bóng về việc trả 80.000đ/đôi trước khi thuê xe giao nhận.</p>`
},

/* ---------------------------------------------------------------- kh02-01 */
'B:kh02-01': {
  given: `<div class="scroll"><table class="t"><thead><tr><th>Nước ép lạnh 45.000đ/chai, ngân sách quý 90 triệu</th><th>Dân văn phòng Q.1</th><th>Người tập yoga, pilates</th><th>Mẹ sau sinh</th></tr></thead><tbody>
<tr><td>Số người trong vùng giao hàng</td><td class="n">50.000</td><td class="n">8.000</td><td class="n">3.000</td></tr>
<tr><td>Tỉ lệ dự kiến mua trong quý</td><td class="n">2%</td><td class="n">10%</td><td class="n">8%</td></tr>
<tr><td>Lãi gộp mỗi khách trong quý</td><td class="n">120.000đ</td><td class="n">180.000đ</td><td class="n">250.000đ</td></tr>
<tr><td>Chi phí tiếp cận trong quý</td><td class="n">80 triệu</td><td class="n">40 triệu (qua 20 studio)</td><td class="n">45 triệu (cần giấy kiểm nghiệm)</td></tr>
<tr><td>Đang chọn gì thay thế</td><td>Trà sữa, cà phê ngay sảnh toà nhà, 30.000đ</td><td>Nước lọc; nước ép không đường rất ít chỗ bán</td><td>Nước ép tự làm ở nhà</td></tr>
</tbody></table></div>`,
  output: 'Làm bảng chấm 1–5 cho ba tệp theo bốn tiêu chí (quy mô, lợi nhuận mỗi khách, khả năng thắng, chi phí tiếp cận — rẻ thì điểm cao), mỗi điểm kèm một dữ kiện. Tính lãi còn lại sau chi phí tiếp cận của mỗi tệp (triệu đồng) và viết 2 câu chọn một tệp.',
  rubric: [
    'Có số khách dự kiến của mỗi tệp (1.000 · 800 · 240) trước khi tính lãi.',
    'Có lãi sau tiếp cận cho cả ba tệp: 40 · 104 · 15 triệu.',
    'Mỗi điểm 1–5 có một dữ kiện đi kèm, không chấm theo cảm tình.',
    'Không chọn tệp văn phòng chỉ vì đông nhất; có nhắc đối thủ ngay sảnh.',
    'Câu chọn tệp nêu cả lý do thắng và chi phí với tới, không chỉ quy mô.'
  ],
  model: `<div class="scroll"><table class="t"><thead><tr><th>Tiêu chí</th><th>Văn phòng</th><th>Yoga, pilates</th><th>Sau sinh</th></tr></thead><tbody>
<tr><td>Quy mô (khách dự kiến)</td><td class="n">5 · 1.000</td><td class="n">3 · 800</td><td class="n">1 · 240</td></tr>
<tr><td>Lợi nhuận mỗi khách</td><td class="n">2 · 120.000đ</td><td class="n">3 · 180.000đ</td><td class="n">5 · 250.000đ</td></tr>
<tr><td>Khả năng thắng</td><td class="n">1 · đấu đồ uống 30.000đ ở sảnh</td><td class="n">5 · gần như không có đối thủ</td><td class="n">3 · thay đồ tự làm</td></tr>
<tr><td>Chi phí tiếp cận</td><td class="n">1 · 80 triệu</td><td class="n">4 · 40 triệu</td><td class="n">3 · 45 triệu</td></tr>
<tr><td><b>Tổng điểm</b></td><td class="n">9</td><td class="n">15</td><td class="n">12</td></tr>
<tr><td><b>Lãi sau tiếp cận</b></td><td class="n">120 − 80 = 40tr</td><td class="n">144 − 40 = 104tr</td><td class="n">60 − 45 = 15tr</td></tr>
</tbody></table></div>
<p>Chọn tệp yoga, pilates: ít người hơn văn phòng nhưng gần như không có đối thủ, với tới rẻ qua 20 studio, nên để lại 104 triệu lãi — gấp 2,6 lần tệp văn phòng.</p>`
},

/* ---------------------------------------------------------------- kh04-09 */
'B:kh04-09': {
  given: [
    ['Sản phẩm', 'Hộp chia thuốc có chuông, báo về điện thoại của con khi bố mẹ đã mở ngăn thuốc'],
    ['Khách mua', 'Người 30–45 tuổi đi làm ở thành phố, bố mẹ ở quê có bệnh mãn tính'],
    ['Số liệu bối cảnh', 'Khảo sát 60 người: 70% từng phát hiện bố mẹ quên thuốc ít nhất một lần/tuần'],
    ['Lời khách 1', '"Gọi về hỏi mẹ uống thuốc chưa thì mẹ bảo rồi, mà em biết là chưa."'],
    ['Lời khách 2', '"Hỏi nhiều thì mẹ dỗi, bảo con coi mẹ như con nít."'],
    ['Bản nháp insight hiện tại', '"70% con cái lo bố mẹ quên thuốc nên cần một giải pháp thông minh như hộp chia thuốc có chuông để yên tâm."']
  ],
  output: 'Viết lại thành MỘT câu insight dưới 45 chữ, có đủ: ai, muốn gì, vướng gì, bằng giọng của khách. Dưới câu, tách ra bốn phần, và liệt kê những gì từ bản nháp phải chuyển sang phần bối cảnh của brief.',
  rubric: [
    'Chỉ một câu, đọc được trong một hơi (dưới 45 chữ).',
    'Không có tên hay tính năng sản phẩm (hộp, chuông, báo về điện thoại).',
    'Không có số liệu (70%) trong câu insight.',
    'Phần "vướng" là một khó xử thật của người con, không chỉ là "lo lắng".',
    'Có câu nói bằng giọng khách (ngôi "tôi"/"em"), không phải giọng báo cáo.',
    'Có ghi rõ số 70% và mô tả sản phẩm được chuyển xuống bối cảnh.'
  ],
  model: `<p><b>Insight:</b> "Người con đi làm xa, bố mẹ ở quê uống thuốc hằng ngày: Tôi muốn biết chắc mẹ uống thuốc đủ, nhưng gọi về hỏi hoài thì mẹ phật lòng, như thể tôi coi mẹ là con nít."</p>
<p>Ai: người con ở thành phố có bố mẹ bệnh mãn tính ở quê. Muốn: biết chắc bố mẹ uống thuốc. Vướng: hỏi nhiều làm mẹ tự ái, mà mẹ cũng không nói thật. Giọng: lời người con, lấy từ hai câu khách kể.</p>
<p><b>Chuyển sang bối cảnh:</b> số 70% quên thuốc mỗi tuần; mô tả hộp chia thuốc có chuông và thông báo về điện thoại.</p>`
},

/* ---------------------------------------------------------------- kh05-08 */
'B:kh05-08': {
  given: [
    ['Mục tiêu', 'Đo vì sao khách không quay lại tái khám ở một phòng khám nha'],
    ['Danh sách có thể gửi', '3.000 khách đã khám trong 6 tháng, gửi qua Zalo'],
    ['Tỉ lệ mở và bắt đầu trả lời (lần trước)', '12%'],
    ['Tỉ lệ làm hết phiếu', 'Bảng 20 câu: 50% · Bảng rút gọn 8 câu: 90%'],
    ['Sai số tối đa (95%) ước nhanh', '≈ 1 ÷ căn bậc hai của số phiếu'],
    ['Một câu trong bảng nháp', '"Bác sĩ có giải thích rõ và giá có hợp lý không? (chấm 1–10)"']
  ],
  output: 'Tính số phiếu hoàn chỉnh và sai số (± điểm phần trăm) khi gửi cả 3.000 tin với bảng 20 câu và với bảng 8 câu. Tính số tin cần gửi để có 400 phiếu với bảng 8 câu và nói danh sách có đủ không. Viết lại câu nháp thành hai câu, mỗi câu thang 5 mức có nhãn chữ.',
  rubric: [
    'Không coi 3.000 tin là 3.000 phiếu: có nhân cả 12% và tỉ lệ làm hết phiếu.',
    'Có hai kết quả: 180 phiếu (±7,5 điểm) và 324 phiếu (±5,6 điểm).',
    'Có số tin cần gửi cho 400 phiếu: 400 ÷ (12% × 90%) ≈ 3.704, và nhận ra danh sách 3.000 không đủ.',
    'Câu hai ý được tách thành hai câu, mỗi câu hỏi đúng một điều.',
    'Thang mới có 5 mức, mức nào cũng có nhãn chữ, hai phía cân đối.'
  ],
  model: `<p><b>Bảng 20 câu:</b> 3.000 × 12% × 50% = 180 phiếu → sai số ≈ 1 ÷ √180 ≈ ±7,5 điểm.<br>
<b>Bảng 8 câu:</b> 3.000 × 12% × 90% = 324 phiếu → ≈ ±5,6 điểm.</p>
<p>Muốn 400 phiếu với bảng 8 câu: 400 ÷ (0,12 × 0,9) ≈ 3.704 tin — danh sách chỉ có 3.000. Chọn bảng 8 câu, chấp nhận ±5,6 điểm, hoặc nhắc lại một lần cho người chưa mở.</p>
<p><b>Viết lại:</b><br>1. "Bác sĩ giải thích tình trạng răng của anh/chị rõ đến mức nào?" — Rất không rõ / Không rõ / Bình thường / Rõ / Rất rõ.<br>
2. "Chi phí lần khám vừa rồi so với anh/chị dự tính thế nào?" — Cao hơn nhiều / Cao hơn một chút / Đúng như dự tính / Thấp hơn một chút / Thấp hơn nhiều.</p>`
},

/* ---------------------------------------------------------------- gt01-02 */
'B:gt01-02': {
  given: [
    ['Doanh nghiệp', 'Studio yoga ở Quận 7, bán gói 3 tháng'],
    ['Câu trong kế hoạch', '"Vấn đề: học viên bỏ ngang nhiều"'],
    ['Học viên mua gói lần đầu trong tháng 3', '240 người'],
    ['Trong số đó, không còn đến lớp sau tuần thứ 4', '96 người'],
    ['Chủ studio muốn', 'Tỉ lệ bỏ trước hết tuần 4 còn 25%'],
    ['Đợt thay đổi áp dụng', 'Học viên mua gói lần đầu từ tháng 6; đủ 4 tuần để đo vào cuối tháng 7']
  ],
  output: 'Viết lại câu vấn đề thành 1–2 câu có đủ năm phần: ai, chỉ số, mức hiện tại (tính ra %), mức cần đạt, thời hạn. Thêm một dòng quy mục tiêu ra số người trên 240 học viên.',
  rubric: [
    'Không còn tính từ "nhiều", "ít" thay cho con số.',
    'Có mức hiện tại: 96/240 = 40%.',
    'Có mức cần đạt (25%) và nhóm áp dụng (mua gói lần đầu từ tháng 6).',
    'Có ngày đo cụ thể (cuối tháng 7).',
    'Có quy đổi: từ 96 xuống 60 người bỏ trên 240, tức bớt 36 người.',
    'Câu vấn đề không chứa giải pháp (đổi giờ lớp, giảm giá…).'
  ],
  model: `<p>"Trong 240 học viên mua gói 3 tháng lần đầu tháng 3, 96 người (40%) ngừng đến lớp trước khi hết tuần thứ 4. Mục tiêu: hạ tỉ lệ này xuống 25% với học viên mua gói lần đầu từ tháng 6, đo ngày 31/7."</p>
<p>Quy ra người: trên mỗi 240 học viên mới, số bỏ ngang phải giảm từ 96 xuống 60 — giữ thêm 36 người.</p>`
},

/* ---------------------------------------------------------------- gt02-05 */
'B:gt02-05': {
  given: [
    ['Doanh nghiệp', 'Tiệm trà sữa bán qua app giao đồ ăn'],
    ['Tháng 5', '9.000 đơn × 60.000đ/đơn'],
    ['Tháng 6', '8.100 đơn × 58.000đ/đơn'],
    ['Ý kiến trong nhóm', '"Giá trị đơn giảm, phải chạy combo ngay"']
  ],
  output: 'Tính doanh thu hai tháng và mức giảm (triệu đồng). Tách mức giảm về hai nhánh số đơn và giá trị đơn theo cả hai thứ tự đổi, lấy trung bình, ghi tỉ trọng nhánh lớn. Kết bằng một câu: nhánh nào ưu tiên trước và ý kiến "chạy combo" đúng hay chưa.',
  rubric: [
    'Có doanh thu 540 và 469,8 triệu, giảm 70,2 triệu.',
    'Có cả hai thứ tự đổi, mỗi thứ tự cộng lại đúng 70,2 triệu.',
    'Có phần trung bình: số đơn ≈ 53,1 triệu, giá trị đơn ≈ 17,1 triệu.',
    'Quy ra tiền rồi mới xếp ưu tiên, không chỉ so % giảm của từng thừa số.',
    'Câu kết phản hồi trực tiếp ý kiến "chạy combo" bằng con số.'
  ],
  model: `<p>Tháng 5: 9.000 × 60.000 = 540 triệu. Tháng 6: 8.100 × 58.000 = 469,8 triệu. Giảm 70,2 triệu.</p>
<p><b>Đổi số đơn trước:</b> 8.100 × 60.000 = 486 → số đơn mất 54; giá trị đơn mất 16,2.<br>
<b>Đổi giá trị đơn trước:</b> 9.000 × 58.000 = 522 → giá trị đơn mất 18; số đơn mất 52,2.<br>
<b>Trung bình:</b> số đơn ≈ 53,1 triệu (≈ 76%), giá trị đơn ≈ 17,1 triệu (≈ 24%).</p>
<p>Ưu tiên tìm vì sao mất 900 đơn. Combo chỉ nhắm vào phần nhỏ hơn — chưa nên làm trước.</p>`
},

/* ---------------------------------------------------------------- gt05-02 */
'B:gt05-02': {
  given: [
    ['Doanh nghiệp', 'Phòng gym có lớp nhóm (zumba, spinning, boxing)'],
    ['Mục tiêu trong brief', '"Tăng sự quan tâm của hội viên với lớp nhóm"'],
    ['Hội viên đang hoạt động', '2.400 người'],
    ['Tháng 9: hội viên tham gia ít nhất 1 lớp nhóm', '480 người'],
    ['Ba ý kiến khác trong nhóm', 'Tăng like fanpage lớp nhóm · Tăng đánh giá 5 sao · Tăng lượt đăng ký lớp'],
    ['Chủ gym muốn', 'Tỉ lệ tham gia lớp nhóm đạt 30% trong tháng 12']
  ],
  output: 'Viết MỘT câu mục tiêu theo khuôn ai – làm hành vi gì – từ bao nhiêu lên bao nhiêu – trước ngày nào. Dưới câu, tính tỉ lệ hiện tại, số người cần đạt, số người tăng thêm, mức tăng bằng điểm phần trăm và % tương đối.',
  rubric: [
    'Chỉ một mục tiêu; like fanpage và đánh giá 5 sao bị bỏ.',
    'Hành vi quan sát được ("tham gia ít nhất 1 lớp nhóm trong tháng"), không phải "quan tâm".',
    'Có điểm xuất phát: 480/2.400 = 20%.',
    'Có đích bằng số người: 720 người (30%), tăng 240 người.',
    'Phân biệt rõ +10 điểm phần trăm và +50% tương đối.',
    'Có ngày hạn cụ thể.'
  ],
  model: `<p>"Tăng số hội viên đang hoạt động tham gia ít nhất một lớp nhóm trong tháng từ 480 (tháng 9) lên 720 trong tháng 12, đo ngày 31/12."</p>
<p>Tỉ lệ: 480/2.400 = 20% → 720/2.400 = 30%. Tăng 240 người; tăng 10 điểm phần trăm, tức tăng tương đối 50%.</p>
<p>Like fanpage và đánh giá 5 sao không đưa vào: đều không chứng minh hội viên đã đến lớp.</p>`
},

/* ---------------------------------------------------------------- gt06-01 */
'B:gt06-01': {
  given: [
    ['Doanh nghiệp', 'Tiệm hoa online ở Cần Thơ'],
    ['Mục tiêu doanh thu tháng 2 (có Valentine)', '216 triệu đồng'],
    ['Giá trị đơn trung bình', '450.000đ'],
    ['Số đơn mỗi khách trong tháng', '1,2'],
    ['Tỉ lệ người nhắn tin → mua', '25%'],
    ['Chi phí quảng cáo mỗi lượt nhắn tin', '15.000đ']
  ],
  output: 'Suy ngược từ doanh thu ra bốn con số, mỗi số ghi rõ phép chia/nhân: số đơn, số khách, số lượt nhắn tin cần có, ngân sách quảng cáo (triệu đồng). Kết bằng một câu nêu đòn bẩy nào giảm được ngân sách nhiều nhất.',
  rubric: [
    'Có đủ chuỗi: 480 đơn → 400 khách → 1.600 lượt nhắn → 24 triệu.',
    'Có chia cho 1,2 đơn mỗi khách, không coi mỗi khách chỉ mua một lần.',
    'Mỗi bước ghi phép tính, người khác thay số kiểm lại được.',
    'Câu kết nêu một đòn bẩy cụ thể (tỉ lệ chốt, giá trị đơn hay tần suất) và tính lại ngân sách theo đòn bẩy đó.'
  ],
  model: `<p>216 triệu ÷ 450.000đ = <b>480 đơn</b>.<br>
480 ÷ 1,2 = <b>400 khách</b>.<br>
400 ÷ 25% = <b>1.600 lượt nhắn tin</b>.<br>
1.600 × 15.000đ = <b>24 triệu quảng cáo</b>.</p>
<p>Đòn bẩy rẻ nhất là tỉ lệ chốt: lên 32% thì chỉ cần 1.250 lượt nhắn (400 ÷ 0,32), ngân sách còn 18,75 triệu — làm bằng mẫu trả lời có sẵn ảnh bó hoa và giá, thay vì chạy thêm quảng cáo.</p>`
},

/* ---------------------------------------------------------------- tp01-01 */
'B:tp01-01': {
  given: [
    ['Thương hiệu', 'Bánh mì nguyên cám làm thủ công ở Hà Nội, bán online, giao trong ngày'],
    ['Câu hiện tại', '"Bánh mì healthy chất lượng cao cho cuộc sống khoẻ mạnh"'],
    ['Khách chính (khảo sát 120 khách quen)', '70% đang kiểm soát đường huyết, hoặc mua cho người nhà bị tiểu đường type 2'],
    ['Họ đang dùng thay thế', 'Bánh "nguyên cám" ở siêu thị, thường chỉ pha 20–30% bột nguyên cám, có đường'],
    ['Điểm khác', '100% bột nguyên cám, không thêm đường'],
    ['Bằng chứng có sẵn', 'Phiếu kiểm nghiệm: 1,2g đường mỗi lát; in thành phần đầy đủ trên túi'],
    ['Đối thủ X', 'Tiệm bánh "healthy" bán bánh mì đen, bánh yến mạch, nhắm người tập gym']
  ],
  output: 'Viết câu định vị bốn vế (dưới 60 chữ), đánh dấu từng vế: cho ai, là gì, khác gì, vì sao tin. Thay tên X vào câu và ghi vế nào không còn đúng với X. Viết 2 quyết định thiết kế bao bì suy ra từ câu.',
  rubric: [
    'Vế "cho ai" là một nhóm cụ thể (người kiểm soát đường huyết), không phải "mọi người".',
    'Vế "khác gì" so với thay thế khách đang dùng, có dữ kiện (100% so với 20–30%), không chỉ là tính từ.',
    'Vế "vì sao tin" là bằng chứng kiểm được (phiếu kiểm nghiệm 1,2g đường/lát).',
    'Có phép thử thay tên X và chỉ ra ít nhất một vế X không đáp ứng được.',
    'Hai quyết định thiết kế suy thẳng từ câu (ví dụ in số đường lên mặt túi), không chung chung.'
  ],
  model: `<p>"<b>[Cho ai]</b> Cho người đang giữ đường huyết và người nhà mua giúp họ, <b>[là gì]</b> đây là bánh mì nguyên cám giao trong ngày <b>[khác gì]</b> làm từ 100% bột nguyên cám, không thêm đường, thay vì loại pha 20–30% ở siêu thị, <b>[vì sao tin]</b> mỗi lát 1,2g đường theo phiếu kiểm nghiệm in trên túi."</p>
<p><b>Thay X vào:</b> vế "khác gì" và "vì sao tin" không còn đúng — X không công bố tỉ lệ bột, không có số đường; vế "cho ai" cũng lệch vì X nhắm người tập gym.</p>
<p><b>Thiết kế:</b> (1) Đưa "1,2g đường/lát" và "100% nguyên cám" lên mặt trước túi, cỡ chữ lớn. (2) Bỏ ảnh người tập thể thao; dùng ảnh bữa sáng gia đình có người lớn tuổi.</p>`
},

/* ---------------------------------------------------------------- tp07-01 */
'B:tp07-01': {
  given: [
    ['Dịch vụ', 'Vệ sinh, sửa điều hoà tại nhà ở Bình Thạnh'],
    ['Tiêu đề quảng cáo cũ', '"Dịch vụ điện lạnh uy tín – tận tâm – giá tốt"'],
    ['Kết quả tiêu đề cũ', '18.000 lượt hiển thị, 126 lượt bấm'],
    ['Thợ tới nhà sau khi đặt', 'Trong 90 phút'],
    ['Giá vệ sinh', '150.000đ/bộ, báo trước, không phát sinh'],
    ['Bảo hành sau vệ sinh', '30 ngày'],
    ['Lượt vệ sinh năm ngoái', '4.200 lượt']
  ],
  output: 'Tính tỉ lệ bấm của tiêu đề cũ và số lượt bấm cần có (cùng 18.000 lượt hiển thị) để gấp đôi tỉ lệ đó. Viết 3 tiêu đề mới, mỗi cái dưới 15 chữ, mỗi cái chứa đúng một con số người đọc tự kiểm được và nói về việc của khách.',
  rubric: [
    'Có tỉ lệ bấm cũ: 126 ÷ 18.000 = 0,7%, và đích 252 lượt bấm (1,4%).',
    'Đủ 3 tiêu đề, mỗi cái dưới 15 chữ.',
    'Mỗi tiêu đề có một con số kiểm được (giờ, giá, ngày bảo hành…).',
    'Không tiêu đề nào chứa lời tự khen ("uy tín", "tận tâm", "chất lượng") hay tên thương hiệu.',
    'Thay tên một tiệm khác vào, tiêu đề không còn tự động đúng.'
  ],
  model: `<p>Tỉ lệ bấm cũ: 126 ÷ 18.000 = 0,7%. Gấp đôi là 1,4%, tức cần 252 lượt bấm trên 18.000 lượt hiển thị.</p>
<p>1. "Máy lạnh chảy nước? Thợ tới nhà trong 90 phút." (10 chữ)<br>
2. "Vệ sinh máy lạnh 150.000đ/bộ, báo giá trước, không phát sinh." (11 chữ)<br>
3. "Vệ sinh xong vẫn chảy nước? Làm lại miễn phí trong 30 ngày." (12 chữ)</p>
<p>Chạy cả ba với cùng ảnh, cùng ngân sách; giữ tiêu đề nào đạt từ 252 lượt bấm trở lên.</p>`
},

/* ---------------------------------------------------------------- tp11-03 */
'B:tp11-03': {
  given: [
    ['Người bán', 'Nhiếp ảnh gia chụp ảnh sản phẩm tự do'],
    ['Khách', 'Thương hiệu mỹ phẩm sắp đưa 12 sản phẩm lên sàn, ảnh dùng cho trang sàn, quảng cáo và website'],
    ['Cách báo giá cũ', '150.000đ/ảnh × 5 ảnh mỗi sản phẩm'],
    ['Thời gian làm', '1 ngày chụp + 2 ngày hậu kỳ = 24 giờ'],
    ['Chi phí thuê studio, đạo cụ', '1,5 triệu đồng'],
    ['Mức công tối thiểu tự đặt', '200.000đ/giờ'],
    ['Thay thế tốt nhất của khách', 'Một studio lớn báo 22 triệu trọn gói cùng khối lượng']
  ],
  output: 'Tính ba mốc: sàn (chi phí + công tối thiểu), giá theo cách cũ, trần (thay thế của khách). Đề xuất một mức giá nằm giữa, quy ra tiền công mỗi giờ và % so với thay thế. Viết 1 câu báo giá gắn với kết quả khách nhận, không nói về số giờ.',
  rubric: [
    'Có sàn: 24 × 200.000đ + 1,5 triệu = 6,3 triệu.',
    'Có giá theo cách cũ: 12 × 5 × 150.000đ = 9 triệu, và tiền công mỗi giờ tương ứng (312.500đ).',
    'Có trần là thay thế của khách (22 triệu), không lấy trần từ chi phí của mình.',
    'Giá đề xuất nằm giữa sàn và trần, có quy ra tiền công/giờ sau khi trừ chi phí.',
    'Câu báo giá nói khách nhận được gì (bộ ảnh dùng cho đâu), không nói "tôi làm 24 giờ".'
  ],
  model: `<p><b>Sàn:</b> 24 × 200.000đ + 1,5 triệu = 6,3 triệu.<br>
<b>Cách cũ:</b> 12 × 5 × 150.000đ = 9 triệu → (9 − 1,5) ÷ 24 = 312.500đ/giờ.<br>
<b>Trần:</b> 22 triệu (studio lớn).</p>
<p><b>Đề xuất: 15 triệu.</b> Trừ 1,5 triệu chi phí còn 13,5 triệu ÷ 24 giờ = 562.500đ/giờ; bằng khoảng 68% giá studio, tức khách tiết kiệm 7 triệu.</p>
<p><b>Câu báo giá:</b> "15 triệu cho 60 ảnh của 12 sản phẩm, đúng chuẩn ảnh chính trên sàn và cắt sẵn cỡ cho quảng cáo, website — lên sàn cùng lúc, không phải chụp lại."</p>`
},

/* ---------------------------------------------------------------- ob02-09 */
'B:ob02-09': {
  given: [
    ['Hãng A — sữa tắm chai 900ml, 180.000đ', '"Mua 1 tặng 1 chai 450ml"'],
    ['Hãng B — chai 1.100ml, 220.000đ', '"Giảm 25%"'],
    ['Hãng C — chai 600ml, 125.000đ', '"Mua 2 chai giảm 20%" (không mua 2 thì giá gốc)'],
    ['Người mua', 'Dùng khoảng 600ml mỗi tháng, hôm nay chỉ mang 150.000đ']
  ],
  output: 'Làm bảng 3 dòng (A, B, C theo đúng khuyến mãi): tiền phải trả một lần, tổng ml nhận, giá mỗi 100ml, mức giảm thật so với giá gốc mỗi 100ml của chính hãng đó. Viết 2 câu: cái nào rẻ nhất tính theo ml, và người mua đang mang 150.000đ nên chọn gì.',
  rubric: [
    'Quy cả ba về cùng một thước đo: đồng/100ml.',
    'Tính đúng A giảm thật 33,3% mỗi ml, không phải 50%.',
    'Có cột tiền phải trả một lần (180.000 · 165.000 · 200.000đ).',
    'Câu kết phân biệt "rẻ nhất mỗi ml" (A) với "mua được trong 150.000đ" (C một chai, không khuyến mãi).'
  ],
  model: `<div class="scroll"><table class="t"><thead><tr><th>Hãng</th><th>Trả một lần</th><th>Tổng ml</th><th>Giá/100ml</th><th>Giảm thật</th></tr></thead><tbody>
<tr><td>A (tặng 450ml)</td><td class="n">180.000đ</td><td class="n">1.350</td><td class="n">13.333đ</td><td class="n">33,3%</td></tr>
<tr><td>B (giảm 25%)</td><td class="n">165.000đ</td><td class="n">1.100</td><td class="n">15.000đ</td><td class="n">25%</td></tr>
<tr><td>C (mua 2 giảm 20%)</td><td class="n">200.000đ</td><td class="n">1.200</td><td class="n">16.667đ</td><td class="n">20%</td></tr>
</tbody></table></div>
<p>Giá gốc mỗi 100ml: A 20.000đ, B 20.000đ, C 20.833đ.</p>
<p>Tính theo ml, A rẻ nhất — giảm thật 33,3% chứ không phải 50%, vì phần tặng chỉ bằng nửa chai. Nhưng với 150.000đ trong túi, cả ba khuyến mãi đều quá tiền; chọn một chai C 125.000đ (20.833đ/100ml) — đủ dùng một tháng.</p>`
}

});
