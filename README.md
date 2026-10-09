# Seyyah — Landing Page

B2B turizm satış ve dağıtım platformu Seyyah'ın tanıtım sayfası. Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Lucide.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

## Yapılandırma

| Değişken | Amaç |
|---|---|
| `APPLICATION_WEBHOOK_URL` | Başvuru formunun JSON olarak iletileceği adres (Zapier, Make, n8n, Slack, kendi API'niz). **Tanımlı değilse form başvuruyu kaydetmez ve kullanıcıya bunu açıkça söyler.** |
| `NEXT_PUBLIC_SITE_URL` | Canonical / Open Graph mutlak URL'leri için alan adı. |

## İçerik ve özellik durumları

Tüm metinler ve özellik durumları `src/content/site.ts` içinde. Her özelliğin `status` alanı sayfadaki etiketi belirler: `live` (etiketsiz), `soon` ("Yakında"), `planned` ("Planlanan"). Bir modül canlıya alınmadan `live` yapılmamalı.

## Yayından önce

- `/yasal/*` sayfaları yer tutucu — Gizlilik, Kullanım Koşulları ve KVKK metinleri eklenmeli.
- `/giris` gerçek bir giriş ekranı değil; panel hazır olduğunda değiştirilmeli.
- Entegrasyonlar bölümüne yalnızca canlı entegrasyonların logoları eklenmeli.
- Görseller Unsplash lisansıyla `public/images` altında.
