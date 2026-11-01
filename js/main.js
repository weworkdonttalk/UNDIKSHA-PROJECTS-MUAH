/* ===== Vanilla JS – Nusava AYANA Revamp ===== */
'use strict';

/* --------------------------------------------------------------------------
   1. REGION DATA (Interactive Map)
   -------------------------------------------------------------------------- */
const REGIONS = {
  sumatera: {
    name: 'Sumatera',
    label: 'AREA 01 — SUMATERA',
    sub: 'Serambi Melayu, Ranah Minang & Tanah Batak',
    cat: 'Rumah Adat & Kain Songket Emas',
    desc: 'Dari atap melengkung Rumah Gadang di Sumatera Barat, kilau benang emas kain Songket Palembang, hingga kekompakan penari Tari Saman di Aceh. Daerah Sumatera memiliki adat yang sangat kuat dan menjunjung tinggi nilai persaudaraan.',
    highlights: ['Rumah Gadang Minang', 'Tari Saman (UNESCO)', 'Songket Emas Palembang', 'Kain Ulos Batak Toba'],
    artisans: '1.240+',
    cagar: '310+ Tempat',
    unescoCount: '8 Warisan',
    source: 'Kemendikbudristek & UNESCO',
    quote: '"Adat menjaga kehormatan, kebersamaan menjaga persaudaraan — indahnya kain songket emas dan megahnya Rumah Gadang warisan nenek moyang."',
    img: 'assets/images/content/wilayah-sumatera-gadang.jpg',
    fallback: 'assets/images/content/wilayah-sumatera-gadang.jpg',
    pinX: '17%', pinY: '43%',
  },
  jawa: {
    name: 'Jawa',
    label: 'AREA 02 — JAWA',
    sub: 'Candi Bersejarah & Seni Wayang Kulit',
    cat: 'Candi Megah & Seni Tradisional',
    desc: 'Jawa terkenal dengan ketelitian dan kesabaran para pengrajinnya. Mulai dari kemegahan Candi Borobudur, pertunjukan wayang kulit yang sarat nasihat hidup, hingga kain batik tulis halus yang digambar manual dengan canting dan lilin malam.',
    highlights: ['Borobudur (UNESCO)', 'Wayang Kulit Purwa (UNESCO)', 'Batik Tulis Nitik (UNESCO)', 'Keris Pusaka (UNESCO)'],
    artisans: '3.850+',
    cagar: '420+ Tempat',
    unescoCount: '18 Warisan',
    source: 'UNESCO & Kemendikbudristek',
    quote: '"Menjaga keindahan bumi — kesabaran dan cinta yang diwujudkan lewat canting batik tulis dan ukiran keris khas Jawa."',
    img: 'assets/images/content/wilayah-jawa-borobudur.jpg',
    fallback: 'assets/images/content/wilayah-jawa-borobudur.jpg',
    pinX: '33%', pinY: '76%',
  },
  bali_nt: {
    name: 'Bali & Nusa Tenggara',
    label: 'AREA 03 — BALI & NUSA TENGGARA',
    sub: 'Harmoni Tarian, Kain Tenun & Musik Sasando',
    cat: 'Seni Tari, Kerajinan Perak & Tenun Alami',
    desc: 'Kekayaan seni dan tarian yang memukau dunia. Suara kompak penari Tari Kecak di tebing pantai Bali bersanding dengan kesabaran para ibu penenun di Sumba yang menggunakan pewarna alami dari akar pohon dan daun nila.',
    highlights: ['Tari Tradisi Bali (UNESCO)', 'Tenun Ikat Sumba Timur', 'Perak Filigri Celuk Gianyar', 'Sasando Daun Lontar Rote'],
    artisans: '2.110+',
    cagar: '260+ Tempat',
    unescoCount: '12 Warisan',
    source: 'Kemendikbudristek & Kemenparekraf',
    quote: '"Hidup selaras dengan alam dan sesama — tercermin dalam sehelai kain tenun warna alami dan alunan gamelan Bali."',
    img: 'assets/images/content/wilayah-bali-kecak.jpg',
    fallback: 'assets/images/content/wilayah-bali-kecak.jpg',
    pinX: '49%', pinY: '79%',
  },
  kalimantan: {
    name: 'Kalimantan',
    label: 'AREA 04 — KALIMANTAN',
    sub: 'Kearifan Rimba Tropis & Ukiran Dayak',
    cat: 'Ukiran Kayu & Anyaman Manik',
    desc: 'Masyarakat Dayak di Kalimantan hidup rukun berdampingan dengan hutan tropis yang hijau. Keahlian mereka terlihat dari Rumah Betang tempat tinggal bersama, tameng pelindung Talawang yang berukir indah, serta anyaman manik-manik warna-warni.',
    highlights: ['Rumah Betang Dayak', 'Perisai Ukir Talawang', 'Anyaman Manik Kenyah', 'Tari Mandau Tradisional'],
    artisans: '920+',
    cagar: '180+ Tempat',
    unescoCount: '6 Warisan',
    source: 'Kemendikbudristek Ditjen Kebudayaan',
    quote: '"Kearifan menjaga alam — kayu kuat dan anyaman manik yang dibuat untuk melindungi desa dan menghormati hutan rimba."',
    img: 'assets/images/content/wilayah-kalimantan-talawang.jpg',
    fallback: 'assets/images/content/wilayah-kalimantan-talawang.jpg',
    pinX: '43%', pinY: '42%',
  },
  sulawesi: {
    name: 'Sulawesi',
    label: 'AREA 05 — SULAWESI',
    sub: 'Pelaut Perahu Pinisi & Rumah Toraja',
    cat: 'Kapal Kayu Tradisional & Rumah Adat',
    desc: 'Kehebatan para pembuat perahu Pinisi di Bulukumba yang merakit kapal kayu penjelajah lautan tanpa paku besi, berpadu dengan megahnya Rumah Adat Tongkonan di Toraja yang atapnya melengkung indah mirip perahu.',
    highlights: ['Perahu Pinisi Bulukumba (UNESCO)', 'Rumah Tongkonan Toraja', 'Tenun Sutra Mandar', 'Tari Kipas Pakarena'],
    artisans: '1.450+',
    cagar: '220+ Tempat',
    unescoCount: '9 Warisan',
    source: 'UNESCO & Kemendikbudristek',
    quote: '"Keberanian pelaut mengarungi samudra dan kokohnya rumah adat yang selalu menyatukan keluarga besar."',
    img: 'assets/images/content/wilayah-sulawesi-tongkonan.jpg',
    fallback: 'assets/images/content/wilayah-sulawesi-tongkonan.jpg',
    pinX: '58%', pinY: '51%',
  },
  maluku_papua: {
    name: 'Maluku & Papua',
    label: 'AREA 06 — MALUKU & PAPUA',
    sub: 'Kepulauan Rempah & Kerajinan Noken',
    cat: 'Seni Pahat Asmat & Tas Serat Kayu',
    desc: 'Pesona kepulauan rempah Maluku bersatu dengan kehebatan seni ukir suku Asmat dan rajutan tas Noken di Papua. Tas Noken dibuat dari serat kulit kayu alami sebagai lambang kasih sayang ibu dan lambang persatuan warga.',
    highlights: ['Seni Pahat Suku Asmat', 'Tas Noken Kulit Kayu (UNESCO)', 'Alat Musik Tifa', 'Tari Tradisional Papua'],
    artisans: '780+',
    cagar: '150+ Tempat',
    unescoCount: '7 Warisan',
    source: 'UNESCO & Kemendikbudristek',
    quote: '"Tas noken dari serat kayu hutan — lambang kasih sayang ibu yang selalu menjaga kebersamaan dan kedamaian."',
    img: 'assets/images/content/wilayah-papua-asmat.jpg',
    fallback: 'assets/images/content/wilayah-papua-asmat.jpg',
    pinX: '85%', pinY: '58%',
  },
};

/* --------------------------------------------------------------------------
   2. PRODUCT DATA (Marketplace — Karya Asli & Sumber Terverifikasi)
   -------------------------------------------------------------------------- */
