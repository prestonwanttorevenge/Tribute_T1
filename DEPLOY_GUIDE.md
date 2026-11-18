# Hướng dẫn Deploy 24/7, Gắn Tên Miền Riêng & Bật HTTPS (Tuần 4: Mạng máy tính)

Tài liệu này tổng hợp đầy đủ quy trình đưa dự án **T1 Dynasty Archive (2003–2026)** lên Internet chạy 24/7 với **tên miền riêng** và **chứng chỉ HTTPS (SSL/TLS)** theo đúng yêu cầu của sheet **Tuần 4: Mạng máy tính**.

---

## Phần 1: Đăng ký tên miền miễn phí

Chọn **1 trong 2** nguồn sau:

1. **DigitalPlat FreeDomain (Nhanh nhất, không cần thẻ)**
   - Truy cập: [https://dash.domain.digitalplat.org](https://dash.domain.digitalplat.org)
   - Đăng nhập bằng tài khoản GitHub.
   - Chọn đăng ký miễn phí các đuôi hỗ trợ đổi Nameserver như `.dpdns.org`, `.qzz.io`, `.us.kg` (ví dụ: `t1dynasty.dpdns.org` hoặc `<tên-bạn>.dpdns.org`).
2. **GitHub Student Developer Pack (Tên miền .me / .live / .studio / .tech)**
   - Truy cập: [https://education.github.com/pack](https://education.github.com/pack)
   - Kích hoạt ưu đãi sinh viên tại **Namecheap** (`.me`) hoặc **Name.com** (`.live`, `.studio`, `.software`) / **.TECH**.

---

## Phần 2: Trỏ Nameserver (NS) về Cloudflare DNS (Free)

1. Tạo tài khoản hoặc đăng nhập [https://dash.cloudflare.com](https://dash.cloudflare.com).
2. Nhấn **Add a domain** → nhập tên miền bạn vừa đăng ký ở Phần 1 → chọn gói **Free ($0)**.
3. Cloudflare sẽ cấp cho bạn **2 Nameserver**, dạng ví dụ:
   - `alice.ns.cloudflare.com`
   - `bob.ns.cloudflare.com`
4. Quay lại trang quản trị tên miền (**DigitalPlat** hoặc **Namecheap / Name.com**) → đổi mục **Nameservers** từ mặc định sang **Custom DNS / Custom Nameservers** và điền đúng 2 cặp NS của Cloudflare vừa nhận.
5. Chờ 5–15 phút để Cloudflare báo **Active** (`Great news! Cloudflare is now protecting your site`).

---

## Phần 3: Triển khai (Deploy) & Gắn Custom Domain HTTPS

Source code đã được cấu hình sẵn Static Export (`output: "export"` xuất ra thư mục `out/`) nên tương thích **100%** cả **Cloudflare Pages** lẫn **GitHub Pages**.

### Cách A: Cloudflare Pages (Khuyên dùng — Gắn tên miền & SSL tự động trong 1 phút)

1. Mở [Cloudflare Dashboard](https://dash.cloudflare.com) → **Workers & Pages** → **Create** → chọn tab **Pages** → **Connect to Git**.
2. Chọn repository **`prestonwanttorevenge/Tribute_T1`** (nhánh `main`).
3. Điền cấu hình Build:
   - **Framework preset**: `Next.js (Static HTML Export)` hoặc `None`
   - **Build command**: `npm run build`
   - **Build output directory**: `out`
   - **Environment variables**: *(để trống — giữ chạy ở đường dẫn gốc `/`)*
4. Nhấn **Save and Deploy**. Sau khi xong, vào tab **Custom domains** → **Set up a custom domain** → gõ tên miền riêng của bạn → Cloudflare tự tạo bản ghi CNAME và cấp chứng chỉ HTTPS (SSL) tự động.

### Cách B: GitHub Pages + Cloudflare DNS

1. Đảm bảo trong repo GitHub `prestonwanttorevenge/Tribute_T1`: vào **Settings** → **Pages** → mục **Source** chọn **GitHub Actions** (workflow `.github/workflows/deploy.yml` đã có sẵn).
2. Khi chỉ mới chạy link mặc định `https://prestonwanttorevenge.github.io/Tribute_T1/`, workflow tự động gắn `NEXT_PUBLIC_BASE_PATH=/Tribute_T1` nên toàn bộ CSS, JS và ảnh hoạt động đầy đủ.
3. Khi đã có tên miền riêng (ví dụ `t1dynasty.dpdns.org`):
   - **Trên Cloudflare DNS** (với domain gốc `yourdomain.dpdns.org`), thêm 4 bản ghi **A** trỏ tới IP GitHub Pages (có thể bật Proxied mây cam hoặc DNS only mây xám khi xác thực ban đầu):
     - `@` → `185.199.108.153`
     - `@` → `185.199.109.153`
     - `@` → `185.199.110.153`
     - `@` → `185.199.111.153`
     - *(Nếu dùng subdomain như `www` hoặc `t1.yourdomain.dpdns.org` thì chỉ cần 1 bản ghi **CNAME** trỏ tới `prestonwanttorevenge.github.io`)*.
   - **Trong mã nguồn**: Tạo file `D:\Networking\Tribute_T1\public\CNAME` chứa duy nhất tên miền của bạn (1 dòng) rồi push lên `main` — GitHub Actions sẽ tự chuyển `NEXT_PUBLIC_BASE_PATH` về rỗng `/` và gắn Custom Domain.
   - **Bật HTTPS**:
     - Trong **GitHub Settings → Pages**: tick chọn **Enforce HTTPS**.
     - Trong **Cloudflare → SSL/TLS → Overview**: chọn chế độ **Full** hoặc **Full (strict)**, và bật **Edge Certificates → Always Use HTTPS**.

---

## Phần 4: Kiểm tra nghiệm thu & Nộp bài lên Google Sheet

Sau khi truy cập `https://<tên-miền-của-bạn>` thấy ổ khóa HTTPS hoạt động 24/7, điền vào bảng Google Sheet Tuần 4 (cột của bạn):

- **Link Repo GitHub**: `https://github.com/prestonwanttorevenge/Tribute_T1`
- **Link Deploy**: `https://<tên-miền-riêng-của-bạn>`
- **Công nghệ sử dụng**: `Next.js 16 (Static Export), React 19, TypeScript, Tailwind CSS, GSAP, Three.js WebGL, Lenis, Cloudflare DNS & Pages / GitHub Pages`
