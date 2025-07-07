import arcjet, { tokenBucket, shield, detectBot } from "@arcjet/node";
import dotenv from "dotenv";

dotenv.config();

// arcjet'i başlat
export const aj = arcjet({
  key: process.env.ARCJET_KEY, // Güvenlik için Arcjet API anahtarı .env dosyasından alınır
  characteristics: ["ip.src"], // Her istekte kaynak IP adresi (ip.src) üzerinden analiz yapılır
  rules: [
    // 1. shield: Uygulamanı yaygın saldırılara karşı korur (ör: SQL injection, XSS, CSRF)
    shield({ mode: "LIVE" }),

    // 2. detectBot: Bot tespiti yapar
    detectBot({
      mode: "LIVE",
      // Sadece arama motoru botlarına izin ver, diğer tüm botları engelle
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Arama motoru botları (Google, Bing, vs.)
        // Diğer izin verilen bot kategorileri için: https://arcjet.com/bot-list
      ],
    }),

    // 3. tokenBucket: Oran sınırlaması (rate limiting) uygular
    tokenBucket({
      mode: "LIVE",
      refillRate: 30, // Her 5 saniyede 30 token eklenir
      interval: 5, // 5 saniyede bir yenileme yapılır
      capacity: 20, // Maksimum 20 token tutulabilir (ani yüklenmeleri engeller)
    }),
  ],
});
