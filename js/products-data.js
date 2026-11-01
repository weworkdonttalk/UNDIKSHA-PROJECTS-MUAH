/**
 * ==========================================================================
 * NUSAVA — SINGLE SOURCE OF TRUTH: DATA PUSAKA KARYA ADILUHUNG (MARKETPLACE)
 * Kurasi Karya Kriya, Wastra, Seni, dan Instrumen Asli Pengrajin Nusantara
 * Sesuai Standar Kompetisi Web Design TECHTOPIA Vol. 2 · INTEGER#8
 * ==========================================================================
 */

const NUSAVA_PRODUCTS = [
  {
    "id": 1,
    "code": "KRY-001",
    "name": "Kain Tenun Ikat Hinggi Kawuru Sumba",
    "cat": "wastra",
    "catName": "Wastra & Tenun",
    "region": "bali-nusra",
    "regionName": "Bali & Nusa Tenggara",
    "daerah": "Waingapu, Sumba Timur (NTT)",
    "technique": "tenun-ikat",
    "techniqueName": "Tenun Ikat",
    "artisan": "Kelompok Mama Penenun Lambanapu",
    "village": "Desa Adat Lambanapu, Sumba Timur",
    "waPhone": "6281238994411",
    "durationDays": 240,
    "duration": "240 Hari Karya Tangan",
    "durationDisplay": "240 Hari Karya Tangan • Sumba Timur, NTT",
    "material": "100% Katun Pintal Tangan, Pewarna Alami Kulit Akar Mengkudu & Daun Nila",
    "source": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201400144",
    "sourceShort": "WBTb Kemendikbud",
    "price": 3450000,
    "rating": 5.0,
    "sold": 248,
    "badge": "Pewarna Alami",
    "img": "assets/images/content/produk-tenun-sumba.jpg",
    "artisanImg": "assets/images/pengrajin-tenun.jpg",
    "shortDesc": "Ditenun helai demi helai selama 8 bulan dengan 40 kali pencelupan ramuan akar mengkudu dan daun nila liar.",
    "philosophy": "Motif Kuda (Njara) melambangkan harga diri, keberanian, dan kepemimpinan bangsawan Marapu Sumba. Pola Buaya dan Udang di sisi pembatas merefleksikan metamorfosis kehidupan dan perlindungan leluhur bagi pemakainya saat menempuh perjalanan hidup penting.",
    "artisanStory": "Dikerjakan oleh Mama Maria dan 14 ibu penenun di Sanggar Lambanapu. Seluruh proses dilakukan manual di bawah kolong rumah panggung adat. 72% dari nilai karya ini langsung menjadi pendapatan keluarga pengrajin untuk biaya pendidikan anak dan kemandirian pangan desa.",
    "materialCare": "Dibuat dari kapas organik lokal yang dipintal dengan tangan. Warna terakota berasal dari getah akar mengkudu tua, dan warna biru tua pekat berasal dari fermentasi daun indigofera. Perawatan: Jangan dicuci dengan deterjen kimia; angin-anginkan di tempat teduh dengan remasan lerak alami.",
    "dimensions": "240 cm × 120 cm",
    "weight": "850 gram",
    "gallery": [
      "assets/images/content/produk-tenun-sumba.jpg",
      "assets/images/content/jurnal-tenun-lambanapu.jpg",
      "assets/images/pengrajin-tenun.jpg",
      "assets/images/content/produk-tenun-sumba.jpg",
      "assets/images/content/wilayah-bali-kecak.jpg",
      "assets/images/content/jurnal-tenun-lambanapu.jpg",
      "assets/images/content/produk-tenun-sumba.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "WARISAN LELUHUR MARAPU",
        "title": "40 Kali Pencelupan Alami di Bawah Naungan Kolong Adat",
        "text": "Mama Maria dan para penenun di Lambanapu mendedikasikan 8 bulan penuh ketekunan. Setiap helai benang kapas dipintal tangan dan dicelup dalam rebusan akar mengkudu liar serta fermentasi daun nila pekat tanpa setetes pun zat pewarna kimia sintetis."
      },
      {
        "imageIndex": 5,
        "tag": "SIMBOLISME KEPEMIMPINAN",
        "title": "Doa Marapu & Perlindungan Roh Leluhur",
        "text": "Motif Kuda (Njara) melambangkan harga diri, kesatriaan, dan kepemimpinan bangsawan Sumba Timur. Guratan udang dan buaya di sisi pembatas adalah doa perlindungan bagi sang pemilik saat melangkah mengarungi babak baru kehidupan."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Format Adat Penuh (240×120 cm)",
        "label": "Format Adat Penuh",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Kotak Jati Ukir Marapu (+Rp 450.000)",
        "label": "Kotak Jati Ukir",
        "priceDelta": 450000
      },
      {
        "id": "v3",
        "name": "Edisi Panel Museum Akrilik (+Rp 950.000)",
        "label": "Panel Kolektor Museum",
        "priceDelta": 950000
      }
    ],
    "reviewsList": [
      {
        "author": "Dr. Raden Mas Aryo",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "18 Oktober 2026",
        "city": "Menteng, Jakarta Pusat",
        "title": "Keanggunan Otentik yang Menyentuh Jiwa",
        "comment": "Saat membuka kemasannya, aroma wangi rempah akar mengkudu dan dedaunan nila langsung tercium semerbak. Guratan motif kudanya sangat tegas dan tenunannya padat berbobot. Ini bukan sekadar kain, ini adalah doa leluhur Sumba yang hidup."
      },
      {
        "author": "Clara Setyanegara",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "29 September 2026",
        "city": "Denpasar, Bali",
        "title": "Pewarna Alami yang Sangat Dalam dan Hidup",
        "comment": "Warna biru nilanya memiliki kedalaman gradasi yang mustahil ditiru oleh mesin pabrik modern. Senang sekali 72% dari nilai apresiasi ini langsung diterima Mama penenun di Desa Lambanapu."
      },
      {
        "author": "Hartono Widjaja",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "12 September 2026",
        "city": "Surabaya, Jawa Timur",
        "title": "Pusaka WBTb yang Bernilai Investasi Budaya",
        "comment": "Disertai kartu sertifikat WBTb Kemendikbud dan nomor registrasi resmi. Panel tenun ini kini menjadi mahakarya utama di ruang galeri keluarga kami."
      }
    ],
    "complements": [
      2,
      4
    ],
    "specs": {
      "origin": "Waingapu, Sumba Timur (NTT)",
      "artisan": "Kelompok Mama Penenun Lambanapu",
      "village": "Desa Adat Lambanapu, Sumba Timur",
      "duration": "240 Hari Karya Tangan",
      "material": "100% Katun Pintal Tangan, Pewarna Alami Kulit Akar Mengkudu & Daun Nila",
      "technique": "Tenun Ikat",
      "dimensions": "240 cm × 120 cm",
      "weight": "850 gram",
      "registryCode": "KRY-001",
      "certification": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201400144"
    },
    "accordions": {
      "specs": "Dimensi presisi: 240 cm × 120 cm • Bobot bersih: 850 gram. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: 100% Katun Pintal Tangan, Pewarna Alami Kulit Akar Mengkudu & Daun Nila. Setiap produk disertai nomor registrasi resmi KRY-001 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Desa Adat Lambanapu, Sumba Timur. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Dibuat dari kapas organik lokal yang dipintal dengan tangan. Warna terakota berasal dari getah akar mengkudu tua, dan warna biru tua pekat berasal dari fermentasi daun indigofera. Perawatan: Jangan dicuci dengan deterjen kimia; angin-anginkan di tempat teduh dengan remasan lerak alami."
    }
  },
  {
    "id": 2,
    "code": "KRY-002",
    "name": "Batik Tulis Nitik Kembang Jeruk Giriloyo",
    "cat": "wastra",
    "catName": "Wastra & Tenun",
    "region": "jawa",
    "regionName": "Jawa",
    "daerah": "Bantul, D.I. Yogyakarta",
    "technique": "batik-tulis",
    "techniqueName": "Batik Tulis",
    "artisan": "Paguyuban Pembatik Giriloyo, Imogiri",
    "village": "Desa Wisata Batik Giriloyo, Imogiri, Bantul",
    "waPhone": "6281328901234",
    "durationDays": 75,
    "duration": "75 Hari Canting Manual",
    "durationDisplay": "75 Hari Canting Manual • Imogiri, Yogyakarta",
    "material": "Kain Katun Mori Primissima, Lilin Malam Lebah Alami, Pewarna Kulit Kayu Tingi & Soga Jawa",
    "source": "UNESCO Intangible Cultural Heritage 2009 & IG Batik Nitik No. ID G 000000080",
    "sourceShort": "UNESCO & IG Terdaftar",
    "price": 2850000,
    "rating": 5.0,
    "sold": 312,
    "badge": "100% Canting Tulis",
    "img": "assets/images/content/produk-batik-giriloyo.jpg",
    "artisanImg": "assets/images/pengrajin-batik.jpg",
    "shortDesc": "Motif klasik tertua keraton Yogyakarta yang disusun dari jutaan titik canting cawang beraroma rempah malam lebah.",
    "philosophy": "Pola Nitik Kembang Jeruk melambangkan kesucian hati, ketabahan, dan aroma budi pekerti yang harum merebak bagi lingkungan sekitar. Motif geometris titik-titik segiempat ini terinspirasi dari keindahan tenun patola Gujarat yang diakulturasi secara halus ke dalam filosofi hening keraton Mataram.",
    "artisanStory": "Para pembatik Giriloyo adalah generasi penerus pembatik makam raja-raja Imogiri. Ibu Sri Rahayu memimpin paguyuban 30 pembatik wanita. Penjualan karya ini menyokong kelangsungan sekolah membatik gratis bagi pemudi desa agar seni canting nitik tidak punah tergerus pabrik tekstil sablon.",
    "materialCare": "Mori katun halus kualitas tertinggi dicanting bolak-balik dengan lilin malam lebah liar. Pewarnaan soga cokelat hangat dihasilkan dari godokan kulit kayu tingi dan tegeran. Perawatan: Cuci tangan lembut menggunakan air sari buah lerak, jangan diperas kencang, dan simpan bersama akar wangi alami.",
    "dimensions": "260 cm × 105 cm",
    "weight": "420 gram",
    "gallery": [
      "assets/images/content/produk-batik-giriloyo.jpg",
      "assets/images/content/jurnal-batik-giriloyo.jpg",
      "assets/images/pengrajin-batik.jpg",
      "assets/images/content/produk-batik-giriloyo.jpg",
      "assets/images/content/wilayah-jawa-borobudur.jpg",
      "assets/images/content/jurnal-batik-giriloyo.jpg",
      "assets/images/content/produk-batik-giriloyo.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "UNESCO HERITAGE",
        "title": "Jutaan Titik Canting Cawang Malam Alami",
        "text": "Batik Nitik adalah seni hening tertinggi. Setiap titik segiempat dibuat dengan membelah ujung tembaga canting secara presisi mikroskopis, ditiup lembut dengan napas ritmis pembatik makam raja Imogiri."
      },
      {
        "imageIndex": 5,
        "tag": "AROMA WANGI MALAM",
        "title": "Fermentasi Kulit Kayu Tingi & Soga Jawa",
        "text": "Warna cokelat tembaga hangat ini dimasak berhari-hari dari kulit kayu tingi, tegeran, dan jambal alami. Ramuan malam lebah madu liar memberikan wangi rempah abadi yang menenangkan pikiran."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Kain Panjang Pola Penuh (260×105 cm)",
        "label": "Kain Panjang Penuh",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Wadah Kayu Timoho Imogiri (+Rp 400.000)",
        "label": "Wadah Kayu Timoho",
        "priceDelta": 400000
      },
      {
        "id": "v3",
        "name": "Paket Busana Adat Keraton (+Rp 850.000)",
        "label": "Busana Adat Keraton",
        "priceDelta": 850000
      }
    ],
    "reviewsList": [
      {
        "author": "Kanjeng Raden Ayu Sekar",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "22 Oktober 2026",
        "city": "Yogyakarta",
        "title": "Kehalusan Canting Nitik yang Luar Biasa Rapi",
        "comment": "Titik cantingnya begitu konsisten dan tembus bolak-balik di kedua sisi kain dengan kesempurnaan yang langka. Aroma malam lebahnya sangat menenangkan."
      },
      {
        "author": "Bambang Sudiro",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "05 Oktober 2026",
        "city": "Semarang",
        "title": "Tradisi Giriloyo yang Terjaga Martabatnya",
        "comment": "Sangat menghargai keterbukaan cerita pengrajin Ibu Sri Rahayu. Kain ini saya kenakan saat prosesi adat keluarga dan menuai banyak kekaguman."
      },
      {
        "author": "Nathalie Moreau",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "17 September 2026",
        "city": "Bandung",
        "title": "Pure Textile Poetry from Java",
        "comment": "The balance of geometry and spirituality in this piece is mesmerizing. It feels like wearing living history."
      }
    ],
    "complements": [
      1,
      9
    ],
    "specs": {
      "origin": "Bantul, D.I. Yogyakarta",
      "artisan": "Paguyuban Pembatik Giriloyo, Imogiri",
      "village": "Desa Wisata Batik Giriloyo, Imogiri, Bantul",
      "duration": "75 Hari Canting Manual",
      "material": "Kain Katun Mori Primissima, Lilin Malam Lebah Alami, Pewarna Kulit Kayu Tingi & Soga Jawa",
      "technique": "Batik Tulis",
      "dimensions": "260 cm × 105 cm",
      "weight": "420 gram",
      "registryCode": "KRY-002",
      "certification": "UNESCO Intangible Cultural Heritage 2009 & IG Batik Nitik No. ID G 000000080"
    },
    "accordions": {
      "specs": "Dimensi presisi: 260 cm × 105 cm • Bobot bersih: 420 gram. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Kain Katun Mori Primissima, Lilin Malam Lebah Alami, Pewarna Kulit Kayu Tingi & Soga Jawa. Setiap produk disertai nomor registrasi resmi KRY-002 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Desa Wisata Batik Giriloyo, Imogiri, Bantul. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Mori katun halus kualitas tertinggi dicanting bolak-balik dengan lilin malam lebah liar. Pewarnaan soga cokelat hangat dihasilkan dari godokan kulit kayu tingi dan tegeran. Perawatan: Cuci tangan lembut menggunakan air sari buah lerak, jangan diperas kencang, dan simpan bersama akar wangi alami."
    }
  },
  {
    "id": 3,
    "code": "KRY-003",
    "name": "Tas Noken Asli Serat Kayu Lembah Baliem",
    "cat": "anyaman",
    "catName": "Anyaman & Serat Alam",
    "region": "papua-maluku",
    "regionName": "Papua & Maluku",
    "daerah": "Wamena, Pegunungan Papua",
    "technique": "anyaman-tangan",
    "techniqueName": "Anyaman Tangan",
    "artisan": "Komunitas Mama Rajut Noken Wamena",
    "village": "Kampung Kurulu, Lembah Baliem, Jayawijaya",
    "waPhone": "6282198007722",
    "durationDays": 25,
    "duration": "25 Hari Anyaman Tangan",
    "durationDisplay": "25 Hari Rajut Serat • Lembah Baliem, Papua",
    "material": "Serat Kulit Pohon Melinjo Liar & Pohon Mahkota Dewa, Pewarna Tanah Liat Hitam",
    "source": "UNESCO Urgent Safeguarding List No. ID 00619 (2012)",
    "sourceShort": "UNESCO Warisan Dunia",
    "price": 850000,
    "rating": 4.9,
    "sold": 189,
    "badge": "UNESCO Safeguarded",
    "img": "assets/images/content/produk-noken-papua.jpg",
    "artisanImg": "assets/images/content/jurnal-noken-papua.jpg",
    "shortDesc": "Rajutan tangan serat kulit kayu pegunungan Papua yang kuat, elastis, dan menyimbolkan rahim cinta kasih seorang ibu.",
    "philosophy": "Bagi suku Dani dan masyarakat dataran tinggi Papua, Noken adalah lambang kesuburan, kehidupan, dan perdamaian antarsuku. Noken dipercaya sebagai representasi rahim ibu yang melindungi buah hatinya, sekaligus lambang kebijaksanaan wanita yang membesarkan peradaban generasi pedalaman.",
    "artisanStory": "Dirajut oleh Mama Yuliana Elopere dengan teknik simpul tunggal tanpa bantuan jarum mesin. Kulit pohon dipilin di atas pangkuan selama berminggu-minggu. Seluruh hasil penjualan noken langsung mendanai pos kesehatan ibu hamil dan gizi balita di perkampungan Lembah Baliem.",
    "materialCare": "Serat kayu alami memiliki elastisitas luar biasa dan dapat memanjang mengikuti isi muatan tanpa putus. Tahan terhadap kelembapan tropis. Perawatan: Jika terkena debu, cukup sikat perlahan dengan kuas kering lembut; hindari merendam dalam air panas.",
    "dimensions": "42 cm × 38 cm (Tali 95 cm)",
    "weight": "310 gram",
    "gallery": [
      "assets/images/content/produk-noken-papua.jpg",
      "assets/images/content/jurnal-noken-papua.jpg",
      "assets/images/content/wilayah-papua-asmat.jpg",
      "assets/images/content/produk-noken-papua.jpg",
      "assets/images/pengrajin-ukir.jpg",
      "assets/images/content/jurnal-noken-papua.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "UNESCO URGENT SAFEGUARDING",
        "title": "Rajutan Tangan Serat Pohon Melinjo Hutan Pegunungan",
        "text": "Mama Yuliana di Lembah Baliem memilin serat kayu di atas pangkuannya selama berminggu-minggu tanpa menggunakan jarum mesin. Serat alami ini memanjang elastis mengikuti bentuk barang bawaan."
      },
      {
        "imageIndex": 4,
        "tag": "FILOSOFI RAHIM IBU",
        "title": "Lambang Kesuburan & Kehidupan Suku Dani",
        "text": "Noken dipercaya sebagai representasi cinta kasih rahim ibu yang melindungi buah hatinya serta simbol kebijaksanaan perempuan dalam merawat harmoni alam Papua."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Ukuran Klasik Lembah Baliem (42×38 cm)",
        "label": "Ukuran Klasik Baliem",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Kantong Pelindung Serat Rami (+Rp 150.000)",
        "label": "Kantong Serat Rami",
        "priceDelta": 150000
      }
    ],
    "reviewsList": [
      {
        "author": "Maya Indriani",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "24 Oktober 2026",
        "city": "Jakarta",
        "title": "Kuat, Alami, dan Sarat Makna Kemanusiaan",
        "comment": "Sangat fleksibel dan kuat menampung laptop serta buku tebal. Aromanya harum kayu hutan alami, bangga bisa mendukung Mama Wamena."
      },
      {
        "author": "Taufik Hidayat",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "08 Oktober 2026",
        "city": "Bogor",
        "title": "Tekstur Rajutan yang Sangat Rapi",
        "comment": "Kualitas simpul tunggalnya luar biasa kokoh. Hadiah istimewa untuk istri yang menggemari kriya etnik."
      },
      {
        "author": "Sarah Jenkins",
        "badge": "Kolektor Terverifikasi",
        "rating": 4.9,
        "date": "19 September 2026",
        "city": "Ubud, Bali",
        "title": "Authentic Papua Craftsmanship",
        "comment": "Knowing that this purchase supports maternal care in Baliem Valley makes it priceless."
      }
    ],
    "complements": [
      6,
      8
    ],
    "specs": {
      "origin": "Wamena, Pegunungan Papua",
      "artisan": "Komunitas Mama Rajut Noken Wamena",
      "village": "Kampung Kurulu, Lembah Baliem, Jayawijaya",
      "duration": "25 Hari Anyaman Tangan",
      "material": "Serat Kulit Pohon Melinjo Liar & Pohon Mahkota Dewa, Pewarna Tanah Liat Hitam",
      "technique": "Anyaman Tangan",
      "dimensions": "42 cm × 38 cm (Tali 95 cm)",
      "weight": "310 gram",
      "registryCode": "KRY-003",
      "certification": "UNESCO Urgent Safeguarding List No. ID 00619 (2012)"
    },
    "accordions": {
      "specs": "Dimensi presisi: 42 cm × 38 cm (Tali 95 cm) • Bobot bersih: 310 gram. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Serat Kulit Pohon Melinjo Liar & Pohon Mahkota Dewa, Pewarna Tanah Liat Hitam. Setiap produk disertai nomor registrasi resmi KRY-003 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Kampung Kurulu, Lembah Baliem, Jayawijaya. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Serat kayu alami memiliki elastisitas luar biasa dan dapat memanjang mengikuti isi muatan tanpa putus. Tahan terhadap kelembapan tropis. Perawatan: Jika terkena debu, cukup sikat perlahan dengan kuas kering lembut; hindari merendam dalam air panas."
    }
  },
  {
    "id": 4,
    "code": "KRY-004",
    "name": "Perhiasan Perak Filigri Teratai Maestro Celuk",
    "cat": "logam-instrumen",
    "catName": "Instrumen & Logam",
    "region": "bali-nusra",
    "regionName": "Bali & Nusa Tenggara",
    "daerah": "Desa Celuk, Gianyar, Bali",
    "technique": "tempa-tradisional",
    "techniqueName": "Tempa Tradisional",
    "artisan": "Studio Kerajinan Perak Pande Celuk",
    "village": "Banjar Celuk, Sukawati, Gianyar, Bali",
    "waPhone": "6281936001188",
    "durationDays": 20,
    "duration": "20 Hari Tempa Kawat Halus",
    "durationDisplay": "20 Hari Pilin Filigri • Celuk, Gianyar, Bali",
    "material": "Perak Murni 925 (Sterling Silver), Sentuhan Sulingan Emas 18K",
    "source": "Sentra Kriya Perak Unggulan Kemenparekraf & Dekranasda Bali",
    "sourceShort": "Sentra Kemenparekraf",
    "price": 1450000,
    "rating": 4.8,
    "sold": 142,
    "badge": "Perak 925 Murni",
    "img": "assets/images/content/produk-perak-celuk.jpg",
    "artisanImg": "assets/images/pengrajin-ukir.jpg",
    "shortDesc": "Mahakarya filigri teratai Bali dari pilinan benang perak setipis helaian rambut dengan akurasi ukiran fraktal mendalam.",
    "philosophy": "Bunga Teratai (Padma) merepresentasikan kesucian batin yang mekar murni tanpa terpengaruh oleh keruhnya air lumpur di sekitarnya. Struktur kelopak bertingkat melambangkan cakra spiritual tertinggi dalam kosmologi Dewata Nawa Sanga Bali.",
    "artisanStory": "Ditempa oleh I Wayan Mudana, generasi keempat klan pande perak Celuk. Setiap kawat perak dipilin manual menggunakan penjepit bambu dan disolder dengan api tiup arang kelapa. Usaha ini memberdayakan 12 pemuda banjar yang mempertahankan tradisi leluhur dari gempuran perhiasan cor cetak massal.",
    "materialCare": "Sterling Silver 925 tanpa lapisan nikel sehingga aman dan hipoalergenik untuk kulit sensitif. Perawatan: Simpan dalam kantong kain beludru kedap udara; bersihkan kilau perak dengan lap suede mikrofiber khusus yang telah kami sertakan.",
    "dimensions": "Diameter 5.5 cm • Berat 38 gram",
    "weight": "38 gram",
    "gallery": [
      "assets/images/content/produk-perak-celuk.jpg",
      "assets/images/pengrajin-ukir.jpg",
      "assets/images/content/wilayah-bali-kecak.jpg",
      "assets/images/content/produk-perak-celuk.jpg",
      "assets/images/content/jurnal-gamelan-selonding.jpg",
      "assets/images/content/produk-perak-celuk.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "KRIYA FILIGRI CELUK",
        "title": "Pilin Kawat Perak Sehalus Helaian Rambut",
        "text": "Maestro I Wayan Mudana memilin kawat perak 925 menggunakan penjepit bambu dan menyoldernya di atas bara api arang kelapa dengan ketenangan meditasi batin."
      },
      {
        "imageIndex": 4,
        "tag": "KOSMOLOGI DEWATA NAWA SANGA",
        "title": "Simbol Padma Kesucian Batin",
        "text": "Bunga Teratai melambangkan kesucian batin yang mekar murni tanpa terpengaruh oleh keruhnya air lumpur di sekitarnya."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Bros Padma Filigri Perak Murni 925",
        "label": "Perak Murni 925",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Aksen Sepuh Emas Kuning 18K (+Rp 350.000)",
        "label": "Sepuh Emas 18K",
        "priceDelta": 350000
      },
      {
        "id": "v3",
        "name": "Dengan Kotak Ukir Beludru Sutra (+Rp 200.000)",
        "label": "Kotak Sutra Beludru",
        "priceDelta": 200000
      }
    ],
    "reviewsList": [
      {
        "author": "Gusti Ayu Mirah",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "15 Oktober 2026",
        "city": "Denpasar",
        "title": "Detail Filigri Sangat Halus dan Presisi",
        "comment": "Karya Maestro Celuk tidak pernah mengecewakan. Setiap helai pilin kawat peraknya membentuk kelopak teratai yang memancarkan aura sakral nan anggun."
      },
      {
        "author": "Devi Anggraini",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "02 Oktober 2026",
        "city": "Surabaya",
        "title": "Sangat Nyaman Dikenakan di Kebaya",
        "comment": "Tidak berat dan jepitannya sangat aman. Kilau peraknya tahan lama dan tidak mudah kusam."
      },
      {
        "author": "Michael Chang",
        "badge": "Kolektor Terverifikasi",
        "rating": 4.8,
        "date": "14 September 2026",
        "city": "Singapore",
        "title": "Masterclass in Balinese Silversmithing",
        "comment": "An astonishing piece of wearable heritage. Truly museum grade."
      }
    ],
    "complements": [
      1,
      7
    ],
    "specs": {
      "origin": "Desa Celuk, Gianyar, Bali",
      "artisan": "Studio Kerajinan Perak Pande Celuk",
      "village": "Banjar Celuk, Sukawati, Gianyar, Bali",
      "duration": "20 Hari Tempa Kawat Halus",
      "material": "Perak Murni 925 (Sterling Silver), Sentuhan Sulingan Emas 18K",
      "technique": "Tempa Tradisional",
      "dimensions": "Diameter 5.5 cm • Berat 38 gram",
      "weight": "38 gram",
      "registryCode": "KRY-004",
      "certification": "Sentra Kriya Perak Unggulan Kemenparekraf & Dekranasda Bali"
    },
    "accordions": {
      "specs": "Dimensi presisi: Diameter 5.5 cm • Berat 38 gram • Bobot bersih: 38 gram. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Perak Murni 925 (Sterling Silver), Sentuhan Sulingan Emas 18K. Setiap produk disertai nomor registrasi resmi KRY-004 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Banjar Celuk, Sukawati, Gianyar, Bali. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Sterling Silver 925 tanpa lapisan nikel sehingga aman dan hipoalergenik untuk kulit sensitif. Perawatan: Simpan dalam kantong kain beludru kedap udara; bersihkan kilau perak dengan lap suede mikrofiber khusus yang telah kami sertakan."
    }
  },
  {
    "id": 5,
    "code": "KRY-005",
    "name": "Kain Songket Lepus Berlian Emas Sriwijaya",
    "cat": "wastra",
    "catName": "Wastra & Tenun",
    "region": "sumatera",
    "regionName": "Sumatera",
    "daerah": "Kertapati, Palembang, Sumatera Selatan",
    "technique": "tenun-ikat",
    "techniqueName": "Tenun Ikat",
    "artisan": "Sentra Tenun Songket Gedogan Kertapati",
    "village": "Kelurahan Kertapati, Palembang",
    "waPhone": "628117109922",
    "durationDays": 135,
    "duration": "135 Hari Tenun Gedogan",
    "durationDisplay": "135 Hari Tenun Gedogan • Palembang, Sumsel",
    "material": "Benang Sutra Alam Pilihan, Sulaman Benang Emas Cabutan Murni Berkilau",
    "source": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201300009",
    "sourceShort": "WBTb Kemendikbud",
    "price": 4800000,
    "rating": 5.0,
    "sold": 98,
    "badge": "Kasta Tertinggi Songket",
    "img": "assets/images/content/produk-songket-palembang.jpg",
    "artisanImg": "assets/images/pengrajin-tenun.jpg",
    "shortDesc": "Dijuluki Ratu Segala Kain, ditenun dengan helai benang emas murni yang menutupi seluruh bidang sutra merah marun.",
    "philosophy": "Corak Lepus Berlian merefleksikan kejayaan kemaritiman Kerajaan Sriwijaya pada abad ke-8. Pantulan emas melambangkan kemakmuran, kehormatan keluarga, dan doa agar keturunan senantiasa hidup berkecukupan serta menjunjung tinggi martabat etika leluhur.",
    "artisanStory": "Ibu Zainab menenun di atas alat tenun kayu gedogan yang diwariskan dari nenek buyutnya. Duduk di lantai selama 6 jam sehari membutuhkan kesabaran tingkat tinggi. Pembelian karya ini menjamin regenerasi beasiswa tenun tradisi bagi 8 remaja putri di pesisir Sungai Musi.",
    "materialCare": "Sutra murni berkilau emas tua. DILARANG KERAS dicuci basah atau disetrika langsung dengan uap panas tinggi. Perawatan: Angin-anginkan setelah dipakai, bungkus dengan kertas bebas asam (acid-free paper), lalu gulung rapi di dalam tabung bambu adat.",
    "dimensions": "210 cm × 110 cm",
    "weight": "680 gram",
    "gallery": [
      "assets/images/content/produk-songket-palembang.jpg",
      "assets/images/pengrajin-tenun.jpg",
      "assets/images/content/wilayah-sumatera-gadang.jpg",
      "assets/images/content/produk-songket-palembang.jpg",
      "assets/images/latar-ornamen-awan-jawa-tradisional-10.png",
      "assets/images/content/produk-songket-palembang.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "RATU SEGALA KAIN",
        "title": "135 Hari Tenun Gedogan Benang Emas Cabutan",
        "text": "Ibu Zainab duduk di lantai kayu selama 6 jam sehari menenun helai sutra merah marun bertabur benang emas murni peninggalan tradisi kejayaan Kemaharajaan Sriwijaya."
      },
      {
        "imageIndex": 4,
        "tag": "FILOSOFI KEMAKMURAN",
        "title": "Corak Lepus Berlian Abad ke-8",
        "text": "Kilau emas lepus melambangkan kemakmuran, kemuliaan budi pekerti, dan penghormatan pada silsilah leluhur maritim Nusantara."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Set Kain Panjang & Selendang Adat",
        "label": "Set Kain & Selendang",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Tabung Bambu Songket Adat (+Rp 300.000)",
        "label": "Tabung Bambu Adat",
        "priceDelta": 300000
      },
      {
        "id": "v3",
        "name": "Koleksi Khusus Benang Emas Antik (+Rp 1.500.000)",
        "label": "Benang Emas Antik",
        "priceDelta": 1500000
      }
    ],
    "reviewsList": [
      {
        "author": "Hj. Tengku Zubaidah",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "20 Oktober 2026",
        "city": "Palembang",
        "title": "Pusaka Sriwijaya Asli Kertapati",
        "comment": "Kilau emas cabutannya tidak menyilaukan kasar, melainkan hangat dan anggun. Kerapian tenun gedogannya adalah bukti kepiawaian Ibu Zainab."
      },
      {
        "author": "Anindya Putri",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "04 Oktober 2026",
        "city": "Jakarta Selatan",
        "title": "Kemewahan Tradisi Tertinggi",
        "comment": "Dipakai untuk resepsi pernikahan adat Palembang, semua tamu memuji keaslian motif lepus berliannya."
      },
      {
        "author": "Rizal Effendi",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "18 September 2026",
        "city": "Medan",
        "title": "Investasi Cagar Budaya",
        "comment": "Lengkap dengan sertifikat WBTb. Nilai estetikanya tak lekang oleh zaman."
      }
    ],
    "complements": [
      2,
      9
    ],
    "specs": {
      "origin": "Kertapati, Palembang, Sumatera Selatan",
      "artisan": "Sentra Tenun Songket Gedogan Kertapati",
      "village": "Kelurahan Kertapati, Palembang",
      "duration": "135 Hari Tenun Gedogan",
      "material": "Benang Sutra Alam Pilihan, Sulaman Benang Emas Cabutan Murni Berkilau",
      "technique": "Tenun Ikat",
      "dimensions": "210 cm × 110 cm",
      "weight": "680 gram",
      "registryCode": "KRY-005",
      "certification": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201300009"
    },
    "accordions": {
      "specs": "Dimensi presisi: 210 cm × 110 cm • Bobot bersih: 680 gram. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Benang Sutra Alam Pilihan, Sulaman Benang Emas Cabutan Murni Berkilau. Setiap produk disertai nomor registrasi resmi KRY-005 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Kelurahan Kertapati, Palembang. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Sutra murni berkilau emas tua. DILARANG KERAS dicuci basah atau disetrika langsung dengan uap panas tinggi. Perawatan: Angin-anginkan setelah dipakai, bungkus dengan kertas bebas asam (acid-free paper), lalu gulung rapi di dalam tabung bambu adat."
    }
  },
  {
    "id": 6,
    "code": "KRY-006",
    "name": "Ukiran Patung Mbis Spirit Leluhur Suku Asmat",
    "cat": "kriya",
    "catName": "Karya Kayu & Ukir",
    "region": "papua-maluku",
    "regionName": "Papua & Maluku",
    "daerah": "Agats, Pesisir Asmat, Papua Selatan",
    "technique": "ukir-pahat",
    "techniqueName": "Ukir Pahat",
    "artisan": "Pengukir Wow-ipits Kampung Syuru, Asmat",
    "village": "Kampung Adat Syuru, Agats, Asmat",
    "waPhone": "6285244551133",
    "durationDays": 45,
    "duration": "45 Hari Pahat Kayu Besi",
    "durationDisplay": "45 Hari Pahat Manual • Agats, Asmat",
    "material": "Kayu Bakau Besi Rawa (Ironwood), Pewarna Alami Tanah Liat Oker Merah & Abu Kerang Putih",
    "source": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201300062",
    "sourceShort": "WBTb Kemendikbud",
    "price": 3200000,
    "rating": 4.8,
    "sold": 64,
    "badge": "Pahat Tunggal Wow-Ipits",
    "img": "assets/images/content/produk-patung-asmat.jpg",
    "artisanImg": "assets/images/pengrajin-ukir.jpg",
    "shortDesc": "Pahatan figur totem leluhur bertingkat karya maestro Wow-ipits tanpa sketsa pinsil, mengalir langsung dari rasa batin.",
    "philosophy": "Patung Mbis adalah medium sakral penghubung dunia nyata dengan dunia arwah leluhur (Safan). Sosok yang dipahat bertingkat menggambarkan silsilah keluarga, kekuatan spiritual penjaga rumah dari marabahaya, serta penghormatan pada keberanian tetua suku yang bijaksana.",
    "artisanStory": "Dipahat langsung oleh Amatus Eyagaim, seniman kayu ulung dari Kampung Syuru. Amatus hanya memotong kayu bakau tua yang telah mendapat izin dari tetua adat. 100% kayu dipanen secara lestari tanpa deforestasi hutan rawa perawan Asmat.",
    "materialCare": "Kayu besi rawa sangat padat dan tahan terhadap serangan rayap seumur hidup. Pewarna alami dari lelehan damar pohon dan abu cangkang kerang laut. Perawatan: Usapkan sedikit minyak kelapa murni (VCO) setiap 6 bulan sekali untuk menjaga kelembapan urat kayu eksotis.",
    "dimensions": "Tinggi 85 cm • Diameter 18 cm",
    "weight": "4.2 kg",
    "gallery": [
      "assets/images/content/produk-patung-asmat.jpg",
      "assets/images/content/wilayah-papua-asmat.jpg",
      "assets/images/pengrajin-ukir.jpg",
      "assets/images/content/produk-patung-asmat.jpg",
      "assets/images/content/jurnal-pinisi-bulukumba.jpg",
      "assets/images/content/produk-patung-asmat.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "PAHAT TUNGGAL WOW-IPITS",
        "title": "Mengalir Langsung dari Rasa Batin Tanpa Sketsa",
        "text": "Amatus Eyagaim memahat kayu besi rawa bakau dengan kapak batu dan pahat baja tanpa sketsa pensil. Bentuk figur leluhur mengalir dari ilham mimpi dan rasa hormat pada tetua suku."
      },
      {
        "imageIndex": 4,
        "tag": "JALUR SPIRIT SAFAN",
        "title": "Penghubung Alam Fana dengan Spirit Leluhur",
        "text": "Sosok figur bertingkat melambangkan silsilah keluarga pelindung rumah dan penjaga harmoni hutan rawa Asmat dari roh jahat."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Patung Mbis Tunggal 85 cm",
        "label": "Tinggi 85 cm",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Dudukan Kayu Besi Alami (+Rp 400.000)",
        "label": "Dudukan Kayu Besi",
        "priceDelta": 400000
      }
    ],
    "reviewsList": [
      {
        "author": "Prof. Hendro Wicaksono",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "14 Oktober 2026",
        "city": "Yogyakarta",
        "title": "Kekuatan Karakter Pahatan yang Sangat Berbobot",
        "comment": "Tekstur kayu besi dan oker tanah merahnya menghadirkan energi spiritual yang sangat tenang di ruang studi kami."
      },
      {
        "author": "Johan Liebert",
        "badge": "Kolektor Terverifikasi",
        "rating": 4.8,
        "date": "28 September 2026",
        "city": "Jakarta Barat",
        "title": "Asli dari Kampung Syuru Agats",
        "comment": "Sertifikat asal usul kayu lestari sangat transparan. Sangat bangga memajang seni adiluhung Papua."
      },
      {
        "author": "Gideon Tan",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "11 September 2026",
        "city": "Surabaya",
        "title": "Rare Primitive Masterpiece",
        "comment": "The raw chisel marks show the pure mastery of the Asmat carver. An unrepeatable sculpture."
      }
    ],
    "complements": [
      3,
      11
    ],
    "specs": {
      "origin": "Agats, Pesisir Asmat, Papua Selatan",
      "artisan": "Pengukir Wow-ipits Kampung Syuru, Asmat",
      "village": "Kampung Adat Syuru, Agats, Asmat",
      "duration": "45 Hari Pahat Kayu Besi",
      "material": "Kayu Bakau Besi Rawa (Ironwood), Pewarna Alami Tanah Liat Oker Merah & Abu Kerang Putih",
      "technique": "Ukir Pahat",
      "dimensions": "Tinggi 85 cm • Diameter 18 cm",
      "weight": "4.2 kg",
      "registryCode": "KRY-006",
      "certification": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201300062"
    },
    "accordions": {
      "specs": "Dimensi presisi: Tinggi 85 cm • Diameter 18 cm • Bobot bersih: 4.2 kg. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Kayu Bakau Besi Rawa (Ironwood), Pewarna Alami Tanah Liat Oker Merah & Abu Kerang Putih. Setiap produk disertai nomor registrasi resmi KRY-006 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Kampung Adat Syuru, Agats, Asmat. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Kayu besi rawa sangat padat dan tahan terhadap serangan rayap seumur hidup. Pewarna alami dari lelehan damar pohon dan abu cangkang kerang laut. Perawatan: Usapkan sedikit minyak kelapa murni (VCO) setiap 6 bulan sekali untuk menjaga kelembapan urat kayu eksotis."
    }
  },
  {
    "id": 7,
    "code": "KRY-007",
    "name": "Instrumen Sasando Resonator Daun Lontar Rote",
    "cat": "logam-instrumen",
    "catName": "Instrumen & Logam",
    "region": "bali-nusra",
    "regionName": "Bali & Nusa Tenggara",
    "daerah": "Desa Oebelo, Pulau Rote, NTT",
    "technique": "anyaman-tangan",
    "techniqueName": "Anyaman Tangan",
    "artisan": "Bengkel Maestro Sasando Tradisi Oebelo",
    "village": "Desa Oebelo, Kupang Tengah / Pulau Rote, NTT",
    "waPhone": "6281239088711",
    "durationDays": 28,
    "duration": "28 Hari Rakit & Anyam",
    "durationDisplay": "28 Hari Rakit Akustik • Oebelo, NTT",
    "material": "Bambu Betung Pilihan, Resonator Haik Daun Lontar Kering, 28 Senar Dawai Baja Halus",
    "source": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201400143",
    "sourceShort": "WBTb Kemendikbud",
    "price": 2100000,
    "rating": 4.9,
    "sold": 87,
    "badge": "Akustik Resonansi Murni",
    "img": "assets/images/content/produk-sasando-rote.jpg",
    "artisanImg": "assets/images/content/jurnal-gamelan-selonding.jpg",
    "shortDesc": "Instrumen petik berdawai bambu yang diapit anyaman daun lontar bertekstur kipas, bersuara jernih seperti harpa surgawi.",
    "philosophy": "Sasando (Sasandu) berarti \"alat yang bergetar atau berbunyi\". Menurut legenda Sangguana, alat ini terinspirasi dari desau angin malam di antara pelepah pohon lontar. Memetik sasando adalah simbol keharmonisan antara manusia, hutan lontar, dan ketenangan samudra selatan Nusantara.",
    "artisanStory": "Dibuat oleh Bapa Djitron Pah bersama anak-anak mudanya di sanggar Oebelo. Mereka merajut daun pohon lontar yang telah dijemur dan diasapi secara cermat agar resonansi akustiknya hangat dan resonan. Setiap pembelian mendukung pembibitan 10 pohon lontar baru di lahan kritis NTT.",
    "materialCare": "Daun lontar alamiah yang lentur dan bambu tua yang tidak mudah retak. Perawatan: Kendurkan sedikit tegangan senar bila disimpan lama dalam ruangan ber-AC, dan hindari paparan hujan langsung agar bentuk kipas daun lontar tetap mekar presisi.",
    "dimensions": "Tinggi 72 cm • Rentang Daun Haik 45 cm",
    "weight": "1.8 kg",
    "gallery": [
      "assets/images/content/produk-sasando-rote.jpg",
      "assets/images/content/jurnal-gamelan-selonding.jpg",
      "assets/images/pengrajin-ukir.jpg",
      "assets/images/content/produk-sasando-rote.jpg",
      "assets/images/content/wilayah-bali-kecak.jpg",
      "assets/images/content/produk-sasando-rote.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "RESONATOR DAUN LONTAR",
        "title": "Anyaman Haik Pengikat Nada Samudra Selatan",
        "text": "Bapa Djitron Pah di Oebelo merajut daun lontar pilihan yang diasapi cermat agar melengkung presisi menghasilkan resonansi akustik jernih bagaikan dawai harpa surgawi."
      },
      {
        "imageIndex": 4,
        "tag": "LEGENDA SANGGUANA",
        "title": "Simfoni Desau Angin Pelepah Lontar",
        "text": "Instrumen ini lahir dari cinta sang pemuda pada desau angin malam di pesisir Rote, menyatukan manusia dengan siklus alam kepulauan."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Sasando Akustik 28 Dawai Daun Lontar",
        "label": "Akustik 28 Dawai",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Pickup Elektrik Transparan (+Rp 550.000)",
        "label": "Hybrid Pickup Elektrik",
        "priceDelta": 550000
      },
      {
        "id": "v3",
        "name": "Kotak Koper Hardcase Khusus Tour (+Rp 750.000)",
        "label": "Koper Hardcase Tour",
        "priceDelta": 750000
      }
    ],
    "reviewsList": [
      {
        "author": "Yohanes Bria",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "19 Oktober 2026",
        "city": "Kupang, NTT",
        "title": "Suara Akustiknya Sangat Memikat Hati",
        "comment": "Resonansi daun lontarnya menghasilkan sustain nada yang panjang dan bening. Instrumen kebanggaan tanah Rote."
      },
      {
        "author": "Arif Rahman",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "06 Oktober 2026",
        "city": "Bandung",
        "title": "Alat Musik Sekaligus Karya Seni Patung",
        "comment": "Bentuk kipas daun lontarnya sangat eksotis ditaruh di ruang keluarga, dan saat dipetik suaranya menyejukkan batin."
      },
      {
        "author": "Emily Thorne",
        "badge": "Kolektor Terverifikasi",
        "rating": 4.9,
        "date": "16 September 2026",
        "city": "Melbourne, Australia",
        "title": "Incredible Acoustic Engineering",
        "comment": "Shipped safely to Melbourne with no damage. Tuning was stable and tone is divine."
      }
    ],
    "complements": [
      1,
      4
    ],
    "specs": {
      "origin": "Desa Oebelo, Pulau Rote, NTT",
      "artisan": "Bengkel Maestro Sasando Tradisi Oebelo",
      "village": "Desa Oebelo, Kupang Tengah / Pulau Rote, NTT",
      "duration": "28 Hari Rakit & Anyam",
      "material": "Bambu Betung Pilihan, Resonator Haik Daun Lontar Kering, 28 Senar Dawai Baja Halus",
      "technique": "Anyaman Tangan",
      "dimensions": "Tinggi 72 cm • Rentang Daun Haik 45 cm",
      "weight": "1.8 kg",
      "registryCode": "KRY-007",
      "certification": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201400143"
    },
    "accordions": {
      "specs": "Dimensi presisi: Tinggi 72 cm • Rentang Daun Haik 45 cm • Bobot bersih: 1.8 kg. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Bambu Betung Pilihan, Resonator Haik Daun Lontar Kering, 28 Senar Dawai Baja Halus. Setiap produk disertai nomor registrasi resmi KRY-007 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Desa Oebelo, Kupang Tengah / Pulau Rote, NTT. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Daun lontar alamiah yang lentur dan bambu tua yang tidak mudah retak. Perawatan: Kendurkan sedikit tegangan senar bila disimpan lama dalam ruangan ber-AC, dan hindari paparan hujan langsung agar bentuk kipas daun lontar tetap mekar presisi."
    }
  },
  {
    "id": 8,
    "code": "KRY-008",
    "name": "Wadah Anyaman Serat Ketak Beleka Asap Kelapa",
    "cat": "anyaman",
    "catName": "Anyaman & Serat Alam",
    "region": "bali-nusra",
    "regionName": "Bali & Nusa Tenggara",
    "daerah": "Desa Beleka, Lombok Tengah, NTB",
    "technique": "anyaman-tangan",
    "techniqueName": "Anyaman Tangan",
    "artisan": "Koperasi Pengrajin Ketak Beleka Lestari",
    "village": "Desa Beleka, Praya Timur, Lombok Tengah",
    "waPhone": "6287864112299",
    "durationDays": 18,
    "duration": "18 Hari Anyam Teliti",
    "durationDisplay": "18 Hari Anyam Rapat • Beleka, Lombok Tengah",
    "material": "Tanaman Paku Hutan Liar (Ketak), Tulang Anyaman Rotan, Pengasapan Sabut Kelapa",
    "source": "Kemendikbudristek — WBTb No. Reg 201600401 & Dekranasda NTB",
    "sourceShort": "WBTb Kemendikbud",
    "price": 520000,
    "rating": 4.7,
    "sold": 380,
    "badge": "Tahan Air & Anti-Rayap",
    "img": "assets/images/content/produk-ketak-lombok.jpg",
    "artisanImg": "assets/images/pengrajin-ukir.jpg",
    "shortDesc": "Anyaman rapat tanaman paku hutan khas Sasak yang diasapi tempurung kelapa hingga berwarna karamel emas tahan air.",
    "philosophy": "Anyaman Ketak mencerminkan filosofi \"Patuh Karya Sasak\", yaitu ketekunan, kerapian, dan keterikatan erat kekerabatan masyarakat desa di pulau Lombok. Pola anyaman yang saling mengunci melambangkan gotong royong yang tak terpisahkan dalam menghadapi suka duka kehidupan.",
    "artisanStory": "Para perajin Beleka didominasi oleh perempuan paruh baya yang mencari nafkah halal di samping musim panen tembakau dan padi. Hasil penjualan dikelola koperasi desa dengan bagi hasil transparan yang membantu menyediakan tabungan lansia dan modal bibit tani keluarga.",
    "materialCare": "Warna cokelat mengkilap dihasilkan alami dari proses pengasapan asap sabut dan batok kelapa selama 3 hari 3 malam, membuat seratnya kebal dari gigitan serangga dan jamur. Perawatan: Jika kotor, dapat dicuci dengan air sabun biasa lalu dijemur di bawah sinar matahari pagi.",
    "dimensions": "Diameter 32 cm • Tinggi 22 cm",
    "weight": "650 gram",
    "gallery": [
      "assets/images/content/produk-ketak-lombok.jpg",
      "assets/images/pengrajin-ukir.jpg",
      "assets/images/content/wilayah-bali-kecak.jpg",
      "assets/images/content/produk-ketak-lombok.jpg",
      "assets/images/content/jurnal-pinisi-bulukumba.jpg",
      "assets/images/content/produk-ketak-lombok.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "ANYAMAN PAKU HUTAN LIAR",
        "title": "Pengasapan Sabut Kelapa 3 Hari 3 Malam",
        "text": "Warna karamel emas alami bukan cat buatan, melainkan hasil pengasapan asap sabut kelapa yang meresap ke dalam pori serat ketak sehingga tahan jamur dan air seumur hidup."
      },
      {
        "imageIndex": 4,
        "tag": "PATUH KARYA SASAK",
        "title": "Kerapian Simpul Gotong Royong Desa Beleka",
        "text": "Dianyam rapat oleh ibu-ibu penenun Beleka di sela musim panen. Setiap wadah mewakili keuletan tangan wanita pedesaan Lombok."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Wadah Ketak Beleka Bulat 32 cm",
        "label": "Wadah Bulat 32 cm",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Set 3 Susun Wadah Multiguna (+Rp 380.000)",
        "label": "Set 3 Susun",
        "priceDelta": 380000
      }
    ],
    "reviewsList": [
      {
        "author": "Laksmi Saraswati",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "23 Oktober 2026",
        "city": "Mataram, Lombok",
        "title": "Anyaman Super Rapat dan Tahan Lama",
        "comment": "Saya gunakan untuk menyimpan wastra dan dokumen penting. Aromanya harum asap kelapa khas Sasak yang menolak serangga."
      },
      {
        "author": "Rina Marlina",
        "badge": "Kolektor Terverifikasi",
        "rating": 4.8,
        "date": "09 Oktober 2026",
        "city": "Tangerang",
        "title": "Sangat Estetis untuk Interior Minimalis",
        "comment": "Warna karamel alaminya sangat serasi dengan meja kayu jati. Sangat kokoh dan tidak berbau bahan kimia."
      },
      {
        "author": "Dewi Kurniasih",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "21 September 2026",
        "city": "Jakarta Timur",
        "title": "Kualitas Ekspor Koperasi Beleka",
        "comment": "Bangga sekali produk UMKM desa bisa sehalus dan serapi ini pengerjaannya."
      }
    ],
    "complements": [
      1,
      3
    ],
    "specs": {
      "origin": "Desa Beleka, Lombok Tengah, NTB",
      "artisan": "Koperasi Pengrajin Ketak Beleka Lestari",
      "village": "Desa Beleka, Praya Timur, Lombok Tengah",
      "duration": "18 Hari Anyam Teliti",
      "material": "Tanaman Paku Hutan Liar (Ketak), Tulang Anyaman Rotan, Pengasapan Sabut Kelapa",
      "technique": "Anyaman Tangan",
      "dimensions": "Diameter 32 cm • Tinggi 22 cm",
      "weight": "650 gram",
      "registryCode": "KRY-008",
      "certification": "Kemendikbudristek — WBTb No. Reg 201600401 & Dekranasda NTB"
    },
    "accordions": {
      "specs": "Dimensi presisi: Diameter 32 cm • Tinggi 22 cm • Bobot bersih: 650 gram. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Tanaman Paku Hutan Liar (Ketak), Tulang Anyaman Rotan, Pengasapan Sabut Kelapa. Setiap produk disertai nomor registrasi resmi KRY-008 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Desa Beleka, Praya Timur, Lombok Tengah. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Warna cokelat mengkilap dihasilkan alami dari proses pengasapan asap sabut dan batok kelapa selama 3 hari 3 malam, membuat seratnya kebal dari gigitan serangga dan jamur. Perawatan: Jika kotor, dapat dicuci dengan air sabun biasa lalu dijemur di bawah sinar matahari pagi."
    }
  },
  {
    "id": 9,
    "code": "KRY-009",
    "name": "Keris Kamardikan Dhapur Sengkelat Pamor Wos Wutah",
    "cat": "logam-instrumen",
    "catName": "Instrumen & Logam",
    "region": "jawa",
    "regionName": "Jawa",
    "daerah": "Sumenep, Madura & Surakarta, Jawa Tengah",
    "technique": "tempa-tradisional",
    "techniqueName": "Tempa Tradisional",
    "artisan": "Padepokan Empu Aeng Tong-Tong & Surakarta",
    "village": "Desa Aeng Tong-Tong, Saronggi, Sumenep",
    "waPhone": "6281231122455",
    "durationDays": 90,
    "duration": "90 Hari Lipat Tempa",
    "durationDisplay": "90 Hari Lipatan Besi Pamor • Sumenep & Solo",
    "material": "Besi Wasi Tua, Baja Pilihan, Nikel Pamor Meteorit, Warangka Kayu Timoho Pelet",
    "source": "UNESCO Masterpiece of the Oral and Intangible Heritage of Humanity 2005",
    "sourceShort": "UNESCO Warisan Dunia",
    "price": 5750000,
    "rating": 5.0,
    "sold": 43,
    "badge": "UNESCO Masterpiece",
    "img": "assets/images/content/jurnal-keris-jawa.jpg",
    "artisanImg": "assets/images/pengrajin-ukir.jpg",
    "shortDesc": "Pusaka luk 13 adiluhung dengan ratusan lipatan besi meteorit pamor Beras Wutah, lambang rezeki dan kedamaian nurani.",
    "philosophy": "Dhapur Sengkelat dengan lekuk luk 13 merepresentasikan kebijaksanaan menahan nafsu amarah dan menaungi rakyat jelata. Pamor Wos Wutah (Beras Tumpah) adalah doa simbolis agar pemiliknya senantiasa dilimpahi rezeki sandang pangan yang melimpah ruah dan tidak pernah kekurangan.",
    "artisanStory": "Ditempa oleh Empu muda di Desa Aeng Tong-Tong Sumenep—desa dengan populasi empu keris terbanyak di dunia yang diakui UNESCO. Bekerja di depan bara api arang jati selama berjam-jam, empu menjaga doa dan kemurnian rasa agar setiap helai pamor nikel muncul sempurna tanpa cacat.",
    "materialCare": "Bilah bilah besi pamor dilindungi dengan olesan minyak kelapa campur minyak cendana wangi murni. Warangka dibuat dari kayu timoho alami berpelet corak hitam alami. Perawatan: Oleskan minyak pusaka setiap malam Jumat Kliwon atau 3 bulan sekali agar bilah terhindar dari karat udara.",
    "dimensions": "Panjang Bilah 37 cm • Total Warangka 51 cm",
    "weight": "850 gram",
    "gallery": [
      "assets/images/content/jurnal-keris-jawa.jpg",
      "assets/images/pengrajin-ukir.jpg",
      "assets/images/content/wilayah-jawa-borobudur.jpg",
      "assets/images/content/jurnal-keris-jawa.jpg",
      "assets/images/wayang-kulit-jawa-emas.png",
      "assets/images/content/jurnal-keris-jawa.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "UNESCO MASTERPIECE",
        "title": "Ratusan Lipatan Besi Pamor Meteorit",
        "text": "Empu desa Aeng Tong-Tong melipat besi wasi tua dan nikel meteorit di atas bara api arang kayu jati selama 90 hari dalam hening doa dan tirakat batin."
      },
      {
        "imageIndex": 4,
        "tag": "DHAPUR SENGKELAT",
        "title": "Luk 13 Doa Rezeki Beras Tumpah (Wos Wutah)",
        "text": "Lekukan 13 melambangkan kebijaksanaan menaungi sesama, sementara motif Beras Wutah adalah simbol doa agar pemiliknya senantiasa berkecukupan sandang pangan."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Bilah Keris dengan Warangka Gayaman Solo Timoho",
        "label": "Warangka Gayaman Timoho",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Pendok Kemalo Ukir Perak (+Rp 850.000)",
        "label": "Pendok Ukir Perak",
        "priceDelta": 850000
      },
      {
        "id": "v3",
        "name": "Set Kotak Pusaka Jati Singgasana (+Rp 1.200.000)",
        "label": "Kotak Singgasana Jati",
        "priceDelta": 1200000
      }
    ],
    "reviewsList": [
      {
        "author": "K.P.H. Danurejo",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "25 Oktober 2026",
        "city": "Surakarta, Jawa Tengah",
        "title": "Garap Empu yang Sangat Halus dan Berwibawa",
        "comment": "Pamor Beras Wutahnya kontras benderang dan bilahnya seimbang di tangan. Warangka kayu timoho peletnya memiliki motif alami yang sangat langka."
      },
      {
        "author": "Dr. Suryo Pranoto",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "10 Oktober 2026",
        "city": "Yogyakarta",
        "title": "Warisan Cagar Budaya Bernilai Luhur",
        "comment": "Bilah wangi minyak cendana murni dan pamor nikelnya begitu hidup. Sertifikat kurasi pusaka sangat lengkap."
      },
      {
        "author": "Indra Kusuma",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "25 September 2026",
        "city": "Jakarta Selatan",
        "title": "Mahakarya Seni Tempa Dunia",
        "comment": "Menjadi koleksi pusaka terindah di kediaman kami. Penghargaan setinggi-tingginya untuk empu Sumenep."
      }
    ],
    "complements": [
      2,
      5
    ],
    "specs": {
      "origin": "Sumenep, Madura & Surakarta, Jawa Tengah",
      "artisan": "Padepokan Empu Aeng Tong-Tong & Surakarta",
      "village": "Desa Aeng Tong-Tong, Saronggi, Sumenep",
      "duration": "90 Hari Lipat Tempa",
      "material": "Besi Wasi Tua, Baja Pilihan, Nikel Pamor Meteorit, Warangka Kayu Timoho Pelet",
      "technique": "Tempa Tradisional",
      "dimensions": "Panjang Bilah 37 cm • Total Warangka 51 cm",
      "weight": "850 gram",
      "registryCode": "KRY-009",
      "certification": "UNESCO Masterpiece of the Oral and Intangible Heritage of Humanity 2005"
    },
    "accordions": {
      "specs": "Dimensi presisi: Panjang Bilah 37 cm • Total Warangka 51 cm • Bobot bersih: 850 gram. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Besi Wasi Tua, Baja Pilihan, Nikel Pamor Meteorit, Warangka Kayu Timoho Pelet. Setiap produk disertai nomor registrasi resmi KRY-009 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Desa Aeng Tong-Tong, Saronggi, Sumenep. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Bilah bilah besi pamor dilindungi dengan olesan minyak kelapa campur minyak cendana wangi murni. Warangka dibuat dari kayu timoho alami berpelet corak hitam alami. Perawatan: Oleskan minyak pusaka setiap malam Jumat Kliwon atau 3 bulan sekali agar bilah terhindar dari karat udara."
    }
  },
  {
    "id": 10,
    "code": "KRY-010",
    "name": "Guci Gerabah Bakaran Kasongan Sentuhan Terakota",
    "cat": "keramik",
    "catName": "Keramik & Gerabah",
    "region": "jawa",
    "regionName": "Jawa",
    "daerah": "Bantul, D.I. Yogyakarta",
    "technique": "anyaman-tangan",
    "techniqueName": "Pahat & Putar Tradisional",
    "artisan": "Studio Keramik Tanah Liat Paguyuban Kasongan",
    "village": "Desa Wisata Kasongan, Bangunjiwo, Kasihan, Bantul",
    "waPhone": "6281729003311",
    "durationDays": 14,
    "duration": "14 Hari Putar & Bakar",
    "durationDisplay": "14 Hari Putar Tradisional • Kasongan, Yogyakarta",
    "material": "Tanah Liat Bantul Endapan Sungai Bedog, Pewarna Alami Oker Tanah & Daun Jati",
    "source": "Kemenparekraf — Sentra Desa Wisata Kriya Gerabah Unggulan Indonesia",
    "sourceShort": "Sentra Kemenparekraf",
    "price": 680000,
    "rating": 4.8,
    "sold": 156,
    "badge": "100% Tanah Liat Alami",
    "img": "assets/images/content/wilayah-jawa-borobudur.jpg",
    "artisanImg": "assets/images/pengrajin-ukir.jpg",
    "shortDesc": "Guci artistik terakota yang dibentuk di atas meja putar manual kaki, dengan finishing asap daun jati khas pedesaan Jawa.",
    "philosophy": "Gerabah tanah liat (lempung) mengajarkan filosofi kerendahan hati \"Sangkan Paraning Dumadi\"—bahwa manusia tercipta dari tanah dan akan kembali ke tanah. Tekstur terakota yang bersahaja menghadirkan rasa tenang, sejuk, dan membumi di tengah hiruk-pikuk kehidupan modern.",
    "artisanStory": "Dikerjakan oleh Pak Murdani bersama kelompok pengrajin generasi ketiga Kasongan. Memanfaatkan tanah liat endapan aluvial sungai sekitar yang kaya mineral besi alami. Usaha kriya ini menopang dapur 18 kepala keluarga di dusun Kajen.",
    "materialCare": "Dibakar dengan tungku sekam jerami dan kayu bakar hingga suhu 900°C sehingga padat dan berpori alami. Perawatan: Bersihkan permukaan luar dengan kain setengah basah; guci ini sangat cantik untuk display bunga kering atau sudut ruang berkonsep Japandi/Etnik.",
    "dimensions": "Tinggi 48 cm • Diameter 30 cm",
    "weight": "5.6 kg",
    "gallery": [
      "assets/images/content/wilayah-jawa-borobudur.jpg",
      "assets/images/pengrajin-ukir.jpg",
      "assets/images/content/wilayah-jawa-borobudur.jpg",
      "assets/images/content/jurnal-batik-giriloyo.jpg",
      "assets/images/content/wilayah-jawa-borobudur.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "KRIYA GERABAH KASONGAN",
        "title": "Putaran Meja Kaki & Endapan Aluvial Sungai Bedog",
        "text": "Pak Murdani memutar tanah lempung alami tanpa cetakan mesin industri, lalu membakarnya dengan sekam jerami dan kayu bakar hingga suhu 900°C menghasilkan pori terakota yang sejuk."
      },
      {
        "imageIndex": 4,
        "tag": "SANGKAN PARANING DUMADI",
        "title": "Filosofi Kerendahan Hati Bumi Pertiwi",
        "text": "Gerabah mengajarkan manusia untuk senantiasa rendah hati karena kita tercipta dari sari tanah dan kelak berpulang kembali ke tanah pertiwi."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Guci Terakota Klasik 48 cm",
        "label": "Tinggi 48 cm",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Dudukan Kayu Mahoni Melingkar (+Rp 220.000)",
        "label": "Dudukan Kayu Mahoni",
        "priceDelta": 220000
      }
    ],
    "reviewsList": [
      {
        "author": "Anisa Larasati",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "17 Oktober 2026",
        "city": "Sleman, Yogyakarta",
        "title": "Bentuk Bersahaja yang Menenangkan Ruang",
        "comment": "Warna terakota alaminya menghadirkan rasa sejuk dan damai di sudut ruang tamu. Finishing asap daun jatinya sangat eksotis."
      },
      {
        "author": "Budi Santoso",
        "badge": "Kolektor Terverifikasi",
        "rating": 4.8,
        "date": "03 Oktober 2026",
        "city": "Solo",
        "title": "Kemasan Pengiriman Sangat Aman",
        "comment": "Dikemas dengan peti kayu tebal dan bubble wrap rapat. Tiba tanpa ada cacat sedikit pun."
      },
      {
        "author": "Fiona Adams",
        "badge": "Kolektor Terverifikasi",
        "rating": 4.9,
        "date": "15 September 2026",
        "city": "Denpasar",
        "title": "Earthy Wabi-Sabi Aesthetic",
        "comment": "The unglazed natural texture is stunning. Beautiful tribute to Javanese pottery."
      }
    ],
    "complements": [
      2,
      8
    ],
    "specs": {
      "origin": "Bantul, D.I. Yogyakarta",
      "artisan": "Studio Keramik Tanah Liat Paguyuban Kasongan",
      "village": "Desa Wisata Kasongan, Bangunjiwo, Kasihan, Bantul",
      "duration": "14 Hari Putar & Bakar",
      "material": "Tanah Liat Bantul Endapan Sungai Bedog, Pewarna Alami Oker Tanah & Daun Jati",
      "technique": "Pahat & Putar Tradisional",
      "dimensions": "Tinggi 48 cm • Diameter 30 cm",
      "weight": "5.6 kg",
      "registryCode": "KRY-010",
      "certification": "Kemenparekraf — Sentra Desa Wisata Kriya Gerabah Unggulan Indonesia"
    },
    "accordions": {
      "specs": "Dimensi presisi: Tinggi 48 cm • Diameter 30 cm • Bobot bersih: 5.6 kg. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Tanah Liat Bantul Endapan Sungai Bedog, Pewarna Alami Oker Tanah & Daun Jati. Setiap produk disertai nomor registrasi resmi KRY-010 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Desa Wisata Kasongan, Bangunjiwo, Kasihan, Bantul. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Dibakar dengan tungku sekam jerami dan kayu bakar hingga suhu 900°C sehingga padat dan berpori alami. Perawatan: Bersihkan permukaan luar dengan kain setengah basah; guci ini sangat cantik untuk display bunga kering atau sudut ruang berkonsep Japandi/Etnik."
    }
  },
  {
    "id": 11,
    "code": "KRY-011",
    "name": "Perisai Ukir Talawang Kayu Ulin Dayak Ngaju",
    "cat": "kriya",
    "catName": "Karya Kayu & Ukir",
    "region": "kalimantan",
    "regionName": "Kalimantan",
    "daerah": "Palangka Raya, Kalimantan Tengah",
    "technique": "ukir-pahat",
    "techniqueName": "Ukir Pahat",
    "artisan": "Sanggar Seni Ukir Belanga Kahayan",
    "village": "Pahandut Seberang, Sungai Kahayan, Palangka Raya",
    "waPhone": "6285388990011",
    "durationDays": 35,
    "duration": "35 Hari Pahat Relief Ulin",
    "durationDisplay": "35 Hari Pahat Ulin • Kahayan, Kalimantan Tengah",
    "material": "Kayu Besi Ulin Kalimantan Tua, Pewarna Getah Jernang Merah & Arang Damar",
    "source": "Kemendikbudristek — WBTb Perisai Dayak No. Reg 201700543",
    "sourceShort": "WBTb Kemendikbud",
    "price": 2450000,
    "rating": 4.9,
    "sold": 72,
    "badge": "Kayu Ulin Antik",
    "img": "assets/images/content/wilayah-kalimantan-talawang.jpg",
    "artisanImg": "assets/images/pengrajin-ukir.jpg",
    "shortDesc": "Perisai tradisional suku Dayak dengan ukiran relief motif Kamang Tariu yang gagah berani, penolak marabahaya.",
    "philosophy": "Motif Kamang melambangkan roh keberanian para pejuang leluhur Dayak yang setia menjaga kelestarian hutan adat dan martabat keluarga. Lekukan sulur tanaman kalakai di sekelilingnya menyimbolkan kemampuan bertahan hidup ulet di medan yang paling menantang sekalipun.",
    "artisanStory": "Dipahat oleh Fransiskus Unjung menggunakan mandau pahat khusus warisan pamannya. Fransiskus hanya memakai kayu ulin bekas bantalan rumah terapung tua yang sudah berumur puluhan tahun, sehingga tidak menebang pohon ulin yang kini langka di hutan rimba.",
    "materialCare": "Kayu ulin dijuluki \"kayu besi\" karena semakin terkena air akan semakin keras dan membatu. Warna merah tua dihasilkan dari ekstrak getah buah rotan jernang alami. Perawatan: Cukup lap dari debu; gantung kokoh pada dinding menggunakan bracket pengait kayu yang telah terpasang.",
    "dimensions": "Tinggi 115 cm • Lebar 36 cm",
    "weight": "3.8 kg",
    "gallery": [
      "assets/images/content/wilayah-kalimantan-talawang.jpg",
      "assets/images/pengrajin-ukir.jpg",
      "assets/images/content/wilayah-kalimantan-talawang.jpg",
      "assets/images/content/jurnal-pinisi-bulukumba.jpg",
      "assets/images/content/wilayah-kalimantan-talawang.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "KAYU ULIN LESTARI",
        "title": "Pahat Relief Kamang Tariu Pejuang Dayak",
        "text": "Fransiskus Unjung memahat kayu ulin bekas bantalan rumah terapung tua berumur puluhan tahun, menorehkan relief Kamang penolak bala tanpa menebang sebatang pun pohon ulin liar di rimba Kahayan."
      },
      {
        "imageIndex": 4,
        "tag": "GETAH JERNANG MERAH",
        "title": "Pewarna Alami Ekstrak Buah Rotan Rimba",
        "text": "Warna merah saga dihasilkan dari rebusan buah jernang hutan yang meresap ke serat kayu besi ulin, abadi tak luntur terkena terik matahari dan air hujan."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Perisai Talawang Ukir Ulin 115 cm",
        "label": "Ukuran Dinding 115 cm",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Dudukan Display Tegak Kayu Jati (+Rp 350.000)",
        "label": "Dudukan Display Tegak",
        "priceDelta": 350000
      }
    ],
    "reviewsList": [
      {
        "author": "Yulius Lawing",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "21 Oktober 2026",
        "city": "Palangka Raya, Kalteng",
        "title": "Ukiran Dayak Ngaju Asli yang Sangat Berwibawa",
        "comment": "Berat kayu ulinnya membuktikan kualitas kayu antik. Pahatan relief Kamang Tariunya memancarkan aura perlindungan yang sangat kuat."
      },
      {
        "author": "Denny Setiawan",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "07 Oktober 2026",
        "city": "Balikpapan",
        "title": "Pilihan Material yang Bertanggung Jawab",
        "comment": "Sangat menghargai penggunaan kayu ulin daur ulang rumah tua. Seni kriya yang ramah lingkungan dan sarat martabat tradisi."
      },
      {
        "author": "Marcus Lindqvist",
        "badge": "Kolektor Terverifikasi",
        "rating": 4.9,
        "date": "18 September 2026",
        "city": "Jakarta Pusat",
        "title": "Magnificent Tribal Shield",
        "comment": "Ironwood grain with blood-red dragon blood resin dye is exceptional. Wall bracket worked perfectly."
      }
    ],
    "complements": [
      6,
      3
    ],
    "specs": {
      "origin": "Palangka Raya, Kalimantan Tengah",
      "artisan": "Sanggar Seni Ukir Belanga Kahayan",
      "village": "Pahandut Seberang, Sungai Kahayan, Palangka Raya",
      "duration": "35 Hari Pahat Relief Ulin",
      "material": "Kayu Besi Ulin Kalimantan Tua, Pewarna Getah Jernang Merah & Arang Damar",
      "technique": "Ukir Pahat",
      "dimensions": "Tinggi 115 cm • Lebar 36 cm",
      "weight": "3.8 kg",
      "registryCode": "KRY-011",
      "certification": "Kemendikbudristek — WBTb Perisai Dayak No. Reg 201700543"
    },
    "accordions": {
      "specs": "Dimensi presisi: Tinggi 115 cm • Lebar 36 cm • Bobot bersih: 3.8 kg. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: Kayu Besi Ulin Kalimantan Tua, Pewarna Getah Jernang Merah & Arang Damar. Setiap produk disertai nomor registrasi resmi KRY-011 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Pahandut Seberang, Sungai Kahayan, Palangka Raya. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Kayu ulin dijuluki \"kayu besi\" karena semakin terkena air akan semakin keras dan membatu. Warna merah tua dihasilkan dari ekstrak getah buah rotan jernang alami. Perawatan: Cukup lap dari debu; gantung kokoh pada dinding menggunakan bracket pengait kayu yang telah terpasang."
    }
  },
  {
    "id": 12,
    "code": "KRY-012",
    "name": "Kain Tenun Sutra Sengkang Corak Lagosi Wajo",
    "cat": "wastra",
    "catName": "Wastra & Tenun",
    "region": "sulawesi",
    "regionName": "Sulawesi",
    "daerah": "Danau Tempe, Sengkang, Wajo, Sulawesi Selatan",
    "technique": "tenun-ikat",
    "techniqueName": "Tenun Ikat",
    "artisan": "Kelompok Penenun Sutra Danau Tempe Wajo",
    "village": "Kampung Sutra Pakanna, Tanasitolo, Wajo",
    "waPhone": "6281355440077",
    "durationDays": 50,
    "duration": "50 Hari Tenun Sutra Alami",
    "durationDisplay": "50 Hari Tenun Gedogan • Danau Tempe, Wajo",
    "material": "100% Serat Ulat Sutra Murbei Lokal, Pewarna Ekstrak Daun Mangga & Kunyit",
    "source": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201500275",
    "sourceShort": "WBTb Kemendikbud",
    "price": 1950000,
    "rating": 4.9,
    "sold": 115,
    "badge": "Sutra Ulat Murbei Murni",
    "img": "assets/images/content/wilayah-sulawesi-tongkonan.jpg",
    "artisanImg": "assets/images/pengrajin-tenun.jpg",
    "shortDesc": "Kain sutra kemilau khas Bugis dengan motif bunga Lagosi yang lembut, ditenun dari ulat murbei peternak lokal Danau Tempe.",
    "philosophy": "Corak Lagosi melambangkan keanggunan, keteguhan hati, dan kesetiaan wanita Bugis. Perpaduan warna cerah dengan kilau sutra alami mencerminkan harapan kebahagiaan rumah tangga yang harmonis serta kehormatan siri na pacce yang dijunjung tinggi dalam masyarakat Sulawesi Selatan.",
    "artisanStory": "Ditenun oleh Ibu Nurhaya bersama paguyuban ibu-ibu di pesisir Danau Tempe. Benang sutra dipintal langsung dari kepompong ulat murbei yang dibudidayakan sendiri oleh para petani lokal. Membeli selembar kain ini menghidupkan ekosistem hulu-hilir sutra tradisional dari pohon murbei hingga lembaran kain.",
    "materialCare": "Sutra murni terasa sejuk di kulit saat cuaca panas dan menghangatkan saat cuaca dingin. Perawatan: Jangan dicuci dengan deterjen pemutih; gunakan sabun khusus sutra atau sampo bayi lembut, lalu peras lembut dan jemur mendatar di tempat teduh.",
    "dimensions": "220 cm × 110 cm",
    "weight": "380 gram",
    "gallery": [
      "assets/images/content/wilayah-sulawesi-tongkonan.jpg",
      "assets/images/pengrajin-tenun.jpg",
      "assets/images/content/wilayah-sulawesi-tongkonan.jpg",
      "assets/images/content/jurnal-pinisi-bulukumba.jpg",
      "assets/images/content/wilayah-sulawesi-tongkonan.jpg"
    ],
    "overlayStories": [
      {
        "imageIndex": 2,
        "tag": "SUTRA ALAMI WAJO",
        "title": "Pintalan Ulat Murbei Peternak Pesisir Danau Tempe",
        "text": "Ibu Nurhaya dan kelompok penenun sutra Danau Tempe membudidayakan pohon murbei sendiri. Benang sutra berkilau ditenun dengan alat tenun gedogan manual menghasilkan kain yang sejuk di kulit."
      },
      {
        "imageIndex": 4,
        "tag": "CORAK BUNGA LAGOSI",
        "title": "Simbol Keanggunan & Kesetiaan Siri Na Pacce",
        "text": "Pola bunga Lagosi yang bermekaran melambangkan keanggunan, keteguhan hati, dan kebahagiaan keluarga yang menjunjung tinggi kehormatan martabat Bugis."
      }
    ],
    "variants": [
      {
        "id": "v1",
        "name": "Kain Sutra Panjang Corak Lagosi (220×110 cm)",
        "label": "Kain Panjang 220 cm",
        "priceDelta": 0
      },
      {
        "id": "v2",
        "name": "Dengan Selendang Pendamping Sutra Tipis (+Rp 450.000)",
        "label": "Dengan Selendang Pendamping",
        "priceDelta": 450000
      },
      {
        "id": "v3",
        "name": "Kemasan Tabung Sutra Eksklusif (+Rp 250.000)",
        "label": "Kemasan Tabung Sutra",
        "priceDelta": 250000
      }
    ],
    "reviewsList": [
      {
        "author": "Andi Tenri Bau",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "26 Oktober 2026",
        "city": "Makassar, Sulsel",
        "title": "Kilau Sutra Asli Danau Tempe",
        "comment": "Sutra Wajo asli terasa dingin saat disentuh dan tidak panas saat dikenakan di cuaca tropis. Motif lagosinya sangat memukau."
      },
      {
        "author": "Ratna Juwita",
        "badge": "Kolektor Terverifikasi",
        "rating": 5,
        "date": "11 Oktober 2026",
        "city": "Kendari",
        "title": "Warna Alami yang Sangat Lembut",
        "comment": "Gradasi warna daun mangga dan kunyitnya menghasilkan kuning keemasan yang menawan. Kain pusaka kebanggaan keluarga."
      },
      {
        "author": "Siti Nurhaliza",
        "badge": "Kolektor Terverifikasi",
        "rating": 4.9,
        "date": "22 September 2026",
        "city": "Surabaya",
        "title": "Kualitas Tenunan Sutra Kelas Dunia",
        "comment": "Sangat halus, jatuh di badan dengan sempurna, dan aromanya bersih tanpa residu pabrik."
      }
    ],
    "complements": [
      1,
      5
    ],
    "specs": {
      "origin": "Danau Tempe, Sengkang, Wajo, Sulawesi Selatan",
      "artisan": "Kelompok Penenun Sutra Danau Tempe Wajo",
      "village": "Kampung Sutra Pakanna, Tanasitolo, Wajo",
      "duration": "50 Hari Tenun Sutra Alami",
      "material": "100% Serat Ulat Sutra Murbei Lokal, Pewarna Ekstrak Daun Mangga & Kunyit",
      "technique": "Tenun Ikat",
      "dimensions": "220 cm × 110 cm",
      "weight": "380 gram",
      "registryCode": "KRY-012",
      "certification": "Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201500275"
    },
    "accordions": {
      "specs": "Dimensi presisi: 220 cm × 110 cm • Bobot bersih: 380 gram. Dibuat secara manual helai demi helai/pahat demi pahat menggunakan material alami otentik: 100% Serat Ulat Sutra Murbei Lokal, Pewarna Ekstrak Daun Mangga & Kunyit. Setiap produk disertai nomor registrasi resmi KRY-012 dan stempel kurasi adat.",
      "impact": "100% Karya Tangan Pengrajin Lokal di Kampung Sutra Pakanna, Tanasitolo, Wajo. 72% dari nilai apresiasi karya ini langsung disalurkan ke sanggar pengrajin untuk menopang ketahanan ekonomi keluarga, pendidikan anak desa, dan pelestarian bahan alami tanpa zat kimia buatan.",
      "care": "Sutra murni terasa sejuk di kulit saat cuaca panas dan menghangatkan saat cuaca dingin. Perawatan: Jangan dicuci dengan deterjen pemutih; gunakan sabun khusus sutra atau sampo bayi lembut, lalu peras lembut dan jemur mendatar di tempat teduh."
    }
  }
];

