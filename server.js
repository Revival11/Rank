// Import express framework
const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Middleware untuk parsing JSON (jika kamu memerlukan parsing body request)
app.use(express.json());

// Rute untuk halaman pembayaran
app.get('/payment', (req, res) => {
  // Mengirim file index.html sebagai halaman pembayaran
  res.sendFile(path.join(__dirname, 'index.html')); // Sesuaikan dengan lokasi file index.html
});

// Rute untuk halaman konfirmasi pembayaran
app.get('/confirmation', (req, res) => {
  // Mengirim file confirmation.html sebagai halaman konfirmasi pembayaran
  res.sendFile(path.join(__dirname, 'confirmation.html')); // Sesuaikan dengan lokasi file confirmation.html
});

// Rute untuk memproses pembayaran (contoh sederhana)
app.post('/process-payment', (req, res) => {
  const { amount, method } = req.body; // Mengambil data dari request body
  // Logika pembayaran di sini, misalnya validasi atau pemrosesan
  if (amount && method) {
    res.json({ message: 'Pembayaran berhasil!', status: 'success' });
  } else {
    res.status(400).json({ message: 'Pembayaran gagal. Data tidak valid.', status: 'error' });
  }
});

// Menjalankan server
app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