const PRODUCTS = [
  {
    id: 1,
    name: 'Kain Tenun Ikat Hinggi Sumba Timur',
    cat: 'wastra',
    daerah: 'Waingapu, Sumba Timur (NTT)',
    artisan: 'Kelompok Mama Penenun Lambanapu',
    material: '100% Katun Pintal Tangan, Pewarna Alami Kulit Akar Mengkudu & Daun Nila',
    duration: '6 – 8 Bulan pengerjaan tangan',
    source: 'Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201400144',
    sourceShort: 'WBTb Kemendikbud',
    price: 3450000,
    rating: 4.9,
    sold: 248,
    img: 'assets/images/content/produk-tenun-sumba.jpg',
    verified: true,
    shortDesc: 'Ditenun manual berbulan-bulan dengan pewarna alami akar mengkudu dan daun nila. Motif kuda melambangkan keberanian.',
    desc: 'Kain adat Sumba asli yang dibuat tanpa bahan kimia sama sekali. Para mama di Lambanapu mencelup benang hingga 40 kali dalam ramuan akar pohon mengkudu dan daun nila untuk menghasilkan warna terakota dan biru indigo yang awet puluhan tahun. Motif kuda melambangkan kepemimpinan dan harga diri.'
  },
  {
    id: 2,
    name: 'Batik Tulis Nitik Kembang Jeruk Giriloyo',
    cat: 'wastra',
    daerah: 'Bantul, D.I. Yogyakarta',
    artisan: 'Paguyuban Pembatik Giriloyo, Imogiri',
    material: 'Kain Katun Mori Primissima, Malam Alami, Pewarna Kulit Kayu Tingi & Soga',
    duration: '2 – 3 Bulan canting manual',
    source: 'UNESCO Representative List of Intangible Cultural Heritage 2009 & Indikasi Geografis Batik Nitik (IG ID G 000000080)',
    sourceShort: 'UNESCO & IG Terdaftar',
    price: 2850000,
    rating: 5.0,
    sold: 312,
    img: 'assets/images/content/produk-batik-giriloyo.jpg',
    verified: true,
    shortDesc: 'Salah satu motif batik tertua keraton yang dibuat dengan ribuan titik canting belah cawang. Polanya rapi dan presisi.',
    desc: 'Motif Nitik adalah salah satu pola batik tertua di Yogyakarta. Keunikannya, motif ini tidak digambar dengan garis lurus biasa, melainkan disusun dari ribuan titik halus menggunakan canting belah cawang khusus. Dikerjakan penuh kesabaran oleh para ibu pembatik di kaki perbukitan Imogiri.'
  },
  {
    id: 3,
    name: 'Tas Noken Asli Serat Kayu Lembah Baliem',
    cat: 'kriya',
    daerah: 'Wamena, Papua Pegunungan',
    artisan: 'Komunitas Mama Rajut Noken Wamena',
    material: 'Serat Kulit Kayu Melinjo & Pohon Mahkota Dewa Alami',
    duration: '3 – 4 Minggu anyam tangan',
    source: 'UNESCO Intangible Cultural Heritage in Need of Urgent Safeguarding (ID: 00619, 2012)',
    sourceShort: 'UNESCO Warisan Dunia',
    price: 850000,
    rating: 4.9,
    sold: 189,
    img: 'assets/images/content/produk-noken-papua.jpg',
    verified: true,
    shortDesc: 'Tas tradisional ramah lingkungan dari serat kayu hutan. Diakui UNESCO sebagai simbol cinta kasih dan rahim ibu.',
    desc: 'Bagi masyarakat Papua, noken bukan cuma tas biasa, melainkan simbol kehidupan dan rahim seorang ibu. Kulit kayu hutan ditumbuk, direndam, dipilin menjadi benang kuat, lalu dirajut tanpa jarum logam. Tas ini elastis, kuat membawa beban berat, dan 100% alami bisa terurai tanah.'
  },
  {
    id: 4,
    name: 'Perhiasan Perak Filigri Khas Desa Celuk',
    cat: 'kriya',
    daerah: 'Desa Celuk, Gianyar, Bali',
    artisan: 'Studio Kerajinan Perak Maestro Celuk',
    material: 'Perak Murni 925 (Sterling Silver), Sentuhan Lapisan Emas 18K',
    duration: '2 – 3 Minggu tempa detail',
    source: 'Kemenparekraf — Sentra Desa Wisata Kriya Perak Unggulan & Dekranasda Bali',
    sourceShort: 'Sentra Kemenparekraf',
    price: 1450000,
    rating: 4.8,
    sold: 142,
    img: 'assets/images/content/produk-perak-celuk.jpg',
    verified: true,
    shortDesc: 'Perhiasan perak halus yang dibuat dengan teknik filigri tertua di Bali. Benang perak dipilin menjadi pola teratai anggun.',
    desc: 'Desa Celuk di Gianyar sudah terkenal sejak ratusan tahun sebagai pusat seniman perak terbaik di Bali. Kriya ini memakai teknik filigri (kerawang), yaitu memilin benang perak setipis helaian rambut hingga membentuk ukiran mandala dan bunga kamboja yang lentik dan sangat anggun.'
  },
  {
    id: 5,
    name: 'Kain Songket Lepus Emas Asli Palembang',
    cat: 'wastra',
    daerah: 'Ogan Ilir, Sumatera Selatan',
    artisan: 'Sentra Tenun Songket Tradisional Kertapati',
    material: 'Benang Sutra Pilihan & Sulaman Benang Emas Cabutan Murni',
    duration: '4 – 5 Bulan tenun gedogan',
    source: 'Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201300009',
    sourceShort: 'WBTb Kemendikbud',
    price: 4800000,
    rating: 5.0,
    sold: 98,
    img: 'assets/images/content/produk-songket-palembang.jpg',
    verified: true,
    shortDesc: 'Kasta tertinggi songket Palembang yang dijuluki Ratu Segala Kain. Seluruh bidang kain dipenuhi kilau benang emas halus.',
    desc: 'Dikenal sejak zaman Kerajaan Sriwijaya, Songket Lepus adalah kain paling istimewa karena benang emasnya menutupi hampir seluruh permukaan kain dasar sutra. Ditenun helai demi helai menggunakan alat tenun kayu tradisional non-mesin (gedogan), menciptakan kilau mewah yang bertahan puluhan tahun.'
  },
  {
    id: 6,
    name: 'Ukiran Patung Mbis Leluhur Suku Asmat',
    cat: 'seni',
    daerah: 'Agats, Pesisir Asmat, Papua Selatan',
    artisan: 'Pengukir Wow-ipits Kampung Syuru, Asmat',
    material: 'Kayu Bakau Besi Pilihan, Pewarna Alami Tanah Liat Merah & Cangkang Kerang',
    duration: '1 – 2 Bulan pahat manual',
    source: 'Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201300062',
    sourceShort: 'WBTb Kemendikbud',
    price: 3200000,
    rating: 4.8,
    sold: 64,
    img: 'assets/images/content/produk-patung-asmat.jpg',
    verified: true,
    shortDesc: 'Karya seni pahat tangan Asmat yang mendunia. Setiap lekukan garis dipersembahkan untuk menghormati kebijaksanaan leluhur.',
    desc: 'Pengukir Asmat (Wow-ipits) tidak pernah memakai pola jiplakan atau mesin. Mereka memahat langsung kayu keras hutan tropis dengan pahat tulang atau besi, menghasilkan figur mbis bertingkat yang penuh energi spiritual dan perlindungan bagi ruang keluarga.'
  },
  {
    id: 7,
    name: 'Instrumen Sasando Akustik Daun Lontar Rote',
    cat: 'musik',
    daerah: 'Pulau Rote, NTT',
    artisan: 'Bengkel Maestro Sasando Desa Oebelo',
    material: 'Bambu Pilihan, Resonator Haik Daun Lontar Kering, 28 Dawai Kawat Halus',
    duration: '3 – 4 Minggu rakit tangan',
    source: 'Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201400143',
    sourceShort: 'WBTb Kemendikbud',
    price: 2100000,
    rating: 4.9,
    sold: 87,
    img: 'assets/images/content/produk-sasando-rote.jpg',
    verified: true,
    shortDesc: 'Alat musik petik khas Rote dengan resonator alami dari daun lontar. Suaranya jernih mirip perpaduan harpa dan gitar.',
    desc: 'Sasando memadukan bambu bulat dengan wadah melingkar dari anyaman daun pohon lontar (haik) yang berfungsi memantulkan suara dawai menjadi sangat merdu dan jernih. Cocok dipetik untuk mengiringi waktu santai atau dijadikan hiasan interior yang bernilai seni tinggi.'
  },
  {
    id: 8,
    name: 'Anyaman Tas & Wadah Ketak Beleka Lombok',
    cat: 'kriya',
    daerah: 'Desa Beleka, Lombok Tengah, NTB',
    artisan: 'Koperasi Pengrajin Ketak Beleka Lestari',
    material: 'Tanaman Paku Hutan Liar (Ketak), Pengasapan Alami Sabut Kelapa',
    duration: '2 – 3 Minggu anyam teliti',
    source: 'Kemendikbudristek — Warisan Budaya Takbenda (WBTb) No. Reg 201600401 & Dekranasda NTB',
    sourceShort: 'WBTb Kemendikbud',
    price: 520000,
    rating: 4.7,
    sold: 380,
    img: 'assets/images/content/produk-ketak-lombok.jpg',
    verified: true,
    shortDesc: 'Anyaman tanaman paku hutan khas Lombok yang diawetkan lewat asap tempurung kelapa. Sangat kuat dan tahan air.',
    desc: 'Dibuat dari rumput paku liar ketak yang tumbuh di hutan Lombok. Setelah dianyam sangat rapat oleh para perajin desa Beleka, wadah ini diasapi dengan sabut kelapa selama berhari-hari. Hasilnya: warna cokelat keemasan mengkilap yang tahan air, bebas jamur, dan awet hingga puluhan tahun.'
  },
];

/* --------------------------------------------------------------------------
   3. JOURNAL DATA (Slider — Cerita & Investigasi Budaya Nyata)
   -------------------------------------------------------------------------- */
const ARTICLES = [
  {
    tag: 'Wastra Pewarna Alami',
    title: 'Cerita Mama Penenun Sumba: Butuh 8 Bulan dan 40 Kali Celupan Daun Nila untuk Selembar Kain',
    author: 'Laras Winarti',
    source: 'Indonesia.go.id Kebudayaan · WBTb Kemendikbud',
    date: 'Oktober 2026',
    read: '6 mnt baca',
    img: 'assets/images/content/jurnal-tenun-lambanapu.jpg',
    url: 'https://indonesia.go.id/kategori/seni/2117/pesona-tenun-ikat-sumba-yang-mendunia',
    snippet: 'Di Sumba Timur, menenun bukan sekadar mencari nafkah melainkan doa panjang. Mengapa mereka teguh menolak pewarna kimia pabrik dan setia merawat alam leluhur?'
  },
  {
    tag: 'Batik Tulis Warisan',
    title: 'Rahasia Bertahan Batik Nitik: Saat 800 Ibu Rumah Tangga di Imogiri Jadi Penjaga Motif Tertua',
    author: 'Nindya Kusuma',
    source: 'Indonesia.go.id Seni · Paguyuban Giriloyo',
    date: 'Oktober 2026',
    read: '8 mnt baca',
    img: 'assets/images/content/jurnal-batik-giriloyo.jpg',
    url: 'https://indonesia.go.id/kategori/seni/1078/makna-filosofis-di-balik-motif-batik',
    snippet: 'Setelah gempa 2006, para ibu di Giriloyo bangkit bersama canting mereka. Kini, batik nitik menjadi pusaka berstatus Indikasi Geografis resmi yang mendunia.'
  },
  {
    tag: 'Mahakarya Maritim UNESCO',
    title: 'Kisah Pinisi Bulukumba: Perahu Tangguh Penakluk Samudra yang Dirakit Tanpa Sebatang Paku Logam',
    author: 'Bima Adyatama',
    source: 'UNESCO Intangible Cultural Heritage Registry ID: 00983',
    date: 'September 2026',
    read: '6 mnt baca',
    img: 'assets/images/content/jurnal-pinisi-bulukumba.jpg',
    url: 'https://ich.unesco.org/en/RL/pinisi-art-of-boatbuilding-in-south-sulawesi-00983',
    snippet: 'Di pesisir Pantai Bira Bulukumba, para Panrita Lopi mewariskan kearifan maritim leluhur dengan menyusun bilah kayu ulin menggunakan pasak alami dan perhitungan batin.'
  },
  {
    tag: 'Warisan Dunia UNESCO',
    title: 'Noken Papua: Tas Rajut Serat Kulit Kayu Simbol Kasih Sayang Ibu dan Penjaga Perdamaian Adat',
    author: 'Faisal Ardiansyah',
    source: 'UNESCO Intangible Cultural Heritage Registry ID: 00619',
    date: 'September 2026',
    read: '7 mnt baca',
    img: 'assets/images/content/jurnal-noken-papua.jpg',
    url: 'https://ich.unesco.org/en/USL/noken-multifunctional-knotted-or-woven-bag-handicraft-of-the-people-of-papua-00619',
    snippet: 'Noken bukan tas pabrik. Saat mama-mama di pegunungan Papua merajut serat kayu hutan, mereka merajut simbol rahim kehidupan dan lambang persatuan antar suku.'
  },
  {
    tag: 'Kesenian Sakral UNESCO',
    title: 'Dentingan Suci Gamelan Selonding: Bunyi Besi Kuno Karangasem yang Menembus Relung Jiwa',
    author: 'Rara Puspita',
    source: 'UNESCO Intangible Cultural Heritage Registry ID: 01607',
    date: 'Agustus 2026',
    read: '5 mnt baca',
    img: 'assets/images/content/jurnal-gamelan-selonding.jpg',
    url: 'https://ich.unesco.org/en/RL/gamelan-01607',
    snippet: 'Berbeda dari gamelan perunggu biasa, bilah besi kuno Selonding menghasilkan getaran nada meditatif sakral yang mengiringi upacara suci Bali Aga selama berabad-abad.'
  },
  {
    tag: 'Pusaka Dunia UNESCO',
    title: 'Menguak Cerita Tersembunyi di Relief Borobudur: Ensiklopedia Visual Peradaban Abad ke-8',
    author: 'Dr. Hendra Wijaya',
    source: 'Indonesia.go.id Pariwisata & Balai Konservasi Borobudur',
    date: 'Agustus 2026',
    read: '7 mnt baca',
    img: 'assets/images/content/wilayah-jawa-borobudur.jpg',
    url: 'https://indonesia.go.id/kategori/pariwisata/2056/candi-borobudur-kemegahan-warisan-dunia-di-tanah-jawa',
    snippet: 'Di balik 2.672 panel relief batu andesit, Borobudur merekam visual kapal bercadik, instrumen musik petik kuno, hingga ragam flora rempah kejayaan maritim Nusantara.'
  },
  {
    tag: 'Teater Wayang UNESCO',
    title: 'Wayang Kulit Purwa: Teater Bayangan Berusia Seribu Tahun yang Merangkul Kearifan Moral',
    author: 'Ki Sugeng Handoyo',
    source: 'UNESCO Representative List of Intangible Heritage ID: 00063',
    date: 'Juli 2026',
    read: '9 mnt baca',
    img: 'assets/images/wayang-kulit-jawa-berhias-emas-10.png',
    url: 'https://ich.unesco.org/en/RL/wayang-puppet-theatre-00063',
    snippet: 'Diakui UNESCO sejak 2008, pertunjukan wayang kulit memadukan tatah sungging kulit kerbau berlapis prada emas, suluk dalang mistik, serta ajaran budi pekerti luhur.'
  },
  {
    tag: 'Karya Tempa Adat UNESCO',
    title: 'Misteri Tempaan Keris Jawa: Harmoni Logam Pamor Meteorit dan Doa Spiritual Sang Empu',
    author: 'Baskoro Danu',
    source: 'UNESCO Representative List of Intangible Heritage ID: 00112',
    date: 'Juli 2026',
    read: '8 mnt baca',
    img: 'assets/images/content/jurnal-keris-jawa.jpg',
    url: 'https://ich.unesco.org/en/RL/indonesian-kris-00112',
    snippet: 'Bukan sekadar senjata tikam, sebilah keris pusaka lahir dari lipatan ratusan lapis besi, baja, dan meteorit titanium yang ditempa dalam kesunyian tirakat leluhur.'
  },
  {
    tag: 'Wastra Ratu Palembang',
    title: 'Kilau Emas Benang Songket Palembang: Mahakarya Tenun Pelindung Tradisi Kerajaan Sriwijaya',
    author: 'Siti Fauziah',
    source: 'Indonesia.go.id Seni Tradisi & WBTb Indonesia',
    date: 'Juni 2026',
    read: '8 mnt baca',
    img: 'assets/images/content/produk-songket-palembang.jpg',
    url: 'https://indonesia.go.id/kategori/seni/1852/songket-palembang-si-ratu-kain-nusantara',
    snippet: 'Dikenal sebagai Ratu Segala Kain, tenun songket lepus emas membutuhkan ketelitian hingga 3 bulan pengerjaan memakai helai benang pakan emas murni peninggalan adiluhung.'
  },
  {
    tag: 'Seni Patung Papua',
    title: 'Mengukir Roh Leluhur: Makna Sakral Patung Bisj dan Kedalaman Jiwa Pahat Suku Asmat',
    author: 'Markus Pirim',
    source: 'Indonesia.go.id Kesenian & Ragam Budaya Nusantara',
    date: 'Juni 2026',
    read: '6 mnt baca',
    img: 'assets/images/content/wilayah-papua-asmat.jpg',
    url: 'https://indonesia.go.id/kategori/seni/1878/seni-ukir-asmat-yang-mendunia',
    snippet: 'Bagi Wow-ipits (pemahat Asmat), sebatang kayu bakau hutan bakau bernyawa. Setiap garis pahatan figur leluhur menjaga relasi abadi antara dunia manusia dan arwah nenek moyang.'
  },
  {
    tag: 'Arsitektur Vernakular',
    title: 'Konstruksi Pasak Lentur Rumah Gadang: Kebijaksanaan Leluhur Minang Hadapi Gempa Bumi',
    author: 'Andi Sutan Marajo',
    source: 'Indonesia.go.id Arsitektur Adat Nusantara',
    date: 'Mei 2026',
    read: '7 mnt baca',
    img: 'assets/images/content/wilayah-sumatera-gadang.jpg',
    url: 'https://indonesia.go.id/kategori/seni/1360/keunikan-arsitektur-rumah-gadang',
    snippet: 'Tanpa sebatang paku besi pun, konstruksi tiang miring dan sendi batu sandi Rumah Gadang terbukti mampu bergoyang luwes meredam guncangan gempa vulkanik Sumatera.'
  },
  {
    tag: 'Dawai Melodi NTT',
    title: 'Denting Resonansi Daun Lontar: Merawat Keaslian Musik Sasando di Tanah Rote Ndao',
    author: 'Yeremias Pah',
    source: 'Indonesia.go.id Alat Musik Tradisional',
    date: 'Mei 2026',
    read: '6 mnt baca',
    img: 'assets/images/content/produk-sasando-rote.jpg',
    url: 'https://indonesia.go.id/kategori/seni/1848/sasando-alat-musik-tradisional-dari-pulau-rote',
    snippet: 'Dibuat dari lengkungan daun pohon lontar yang dikeringkan, petikan melodi sasando telah berabad-abad mengiringi kidung ratapan, pesta panen, dan tutur syair tradisi Rote.'
  }
];

