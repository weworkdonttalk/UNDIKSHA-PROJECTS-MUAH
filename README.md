# NUSAVA (Nusantara Mahakarya)
> **Platform Digital Pelestarian Warisan Budaya, Edukasi Interaktif, dan Pemberdayaan Kriya Maestro Nusantara**  
> Karya Resmi untuk Lomba Web Design **TECHTOPIA Vol. 2 · INTEGER#8** · Universitas Pendidikan Ganesha (UNDIKSHA)

---

## 🌟 1. Ringkasan Proyek

**NUSAVA** adalah platform web terpadu yang dirancang untuk menjembatani generasi muda Indonesia dengan warisan budaya adiluhung bangsa. Menggabungkan estetika visual hangat khas nusantara, teknologi interaktif web modern, serta pemberdayaan ekonomi riil bagi sanggar pengrajin dan pelaku UMKM budaya lokal.

### 🎯 Keselarasan 3 Subtema Lomba:
1. **Kebudayaan**: Eksplorasi warisan budaya takbenda (WBTb) Indonesia yang diakui UNESCO dan Kemendikbudristek, mulai dari Tenun Ikat Sumba, Batik Tulis Giriloyo, Keris Madura, Gamelan Jawa, hingga Seni Perak Celuk Bali. Dilengkapi ensiklopedia filosofi motif dan jurnal kuratorial.
2. **Pendidikan**: Wahana edukasi gamifikasi interaktif melalui *Game Penjelajah Pusaka Nusantara* (kanvas 2D) dengan kuis kebudayaan, fakta sejarah, serta asisten virtual cerdas *NusaBot* yang menjawab pertanyaan seputar kebudayaan lokal secara langsung.
3. **Ekonomi Kreatif & UMKM**: Etalase marketplace langsung ke sanggar pengrajin nusantara (*fair-trade*), kalkulator pesanan, invoice pesanan, serta integrasi pemesanan sanggar via simulasi WhatsApp Checkout dan Dasbor Manajemen Studio Pengrajin.

---

## 📑 2. Daftar 9 Halaman Website

Platform ini dibangun dengan 9 halaman statis terintegrasi (memenuhi batas maksimal 10 halaman ketentuan lomba):

| No | File Halaman | Deskripsi & Fitur Utama |
|---|---|---|
| 1 | `index.html` | **Landing Page Utama**: Banner sinematik, Peta Interaktif 8 Zona Budaya Indonesia, Kurasi Karya Adiluhung, Jurnal Maestro, Suara Budaya Nusantara, dan Asisten AI NusaBot. |
| 2 | `marketplace.html` | **Pasar Kriya Nusantara**: Etalase karya pengrajin dengan filter multi-kategori (Wastra, Kriya, Musik, Wayang), filter zona daerah nusantara, pengurutan harga/populer, dan keranjang belanja terintegrasi. |
| 3 | `product-detail.html` | **Detail Mahakarya & Narasi Filosofi**: Galeri foto fidelitas tinggi, sertifikasi keaslian karya, narasi filosofi maestro pembuat, spesifikasi bahan alami, dan konsultasi kurator sanggar. |
| 4 | `checkout.html` | **Penyelesaian Pesanan**: Rincian belanja dinamis, formulir data pemesan, pilihan kurir pengiriman terintegrasi, metode pembayaran (Virtual Account, QRIS, Sanggar WhatsApp), serta modal invoice instan. |
| 5 | `dashboard.html` | **Studio & Dasbor Pengrajin**: Manajemen toko sanggar mitra, metrik performa pesanan, tambah/edit karya pusaka, ringkasan logistik pengiriman, dan riwayat pesanan masuk. |
| 6 | `game.html` | **Game Edukasi "Penjelajah Pusaka"**: Game petualangan platformer kanvas 2D, mekanika mengumpulkan pusaka nusantara, tantangan kuis pengetahuan budaya, serta HUD informasi skor dan nyawa. |
| 7 | `profile.html` | **Arsip Kolektor & Akun**: Profil pelestari budaya, arsip sertifikat kepemilikan karya pusaka, riwayat transaksi pesanan, dan preferensi akun. |
| 8 | `login.html` | **Gerbang Masuk Pengguna**: Masuk akun untuk kolektor atau pengrajin sanggar dengan validasi formulir dan fitur demo sekali klik. |
| 9 | `daftar.html` | **Pendaftaran Akun Baru**: Formulir registrasi peran Pengrajin Sanggar atau Apresiator/Kolektor Budaya dengan validasi data interaktif. |

---

## 🛠️ 3. Teknologi & Spesifikasi Teknis

Sesuai ketentuan teknis TECHTOPIA Vol. 2, seluruh aplikasi dibangun murni berbasis **Front-End Statis** tanpa ketergantungan server runtime Node.js/PHP:

- **Bahasa Inti**:
  - Semantic HTML5 (struktur bersih, accessible, lang="id", meta viewport responsif)
  - CSS3 Modern (Custom properties/CSS Variables, CSS Grid, Flexbox, Keyframe Animations)
  - Vanilla JavaScript ES6+ (DOM Manipulation, Web Audio API, Canvas 2D API, LocalStorage State Sync)