// Helper lookup functions
function getProductByIdOrCode(idOrCode) {
  if (!idOrCode) {
    const list = typeof getSynchronizedCatalog === 'function' ? getSynchronizedCatalog() : NUSAVA_PRODUCTS;
    const defaultItem = list[0] || NUSAVA_PRODUCTS[0];
    const defaultCode = (defaultItem.code || '').toLowerCase();
    const detailed = NUSAVA_PRODUCTS.find(p => (p.code && p.code.toLowerCase() === defaultCode) || (p.id && String(p.id) === String(defaultItem.id)));
    return detailed ? { ...defaultItem, ...detailed } : defaultItem;
  }
  const query = String(idOrCode).trim().toLowerCase();
  
  // 1. Look for rich editorial details in NUSAVA_PRODUCTS
  const foundDetailed = NUSAVA_PRODUCTS.find(p => 
    (p.code && p.code.toLowerCase() === query) || 
    (p.id && String(p.id).toLowerCase() === query)
  );

  // 2. Look in synchronized catalog (artisan edits & BASE_CATALOG_8)
  let foundSync = null;
  if (typeof getSynchronizedCatalog === 'function') {
    const syncList = getSynchronizedCatalog();
    foundSync = syncList.find(p => (p.code && p.code.toLowerCase() === query) || (p.id && String(p.id).toLowerCase() === query));
  }

  // 3. Merge: Prioritize rich editorial content (philosophy, village, stories, gallery, variants, accordions)
  // while preserving synchronized status/stock/price updates
  if (foundDetailed && foundSync) {
    return {
      ...foundSync,
      ...foundDetailed,
      price: foundSync.price || foundDetailed.price,
      stock: foundSync.stock !== undefined ? foundSync.stock : foundDetailed.stock,
      sold: foundSync.sold !== undefined ? foundSync.sold : foundDetailed.sold,
      status: foundSync.status || foundDetailed.status || 'Siap Kirim'
    };
  }

  if (foundDetailed) return foundDetailed;

  if (foundSync) {
    // Fallback hydration for items that exist only in catalog (e.g. KRY-013+)
    const loc = foundSync.daerah || foundSync.origin || 'Nusantara';
    const art = foundSync.artisan || 'Pengrajin Lokal';
    return {
      ...foundSync,
      village: foundSync.village || loc,
      daerah: foundSync.daerah || loc,
      artisan: art,
      philosophy: foundSync.philosophy || foundSync.desc || 'Karya ini menyimpan nilai luhur warisan leluhur Nusantara.',
      artisanStory: foundSync.artisanStory || `Dikerjakan langsung oleh ${art} di ${loc}. Seluruh proses pengerjaan dilakukan secara tradisional dengan dedikasi tinggi.`,
      accordions: foundSync.accordions || {
        specs: `Dimensi: ${foundSync.dimensions || 'Sesuai spesifikasi adat'}. Material: ${foundSync.category || 'Alami Tradisional'}. Disertai sertifikasi kurasi budaya resmi.`,
        impact: `100% buatan tangan pengrajin di ${loc}. 72% dari nilai apresiasi karya langsung mengalir menopang kesejahteraan keluarga pengrajin lokal.`,
        care: 'Simpan di tempat berventilasi baik. Bersihkan secara berkala menggunakan kuas lembut tanpa bahan kimia keras.'
      }
    };
  }

  // Try numeric id (e.g. '1' or 1)
  const numericId = parseInt(query.replace(/\D/g, ''), 10);
  if (!isNaN(numericId)) {
    const byNum = NUSAVA_PRODUCTS.find(p => p.id === numericId);
    if (byNum) return byNum;
  }
  
  // Default to first product as fallback
  return NUSAVA_PRODUCTS[0];
}

