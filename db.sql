CREATE DATABASE IF NOT EXISTS toko CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE toko;

CREATE TABLE IF NOT EXISTS produk (
  kode  VARCHAR(20)  NOT NULL PRIMARY KEY,
  nama  VARCHAR(100) NOT NULL,
  harga INT UNSIGNED NOT NULL,
  stok  INT UNSIGNED NOT NULL DEFAULT 0
);

INSERT IGNORE INTO produk (kode, nama, harga, stok) VALUES
('P001', 'Beras 5 kg', 68000, 20),
('P002', 'Minyak Goreng 1 L', 17000, 35),
('P003', 'Gula Pasir 1 kg', 16000, 40);
