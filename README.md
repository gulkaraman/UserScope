# UserScope

**Kullanıcı Yönetimi ve Dağılım Grafikleri** · TUG Staj Projesi

Node.js (Express) + MySQL ile kullanıcı CRUD uygulaması, çok dilli arayüz ve yaş/cinsiyet dağılım grafikleri. Kullanıcıları “scope” ile izleyin — listeleme, grafikler ve temalı arayüz.

---

## 📋 İçindekiler

- [Proje Hakkında](#-proje-hakkında)
- [Özellikler](#-özellikler)
- [Teknolojiler](#-teknolojiler)
- [Proje Yapısı](#-proje-yapısı)
- [Kurulum](#-kurulum)
- [Yapılandırma](#-yapılandırma)
- [Çalıştırma](#-çalıştırma)
- [API Dokümantasyonu](#-api-dokümantasyonu)
- [Kullanım Kılavuzu](#-kullanım-kılavuzu)
- [Veritabanı](#-veritabanı)
- [Ekran Görüntüleri ve Temalar](#-ekran-görüntüleri-ve-temalar)
- [Lisans ve Katkı](#-lisans-ve-katkı)

---

## 🎯 Proje Hakkında

**UserScope**, **TUG (Türkiye Ulusal Gözlemevi)** stajı kapsamında geliştirilmiş bir **kullanıcı yönetim sistemi**dir. Kullanıcıların eklenmesi, düzenlenmesi, listelenmesi ve silinmesi (CRUD) işlemlerini sunan bir web uygulaması olup, yaş ve cinsiyet dağılımını görsel grafiklerle gösterir. Arayüz çok dilli (Türkçe, İngilizce, Almanca, Fransızca), açık/koyu tema ve üç farklı görsel tema (Modern, Medieval, Gözlemevi) destekler.

---

## ✨ Özellikler

### Kullanıcı Yönetimi
- **Yeni kullanıcı ekleme** — Ad soyad, e-posta, yaş ve cinsiyet alanları ile kayıt
- **Kullanıcı listeleme** — Tüm kullanıcıların tablo halinde görüntülenmesi
- **Kullanıcı düzenleme** — Mevcut kayıtların güncellenmesi
- **Kullanıcı silme** — Onay ile kayıt silme
- **E-posta benzersizliği** — Aynı e-posta ile tekrar kayıt engeli

### Grafikler Sayfası
- **Yaşa göre dağılım** — Pasta grafik (0–19, 20–29, 30–39, 40–49, 50–59, 60+)
- **Cinsiyete göre dağılım** — Pasta grafik (Erkek, Kadın, Diğer)
- **Grafikten filtreleme** — Dilime tıklayarak ilgili yaş grubu veya cinsiyete göre kullanıcı listesini filtreleme
- **Filtre temizleme** — Tek tıkla tüm kayıtları tekrar gösterme

### Arayüz ve Erişilebilirlik
- **Çok dilli destek (i18n)** — Türkçe, İngilizce, Almanca, Fransızca
- **Açık/Koyu tema** — Gece/gündüz modu, tercih tarayıcıda saklanır
- **Üç görsel tema** — Modern (varsayılan), Medieval, Gözlemevi; tema seçimi kalıcıdır
- **Toast bildirimleri** — Başarı/hata bilgilendirmeleri
- **Responsive tasarım** — Farklı ekran boyutlarına uyum

### Backend
- **REST API** — `/api/users` altında CRUD ve istatistik uçları
- **Sorgu filtreleri** — `?yas=25`, `?yas_min=20&yas_max=29`, `?cinsiyet=Erkek` ile listeleme
- **MySQL** — UTF-8 (utf8mb4) ve InnoDB ile veritabanı
- **Otomatik veritabanı/tablo oluşturma** — İlk çalıştırmada gerekirse DB ve tablo oluşturulur; boş tabloya örnek 50 kayıt eklenir

---

## 🛠 Teknolojiler

| Katman      | Teknoloji |
|------------|-----------|
| Backend    | Node.js, Express, TypeScript (derlenmiş JS) |
| Veritabanı | MySQL (mysql2/promise) |
| Frontend   | Vanilla HTML/CSS/JavaScript |
| Grafikler  | Chart.js (CDN) |
| Diğer      | dotenv, CORS |

---

## 📁 Proje Yapısı

```
typeProjeGithub/
├── dist/                    # Derlenmiş Node.js uygulaması
│   ├── index.js             # Ana sunucu (Express, static, API mount)
│   ├── db.js                # MySQL bağlantı havuzu ve init
│   ├── types.js             # (boş/yardımcı)
│   └── routes/
│       └── users.js         # Kullanıcı CRUD + istatistik API
├── public/                  # Statik frontend
│   ├── index.html           # Kullanıcı listesi ve form sayfası
│   ├── grafikler.html       # Yaş/cinsiyet grafikleri sayfası
│   ├── css/
│   │   └── style.css        # Tüm stiller (tema, şablon, bileşenler)
│   └── js/
│       ├── app.js           # Form, CRUD, liste mantığı
│       ├── layout.js        # Tema, dil, şablon seçici (i18n)
│       ├── charts.js        # Chart.js grafikleri ve filtreleme
│       └── toast.js         # Toast bildirimleri
├── database.sql             # Veritabanı şeması ve örnek veriler (manuel import için)
├── .env.example             # Örnek ortam değişkenleri
└── README.md                # Bu dosya
```

---

## 🚀 Kurulum

### Gereksinimler

- **Node.js** (v14 veya üzeri önerilir)
- **MySQL** (5.7 veya 8.x) — sunucu çalışır durumda olmalı

### Adımlar

1. **Projeyi klonlayın veya indirin**
   ```bash
   cd C:\Users\monster\Desktop\typeProjeGithub
   ```

2. **Bağımlılıkları yükleyin**  
   Proje kökünde `package.json` yoksa aşağıdaki ile oluşturup `npm install` çalıştırın:
   ```bash
   npm init -y
   npm install express cors mysql2 dotenv
   ```

3. **Ortam değişkenlerini ayarlayın**  
   `.env.example` dosyasını `.env` olarak kopyalayıp kendi MySQL bilgilerinizi girin:
   ```bash
   copy .env.example .env
   ```
   `.env` içeriği örnek:
   ```env
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=user_management_db
   PORT=3000
   ```

4. **Veritabanını oluşturun (isteğe bağlı)**  
   Uygulama ilk çalıştırmada veritabanı ve tabloyu kendisi oluşturabilir. İsterseniz manuel import için:
   ```bash
   mysql -u root -p < database.sql
   ```

5. **Sunucuyu başlatın**
   ```bash
   node dist/index.js
   ```
   Tarayıcıda: **http://localhost:3000**

---

## ⚙️ Yapılandırma

| Değişken      | Açıklama           | Varsayılan          |
|---------------|--------------------|---------------------|
| `DB_HOST`     | MySQL sunucu       | `localhost`         |
| `DB_USER`     | MySQL kullanıcı    | `root`              |
| `DB_PASSWORD` | MySQL şifre        | *(zorunlu)*         |
| `DB_NAME`     | Veritabanı adı     | `user_management_db`|
| `PORT`        | Uygulama portu     | `3000`              |

---

## ▶️ Çalıştırma

- **Geliştirme:**  
  `node dist/index.js`  
  Konsolda `Sunucu http://localhost:3000 adresinde çalışıyor.` mesajını görmelisiniz.

- **Sayfalar:**
  - **Kullanıcılar:** http://localhost:3000/
  - **Grafikler:** http://localhost:3000/grafikler

- **İlk çalıştırmada:**  
  Veritabanı ve tablo yoksa oluşturulur; `users` tablosu boşsa 50 örnek kullanıcı eklenir.

---

## 📡 API Dokümantasyonu

Tüm uçlar **`/api/users`** prefix’i ile kullanılır.

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| `GET`  | `/api/users` | Tüm kullanıcıları listeler (opsiyonel sorgu parametreleri ile filtre) |
| `GET`  | `/api/users/stats/age` | Yaş gruplarına göre sayılar (0-19, 20-29, …) |
| `GET`  | `/api/users/stats/gender` | Cinsiyete göre sayılar |
| `GET`  | `/api/users/:id` | Tek kullanıcı (404 yoksa) |
| `POST` | `/api/users` | Yeni kullanıcı (body: ad_soyad, email, yas, cinsiyet) |
| `PUT`  | `/api/users/:id` | Kullanıcı güncelle |
| `DELETE` | `/api/users/:id` | Kullanıcı sil (204) |

### Sorgu parametreleri (GET /api/users)

- `yas` — Tam yaş (örn. `?yas=25`)
- `yas_min`, `yas_max` — Yaş aralığı (örn. `?yas_min=20&yas_max=29`)
- `cinsiyet` — Erkek | Kadın | Diğer (örn. `?cinsiyet=Erkek`)

Örnek:
```http
GET /api/users?yas_min=20&yas_max=29&cinsiyet=Kadın
```

### İstek/cevap örnekleri

**POST /api/users** — Body:
```json
{
  "ad_soyad": "Test Kullanıcı",
  "email": "test@example.com",
  "yas": 28,
  "cinsiyet": "Erkek"
}
```
- 201: Oluşturulan kullanıcı nesnesi  
- 400: Eksik alan veya duplicate email

**PUT /api/users/:id** — Body: Güncellenecek alanlar (kısmi güncelleme desteklenir).

---

## 📖 Kullanım Kılavuzu

1. **Kullanıcı ekleme:** Formu doldurup "Kaydet"e tıklayın. E-posta benzersiz olmalıdır.
2. **Düzenleme:** Listede "Düzenle"ye tıklayın, formu değiştirip "Güncelle" ile kaydedin.
3. **Silme:** "Sil"e tıklayıp onaylayın.
4. **Dil:** Sağ üstteki dil seçiciden Türkçe, İngilizce, Almanca veya Fransızca seçin.
5. **Tema:** Aynı bölgedeki ay/güneş anahtarı ile açık/koyu moda geçin.
6. **Görsel tema:** "Tema" butonu ile Modern, Medieval veya Gözlemevi temasını seçin; ilk açılışta tema seçim ekranı çıkabilir.
7. **Grafikler:** "Grafikler" sayfasında pasta grafiklerde bir dilime tıklayarak o gruba göre kullanıcı listesini filtreleyin; "Filtreyi temizle" ile tüm listeye dönün.

---

## 🗄 Veritabanı

- **Veritabanı adı:** `user_management_db` (varsayılan)
- **Karakter seti:** utf8mb4, collation: utf8mb4_unicode_ci

### `users` tablosu

| Sütun       | Tip        | Açıklama |
|-------------|------------|----------|
| id          | INT UNSIGNED, PK, AUTO_INCREMENT | Birincil anahtar |
| ad_soyad    | VARCHAR(80) | Ad soyad |
| email       | VARCHAR(150), UNIQUE | E-posta |
| yas         | TINYINT UNSIGNED | Yaş (1–120) |
| cinsiyet    | ENUM('Erkek','Kadın','Diğer') | Cinsiyet |
| created_at  | TIMESTAMP  | Oluşturulma |
| updated_at  | TIMESTAMP  | Son güncelleme |

İndeksler: `yas`, `cinsiyet` (sorgu performansı için).

Şema ve örnek veriler manuel import için `database.sql` dosyasında bulunur.

---

## 🎨 Ekran Görüntüleri ve Temalar

- **Modern (varsayılan):** Cam efektli kartlar, mor vurgular, gradient arka plan.
- **Medieval:** Parşömen dokuları, sıcak tonlar.
- **Gözlemevi:** Koyu uzay arka planı, kozmik renkler.

Tüm sayfalarda header’da dil, tema ve görsel tema kontrolleri ortaktır; tercihler `localStorage` ile saklanır.

---

## 📄 Lisans ve Katkı

Bu proje **TUG staj projesi** olarak hazırlanmıştır. İstediğiniz gibi inceleyebilir ve geliştirmelerinizi kendi fork’unuzda yapabilirsiniz. Soru veya katkı için proje sahibi ile iletişime geçebilirsiniz.

---

**Hazırlayan:** <a href="gulkaraman.com">Gül Karaman</a>