// Category definitions
const NUSAVA_CATEGORIES = [
  { id: 'all', label: 'SEMUA KARYA', count: 12 },
  { id: 'wastra', label: 'KAIN & TENUN', count: 4 },
  { id: 'kriya', label: 'UKIRAN KAYU', count: 2 },
  { id: 'keramik', label: 'KERAMIK & GERABAH', count: 1 },
  { id: 'anyaman', label: 'ANYAMAN ALAM', count: 2 },
  { id: 'logam-instrumen', label: 'LOGAM & ALAT MUSIK', count: 3 }
];

// Region definitions
const NUSAVA_REGIONS = [
  { id: 'all', label: 'Semua Daerah' },
  { id: 'bali-nusra', label: 'Bali & Nusa Tenggara' },
  { id: 'jawa', label: 'Jawa' },
  { id: 'sumatera', label: 'Sumatera' },
  { id: 'kalimantan', label: 'Kalimantan' },
  { id: 'sulawesi', label: 'Sulawesi' },
  { id: 'papua-maluku', label: 'Papua & Maluku' }
];

// Technique definitions
const NUSAVA_TECHNIQUES = [
  { id: 'all', label: 'Semua Cara Pembuatan' },
  { id: 'tenun-ikat', label: 'Tenun Ikat Tradisional' },
  { id: 'batik-tulis', label: 'Membatik dengan Canting' },
  { id: 'ukir-pahat', label: 'Memahat & Mengukir Kayu' },
  { id: 'anyaman-tangan', label: 'Menganyam dengan Tangan' },
  { id: 'tempa-tradisional', label: 'Menempa Logam & Perak' }
];