/* --------------------------------------------------------------------------
   4. SCROLL REVEAL — IntersectionObserver
   -------------------------------------------------------------------------- */
function initScrollReveal() {
  // Immediately reveal hero elements for instant first-paint
  document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right, #hero .reveal-popup').forEach(el => {
    el.classList.add('visible');
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );
  document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-popup').forEach(el => {
    if (!el.closest('#hero')) observer.observe(el);
  });

  // Dedicated video arch entrance reveal animation
  const archFrame = document.getElementById('video-arch-frame');
  if (archFrame) {
    const videoObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          archFrame.classList.add('in-view');
          videoObs.unobserve(archFrame);
        }
      });
    }, { threshold: 0.12 });
    videoObs.observe(archFrame);
  }

  // Dedicated gallery collage entrance reveal animation
  const gal = document.getElementById('gal');
  if (gal) {
    if (!('IntersectionObserver' in window)) {
      gal.classList.add('is-in');
    } else {
      const galObs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gal.classList.add('is-in');
            galObs.unobserve(gal);
          }
        });
      }, { threshold: 0.2 });
      galObs.observe(gal);
    }
  }
}

/* --------------------------------------------------------------------------
   5. ANIMATED NUMBER COUNTER
   -------------------------------------------------------------------------- */
function animateCounter(el, target, duration = 1800, suffix = '') {
  const start = performance.now();
  const update = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 4); // quartic ease-out
    const num = Math.floor(ease * target).toLocaleString('id-ID');
    el.innerHTML = `${num}<span class="text-[#C5A059] font-light text-[0.6em] ml-0.5 inline-block align-top">${suffix}</span>`;
    if (progress < 1) requestAnimationFrame(update);
  };
  requestAnimationFrame(update);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseFloat(el.dataset.count);
        const suffix = el.dataset.suffix || '';
        animateCounter(el, target, 1800, suffix);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}

/* --------------------------------------------------------------------------
   6. NAVBAR — Flat Full-Width Sticky Navigation with Auto-Hide
   -------------------------------------------------------------------------- */
function initNavbar() {
  const nav = document.getElementById('navbar');
  if (!nav) return;

  // Initialize unified navbar scroll and hover engine
  if (window.initUniversalNavbar) {
    window.initUniversalNavbar();
  }

  // Mobile drawer
  const openBtn = document.getElementById('mobile-menu-btn');
  const closeBtn = document.getElementById('mobile-menu-close');
  const drawer = document.getElementById('mobile-drawer');
  openBtn?.addEventListener('click', () => {
    drawer?.classList.remove('translate-x-full');
  });
  closeBtn?.addEventListener('click', () => drawer?.classList.add('translate-x-full'));
  drawer?.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => drawer.classList.add('translate-x-full'));
  });
}

/* --------------------------------------------------------------------------
   7. SMOOTH SCROLL for nav links
   -------------------------------------------------------------------------- */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* --------------------------------------------------------------------------
   8. PARALLAX & HERO WAYANG MOUSE TRACKING
   -------------------------------------------------------------------------- */
function initParallax() {
  const heroSection = document.getElementById('hero');
  const wayangL = document.getElementById('wayang-left-wrap');
  const wayangR = document.getElementById('wayang-right-wrap');
  const cloudBg = document.getElementById('hero-cloud-bg');
  const archFrame = document.getElementById('video-arch-frame');

  let mouseX = 0, mouseY = 0;
  let targetMouseX = 0, targetMouseY = 0;
  let currentScrollY = window.scrollY;

  // Track mouse coordinates on desktop
  const isTouch = window.matchMedia('(pointer: coarse)').matches;
  if (!isTouch && heroSection) {
    window.addEventListener('mousemove', (e) => {
      // Normalize from -1 to 1 based on window center
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      targetMouseX = 0;
      targetMouseY = 0;
    });
  }

  // Animation render loop (60 FPS smooth lerp with GPU acceleration)
  function updateHeroParallax() {
    if (currentScrollY < window.innerHeight * 1.3) {
      // Lerp mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.08;
      mouseY += (targetMouseY - mouseY) * 0.08;

      // Wayang Left: moves dynamically with mouse + slight tilt + scroll
      if (wayangL) {
        const moveX = mouseX * 28;
        const moveY = mouseY * 16 + currentScrollY * 0.08;
        const tilt = mouseX * 2.5;
        wayangL.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotate(${tilt.toFixed(2)}deg)`;
      }

      // Wayang Right: moves dynamically with mouse + slight tilt (child img maintains scaleX(-1) inward facing)
      if (wayangR) {
        const moveX = mouseX * -28;
        const moveY = mouseY * 16 + currentScrollY * 0.08;
        const tilt = mouseX * -2.5;
        wayangR.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0) rotate(${tilt.toFixed(2)}deg)`;
      }

      // Cloud background: subtle counter-drift depth
      if (cloudBg) {
        const bgX = mouseX * -14;
        const bgY = mouseY * -9 + currentScrollY * 0.04;
        cloudBg.style.transform = `translate3d(${bgX.toFixed(2)}px, ${bgY.toFixed(2)}px, 0) scale(1.03)`;
      }
    }

    requestAnimationFrame(updateHeroParallax);
  }
  requestAnimationFrame(updateHeroParallax);

  // Scroll listener for video arch expansion
  window.addEventListener('scroll', () => {
    currentScrollY = window.scrollY;

    if (archFrame) {
      const rect = archFrame.getBoundingClientRect();
      const viewH = window.innerHeight;
      const progress = Math.max(0, Math.min(1, 1 - rect.top / viewH));
      const radius = Math.round((1 - progress) * 50); // 50% → 0%
      archFrame.style.borderRadius = `${radius}% ${radius}% 0 0 / ${Math.round(radius * 0.16)}% ${Math.round(radius * 0.16)}% 0 0`;
    }
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   9. VIDEO MODAL (Cinematic Video Player — Native HTML5 & YouTube Support)
   -------------------------------------------------------------------------- */
function initVideoModal() {
  const modal    = document.getElementById('video-modal');
  const modalVid = document.getElementById('modal-video');
  const openBtns = document.querySelectorAll('[data-open-modal="video"]');
  const closeBtn = document.getElementById('video-modal-close');
  if (!modal) return;

  const open = () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (modalVid) {
      modalVid.currentTime = 0;
      modalVid.muted = false;
      modalVid.play().catch(() => {});
    }
  };

  const close = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
    if (modalVid) {
      modalVid.pause();
      modalVid.currentTime = 0;
    }
  };

  openBtns.forEach(btn => btn.addEventListener('click', open));
  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
}

/* --------------------------------------------------------------------------
   9B. LICENSE & ATTRIBUTION MODAL (TECHTOPIA Vol. 2 Transparency)
   -------------------------------------------------------------------------- */
function initLicenseModal() {
  const modal = document.getElementById('license-modal');
  const openBtn = document.getElementById('btn-open-license-modal');
  const closeBtn = document.getElementById('license-modal-close');
  if (!modal) return;

  const open = () => {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  };
  const close = () => {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  };

  openBtn?.addEventListener('click', open);
  closeBtn?.addEventListener('click', close);
  modal.addEventListener('click', e => { if (e.target === modal) close(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !modal.classList.contains('hidden')) close(); });

  if (window.location.hash === '#license') {
    setTimeout(open, 300);
  }
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#license') open();
  });
}

/* --------------------------------------------------------------------------
   10. AREA SWITCHER (Interactive Map with Hotspot Dynamics & 3D Transitions)
   -------------------------------------------------------------------------- */
