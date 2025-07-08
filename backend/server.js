import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import { sql } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import { aj } from "./lib/arcjet.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json()); //JSON formatında veri gönderdiğinde, bu veri req.body üzerinden kolayca erişilebilir olur.
app.use(cors());
app.use(helmet()); //XSS, tıklama kaçakçılığı (clickjacking) ve bazı diğer saldırı türlerine karşı ek koruma sağlar
app.use(morgan("dev"));

// `"combined"`: Apache tarzı ayrıntılı log (IP, zaman, method, URL, status, user-agent vs.)
// `"common"`  : Daha sade Apache tarzı log.
// `"short"`   : Kısa ve özet log formatı.
// `"tiny"`    : Çok kısa, sadece temel bilgiler.
// `"dev"`     : Renkli ve okunabilir, geliştirme için uygun.

// Arcjet
app.use(async (req, res, next) => {
  try {
    // Her gelen isteği Arcjet'e gönderiyoruz ve analiz edilmesini istiyoruz.
    // "requested: 1" ile her isteğin 1 token harcamasını sağlıyoruz (rate limiting için).
    const decision = await aj.protect(req, {
      requested: 1, // Her istek 1 token harcar, rate limit için kullanılır
    });

    // Eğer Arcjet isteği reddederse (örneğin rate limit veya bot tespiti nedeniyle)
    if (decision.isDenied()) {
      // Eğer sebep rate limit ise (çok fazla istek atılmışsa)
      if (decision.reason.isRateLimit()) {
        res.status(429).json({ error: "Çok Fazla İstek Gönderildi (Too Many Requests)" });
        // Eğer sebep bot ise (kötü amaçlı bot tespit edilmişse)
      } else if (decision.reason.isBot()) {
        res.status(403).json({ error: "Bot erişimi engellendi (Bot access denied)" });
        // Diğer tüm reddedilme durumlarında
      } else {
        res.status(403).json({ error: "Erişim engellendi (Forbidden)" });
      }
      return; // İsteği burada sonlandırıyoruz, sonraki middleware'lere geçmiyor
    }

    // Eğer istek sahte bir bot tarafından gönderilmişse (ör: user-agent sahteciliği)
    if (decision.results.some((result) => result.reason.isBot() && result.reason.isSpoofed())) {
      res.status(403).json({ error: "Sahte bot tespit edildi (Spoofed bot detected)" });
      return; // İsteği burada sonlandırıyoruz
    }

    // Eğer yukarıdaki engellemelerden hiçbiri gerçekleşmezse, isteğe devam et (diğer middleware veya route'a geç)
    next();
  } catch (error) {
    // Arcjet ile ilgili bir hata oluşursa, hatayı konsola yaz ve Express hata yakalayıcısına ilet
    console.log("Arcjet hatası:", error);
    next(error);
  }
});

app.use("/api/products", productRoutes);

async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        image VARCHAR(255) NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log("Database initialized successfully");
  } catch (error) {
    console.log("Error initDB", error);
  }
}
initDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on port " + PORT);
  });
});
