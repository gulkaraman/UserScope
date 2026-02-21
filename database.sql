


CREATE DATABASE IF NOT EXISTS user_management_db
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE user_management_db;

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

-- Örnek veriler (isteğe bağlı)
INSERT INTO users (ad_soyad, email, yas, cinsiyet) VALUES
('Ahmet Yılmaz', 'ahmet@example.com', 25, 'Erkek'),
('Ayşe Demir', 'ayse@example.com', 32, 'Kadın'),
('Mehmet Kaya', 'mehmet@example.com', 45, 'Erkek'),
('Fatma Şahin', 'fatma@example.com', 28, 'Kadın'),
('Ali Özkan', 'ali@example.com', 19, 'Erkek'),
('Zeynep Arslan', 'zeynep@example.com', 36, 'Kadın'),
('Mustafa Çelik', 'mustafa@example.com', 52, 'Erkek'),
('Elif Koç', 'elif@example.com', 24, 'Kadın'),
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