function initAreaSwitcher() {
  const tabs  = document.querySelectorAll('.area-tab[data-area]');
  const pins  = document.querySelectorAll('.radar-dot[data-area]');
  const panel = document.getElementById('area-info-panel');
  const glow  = document.getElementById('map-region-glow');
  const mapCard = document.querySelector('.map-canvas-card');
  if (!panel) return;

  let current = 'jawa';
  let isUpdatingPanel = false;

  function updatePanel(key, triggerSurge = false) {
    if (key === current && isUpdatingPanel) return;
    const r = REGIONS[key];
    if (!r) return;
    current = key;

    // Tabs update
    if (tabs.length) {
      tabs.forEach(t => t.classList.toggle('active', t.dataset.area === key));
    }

    // Pins update + shockwave surge animation
    pins.forEach(p => {
      const isActive = p.dataset.area === key;
      p.classList.toggle('active-pin', isActive);
      if (isActive && triggerSurge) {
        p.classList.remove('trigger-surge');
        void p.offsetWidth; // Force CSS reflow to re-trigger keyframe
        p.classList.add('trigger-surge');
      }
    });

    // Smooth focal aura navigation to active island coordinates
    if (glow && r.pinX && r.pinY) {
      glow.style.left = r.pinX;
      glow.style.top = r.pinY;
      glow.style.opacity = '1';
    }

    // Update extra content metrics under map
    const extraCagar = document.getElementById('extra-metric-cagar');
    const extraArtisans = document.getElementById('extra-metric-artisans');
    const extraUnesco = document.getElementById('extra-metric-unesco');
    const extraQuote = document.getElementById('extra-cultural-quote');

    if (extraCagar && r.cagar) extraCagar.textContent = r.cagar;
    if (extraArtisans && r.artisans) extraArtisans.textContent = r.artisans + ' UMKM';
    if (extraUnesco && r.unescoCount) extraUnesco.textContent = r.unescoCount;
    if (extraQuote && r.quote) extraQuote.textContent = r.quote;

    // Fluid Exit & Entry Choreography on the right-side card
    const currentInner = panel.querySelector('.area-panel-inner');
    if (!currentInner) {
      panel.innerHTML = `<div class="area-panel-inner anim-enter">${buildAreaPanel(r)}</div>`;
      return;
    }

    isUpdatingPanel = true;
    panel.classList.add('is-updating');
    currentInner.classList.remove('anim-enter');
    currentInner.classList.add('anim-exit');

    setTimeout(() => {
      panel.innerHTML = `<div class="area-panel-inner anim-enter">${buildAreaPanel(r)}</div>`;
      setTimeout(() => {
        panel.classList.remove('is-updating');
        isUpdatingPanel = false;
      }, 360);
    }, 190);
  }

  function buildAreaPanel(r) {
    return `
      <div class="flex items-center justify-between mb-4 pb-3 border-b border-[#EDE4D5]">
        <span class="text-eyebrow text-[#C5A059] font-bold">${r.cat}</span>
        <span class="text-[10px] font-sans font-bold tracking-widest uppercase text-[#C5A059] flex items-center gap-1">
          <svg class="w-3 h-3 text-[#C5A059]" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          Terdaftar WBTb
        </span>
      </div>
      <h3 class="font-display font-bold text-3xl sm:text-4xl text-[#2B231D] mb-2 leading-tight">${r.name}</h3>
      <p class="text-base text-[#6B5E55] mb-5 italic font-garamond">${r.sub}</p>
      <div class="w-full h-60 sm:h-72 lg:h-80 rounded-xl overflow-hidden mb-6 border border-[#EDE4D5] shadow-sm">
        <img src="${r.img}" onerror="this.src='${r.fallback}'" alt="${r.name}" class="area-panel-img w-full h-full object-cover transition-transform duration-700 hover:scale-105" loading="lazy">
      </div>
      <p class="text-sm sm:text-base text-[#6B5E55] leading-relaxed mb-5 font-sans">${r.desc}</p>
      <div class="p-3 bg-[#FAF7F2] border border-[#EDE4D5] rounded-xl mb-6 flex items-start gap-2.5 text-xs text-[#6B5E55] font-sans">
        <span class="text-[#C5A059] flex-shrink-0 mt-0.5">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 3l9 7H3l9-7z"/></svg>
        </span>
        <div><strong class="text-[#2B231D] block">Rujukan Data Resmi:</strong> ${r.source || 'Kemendikbudristek & UNESCO'}</div>
      </div>
      <div class="border-t border-[#EDE4D5] pt-5 mb-6">
        <p class="text-eyebrow text-[#C5A059] font-bold mb-3">Kekayaan Budaya Pilihan</p>
        <ul class="grid grid-cols-1 sm:grid-cols-2 gap-y-2.5 gap-x-4">
          ${r.highlights.map(h => `<li class="flex items-center gap-2 text-xs sm:text-sm text-[#2B231D] font-medium"><span class="w-1.5 h-1.5 rounded-full bg-[#C5A059] flex-shrink-0"></span>${h}</li>`).join('')}
        </ul>
      </div>
      <div class="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#EDE4D5]">
        <div class="flex items-baseline gap-1.5">
          <strong class="text-2xl font-display font-bold text-[#2B231D]">${r.artisans}</strong>
          <span class="text-xs text-[#6B5E55] font-sans uppercase tracking-wider">Pengrajin Terdaftar</span>
        </div>
        <a href="#pasar" class="inline-flex items-center gap-2 px-6 py-3 bg-[#241B16] text-[#F7F2EA] text-xs font-sans font-bold tracking-[0.16em] uppercase hover:bg-[#C5A059] hover:text-[#241B16] rounded-full transition-all duration-300">Lihat Karya Daerah Ini →</a>
      </div>
    `;
  }

  // Bind click & hover for instant interactive feedback
  tabs.forEach(t => t.addEventListener('click', () => updatePanel(t.dataset.area, true)));
  pins.forEach(p => {
    p.addEventListener('click', () => updatePanel(p.dataset.area, true));
    p.addEventListener('mouseenter', () => updatePanel(p.dataset.area, true));
  });

  // Default region setup
  updatePanel(current, false);
}

/* --------------------------------------------------------------------------
   11. MARKETPLACE — Faire, Aesop & Teenage Engineering Heritage Catalog
   -------------------------------------------------------------------------- */
