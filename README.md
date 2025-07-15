# [BilginStore](https://github.com/Alper-Bilgin/BilginStore)


Bu proje, PostgreSQL (NeonDatabase), Express.js ve React kullanılarak geliştirilmiş basit bir ürün ekleme, güncelleme ve silme işlemleri sunan tam yığın (full-stack) bir web uygulamasıdır.  
Ayrıca, **Arcjet** ile rate limiting (istek sınırlama) uygulanarak güvenlik ve API erişim kontrolü sağlanmaktadır.

## ✨ Özellikler

-  Ürün Ekleme
-  Ürün Güncelleme
-  Ürün Silme
-  Ürün Listeleme
-  Arcjet ile Rate Limiting
-  PostgreSQL (Neon) veritabanı bağlantısı

##  .env dosya içeriği örneği

```
PORT=***
PGUSER=***
PGPASSWORD=***
PGHOST=***
PGDATABASE=***
ARCJET_KEY=***
ARCJET_ENV=development
```

## API

```shell
npm run dev
```

## Frontend

```shell
cd frontend
npm run dev
```

![1](https://github.com/Alper-Bilgin/BilginStore/blob/master/img/1.png)
![3](https://github.com/Alper-Bilgin/BilginStore/blob/master/img/3.png)
![5](https://github.com/Alper-Bilgin/BilginStore/blob/master/img/5.png)
