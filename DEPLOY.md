# Đưa lên mạng — Phase 0

Site là HTML tĩnh, không cần build. Worker chỉ để nhận email.
Toàn bộ Phase 0 nằm gọn trong mức miễn phí của Cloudflare.

---

## 1. Sinh lại trang tĩnh và sitemap (chạy trước mỗi lần deploy)

```bash
SITE_URL=https://nhinthay.pages.dev node tools_build.mjs
```

Lệnh này sinh:
- `case/<id>.html` — 20 trang case, mỗi trang có `<title>`, description, OG và canonical riêng
- `thuong-hieu/<id>.html` — 14 trang thương hiệu
- `sitemap.xml`, `robots.txt`

> **Vì sao cần bước này:** `campaign.html?id=nike` và `?id=apple` trả về cùng một khối HTML.
> Với Google và trình quét mạng xã hội, 20 case đang là **một** trang. Đây là lỗi SEO
> lớn nhất của kiến trúc hiện tại, và trang sinh ra là cách sửa rẻ nhất — không phải viết lại site.

Đổi tên miền thì đổi `SITE_URL` rồi chạy lại.

## 2. Sinh lại ảnh OG (chỉ khi thêm case hoặc đổi thiết kế)

Cần server tĩnh đang chạy ở cổng 4321:

```bash
python3 -m http.server 4321
```

```bash
node -e "const fs=require('fs'),vm=require('vm');const c=vm.createContext({});for(const f of fs.readdirSync('assets/js/data'))vm.runInContext(fs.readFileSync('assets/js/data/'+f,'utf8'),c,{filename:f});const g=n=>vm.runInContext(n,c);fs.writeFileSync('/tmp/oglist.txt',[...g('CAMPAIGNS').map(x=>'case '+x.id),...g('BRANDS').map(x=>'brand '+x.id)].join('\n'))"

while read kind id; do
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless=new --disable-gpu \
    --hide-scrollbars --virtual-time-budget=3000 --window-size=1200,630 \
    --screenshot="assets/og/$kind-$id.png" "http://localhost:4321/tools_og.html?kind=$kind&id=$id"
done < /tmp/oglist.txt
```

Mất khoảng 10 phút cho 34 ảnh. Ảnh nằm trong `assets/og/`.

## 3. Deploy site lên Cloudflare Pages

```bash
npm install -D wrangler@latest
npx wrangler login
npx wrangler pages project create nhinthay
npx wrangler pages deploy dist --project-name nhinthay --branch main
```

Site chạy ở `https://nhinthay.pages.dev`. Gắn tên miền riêng trong dashboard Pages → Custom domains.

`tools_build.mjs` đã gói sẵn `dist/` chỉ gồm những gì được phép công khai:
các trang HTML, `assets/`, `case/`, `thuong-hieu/`, `sitemap.xml`, `robots.txt`.
`api/`, `tools_*` và mọi file `.md` **không** được copy sang.

## 4. Deploy Worker nhận email

```bash
cd api
npx wrangler d1 create nhinthay          # dán database_id vào wrangler.jsonc
npx wrangler kv namespace create SESSIONS # dán id vào wrangler.jsonc
npx wrangler d1 execute nhinthay --remote --file ./schema.sql
npx wrangler deploy
```

Rồi trong dashboard: **Workers → nhinthay-api → Settings → Domains & Routes** thêm route
`nhinthay.xx/api/*`. Front-end gọi `/api/subscribe` cùng origin nên **không cần CORS**.

Kiểm tra:

```bash
curl https://nhinthay.xx/api/health
curl -X POST https://nhinthay.xx/api/subscribe \
  -H 'content-type: application/json' \
  -d '{"email":"test@example.com","source":"manual"}'
```

Xem danh sách email đã thu:

```bash
cd api && npx wrangler d1 execute nhinthay --remote \
  --command "SELECT email, source, datetime(created_at/1000,'unixepoch') FROM subscribers ORDER BY created_at DESC LIMIT 50"
```

## 5. Bật đo lường

Cloudflare dashboard → **Web Analytics** → Add site → dán đoạn script vào cuối `<body>`
của các trang gốc (hoặc thêm vào `shell()` trong `assets/js/core.js` để mọi trang có luôn).
Không cookie, không cần banner đồng ý.

---

## Checklist trước khi gửi link cho người lạ

- [ ] `node tools_build.mjs` đã chạy với `SITE_URL` đúng tên miền thật
- [ ] Mở `https://…/case/bitis-hunter.html` — tiêu đề trên tab đúng tên case
- [ ] Dán link đó vào Messenger/Slack — ảnh OG hiện đúng, không phải ảnh mặc định
- [ ] `curl https://…/api/health` trả `{"ok":true}`
- [ ] Điền thử email trên trang chủ, kiểm bằng lệnh D1 ở trên xem có vào bảng không
- [ ] `https://…/sitemap.xml` mở được
- [ ] Mở trên điện thoại thật một lần