function initMarketplace() {
  const grid = document.getElementById('product-grid');
  if (!grid) return;

  const categoryBtns = document.querySelectorAll('.category-index-btn[data-filter], .filter-tab[data-filter], .filter-tab-editorial[data-filter]');
  const searchInput = document.getElementById('catalog-search-input');
  const regionSelect = document.getElementById('catalog-region-filter');
  const statusSelect = document.getElementById('catalog-status-filter');
  const sortSelect = document.getElementById('catalog-sort-filter');
  const activeCountEl = document.getElementById('catalog-active-count');
  const cartCountEl = document.getElementById('cart-count');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  // Filter State
  const state = {
    category: 'all',
    region: 'all',
    status: 'all',
    sort: 'recommended',
    search: ''
  };

  function formatRupiah(num) {
    if (typeof num !== 'number') num = Number(num) || 0;
    return num.toLocaleString('id-ID');
  }

  function getSharedCart() {
    try {
      const data = localStorage.getItem('nusava_cart_items');
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveSharedCart(cart) {
    try {
      localStorage.setItem('nusava_cart_items', JSON.stringify(cart));
      syncCartUI();
      window.dispatchEvent(new CustomEvent('nusava-cart-updated', { detail: { cart } }));
    } catch (e) {
      console.error(e);
    }
  }

  function syncCartUI() {
    const cart = getSharedCart();
    const totalCount = cart.reduce((acc, c) => acc + (c.qty || 1), 0);
    const totalPrice = cart.reduce((acc, c) => acc + ((c.price || 0) * (c.qty || 1)), 0);

    const badgeElements = document.querySelectorAll('#cart-count, [data-cart-count], #nav-cart-count');
    badgeElements.forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) badge.classList.remove('hidden');
    });

    const priceEl = document.getElementById('cart-total-price');
    if (priceEl) {
      priceEl.textContent = 'Rp ' + formatRupiah(totalPrice);
    }

    const webCheckoutBtn = document.getElementById('btn-main-cart-web-checkout');
    if (webCheckoutBtn) {
      if (cart.length === 0) {
        webCheckoutBtn.classList.add('opacity-50', 'pointer-events-none');
        webCheckoutBtn.setAttribute('tabindex', '-1');
      } else {
        webCheckoutBtn.classList.remove('opacity-50', 'pointer-events-none');
        webCheckoutBtn.removeAttribute('tabindex');
      }
    }

    const waCheckoutBtn = document.getElementById('btn-main-cart-checkout');
    if (waCheckoutBtn) {
      waCheckoutBtn.disabled = cart.length === 0;
      waCheckoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
      waCheckoutBtn.style.cursor = cart.length === 0 ? 'not-allowed' : 'pointer';
    }

    const itemsEl = document.getElementById('cart-drawer-items');
    if (itemsEl) {
      if (cart.length === 0) {
        itemsEl.innerHTML = `
          <div class="text-center py-12 text-[#6B5E55]">
            <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-[#EDE4D5] flex items-center justify-center text-[#C5A059]">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
            </div>
            <p class="font-sans text-sm font-medium text-[#2B231D] mb-1">Keranjang belanjaanmu masih kosong.</p>
            <p class="font-sans text-xs text-[#6B5E55] max-w-xs mx-auto">Jelajahi koleksi budaya untuk menemukan karya asli buatan pengrajin lokal.</p>
          </div>
        `;
      } else {
        itemsEl.innerHTML = cart.map((item, index) => `
          <div class="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-[#EDE4D5] shadow-xs group">
            <a href="product-detail.html?id=${encodeURIComponent(item.code || item.id)}" class="w-16 h-16 rounded-lg bg-[#EDE4D5] overflow-hidden flex-shrink-0 block">
              <img src="${item.img || 'assets/images/logonusava.png'}" alt="${item.name || 'Karya Pusaka'}" class="w-full h-full object-cover" onerror="this.src='assets/images/logonusava.png'">
            </a>
            <div class="flex-1 min-w-0">
              <a href="product-detail.html?id=${encodeURIComponent(item.code || item.id)}" class="font-sans font-semibold text-xs sm:text-sm text-[#2B231D] hover:text-[#C5A059] transition-colors truncate block">
                ${item.name || 'Karya Pusaka'}
              </a>
              <p class="text-[11px] text-[#6B5E55] font-sans truncate mt-0.5">
                ${item.daerah || item.artisan || 'Karya Nusantara'}
              </p>
              <div class="flex items-center justify-between mt-2 pt-0.5">
                <span class="text-xs font-bold text-[#963D06]">Rp ${formatRupiah(item.price || 0)}</span>
                <div class="flex items-center gap-2">
                  <div class="flex items-center border border-[#EDE4D5] rounded-full bg-[#FAF7F2] overflow-hidden shadow-2xs">
                    <button type="button" class="px-2 py-0.5 text-xs text-[#2B231D] hover:bg-[#EDE4D5] transition-colors cursor-pointer" data-cart-main-action="minus" data-cart-idx="${index}" aria-label="Kurangi kuantitas">−</button>
                    <span class="px-2 text-xs font-semibold text-[#2B231D] select-none">${item.qty || 1}</span>
                    <button type="button" class="px-2 py-0.5 text-xs text-[#2B231D] hover:bg-[#EDE4D5] transition-colors cursor-pointer" data-cart-main-action="plus" data-cart-idx="${index}" aria-label="Tambah kuantitas">+</button>
                  </div>
                  <button type="button" class="text-xs text-[#A08070] hover:text-[#FF6262] transition-colors cursor-pointer p-1" data-cart-main-action="remove" data-cart-idx="${index}" title="Hapus dari keranjang" aria-label="Hapus dari keranjang">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        `).join('');

        itemsEl.querySelectorAll('[data-cart-main-action]').forEach(btn => {
          btn.addEventListener('click', () => {
            const act = btn.getAttribute('data-cart-main-action');
            const idx = parseInt(btn.getAttribute('data-cart-idx'), 10);
            let currentCart = getSharedCart();
            if (act === 'minus') {
              if ((currentCart[idx].qty || 1) > 1) {
                currentCart[idx].qty = (currentCart[idx].qty || 1) - 1;
              } else {
                currentCart.splice(idx, 1);
              }
            } else if (act === 'plus') {
              currentCart[idx].qty = (currentCart[idx].qty || 1) + 1;
            } else if (act === 'remove') {
              currentCart.splice(idx, 1);
            }
            saveSharedCart(currentCart);
          });
        });
      }
    }
  }

  function showToast(msg) {
    if (!toast || !toastMsg) return;
    toastMsg.textContent = msg;
    toast.classList.remove('hide');
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => toast.classList.add('hide'), 3000);
  }
  window.showMainToast = showToast;

  // Teaser mode for Section 04 (Pasar Budaya - 4 Produk Pilihan Utama)
  if (grid.dataset.teaser === 'true' || !searchInput) {
    window.syncMainCartUI = syncCartUI;
    syncCartUI();

    // Listen to cross-page updates for cart
    window.addEventListener('storage', (e) => {
      if (e.key === 'nusava_cart_items') {
        syncCartUI();
      }
    });
    window.addEventListener('nusava-cart-updated', () => {
      syncCartUI();
    });

    grid.querySelectorAll('[data-quick-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const code = btn.dataset.quickCart;
        handleQuickAddToCart(code);
      });
    });

    // Make visual card area navigate to product detail on tap
    grid.querySelectorAll('.catalog-card-faire').forEach(card => {
      const code = card.dataset.code || card.getAttribute('data-code');
      const visual = card.querySelector('.catalog-card-visual');
      if (visual && code) {
        visual.addEventListener('click', (e) => {
          if (e.target.closest('[data-quick-cart]')) return;
          if (e.target.closest('.btn-action-detail')) return;
          window.location.href = `product-detail.html?id=${encodeURIComponent(code)}`;
        });
      }
    });
    return;
  }

  function updateCategoryTabCounts(catalog) {
    const pad = (n) => String(n).padStart(2, '0');
    const allCount = catalog.length;
    const wastraCount = catalog.filter(p => p.cat === 'wastra').length;
    const kriyaCount = catalog.filter(p => p.cat === 'kriya').length;
    const logamCount = catalog.filter(p => p.cat === 'logam-instrumen' || p.cat === 'musik').length;
    const anyamanCount = catalog.filter(p => p.cat === 'anyaman').length;

    const countAll = document.getElementById('count-all');
    const countWastra = document.getElementById('count-wastra');
    const countKriya = document.getElementById('count-kriya');
    const countLogam = document.getElementById('count-logam');
    const countAnyaman = document.getElementById('count-anyaman');

    if (countAll) countAll.textContent = '[' + pad(allCount) + ']';
    if (countWastra) countWastra.textContent = '[' + pad(wastraCount) + ']';
    if (countKriya) countKriya.textContent = '[' + pad(kriyaCount) + ']';
    if (countLogam) countLogam.textContent = '[' + pad(logamCount) + ']';
    if (countAnyaman) countAnyaman.textContent = '[' + pad(anyamanCount) + ']';
  }

  function getCatalogData() {
    if (typeof getSynchronizedCatalog === 'function') {
      return getSynchronizedCatalog();
    }
    if (typeof BASE_CATALOG_8 !== 'undefined') {
      return BASE_CATALOG_8;
    }
    if (typeof NUSAVA_PRODUCTS !== 'undefined' && NUSAVA_PRODUCTS.length > 0) {
      return NUSAVA_PRODUCTS;
    }
    return typeof PRODUCTS !== 'undefined' ? PRODUCTS : [];
  }

  function getFilteredList() {
    const catalog = getCatalogData();
    let result = catalog.filter(p => {
      // Category filter
      if (state.category !== 'all') {
        if (state.category === 'logam-instrumen') {
          if (p.cat !== 'logam-instrumen' && p.cat !== 'musik') return false;
        } else if (p.cat !== state.category) {
          return false;
        }
      }

      // Region filter
      if (state.region !== 'all') {
        const pRegion = (p.region || '').toLowerCase();
        if (pRegion !== state.region) return false;
      }

      // Status filter
      if (state.status !== 'all') {
        const isReady = (p.status || '').toLowerCase().includes('kirim') || (p.status || '').toLowerCase().includes('ready');
        if (state.status === 'ready' && !isReady) return false;
        if (state.status === 'wbtb' && isReady) return false;
      }

      // Search filter
      if (state.search.trim()) {
        const q = state.search.toLowerCase().trim();
        const str = [
          p.name,
          p.origin,
          p.daerah,
          p.artisan,
          p.cat,
          p.category,
          p.code,
          p.desc
        ].filter(Boolean).join(' ').toLowerCase();
        if (!str.includes(q)) return false;
      }

      return true;
    });

    // Sort
    if (state.sort === 'price-asc') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (state.sort === 'price-desc') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  }

  function buildFaireCard(p) {
    const code = p.code || p.id || 'KRY-001';
    const detailUrl = 'product-detail.html?id=' + encodeURIComponent(code);
    const isReady = (p.status || '').toLowerCase().includes('kirim') || (p.status || '').toLowerCase().includes('ready');
    const badgeText = isReady ? 'SIAP KIRIM' : 'TERKURASI WBTb';
    const originPart = (p.origin || p.daerah || 'NUSANTARA').toUpperCase();
    const artisanPart = (p.artisan || 'MAESTRO').toUpperCase();
    const microContext = originPart + ' • ' + artisanPart;
    const durationText = p.duration || 'Karya Tangan';

    return `
      <article class="catalog-card-faire group" data-code="${code}" data-cat="${p.cat}">
        <!-- Area Visual (Rasio Potret 3:4) -->
        <div class="catalog-card-visual relative">
          <img src="${p.img || 'assets/images/logonusava.png'}" alt="${p.name}" class="catalog-card-img" loading="lazy" onerror="this.src='assets/images/logonusava.png'">
          
          <!-- 1 Badge Status Kurasi (Pojok Kiri Atas) -->
          <span class="catalog-curation-badge">${badgeText}</span>
          
          <!-- Calm Action Bar on Hover (Deep Espresso #1E1610, WCAG AAA) -->
          <div class="catalog-action-bar">
            <a href="${detailUrl}" class="btn-action-detail">
              <span>LIHAT DETAIL &amp; KISAH</span>
              <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            <button type="button" class="btn-action-cart" data-quick-cart="${code}" title="Tambah ke Keranjang" aria-label="Tambah ke Keranjang">
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
            </button>
          </div>
        </div>

        <!-- Hierarki Informasi 3 Lapis di Bawah Foto -->
        <div class="catalog-info-layer">
          <!-- Lapis 1: Asal & Maestro -->
          <span class="layer-1-micro truncate" title="${microContext}">${microContext}</span>
          
          <!-- Lapis 2: Nama Karya Pusaka -->
          <h3 class="layer-2-title" title="${p.name}">
            <a href="${detailUrl}">${p.name}</a>
          </h3>
          
          <!-- Lapis 3: Harga & Estimasi Kriya -->
          <div class="layer-3-value">
            <span class="layer-3-price">Rp ${formatRupiah(p.price)}</span>
            <span class="layer-3-duration">${durationText}</span>
          </div>
        </div>
      </article>
    `;
  }

  function renderGrid() {
    const list = getFilteredList();
    if (activeCountEl) {
      activeCountEl.textContent = '[ ' + list.length + ' Karya ]';
    }

    if (list.length === 0) {
      grid.innerHTML = `
        <div class="col-span-full py-16 text-center text-[#7A6E65]">
          <p class="font-serif text-lg text-[#1E1610] mb-2">Karya Tidak Ditemukan</p>
          <p class="text-xs max-w-md mx-auto mb-6">Tidak ada karya yang sesuai dengan pencarian atau filter yang dipilih.</p>
          <button type="button" id="btn-reset-main-filter" class="px-6 py-2.5 bg-[#1E1610] text-[#FAF7F2] text-xs font-semibold uppercase tracking-wider hover:bg-[#8F3905] transition-colors cursor-pointer">
            Atur Ulang Filter
          </button>
        </div>
      `;
      document.getElementById('btn-reset-main-filter')?.addEventListener('click', () => {
        state.category = 'all';
        state.region = 'all';
        state.status = 'all';
        state.sort = 'recommended';
        state.search = '';
        if (searchInput) searchInput.value = '';
        if (regionSelect) regionSelect.value = 'all';
        if (statusSelect) statusSelect.value = 'all';
        if (sortSelect) sortSelect.value = 'recommended';
        categoryBtns.forEach(b => b.classList.toggle('active', b.dataset.filter === 'all'));
        renderGrid();
      });
      return;
    }

    grid.innerHTML = list.map(p => buildFaireCard(p)).join('');

    // Attach quick cart event listeners
    grid.querySelectorAll('[data-quick-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const code = btn.dataset.quickCart;
        handleQuickAddToCart(code);
      });
    });

    // Make visual card area navigate to product detail on tap
    grid.querySelectorAll('.catalog-card-faire').forEach(card => {
      const code = card.dataset.code || card.getAttribute('data-code');
      const visual = card.querySelector('.catalog-card-visual');
      if (visual && code) {
        visual.addEventListener('click', (e) => {
          if (e.target.closest('[data-quick-cart]')) return;
          if (e.target.closest('.btn-action-detail')) return;
          window.location.href = `product-detail.html?id=${encodeURIComponent(code)}`;
        });
      }
    });
  }

  function handleQuickAddToCart(code) {
    const catalog = getCatalogData();
    const product = catalog.find(x => x.code === code || x.id === code);
    if (!product) return;

    let cart = getSharedCart();
    const existing = cart.find(x => x.id === product.id || x.code === product.code);
    if (existing) {
      existing.qty = (existing.qty || 1) + 1;
    } else {
      cart.push({
        id: product.id,
        code: product.code || product.id,
        name: product.name,
        price: product.price,
        img: product.img,
        artisan: product.artisan,
        daerah: product.origin || product.daerah,
        village: product.origin || product.daerah,
        waPhone: product.waPhone || '6281238994411',
        qty: 1
      });
    }

    saveSharedCart(cart);

    if (cartCountEl) {
      cartCountEl.classList.remove('hidden');
      cartCountEl.classList.add('bump');
      setTimeout(() => cartCountEl.classList.remove('bump'), 300);
    }
    showToast('"' + product.name + '" ditambahkan ke keranjang');

    if (typeof window.openMainCart === 'function') {
      window.openMainCart();
    } else {
      const drawer = document.getElementById('cart-drawer');
      const overlay = document.getElementById('cart-overlay');
      if (drawer && overlay) {
        if (window.syncMainCartUI) window.syncMainCartUI();
        drawer.classList.add('open');
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
        document.body.classList.add('cart-open');
        window.dispatchEvent(new CustomEvent('nusava-cart-opened'));
      }
    }
  }

  // Bind Category Index buttons
  categoryBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      state.category = btn.dataset.filter || 'all';
      categoryBtns.forEach(b => {
        const isTarget = b.dataset.filter === state.category;
        b.classList.toggle('active', isTarget);
        b.setAttribute('aria-selected', isTarget ? 'true' : 'false');
      });
      renderGrid();
    });
  });

  // Bind Search input with debounce
  if (searchInput) {
    let searchDebounce;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(searchDebounce);
      searchDebounce = setTimeout(() => {
        state.search = e.target.value;
        renderGrid();
      }, 200);
    });
  }

  // Bind Region filter
  if (regionSelect) {
    regionSelect.addEventListener('change', (e) => {
      state.region = e.target.value;
      renderGrid();
    });
  }

  // Bind Status filter
  if (statusSelect) {
    statusSelect.addEventListener('change', (e) => {
      state.status = e.target.value;
      renderGrid();
    });
  }

  // Bind Sort filter
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      state.sort = e.target.value;
      renderGrid();
    });
  }

  // Listen to cross-page updates for products and cart
  window.addEventListener('storage', (e) => {
    if (e.key === 'nusava_artisan_products') {
      const updatedCatalog = getCatalogData();
      updateCategoryTabCounts(updatedCatalog);
      renderGrid();
    } else if (e.key === 'nusava_cart_items') {
      syncCartUI();
    }
  });

  // Initial load
  const initialCatalog = getCatalogData();
  updateCategoryTabCounts(initialCatalog);
  renderGrid();
  syncCartUI();
  window.syncMainCartUI = syncCartUI;
}

/* --------------------------------------------------------------------------
   12. JOURNAL SLIDER
   -------------------------------------------------------------------------- */
