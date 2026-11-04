const express = require('express');
const mysql = require('mysql2/promise');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createPool({
  host: '127.0.0.1',
  port: 3307,
  user: 'root',
  password: '',
  database: 'toko'
});

// Validasi input produk
function validProduk(b) {
  return b && String(b.nama || '').trim() &&
    Number.isInteger(+b.harga) && +b.harga >= 0 &&
    Number.isInteger(+b.stok) && +b.stok >= 0;
}

// GET semua produk
app.get('/api/barang', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM produk ORDER BY kode');
    res.json(rows);
  } catch (e) { res.status(500).json({ pesan: 'Gagal mengambil data' }); }
});

// POST tambah produk
app.post('/api/barang', async (req, res) => {
  const b = req.body;
  if (!String(b.kode || '').trim() || !validProduk(b))
    return res.status(400).json({ pesan: 'Data tidak valid' });
  try {
    await db.query('INSERT INTO produk (kode, nama, harga, stok) VALUES (?,?,?,?)',
      [b.kode.trim(), b.nama.trim(), +b.harga, +b.stok]);
    res.status(201).json({ pesan: 'Produk ditambahkan' });
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ pesan: 'Kode produk sudah ada' });
    res.status(500).json({ pesan: 'Gagal menyimpan' });
  }
});

// PUT ubah produk
app.put('/api/barang/:id', async (req, res) => {
  const b = req.body;
  if (!validProduk(b)) return res.status(400).json({ pesan: 'Data tidak valid' });
  try {
    const [r] = await db.query('UPDATE produk SET nama=?, harga=?, stok=? WHERE kode=?',
      [b.nama.trim(), +b.harga, +b.stok, req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ pesan: 'Produk tidak ditemukan' });
    res.json({ pesan: 'Produk diperbarui' });
  } catch (e) { res.status(500).json({ pesan: 'Gagal memperbarui' }); }
});

// DELETE hapus produk
app.delete('/api/barang/:id', async (req, res) => {
  try {
    const [r] = await db.query('DELETE FROM produk WHERE kode=?', [req.params.id]);
    if (!r.affectedRows) return res.status(404).json({ pesan: 'Produk tidak ditemukan' });
    res.json({ pesan: 'Produk dihapus' });
  } catch (e) { res.status(500).json({ pesan: 'Gagal menghapus' }); }
});

app.listen(3000, () => console.log('Server jalan di http://localhost:3000'));