- **Framework CSS & Styling**:
  - [Tailwind CSS CDN](https://cdn.tailwindcss.com) (didukung konfigurasi terpusat pada `js/tailwind-config.js`)
  - Google Fonts (`Cinzel`, `Playfair Display`, `Cormorant Garamond`, `Plus Jakarta Sans`)
- **Ikonografi**:
  - [Lucide Icons CDN](https://unpkg.com/lucide@latest)
- **Performa & Kompatibilitas**:
  - Kompatibel di seluruh peramban modern (Google Chrome, Mozilla Firefox, Microsoft Edge, Safari)
  - Responsif penuh dari layar smartphone (360px) hingga layar desktop ultra-wide (1920px+)

---

## 📂 4. Struktur Folder & Berkas Proyek

```text
UNDIKSHA-PROJECTS-MUAH/
├── index.html                   # Beranda / Landing page
├── marketplace.html             # Katalog pasar karya kriya & wastra
├── product-detail.html          # Halaman kurasi & narasi karya
├── checkout.html                # Alur checkout & invoice pesanan
├── dashboard.html               # Studio dasbor manajemen pengrajin
├── game.html                    # Game interaktif edukasi budaya nusantara
├── profile.html                 # Profil kolektor & arsip pesanan
├── login.html                   # Halaman masuk
├── daftar.html                  # Halaman pendaftaran akun
├── README.md                    # Dokumentasi resmi proyek Nusava
│
├── css/                         # Berkas gaya tampilan
│   ├── style.css                # Styling global dan interaksi landing page
│   ├── design-system.css        # Token desain, tipografi, warna, dan komponen dasar
│   ├── marketplace.css          # Desain tata letak katalog pasar karya
│   ├── product-detail.css       # Desain halaman narasi dan kurasi mahakarya
│   ├── dashboard.css            # Desain tata letak dasbor studio pengrajin
│   └── game.css                 # Desain antarmuka kanvas dan HUD game budaya
│
├── js/                          # Berkas logika interaktif (Vanilla JavaScript)
│   ├── tailwind-config.js       # Konfigurasi bersama Tailwind CSS
│   ├── main.js                  # Logika interaktif landing page, audio, dan peta nusantara
│   ├── products-data.js         # Single source of truth basis data produk & karya pusaka
│   ├── marketplace.js           # Controller katalog pasar kriya, filter, dan sorting
│   ├── product-detail.js        # Controller interaksi halaman detail dan galeri
│   ├── checkout.js              # Controller alur checkout, invoice, dan simulasi pembayaran
│   ├── dashboard.js             # Controller metrik toko, CRUD karya, dan logistik pengrajin
│   ├── game.js                  # Engine canvas game penjelajah budaya nusantara
│   ├── game-data.js             # Level data, kuis budaya, dan konfigurasi aset sprite
│   ├── profile.js               # Controller tab profil pengguna dan arsip pesanan
│   ├── auth.js                  # Sesi pengguna terpadu dan sinkronisasi navbar lintas-halaman
│   ├── login.js                 # Logika autentikasi halaman masuk
│   ├── daftar.js                # Logika registrasi akun baru
│   └── chatbot.js               # Logika asisten interaktif budaya "NusaBot"
│
└── assets/                      # Berkas aset multimedia
    ├── images/                  # Aset visual latar belakang, wayang, ornamen, dan logo
    │   └── content/             # Foto karya kriya, wastra, dan maestro pengrajin
    ├── icons/                   # Ikon grafis dan avatar NusaBot
    ├── game/                    # Sprite karakter, latar level kanvas, dan sound efek game
    └── video/                   # Video sinematik latar belakang budaya nusantara
```

---

## 🚀 5. Cara Menjalankan Proyek Secara Lokal

1. **Unduh atau Klon Repositori**:
   ```bash
   git clone https://github.com/weworkdonttalk/UNDIKSHA-PROJECTS-MUAH.git
   ```
2. **Buka Proyek**:
   - Masuk ke direktori proyek.
   - Buka berkas `index.html` menggunakan peramban modern (cukup klik dua kali pada berkas `index.html`), **ATAU**
   - Buka menggunakan ekstensi *Live Server* pada Visual Studio Code / IDE favorit Anda untuk pengalaman navigasi yang optimal.
3. **Akses Halaman Online (GitHub Pages)**:
   - Situs ini dapat diakses secara langsung melalui:  
     `https://weworkdonttalk.github.io/UNDIKSHA-PROJECTS-MUAH/`

---

## 🏛️ 6. Pernyataan Orisinalitas & Sumber Daya

Proyek ini dikembangkan secara orisinal oleh tim pengembang untuk mengikuti **TECHTOPIA Vol. 2 · INTEGER#8 Undiksha**.  
- Seluruh kode antarmuka HTML, CSS, dan logika JavaScript ditulis secara mandiri sesuai petunjuk teknis lomba.
- Aset multimedia pendukung digunakan dalam batas edukatif dan non-komersial untuk merepresentasikan kekayaan ragam budaya Nusantara.

---
*© 2024–2026 Tim Pengembang Nusava — Undiksha TECHTOPIA Vol. 2 INTEGER#8.*