// Kartu Kisah Pengrajin untuk Tampilan Editorial Grid Katalog
const NUSAVA_EDITORIAL_TILES = [
  {
    positionIndex: 2, // Row 1, Column 3
    type: 'editorial-tile',
    tag: 'KEAHLIAN MAESTRO',
    title: 'Setiap Helai Benang Menyimpan Doa Ibu Penenun',
    quote: 'Dalam hening kolong rumah panggung adat, jemari mama memintal doa Marapu agar pemakainya senantiasa terlindungi.',
    img: 'assets/images/pengrajin-tenun.jpg',
    origin: 'Lambanapu, Sumba Timur'
  },
  {
    positionIndex: 5, // Row 2/3
    type: 'editorial-tile',
    tag: 'PELESTARIAN LELUHUR',
    title: 'Hening Tirakat di Depan Bara Api Tempa Besi',
    quote: 'Besi meteorit dan nikel dilipat beratus kali dalam hening rasa batin empu desa Aeng Tong-Tong, menjaga martabat pusaka Nusantara.',
    img: 'assets/images/pengrajin-ukir.jpg',
    origin: 'Sumenep, Madura'
  },
  {
    positionIndex: 9, // Row 3/4
    type: 'editorial-tile',
    tag: '100% ALAMI & BERDAYA',
    title: 'Mewarnai dari Buah Mengkudu & Nila Liar Hutan',
    quote: 'Bebas dari limbah kimia beracun. Warna abadi ini dipanen langsung dari alam yang kami rawat dengan penuh syukur.',
    img: 'assets/images/pengrajin-batik.jpg',
    origin: 'Giriloyo, Yogyakarta'
  }
];

