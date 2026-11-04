# Aplikasi Toko Online Sederhana (Node.js + Express + MySQL XAMPP)

## Cara menjalankan
1. Buka XAMPP Control Panel, Start **MySQL** (port 3307 di komputermu).
2. Buka phpMyAdmin (http://localhost/phpmyadmin) > tab **Import** > pilih `db.sql` > Import.
3. Buka terminal di folder project ini:
   npm install
   npm start
4. Buka di browser:
   - Pembeli: http://localhost:3000
   - Admin:   http://localhost:3000/admin.html

## Mengubah pengaturan
- Nama toko: `public/config.js`
- Port/user MySQL: bagian `createPool` di `server.js`
