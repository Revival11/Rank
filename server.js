const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const path = require('path');

let transactions = []; // Array untuk menyimpan data transaksi

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Hidupkan file HTML langsung dari root folder
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Akses untuk halaman admin yang tetap bernama confirmation.html
app.get('/confirmation.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'confirmation.html'));
});

// Endpoint untuk memproses pembayaran
app.post('/process-payment', (req, res) => {
    const { gamertag, rank, duration, totalPrice } = req.body;

    // Simulasi saldo Dana
    let danaBalance = 20000; // Ganti dengan response dari API Dana

    if (danaBalance >= totalPrice) {
        // Simpan data transaksi
        const transaction = {
            gamertag: gamertag,
            rank: rank,
            duration: duration,
            totalPrice: totalPrice,
            timestamp: new Date().toISOString()
        };
        transactions.push(transaction);
        
        // Simpan ke file jika perlu
        fs.writeFileSync(path.join(__dirname, 'transactions.json'), JSON.stringify(transactions, null, 2));

        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// Endpoint untuk mendapatkan data transaksi untuk admin
app.get('/get-transactions', (req, res) => {
    res.json({ transactions: transactions });
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