/* ==========================================================================
   KATALOG PUSAKA DASAR 8 DAERAH NUSANTARA
   ========================================================================== */
const BASE_CATALOG_8 = [
  {
    id: "KRY-001",
    code: "KRY-001",
    name: "Kain Tenun Ikat Hinggi Kawuru Sumba",
    cat: "wastra",
    category: "Wastra",
    categoryLabel: "Kain & Tenun",
    origin: "Sumba Timur",
    daerah: "Lambanapu, Sumba Timur",
    region: "bali-nusra",
    regionName: "Bali & Nusa Tenggara",
    artisan: "Mama Penenun Lambanapu",
    price: 3450000,
    duration: "240 Hari Ditenun Tangan",
    durationDays: 240,
    status: "Kerajinan Asli",
    stock: 3,
    sold: 248,
    wbtbReg: "WBTb-2014-NTT-00144",
    curator: "Dra. Siti Rahayu (Kurator Tekstil Tradisional)",
    verifiedDate: "09 Mei 2022",
    img: "assets/images/content/produk-tenun-sumba.jpg",
    desc: "Kain tenun asli buatan tangan ibu-ibu di Sumba. Dibuat selama 8 bulan dari benang kapas alami dengan motif kuda lambang keberanian."
  },
  {
    id: "KRY-002",
    code: "KRY-002",
    name: "Batik Tulis Nitik Kembang Jeruk Giriloyo",
    cat: "wastra",
    category: "Wastra",
    categoryLabel: "Kain & Tenun",
    origin: "DI Yogyakarta",
    daerah: "Giriloyo, Imogiri, Bantul",
    region: "jawa",
    regionName: "Jawa",
    artisan: "Paguyuban Giriloyo",
    price: 1950000,
    duration: "45 Hari Dibatik Tulis",
    durationDays: 45,
    status: "Kerajinan Asli",
    stock: 8,
    sold: 184,
    wbtbReg: "WBTb-2021-DIY-0012",
    curator: "K.R.T. Hardjodipuro (Pakar Batik Keraton)",
    verifiedDate: "18 Oktober 2021",
    img: "assets/images/content/produk-batik-giriloyo.jpg",
    desc: "Kain batik tulis asli Yogyakarta dengan motif bunga jeruk. Digambar rapi titik demi titik menggunakan canting dan lilin malam alami."
  },
  {
    id: "KRY-003",
    code: "KRY-003",
    name: "Tas Noken Asli Serat Anggrek Hutan Papua",
    cat: "anyaman",
    category: "Anyaman",
    categoryLabel: "Anyaman Alam",
    origin: "Lembah Baliem",
    daerah: "Wamena, Jayawijaya, Papua",
    region: "papua-maluku",
    regionName: "Papua & Maluku",
    artisan: "Mama Yustina Wenda",
    price: 890000,
    duration: "30 Hari Dianyam Tangan",
    durationDays: 30,
    status: "Kerajinan Asli",
    stock: 12,
    sold: 312,
    wbtbReg: "UNESCO-00619",
    curator: "Balai Pelestarian Nilai Budaya Papua",
    verifiedDate: "04 Desember 2012",
    img: "assets/images/content/produk-noken-papua.jpg",
    desc: "Tas tradisional khas Papua yang dirajut tangan dari serat kulit kayu dan tangkai anggrek hutan. Bahannya kuat, lentur, dan awet."
  },
  {
    id: "KRY-004",
    code: "KRY-004",
    name: "Perhiasan Perak Filigri Motif Teratai Celuk",
    cat: "logam-instrumen",
    category: "Logam",
    categoryLabel: "Logam & Alat Musik",
    origin: "Gianyar Bali",
    daerah: "Desa Celuk, Sukawati, Gianyar",
    region: "bali-nusra",
    regionName: "Bali & Nusa Tenggara",
    artisan: "Pande Ketut Subawa",
    price: 2750000,
    duration: "21 Hari Dibuat Tangan",
    durationDays: 21,
    status: "Siap Kirim",
    stock: 5,
    sold: 92,
    wbtbReg: "WBTb-2019-BALI-0078",
    curator: "Dr. Ida Bagus Wesnawa",
    verifiedDate: "14 Agustus 2023",
    img: "assets/images/content/produk-perak-celuk.jpg",
    desc: "Perhiasan bros perak berbentuk bunga teratai khas Bali. Dibuat sangat teliti dari gulungan kawat perak murni oleh pengrajin Desa Celuk."
  },
  {
    id: "KRY-005",
    code: "KRY-005",
    name: "Kain Songket Lepus Berlian Emas Sriwijaya",
    cat: "wastra",
    category: "Wastra",
    categoryLabel: "Kain & Tenun",
    origin: "Palembang",
    daerah: "Tangga Buntung, Palembang",
    region: "sumatera",
    regionName: "Sumatera",
    artisan: "Sanggar Cek Siti",
    price: 6200000,
    duration: "120 Hari Ditenun Tangan",
    durationDays: 120,
    status: "Kerajinan Asli",
    stock: 2,
    sold: 68,
    wbtbReg: "WBTb-2013-SS-00009",
    curator: "Ny. Hj. Zainal Songket",
    verifiedDate: "11 Desember 2023",
    img: "assets/images/content/produk-songket-palembang.jpg",
    desc: "Kain songket mewah khas Palembang. Ditenun tangan dari benang sutra halus dan dihiasi sulaman benang emas yang berkilau indah."
  },
  {
    id: "KRY-006",
    code: "KRY-006",
    name: "Ukiran Patung Mbis Roh Leluhur Suku Asmat",
    cat: "kriya",
    category: "Kayu",
    categoryLabel: "Ukiran Kayu",
    origin: "Agats Papua",
    daerah: "Distrik Agats, Asmat, Papua Selatan",
    region: "papua-maluku",
    regionName: "Papua & Maluku",
    artisan: "Maestro Pahat Wow-ipits",
    price: 5400000,
    duration: "35 Hari Dipahat Tangan",
    durationDays: 35,
    status: "Kerajinan Asli",
    stock: 2,
    sold: 34,
    wbtbReg: "WBTb-2015-PAPUA-0021",
    curator: "Tim Antropologi Seni Papua Kemendikbud",
    verifiedDate: "15 Juli 2023",
    img: "assets/images/content/produk-patung-asmat.jpg",
    desc: "Patung kayu bersusun khas suku Asmat di Papua. Dipahat rapi dari kayu bakau yang sangat kokoh dan diwarnai dengan bahan alami."
  },
  {
    id: "KRY-007",
    code: "KRY-007",
    name: "Instrumen Sasando Resonator Daun Lontar Rote",
    cat: "logam-instrumen",
    category: "Instrumen",
    categoryLabel: "Logam & Alat Musik",
    origin: "Rote Ndao",
    daerah: "Oebelo, Rote Ndao, NTT",
    region: "bali-nusra",
    regionName: "Bali & Nusa Tenggara",
    artisan: "Maestro Jeremias Pah",
    price: 3850000,
    duration: "40 Hari Dirakit Tangan",
    durationDays: 40,
    status: "Siap Kirim",
    stock: 4,
    sold: 126,
    wbtbReg: "WBTb-2012-NTT-00028",
    curator: "Prof. Dr. Frans Seda",
    verifiedDate: "23 September 2022",
    img: "assets/images/content/produk-sasando-rote.jpg",
    desc: "Alat musik petik tradisional dari Pulau Rote, NTT. Terbuat dari bambu pilihan dengan wadah suara dari daun pohon lontar yang lentur."
  },
  {
    id: "KRY-008",
    code: "KRY-008",
    name: "Anyaman Serat Ketak Beleka Asap Kelapa Lombok",
    cat: "anyaman",
    category: "Anyaman",
    categoryLabel: "Anyaman Alam",
    origin: "Lombok Tengah",
    daerah: "Desa Beleka, Praya Timur, Lombok",
    region: "bali-nusra",
    regionName: "Bali & Nusa Tenggara",
    artisan: "Inaq Nuraini Beleka",
    price: 780000,
    duration: "14 Hari Dianyam Tangan",
    durationDays: 14,
    status: "Siap Kirim",
    stock: 15,
    sold: 295,
    wbtbReg: "WBTb-2022-NTB-0033",
    curator: "Lalu M. Sukiman (Pemerhati Kerajinan Sasak)",
    verifiedDate: "19 Juli 2022",
    img: "assets/images/content/produk-ketak-lombok.jpg",
    desc: "Wadah kotak serbaguna khas Lombok yang dianyam rapi dari tanaman paku hutan. Diasapi dengan sabut kelapa agar kuat dan tahan air."
  },
  {
    id: "KRY-009",
    code: "KRY-009",
    name: "Keris Ladrang Kamardikan Pamor Wos Wutah",
    cat: "logam-instrumen",
    category: "Logam",
    categoryLabel: "Logam & Alat Musik",
    origin: "Surakarta",
    daerah: "Batur Ceper & Surakarta, Jawa Tengah",
    region: "jawa",
    regionName: "Jawa",
    artisan: "Empu Subandi Suwito",
    price: 8500000,
    duration: "90 Hari Ditempa Tangan",
    durationDays: 90,
    status: "Kerajinan Asli",
    stock: 1,
    sold: 19,
    wbtbReg: "UNESCO-00112",
    curator: "Empu Subandi Suwito (Master Tosan Aji)",
    verifiedDate: "05 Januari 2020",
    img: "assets/images/content/jurnal-keris-jawa.jpg",
    desc: "Senjata tradisional keris dengan lekukan indah dari Madura. Ditempa secara tradisional dari campuran logam pilihan dan sarung kayu wangi."
  },
  {
    id: "KRY-010",
    code: "KRY-010",
    name: "Gerabah Terakota Kasongan Bakaran Tungku Kayu",
    cat: "kriya",
    category: "Gerabah",
    categoryLabel: "Keramik & Gerabah",
    origin: "Bantul Yogyakarta",
    daerah: "Desa Wisata Kasongan, Bantul, DIY",
    region: "jawa",
    regionName: "Jawa",
    artisan: "Pak Timin Kasongan",
    price: 920000,
    duration: "18 Hari Dibentuk & Dibakar",
    durationDays: 18,
    status: "Siap Kirim",
    stock: 8,
    sold: 142,
    wbtbReg: "WBTb-2017-DIY-0039",
    curator: "Drs. Timbul Raharjo, M.Hum.",
    verifiedDate: "16 Juni 2023",
    img: "assets/images/content/produk-keramik-kasongan.jpg",
    desc: "Guci hias dari tanah liat merah khas Kasongan, Yogyakarta. Dibentuk rapi dengan meja putar tangan dan dibakar dengan tungku tradisional."
  },
  {
    id: "KRY-011",
    code: "KRY-011",
    name: "Perisai Talawang Kayu Ulin Pahat Kamang Dayak",
    cat: "kriya",
    category: "Kayu",
    categoryLabel: "Ukiran Kayu",
    origin: "Hulu Mahakam",
    daerah: "Hulu Sungai Mahakam, Kalimantan Timur",
    region: "kalimantan",
    regionName: "Kalimantan",
    artisan: "Maestro Aloysius",
    price: 2850000,
    duration: "18 Hari Diukir Tangan",
    durationDays: 18,
    status: "Siap Kirim",
    stock: 6,
    sold: 58,
    wbtbReg: "WBTb-2023-KT-0119",
    curator: "Drs. Aloysius Reyaan",
    verifiedDate: "22 November 2023",
    img: "assets/images/content/wilayah-kalimantan-talawang.jpg",
    desc: "Alat pelindung tradisional suku Dayak di Kalimantan. Terbuat dari kayu ulin yang sangat kuat dan diukir indah bermotif pejuang gagah berani."
  },
  {
    id: "KRY-012",
    code: "KRY-012",
    name: "Panel Pahat Pa'tedong Tongkonan Ukir Ulin",
    cat: "kriya",
    category: "Kayu",
    categoryLabel: "Ukiran Kayu",
    origin: "Tana Toraja",
    daerah: "Kete Kesu, Tana Toraja, Sulsel",
    region: "sulawesi",
    regionName: "Sulawesi",
    artisan: "Maestro Sukadana",
    price: 4250000,
    duration: "24 Hari Diukir Tangan",
    durationDays: 24,
    status: "Kerajinan Asli",
    stock: 4,
    sold: 41,
    wbtbReg: "WBTb-2024-TRJ-0041",
    curator: "Prof. Dr. I Made Bandem",
    verifiedDate: "14 Agustus 2024",
    img: "assets/images/content/wilayah-sulawesi-tongkonan.jpg",
    desc: "Papan hiasan dinding khas Toraja, Sulawesi Selatan. Diukir rapi dengan motif kepala kerbau yang melambangkan kemakmuran dan persaudaraan."
  },
  {
    id: "KRY-013",
    code: "KRY-013",
    name: "Kain Ulos Ragidup Tenun Songket Tangan Samosir",
    cat: "wastra",
    category: "Wastra",
    categoryLabel: "Kain & Tenun",
    origin: "Samosir",
    daerah: "Lumban Suhi-Suhi, Pulau Samosir, Sumut",
    region: "sumatera",
    regionName: "Sumatera",
    artisan: "Ompu Boru Situmorang",
    price: 3800000,
    duration: "90 Hari Ditenun Tangan",
    durationDays: 90,
    status: "Kerajinan Asli",
    stock: 3,
    sold: 76,
    wbtbReg: "WBTb-2014-SU-00122",
    curator: "Yayasan Pusuk Buhit Danau Toba",
    verifiedDate: "10 Oktober 2023",
    img: "assets/images/content/produk-ulos-batak.jpg",
    desc: "Kain selendang tradisional suku Batak dari Danau Toba. Ditenun tangan dengan rapi sebagai tanda doa restu dan kasih sayang orang tua."
  },
  {
    id: "KRY-014",
    code: "KRY-014",
    name: "Topeng Kayu Panji Cirebon Klasik Halus",
    cat: "kriya",
    category: "Kayu",
    categoryLabel: "Ukiran Kayu",
    origin: "Cirebon",
    daerah: "Slangit, Klangenan, Cirebon, Jabar",
    region: "jawa",
    regionName: "Jawa",
    artisan: "Ki Dalang Sujana Arja",
    price: 1650000,
    duration: "14 Hari Dipahat Tangan",
    durationDays: 14,
    status: "Siap Kirim",
    stock: 7,
    sold: 88,
    wbtbReg: "WBTb-2010-JB-00018",
    curator: "Keluarga Dalang Topeng Slangit",
    verifiedDate: "24 April 2022",
    img: "assets/images/content/produk-topeng-panji.jpg",
    desc: "Topeng tari tradisional khas Cirebon, Jawa Barat. Dipahat dari kayu putih yang halus dan melambangkan hati yang bersih serta tenang."
  },
  {
    id: "KRY-015",
    code: "KRY-015",
    name: "Senjata Pusaka Mandau Dayak Hulu Tanduk Rusa",
    cat: "logam-instrumen",
    category: "Logam",
    categoryLabel: "Logam & Alat Musik",
    origin: "Kutai Barat",
    daerah: "Barong Tongkok, Kutai Barat, Kaltim",
    region: "kalimantan",
    regionName: "Kalimantan",
    artisan: "Tukang Besi Adat Temanggung Siluq",
    price: 4750000,
    duration: "45 Hari Ditempa & Diukir",
    durationDays: 45,
    status: "Kerajinan Asli",
    stock: 2,
    sold: 29,
    wbtbReg: "WBTb-2016-KT-00388",
    curator: "Lembaga Adat Besar Dayak Kaltim",
    verifiedDate: "12 September 2023",
    img: "assets/images/content/produk-mandau-dayak.jpg",
    desc: "Senjata hiasan tradisional khas Dayak di Kalimantan. Gagangnya diukir dari tanduk rusa dan sarungnya dihiasi anyaman rotan yang rapi."
  },
  {
    id: "KRY-016",
    code: "KRY-016",
    name: "Angklung Bambu Hitam Nada Pentatonis Sunda",
    cat: "logam-instrumen",
    category: "Instrumen",
    categoryLabel: "Logam & Alat Musik",
    origin: "Bandung Sunda",
    daerah: "Padasuka, Cibeunying Kidul, Bandung",
    region: "jawa",
    regionName: "Jawa",
    artisan: "Keluarga Udjo Ngalagena",
    price: 1450000,
    duration: "20 Hari Dirakit Tangan",
    durationDays: 20,
    status: "Siap Kirim",
    stock: 10,
    sold: 165,
    wbtbReg: "UNESCO-00393",
    curator: "Saung Angklung Paguyuban Pasundan",
    verifiedDate: "18 November 2010",
    img: "assets/images/content/produk-angklung-sunda.jpg",
    desc: "Alat musik bambu tradisional khas Jawa Barat. Dimainkan dengan cara digoyangkan untuk menghasilkan nada merdu yang indah dan ceria."
  },
  {
    id: "KRY-017",
    code: "KRY-017",
    name: "Wayang Golek Kayu Albasia Karakter Cepot Sunda",
    cat: "kriya",
    category: "Kayu",
    categoryLabel: "Ukiran Kayu",
    origin: "Purwakarta Sunda",
    daerah: "Ciparay, Bandung & Purwakarta, Jabar",
    region: "jawa",
    regionName: "Jawa",
    artisan: "Ki Entis Sutisna",
    price: 1250000,
    duration: "12 Hari Dipahat Tangan",
    durationDays: 12,
    status: "Siap Kirim",
    stock: 8,
    sold: 110,
    wbtbReg: "WBTb-2015-JB-00234",
    curator: "Persatuan Pedalangan Indonesia (PEPADI)",
    verifiedDate: "07 Maret 2023",
    img: "assets/images/content/produk-wayang-golek.jpg",
    desc: "Boneka wayang kayu tokoh Si Cepot khas Sunda, Jawa Barat. Berwajah merah ceria dengan mulut yang bisa digerakkan saat bercerita."
  },
  {
    id: "KRY-018",
    code: "KRY-018",
    name: "Miniatur Mahakarya Pinisi Kayu Besi Bulukumba",
    cat: "kriya",
    category: "Kayu",
    categoryLabel: "Ukiran Kayu",
    origin: "Bulukumba",
    daerah: "Tanah Beru, Bulukumba, Sulsel",
    region: "sulawesi",
    regionName: "Sulawesi",
    artisan: "Panrita Lopi Muhammad Jafar",
    price: 4600000,
    duration: "50 Hari Dirakit Tangan",
    durationDays: 50,
    status: "Kerajinan Asli",
    stock: 3,
    sold: 48,
    wbtbReg: "UNESCO-01240",
    curator: "Pusat Riset Arkeologi Kemaritiman BRIN",
    verifiedDate: "07 Desember 2017",
    img: "assets/images/content/jurnal-pinisi-bulukumba.jpg",
    desc: "Miniatur kapal layar tradisional Pinisi khas Sulawesi Selatan. Dibuat rapi dari kayu jati dan kayu besi menggunakan pasak kayu tanpa paku besi."
  }
];