function initJournalSlider() {
  const track  = document.getElementById('journal-track');
  const dotsEl = document.getElementById('journal-dots');
  const prevBtn = document.getElementById('journal-prev');
  const nextBtn = document.getElementById('journal-next');
  if (!track) return;

  // Render slides with authentic journalism story cards linked to official articles
  track.innerHTML = ARTICLES.map(a => `
    <a href="${a.url}" target="_blank" rel="noopener noreferrer" class="journal-card flex-shrink-0 w-72 sm:w-80 lg:w-96 bg-[#FAF7F2] rounded-md border border-[#EDE4D5] overflow-hidden flex flex-col justify-between group no-underline text-inherit cursor-pointer hover:border-[#C5A059]/60" aria-label="Buka jurnal: ${a.title}">
      <div>
        <div class="card-img h-48 overflow-hidden relative">
          <img src="${a.img}" alt="${a.title}" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" onerror="this.src='assets/images/logonusava.png'">
          <span class="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full bg-[#241B16]/85 backdrop-blur-xs text-[#F7F2EA] text-[10px] font-sans font-bold tracking-wider uppercase">
            ${a.tag}
          </span>
          <span class="absolute top-2.5 right-2.5 w-7 h-7 rounded-full bg-[#241B16]/80 backdrop-blur-xs text-[#C5A059] flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 shadow-sm" title="Buka Sumber Asli">
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
          </span>
        </div>
        <div class="p-5 sm:p-6">
          <div class="flex items-center gap-1.5 mb-2.5 text-[10px] text-[#C5A059] font-sans font-semibold">
            <i data-lucide="landmark" class="w-3.5 h-3.5 flex-shrink-0"></i>
            <span class="line-clamp-1">${a.source}</span>
          </div>
          <h4 class="font-display font-semibold text-base sm:text-lg text-[#2B231D] leading-snug mb-2 group-hover:text-[#C5A059] transition-colors">${a.title}</h4>
          <p class="text-xs text-[#6B5E55] line-clamp-2 leading-relaxed mb-4 font-sans">${a.snippet}</p>
        </div>
      </div>
      <div class="px-5 pb-5 pt-0 mt-auto">
        <div class="flex items-center justify-between border-t border-[#EDE4D5] pt-3 text-[11px] text-[#6B5E55] font-sans">
          <span class="font-semibold text-[#2B231D]">Oleh ${a.author}</span>
          <div class="flex items-center gap-2">
            <span>${a.read}</span>
            <span class="text-[#C5A059] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
              Buka ↗
            </span>
          </div>
        </div>
      </div>
    </a>`).join('');

  let current = 0;

  const getStepW = () => {
    const firstCard = track.querySelector('.journal-card');
    return firstCard ? firstCard.offsetWidth + 16 : 320;
  };

  const getMaxScroll = () => {
    const container = track.parentElement;
    const containerW = container ? container.clientWidth : window.innerWidth;
    return Math.max(0, track.scrollWidth - containerW);
  };

  const getMaxIdx = () => {
    const step = getStepW();
    const maxScroll = getMaxScroll();
    if (step <= 0) return ARTICLES.length - 1;
    return Math.min(ARTICLES.length - 1, Math.ceil(maxScroll / step));
  };

  const updateControls = () => {
    const maxIdx = getMaxIdx();
    if (prevBtn) {
      prevBtn.style.opacity = current === 0 ? '0.35' : '1';
      prevBtn.style.cursor = current === 0 ? 'default' : 'pointer';
    }
    if (nextBtn) {
      nextBtn.style.opacity = current >= maxIdx ? '0.35' : '1';
      nextBtn.style.cursor = current >= maxIdx ? 'default' : 'pointer';
    }
    dotsEl?.querySelectorAll('.journal-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
  };

  const renderDots = () => {
    if (!dotsEl) return;
    const count = getMaxIdx() + 1;
    dotsEl.innerHTML = Array.from({ length: count }, (_, i) =>
      `<button class="journal-dot${i === current ? ' active' : ''}" data-idx="${i}" aria-label="Slide ${i + 1}"></button>`
    ).join('');
    dotsEl.querySelectorAll('.journal-dot').forEach(d => {
      d.addEventListener('click', () => go(+d.dataset.idx));
    });
  };

  const go = (idx) => {
    const maxIdx = getMaxIdx();
    current = Math.max(0, Math.min(idx, maxIdx));
    const step = getStepW();
    const maxScroll = getMaxScroll();
    const targetX = Math.min(current * step, maxScroll);
    track.style.transform = `translateX(-${targetX}px)`;
    updateControls();
  };

  renderDots();
  updateControls();

  prevBtn?.addEventListener('click', () => go(current - 1));
  nextBtn?.addEventListener('click', () => go(current + 1));

  // Responsive re-calc on window resize
  window.addEventListener('resize', () => {
    renderDots();
    go(current);
  }, { passive: true });

  // Touch swipe handling with drag prevention for link clicks
  let startX = 0;
  let isSwiping = false;

  track.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
    isSwiping = false;
  }, { passive: true });

  track.addEventListener('touchmove', e => {
    if (Math.abs(e.touches[0].clientX - startX) > 10) {
      isSwiping = true;
    }
  }, { passive: true });

  track.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      go(dx < 0 ? current + 1 : current - 1);
    }
  }, { passive: true });

  track.querySelectorAll('.journal-card').forEach(card => {
    card.addEventListener('click', e => {
      if (isSwiping) {
        e.preventDefault();
        e.stopPropagation();
        isSwiping = false;
      }
    });
  });
}

/* --------------------------------------------------------------------------
   13. SUBNAV ACTIVE SECTION TRACKING
   -------------------------------------------------------------------------- */
function initSubNavTracking() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.sub-nav-link[href^="#"]');
  if (!links.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === `#${id}`));
      }
    });
  }, { rootMargin: '-40% 0px -40% 0px' });

  sections.forEach(s => obs.observe(s));
}

/* --------------------------------------------------------------------------
   14. NEWSLETTER FORM (Footer & CTA Banner)
   -------------------------------------------------------------------------- */
function initNewsletter() {
  const forms = [
    document.getElementById('newsletter-form'),
    document.getElementById('cta-newsletter-form')
  ].filter(Boolean);

  forms.forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const input = form.querySelector('input[type=email]');
      if (!input?.value) return;
      const btn = form.querySelector('button[type=submit]');
      const originalHTML = btn ? btn.innerHTML : '';
      if (btn) {
        btn.innerHTML = '<span>Terima Kasih!</span>';
        btn.disabled = true;
      }
      input.value = '';
      setTimeout(() => {
        if (btn) {
          btn.innerHTML = originalHTML;
          btn.disabled = false;
        }
      }, 3000);
    });
  });
}

/* --------------------------------------------------------------------------
   15. NUSANTARA AI ASSISTANT (Konsultasi & Kustomisasi Kriya)
   -------------------------------------------------------------------------- */
function initAIAssistant() {
  const promptInput = document.getElementById('ai-prompt-input');
  const submitBtn = document.getElementById('ai-submit-btn');
  const clearBtn = document.getElementById('ai-clear-btn');
  const charCounter = document.getElementById('ai-char-counter');
  const chips = document.querySelectorAll('.ai-chip[data-prompt]');
  
  const placeholderState = document.getElementById('ai-placeholder-state');
  const typingState = document.getElementById('ai-typing-state');
  const resultState = document.getElementById('ai-result-state');

  const titleEl = document.getElementById('ai-result-title');
  const categoryEl = document.getElementById('ai-result-category');
  const techniqueEl = document.getElementById('ai-result-technique');
  const philosophyEl = document.getElementById('ai-result-philosophy');
  const timelineEl = document.getElementById('ai-result-timeline');
  const priceEl = document.getElementById('ai-result-price');
  const artisanEl = document.getElementById('ai-result-artisan');
  const sourceEl = document.getElementById('ai-result-source');
  const waBtn = document.getElementById('ai-wa-btn');
  const copyBtn = document.getElementById('ai-copy-btn');

  if (!promptInput || !submitBtn) return;

  // Character counter
  const updateCharCount = () => {
    if (charCounter) charCounter.textContent = `${promptInput.value.length} / 300 karakter`;
  };

  promptInput.addEventListener('input', updateCharCount);

  // Clear button
  clearBtn?.addEventListener('click', () => {
    promptInput.value = '';
    updateCharCount();
    promptInput.focus();
  });

  // Prompt chips
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      promptInput.value = chip.dataset.prompt;
      updateCharCount();
      promptInput.focus();
    });
  });

  // AI Knowledge & Heuristic Recommendation Engine
  function generateAIRecommendation(query) {
    const q = query.toLowerCase();

    // 1. Bali / Tenun Biru / Pernikahan
    if (q.includes('bali') || q.includes('biru') || q.includes('tenun') || q.includes('nikah') || q.includes('endek')) {
      return {
        title: 'Kain Tenun Ikat Endek Mastuli Bali',
        category: 'Wastra Kustom',
        technique: 'Tenun ATBM dengan pewarna alami daun tarum (indigo biru laut). Kombinasi motif ombak Segara dan ragam hias Patra Punggel modern.',
        philosophy: 'Melambangkan keteguhan rasa cinta yang luas bak samudera dan keharmonisan hidup keluarga baru dalam tradisi Hindu-Bali.',
        timeline: '3 – 4 Minggu Kerja (Pengerjaan Tangan)',
        price: 'Rp 2.400.000 – Rp 3.600.000',
        artisan: 'Komunitas Penenun Sidemen, Karangasem, Bali',
        source: 'Indikasi Geografis DJKI Kemenkumham RI (ID G 000000094)'
      };
    }

    // 2. Batik / Jawa / Busana Kerja / Soga
    if (q.includes('batik') || q.includes('jawa') || q.includes('kerja') || q.includes('soga') || q.includes('kawung') || q.includes('parang')) {
      return {
        title: 'Batik Tulis Soga Alam Corak Kontemporer',
        category: 'Busana Wastra',
        technique: 'Canting tulis lilin malam dingin di atas sutra ATBM, pencelupan 7 tahap kulit kayu mahoni dan tingi alami nuansa earthy tone.',
        philosophy: 'Melambangkan ketenangan batin, kepemimpinan bijaksana, dan integritas profesional yang rendah hati seperti filosofi padi.',
        timeline: '2 – 3 Minggu Kerja (Full Hand-Drawn)',
        price: 'Rp 1.850.000 – Rp 2.900.000',
        artisan: 'Paguyuban Pembatik Giriloyo, Imogiri, Yogyakarta',
        source: 'UNESCO Masterpiece of Oral and Intangible Heritage (2009)'
      };
    }

    // 3. Ukiran / Dayak / Kayu / Dinding / Kalimantan
    if (q.includes('ukir') || q.includes('dayak') || q.includes('kayu') || q.includes('kalimantan') || q.includes('dinding') || q.includes('ruang tamu')) {
      return {
        title: 'Panel Dinding Ukir Perisai Talawang Dayak',
        category: 'Kriya Kayu',
        technique: 'Pahatan relief kayu ulin tahan lapuk dengan sentuhan minyak biji tengkawang dan aksen geometris asimetris minimalis.',
        philosophy: 'Talawang adalah simbol perlindungan rumah tangga, keberanian spiritual, dan keselarasan abadi dengan hutan rimba tropis.',
        timeline: '3 – 5 Minggu Kerja (Pahat Tangan)',
        price: 'Rp 1.650.000 – Rp 3.200.000',
        artisan: 'Sentra Seni Pahat Dayak Kenyah, Kutai Barat, Kalimantan Timur',
        source: 'Warisan Budaya Takbenda Kemendikbudristek RI'
      };
    }

    // 4. Keris / Besi / Emas / Luk / Koleksi / Cinderamata
    if (q.includes('keris') || q.includes('luk') || q.includes('pusaka') || q.includes('emas') || q.includes('cinderamata') || q.includes('koleksi')) {
      return {
        title: 'Keris Pusaka Luk 7 Warangka Gayaman Surakarta',
        category: 'Pusaka Logam',
        technique: 'Tempa lipat meteorit pamor wos wutah (beras wutah) dengan selorok baja pilihan dan pendok tatahan perak lapis emas sepuh.',
        philosophy: 'Luk 7 melambangkan pitulungan (pertolongan dan keberkahan Sang Pencipta) serta kewibawaan luhur seorang pemimpin.',
        timeline: '6 – 8 Minggu Kerja (Empu Keris Tradisional)',
        price: 'Rp 5.500.000 – Rp 12.000.000',
        artisan: 'Besalen Batur Empu Keris Banyuanyar, Surakarta',
        source: 'UNESCO Masterpiece of Oral and Intangible Heritage (2005)'
      };
    }

    // 5. Songket / Sumatera / Palembang / Tenun Emas
    if (q.includes('songket') || q.includes('palembang') || q.includes('sumatera') || q.includes('minang')) {
      return {
        title: 'Songket Lepus Berlapis Benang Emas Cabutan',
        category: 'Wastra Adiluhung',
        technique: 'Pakan tenun benang sutra murni dengan sulaman benang emas jantung murni motif bungo intan dan bungo cina khas kesultanan.',
        philosophy: 'Cerminan kemegahan maritim Sriwijaya, martabat keluarga terhormat, dan kemurnian akhlak budi pekerti luhur.',
        timeline: '4 – 6 Minggu Kerja (Tenun Manual Songket)',
        price: 'Rp 3.800.000 – Rp 6.500.000',
        artisan: 'Penenun Tradisi Ogan Ilir & Tangga Buntung, Palembang',
        source: 'Warisan Budaya Takbenda Kemendikbudristek No. 201300008'
      };
    }

    // Default Fallback
    return {
      title: 'Pusaka Kriya Kustom Terpadu Nusantara',
      category: 'Karya Kriya Khusus',
      technique: 'Pengerjaan tangan orisinil oleh maestro daerah dengan bahan baku ramah lingkungan dan sertifikasi autentisitas Nusava.',
      philosophy: 'Mewujudkan jembatan antara visi estetikamu dan keluhuran tradisi warisan leluhur nusantara.',
      timeline: '2 – 4 Minggu Kerja (Sesuai Spesifikasi)',
      price: 'Rp 1.500.000 – Rp 4.000.000 (Estimasi Menyesuaikan)',
      artisan: 'Jaringan Pengrajin Terverifikasi Nusava (38 Provinsi)',
      source: 'Katalog Warisan Budaya Kemendikbudristek RI'
    };
  }

  // Handle Submit
  submitBtn.addEventListener('click', handleConsultation);
  promptInput.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      handleConsultation();
    }
  });

  function handleConsultation() {
    const text = promptInput.value.trim();
    if (!text) {
      promptInput.focus();
      promptInput.classList.add('border-red-400');
      setTimeout(() => promptInput.classList.remove('border-red-400'), 600);
      return;
    }

    // Show simulated typing state
    placeholderState?.classList.add('hidden');
    resultState?.classList.add('hidden');
    typingState?.classList.remove('hidden');
    submitBtn.disabled = true;

    // Simulate 1.2s intelligent cultural computation
    setTimeout(() => {
      const rec = generateAIRecommendation(text);

      if (titleEl) titleEl.textContent = rec.title;
      if (categoryEl) categoryEl.textContent = rec.category;
      if (techniqueEl) techniqueEl.textContent = rec.technique;
      if (philosophyEl) philosophyEl.textContent = rec.philosophy;
      if (timelineEl) timelineEl.textContent = rec.timeline;
      if (priceEl) priceEl.textContent = rec.price;
      if (artisanEl) artisanEl.textContent = rec.artisan;
      if (sourceEl && rec.source) sourceEl.textContent = rec.source;

      // Construct WhatsApp pre-filled text
      const waMsg = `Halo Pengrajin & Kurator Nusava, saya ingin berkonsultasi mengenai pesanan kustom karya pusaka hasil analisis AI Assistant:

*Spesifikasi Kustomisasi:*
• *Keinginan Saya:* "${text}"
• *Rekomendasi AI:* ${rec.title} (${rec.category})
• *Teknik Pengerjaan:* ${rec.technique}
• *Filosofi:* ${rec.philosophy}
• *Estimasi Waktu:* ${rec.timeline}
• *Perkiraan Biaya:* ${rec.price}
• *Sentra Pengrajin:* ${rec.artisan}
• *Rujukan Budaya Resmi:* ${rec.source || 'Warisan Budaya Nusantara'}

Mohon informasi ketersediaan jadwal pengrajin dan prosedur pemesanan kustom selanjutnya. Terima kasih!`;

      if (waBtn) {
        waBtn.href = `https://api.whatsapp.com/send?phone=6281234567890&text=${encodeURIComponent(waMsg)}`;
      }

      // Copy button handler
      if (copyBtn) {
        copyBtn.onclick = () => {
          navigator.clipboard?.writeText(waMsg).then(() => {
            const toast = document.getElementById('toast');
            const toastMsg = document.getElementById('toast-msg');
            if (toast && toastMsg) {
              toastMsg.textContent = 'Rincian rekomendasi kustomisasi berhasil disalin!';
              toast.classList.remove('hide');
              clearTimeout(toast._timer);
              toast._timer = setTimeout(() => toast.classList.add('hide'), 3000);
            }
          });
        };
      }

      typingState?.classList.add('hidden');
      resultState?.classList.remove('hidden');
      submitBtn.disabled = false;
    }, 1200);
  }
}

