// index.js
const express = require('express');
const path = require('path');
const db = require('./database'); // Import koneksi database kita

const app = express();
const port = 3000;

// Atur view engine menggunakan EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Sajikan file statis (CSS, gambar) dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// ROUTING (Definisi Rute URL)

// Rute untuk Halaman Home (URL: /)
app.get('/', (req, res) => {
    // Render file 'index.ejs' dan kirim data untuk judul dan menu aktif
    res.render('index', { pageTitle: 'Home', activePage: 'home' });
});

// Rute untuk Halaman About Us (URL: /about)
app.get('/about', (req, res) => {
    res.render('about', { pageTitle: 'About Us', activePage: 'about' });
});

// Rute untuk Halaman Program (URL: /program)
app.get('/program', (req, res) => {
    const sql = "SELECT * FROM programs ORDER BY id";
    db.all(sql, [], (err, rows) => {
        if (err) {
            // Jika ada error database, tampilkan pesan error
            return console.error(err.message);
        }
        // Jika berhasil, render file 'programs.ejs'
        // Kirim data hasil query (rows) dengan nama 'programs'
        res.render('programs', { 
            pageTitle: 'Program Unggulan', 
            activePage: 'program',
            programs: rows // 'programs' ini adalah array berisi data dari tabel
        });
    });
});

// Rute untuk Halaman Contact (URL: /contact)
app.get('/contact', (req, res) => {
    res.render('contact', { pageTitle: 'Hubungi Kami', activePage: 'contact' });
});


// Jalankan server pada port yang ditentukan
app.listen(port, () => {
    console.log(`Server berhasil dijalankan!`);
    console.log(`Buka di browser: http://localhost:${port}`);
});