function getSynchronizedCatalog() {
  const baseMap = new Map();
  BASE_CATALOG_8.forEach(item => {
    baseMap.set(item.code || item.id, { ...item });
  });

  try {
    const rawSaved = typeof localStorage !== 'undefined' ? localStorage.getItem('nusava_artisan_products') : null;
    if (rawSaved) {
      const parsed = JSON.parse(rawSaved);
      if (Array.isArray(parsed)) {
        parsed.forEach((artisanItem, idx) => {
          const key = artisanItem.id || artisanItem.code || `KRY-${String(idx + 1).padStart(3, '0')}`;
          
          let cat = 'kriya';
          const catLower = (artisanItem.category || artisanItem.cat || '').toLowerCase();
          if (catLower.includes('wastra') || catLower.includes('tenun') || catLower.includes('batik') || catLower.includes('songket')) {
            cat = 'wastra';
          } else if (catLower.includes('kayu') || catLower.includes('kriya') || catLower.includes('patung') || catLower.includes('ukir')) {
            cat = 'kriya';
          } else if (catLower.includes('logam') || catLower.includes('keris') || catLower.includes('musik')) {
            cat = 'logam-instrumen';
          } else if (catLower.includes('anyaman') || catLower.includes('serat') || catLower.includes('ketak') || catLower.includes('noken')) {
            cat = 'anyaman';
          }

          let region = 'jawa';
          const origLower = (artisanItem.origin || artisanItem.daerah || '').toLowerCase();
          if (origLower.includes('sumatera') || origLower.includes('palembang') || origLower.includes('aceh') || origLower.includes('padang')) {
            region = 'sumatera';
          } else if (origLower.includes('jawa') || origLower.includes('yogyakarta') || origLower.includes('solo') || origLower.includes('surakarta') || origLower.includes('giriloyo')) {
            region = 'jawa';
          } else if (origLower.includes('bali') || origLower.includes('sumba') || origLower.includes('lombok') || origLower.includes('ntt') || origLower.includes('ntb')) {
            region = 'bali-nusra';
          } else if (origLower.includes('kalimantan') || origLower.includes('mahakam') || origLower.includes('dayak')) {
            region = 'kalimantan';
          } else if (origLower.includes('sulawesi') || origLower.includes('toraja') || origLower.includes('makassar')) {
            region = 'sulawesi';
          } else if (origLower.includes('papua') || origLower.includes('asmat') || origLower.includes('maluku') || origLower.includes('wamena')) {
            region = 'papua-maluku';
          }

          const durationText = artisanItem.duration || (artisanItem.durationDays ? `${artisanItem.durationDays} Hari Karya` : '21 Hari Karya');
          const statusText = artisanItem.status || 'Terkurasi WBTb';

          if (baseMap.has(key)) {
            const existing = baseMap.get(key);
            baseMap.set(key, {
              ...existing,
              ...artisanItem,
              cat: cat || existing.cat,
              region: region || existing.region,
              duration: durationText,
              status: statusText
            });
          } else {
            baseMap.set(key, {
              id: key,
              code: key,
              name: artisanItem.name,
              cat: cat,
              category: artisanItem.category || 'Kriya',
              categoryLabel: artisanItem.category || 'Kriya',
              origin: artisanItem.origin || 'Nusantara',
              daerah: artisanItem.origin || 'Nusantara',
              region: region,
              regionName: region,
              artisan: artisanItem.curator || artisanItem.artisan || 'Maestro Pengrajin',
              price: Number(artisanItem.price) || 1500000,
              duration: durationText,
              durationDays: parseInt(durationText, 10) || 21,
              status: statusText,
              stock: artisanItem.stock || 5,
              sold: artisanItem.sold || 0,
              wbtbReg: artisanItem.wbtbReg || `WBTb-2026-NUSA-${key}`,
              curator: artisanItem.curator || 'Dewan Kurator Nusava',
              verifiedDate: artisanItem.verifiedDate || '2026',
              img: artisanItem.img || 'assets/images/content/wilayah-sulawesi-tongkonan.jpg',
              desc: artisanItem.desc || 'Karya kriya pusaka adiluhung warisan budaya takbenda Nusantara.'
            });
          }
        });
      }
    }
  } catch (err) {
    console.warn('Error reading nusava_artisan_products:', err);
  }

  return Array.from(baseMap.values());
}

if (typeof window !== 'undefined') {
  window.BASE_CATALOG_8 = BASE_CATALOG_8;
  window.getSynchronizedCatalog = getSynchronizedCatalog;
}

// Node.js module export support
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    NUSAVA_PRODUCTS,
    getProductByIdOrCode,
    NUSAVA_CATEGORIES,
    NUSAVA_REGIONS,
    NUSAVA_TECHNIQUES,
    NUSAVA_EDITORIAL_TILES,
    BASE_CATALOG_8,
    getSynchronizedCatalog
  };
}