/* --------------------------------------------------------------------------
   16. AI HERITAGE MATCHMAKER (Kuis Pencocokan Pusaka 3 Langkah)
   -------------------------------------------------------------------------- */
function initHeritageMatchmaker() {
  const steps = [
    document.getElementById('quiz-step-1'),
    document.getElementById('quiz-step-2'),
    document.getElementById('quiz-step-3')
  ];
  const stepLabel = document.getElementById('quiz-step-label');
  const percentLabel = document.getElementById('quiz-percent-label');
  const progressFill = document.getElementById('quiz-progress-fill');

  const scanner = document.getElementById('matchmaker-scanner');
  const scannerText = document.getElementById('matchmaker-scanner-text');
  const resultCard = document.getElementById('matchmaker-result');

  const analyzeBtn = document.getElementById('quiz-btn-analyze');
  const resetBtn = document.getElementById('match-reset-btn');
  const qvBtn = document.getElementById('match-qv-btn');

  const matchTitle = document.getElementById('match-title');
  const matchCategory = document.getElementById('match-category');
  const matchRegion = document.getElementById('match-region');
  const matchNarrative = document.getElementById('match-narrative');
  const matchCraft = document.getElementById('match-craft');
  const matchPrice = document.getElementById('match-price');
  const matchImg = document.getElementById('match-img');
  const matchScore = document.getElementById('match-score');
  const matchSource = document.getElementById('match-source');

  if (!steps[0] || !analyzeBtn) return;

  let currentStep = 1;
  const userAnswers = {
    style: 'modern',
    purpose: 'dekorasi',
    color: 'emas'
  };

  const stepTitles = [
    'Langkah 1 dari 3: Gaya Estetika',
    'Langkah 2 dari 3: Kebutuhan / Tujuan',
    'Langkah 3 dari 3: Nuansa Warna'
  ];
  const percentages = ['33% Selesai', '66% Selesai', '100% Selesai'];
  const progressWidths = ['33.33%', '66.66%', '100%'];

  function updateStepUI() {
    steps.forEach((s, idx) => {
      if (s) s.classList.toggle('hidden', idx !== currentStep - 1);
    });
    if (stepLabel) stepLabel.textContent = stepTitles[currentStep - 1];
    if (percentLabel) percentLabel.textContent = percentages[currentStep - 1];
    if (progressFill) progressFill.style.width = progressWidths[currentStep - 1];
  }

  // Card click selection
  document.querySelectorAll('.quiz-card[data-step]').forEach(card => {
    card.addEventListener('click', () => {
      const stepIdx = parseInt(card.dataset.step);
      const val = card.dataset.value;
      const stepContainer = steps[stepIdx - 1];
      if (!stepContainer) return;

      // Deselect siblings
      stepContainer.querySelectorAll('.quiz-card').forEach(c => {
        c.classList.remove('selected');
        const circle = c.querySelector('.quiz-radio-circle');
        if (circle) {
          circle.classList.remove('border-[#C5A059]');
          circle.classList.add('border-stone-300');
        }
        const check = c.querySelector('.quiz-radio-check');
        if (check) {
          check.classList.add('opacity-0', 'scale-50');
        }
      });

      // Select clicked
      card.classList.add('selected');
      const circle = card.querySelector('.quiz-radio-circle');
      if (circle) {
        circle.classList.remove('border-stone-300');
        circle.classList.add('border-[#C5A059]');
      }
      const check = card.querySelector('.quiz-radio-check');
      if (check) {
        check.classList.remove('opacity-0', 'scale-50');
      }

      if (stepIdx === 1) userAnswers.style = val;
      if (stepIdx === 2) userAnswers.purpose = val;
      if (stepIdx === 3) userAnswers.color = val;
    });
  });

  // Next / Prev buttons
  document.querySelectorAll('.quiz-btn-next').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep < 3) {
        currentStep++;
        updateStepUI();
      }
    });
  });

  document.querySelectorAll('.quiz-btn-prev').forEach(btn => {
    btn.addEventListener('click', () => {
      if (currentStep > 1) {
        currentStep--;
        updateStepUI();
      }
    });
  });

  // Database of recommendations mapped with PRODUCTS
  const RECOMMENDATIONS = [
    {
      id: 2,
      style: 'modern',
      purpose: 'dekorasi',
      color: 'emas',
      score: '99%',
      name: 'Batik Tulis Nitik Kembang Jeruk Giriloyo',
      category: 'Wastra Warisan UNESCO',
      daerah: 'Bantul, D.I. Yogyakarta',
      craft: 'Canting Cawang Manual & Pewarna Soga Alami',
      price: 'Rp 2.850.000',
      source: 'UNESCO Intangible Cultural Heritage (2009) & WBTb Kemendikbud No. 202001185',
      img: 'assets/images/content/produk-batik-giriloyo.jpg',
      narrative: 'Berdasarkan pilihan gaya Modern Minimalis dan dekorasi bernuansa hangat, kamu cocok banget dengan Batik Tulis Nitik Giriloyo. Pola titik geometrisnya yang presisi dibuat dengan canting cawang khusus selama berbulan-bulan, memberi sentuhan estetik yang tenang dan elegan di ruanganmu.'
    },
    {
      id: 1,
      style: 'modern',
      purpose: 'fashion',
      color: 'biru',
      score: '98%',
      name: 'Kain Tenun Ikat Hinggi Sumba Timur',
      category: 'Wastra Pewarna Alami',
      daerah: 'Waingapu, Sumba Timur (NTT)',
      craft: 'Tenun Ikat Gedogan Tradisional & Daun Tarum Nila',
      price: 'Rp 3.450.000',
      source: 'Warisan Budaya Takbenda (WBTb) Kemendikbudristek No. Reg 201400144',
      img: 'assets/images/content/produk-tenun-sumba.jpg',
      narrative: 'Seleramu yang menyukai fashion berkarakter dengan warna biru samudra sangat cocok dengan Tenun Ikat Sumba Timur. Dicelup puluhan kali memakai daun nila alami, motif kuda dan rusa pada kain ini melambangkan keberanian dan kepemimpinan.'
    },
    {
      id: 6,
      style: 'bohemian',
      purpose: 'dekorasi',
      color: 'emas',
      score: '97%',
      name: 'Ukiran Patung Mbis Leluhur Suku Asmat',
      category: 'Seni Pahat Kayu Alami',
      daerah: 'Agats, Pesisir Asmat, Papua',
      craft: 'Pahat Manual Kayu Besi & Pewarna Tanah Merah',
      price: 'Rp 3.200.000',
      source: 'Warisan Budaya Takbenda (WBTb) Kemendikbudristek No. Reg 201300063',
      img: 'assets/images/content/produk-patung-asmat.jpg',
      narrative: 'Jiwa seni dan ketertarikanmu pada dekorasi organik bernilai tinggi sangat pas dengan Seni Ukir Suku Asmat. Dipahat manual tanpa bantuan mesin dari kayu besi pilihan, karya ini membawa energi spiritual leluhur dan kehangatan alami ke dalam hunian.'
    },
    {
      id: 4,
      style: 'etnik',
      purpose: 'koleksi',
      color: 'emas',
      score: '99%',
      name: 'Perhiasan Perak Filigri Khas Desa Celuk',
      category: 'Kriya Logam Mulia',
      daerah: 'Desa Celuk, Gianyar, Bali',
      craft: 'Pilinan Benang Perak 925 & Sepuh Emas 18K',
      price: 'Rp 1.450.000',
      source: 'Indikasi Geografis DJKI Kemenkumham RI & Kemenparekraf',
      img: 'assets/images/content/produk-perak-celuk.jpg',
      narrative: 'Kecintaanmu pada karya seni detail dan eksklusif membawa AI memilihkan Perhiasan Perak Filigri Celuk. Benang perak dipilin sehalus helai rambut oleh para maestro Gianyar, menciptakan perhiasan bunga teratai yang anggun dan bernilai seni tinggi.'
    },
    {
      id: 5,
      style: 'etnik',
      purpose: 'fashion',
      color: 'emas',
      score: '98%',
      name: 'Kain Songket Lepus Emas Asli Palembang',
      category: 'Wastra Kemuliaan Tradisi',
      daerah: 'Ogan Ilir, Sumatera Selatan',
      craft: 'Tenun Gedogan Sutra & Benang Emas Cabutan Murni',
      price: 'Rp 4.800.000',
      source: 'Warisan Budaya Takbenda (WBTb) Kemendikbudristek No. Reg 201300008',
      img: 'assets/images/content/produk-songket-palembang.jpg',
      narrative: 'Kombinasi selera busana berkelas dan rona emas mewah sangat pas dengan Songket Lepus Palembang. Dijuluki Ratu Segala Kain Nusantara, benang emasnya menutupi permukaan kain sutra rapat, memancarkan pesona keagungan sejak masa Sriwijaya.'
    },
    {
      id: 8,
      style: 'bohemian',
      purpose: 'fashion',
      color: 'hijau',
      score: '96%',
      name: 'Anyaman Tas & Wadah Ketak Beleka Lombok',
      category: 'Kriya Serat Hutan Ramah Lingkungan',
      daerah: 'Lombok Tengah, NTB',
      craft: 'Anyaman Rumput Paku Liar & Pengasapan Sabut Kelapa',
      price: 'Rp 520.000',
      source: 'Indikasi Geografis DJKI Kemenkumham (ID G 000000078)',
      img: 'assets/images/content/produk-ketak-lombok.jpg',
      narrative: 'Gaya santai ramah lingkungan yang kamu pilih sangat pas dengan Anyaman Ketak Beleka. Terbuat dari tanaman paku hutan alami yang diawetkan dengan asap kelapa, tas ini tahan air, bebas jamur, dan awet hingga puluhan tahun.'
    },
    {
      id: 7,
      style: 'modern',
      purpose: 'dekorasi',
      color: 'hijau',
      score: '97%',
      name: 'Instrumen Sasando Akustik Daun Lontar Rote',
      category: 'Alat Musik Tradisi Budaya',
      daerah: 'Pulau Rote, NTT',
      craft: 'Resonator Anyaman Haik Daun Lontar Pilihan',
      price: 'Rp 2.100.000',
      source: 'Warisan Budaya Takbenda Kemendikbudristek No. 201200028',
      img: 'assets/images/content/produk-sasando-rote.jpg',
      narrative: 'Sentuhan harmonis antara seni musik dan dekorasi ruangan menghasilkan kecocokan sempurna dengan Sasando Rote. Bentuk resonatornya yang menyerupai kipas daun lontar menghadirkan obrolan menarik sekaligus melodi jernih yang menenangkan pikiran.'
    }
  ];

  function getBestRecommendation(ans) {
    const exact = RECOMMENDATIONS.find(r => r.style === ans.style && r.purpose === ans.purpose && r.color === ans.color);
    if (exact) return exact;

    const semi = RECOMMENDATIONS.find(r => (r.style === ans.style && r.purpose === ans.purpose) || (r.purpose === ans.purpose && r.color === ans.color) || (r.style === ans.style && r.color === ans.color));
    if (semi) return semi;

    return RECOMMENDATIONS[0];
  }

  // Analyze button click
  analyzeBtn.addEventListener('click', () => {
    steps[2]?.classList.add('hidden');
    scanner?.classList.remove('hidden');

    const scanMessages = [
      'Menganalisis harmoni estetika dengan filosofi Nusantara...',
      'Menyaring 1.340 tradisi suku bangsa & database perajin...',
      'Menemukan keselarasan pusaka terbaik dengan karaktermu...'
    ];

    let msgIdx = 0;
    const interval = setInterval(() => {
      msgIdx = (msgIdx + 1) % scanMessages.length;
      if (scannerText) scannerText.textContent = scanMessages[msgIdx];
    }, 500);

    setTimeout(() => {
      clearInterval(interval);
      const rec = getBestRecommendation(userAnswers);

      if (matchTitle) matchTitle.textContent = rec.name;
      if (matchCategory) matchCategory.textContent = rec.category;
      if (matchRegion) matchRegion.textContent = rec.daerah;
      if (matchNarrative) matchNarrative.textContent = `"${rec.narrative}"`;
      if (matchCraft) matchCraft.textContent = rec.craft;
      if (matchPrice) matchPrice.textContent = rec.price;
      if (matchImg) matchImg.src = rec.img;
      if (matchScore) matchScore.textContent = rec.score;
      if (matchSource && rec.source) matchSource.textContent = rec.source;
      if (qvBtn) qvBtn.dataset.qv = rec.id;

      scanner?.classList.add('hidden');
      resultCard?.classList.remove('hidden');
    }, 1600);
  });

  // Reset button
  resetBtn?.addEventListener('click', () => {
    currentStep = 1;
    resultCard?.classList.add('hidden');
    updateStepUI();
  });

  // Quick View Button integration
  qvBtn?.addEventListener('click', (e) => {
    const productId = e.currentTarget.dataset.qv;
    if (window.openProductQuickView) {
      window.openProductQuickView(productId);
    }
  });
}

