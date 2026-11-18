Hãy đọc toàn bộ nội dung trong file @Story.md và xây dựng cho tôi một trang web Scrollytelling điện ảnh kể về lịch sử vương triều đỏ T1 (2003 – 2026).

### 1. Kiến trúc công nghệ & Bố cục 2 lớp (Split-Screen Scrollytelling)
- **Tech Stack:** HTML5, CSS3 (hoặc Tailwind CSS), JavaScript (ES6+), **GSAP 3 + ScrollTrigger + TextPlugin**, và **Lenis** (Smooth Scroll).
- **Bố cục 2 lớp song song:**
  - **Lớp Sân khấu (Bên trái / Nền chính - `position: sticky; top: 0; height: 100vh`):** Chiếm khoảng 55–60% chiều rộng màn hình trên desktop. Đây là nơi trình diễn các hiệu ứng đồ họa SVG/Canvas, chữ Quote khổng lồ và chuyển cảnh điện ảnh.
  - **Lớp Tự sự (Bên phải - Scrolling Narrative):** Chiếm khoảng 40–45% chiều rộng màn hình. Đổ toàn bộ nội dung văn xuôi từ `@Story.md` vào đây, chia thành các `<section class="story-chapter" data-scene="0">` đến `data-scene="8"` tương ứng với 9 phần trong `Story.md` (Mở đầu, Chương I đến Chương VII, và Lời kết).
  - Các đoạn văn trong Lớp Tự sự có hiệu ứng mờ dần (`opacity: 0.25`) khi chưa đọc tới, sáng rõ (`opacity: 1`) khi cuộn vào vùng trung tâm, và tự động kích hoạt phân cảnh tương ứng bên Lớp Sân khấu.
- **Thanh HUD cố định trên cùng:** Hiển thị dòng thời gian (`2003 -> 2026`) chạy theo tiến độ cuộn trang (`ScrollTrigger` scrub) và **6 biểu tượng Ngôi sao vô địch**. Mỗi khi người dùng cuộn qua một chức vô địch trong `Story.md`, ngôi sao tương ứng sẽ bừng sáng màu vàng kim (`#E5B84B`) và giữ nguyên trạng thái.

### 2. Bảng màu & Không khí điện ảnh
- Nền gốc: `#070709` (Đen nhung).
- Màu nhấn đế chế: `#E4002B` (Đỏ T1) kèm hiệu ứng phát sáng `drop-shadow`.
- Màu vinh quang: `#E5B84B` (Vàng kim).
- Màu mùa đông (2017–2021): `#0F1722` (Xanh tro lạnh).
- Phủ toàn trang một lớp hiệu ứng nhiễu hạt phim nhựa nhẹ (`film-grain` pointer-events: none, opacity: 0.04) và viền tối 4 góc (`vignette`).

### 3. Kịch bản 9 phân cảnh GSAP bên Lớp Sân khấu (đồng bộ với `data-scene` của `@Story.md`)
- **`data-scene="0"` (Mở đầu 2003–2012):** Hiển thị khung màn hình CRT tỷ lệ 4:3 ánh xanh mờ giữa bóng tối cùng quote *"Mọi đế chế vĩ đại đều bắt đầu từ một căn phòng chật hẹp..."*. Khi cuộn qua đoạn này, màn hình CRT phóng to (`scale: 4`) và tan biến để mở ra thế giới Liên Minh Huyền Thoại.
- **`data-scene="1"` (Chương I - 2013):** Mô phỏng 2 thanh máu Zed (Ryu đầy máu vs Faker 20% máu). Khi cuộn tới cao trào, 2 thanh máu va chạm, lóe sáng trắng (`flash`), hiện quote lớn **"FAKER! WHAT WAS THAT?!"** và mở khóa **Ngôi sao số 1** trên HUD.
- **`data-scene="2"` (Chương II - 2014–2016):** Chuyển đổi màu sắc từ trắng đen (`grayscale(100%)` cho năm 2014) sang rực rỡ (2015–2016). Lần lượt mở khóa **Ngôi sao số 2 và số 3** trên HUD.
- **`data-scene="3"` (Chương III - 2017–2021):** Chuyển màu nền toàn trang sang xanh tro lạnh `#0F1722`, chạy hiệu ứng hạt mưa rơi chậm (`slow-motion particles`) trên Canvas/CSS cùng quote về giọt nước mắt của Faker tại Tổ Chim.
- **`data-scene="4"` (Chương IV - 2022):** 5 cột ánh sáng rọi xuống hé lộ 5 chữ cái **Z - O - F - G - K** (`stagger: 0.12`). Bộ đếm tỷ số nhảy số từ `0-0` lên `20-0`, sau đó rung nhẹ khung hình (`camera shake`) ở đoạn chung kết San Francisco.
- **`data-scene="5"` (Chương V - 2023–2024):** Vẽ đường nhịp tim SVG (`strokeDashoffset` scrub theo lực cuộn). Đường nhịp tim tắt lịm thành đường thẳng ở đoạn chấn thương tay 2023, rồi bật nảy dữ dội kèm sóng xung kích đỏ ở đoạn Azir/Galio, mở khóa **Ngôi sao số 4 và số 5** trên HUD.
- **`data-scene="6"` (Chương VI - 2025):** Hiệu ứng đổi chữ cái từ `ZOFGK` thành `DOFGK` (chữ Z mờ đi, chữ D trượt vào). Hai luồng sáng Đỏ (T1) và Trắng (KT) va chạm ở giữa, sắc đỏ nuốt trọn khung hình, hiện quote của Gumayusi và mở khóa **Ngôi sao số 6** (hoàn tất cú Three-Peat).
- **`data-scene="7"` (Chương VII - 2026):** Đổi chữ `DOFGK` thành `DOFPK` (G nhường chỗ cho P). Nền chuyển sang sắc đỏ hoàng hôn pha tím trầm (`#240814`), các hạt bụi vàng bay lơ lửng chậm rãi hướng lên trên, không rung lắc, mang cảm giác bình thản và kiêu hãnh.
- **`data-scene="8"` (Lời kết):** Nền đen tối giản, ở giữa là logo chữ **T1** đỏ rực cùng vòng cung **6 ngôi sao vàng** tỏa sáng nhịp nhàng (`repeat: -1, yoyo: true`). Kèm nút **"Cuộn lại từ đầu hành trình"** dùng `gsap.to(window, { scrollTo: 0 })`.

### 4. Yêu cầu chất lượng code
- Tách bạch rõ ràng thành `index.html`, `style.css`, và `script.js` (hoặc cấu trúc component sạch nếu dùng Vite/React).
- Đảm bảo responsive trên mobile (trên màn hình nhỏ, Lớp Sân khấu thu gọn thành header sticky 35vh ở trên, văn bản cuộn bên dưới).
- Không cắt bớt bất kỳ chữ nào trong `@Story.md`.