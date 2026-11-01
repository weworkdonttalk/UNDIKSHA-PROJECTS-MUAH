/* ============================================================
   NUSAVA — PUSAKA ADVENTURE  |  data.js
   Database artefak, tile config, & world map
   TECHTOPIA Vol. 2 · INTEGER#8 · Undiksha
   ============================================================ */

'use strict';

/* ── 1. Asset Manifest ──────────────────────────────────────
   Aset grafis utama (Platform & blok candi digambar secara prosedural kanvas tanpa blox_asset)
   ─────────────────────────────────────────────────────────── */
const GAME_BASE_PATH = (function() {
  if (typeof window !== 'undefined' && window.GAME_ASSETS_DIR) {
    return window.GAME_ASSETS_DIR;
  }
  return 'assets/game/';
})();

const ASSET_PATHS = {
  mascoot:   GAME_BASE_PATH + 'maskot-nusabot.png',
  textbox:   GAME_BASE_PATH + 'textbox-removebg-preview.png',
  keris:     GAME_BASE_PATH + 'keris-removebg-preview.png',
  guci:      GAME_BASE_PATH + 'guci-removebg-preview.png',
  kendang:   GAME_BASE_PATH + 'kendang-removebg-preview.png',
  angklung:  GAME_BASE_PATH + 'angklung-removebg-preview.png',
  kebaya:    GAME_BASE_PATH + 'kebaya-removebg-preview.png',
  kain_batik:GAME_BASE_PATH + 'kain_batik-removebg-preview.png',
  asbak:     GAME_BASE_PATH + 'asbak_bali-removebg-preview.png',
};

/* ── 2. Sprite Sheet Layout (mascoot-removebg-preview.png 669×373)
   Exact non-transparent bounding boxes for each character pose:
   Top row (baseline y=162):
     idle: 3 frames (cols 0-2)
     walk: 4 frames (cols 3-6)
   Bottom row (baseline y=350):
     jump: 2 frames (cols 0-1)
     fall: 1 frame  (col 2)
     interact: 3 frames (cols 4-6)
   ─────────────────────────────────────────────────────────── */
const SPRITE_FRAMES = {
  idle: [
    { sx: 30,  sy: 22, sw: 49, sh: 140 },
    { sx: 96,  sy: 42, sw: 50, sh: 120 },
    { sx: 163, sy: 42, sw: 51, sh: 120 },
  ],
  walk: [
    { sx: 309, sy: 22, sw: 76, sh: 140 },
    { sx: 396, sy: 46, sw: 74, sh: 116 },
    { sx: 485, sy: 47, sw: 66, sh: 115 },
    { sx: 566, sy: 48, sw: 70, sh: 114 },
  ],
  jump: [
    { sx: 30,  sy: 198, sw: 63, sh: 152 },
    { sx: 94,  sy: 198, sw: 68, sh: 142 },
  ],
  fall: [
    { sx: 167, sy: 192, sw: 55, sh: 127 },
  ],
  interact: [
    { sx: 387, sy: 198, sw: 93, sh: 152 },
    { sx: 481, sy: 198, sw: 71, sh: 152 },
    { sx: 569, sy: 243, sw: 74, sh: 107 },
  ],
};

const SPRITE = {
  sheetW: 669,
  sheetH: 373,
  // Animation speed in ticks (at 60fps unit)
  idle:     { frames: 3, fps: 11 },
  walk:     { frames: 4, fps: 7  },
  jump:     { frames: 2, fps: 10 },
  fall:     { frames: 1, fps: 10 },
  interact: { frames: 3, fps: 9  },
};