/* --------------------------------------------------------------------------
   16b. FAQ ACCORDION (Pure Vanilla Two-Column Clean Toggle)
   -------------------------------------------------------------------------- */
function initFAQ() {
  const triggers = document.querySelectorAll('.faq-trigger');
  triggers.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      if (!item) return;
      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Close other accordion items
      document.querySelectorAll('.faq-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          other.querySelector('.faq-trigger')?.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle clicked item
      item.classList.toggle('active', !isExpanded);
      btn.setAttribute('aria-expanded', !isExpanded ? 'true' : 'false');
    });
  });
}

/* --------------------------------------------------------------------------
   16. NAVBAR AUTH & SESSION (Pengrajin / Kolektor)
   -------------------------------------------------------------------------- */
function initNavbarAuth() {
  if (window.NusavaAuth && typeof window.NusavaAuth.renderNavbarAuth === 'function') {
    window.NusavaAuth.renderNavbarAuth();
    return;
  }
}

/* --------------------------------------------------------------------------
   17. 3D CARD INTERACTIVE TILT ENGINE (Hardware-Accelerated 60 FPS)
   -------------------------------------------------------------------------- */
function init3DCardTilt() {
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  function bindCardTilt(card) {
    if (card._tiltBound) return;
    card._tiltBound = true;

    let bounds = null;
    let rAF = null;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      card.setAttribute('data-tilting', 'true');
      card.style.transition = 'transform 0.12s ease-out, box-shadow 0.2s ease-out, border-color 0.3s ease';
    });

    card.addEventListener('mousemove', e => {
      if (!bounds) bounds = card.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const pctX = (mouseX / bounds.width) - 0.5; // -0.5 to 0.5
      const pctY = (mouseY / bounds.height) - 0.5;

      const maxTilt = 8; // subtle, luxurious 8 degrees tilt
      const rotX = (-pctY * maxTilt).toFixed(2);
      const rotY = (pctX * maxTilt).toFixed(2);
      const liftZ = 12; // px

      const shadowX = (-pctX * 16).toFixed(1);
      const shadowY = (Math.abs(pctY) * 16 + 12).toFixed(1);

      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        card.style.setProperty('--mouse-x', `${mouseX}px`);
        card.style.setProperty('--mouse-y', `${mouseY}px`);
        card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(${liftZ}px)`;
        card.style.boxShadow = `${shadowX}px ${shadowY}px 28px -6px rgba(36, 27, 22, 0.22), 0 0 16px rgba(197, 160, 89, 0.22)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rAF) cancelAnimationFrame(rAF);
      card.removeAttribute('data-tilting');
      bounds = null;
      card.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.boxShadow = '';
    });
  }

  function bindAllCards() {
    const selector = '.card-3d, .product-card, .pilar-card, .testimonial-card, .gallery-card, .game-pillar-card, .game-control-card, .culture-card, .catalog-card-faire';
    document.querySelectorAll(selector).forEach(bindCardTilt);
  }

  bindAllCards();
  window.refresh3DCardTilt = bindAllCards;
}

/* --------------------------------------------------------------------------
   17B. ARTISAN ONBOARDING MODAL & DUAL-PERSONA CTA (Warm Heritage)
   -------------------------------------------------------------------------- */
function initArtisanOnboardingModal() {
  const modal = document.getElementById('artisan-onboarding-modal');
  const openBtn = document.getElementById('btn-open-artisan-modal');
  const closeBtn = document.getElementById('artisan-modal-close');
  const backdrop = document.getElementById('artisan-modal-backdrop');
  const presetBtn = document.getElementById('btn-quick-fill-artisan');
  const form = document.getElementById('artisan-onboarding-form');
  const nameInput = document.getElementById('artisan-input-name');
  const regionSelect = document.getElementById('artisan-input-region');
  const categorySelect = document.getElementById('artisan-input-category');
  const submitBtn = document.getElementById('btn-submit-artisan');
  const submitText = document.getElementById('btn-submit-artisan-text');

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    setTimeout(() => {
      if (nameInput) nameInput.focus();
    }, 80);
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    closeModal();
  });

  backdrop?.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // 1-Click Quick Preset for Competition Judges
  presetBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    if (nameInput) nameInput.value = 'I Wayan Sukadana';
    if (regionSelect) regionSelect.value = 'Bali (Gianyar & Celuk)';
    if (categorySelect) categorySelect.value = 'Seni Ukir Kayu & Relief';

    [nameInput, regionSelect, categorySelect].forEach(el => {
      if (el) {
        el.classList.add('ring-2', 'ring-[#C5A059]');
        setTimeout(() => el.classList.remove('ring-2', 'ring-[#C5A059]'), 800);
      }
    });
  });

  // Form Submission -> Persist Auth & Redirect to Studio
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameVal = (nameInput && nameInput.value.trim()) || 'I Wayan Sukadana';
    const regionVal = (regionSelect && regionSelect.value) || 'Bali (Desa Celuk & Gianyar)';
    const categoryVal = (categorySelect && categorySelect.value) || 'Seni Ukir Kayu & Relief Arsitektur';

    const authData = {
      role: 'pengrajin',
      name: nameVal,
      studio: nameVal.toLowerCase().includes('sanggar') ? nameVal : 'Bengkel Kriya ' + nameVal,
      region: regionVal,
      category: categoryVal,
      title: 'Maestro Seni Ukir Tradisional',
      email: 'wayan.sukadana@nusava.id',
      avatar: 'assets/images/pengrajin-ukir.jpg',
      verified: true,
      loggedInAt: new Date().toISOString()
    };

    try {
      localStorage.setItem('nusava_auth', JSON.stringify(authData));
    } catch (err) {}

    if (submitBtn && submitText) {
      submitBtn.disabled = true;
      submitBtn.classList.add('opacity-80', 'cursor-wait');
      submitText.textContent = 'Membuka Studio Pengrajin...';
    }

    setTimeout(() => {
      window.location.href = 'dashboard.html';
    }, 450);
  });
}

/* --------------------------------------------------------------------------
   18. BOOT
   -------------------------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initNavbarAuth();
  initSmoothScroll();
  initScrollReveal();
  initCounters();
  initParallax();
  initVideoModal();
  initLicenseModal();
  initAreaSwitcher();
  initMarketplace();
  initJournalSlider();
  initSubNavTracking();
  initNewsletter();
  initAIAssistant();
  initHeritageMatchmaker();
  initFAQ();
  init3DCardTilt();
  initArtisanOnboardingModal();
  if (window.lucide) { lucide.createIcons(); }
});

// Immediate check in case document is already parsed
if (document.readyState !== 'loading') {
  init3DCardTilt();
  initArtisanOnboardingModal();
  if (window.lucide) { lucide.createIcons(); }
}

document.addEventListener('DOMContentLoaded', () => {
  const openCartBtn = document.querySelector('[data-cart-open]');
  const closeCartBtn = document.getElementById('cart-close-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');

  function openCart() {
    if (cartDrawer && cartOverlay) {
      if (window.syncMainCartUI) window.syncMainCartUI();
      cartDrawer.classList.add('open');
      cartOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // Menjaga layar belakang agar tidak ikut bergeser/scroll
      document.body.classList.add('cart-open');
      window.dispatchEvent(new CustomEvent('nusava-cart-opened'));
    }
  }

  function closeCart() {
    if (cartDrawer && cartOverlay) {
      cartDrawer.classList.remove('open');
      cartOverlay.classList.remove('open');
      document.body.style.overflow = '';
      document.body.classList.remove('cart-open');
      window.dispatchEvent(new CustomEvent('nusava-cart-closed'));
    }
  }

  window.openMainCart = openCart;
  window.closeMainCart = closeCart;

  if (openCartBtn) openCartBtn.addEventListener('click', openCart);
  if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
  if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

  // Initial sync on page ready
  if (window.syncMainCartUI) window.syncMainCartUI();

  const checkoutBtn = document.getElementById('btn-main-cart-checkout');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      const cart = (function() {
        try {
          const d = localStorage.getItem('nusava_cart_items');
          return d ? JSON.parse(d) : [];
        } catch (e) {
          return [];
        }
      })();
      if (cart.length === 0) {
        if (window.showMainToast) window.showMainToast('Keranjang belanjaanmu masih kosong');
        return;
      }
      let total = 0;
      let listText = '';
      cart.forEach((item, i) => {
        const itemSub = (item.price || 0) * (item.qty || 1);
        total += itemSub;
        listText += `${i + 1}. ${item.name} (${item.qty || 1}x) — Rp ${(itemSub).toLocaleString('id-ID')}\n   Kode: ${item.code || item.id} | Asal: ${item.daerah || 'Nusantara'}\n`;
      });
      const msg = `Halo Sanggar Pengrajin & Tim Kurasi Nusava,\n\nSaya ingin memesan karya kerajinan berikut melalui katalog resmi Nusava:\n\n${listText}\nTotal Estimasi: Rp ${total.toLocaleString('id-ID')}\n\nMohon informasi ketersediaan karya dan detail pengiriman adat berasuransi. Terima kasih.`;
      const phone = '6281238994411';
      const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    });
  }
});
