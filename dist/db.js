"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initDatabase = initDatabase;
exports.getPool = getPool;
const promise_1 = __importDefault(require("mysql2/promise"));
let pool = null;
function getConfig() {
    const DB_HOST = process.env.DB_HOST || 'localhost';
    const DB_USER = process.env.DB_USER || 'root';
    const DB_PASSWORD = process.env.DB_PASSWORD ?? '';
    const DB_NAME = process.env.DB_NAME || 'user_management_db';
    return {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASSWORD,
        database: DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        charset: 'utf8mb4',
    };
}
async function initDatabase() {
    const config = getConfig();
    if (!config.password) {
        console.error('[DB] Hata: .env dosyasında DB_PASSWORD boş. MySQL root şifrenizi .env içine yazın.');
        throw new Error('DB_PASSWORD gerekli. .env dosyasını düzenleyin.');
    }
    // 1. Veritabanı yoksa oluştur (database olmadan bağlan)
    const conn = await promise_1.default.createConnection({
        host: config.host,
        user: config.user,
        password: config.password,
    });
    console.log('[DB] Veritabanı kontrol ediliyor/oluşturuluyor...');
    await conn.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await conn.end();
    // 2. Pool'u oluştur
    pool = promise_1.default.createPool(config);
    console.log('[DB] Tablo kontrol ediliyor/oluşturuluyor...');
    // 3. Tabloyu oluştur (yoksa)
    await pool.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
      ad_soyad VARCHAR(80) NOT NULL,
      email VARCHAR(150) NOT NULL UNIQUE,
      yas TINYINT UNSIGNED NOT NULL,
      cinsiyet ENUM('Erkek', 'Kadın', 'Diğer') NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_yas (yas),
      INDEX idx_cinsiyet (cinsiyet)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `);
    // 4. Örnek veri yoksa 50 kayıt ekle
    const [rows] = await pool.query('SELECT COUNT(*) AS cnt FROM users');
    const count = rows[0]?.cnt ?? 0;
    if (count === 0) {
        console.log('[DB] Örnek veriler ekleniyor (50 kayıt)...');
        await pool.query(`
      INSERT INTO users (ad_soyad, email, yas, cinsiyet) VALUES
      ('Ahmet Yılmaz', 'ahmet@example.com', 25, 'Erkek'),
      ('Ayşe Demir', 'ayse@example.com', 32, 'Kadın'),
      ('Mehmet Kaya', 'mehmet@example.com', 45, 'Erkek'),
      ('Fatma Şahin', 'fatma@example.com', 28, 'Kadın'),
      ('Ali Özkan', 'ali@example.com', 19, 'Erkek'),
      ('Zeynep Arslan', 'zeynep.arslan@example.com', 36, 'Kadın'),
      ('Mustafa Çelik', 'mustafa.celik@example.com', 52, 'Erkek'),
      ('Elif Koç', 'elif.koc@example.com', 24, 'Kadın'),
      ('Burak Aydın', 'burak.aydin@example.com', 27, 'Erkek'),
      ('Ceren Kaplan', 'ceren.kaplan@example.com', 31, 'Kadın'),
      ('Deniz Kılıç', 'deniz.kilic@example.com', 22, 'Diğer'),
      ('Emre Aksoy', 'emre.aksoy@example.com', 34, 'Erkek'),
      ('Gamze Doğan', 'gamze.dogan@example.com', 29, 'Kadın'),
      ('Hakan Eren', 'hakan.eren@example.com', 41, 'Erkek'),
      ('İrem Karaca', 'irem.karaca@example.com', 26, 'Kadın'),
      ('Kaan Yıldırım', 'kaan.yildirim@example.com', 23, 'Erkek'),
      ('Lale Öztürk', 'lale.ozturk@example.com', 39, 'Kadın'),
      ('Mert Sarı', 'mert.sari@example.com', 33, 'Erkek'),
      ('Nazan Güler', 'nazan.guler@example.com', 47, 'Kadın'),
      ('Okan Polat', 'okan.polat@example.com', 38, 'Erkek'),
      ('Pelin Kurt', 'pelin.kurt@example.com', 21, 'Kadın'),
      ('Ramazan Uçar', 'ramazan.ucar@example.com', 54, 'Erkek'),
      ('Seda İnce', 'seda.ince@example.com', 30, 'Kadın'),
      ('Tolga Arı', 'tolga.ari@example.com', 43, 'Erkek'),
      ('Ufuk Taş', 'ufuk.tas@example.com', 37, 'Erkek'),
      ('Vildan Şen', 'vildan.sen@example.com', 35, 'Kadın'),
      ('Yasin Bal', 'yasin.bal@example.com', 29, 'Erkek'),
      ('Zeliha Korkmaz', 'zeliha.korkmaz@example.com', 48, 'Kadın'),
      ('Baran Tunç', 'baran.tunc@example.com', 20, 'Erkek'),
      ('Cansu Acar', 'cansu.acar@example.com', 19, 'Kadın'),
      ('Doruk Usta', 'doruk.usta@example.com', 24, 'Erkek'),
      ('Ece Nazlı', 'ece.nazli@example.com', 27, 'Kadın'),
      ('Furkan Ersoy', 'furkan.ersoy@example.com', 31, 'Erkek'),
      ('Gizem Peker', 'gizem.peker@example.com', 33, 'Kadın'),
      ('Halil Yaman', 'halil.yaman@example.com', 44, 'Erkek'),
      ('İdil Güçlü', 'idil.guclu@example.com', 28, 'Kadın'),
      ('Kerem Demirtaş', 'kerem.demirtas@example.com', 36, 'Erkek'),
      ('Leyla Erdem', 'leyla.erdem@example.com', 42, 'Kadın'),
      ('Murat Yiğit', 'murat.yigit@example.com', 50, 'Erkek'),
      ('Nisa Tunalı', 'nisa.tunali@example.com', 23, 'Kadın'),
      ('Onur Sezer', 'onur.sezer@example.com', 40, 'Erkek'),
      ('Pınar Yalçın', 'pinar.yalcin@example.com', 34, 'Kadın'),
      ('Rıza Özer', 'riza.ozer@example.com', 55, 'Erkek'),
      ('Sinem Güneş', 'sinem.gunes@example.com', 38, 'Kadın'),
      ('Taylan Kar', 'taylan.kar@example.com', 46, 'Erkek'),
      ('Umut Sağlam', 'umut.saglam@example.com', 32, 'Erkek'),
      ('Yelda Gök', 'yelda.gok@example.com', 41, 'Kadın'),
      ('Zafer Alkan', 'zafer.alkan@example.com', 60, 'Erkek'),
      ('Nilay Boz', 'nilay.boz@example.com', 52, 'Kadın'),
      ('Serkan Duru', 'serkan.duru@example.com', 58, 'Erkek'),
      ('Hilal Aydın', 'hilal.aydin@example.com', 18, 'Kadın');
    `);
    }
    else {
        console.log(`[DB] Mevcut kullanıcı sayısı: ${count}, örnek veri eklenmedi.`);
    }
    console.log('[DB] Hazır.');
}
function getPool() {
    if (!pool) {
        throw new Error('Database pool henüz başlatılmadı. Önce initDatabase() çağrılmalı.');
    }
    return pool;
}