/* ── 3. Artifact Database ───────────────────────────────────── */
const ARTIFACTS = [
  {
    id:          'keris',
    assetKey:    'keris',
    name:        'Keris Pamor Luk-9',
    category:    'Warisan Pusaka Senjata',
    origin:      'Kerajaan Majapahit, Jawa',
    accentColor: '#9b72cf',
    worldX:      420,
    worldY:      262,
    // Dialog lines shown in the textbox (split for readability in-game)
    dialog: [
      'Keris Luk-9 — pusaka tertinggi dalam tradisi perkerisan Jawa.',
      'Bilah berkeluk SEMBILAN mencerminkan Wali Sanga. Pamor-nya',
      'dihasilkan dari pelipatan baja meteorit ribuan kali oleh sang empu.',
      'UNESCO mengakui keris sebagai Warisan Budaya Takbenda (2005).',
    ],
    description:
      'Keris berpamor Luk-9 adalah pusaka tertinggi dalam tradisi perkerisan Jawa. ' +
      'Bilah yang berkeluk sembilan kali melambangkan Wali Sanga — sembilan wali ' +
      'penyebar Islam di Nusantara. Pamor dihasilkan dari pelipatan baja meteorit ' +
      'dan besi bumi ribuan kali, mencerminkan kesabaran sang empu.',
    lore:
      'UNESCO mengakui keris sebagai Warisan Budaya Takbenda pada 2005. ' +
      'Di keraton, keris dirawat layaknya leluhur — diberi kembang tujuh rupa setiap Jumat Kliwon.',
    quiz: {
      question: 'Berapa jumlah lekukan bilah pada Keris Luk-9?',
      options: ['9 lekukan — melambangkan Wali Sanga', '7 lekukan', '5 lekukan', '11 lekukan'],
      correct: 0,
      xp: 75,
    },
    discovered: false,
  },
  {
    id:          'guci',
    assetKey:    'guci',
    name:        'Guci Gerabah Majapahit',
    category:    'Kriya Gerabah & UMKM Lokal',
    origin:      'Plered, Purwakarta / Bayat, Klaten',
    accentColor: '#C2593F',
    worldX:      780,
    worldY:      262,
    dialog: [
      'Guci terakota motif spiral — produk kriya UMKM unggulan Indonesia.',
      'Dibuat dari tanah liat pilihan, dipilin tangan, dibakar 8–12 jam.',
      'Motif spiral mencerminkan siklus kehidupan tanpa akhir dalam',
      'kosmologi Nusantara kuno — dari tanah kembali ke tanah.',
    ],
    description:
      'Guci terakota motif spiral merupakan produk kriya unggulan sentra gerabah lokal. ' +
      'Dibuat dari tanah liat pilihan yang dipilin tangan atau roda putar, lalu dibakar ' +
      'dalam tungku tradisional 8–12 jam. Motif spiral mencerminkan siklus kehidupan tanpa akhir.',
    lore:
      'Gerabah Bayat diwariskan sejak era Mataram Islam. Para pengrajin UMKM kini ' +
      'mengekspor karya ke lebih dari 30 negara, membuktikan estetika lokal mampu bersaing global.',
    quiz: {
      question: 'Motif spiral pada guci Nusantara melambangkan...',
      options: [
        'Siklus kehidupan tanpa akhir',
        'Jalur perdagangan laut',
        'Peta bintang astronomi kuno',
        'Aliran Sungai Bengawan Solo',
      ],
      correct: 0,
      xp: 60,
    },
    discovered: false,
  },
  {
    id:          'kendang',
    assetKey:    'kendang',
    name:        'Kendang Batangan Sunda',
    category:    'Warisan Budaya Takbenda',
    origin:      'Jawa Barat (Sunda)',
    accentColor: '#D4AF37',
    worldX:      1150,
    worldY:      262,
    dialog: [
      'Kendang Batangan — drum tradisional Sunda dari kayu nangka.',
      'Kulit binatang direntangkan di kedua sisi menghasilkan dentam dalam.',
      'Dalam gamelan Sunda, kendang adalah "jantung irama" — pemimpin',
      'tempo dan dinamika seluruh ansambel. Penabuh ulung = pang-ibing.',
    ],
    description:
      'Kendang Batangan adalah drum tradisional Sunda dari kayu nangka atau mahoni tua. ' +
      'Kulit binatang di kedua sisi menghasilkan suara berdentam dalam yang khas. ' +
      'Dalam gamelan Sunda, kendang adalah jantung irama — pemimpin tempo ansambel.',
    lore:
      'Para pengrajin di Bandung mempertahankan teknik pemasangan kulit secara tradisional ' +
      'tanpa paku — hanya tali rotan dan pengetahuan turun-temurun tentang tegangan kulit.',
    quiz: {
      question: 'Dalam gamelan Sunda, kendang disebut sebagai...',
      options: [
        '"Jantung irama" — pemimpin tempo',
        'Instrumen melodi utama',
        'Pengiring vokal sinden',
        'Penanda pembuka upacara',
      ],
      correct: 0,
      xp: 60,
    },
    discovered: false,
  },
  {
    id:          'angklung',
    assetKey:    'angklung',
    name:        'Angklung Bambu UNESCO',
    category:    'Warisan Budaya Takbenda Dunia',
    origin:      'Jawa Barat (Sunda)',
    accentColor: '#7C8A69',
    worldX:      1520,
    worldY:      262,
    dialog: [
      'Angklung — instrumen multitonal dari tabung bambu pilihan Sunda.',
      'Setiap angklung hanya menghasilkan SATU nada saat digoyangkan.',
      'Memerlukan kerja sama berkelompok → nilai luhur gotong royong.',
      'UNESCO mengakui Angklung sebagai Warisan Budaya Takbenda (2010).',
    ],
    description:
      'Angklung adalah instrumen musik multitonal dari tabung bambu yang dipotong rapi ' +
      'untuk menghasilkan resonansi nada saat digoyangkan. Setiap angklung hanya menghasilkan ' +
      'satu nada, sehingga memerlukan kerja sama berkelompok untuk memainkan melodi utuh.',
    lore:
      'Saung Angklung Udjo di Bandung adalah pusat pelestarian angklung terbesar di dunia, ' +
      'menerima ribuan wisatawan setiap bulan untuk belajar bermain angklung bersama.',
    quiz: {
      question: 'Mengapa angklung memerlukan banyak orang untuk dimainkan?',
      options: [
        'Karena setiap angklung hanya menghasilkan satu nada',
        'Karena angklung sangat berat dan besar',
        'Karena tradisi larangan memainkannya sendiri',
        'Karena memerlukan dua tangan untuk setiap nada',
      ],
      correct: 0,
      xp: 75,
    },
    discovered: false,
  },
  {
    id:          'kebaya',
    assetKey:    'kebaya',
    name:        'Kebaya Bali Agung',
    category:    'Warisan Seni & Busana Adat',
    origin:      'Bali & Jawa Tengah',
    accentColor: '#8B1D3B',
    worldX:      1960,
    worldY:      262,
    dialog: [
      'Kebaya Bali Agung — busana adat resmi perempuan Bali.',
      'Berwarna merah marun dengan bordir emas (prada) yang rumit.',
      'Dipadukan kain batik atau tenun gringsing sebagai rok.',
      'UNESCO menetapkan Kebaya sebagai Warisan Budaya Takbenda (2023).',
    ],
    description:
      'Kebaya Bali Agung adalah busana adat resmi perempuan Bali, biasanya merah marun ' +
      'dengan bordir emas (prada) pada kerah dan lengan. Dipadukan kain batik atau tenun ' +
      'gringsing yang mencerminkan hubungan spiritual dengan alam semesta.',
    lore:
      'Dalam upacara Piodalan di pura, seluruh perempuan wajib mengenakan kebaya — ' +
      'bukan sekadar busana, melainkan identitas spiritual. UNESCO akui 2023.',
    quiz: {
      question: 'Bordir emas pada tepi kebaya Bali disebut...',
      options: ['Prada', 'Songket', 'Jumputan', 'Lurik'],
      correct: 0,
      xp: 60,
    },
    discovered: false,
  },
  {
    id:          'asbak',
    assetKey:    'asbak',
    name:        'Asbak Ukir Paras Bali',
    category:    'Ekonomi Kreatif & Kriya UMKM',
    origin:      'Batubulan, Gianyar, Bali',
    accentColor: '#6B8F71',
    worldX:      2400,
    worldY:      262,
    dialog: [
      'Asbak Ukir Paras — karya seni kriya pemahat lokal Bali.',
      'Terbuat dari batu paras alami atau kayu sonokeling.',
      'Dihiasi relief wajah Kala atau dedaunan Patra Punggel.',
      'Menggambarkan ketekunan UMKM dalam menyulap perkakas jadi seni.',
    ],
    description:
      'Karya seni kriya pemahat lokal Bali yang memanfaatkan batu paras alami atau kayu sonokeling. ' +
      'Dihiasi ornamen relief wajah Kala atau dedaunan Patra Punggel. Menggambarkan ketekunan ' +
      'kriya tangan UMKM dalam menyulap perkakas sehari-hari menjadi komoditas bernilai tinggi.',
    lore:
      'Desa Batubulan, Gianyar merupakan sentra seni pahat batu paras terbesar di Bali. ' +
      'Produk UMKM dari desa ini diekspor ke Eropa, Amerika, dan Australia.',
    quiz: {
      question: 'Sentra seni pahat batu paras terbesar di Bali terdapat di...',
      options: [
        'Desa Batubulan, Gianyar',
        'Kuta Selatan',
        'Nusa Penida',
        'Ubud Kaja',
      ],
      correct: 0,
      xp: 60,
    },
    discovered: false,
  },
  {
    id:          'kain_batik',
    assetKey:    'kain_batik',
    name:        'Kain Batik Mega Mendung',
    category:    'Warisan Seni & Tekstil Luhur',
    origin:      'Cirebon, Jawa Barat',
    accentColor: '#1A4D8F',
    worldX:      2750,
    worldY:      262,
    dialog: [
      'Batik Mega Mendung — motif awan berlapis khas pesisir Cirebon.',
      'Terinspirasi dari langit dramatik pantai utara Jawa abad ke-15.',
      'Perpaduan Islam, Hindu-Buddha & pengaruh Tiongkok yang harmonis.',
      'UNESCO akui Batik Indonesia sebagai Warisan Budaya Takbenda (2009).',
    ],
    description:
      'Batik Mega Mendung berasal dari Cirebon, terinspirasi langit berawan di pesisir utara Jawa. ' +
      'Motif awan berlapis dipengaruhi budaya Tiongkok via pelabuhan Cirebon abad ke-15. ' +
      'Perpaduan Islam, Hindu-Buddha, dan Tiongkok menjadikannya unik di antara semua motif batik.',
    lore:
      'Batik tulis Mega Mendung sejati memerlukan berminggu-minggu pembuatan. ' +
      'Gradasi 5–9 tingkat warnanya dihasilkan dari pencelupan berulang dalam pewarna alami. ' +
      'UNESCO akui Batik Indonesia pada 2009.',
    quiz: {
      question: 'Batik Mega Mendung dari Cirebon merupakan perpaduan budaya...',
      options: [
        'Islam, Hindu-Buddha, dan Tiongkok',
        'Arab, India, dan Eropa',
        'Jawa, Sunda, dan Bali',
        'Melayu, Bugis, dan Makassar',
      ],
      correct: 0,
      xp: 75,
    },
    discovered: false,
  },
];

/* ── 5. World Config & Multi-Level Adventure Architecture ───── */
const WORLD_CONFIG = {
  width:      4400,
  gravity:    0.45,
  playerSpeed: 3.6,
  jumpForce:  -9.5,
};

const LEVEL_DATA = {
  1: {
    id: 1,
    name: 'Candi Lembah Jawa & Sunda',
    badge: 'BABAK 1/3',
    subtitle: 'Selamatkan 3 Mahakarya Tanah Jawa & Terobos Reruntuhan Kuno',
    worldWidth: 4400,
    goalX: 4180,
    sky: {
      top: '#C8956C',
      mid1: '#E8C99A',
      mid2: '#F5EFDC',
      bottom: '#DDD0BC',
      sun: 'rgba(255,230,160,0.95)'
    },
    artifacts: ['keris', 'guci', 'kendang'],
    artifactPositions: {
      keris:   { x: 860,  y: 262 },
      guci:    { x: 2020, y: 262 },
      kendang: { x: 3340, y: 262 },
    },
    platforms: [
      // Ground
      { x: 0,    y: 312, w: 4400, h: 48, type: 'ground' },
      // Zone 1: Keris Pamor Luk-9 (Staircase Stone tiers)
      { x: 260,  y: 264, w: 96,  h: 24, type: 'stone' },
      { x: 380,  y: 216, w: 96,  h: 24, type: 'stone' },
      { x: 500,  y: 168, w: 120, h: 24, type: 'stone' },
      { x: 680,  y: 228, w: 96,  h: 24, type: 'stone' },
      { x: 800,  y: 264, w: 120, h: 24, type: 'stone' },
      // Zone 2: Guci Majapahit (Majapahit terracotta bridges)
      { x: 1200, y: 252, w: 120, h: 24, type: 'brick' },
      { x: 1380, y: 204, w: 96,  h: 24, type: 'brick' },
      { x: 1540, y: 156, w: 144, h: 24, type: 'brick' },
      { x: 1740, y: 204, w: 120, h: 24, type: 'brick' },
      { x: 1960, y: 252, w: 120, h: 24, type: 'brick' },
      // Zone 3: Kendang Batangan Sunda (High temple ramparts)
      { x: 2400, y: 252, w: 120, h: 24, type: 'stone' },
      { x: 2580, y: 204, w: 96,  h: 24, type: 'stone' },
      { x: 2740, y: 156, w: 144, h: 24, type: 'stone' },
      { x: 2940, y: 204, w: 120, h: 24, type: 'stone' },
      { x: 3280, y: 252, w: 120, h: 24, type: 'stone' },
      // Final Altar Approach
      { x: 3700, y: 252, w: 120, h: 24, type: 'stone' },
      { x: 3900, y: 204, w: 120, h: 24, type: 'stone' },
    ],
    hazards: [
      { x: 640,  y: 300, w: 60, h: 12, type: 'spikes' },
      { x: 1100, y: 300, w: 60, h: 12, type: 'spikes' },
      { x: 1750, y: 300, w: 60, h: 12, type: 'spikes' },
      { x: 2320, y: 300, w: 60, h: 12, type: 'spikes' },
      { x: 3000, y: 300, w: 60, h: 12, type: 'spikes' },
      { x: 3600, y: 300, w: 72, h: 12, type: 'spikes' },
    ],
    enemies: [
      { id: 's1_1',  x: 350,  y: 288, minX: 280,  maxX: 560,  speed: 0.95, variant: 1 },
      { id: 's1_2',  x: 520,  y: 144, minX: 500,  maxX: 610,  speed: 0.85, variant: 1 },
      { id: 's1_3',  x: 820,  y: 288, minX: 740,  maxX: 1020, speed: 1.05, variant: 1 },
      { id: 's1_4',  x: 1220, y: 288, minX: 1180, maxX: 1420, speed: 1.00, variant: 1 },
      { id: 's1_5',  x: 1560, y: 132, minX: 1540, maxX: 1670, speed: 0.90, variant: 1 },
      { id: 's1_6',  x: 1760, y: 180, minX: 1740, maxX: 1850, speed: 1.10, variant: 1 },
      { id: 's1_7',  x: 1900, y: 288, minX: 1830, maxX: 2150, speed: 1.15, variant: 1 },
      { id: 's1_8',  x: 2180, y: 288, minX: 2140, maxX: 2300, speed: 1.05, variant: 1 },
      { id: 's1_9',  x: 2420, y: 288, minX: 2400, maxX: 2600, speed: 1.10, variant: 1 },
      { id: 's1_10', x: 2760, y: 132, minX: 2740, maxX: 2870, speed: 0.95, variant: 1 },
      { id: 's1_11', x: 3120, y: 288, minX: 3080, maxX: 3350, speed: 1.20, variant: 1 },
      { id: 's1_12', x: 3300, y: 228, minX: 3280, maxX: 3390, speed: 1.15, variant: 1 },
      { id: 's1_13', x: 3720, y: 288, minX: 3690, maxX: 3950, speed: 1.25, variant: 1 },
      { id: 's1_14', x: 4000, y: 288, minX: 3960, maxX: 4120, speed: 1.30, variant: 1 },
    ],
    mysteryBlocks: [
      { id: 'mb1_1', x: 300,  y: 216, reward: 50 },
      { id: 'mb1_2', x: 1480, y: 156, reward: 75 },
      { id: 'mb1_3', x: 2700, y: 156, reward: 75 },
      { id: 'mb1_4', x: 3800, y: 156, reward: 100 },
    ]
  },
  2: {
    id: 2,
    name: 'Dataran Tinggi Pasundan & Pura Dewata',
    badge: 'BABAK 2/3',
    subtitle: 'Temukan Suara Angklung Bambu & Busana Suci Para Leluhur',
    worldWidth: 4600,
    goalX: 4380,
    sky: {
      top: '#7B241C',
      mid1: '#BA4A00',
      mid2: '#E59866',
      bottom: '#FADBD8',
      sun: 'rgba(255,170,80,0.92)'
    },
    artifacts: ['angklung', 'kebaya', 'asbak'],
    artifactPositions: {
      angklung: { x: 920,  y: 262 },
      kebaya:   { x: 2200, y: 262 },
      asbak:    { x: 3500, y: 262 },
    },
    platforms: [
      // Ground
      { x: 0,    y: 312, w: 4600, h: 48, type: 'ground' },
      // Zone 1: Angklung (Bamboo terraces)
      { x: 280,  y: 252, w: 96,  h: 24, type: 'brick' },
      { x: 440,  y: 204, w: 120, h: 24, type: 'brick' },
      { x: 620,  y: 156, w: 144, h: 24, type: 'brick' },
      { x: 860,  y: 240, w: 144, h: 24, type: 'brick' },
      // Zone 2: Kebaya Bali Agung (Royal Stone Tiers)
      { x: 1300, y: 252, w: 120, h: 24, type: 'stone' },
      { x: 1500, y: 204, w: 120, h: 24, type: 'stone' },
      { x: 1720, y: 156, w: 168, h: 24, type: 'stone' },
      { x: 1960, y: 204, w: 120, h: 24, type: 'stone' },
      { x: 2140, y: 252, w: 144, h: 24, type: 'stone' },
      // Zone 3: Asbak Paras Batubulan (Carved Stone Platforms)
      { x: 2550, y: 252, w: 120, h: 24, type: 'brick' },
      { x: 2750, y: 204, w: 120, h: 24, type: 'brick' },
      { x: 2980, y: 156, w: 144, h: 24, type: 'brick' },
      { x: 3200, y: 204, w: 120, h: 24, type: 'brick' },
      { x: 3440, y: 252, w: 144, h: 24, type: 'brick' },
      // Altar Approach
      { x: 3900, y: 252, w: 144, h: 24, type: 'stone' },
      { x: 4120, y: 204, w: 144, h: 24, type: 'stone' },
    ],
    hazards: [
      { x: 780,  y: 300, w: 72, h: 12, type: 'spikes' },
      { x: 1250, y: 300, w: 60, h: 12, type: 'spikes' },
      { x: 2000, y: 300, w: 72, h: 12, type: 'spikes' },
      { x: 2500, y: 300, w: 60, h: 12, type: 'spikes' },
      { x: 3300, y: 300, w: 72, h: 12, type: 'spikes' },
      { x: 3800, y: 300, w: 72, h: 12, type: 'spikes' },
    ],
    enemies: [
      { id: 's2_1',  x: 350,  y: 288, minX: 250,  maxX: 500,  speed: 1.15, variant: 2 },
      { id: 's2_2',  x: 640,  y: 132, minX: 620,  maxX: 750,  speed: 1.10, variant: 2 },
      { id: 's2_3',  x: 680,  y: 288, minX: 580,  maxX: 760,  speed: 1.25, variant: 2 },
      { id: 's2_4',  x: 1050, y: 288, minX: 960,  maxX: 1220, speed: 1.20, variant: 2 },
      { id: 's2_5',  x: 1320, y: 228, minX: 1300, maxX: 1410, speed: 1.15, variant: 2 },
      { id: 's2_6',  x: 1460, y: 288, minX: 1360, maxX: 1650, speed: 1.30, variant: 2 },
      { id: 's2_7',  x: 1740, y: 132, minX: 1720, maxX: 1870, speed: 1.20, variant: 2 },
      { id: 's2_8',  x: 1850, y: 288, minX: 1760, maxX: 1980, speed: 1.35, variant: 2 },
      { id: 's2_9',  x: 2250, y: 288, minX: 2150, maxX: 2450, speed: 1.25, variant: 2 },
      { id: 's2_10', x: 2570, y: 228, minX: 2550, maxX: 2660, speed: 1.20, variant: 2 },
      { id: 's2_11', x: 3000, y: 132, minX: 2980, maxX: 3110, speed: 1.25, variant: 2 },
      { id: 's2_12', x: 3150, y: 288, minX: 3050, maxX: 3280, speed: 1.40, variant: 2 },
      { id: 's2_13', x: 3500, y: 288, minX: 3420, maxX: 3750, speed: 1.35, variant: 2 },
      { id: 's2_14', x: 3920, y: 228, minX: 3900, maxX: 4030, speed: 1.30, variant: 2 },
      { id: 's2_15', x: 4140, y: 180, minX: 4120, maxX: 4250, speed: 1.40, variant: 2 },
      { id: 's2_16', x: 4280, y: 288, minX: 4200, maxX: 4360, speed: 1.55, variant: 2 },
    ],
    mysteryBlocks: [
      { id: 'mb2_1', x: 360,  y: 156, reward: 75 },
      { id: 'mb2_2', x: 1600, y: 132, reward: 100 },
      { id: 'mb2_3', x: 2900, y: 132, reward: 100 },
      { id: 'mb2_4', x: 4000, y: 156, reward: 125 },
    ]
  },
  3: {
    id: 3,
    name: 'Pesisir Megamendung & Gerbang Samudra',
    badge: 'BABAK 3/3',
    subtitle: 'Mahakarya Pamungkas Tekstil Pesisir & Gelar Penjaga Pusaka',
    worldWidth: 4800,
    goalX: 4580,
    sky: {
      top: '#14213D',
      mid1: '#1F3A60',
      mid2: '#4A6B82',
      bottom: '#C5A059',
      sun: 'rgba(235,190,120,0.92)'
    },
    artifacts: ['kain_batik'],
    artifactPositions: {
      kain_batik: { x: 2300, y: 262 },
    },
    platforms: [
      // Ground
      { x: 0,    y: 312, w: 4800, h: 48, type: 'ground' },
      // Section 1: Pesisir Laut & Teras Karang
      { x: 300,  y: 252, w: 120, h: 24, type: 'stone' },
      { x: 500,  y: 204, w: 144, h: 24, type: 'stone' },
      { x: 740,  y: 156, w: 168, h: 24, type: 'stone' },
      { x: 1000, y: 204, w: 144, h: 24, type: 'brick' },
      { x: 1260, y: 252, w: 120, h: 24, type: 'brick' },
      // Section 2: Teras Awan Menuju Batik Mega Mendung
      { x: 1500, y: 204, w: 144, h: 24, type: 'stone' },
      { x: 1800, y: 156, w: 192, h: 24, type: 'stone' },
      { x: 2200, y: 204, w: 192, h: 24, type: 'stone' },
      // Section 3: Jalur Candi Samudra Menuju Altar Agung Kemenangan
      { x: 2750, y: 252, w: 144, h: 24, type: 'brick' },
      { x: 3050, y: 204, w: 168, h: 24, type: 'brick' },
      { x: 3400, y: 156, w: 192, h: 24, type: 'stone' },
      { x: 3800, y: 204, w: 168, h: 24, type: 'stone' },
      { x: 4180, y: 252, w: 192, h: 24, type: 'stone' },
      { x: 4420, y: 204, w: 144, h: 24, type: 'stone' },
    ],
    hazards: [
      { x: 880,  y: 300, w: 84, h: 12, type: 'spikes' },
      { x: 1400, y: 300, w: 72, h: 12, type: 'spikes' },
      { x: 2050, y: 300, w: 84, h: 12, type: 'spikes' },
      { x: 2600, y: 300, w: 72, h: 12, type: 'spikes' },
      { x: 3250, y: 300, w: 84, h: 12, type: 'spikes' },
      { x: 4050, y: 300, w: 84, h: 12, type: 'spikes' },
    ],
    enemies: [
      { id: 's3_1',  x: 400,  y: 288, minX: 300,  maxX: 600,  speed: 1.35, variant: 3 },
      { id: 's3_2',  x: 760,  y: 132, minX: 740,  maxX: 890,  speed: 1.25, variant: 3 },
      { id: 's3_3',  x: 780,  y: 288, minX: 680,  maxX: 860,  speed: 1.45, variant: 3 },
      { id: 's3_4',  x: 1100, y: 288, minX: 1000, maxX: 1240, speed: 1.40, variant: 3 },
      { id: 's3_5',  x: 1280, y: 228, minX: 1260, maxX: 1370, speed: 1.30, variant: 3 },
      { id: 's3_6',  x: 1600, y: 288, minX: 1500, maxX: 1760, speed: 1.50, variant: 3 },
      { id: 's3_7',  x: 1820, y: 132, minX: 1800, maxX: 1970, speed: 1.40, variant: 3 },
      { id: 's3_8',  x: 2220, y: 180, minX: 2200, maxX: 2380, speed: 1.50, variant: 3 },
      { id: 's3_9',  x: 2300, y: 288, minX: 2180, maxX: 2450, speed: 1.60, variant: 3 },
      { id: 's3_10', x: 2520, y: 288, minX: 2460, maxX: 2580, speed: 1.65, variant: 3 },
      { id: 's3_11', x: 2770, y: 228, minX: 2750, maxX: 2880, speed: 1.40, variant: 3 },
      { id: 's3_12', x: 2880, y: 288, minX: 2720, maxX: 3100, speed: 1.55, variant: 3 },
      { id: 's3_13', x: 3420, y: 132, minX: 3400, maxX: 3580, speed: 1.45, variant: 3 },
      { id: 's3_14', x: 3600, y: 288, minX: 3450, maxX: 3750, speed: 1.70, variant: 3 },
      { id: 's3_15', x: 3900, y: 288, minX: 3820, maxX: 4020, speed: 1.65, variant: 3 },
      { id: 's3_16', x: 4200, y: 228, minX: 4180, maxX: 4360, speed: 1.50, variant: 3 },
      { id: 's3_17', x: 4440, y: 180, minX: 4420, maxX: 4550, speed: 1.60, variant: 3 },
      { id: 's3_18', x: 4480, y: 288, minX: 4380, maxX: 4560, speed: 1.85, variant: 3 },
    ],
    mysteryBlocks: [
      { id: 'mb3_1', x: 400,  y: 156, reward: 100 },
      { id: 'mb3_2', x: 1850, y: 132, reward: 125 },
      { id: 'mb3_3', x: 3450, y: 132, reward: 150 },
      { id: 'mb3_4', x: 4300, y: 156, reward: 200 },
    ]
  }
};

let PLATFORMS = LEVEL_DATA[1].platforms;
let HAZARDS = LEVEL_DATA[1].hazards;
let ENEMIES = LEVEL_DATA[1].enemies;
let MYSTERY_BLOCKS = LEVEL_DATA[1].mysteryBlocks;
const PROPS = [];
