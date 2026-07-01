# ADUMAS — Aduan Mahasiswa

## Fitur

**Sisi mahasiswa**
- Sign in (mock auth berbasis email)
- Buat aduan (judul + isi)
- Konfirmasi "Aduan Terkirim"
- Riwayat aduan (status selesai / diproses)
- Tracking aduan
- Bottom navigation (Home / Tracking)

**Sisi admin**
- Login dengan email `admin@mhs.id` (password bebas)
- Dashboard: total aduan, jumlah minggu ini, jumlah yang masih diproses
- Daftar semua aduan dari seluruh mahasiswa
- Tandai aduan selesai / hapus aduan
- Cari aduan berdasarkan nomor atau judul

## Struktur folder

```
adumas/
├── index.html      # Sign In
├── home.html       # Home (Buat Aduan / Riwayat Aduan)
├── create.html      # Buat Aduan
├── success.html    # Aduan Terkirim
├── history.html     # Riwayat Aduan
├── tracking.html    # Tracking Aduan
├── admin.html       # Dashboard admin
├── assets/
│   ├── css/style.css
│   └── js/app.js    # storage & session helpers (localStorage)
└── README.md
```

## Login demo

| Peran      | Email               | Password       |
|------------|---------------------|-----------------|
| Mahasiswa  | yesking0000@mhs.id  | apa saja        |
| Admin      | admin@mhs.id        | apa saja        |

(Auth ini hanya mock untuk keperluan demo UI — belum ada verifikasi password
sungguhan. Untuk produksi, sambungkan `assets/js/app.js` ke API/backend asli.)

## Menjalankan secara lokal

Tidak perlu instalasi apa pun. Cukup buka `index.html` langsung di browser,
atau jalankan server statis sederhana:
