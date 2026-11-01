/**
 * NUSAVA — STUDIO PENGRAJIN & MAESTRO (WARM HERITAGE BENTO STUDIO)
 * Pure Vanilla JavaScript (ES6+) Implementation
 * 
 * Features:
 * 1. Reactive State Management with LocalStorage persistence
 * 2. Custom Interactive SVG Bezier Curve Analytics Chart with Hover Tooltip
 * 3. Custom SVG Sparklines Engine for KPI Bento Cards
 * 4. Dual View Switcher (Detailed Table View vs Bento Grid Gallery)
 * 5. Interactive Slide-Over Drawer with Official WBTb Certificate & Quick Edit
 * 6. Keyboard-First Command Palette (Ctrl+K) with Fuzzy Search
 * 7. Interactive Kriya AI Assistant Modal with Heritage Prompt Chips
 * 8. Notification Popover with Live Artisan Feed
 * 9. Add & Edit Product Modals with Validation
 * 10. Instant CSV Data Exporter & Mobile Responsive Sidebar
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =========================================================================
  // 0. ROLE-BASED ACCESS CONTROL (RBAC) GUARD
  // Kolektor / Pembeli / Tamu TIDAK BISA membuka Dashboard.
  // Fitur Dashboard (Laporan Penjualan, Manajemen Stok) HANYA untuk Mitra Pengrajin / Penjual.
  // =========================================================================
  const authUser = (function () {
    try {
      const raw = localStorage.getItem('nusava_auth');
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  })();

  const isArtisan = authUser && (authUser.role === 'pengrajin' || authUser.role === 'artisan');

  if (!isArtisan) {
    // Tampilkan layar proteksi akses khusus pengrajin
    document.title = 'Akses Dibatasi — Khusus Mitra Pengrajin · Nusava';
    document.body.innerHTML = `
      <div class="fixed inset-0 z-[99999] bg-[#F5EFE6] flex items-center justify-center p-6 text-[#241B16] font-sans selection:bg-[#C5A059] selection:text-[#241B16]">
        <div class="max-w-md w-full bg-[#FAF7F2] border border-[#EDE4D5] rounded-3xl p-8 sm:p-10 shadow-2xl text-center relative overflow-hidden">
          <!-- Top Accent Ribbon -->
          <div class="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#963D06] via-[#C5A059] to-[#963D06]"></div>

          <!-- Shield Lock Icon -->
          <div class="w-20 h-20 mx-auto mb-5 rounded-2xl bg-[#241B16] border border-[#C5A059]/40 flex items-center justify-center shadow-lg text-[#C5A059]">
            <svg class="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.6" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>

          <!-- Badge -->
          <span class="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[10px] font-bold tracking-[0.16em] uppercase bg-[#963D06]/10 text-[#963D06] border border-[#963D06]/25 mb-3">
            Akses Dibatasi · Khusus Penjual
          </span>

          <h2 class="font-display font-bold text-2xl sm:text-3xl text-[#2B231D] mb-3 leading-snug">
            Fitur Khusus Mitra Pengrajin
          </h2>

          <p class="text-xs sm:text-sm text-[#6B5E55] leading-relaxed mb-6">
            ${authUser ? `
              Halo, <strong class="text-[#2B231D] font-bold">${authUser.name}</strong>. Akun Anda saat ini terdaftar sebagai <span class="text-[#963D06] font-semibold">Kolektor Budaya / Pembeli</span>. Fitur ringkasan toko, manajemen stok karya, dan lacak ekspedisi logistik ini eksklusif bagi Mitra Pengrajin Maestro & Penjual resmi.
            ` : `
              Halaman ini merupakan portal internal manajemen toko yang hanya dapat diakses oleh akun <strong class="text-[#2B231D]">Mitra Pengrajin & Penjual</strong> resmi Nusava.
            `}
          </p>

          <div class="flex flex-col gap-3">
            <a href="marketplace.html" class="w-full py-3 px-6 rounded-full bg-[#241B16] hover:bg-[#C5A059] text-white text-xs font-bold tracking-wider uppercase transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
              <span>Jelajahi Koleksi Budaya</span>
            </a>

            <a href="profile.html" class="w-full py-3 px-6 rounded-full bg-[#EDE4D5]/70 hover:bg-[#EDE4D5] text-[#2B231D] text-xs font-bold tracking-wider uppercase transition-all border border-[#C5A059]/40 flex items-center justify-center gap-2 cursor-pointer">
              <svg class="w-4 h-4 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
              <span>Buka Profil Akun Saya</span>
            </a>

            <button type="button" id="btn-demo-switch-artisan" class="mt-2 text-xs text-[#963D06] hover:text-[#2B231D] underline underline-offset-4 transition-colors font-medium cursor-pointer">
              Coba Fitur Penjual: Masuk Demo Pengrajin (I Wayan Sukadana) →
            </button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('btn-demo-switch-artisan')?.addEventListener('click', () => {
      const demoArtisan = {
        role: 'pengrajin',
        name: 'I Wayan Sukadana',
        studio: 'Bengkel Karya Ukir Sukadana',
        region: 'Gianyar, Bali',
        title: 'Maestro Seni Ukir Tradisional',
        email: 'wayan.sukadana@nusava.id',
        phone: '081234567890',
        address: 'Banjar Celuk No. 88, Sukawati, Gianyar, Bali 80582',
        verified: true,
        loggedInAt: new Date().toISOString()
      };
      localStorage.setItem('nusava_auth', JSON.stringify(demoArtisan));
      window.location.reload();
    });

    return; // STOP execution of the dashboard logic
  }

  // =========================================================================
  // 1. INITIAL STATE & CONSTANTS
  // =========================================================================
  const INITIAL_PRODUCTS = [
    {
      id: 'KRY-001',
      name: "Panel Pahat Pa'tedong Tongkonan",
      category: 'Kayu',
      origin: 'Kete Kesu, Tana Toraja',
      price: 4250000,
      stock: 4,
      status: 'Terkurasi WBTb',
      sold: 18,
      wbtbReg: 'WBTb-2024-TRJ-0041',
      curator: 'Prof. Dr. I Made Bandem (Dewan Kurator)',
      verifiedDate: '14 Agustus 2024',
      img: 'assets/images/content/wilayah-sulawesi-tongkonan.jpg',
      desc: "Kayu ulin berukir motif kepala kerbau Pa'tedong simbol kemakmuran, martabat kaum bangsawan, dan kearifan filosofi leluhur Toraja."
    },
    {
      id: 'KRY-002',
      name: 'Perisai Talawang Motif Kamang Dayak',
      category: 'Kayu',
      origin: 'Hulu Sungai Mahakam, Kaltim',
      price: 2850000,
      stock: 6,
      status: 'Siap Kirim',
      sold: 12,
      wbtbReg: 'WBTb-2023-KT-0119',
      curator: 'Drs. Aloysius Reyaan (Kurator Kriya Kayu)',
      verifiedDate: '22 November 2023',
      img: 'assets/images/content/wilayah-kalimantan-talawang.jpg',
      desc: 'Pahat kayu besi ulin bertatahkan motif flora sulur dan satwa mitologi penangkal mara bahaya perang serta pelindung rumah panjang.'
    },
    {
      id: 'KRY-003',
      name: 'Tenun Ikat Pewarna Alami Sumba',
      category: 'Wastra',
      origin: 'Lambanapu, Sumba Timur',
      price: 3600000,
      stock: 2,
      status: 'Terkurasi WBTb',
      sold: 9,
      wbtbReg: 'WBTb-2022-NTT-0087',
      curator: 'Dra. Siti Rahayu (Kurator Tekstil Tradisional)',
      verifiedDate: '09 Mei 2022',
      img: 'assets/images/content/jurnal-tenun-lambanapu.jpg',
      desc: 'Ditenun tangan selama 8 bulan menggunakan 40 kali celupan daun nila dan akar mengkudu asli dengan motif kuda kambera lambang kepemimpinan.'
    },
    {
      id: 'KRY-004',
      name: 'Batik Tulis Nitik Kuno Imogiri',
      category: 'Wastra',
      origin: 'Giriloyo, DI Yogyakarta',
      price: 1950000,
      stock: 8,
      status: 'Terkurasi WBTb',
      sold: 27,
      wbtbReg: 'WBTb-2021-DIY-0012',
      curator: 'K.R.T. Hardjodipuro (Pakar Batik Keraton)',
      verifiedDate: '18 Oktober 2021',
      img: 'assets/images/content/jurnal-batik-giriloyo.jpg',
      desc: 'Canting cawang kuno motif tertua Mataram berstatus Indikasi Geografis resmi Kemendikbudristek dengan ketelitian titik geometri sakral.'
    },
    {
      id: 'KRY-005',
      name: 'Keris Jawa Ladrang Pamor Meteorit',
      category: 'Logam',
      origin: 'Surakarta, Jawa Tengah',
      price: 8500000,
      stock: 1,
      status: 'Terkurasi WBTb',
      sold: 3,
      wbtbReg: 'WBTb-UNESCO-ID-0001',
      curator: 'Empu Subandi Suwito (Master Tosan Aji)',
      verifiedDate: '05 Januari 2020',
      img: 'assets/images/content/jurnal-keris-jawa.jpg',
      desc: 'Tempaan ratusan lipatan besi, baja, dan titanium batu meteorit Prambanan dengan tirakat spiritual empu pengrajin keraton Solo.'
    },
    {
      id: 'KRY-006',
      name: 'Songket Lepus Emas Benang Perak',
      category: 'Wastra',
      origin: 'Palembang, Sumatera Selatan',
      price: 6200000,
      stock: 3,
      status: 'Siap Kirim',
      sold: 7,
      wbtbReg: 'WBTb-2023-SS-0045',
      curator: 'Ny. Hj. Zainal Songket (Pakar Tenun Sriwijaya)',
      verifiedDate: '11 Desember 2023',
      img: 'assets/images/content/produk-songket-palembang.jpg',
      desc: 'Ratu Segala Kain dengan helai pakan emas murni peninggalan kemegahan Kerajaan Sriwijaya, ditenun dengan alat gedogan tradisional.'
    },
    {
      id: 'KRY-007',
      name: 'Patung Figur Bisj Roh Leluhur Asmat',
      category: 'Kayu',
      origin: 'Agats, Papua Selatan',
      price: 5400000,
      stock: 2,
      status: 'Verifikasi Kurator',
      sold: 5,
      wbtbReg: 'WBTb-2026-PPA-INPROG',
      curator: 'Tim Kurasi Antropologi Seni Papua Kemendikbud',
      verifiedDate: 'Tahap Verifikasi Ahli (80%)',
      img: 'assets/images/content/wilayah-papua-asmat.jpg',
      desc: 'Dipahat langsung oleh Wow-ipits dari kayu bakau rawa liar sebagai penghormatan arwah leluhur suku Asmat penjaga hutan sagu.'
    },
    {
      id: 'KRY-008',
      name: 'Anyaman Kotak Ketak Rumput Liar',
      category: 'Anyaman',
      origin: 'Beleka, Lombok Tengah',
      price: 780000,
      stock: 15,
      status: 'Siap Kirim',
      sold: 44,
      wbtbReg: 'WBTb-2022-NTB-0033',
      curator: 'Lalu M. Sukiman (Pemerhati Kerajinan Sasak)',
      verifiedDate: '19 Juli 2022',
      img: 'assets/images/content/produk-ketak-lombok.jpg',
      desc: 'Anyaman serat paku hutan liar yang diawetkan lewat proses pengasapan tempurung kelapa berhari-hari menghasilkan rona cokelat keemasan abadi.'
    }
  ];

  // Load state from localStorage
  let products = [];
  try {
    const saved = localStorage.getItem('nusava_artisan_products');
    if (saved) {
      products = JSON.parse(saved);
      // Ensure all fields exist
      products = products.map((p, idx) => ({
        ...INITIAL_PRODUCTS[idx % INITIAL_PRODUCTS.length],
        ...p
      }));
    } else {
      products = [...INITIAL_PRODUCTS];
      localStorage.setItem('nusava_artisan_products', JSON.stringify(products));
    }
  } catch (err) {
    products = [...INITIAL_PRODUCTS];
  }

  // Sync User Profile (Avatar & Name) from Auth Storage
  try {
    const rawAuth = localStorage.getItem('nusava_auth');
    if (rawAuth) {
      const authUser = JSON.parse(rawAuth);
      if (authUser.name) {
        const nameEl = document.getElementById('user-display-name');
        if (nameEl) nameEl.textContent = authUser.name;
      }
      if (authUser.avatar) {
        const avEl = document.getElementById('dashboard-sidebar-avatar');
        if (avEl) avEl.src = authUser.avatar;
      }
    }
  } catch (_) {}

  // Active UI States
  let currentView = 'table'; // 'table' or 'grid'
  let currentPeriod = '6m';  // '6m', '1y', 'pameran'
  let activeSelectedProduct = null;
  let commandPaletteItems = [];
  let commandSelectedIndex = 0;

  // Formatting Utilities
  const formatRp = (val) => 'Rp ' + Number(val).toLocaleString('id-ID');

  // =========================================================================
  // 2. SVG ANALYTICS ENGINE (Pure Bezier Curves with Zero External Libraries)
  // =========================================================================
  const ANALYTICS_DATA = {
    '6m': {
      title: 'Grafik Penjualan 6 Bulan Terakhir',
      labels: ['Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt'],
      values: [31500000, 34200000, 38900000, 41200000, 44800000, 48290000],
      topSellers: ['Tenun Sumba', 'Perisai Dayak', 'Batik Giriloyo', 'Songket Palembang', 'Panel Toraja', 'Keris Pamor'],
      growth: ['+8%', '+9%', '+14%', '+6%', '+9%', '+12%']
    },
    '1y': {
      title: 'Grafik Penjualan 1 Tahun',
      labels: ['Nov', 'Des', 'Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt'],
      values: [18200000, 24500000, 22100000, 26800000, 29400000, 32000000, 31500000, 34200000, 38900000, 41200000, 44800000, 48290000],
      topSellers: ['Anyaman Ketak', 'Keris Jawa', 'Songket Emas', 'Tenun Sumba', 'Batik Giriloyo', 'Panel Pahat', 'Tenun Sumba', 'Perisai Dayak', 'Batik Giriloyo', 'Songket Palembang', 'Panel Toraja', 'Keris Pamor'],
      growth: ['+5%', '+35%', '-10%', '+21%', '+10%', '+9%', '-2%', '+9%', '+14%', '+6%', '+9%', '+12%']
    },
    'pameran': {
      title: 'Grafik Penjualan Tahun Ini',
      labels: ['Triwulan 1', 'Triwulan 2', 'Triwulan 3', 'Triwulan 4'],
      values: [11200000, 19400000, 32500000, 48290000],
      topSellers: ['Keris Meteorit KRY-005', 'Pesanan Tenun Sumba', 'Ukiran Panel Toraja', 'Anyaman Lombok'],
      growth: ['+15%', '+73%', '+67%', '+48%']
    }
  };

  function renderAnalyticsChart(periodKey = '1y') {
    const container = document.getElementById('analytics-chart-container');
    const tooltip = document.getElementById('chart-tooltip');
    if (!container) return;

    if (tooltip) {
      tooltip.classList.remove('visible');
      tooltip.style.opacity = '0';
      tooltip.style.visibility = 'hidden';
    }

    const data = ANALYTICS_DATA[periodKey] || ANALYTICS_DATA['1y'];
    if (!data) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 230;
    const paddingLeft = 55;
    const paddingRight = 30;
    const paddingTop = 25;
    const paddingBottom = 40;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    const minVal = Math.min(...data.values) * 0.85;
    const maxVal = Math.max(...data.values) * 1.1;

    // Coordinate mapping
    const points = data.values.map((v, i) => {
      const x = paddingLeft + (i / (data.values.length - 1)) * chartWidth;
      const y = paddingTop + chartHeight - ((v - minVal) / (maxVal - minVal)) * chartHeight;
      return { x, y, value: v, label: data.labels[i], topSeller: data.topSellers[i], growth: data.growth[i] };
    });

    // Build Smooth Cubic Bezier Spline
    let linePathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cx1 = p0.x + (p1.x - p0.x) * 0.45;
      const cy1 = p0.y;
      const cx2 = p0.x + (p1.x - p0.x) * 0.55;
      const cy2 = p1.y;
      linePathD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }

    const lastX = points[points.length - 1].x;
    const firstX = points[0].x;
    const bottomY = paddingTop + chartHeight;
    const areaPathD = `${linePathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

    // Horizontal Grid Lines
    const gridRows = 4;
    let gridLinesSvg = '';
    for (let r = 0; r <= gridRows; r++) {
      const gY = paddingTop + (chartHeight / gridRows) * r;
      const valAtGrid = maxVal - (r / gridRows) * (maxVal - minVal);
      const labelRp = (valAtGrid / 1000000).toFixed(0) + ' Jt';
      gridLinesSvg += `
        <line x1="${paddingLeft}" y1="${gY}" x2="${width - paddingRight}" y2="${gY}" class="chart-grid-line" />
        <text x="${paddingLeft - 8}" y="${gY + 3}" text-anchor="end" class="chart-axis-text">${labelRp}</text>
      `;
    }

    // X Axis Labels
    let xAxisSvg = '';
    points.forEach(p => {
      xAxisSvg += `
        <text x="${p.x}" y="${height - 12}" text-anchor="middle" class="chart-axis-text font-medium">${p.label}</text>
      `;
    });

    // Interactive Circles
    let pointsSvg = '';
    points.forEach((p, idx) => {
      pointsSvg += `
        <circle cx="${p.x}" cy="${p.y}" r="4.5" class="chart-point" data-idx="${idx}" />
      `;
    });

    // Full Vertical Hover Columns for effortless hover interaction
    let hoverColsSvg = '';
    const colW = chartWidth / Math.max(1, points.length - 1);
    points.forEach((p, idx) => {
      const colX = Math.max(0, p.x - colW / 2);
      hoverColsSvg += `
        <rect x="${colX}" y="0" width="${colW}" height="${height}" fill="transparent" class="cursor-pointer chart-hover-col" data-idx="${idx}" />
      `;
    });

    // SVG Construction
    const svgHtml = `
      <svg viewBox="0 0 ${width} ${height}" class="chart-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#C88A36" stop-opacity="0.25" />
            <stop offset="70%" stop-color="#C5A059" stop-opacity="0.05" />
            <stop offset="100%" stop-color="#F5EFE6" stop-opacity="0.0" />
          </linearGradient>
          <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#C88A36" flood-opacity="0.25" />
          </filter>
        </defs>
        ${gridLinesSvg}
        <path d="${areaPathD}" fill="url(#areaGradient)" class="chart-area-fill" />
        <path d="${linePathD}" class="chart-line-path" filter="url(#goldGlow)" />
        <line id="overview-hover-bar" x1="0" y1="${paddingTop}" x2="0" y2="${bottomY}" stroke="#C88A36" stroke-width="1.5" stroke-dasharray="3 3" opacity="0" pointer-events="none" />
        ${xAxisSvg}
        ${pointsSvg}
        ${hoverColsSvg}
      </svg>
    `;

    container.innerHTML = svgHtml;

    // Attach Hover Handlers
    const hoverCols = container.querySelectorAll('.chart-hover-col');
    const hoverBar = container.querySelector('#overview-hover-bar');
    const pointCircles = container.querySelectorAll('.chart-point');

    function showTooltip(idx) {
      const p = points[idx];
      if (!p || !tooltip) return;

      pointCircles.forEach(c => c.classList.remove('active'));
      pointCircles[idx]?.classList.add('active');

      if (hoverBar) {
        hoverBar.setAttribute('x1', p.x);
        hoverBar.setAttribute('x2', p.x);
        hoverBar.setAttribute('opacity', '0.75');
      }

      tooltip.innerHTML = `
        <div class="font-sans">
          <div class="flex items-center justify-between gap-3 mb-1">
            <span class="font-bold text-[#C5A059] text-[10px]">${p.label}</span>
            <span class="text-emerald-400 font-bold text-[10px] bg-emerald-950/60 px-1.5 py-0.2 rounded">${p.growth}</span>
          </div>
          <div class="text-sm font-bold text-[#F5EFE6] leading-none mb-1">${formatRp(p.value)}</div>
          <div class="text-[10px] text-gray-300">Paling banyak dibeli: <span class="text-[#C5A059] font-medium">${p.topSeller}</span></div>
        </div>
      `;

      tooltip.style.left = `${p.x}px`;
      tooltip.style.top = `${p.y - 12}px`;
      tooltip.style.opacity = '1';
      tooltip.style.visibility = 'visible';
      tooltip.classList.add('visible');
    }

    function hideTooltip() {
      pointCircles.forEach(c => c.classList.remove('active'));
      if (hoverBar) hoverBar.setAttribute('opacity', '0');
      if (tooltip) {
        tooltip.style.opacity = '0';
        tooltip.style.visibility = 'hidden';
        tooltip.classList.remove('visible');
      }
    }

    hoverCols.forEach(col => {
      col.addEventListener('mouseenter', () => {
        showTooltip(Number(col.dataset.idx));
      });
      col.addEventListener('mousemove', () => {
        showTooltip(Number(col.dataset.idx));
      });
      col.addEventListener('mouseleave', () => {
        hideTooltip();
      });
      col.addEventListener('touchstart', (e) => {
        showTooltip(Number(col.dataset.idx));
      }, { passive: true });
    });

    container.addEventListener('mouseleave', () => {
      hideTooltip();
    });
  }

  // Handle Resize for SVG Chart
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      renderAnalyticsChart(currentPeriod);
      if (typeof renderDetailedAnalyticsChart === 'function') {
        renderDetailedAnalyticsChart(currentDetailedPeriod);
      }
    }, 150);
  });

  // Period Switcher Buttons
  const periodBtns = document.querySelectorAll('.period-filter-btn');
  periodBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      periodBtns.forEach(b => {
        b.classList.remove('bg-[#241B16]', 'text-white', 'shadow-xs');
        b.classList.add('bg-transparent', 'text-gray-600', 'hover:bg-gray-100');
      });
      btn.classList.add('bg-[#241B16]', 'text-white', 'shadow-xs');
      btn.classList.remove('bg-transparent', 'text-gray-600', 'hover:bg-gray-100');

      currentPeriod = btn.dataset.period;
      renderAnalyticsChart(currentPeriod);
    });
  });

  // =========================================================================
  // 3. KPI SPARKLINE RENDERER
  // =========================================================================
  function renderKPISparklines() {
    // 1. Revenue Sparkline
    const revEl = document.getElementById('sparkline-revenue');
    if (revEl) {
      revEl.innerHTML = `
        <svg viewBox="0 0 100 24" class="sparkline-svg" preserveAspectRatio="none">
          <defs>
            <linearGradient id="goldGradientSpark" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="#C5A059" stop-opacity="0.4" />
              <stop offset="100%" stop-color="#C5A059" stop-opacity="0.0" />
            </linearGradient>
          </defs>
          <path d="M 0 18 Q 20 16 35 12 T 70 8 T 100 3 L 100 24 L 0 24 Z" class="sparkline-area" />
          <path d="M 0 18 Q 20 16 35 12 T 70 8 T 100 3" class="sparkline-path" />
          <circle cx="100" cy="3" r="2.5" fill="#C5A059" />
        </svg>
      `;
    }

    // 2. Products Mini Bar Sparkline
    const prodEl = document.getElementById('sparkline-products');
    if (prodEl) {
      prodEl.innerHTML = `
        <div class="flex items-end gap-1.5 h-6 w-full pt-1">
          <div class="h-3/5 flex-1 bg-[#C5A059]/30 rounded-xs hover:bg-[#C5A059] transition-colors" title="Kayu: 3 karya"></div>
          <div class="h-4/5 flex-1 bg-[#C5A059]/50 rounded-xs hover:bg-[#C5A059] transition-colors" title="Wastra: 3 karya"></div>
          <div class="h-2/5 flex-1 bg-[#C5A059]/30 rounded-xs hover:bg-[#C5A059] transition-colors" title="Logam: 1 karya"></div>
          <div class="h-full flex-1 bg-[#C5A059] rounded-xs" title="Anyaman: 1 karya"></div>
        </div>
      `;
    }

    // 3. Orders Circular / Mini Progress
    const ordEl = document.getElementById('sparkline-orders');
    if (ordEl) {
      ordEl.innerHTML = `
        <div class="w-full bg-[#EDE4D5] h-1.5 rounded-full overflow-hidden mt-1">
          <div class="bg-emerald-600 h-full rounded-full" style="width: 98.4%;"></div>
        </div>
      `;
    }

    // 4. Rating Trend Sparkline
    const repEl = document.getElementById('sparkline-rating');
    if (repEl) {
      repEl.innerHTML = `
        <svg viewBox="0 0 100 20" class="sparkline-svg" preserveAspectRatio="none">
          <path d="M 0 14 Q 25 12 50 8 T 100 4" fill="none" stroke="#E5A93C" stroke-width="2" stroke-linecap="round" />
          <circle cx="100" cy="4" r="2.5" fill="#E5A93C" />
        </svg>
      `;
    }
  }

  // =========================================================================
  // 4. STATUS BADGE COMPONENT (Bahasa Baku Sederhana & Jelas)
  // =========================================================================
  function getStatusBadge(status) {
    switch (status) {
      case 'Terkurasi WBTb':
        return `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 shadow-2xs">
            <i data-lucide="shield-check" class="w-3 h-3 text-emerald-600"></i>
            <span>Lolos Periksa Kualitas</span>
          </span>
        `;
      case 'Siap Kirim':
        return `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200 shadow-2xs">
            <i data-lucide="package-check" class="w-3 h-3 text-blue-600"></i>
            <span>Siap Dikirim</span>
          </span>
        `;
      case 'Verifikasi Kurator':
        return `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 shadow-2xs">
            <i data-lucide="clock" class="w-3 h-3 text-amber-600"></i>
            <span>Sedang Diperiksa</span>
          </span>
        `;
      case 'Pre-Order':
        return `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-50 text-purple-800 border border-purple-200 shadow-2xs">
            <i data-lucide="calendar" class="w-3 h-3 text-purple-600"></i>
            <span>Pesan Dulu (Pre-Order)</span>
          </span>
        `;
      default:
        return `<span class="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-gray-50 text-gray-700 border border-gray-200">${status}</span>`;
    }
  }

  // Indikator Visual Jumlah Stok
  function getStockIndicator(stock) {
    const isCritical = stock <= 2;
    const fillClass = isCritical ? 'stock-bar-critical' : 'stock-bar-healthy';
    const fillWidth = Math.min(100, Math.max(15, (stock / 15) * 100));

    return `
      <div>
        <div class="flex items-center justify-between text-xs font-semibold ${isCritical ? 'text-red-700' : 'text-gray-800'}">
          <span>${stock} unit</span>
          ${isCritical ? '<span class="text-[9px] font-bold text-red-600 bg-red-50 px-1.5 py-0.2 rounded border border-red-200">Tinggal Sedikit</span>' : '<span class="text-[9px] font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded">Stok Aman</span>'}
        </div>
        <div class="stock-bar-track">
          <div class="stock-bar-fill ${fillClass}" style="width: ${fillWidth}%;"></div>
        </div>
      </div>
    `;
  }

  // =========================================================================
  // 5. DATA RENDERING: TABLE VIEW & BENTO GRID VIEW
  // =========================================================================
  const tbody = document.getElementById('product-table-body');
  const gridContainer = document.getElementById('product-grid-container');
  const tableContainer = document.getElementById('product-table-container');
  const tableSearch = document.getElementById('table-search');
  const filterCategory = document.getElementById('filter-category');
  const filterStatus = document.getElementById('filter-status');
  const countEl = document.getElementById('showing-count');
  const metricCount = document.getElementById('metric-products');
  const metricRev = document.getElementById('metric-revenue');

  function getFilteredProducts() {
    const q = (tableSearch?.value || '').toLowerCase().trim();
    const cat = filterCategory?.value || 'ALL';
    const stat = filterStatus?.value || 'ALL';

    return products.filter(p => {
      const matchQ = p.name.toLowerCase().includes(q) ||
                     p.origin.toLowerCase().includes(q) ||
                     p.id.toLowerCase().includes(q) ||
                     (p.wbtbReg && p.wbtbReg.toLowerCase().includes(q));
      const matchCat = (cat === 'ALL') || (p.category === cat);
      const matchStat = (stat === 'ALL') || (p.status === stat);
      return matchQ && matchCat && matchStat;
    });
  }

  function renderView() {
    const filtered = getFilteredProducts();

    // Update counts
    if (countEl) countEl.textContent = filtered.length;
    if (metricCount) metricCount.textContent = `${products.length} Produk`;

    // Recalculate total revenue
    const totalRev = products.reduce((acc, curr) => acc + (curr.price * (curr.sold || 0)), 0);
    if (metricRev) metricRev.textContent = formatRp(totalRev > 0 ? totalRev : 48290000);

    // Empty state
    if (!filtered.length) {
      const emptyHtml = `
        <div class="py-16 text-center text-gray-500">
          <div class="w-12 h-12 mx-auto mb-3 rounded-full bg-[#FAF7F2] flex items-center justify-center text-[#C5A059] border border-[#EDE4D5]">
            <i data-lucide="search-x" class="w-6 h-6"></i>
          </div>
          <p class="text-sm font-semibold text-gray-800">Tidak ada produk yang cocok dengan pencarian.</p>
          <p class="text-xs text-gray-400 mt-1">Coba ketik kata lain atau pilih 'Semua Jenis Produk'.</p>
          <button id="reset-filter-btn" class="mt-3 px-3.5 py-1.5 text-xs font-semibold bg-[#241B16] text-[#F5EFE6] rounded-lg hover:bg-[#382B23] transition-colors cursor-pointer">
            Tampilkan Semua Produk
          </button>
        </div>
      `;

      if (currentView === 'table' && tbody) {
        tbody.innerHTML = `<tr><td colspan="8">${emptyHtml}</td></tr>`;
      } else if (gridContainer) {
        gridContainer.innerHTML = emptyHtml;
      }

      document.getElementById('reset-filter-btn')?.addEventListener('click', () => {
        if (tableSearch) tableSearch.value = '';
        if (filterCategory) filterCategory.value = 'ALL';
        if (filterStatus) filterStatus.value = 'ALL';
        renderView();
      });

      if (window.lucide) lucide.createIcons();
      return;
    }

    // 1. RENDER TABLE
    if (tbody) {
      tbody.innerHTML = filtered.map(p => `
        <tr class="hover:bg-[#FAF7F2]/80 transition-colors group cursor-pointer" data-id="${p.id}">
          <td class="py-3.5 px-4 text-center" onclick="event.stopPropagation()">
            <input type="checkbox" class="product-checkbox rounded border-gray-300 text-[#C88A36] focus:ring-[#C88A36] cursor-pointer" data-id="${p.id}" />
          </td>
          <td class="py-3.5 px-4">
            <div class="flex items-center gap-3">
              <img 
                src="${p.img}" 
                alt="${p.name}" 
                class="w-11 h-11 rounded-lg object-cover border border-[#EDE4D5] flex-shrink-0 group-hover:border-[#C88A36] transition-colors" 
                onerror="this.src='assets/images/logonusava.png'" 
              />
              <div class="min-w-0">
                <p class="font-bold text-gray-900 truncate group-hover:text-[#C88A36] transition-colors text-xs sm:text-[13px]">${p.name}</p>
                <p class="text-[10px] text-gray-500 truncate flex items-center gap-1.5 mt-0.5">
                  <i data-lucide="map-pin" class="w-3 h-3 text-[#C5A059] flex-shrink-0"></i>
                  <span>${p.origin}</span>
                  <span class="text-gray-300">•</span>
                  <span class="font-mono text-gray-400 bg-gray-100 px-1 py-0.2 rounded">${p.id}</span>
                </p>
              </div>
            </div>
          </td>
          <td class="py-3.5 px-4">
            <span class="px-2.5 py-0.5 bg-[#FAF7F2] border border-[#EDE4D5] rounded-md text-gray-700 font-semibold text-[10px]">${p.category}</span>
          </td>
          <td class="py-3.5 px-4 font-bold text-gray-900 text-[13px]">${formatRp(p.price)}</td>
          <td class="py-3.5 px-4 min-w-[120px]">${getStockIndicator(p.stock)}</td>
          <td class="py-3.5 px-4">${getStatusBadge(p.status)}</td>
          <td class="py-3.5 px-4 text-gray-700 font-medium text-xs">${p.sold || 0} buah</td>
          <td class="py-3.5 px-4 text-right" onclick="event.stopPropagation()">
            <div class="flex items-center justify-end gap-1">
              <button class="view-drawer-btn p-1.5 text-gray-400 hover:text-[#C88A36] rounded-md hover:bg-[#FAF7F2] transition-colors cursor-pointer" data-id="${p.id}" title="Lihat Detail & Bukti Asli">
                <i data-lucide="eye" class="w-4 h-4"></i>
              </button>
              <button class="edit-product-btn p-1.5 text-gray-400 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors cursor-pointer" data-id="${p.id}" title="Ubah Data Produk">
                <i data-lucide="pencil" class="w-4 h-4"></i>
              </button>
              <button class="delete-btn p-1.5 text-gray-400 hover:text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer" data-id="${p.id}" title="Hapus Produk">
                <i data-lucide="trash-2" class="w-4 h-4"></i>
              </button>
            </div>
          </td>
        </tr>
      `).join('');
    }

    // 2. RENDER BENTO GRID GALLERY (Kotak Foto)
    if (gridContainer) {
      gridContainer.innerHTML = filtered.map(p => `
        <div class="product-card-bento group cursor-pointer" data-id="${p.id}">
          <div class="product-card-image-wrap">
            <img 
              src="${p.img}" 
              alt="${p.name}" 
              class="product-card-image"
              onerror="this.src='assets/images/logonusava.png'"
            />
            <div class="absolute top-2 left-2 z-10">
              <span class="px-2 py-0.5 bg-[#241B16]/80 backdrop-blur-xs text-[#F5EFE6] text-[10px] font-semibold rounded">
                ${p.category}
              </span>
            </div>
            <div class="absolute top-2 right-2 z-10">
              <span class="font-mono text-[9px] bg-white/90 text-gray-800 px-1.5 py-0.5 rounded font-bold shadow-2xs">
                ${p.id}
              </span>
            </div>
          </div>
          
          <div class="p-4 flex-1 flex flex-col justify-between space-y-3">
            <div>
              <div class="flex items-center gap-1 text-[10px] text-gray-500 mb-1">
                <i data-lucide="map-pin" class="w-3 h-3 text-[#C5A059] flex-shrink-0"></i>
                <span class="truncate">${p.origin}</span>
              </div>
              <h4 class="font-bold text-gray-900 group-hover:text-[#C88A36] transition-colors line-clamp-1 text-sm font-sans">${p.name}</h4>
              <p class="text-[11px] text-gray-500 line-clamp-2 mt-1 leading-relaxed">${p.desc}</p>
            </div>

            <div class="pt-2 border-t border-[#EDE4D5]/60 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-gray-900 text-[14px]">${formatRp(p.price)}</span>
                <span class="text-[10px] text-gray-500 font-medium">Terjual: <b class="text-gray-800">${p.sold || 0} buah</b></span>
              </div>
              <div>${getStockIndicator(p.stock)}</div>
              <div class="pt-1 flex items-center justify-between">
                <div>${getStatusBadge(p.status)}</div>
                <div class="flex items-center gap-1" onclick="event.stopPropagation()">
                  <button class="view-drawer-btn p-1 text-gray-400 hover:text-[#C88A36] rounded hover:bg-[#FAF7F2] transition-colors" data-id="${p.id}" title="Lihat Detail & Bukti Asli">
                    <i data-lucide="eye" class="w-3.5 h-3.5"></i>
                  </button>
                  <button class="edit-product-btn p-1 text-gray-400 hover:text-blue-600 rounded hover:bg-blue-50 transition-colors" data-id="${p.id}" title="Ubah Produk">
                    <i data-lucide="pencil" class="w-3.5 h-3.5"></i>
                  </button>
                  <button class="delete-btn p-1 text-gray-400 hover:text-red-600 rounded hover:bg-red-50 transition-colors" data-id="${p.id}" title="Hapus Produk">
                    <i data-lucide="trash-2" class="w-3.5 h-3.5"></i>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      `).join('');
    }

    // Attach row / card click to open Slide-Over Drawer
    document.querySelectorAll('[data-id]').forEach(el => {
      el.addEventListener('click', () => {
        const id = el.dataset.id;
        if (id) openSlideOverDrawer(id);
      });
    });

    // Attach delete handlers
    document.querySelectorAll('.delete-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        const target = products.find(x => x.id === id);
        if (!target) return;
        if (confirm(`Yakin ingin menghapus produk "${target.name}" dari toko kamu?`)) {
          products = products.filter(x => x.id !== id);
          localStorage.setItem('nusava_artisan_products', JSON.stringify(products));
          renderView();
          renderAnalyticsChart(currentPeriod);
          showToast(`Produk "${target.name}" berhasil dihapus.`);
        }
      });
    });

    // Attach edit handlers
    document.querySelectorAll('.edit-product-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        openEditProductModal(id);
      });
    });

    // Attach view drawer buttons
    document.querySelectorAll('.view-drawer-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const id = btn.dataset.id;
        openSlideOverDrawer(id);
      });
    });

    if (window.lucide) lucide.createIcons();
  }

  // View Switcher (Table vs Bento Grid)
  const viewToggleTable = document.getElementById('view-toggle-table');
  const viewToggleGrid = document.getElementById('view-toggle-grid');

  function setViewMode(mode) {
    currentView = mode;
    if (mode === 'table') {
      viewToggleTable?.classList.add('active');
      viewToggleGrid?.classList.remove('active');
      if (tableContainer) tableContainer.classList.remove('hidden');
      if (gridContainer) gridContainer.classList.add('hidden');
    } else {
      viewToggleGrid?.classList.add('active');
      viewToggleTable?.classList.remove('active');
      if (tableContainer) tableContainer.classList.add('hidden');
      if (gridContainer) gridContainer.classList.remove('hidden');
    }
    renderView();
  }

  viewToggleTable?.addEventListener('click', () => setViewMode('table'));
  viewToggleGrid?.addEventListener('click', () => setViewMode('grid'));

  // Search & Filters Listener
  tableSearch?.addEventListener('input', renderView);
  filterCategory?.addEventListener('change', renderView);
  filterStatus?.addEventListener('change', renderView);

  // Checkbox All
  const checkAll = document.getElementById('check-all');
  checkAll?.addEventListener('change', (e) => {
    const isChecked = e.target.checked;
    document.querySelectorAll('.product-checkbox').forEach(cb => {
      cb.checked = isChecked;
    });
  });

  // =========================================================================
  // 6. SLIDE-OVER DRAWER (DETAIL PUSAKA & SERTIFIKAT RESMI WBTb)
  // =========================================================================
  const drawerBackdrop = document.getElementById('drawer-backdrop');
  const drawerPanel = document.getElementById('drawer-panel');
  const drawerCloseBtn = document.getElementById('drawer-close-btn');

  function openSlideOverDrawer(productId) {
    const p = products.find(x => x.id === productId);
    if (!p) return;
    activeSelectedProduct = p;

    // Fill Content
    const drawerImg = document.getElementById('drawer-product-img');
    const drawerName = document.getElementById('drawer-product-name');
    const drawerId = document.getElementById('drawer-product-id');
    const drawerCategory = document.getElementById('drawer-product-category');
    const drawerOrigin = document.getElementById('drawer-product-origin');
    const drawerDesc = document.getElementById('drawer-product-desc');
    const drawerPrice = document.getElementById('drawer-product-price');
    const drawerStock = document.getElementById('drawer-product-stock');
    const drawerWbtbReg = document.getElementById('drawer-wbtb-reg');
    const drawerCurator = document.getElementById('drawer-curator-name');
    const drawerVerifiedDate = document.getElementById('drawer-verified-date');
    const drawerStatusBadge = document.getElementById('drawer-status-badge');

    // Inline edit form fields
    const quickPriceInput = document.getElementById('drawer-quick-price');
    const quickStockInput = document.getElementById('drawer-quick-stock');

    if (drawerImg) drawerImg.src = p.img;
    if (drawerName) drawerName.textContent = p.name;
    if (drawerId) drawerId.textContent = p.id;
    if (drawerCategory) drawerCategory.textContent = p.category;
    if (drawerOrigin) drawerOrigin.textContent = p.origin;
    if (drawerDesc) drawerDesc.textContent = p.desc;
    if (drawerPrice) drawerPrice.textContent = formatRp(p.price);
    if (drawerStock) drawerStock.textContent = `${p.stock} Unit`;
    if (drawerWbtbReg) drawerWbtbReg.textContent = p.wbtbReg || 'WBTb-2024-ID-0182';
    if (drawerCurator) drawerCurator.textContent = p.curator || 'Prof. Dr. I Made Bandem';
    if (drawerVerifiedDate) drawerVerifiedDate.textContent = p.verifiedDate || '14 Agustus 2024';
    if (drawerStatusBadge) drawerStatusBadge.innerHTML = getStatusBadge(p.status);

    if (quickPriceInput) quickPriceInput.value = p.price;
    if (quickStockInput) quickStockInput.value = p.stock;

    // Open drawer with smooth animation
    drawerBackdrop?.classList.add('active');
    drawerPanel?.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (window.lucide) lucide.createIcons();
  }

  function closeSlideOverDrawer() {
    drawerBackdrop?.classList.remove('active');
    drawerPanel?.classList.remove('active');
    document.body.style.overflow = '';
  }

  drawerCloseBtn?.addEventListener('click', closeSlideOverDrawer);
  drawerBackdrop?.addEventListener('click', closeSlideOverDrawer);

  // Quick edit save in drawer
  const quickEditForm = document.getElementById('drawer-quick-edit-form');
  quickEditForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!activeSelectedProduct) return;

    const newPrice = Number(document.getElementById('drawer-quick-price').value);
    const newStock = Number(document.getElementById('drawer-quick-stock').value);

    activeSelectedProduct.price = newPrice;
    activeSelectedProduct.stock = newStock;

    // Update in products array
    const idx = products.findIndex(x => x.id === activeSelectedProduct.id);
    if (idx !== -1) {
      products[idx] = { ...activeSelectedProduct };
      localStorage.setItem('nusava_artisan_products', JSON.stringify(products));
    }

    renderView();
    closeSlideOverDrawer();
    showToast(`Perubahan harga dan stok "${activeSelectedProduct.name}" berhasil disimpan!`);
  });

  // =========================================================================
  // 7. COMMAND PALETTE (Ctrl+K)
  // =========================================================================
  const commandBackdrop = document.getElementById('command-palette-backdrop');
  const commandInput = document.getElementById('command-palette-input');
  const commandResults = document.getElementById('command-palette-results');
  const sidebarSearchTrigger = document.getElementById('sidebar-search-trigger');

  function openCommandPalette() {
    commandBackdrop?.classList.add('active');
    commandInput?.focus();
    if (commandInput) commandInput.value = '';
    renderCommandPaletteResults('');
    document.body.style.overflow = 'hidden';
  }

  function closeCommandPalette() {
    commandBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Keyboard shortcut listener
  document.addEventListener('keydown', (e) => {
    // Ctrl+K (or Cmd+K on Mac)
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (commandBackdrop?.classList.contains('active')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    }
    // Escape
    if (e.key === 'Escape') {
      if (commandBackdrop?.classList.contains('active')) closeCommandPalette();
      if (drawerBackdrop?.classList.contains('active')) closeSlideOverDrawer();
      closeHeritageModal();
      closeAIModal();
    }
  });

  sidebarSearchTrigger?.addEventListener('click', openCommandPalette);
  commandBackdrop?.addEventListener('click', (e) => {
    if (e.target === commandBackdrop) closeCommandPalette();
  });

  function renderCommandPaletteResults(query = '') {
    const q = query.toLowerCase().trim();
    commandSelectedIndex = 0;

    const matchedProducts = products.filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.origin.toLowerCase().includes(q) || 
      p.id.toLowerCase().includes(q)
    ).slice(0, 5);

    const actions = [
      { id: 'act-add', title: '+ Tambah Produk Baru', desc: 'Buka formulir untuk menambah produk baru', icon: 'plus-circle' },
      { id: 'act-grid', title: 'Ganti ke Tampilan Kotak Foto', desc: 'Lihat produk dalam bentuk kartu foto', icon: 'layout-grid' },
      { id: 'act-table', title: 'Ganti ke Tampilan Tabel', desc: 'Lihat produk dalam bentuk baris tabel rapi', icon: 'table-2' },
      { id: 'act-export', title: 'Unduh Data Penjualan (Excel/CSV)', desc: 'Simpan data produk ke file komputer', icon: 'download' },
      { id: 'act-ai', title: 'Buka Bantuan Asisten AI', desc: 'Tanya saran harga dan tips jualan mudah', icon: 'sparkles' },
    ].filter(a => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q));

    let html = '';

    if (matchedProducts.length) {
      html += `<div class="px-3 py-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider font-sans">Daftar Produk Toko</div>`;
      matchedProducts.forEach((p, idx) => {
        html += `
          <div class="command-item ${idx === 0 ? 'selected' : ''}" data-type="product" data-id="${p.id}">
            <div class="flex items-center gap-3">
              <img src="${p.img}" alt="${p.name}" class="w-8 h-8 rounded-md object-cover border border-[#EDE4D5]" />
              <div>
                <p class="text-xs font-bold text-gray-900">${p.name}</p>
                <p class="text-[10px] text-gray-500">${p.origin} • <span class="font-mono text-gray-400">${p.id}</span></p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-xs font-bold text-[#C88A36]">${formatRp(p.price)}</span>
            </div>
          </div>
        `;
      });
    }

    if (actions.length) {
      html += `<div class="px-3 pt-3 pb-1.5 text-[10px] font-bold text-gray-500 uppercase tracking-wider font-sans">Pilihan & Aksi Cepat</div>`;
      actions.forEach(a => {
        html += `
          <div class="command-item" data-type="action" data-action="${a.id}">
            <div class="flex items-center gap-2.5">
              <div class="w-7 h-7 rounded-md bg-[#FAF7F2] border border-[#EDE4D5] flex items-center justify-center text-[#C88A36]">
                <i data-lucide="${a.icon}" class="w-3.5 h-3.5"></i>
              </div>
              <div>
                <p class="text-xs font-bold text-gray-900">${a.title}</p>
                <p class="text-[10px] text-gray-500">${a.desc}</p>
              </div>
            </div>
            <span class="text-[10px] text-gray-400 font-mono">Buka</span>
          </div>
        `;
      });
    }

    if (!matchedProducts.length && !actions.length) {
      html = `
        <div class="py-8 text-center text-gray-400 text-xs">
          Tidak ada produk yang bernama "<span class="text-gray-700 font-semibold">${query}</span>"
        </div>
      `;
    }

    if (commandResults) {
      commandResults.innerHTML = html;
      attachCommandPaletteEvents();
      if (window.lucide) lucide.createIcons();
    }
  }

  commandInput?.addEventListener('input', (e) => {
    renderCommandPaletteResults(e.target.value);
  });

  function attachCommandPaletteEvents() {
    const items = commandResults?.querySelectorAll('.command-item');
    items?.forEach(item => {
      item.addEventListener('click', () => {
        const type = item.dataset.type;
        if (type === 'product') {
          const id = item.dataset.id;
          closeCommandPalette();
          openSlideOverDrawer(id);
        } else if (type === 'action') {
          const act = item.dataset.action;
          closeCommandPalette();
          handleCommandAction(act);
        }
      });
    });
  }

  function handleCommandAction(actionId) {
    switch (actionId) {
      case 'act-add':
        openAddProductModal();
        break;
      case 'act-grid':
        setViewMode('grid');
        break;
      case 'act-table':
        setViewMode('table');
        break;
      case 'act-export':
        document.getElementById('export-csv-btn')?.click();
        break;
      case 'act-ai':
        openAIModal();
        break;
    }
  }

  // Keyboard navigation within command palette
  commandInput?.addEventListener('keydown', (e) => {
    const items = commandResults?.querySelectorAll('.command-item');
    if (!items || !items.length) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      commandSelectedIndex = (commandSelectedIndex + 1) % items.length;
      items.forEach((it, idx) => it.classList.toggle('selected', idx === commandSelectedIndex));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      commandSelectedIndex = (commandSelectedIndex - 1 + items.length) % items.length;
      items.forEach((it, idx) => it.classList.toggle('selected', idx === commandSelectedIndex));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const current = items[commandSelectedIndex];
      if (current) current.click();
    }
  });

  // =========================================================================
  // 8. MODAL: TAMBAH & EDIT KARYA KRIYA PUSAKA
  // =========================================================================
  const heritageModalBackdrop = document.getElementById('heritage-modal-backdrop');
  const heritageModalClose = document.getElementById('heritage-modal-close');
  const heritageForm = document.getElementById('heritage-product-form');
  const modalTitle = document.getElementById('heritage-modal-title');
  const modalSub = document.getElementById('heritage-modal-sub');
  let isEditing = false;
  let editingId = null;

  // Custom Product Photo Upload State & Handlers
  let currentUploadedImage = '';

  const modalInputFile = document.getElementById('modal-input-file');
  const modalDropzone = document.getElementById('modal-upload-dropzone');
  const uploadPlaceholder = document.getElementById('upload-placeholder-state');
  const uploadPreview = document.getElementById('upload-preview-state');
  const uploadPreviewImg = document.getElementById('upload-preview-img');
  const uploadFileName = document.getElementById('upload-file-name');
  const uploadFileSize = document.getElementById('upload-file-size');
  const uploadRemoveBtn = document.getElementById('upload-remove-btn');
  const modalInputImgData = document.getElementById('modal-input-image-data');

  function resetImageUpload() {
    currentUploadedImage = '';
    if (modalInputFile) modalInputFile.value = '';
    if (modalInputImgData) modalInputImgData.value = '';
    if (uploadPreviewImg) uploadPreviewImg.src = '';
    uploadPreview?.classList.add('hidden');
    uploadPlaceholder?.classList.remove('hidden');
    modalDropzone?.classList.remove('border-[#C5A059]', 'bg-[#F5EFE6]');
  }

  function setUploadedImage(dataUrl, fileName, fileSizeStr) {
    currentUploadedImage = dataUrl;
    if (modalInputImgData) modalInputImgData.value = dataUrl;
    if (uploadPreviewImg) uploadPreviewImg.src = dataUrl;
    if (uploadFileName) uploadFileName.textContent = fileName || 'foto-produk.jpg';
    if (uploadFileSize) uploadFileSize.textContent = (fileSizeStr || 'Foto Siap') + ' • Siap Diunggah';
    uploadPlaceholder?.classList.add('hidden');
    uploadPreview?.classList.remove('hidden');
    modalDropzone?.classList.add('border-[#C5A059]', 'bg-[#F5EFE6]');
  }

  function processImageFile(file) {
    if (!file || !file.type.startsWith('image/')) {
      showToast('Harap pilih berkas gambar yang valid (PNG, JPG, JPEG, WebP).');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let w = img.width;
        let h = img.height;
        if (w > maxDim || h > maxDim) {
          if (w > h) {
            h = Math.round((h * maxDim) / w);
            w = maxDim;
          } else {
            w = Math.round((w * maxDim) / h);
            h = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.86);
        setUploadedImage(dataUrl, file.name, (file.size / 1024).toFixed(1) + ' KB');
        showToast('Foto karya Anda berhasil dimuat!');
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  modalDropzone?.addEventListener('click', (e) => {
    if (e.target.closest('#upload-remove-btn')) return;
    modalInputFile?.click();
  });

  modalInputFile?.addEventListener('change', (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) processImageFile(file);
  });

  uploadRemoveBtn?.addEventListener('click', (e) => {
    e.stopPropagation();
    resetImageUpload();
  });

  // Drag and Drop support
  modalDropzone?.addEventListener('dragover', (e) => {
    e.preventDefault();
    modalDropzone.classList.add('border-[#C5A059]', 'bg-[#F5EFE6]');
  });
  modalDropzone?.addEventListener('dragleave', (e) => {
    e.preventDefault();
    if (!currentUploadedImage) {
      modalDropzone.classList.remove('border-[#C5A059]', 'bg-[#F5EFE6]');
    }
  });
  modalDropzone?.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) processImageFile(file);
  });

  function openAddProductModal() {
    isEditing = false;
    editingId = null;
    heritageForm?.reset();
    resetImageUpload();
    if (modalTitle) modalTitle.textContent = 'Tambah Produk Baru';
    if (modalSub) modalSub.textContent = 'Isi data produk kerajinan kamu dengan mudah';
    heritageModalBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function openEditProductModal(id) {
    const p = products.find(x => x.id === id);
    if (!p) return;
    isEditing = true;
    editingId = id;

    if (modalTitle) modalTitle.textContent = `Ubah Data Produk (${p.name})`;
    if (modalSub) modalSub.textContent = 'Perbarui harga, sisa stok, foto, atau status produk';

    // Populate form
    const nameIn = document.getElementById('modal-input-name');
    const catIn = document.getElementById('modal-input-category');
    const origIn = document.getElementById('modal-input-origin');
    const priceIn = document.getElementById('modal-input-price');
    const stockIn = document.getElementById('modal-input-stock');
    const statIn = document.getElementById('modal-input-status');
    const descIn = document.getElementById('modal-input-desc');

    if (nameIn) nameIn.value = p.name;
    if (catIn) catIn.value = p.category;
    if (origIn) origIn.value = p.origin;
    if (priceIn) priceIn.value = p.price;
    if (stockIn) stockIn.value = p.stock;
    if (statIn) statIn.value = p.status;
    if (descIn) descIn.value = p.desc;

    if (p.img) {
      setUploadedImage(p.img, p.name + '.jpg', 'Tersimpan');
    } else {
      resetImageUpload();
    }

    heritageModalBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeHeritageModal() {
    heritageModalBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  heritageModalClose?.addEventListener('click', closeHeritageModal);
  document.getElementById('modal-cancel-btn')?.addEventListener('click', closeHeritageModal);
  heritageModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === heritageModalBackdrop) closeHeritageModal();
  });

  // Buttons to open Add Product Modal
  document.getElementById('toolbar-add-btn')?.addEventListener('click', openAddProductModal);
  document.getElementById('mobile-add-btn')?.addEventListener('click', openAddProductModal);

  // Form Submit
  heritageForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('modal-input-name').value.trim();
    const category = document.getElementById('modal-input-category').value;
    const origin = document.getElementById('modal-input-origin').value.trim();
    const price = Number(document.getElementById('modal-input-price').value);
    const stock = Number(document.getElementById('modal-input-stock').value);
    const status = document.getElementById('modal-input-status').value;
    const desc = document.getElementById('modal-input-desc').value.trim();
    const finalImg = currentUploadedImage || (isEditing && editingId ? (products.find(x => x.id === editingId)?.img || 'assets/images/content/produk-batik-giriloyo.jpg') : 'assets/images/content/produk-batik-giriloyo.jpg');

    if (isEditing && editingId) {
      const idx = products.findIndex(x => x.id === editingId);
      if (idx !== -1) {
        products[idx] = {
          ...products[idx],
          name,
          category,
          origin,
          price,
          stock,
          status,
          img: finalImg,
          desc: desc || products[idx].desc
        };
        showToast(`Data produk "${name}" berhasil diperbarui!`);
      }
    } else {
      const nextNum = products.length + 1;
      const newId = 'KRY-' + String(nextNum).padStart(3, '0');
      const newProduct = {
        id: newId,
        name,
        category,
        origin,
        price,
        stock,
        status,
        sold: 0,
        wbtbReg: `WBTb-2026-NUSA-${String(nextNum).padStart(4, '0')}`,
        curator: 'Dewan Kurator Budaya Nusava',
        verifiedDate: 'Terdaftar Terbaru 2026',
        img: finalImg,
        desc: desc || 'Karya kerajinan asli buatan tangan pengrajin daerah dengan bahan alami.'
      };
      products.unshift(newProduct);
      showToast(`Produk "${name}" berhasil ditambahkan ke tokomu!`);
    }

    localStorage.setItem('nusava_artisan_products', JSON.stringify(products));
    renderView();
    closeHeritageModal();
  });

  // =========================================================================
  // 9. ASISTEN KONSULTASI KRIYA AI (Interactive Modal with Cultural Intelligence)
  // =========================================================================
  const aiModalBackdrop = document.getElementById('ai-modal-backdrop');
  const aiModalClose = document.getElementById('ai-modal-close');
  const aiChatFeed = document.getElementById('ai-chat-feed');
  const aiChatInput = document.getElementById('ai-chat-input');
  const aiChatSend = document.getElementById('ai-chat-send');
  const aiPromptChips = document.querySelectorAll('.ai-prompt-chip');

  function openAIModal() {
    aiModalBackdrop?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAIModal() {
    aiModalBackdrop?.classList.remove('active');
    document.body.style.overflow = '';
  }

  aiModalClose?.addEventListener('click', closeAIModal);
  aiModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === aiModalBackdrop) closeAIModal();
  });

  // Sidebar link trigger
  document.getElementById('nav-ai-assistant')?.addEventListener('click', (e) => {
    e.preventDefault();
    openAIModal();
  });
  document.getElementById('bento-ai-btn')?.addEventListener('click', openAIModal);

  // Pengetahuan Asisten AI dengan Bahasa Baku Sederhana (Mudah Dipahami UMKM)
  const AI_KNOWLEDGE_BASE = {
    wbtb: `
      Halo Pak Wayan! Ini 3 syarat mudah agar produk kamu dapat Surat Tanda Asli Resmi:
      1. **Bahan Alami Asli**: Memakai bahan alam dari daerah sekitar (seperti kayu ulin, akar pohon, daun nila, atau tempaan besi asli).
      2. **Dibuat Turun-Temurun**: Dikerjakan dengan keahlian yang diwariskan dari orang tua atau keluarga minimal 2 generasi.
      3. **Punya Makna Khusus**: Motif atau bentuknya memiliki arti baik (misalnya motif kemakmuran atau perlindungan).
      
      *Langkah Mudah*: Tim Nusava siap membantu mengambil video pendek saat kamu membuat kerajinan untuk dikirim ke tim penilai resmi.
    `,
    valuasi: `
      Halo Pak Wayan! Ini saran harga jual yang pas untuk produk kerajinan kamu:
      - **Kain Tenun Asli (Pewarna Alami)**: Karena pembuatannya butuh waktu lama berbulan-bulan, harga yang sangat cocok adalah **Rp 3.500.000 sampai Rp 4.500.000**.
      - **Ukiran Kayu Khas Daerah**: Untuk kayu berkualitas yang tahan puluhan tahun, harga pas di kisaran **Rp 2.800.000 sampai Rp 5.500.000**.
      - **Anyaman Serat Alam**: Harga pas di kisaran **Rp 500.000 sampai Rp 1.200.000**.
      
      *Tips Usaha*: Beri tahu pembeli bahwa produk ini asli buatan tangan dan ramah lingkungan. Pembeli biasanya sangat senang dan rela membayar lebih.
    `,
    logistik: `
      Cara mudah membungkus paket agar barang aman dan tidak rusak di jalan:
      1. **Bungkus Rapat**: Lapisi produk dengan plastik gelembung (bubble wrap) minimal 3 lapis agar empuk.
      2. **Gunakan Kardus Tebal**: Masukkan ke dalam kardus yang pas ukurannya. Jangan biarkan ada ruang kosong yang bisa membuat barang bergoyang.
      3. **Lakban Rapat**: Rekatkan lakban di semua sisi dan sambungan kardus.
      4. **Beri Tanda Hati-Hati**: Tulis atau tempel stempel "Barang Pecah Belah / Jangan Dibanting" agar kurir membawa paket dengan hati-hati.
    `,
    pameran: `
      Tips jualan untuk pameran tahun ini:
      - Produk kerajinan logam dan ukiran kayu sedang banyak dicari pembeli.
      - Siapkan minimal 3 sampai 5 produk andalan dengan kondisi paling bagus dan bersih.
      - Pasang kartu cerita pendek di setiap produk agar pembeli langsung paham keunikan kerajinan kamu.
    `
  };

  function sendAIMessage(userText) {
    if (!userText.trim()) return;

    // Append User Bubble
    const userBubble = document.createElement('div');
    userBubble.className = 'flex justify-end mb-3';
    userBubble.innerHTML = `
      <div class="bg-[#241B16] text-[#F5EFE6] text-xs px-3.5 py-2.5 rounded-2xl rounded-tr-xs max-w-[85%] font-sans shadow-xs">
        ${userText}
      </div>
    `;
    aiChatFeed?.appendChild(userBubble);
    if (aiChatInput) aiChatInput.value = '';

    // Scroll to bottom
    if (aiChatFeed) aiChatFeed.scrollTop = aiChatFeed.scrollHeight;

    // Simulate thinking state
    const typingBubble = document.createElement('div');
    typingBubble.className = 'flex items-start gap-2.5 mb-3';
    typingBubble.id = 'ai-typing-indicator';
    typingBubble.innerHTML = `
      <div class="w-6 h-6 rounded-full bg-[#C5A059] flex items-center justify-center text-[#241B16] flex-shrink-0 text-xs font-bold font-sans">N</div>
      <div class="bg-white border border-[#EDE4D5] text-gray-500 text-xs px-3 py-2 rounded-2xl rounded-tl-xs shadow-2xs flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-bounce"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.2s]"></span>
        <span class="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-bounce [animation-delay:0.4s]"></span>
        <span class="text-[10px] ml-1">Sedang menyiapkan saran terbaik untuk tokomu...</span>
      </div>
    `;
    aiChatFeed?.appendChild(typingBubble);
    if (aiChatFeed) aiChatFeed.scrollTop = aiChatFeed.scrollHeight;

    // Pick response
    let responseText = AI_KNOWLEDGE_BASE.valuasi;
    const lower = userText.toLowerCase();
    if (lower.includes('asli') || lower.includes('surat') || lower.includes('syarat') || lower.includes('wbtb')) {
      responseText = AI_KNOWLEDGE_BASE.wbtb;
    } else if (lower.includes('bungkus') || lower.includes('paket') || lower.includes('kirim') || lower.includes('logistik')) {
      responseText = AI_KNOWLEDGE_BASE.logistik;
    } else if (lower.includes('pameran') || lower.includes('tren') || lower.includes('laris')) {
      responseText = AI_KNOWLEDGE_BASE.pameran;
    }

    setTimeout(() => {
      document.getElementById('ai-typing-indicator')?.remove();
      const aiResponseBubble = document.createElement('div');
      aiResponseBubble.className = 'flex items-start gap-2.5 mb-3';
      aiResponseBubble.innerHTML = `
        <div class="w-6 h-6 rounded-full bg-[#C5A059] flex items-center justify-center text-[#241B16] flex-shrink-0 text-xs font-bold font-sans">N</div>
        <div class="bg-white border border-[#EDE4D5] text-gray-800 text-xs px-4 py-3 rounded-2xl rounded-tl-xs shadow-2xs max-w-[85%] leading-relaxed font-sans">
          ${responseText.replace(/\n/g, '<br/>')}
        </div>
      `;
      aiChatFeed?.appendChild(aiResponseBubble);
      if (aiChatFeed) aiChatFeed.scrollTop = aiChatFeed.scrollHeight;
    }, 650);
  }

  aiChatSend?.addEventListener('click', () => {
    if (aiChatInput) sendAIMessage(aiChatInput.value);
  });

  aiChatInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendAIMessage(aiChatInput.value);
    }
  });

  aiPromptChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const prompt = chip.dataset.prompt || chip.textContent.trim();
      sendAIMessage(prompt);
    });
  });

  // =========================================================================
  // 10. UNDUH DATA PRODUK (CSV / EXCEL)
  // =========================================================================
  document.getElementById('export-csv-btn')?.addEventListener('click', () => {
    const list = getFilteredProducts();
    if (!list.length) {
      showToast('Tidak ada data produk untuk diunduh.');
      return;
    }

    let csv = 'Kode Produk,Nama Produk,Kategori,Asal Daerah,Harga (Rp),Sisa Stok,Status Produk,Jumlah Terjual,Nomor Surat Asli,Penilai Kualitas\n';
    list.forEach(p => {
      csv += `"${p.id}","${p.name.replace(/"/g, '""')}","${p.category}","${p.origin}",${p.price},${p.stock},"${p.status}",${p.sold || 0},"${p.wbtbReg || ''}","${p.curator || ''}"\n`;
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `data-produk-nusava-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Berhasil mengunduh data ${list.length} produk!`);
  });

  // =========================================================================
  // 12. TOAST NOTIFICATION
  // =========================================================================
  let toastTimer = null;
  function showToast(msg) {
    const toast = document.getElementById('heritage-toast');
    const toastText = document.getElementById('heritage-toast-text');
    if (!toast || !toastText) return;

    toastText.textContent = msg;
    toast.classList.add('active');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('active');
    }, 3800);
  }

  // =========================================================================
  // 13. SIDEBAR NAVIGATION & MOBILE RESPONSIVENESS
  // =========================================================================
  const sidebar = document.getElementById('sidebar');
  const sidebarBackdrop = document.getElementById('sidebar-backdrop');
  const sidebarToggleBtn = document.getElementById('sidebar-toggle-btn');
  const sidebarCloseBtn = document.getElementById('sidebar-close-btn');

  function openSidebar() {
    sidebar?.classList.add('open');
    sidebarBackdrop?.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebar?.classList.remove('open');
    sidebarBackdrop?.classList.add('hidden');
    document.body.style.overflow = '';
  }

  sidebarToggleBtn?.addEventListener('click', openSidebar);
  sidebarCloseBtn?.addEventListener('click', closeSidebar);
  sidebarBackdrop?.addEventListener('click', closeSidebar);

  // Logout handler
  document.getElementById('dashboard-logout-btn')?.addEventListener('click', () => {
    localStorage.removeItem('nusava_auth');
    showToast('Berhasil keluar. Mengalihkan ke halaman masuk...');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 800);
  });

  // Quick Action in Bento Right: Switch directly to Pesanan Masuk
  document.getElementById('bento-pack-btn')?.addEventListener('click', () => {
    switchView('pesanan');
    showToast('Membuka daftar pesanan masuk untuk dikemas.');
  });

  // =========================================================================
  // 14. SPA VIEW ROUTER (Pesanan Masuk, Kolektor, Analitik, Logistik)
  // =========================================================================
  const validViews = ['overview', 'pesanan', 'kolektor', 'analitik', 'logistik'];
  let currentActiveView = 'overview';

  function switchView(viewName) {
    if (!validViews.includes(viewName)) {
      viewName = 'overview';
    }
    currentActiveView = viewName;

    // 1. Hide all view sections, unhide target view
    validViews.forEach(v => {
      const sectionEl = document.getElementById(`view-${v}`);
      if (sectionEl) {
        if (v === viewName) {
          sectionEl.classList.remove('hidden');
        } else {
          sectionEl.classList.add('hidden');
        }
      }
    });

    // 2. Update sidebar active styles
    document.querySelectorAll('.sidebar-nav-item').forEach(item => {
      const itemTarget = item.getAttribute('data-view');
      if (itemTarget === viewName) {
        item.className = 'sidebar-nav-item flex items-center gap-3 px-3 py-2.5 text-xs font-semibold rounded-lg bg-[#C88A36]/15 text-[#F5EFE6] border border-[#C88A36]/30 transition-colors';
      } else {
        item.className = 'sidebar-nav-item flex items-center gap-3 px-3 py-2.5 text-xs font-medium rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors';
      }
    });

    // 3. Update URL hash without reload
    if (window.location.hash !== `#${viewName}`) {
      window.history.replaceState(null, '', `#${viewName}`);
    }

    // 4. Auto-close mobile sidebar if open
    closeSidebar();

    // 5. Trigger view-specific re-renders
    if (viewName === 'pesanan') {
      renderOrdersView();
    } else if (viewName === 'kolektor') {
      renderBuyersView();
    } else if (viewName === 'analitik') {
      renderDetailedAnalyticsChart(currentDetailedPeriod);
    } else if (viewName === 'logistik') {
      selectLogisticsRoute(currentLogisticsRouteKey);
    }

    // 6. Refresh Lucide icons
    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Bind click handlers for all sidebar nav items with data-view
  document.querySelectorAll('.sidebar-nav-item[data-view]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      switchView(targetView);
    });
  });

  // Listen to hash change from back/forward browser buttons
  window.addEventListener('hashchange', () => {
    const hash = window.location.hash.replace('#', '');
    if (hash && validViews.includes(hash)) {
      switchView(hash);
    }
  });

  // Global helper for anywhere in dashboard
  window.switchDashboardView = switchView;

  // =========================================================================
  // 15. PESANAN MASUK (INCOMING ORDERS ENGINE)
  // =========================================================================
  let ARTISAN_ORDERS = [
    {
      id: 'INV-2024-1029-01',
      buyer: 'Hendra Wijaya',
      city: 'Jakarta Selatan',
      craft: 'Kain Tenun Ikat Sumba Antik (2 Lembar)',
      category: 'Tenun & Wastra',
      price: 3600000,
      priceFormatted: 'Rp 3.600.000',
      status: 'shipping', // 'need_pack' | 'shipping' | 'done'
      date: '29 Okt 2024',
      time: '14:30 WITA',
      payment: 'Transfer Bank BCA (Lunas)',
      courier: 'JNE Cargo • JNE-TRK-8821',
      resi: 'JNE-TRK-8821-DPS',
      address: 'Jl. Senopati Dalam No. 22, Kebayoran Baru, Jakarta Selatan',
      routeKey: 'jakarta'
    },
    {
      id: 'INV-2024-1029-02',
      buyer: 'Ibu Maya Kusuma',
      city: 'Surabaya',
      craft: 'Panel Ukir Kayu Jati Pa\'tedong Tongkonan',
      category: 'Kayu & Ukir',
      price: 2450000,
      priceFormatted: 'Rp 2.450.000',
      status: 'shipping',
      date: '30 Okt 2024',
      time: '10:00 WITA',
      payment: 'QRIS Dinamis (Lunas)',
      courier: 'SiCepat Cargo • SIC-EXP-4491',
      resi: 'SIC-EXP-4491-SUB',
      address: 'Jl. Darmo Permai III No. 8, Surabaya, Jawa Timur',
      routeKey: 'surabaya'
    },
    {
      id: 'INV-2024-1031-03',
      buyer: 'Dr. Budi Santoso',
      city: 'Medan',
      craft: 'Keris Luk 7 Brojol Pamor Udan Mas',
      category: 'Pusaka Logam',
      price: 4800000,
      priceFormatted: 'Rp 4.800.000',
      status: 'need_pack',
      date: '31 Okt 2024',
      time: '08:45 WITA',
      payment: 'Kartu Debit Mandiri (Lunas)',
      courier: 'Pos Logistik • POS-CARGO-1092',
      resi: 'POS-CARGO-1092-MDN',
      address: 'Jl. Diponegoro No. 45, Medan Baru, Kota Medan, Sumatera Utara',
      routeKey: 'medan'
    },
    {
      id: 'INV-2024-1031-04',
      buyer: 'Siti Rahmawati',
      city: 'Bandung',
      craft: 'Selendang Songket Silungkang Benang Emas',
      category: 'Tenun & Wastra',
      price: 1850000,
      priceFormatted: 'Rp 1.850.000',
      status: 'need_pack',
      date: '31 Okt 2024',
      time: '10:15 WITA',
      payment: 'BCA Virtual Account (Lunas)',
      courier: 'J&T Express Cargo • JNT-REG-5521',
      resi: 'JNT-REG-5521-BDG',
      address: 'Jl. Riau No. 112, Cibeunying, Kota Bandung, Jawa Barat',
      routeKey: 'jakarta'
    },
    {
      id: 'INV-2024-1025-05',
      buyer: 'Raden Mas Arya',
      city: 'Yogyakarta',
      craft: 'Batik Tulis Tiga Negeri Sutra Alami',
      category: 'Tenun & Wastra',
      price: 5200000,
      priceFormatted: 'Rp 5.200.000',
      status: 'done',
      date: '25 Okt 2024',
      time: '16:00 WITA',
      payment: 'Transfer Bank BNI (Lunas)',
      courier: 'JNE YES • JNE-TRK-7712',
      resi: 'JNE-TRK-7712-YOG',
      address: 'Jl. Malioboro No. 58, Danurejan, Kota Yogyakarta',
      routeKey: 'surabaya'
    },
    {
      id: 'INV-2024-1024-06',
      buyer: 'Annette Dubois',
      city: 'Denpasar',
      craft: 'Topeng Wayang Wong Batuan Pahat Kayu',
      category: 'Kayu & Ukir',
      price: 3100000,
      priceFormatted: 'Rp 3.100.000',
      status: 'done',
      date: '24 Okt 2024',
      time: '11:20 WITA',
      payment: 'Kartu Kredit Visa (Lunas)',
      courier: 'Kurir Kurasi Nusava • LOKAL-DPS-0091',
      resi: 'LOKAL-DPS-0091',
      address: 'Jl. Danau Tamblingan No. 88, Sanur, Denpasar, Bali',
      routeKey: 'surabaya'
    },
    {
      id: 'INV-2024-1023-07',
      buyer: 'Kusuma Wardani',
      city: 'Semarang',
      craft: 'Nampan Anyaman Rotan Motif Dayak Benuaq',
      category: 'Anyaman Rotan',
      price: 950000,
      priceFormatted: 'Rp 950.000',
      status: 'done',
      date: '23 Okt 2024',
      time: '13:10 WITA',
      payment: 'QRIS Nusava (Lunas)',
      courier: 'Pos Kilat Khusus • POS-KILAT-3329',
      resi: 'POS-KILAT-3329',
      address: 'Jl. Pandanaran No. 34, Kota Semarang, Jawa Tengah',
      routeKey: 'surabaya'
    },
    {
      id: 'INV-2024-1022-08',
      buyer: 'Agus Pratama',
      city: 'Makassar',
      craft: 'Songket Palembang Lepus Bintang Halus',
      category: 'Tenun & Wastra',
      price: 6400000,
      priceFormatted: 'Rp 6.400.000',
      status: 'done',
      date: '22 Okt 2024',
      time: '15:40 WITA',
      payment: 'Virtual Account BRI (Lunas)',
      courier: 'TIKI Reguler • TIKI-REG-9912',
      resi: 'TIKI-REG-9912',
      address: 'Jl. Boulevard Panakkukang No. 19, Makassar, Sulawesi Selatan',
      routeKey: 'surabaya'
    }
  ];

  let currentOrderTab = 'all';
  let orderSearchQuery = '';

  function updateOrderBadges() {
    const needPackCount = ARTISAN_ORDERS.filter(o => o.status === 'need_pack').length;
    const shippingCount = ARTISAN_ORDERS.filter(o => o.status === 'shipping').length;
    const doneCount = ARTISAN_ORDERS.filter(o => o.status === 'done').length;

    const elNeedPack = document.getElementById('order-count-need-pack');
    const elShipping = document.getElementById('order-count-shipping');
    const elDone = document.getElementById('order-count-done');

    if (elNeedPack) elNeedPack.textContent = `${needPackCount} Pesanan`;
    if (elShipping) elShipping.textContent = `${shippingCount} Paket`;
    if (elDone) elDone.textContent = `${doneCount} Pesanan`;

    // Also update tab buttons counters
    document.querySelectorAll('.order-tab-btn').forEach(btn => {
      const tab = btn.getAttribute('data-tab');
      if (tab === 'all') btn.textContent = `Semua (${ARTISAN_ORDERS.length})`;
      if (tab === 'need_pack') btn.textContent = `Perlu Dikemas (${needPackCount})`;
      if (tab === 'shipping') btn.textContent = `Sedang Dikirim (${shippingCount})`;
      if (tab === 'done') btn.textContent = `Selesai (${doneCount})`;
    });
  }

  function renderOrdersView() {
    updateOrderBadges();
    const container = document.getElementById('orders-list-container');
    if (!container) return;

    let filtered = ARTISAN_ORDERS;
    if (currentOrderTab !== 'all') {
      filtered = filtered.filter(o => o.status === currentOrderTab);
    }
    if (orderSearchQuery.trim()) {
      const q = orderSearchQuery.toLowerCase();
      filtered = filtered.filter(o => 
        o.id.toLowerCase().includes(q) ||
        o.buyer.toLowerCase().includes(q) ||
        o.craft.toLowerCase().includes(q) ||
        o.city.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="bento-card p-8 text-center space-y-3">
          <div class="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] border border-[#EDE4D5] flex items-center justify-center text-gray-400">
            <i data-lucide="package-x" class="w-6 h-6"></i>
          </div>
          <p class="text-sm font-bold text-[#241B16]">Tidak Ada Pesanan Ditemukan</p>
          <p class="text-xs text-[#6B5E55] max-w-sm mx-auto">Tidak ada pesanan yang sesuai dengan filter atau pencarian Anda saat ini.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(order => {
      let statusBadge = '';
      let actionButtons = '';

      if (order.status === 'need_pack') {
        statusBadge = `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
            <i data-lucide="package-check" class="w-3.5 h-3.5 text-amber-600"></i>
            Perlu Dikemas
          </span>
        `;
        actionButtons = `
          <button type="button" class="order-action-pack px-3.5 py-1.5 bg-[#241B16] hover:bg-[#32251D] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer" data-id="${order.id}">
            <i data-lucide="box" class="w-3.5 h-3.5 text-[#C5A059]"></i>
            Bungkus & Kirim
          </button>
          <button type="button" class="order-action-receipt px-3 py-1.5 bg-white hover:bg-[#FAF7F2] border border-[#EDE4D5] text-[#241B16] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer" data-id="${order.id}">
            <i data-lucide="printer" class="w-3.5 h-3.5 text-gray-500"></i>
            Cetak Label
          </button>
        `;
      } else if (order.status === 'shipping') {
        statusBadge = `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-800 border border-blue-200">
            <i data-lucide="truck" class="w-3.5 h-3.5 text-blue-600"></i>
            Sedang Dikirim
          </span>
        `;
        actionButtons = `
          <button type="button" class="order-action-track px-3.5 py-1.5 bg-[#C88A36] hover:bg-[#B87A28] text-white text-xs font-semibold rounded-lg shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer" data-route="${order.routeKey}">
            <i data-lucide="map-pin" class="w-3.5 h-3.5"></i>
            Lacak Truk di Peta
          </button>
          <button type="button" class="order-action-receipt px-3 py-1.5 bg-white hover:bg-[#FAF7F2] border border-[#EDE4D5] text-[#241B16] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer" data-id="${order.id}">
            <i data-lucide="receipt" class="w-3.5 h-3.5 text-gray-500"></i>
            Lihat Resi
          </button>
        `;
      } else {
        statusBadge = `
          <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
            <i data-lucide="check-circle-2" class="w-3.5 h-3.5 text-emerald-600"></i>
            Pesanan Selesai
          </span>
        `;
        actionButtons = `
          <button type="button" class="order-action-receipt px-3 py-1.5 bg-white hover:bg-[#FAF7F2] border border-[#EDE4D5] text-[#241B16] text-xs font-semibold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer" data-id="${order.id}">
            <i data-lucide="receipt" class="w-3.5 h-3.5 text-gray-500"></i>
            Bukti Resi
          </button>
        `;
      }

      return `
        <div class="bento-card p-4 sm:p-5 transition-all hover:border-[#C5A059] flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div class="space-y-2">
            <div class="flex flex-wrap items-center gap-2">
              <span class="font-mono text-xs font-bold text-[#241B16] bg-[#FAF7F2] border border-[#EDE4D5] px-2.5 py-0.5 rounded">${order.id}</span>
              <span class="text-xs text-[#6B5E55]">• ${order.date}, ${order.time}</span>
              ${statusBadge}
            </div>
            
            <div class="space-y-0.5">
              <h3 class="text-sm font-bold text-[#241B16]">${order.craft}</h3>
              <p class="text-xs text-[#6B5E55] flex flex-wrap items-center gap-x-2">
                <span>Pembeli: <strong class="text-gray-900">${order.buyer}</strong> (${order.city})</span>
                <span>•</span>
                <span>${order.courier}</span>
              </p>
            </div>

            <div class="flex items-center gap-3 text-xs pt-0.5">
              <span class="font-bold text-[#241B16] text-sm">${order.priceFormatted}</span>
              <span class="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[11px] font-semibold">${order.payment}</span>
            </div>
          </div>

          <div class="flex flex-wrap items-center gap-2 pt-2 md:pt-0 border-t md:border-t-0 border-[#EDE4D5]/60 self-start md:self-center">
            ${actionButtons}
          </div>
        </div>
      `;
    }).join('');

    // Re-bind actions
    container.querySelectorAll('.order-action-pack').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.getAttribute('data-id');
        const targetOrder = ARTISAN_ORDERS.find(o => o.id === orderId);
        if (targetOrder) {
          targetOrder.status = 'shipping';
          renderOrdersView();
          showToast(`Pesanan ${orderId} siap dikirim! Kurir ekspedisi sedang menuju studio bengkel.`);
        }
      });
    });

    container.querySelectorAll('.order-action-track').forEach(btn => {
      btn.addEventListener('click', () => {
        const routeKey = btn.getAttribute('data-route') || 'jakarta';
        switchView('logistik');
        selectLogisticsRoute(routeKey);
      });
    });

    container.querySelectorAll('.order-action-receipt').forEach(btn => {
      btn.addEventListener('click', () => {
        const orderId = btn.getAttribute('data-id');
        const targetOrder = ARTISAN_ORDERS.find(o => o.id === orderId);
        if (targetOrder) {
          openReceiptModalWithOrder(targetOrder);
        }
      });
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Filter tabs for orders
  document.querySelectorAll('.order-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.order-tab-btn').forEach(b => {
        b.className = 'order-tab-btn px-3 py-1.5 text-xs font-semibold rounded-md text-[#6B5E55] hover:bg-white transition-colors cursor-pointer';
      });
      btn.className = 'order-tab-btn active px-3 py-1.5 text-xs font-semibold rounded-md bg-[#241B16] text-white shadow-xs transition-colors cursor-pointer';
      currentOrderTab = btn.getAttribute('data-tab') || 'all';
      renderOrdersView();
    });
  });

  // Search input for orders
  document.getElementById('order-search-input')?.addEventListener('input', (e) => {
    orderSearchQuery = e.target.value;
    renderOrdersView();
  });

  // =========================================================================
  // 16. DAFTAR PEMBELI & KOLEKTOR ENGINE
  // =========================================================================
  const ARTISAN_BUYERS = [
    {
      id: 'BUY-01',
      name: 'Hendra Wijaya',
      initials: 'HW',
      city: 'Jakarta Selatan',
      province: 'DKI Jakarta',
      role: 'Kolektor Senior Kain Tradisional',
      totalSpent: 'Rp 18.400.000',
      orderCount: '5 Pesanan',
      favorite: 'Tenun Ikat Sumba & Songket',
      lastOrder: '29 Okt 2024',
      phone: '0811-2345-8891'
    },
    {
      id: 'BUY-02',
      name: 'Ibu Maya Kusuma',
      initials: 'MK',
      city: 'Surabaya',
      province: 'Jawa Timur',
      role: 'Kurator Galeri Interior & Seni Ukir',
      totalSpent: 'Rp 12.850.000',
      orderCount: '4 Pesanan',
      favorite: 'Panel Kayu Pahat Toraja',
      lastOrder: '30 Okt 2024',
      phone: '0813-8890-4412'
    },
    {
      id: 'BUY-03',
      name: 'Dr. Budi Santoso',
      initials: 'BS',
      city: 'Medan',
      province: 'Sumatera Utara',
      role: 'Peminat Pusaka & Bilah Logam',
      totalSpent: 'Rp 9.600.000',
      orderCount: '2 Pesanan',
      favorite: 'Keris Luk 7 & Pamor Sepuh',
      lastOrder: '31 Okt 2024',
      phone: '0812-7711-9034'
    },
    {
      id: 'BUY-04',
      name: 'Raden Mas Arya',
      initials: 'RA',
      city: 'Yogyakarta',
      province: 'D.I. Yogyakarta',
      role: 'Pecinta Batik Klasik Kraton',
      totalSpent: 'Rp 15.200.000',
      orderCount: '3 Pesanan',
      favorite: 'Batik Tulis Sutra Alami',
      lastOrder: '25 Okt 2024',
      phone: '0817-4455-1123'
    },
    {
      id: 'BUY-05',
      name: 'Siti Rahmawati',
      initials: 'SR',
      city: 'Bandung',
      province: 'Jawa Barat',
      role: 'Pencinta Kain Etnik & Busana Adat',
      totalSpent: 'Rp 4.700.000',
      orderCount: '2 Pesanan',
      favorite: 'Songket Silungkang Benang Emas',
      lastOrder: '31 Okt 2024',
      phone: '0821-3322-8876'
    },
    {
      id: 'BUY-06',
      name: 'Annette Dubois',
      initials: 'AD',
      city: 'Denpasar',
      province: 'Bali',
      role: 'Kolektor Galeri Internasional',
      totalSpent: 'Rp 21.500.000',
      orderCount: '6 Pesanan',
      favorite: 'Topeng Batuan & Seni Wayang',
      lastOrder: '24 Okt 2024',
      phone: '0819-9988-3344'
    }
  ];

  let currentBuyerCity = 'all';
  let buyerSearchQuery = '';

  function renderBuyersView() {
    const container = document.getElementById('buyers-grid-container');
    if (!container) return;

    let filtered = ARTISAN_BUYERS;
    if (currentBuyerCity !== 'all') {
      filtered = filtered.filter(b => b.city.toLowerCase().includes(currentBuyerCity.toLowerCase()));
    }
    if (buyerSearchQuery.trim()) {
      const q = buyerSearchQuery.toLowerCase();
      filtered = filtered.filter(b => 
        b.name.toLowerCase().includes(q) ||
        b.city.toLowerCase().includes(q) ||
        b.favorite.toLowerCase().includes(q)
      );
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div class="col-span-full bento-card p-8 text-center space-y-3">
          <div class="w-12 h-12 mx-auto rounded-full bg-[#FAF7F2] border border-[#EDE4D5] flex items-center justify-center text-gray-400">
            <i data-lucide="user-x" class="w-6 h-6"></i>
          </div>
          <p class="text-sm font-bold text-[#241B16]">Tidak Ada Pembeli Ditemukan</p>
          <p class="text-xs text-[#6B5E55] max-w-sm mx-auto">Coba ganti kata kunci pencarian atau pilih semua kota.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = filtered.map(buyer => `
      <div class="bento-card p-5 space-y-4 hover:border-[#C5A059] transition-all flex flex-col justify-between">
        <div class="space-y-3">
          <!-- Top Row: Avatar & Details -->
          <div class="flex items-start gap-3">
            <div class="w-11 h-11 rounded-full bg-[#241B16] text-[#C5A059] font-bold text-sm flex items-center justify-center flex-shrink-0 border border-[#C5A059]/40 shadow-xs">
              ${buyer.initials}
            </div>
            <div class="min-w-0 flex-1">
              <h3 class="text-sm font-bold text-[#241B16] truncate">${buyer.name}</h3>
              <p class="text-[11px] text-[#C88A36] font-semibold">${buyer.role}</p>
              <p class="text-xs text-[#6B5E55] flex items-center gap-1 mt-0.5">
                <i data-lucide="map-pin" class="w-3 h-3 text-gray-400"></i>
                <span>${buyer.city}, ${buyer.province}</span>
              </p>
            </div>
          </div>

          <!-- Stats Box -->
          <div class="p-3 bg-[#FAF7F2] border border-[#EDE4D5] rounded-xl grid grid-cols-2 gap-2 text-xs">
            <div>
              <span class="text-[10px] text-gray-500 block">Total Belanja:</span>
              <span class="font-bold text-[#241B16] text-[13px]">${buyer.totalSpent}</span>
            </div>
            <div>
              <span class="text-[10px] text-gray-500 block">Transaksi:</span>
              <span class="font-bold text-gray-800 text-[13px]">${buyer.orderCount}</span>
            </div>
          </div>

          <!-- Favorite -->
          <div class="text-xs">
            <span class="text-[11px] text-[#6B5E55]">Minat Seni:</span>
            <p class="font-semibold text-gray-800 text-[11px] mt-0.5">${buyer.favorite}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="pt-3 border-t border-[#EDE4D5]/60 flex items-center gap-2">
          <button type="button" class="buyer-contact-btn flex-1 py-1.5 px-2 bg-white hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-200 border border-[#EDE4D5] text-[#241B16] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer" data-name="${buyer.name}" data-phone="${buyer.phone}">
            <i data-lucide="message-square" class="w-3.5 h-3.5 text-emerald-600"></i>
            <span>WhatsApp</span>
          </button>
          <button type="button" class="buyer-history-btn flex-1 py-1.5 px-2 bg-white hover:bg-[#FAF7F2] border border-[#EDE4D5] text-[#6B5E55] text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer" data-name="${buyer.name}">
            <span>Riwayat</span>
          </button>
        </div>
      </div>
    `).join('');

    container.querySelectorAll('.buyer-contact-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        const phone = btn.getAttribute('data-phone');
        showToast(`Membuka obrolan WhatsApp dengan ${name} (${phone})...`);
      });
    });

    container.querySelectorAll('.buyer-history-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const name = btn.getAttribute('data-name');
        showToast(`Menampilkan riwayat pesanan khusus untuk ${name}.`);
      });
    });

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Filter City and Search for Buyers
  document.getElementById('buyer-city-filter')?.addEventListener('change', (e) => {
    currentBuyerCity = e.target.value;
    renderBuyersView();
  });

  document.getElementById('buyer-search-input')?.addEventListener('input', (e) => {
    buyerSearchQuery = e.target.value;
    renderBuyersView();
  });

  // =========================================================================
  // 17. LAPORAN PENJUALAN TOKO (CSV EXPORT & GRAFIK BESAR MENDETAIL)
  // =========================================================================
  document.getElementById('download-report-btn')?.addEventListener('click', () => {
    const csvContent = [
      'Bulan,Kategori Kerajinan,Produk Terlaris,Jumlah Transaksi,Total Pemasukan Kotor (IDR),Estimasi Keuntungan Bersih (IDR)',
      'Oktober 2024,Kain Tenun & Wastra,Tenun Ikat Sumba Antik,6,20280000,16224000',
      'Oktober 2024,Kerajinan Kayu & Ukir,Panel Pahat Tongkonan,5,14970000,11976000',
      'Oktober 2024,Pusaka Logam & Keris,Keris Luk 7 Brojol Pamor,3,9600000,7680000',
      'Oktober 2024,Anyaman Serat Alam,Nampan Anyaman Rotan Dayak,4,3440000,2752000',
      'TOTAL REKAP 2024,Semua Kategori,18 Transaksi Berhasil,18,48290000,38632000'
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'Laporan-Penjualan-Nusava-Studio-Gianyar-2024.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Laporan penjualan toko berhasil diunduh dalam format CSV.');
  });

  const DETAILED_ANALYTICS_DATA = {
    '6m': {
      labels: ['Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt'],
      fullMonths: ['Mei 2024', 'Juni 2024', 'Juli 2024', 'Agustus 2024', 'September 2024', 'Oktober 2024'],
      revenue: [27500000, 31200000, 36800000, 39400000, 42600000, 48290000],
      profit: [21450000, 24336000, 29440000, 31520000, 34080000, 38632000],
      expenses: [6050000, 6864000, 7360000, 7880000, 8520000, 9658000],
      orders: [12, 13, 14, 15, 16, 18],
      topItems: [
        'Songket Silungkang',
        'Topeng Wayang Wong',
        'Keris Luk 7 Brojol',
        'Nampan Anyaman Rotan',
        'Panel Pahat Pa\'tedong',
        'Tenun Ikat Sumba Antik'
      ],
      avgRevenue: 'Rp 37.631.000',
      avgProfit: 'Rp 29.909.000',
      peakMonth: 'Oktober 2024'
    },
    '1y': {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Ags', 'Sep', 'Okt', 'Nov', 'Des'],
      fullMonths: [
        'Januari 2024', 'Februari 2024', 'Maret 2024', 'April 2024',
        'Mei 2024', 'Juni 2024', 'Juli 2024', 'Agustus 2024',
        'September 2024', 'Oktober 2024', 'November 2024 (Est)', 'Desember 2024 (Est)'
      ],
      revenue: [18500000, 21000000, 24800000, 26200000, 27500000, 31200000, 36800000, 39400000, 42600000, 48290000, 51000000, 56000000],
      profit: [14430000, 16380000, 19344000, 20436000, 21450000, 24336000, 29440000, 31520000, 34080000, 38632000, 40800000, 44800000],
      expenses: [4070000, 4620000, 5456000, 5764000, 6050000, 6864000, 7360000, 7880000, 8520000, 9658000, 10200000, 11200000],
      orders: [8, 9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22],
      topItems: [
        'Batik Tulis Madura', 'Topeng Kayu Jati', 'Keris Singo Barong', 'Anyaman Pandan',
        'Songket Silungkang', 'Topeng Wayang Wong', 'Keris Luk 7 Brojol', 'Nampan Anyaman Rotan',
        'Panel Pahat Pa\'tedong', 'Tenun Ikat Sumba Antik', 'Songket Palembang', 'Batik Tulis Keraton'
      ],
      avgRevenue: 'Rp 35.274.000',
      avgProfit: 'Rp 27.994.000',
      peakMonth: 'Desember 2024 (Proyeksi)'
    },
    'triwulan': {
      labels: ['Kuartal I', 'Kuartal II', 'Kuartal III', 'Kuartal IV (Est)'],
      fullMonths: ['Kuartal I (Jan-Mar)', 'Kuartal II (Apr-Jun)', 'Kuartal III (Jul-Sep)', 'Kuartal IV (Okt-Des)'],
      revenue: [64300000, 84900000, 118800000, 155290000],
      profit: [50154000, 66222000, 95040000, 124232000],
      expenses: [14146000, 18678000, 23760000, 31058000],
      orders: [27, 36, 45, 60],
      topItems: [
        'Keris Singo Barong',
        'Topeng Wayang Wong',
        'Panel Pahat Pa\'tedong',
        'Tenun Ikat Sumba Antik'
      ],
      avgRevenue: 'Rp 105.822.000',
      avgProfit: 'Rp 83.912.000',
      peakMonth: 'Kuartal IV (Akhir Tahun)'
    }
  };

  let currentDetailedPeriod = '6m';

  function renderDetailedAnalyticsChart(periodKey = '6m') {
    const container = document.getElementById('detailed-analytics-chart-container');
    const tooltip = document.getElementById('detailed-chart-tooltip');
    if (!container) return;

    if (tooltip) {
      tooltip.classList.remove('visible');
      tooltip.style.opacity = '0';
    }

    const data = DETAILED_ANALYTICS_DATA[periodKey];
    if (!data) return;

    // Update KPI badges in view-analitik
    const elAvgRev = document.getElementById('detailed-avg-revenue');
    const elAvgProf = document.getElementById('detailed-avg-profit');
    const elPeak = document.getElementById('detailed-peak-month');
    if (elAvgRev) elAvgRev.textContent = data.avgRevenue;
    if (elAvgProf) elAvgProf.textContent = data.avgProfit;
    if (elPeak) elPeak.textContent = data.peakMonth;

    const width = container.clientWidth || 800;
    const height = 300;
    const paddingLeft = 65;
    const paddingRight = 35;
    const paddingTop = 30;
    const paddingBottom = 45;

    const chartWidth = width - paddingLeft - paddingRight;
    const chartHeight = height - paddingTop - paddingBottom;

    const allValues = [...data.revenue, ...data.profit];
    const minVal = Math.min(...allValues) * 0.75;
    const maxVal = Math.max(...allValues) * 1.15;

    // Helper to calculate X and Y
    const getX = (i) => paddingLeft + (i / (data.labels.length - 1)) * chartWidth;
    const getY = (val) => paddingTop + chartHeight - ((val - minVal) / (maxVal - minVal)) * chartHeight;

    const revPoints = data.revenue.map((v, i) => ({ x: getX(i), y: getY(v), val: v }));
    const profPoints = data.profit.map((v, i) => ({ x: getX(i), y: getY(v), val: v }));

    // Build Cubic Bezier line for Revenue
    let revPathD = `M ${revPoints[0].x} ${revPoints[0].y}`;
    for (let i = 0; i < revPoints.length - 1; i++) {
      const p0 = revPoints[i];
      const p1 = revPoints[i + 1];
      const cx1 = p0.x + (p1.x - p0.x) * 0.45;
      const cy1 = p0.y;
      const cx2 = p0.x + (p1.x - p0.x) * 0.55;
      const cy2 = p1.y;
      revPathD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }

    // Build Cubic Bezier line for Profit
    let profPathD = `M ${profPoints[0].x} ${profPoints[0].y}`;
    for (let i = 0; i < profPoints.length - 1; i++) {
      const p0 = profPoints[i];
      const p1 = profPoints[i + 1];
      const cx1 = p0.x + (p1.x - p0.x) * 0.45;
      const cy1 = p0.y;
      const cx2 = p0.x + (p1.x - p0.x) * 0.55;
      const cy2 = p1.y;
      profPathD += ` C ${cx1} ${cy1}, ${cx2} ${cy2}, ${p1.x} ${p1.y}`;
    }

    const lastX = revPoints[revPoints.length - 1].x;
    const firstX = revPoints[0].x;
    const bottomY = paddingTop + chartHeight;
    const revAreaD = `${revPathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
    const profAreaD = `${profPathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;

    // Target threshold line
    const targetVal = periodKey === 'triwulan' ? 80000000 : 30000000;
    const targetY = getY(targetVal);

    // Horizontal Grid Lines
    const gridRows = 5;
    let gridLinesSvg = '';
    for (let r = 0; r <= gridRows; r++) {
      const gY = paddingTop + (chartHeight / gridRows) * r;
      const valAtGrid = maxVal - (r / gridRows) * (maxVal - minVal);
      const labelRp = (valAtGrid / 1000000).toFixed(0) + ' Jt';
      gridLinesSvg += `
        <line x1="${paddingLeft}" y1="${gY}" x2="${width - paddingRight}" y2="${gY}" stroke="#EDE4D5" stroke-dasharray="3 3" />
        <text x="${paddingLeft - 10}" y="${gY + 4}" text-anchor="end" fill="#8C7D73" font-size="10" font-family="sans-serif">${labelRp}</text>
      `;
    }

    // X-Axis Month Labels
    let xAxisSvg = '';
    data.labels.forEach((label, i) => {
      const x = getX(i);
      xAxisSvg += `
        <text x="${x}" y="${bottomY + 22}" text-anchor="middle" fill="#6B5E55" font-size="11" font-weight="600" font-family="sans-serif">${label}</text>
      `;
    });

    // Target Line SVG
    const targetLineSvg = `
      <line x1="${paddingLeft}" y1="${targetY}" x2="${width - paddingRight}" y2="${targetY}" stroke="#A89F91" stroke-width="1.5" stroke-dasharray="5 4" opacity="0.8" />
    `;

    // Interactive Points and Hover Columns
    let pointsSvg = '';
    let hoverColsSvg = '';
    const colWidth = chartWidth / data.labels.length;

    data.labels.forEach((label, i) => {
      const revP = revPoints[i];
      const profP = profPoints[i];
      const colX = revP.x - colWidth / 2;

      // Revenue dot (Gold)
      pointsSvg += `
        <circle cx="${revP.x}" cy="${revP.y}" r="4.5" fill="#C88A36" stroke="#FFFFFF" stroke-width="2" class="detailed-point" data-idx="${i}" />
      `;

      // Profit dot (Emerald)
      pointsSvg += `
        <circle cx="${profP.x}" cy="${profP.y}" r="4" fill="#059669" stroke="#FFFFFF" stroke-width="2" class="detailed-point" data-idx="${i}" />
      `;

      // Invisible overlay rect for effortless hover
      hoverColsSvg += `
        <rect x="${colX}" y="${paddingTop}" width="${colWidth}" height="${chartHeight}" fill="transparent" class="detailed-hover-col cursor-pointer" data-idx="${i}" />
      `;
    });

    // Assemble SVG
    container.innerHTML = `
      <svg width="100%" height="100%" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" style="overflow: visible;">
        <defs>
          <linearGradient id="detailedGoldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#C88A36" stop-opacity="0.25" />
            <stop offset="100%" stop-color="#C88A36" stop-opacity="0.0" />
          </linearGradient>
          <linearGradient id="detailedEmeraldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="#10B981" stop-opacity="0.20" />
            <stop offset="100%" stop-color="#10B981" stop-opacity="0.0" />
          </linearGradient>
        </defs>

        <!-- Grid Lines -->
        ${gridLinesSvg}

        <!-- Target Line -->
        ${targetLineSvg}

        <!-- X Axis Labels -->
        ${xAxisSvg}

        <!-- Revenue Area & Line -->
        <path d="${revAreaD}" fill="url(#detailedGoldGrad)" />
        <path d="${revPathD}" fill="none" stroke="#C88A36" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Profit Area & Line -->
        <path d="${profAreaD}" fill="url(#detailedEmeraldGrad)" />
        <path d="${profPathD}" fill="none" stroke="#059669" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />

        <!-- Vertical Hover Bar -->
        <line id="detailed-hover-bar" x1="0" y1="${paddingTop}" x2="0" y2="${bottomY}" stroke="#241B16" stroke-width="1.5" stroke-dasharray="3 3" opacity="0" pointer-events="none" />

        <!-- Points -->
        ${pointsSvg}

        <!-- Hover Columns -->
        ${hoverColsSvg}
      </svg>
    `;

    // Tooltip interactions
    const hoverBar = document.getElementById('detailed-hover-bar');
    const cols = container.querySelectorAll('.detailed-hover-col');

    cols.forEach(col => {
      col.addEventListener('mouseenter', () => {
        const idx = parseInt(col.getAttribute('data-idx'), 10);
        const revP = revPoints[idx];
        const monthFull = data.fullMonths[idx];
        const revFormatted = 'Rp ' + data.revenue[idx].toLocaleString('id-ID');
        const profFormatted = 'Rp ' + data.profit[idx].toLocaleString('id-ID');
        const expFormatted = 'Rp ' + data.expenses[idx].toLocaleString('id-ID');
        const orderCount = data.orders[idx];
        const topItem = data.topItems[idx];

        // Move hover bar
        if (hoverBar) {
          hoverBar.setAttribute('x1', revP.x);
          hoverBar.setAttribute('x2', revP.x);
          hoverBar.setAttribute('opacity', '0.6');
        }

        // Show Tooltip
        if (tooltip) {
          tooltip.innerHTML = `
            <div class="space-y-1.5 font-sans">
              <div class="flex items-center justify-between border-b border-white/20 pb-1 gap-4">
                <span class="font-bold text-[#F5EFE6] text-xs">${monthFull}</span>
                <span class="text-[10px] text-emerald-300 font-semibold">${orderCount} Pesanan Selesai</span>
              </div>
              <div class="space-y-1 text-[11px]">
                <div class="flex items-center justify-between gap-4">
                  <span class="text-[#C5A059] flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-[#C88A36]"></span> Omset Kotor:
                  </span>
                  <strong class="text-white">${revFormatted}</strong>
                </div>
                <div class="flex items-center justify-between gap-4">
                  <span class="text-emerald-400 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span> Untung Bersih:
                  </span>
                  <strong class="text-emerald-300">${profFormatted}</strong>
                </div>
                <div class="flex items-center justify-between gap-4">
                  <span class="text-gray-400 flex items-center gap-1">
                    <span class="w-2 h-2 rounded-full bg-gray-400"></span> Biaya Bahan:
                  </span>
                  <span class="text-gray-300">${expFormatted}</span>
                </div>
              </div>
              <div class="pt-1 border-t border-white/10 text-[10px] text-gray-300">
                <span>Karya Terlaris: </span>
                <strong class="text-[#F5EFE6]">${topItem}</strong>
              </div>
            </div>
          `;

          // Position Tooltip
          const rect = container.getBoundingClientRect();
          const targetX = (revP.x / width) * rect.width;
          const targetY = (revP.y / height) * rect.height;

          tooltip.style.left = `${targetX}px`;
          tooltip.style.top = `${targetY}px`;
          tooltip.classList.add('visible');
        }
      });

      col.addEventListener('mouseleave', () => {
        if (hoverBar) hoverBar.setAttribute('opacity', '0');
        if (tooltip) {
          tooltip.classList.remove('visible');
          tooltip.style.opacity = '0';
        }
      });
    });

    container.addEventListener('mouseleave', () => {
      const bars = container.querySelectorAll('.detailed-chart-hover-bar');
      bars.forEach(b => b.setAttribute('opacity', '0'));
      if (tooltip) {
        tooltip.classList.remove('visible');
        tooltip.style.opacity = '0';
      }
    });
  }

  // Period switchers for detailed chart
  document.querySelectorAll('.detailed-period-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.detailed-period-btn').forEach(b => {
        b.className = 'detailed-period-btn px-3 py-1.5 text-xs font-semibold rounded-md text-[#6B5E55] hover:bg-white transition-colors cursor-pointer';
      });
      btn.className = 'detailed-period-btn active px-3 py-1.5 text-xs font-semibold rounded-md bg-[#241B16] text-white shadow-xs transition-colors cursor-pointer';
      currentDetailedPeriod = btn.getAttribute('data-detailed-period') || '6m';
      renderDetailedAnalyticsChart(currentDetailedPeriod);
    });
  });

  // =========================================================================
  // 18. PENGIRIMAN PAKET & ANIMASI TRUK PETA LOGISTIK
  // =========================================================================
  const LOGISTICS_ROUTES = {
    jakarta: {
      name: 'Rute Gianyar → Jakarta Selatan',
      buyer: 'Hendra Wijaya',
      address: 'Jl. Senopati Dalam No. 22, Kebayoran Baru, Jakarta Selatan',
      craft: 'Kain Tenun Ikat Sumba (2 Lembar)',
      resi: 'JNE-TRK-8821-DPS',
      courier: 'JNE Cargo Jalur Darat & Laut',
      cost: 'Rp 65.000 (Lunas)',
      title: 'Paket Tenun Sumba (JNE-TRK-8821) — Sedang Menuju Jakarta',
      subtitle: 'Truk melewati Jalur Tol Trans-Jawa menuju Gudang Distribusi Cilandak',
      pathD: 'M 348.5 280.5 Q 282 245, 216 246',
      destPos: { left: '27.5%', top: '68.4%' },
      destLabel: 'Tujuan: Jakarta Selatan',
      truckClass: 'truck-anim-jakarta',
      truckStatus: 'Truk JNE Cargo • Di Jalan',
      timelineTitle: 'Riwayat Perjalanan Paket (Tenun Sumba)',
      timelineResi: 'Resi: JNE-TRK-8821 • Ekspedisi Darat & Laut',
      steps: [
        {
          done: true,
          icon: 'check',
          title: 'Paket Dijemput Kurir dari Studio Bengkel',
          desc: 'Kurir JNE Gianyar mengambil produk tenun yang sudah dibungkus rapi dengan pelindung gelembung.',
          time: '29 Oktober 2024 • 14:30 WITA'
        },
        {
          done: true,
          icon: 'check',
          title: 'Lolos Pemeriksaan Segel & Menyeberang Selat Bali',
          desc: 'Truk logistik menaiki kapal feri dari Pelabuhan Gilimanuk menuju Pelabuhan Ketapang Banyuwangi.',
          time: '30 Oktober 2024 • 09:15 WIB'
        },
        {
          active: true,
          icon: 'truck',
          title: 'Sedang Melintasi Jalur Tol Menuju Gudang Jakarta (Posisi Truk Terkini)',
          desc: 'Truk kontainer ekspedisi terpantau aman dan bergerak lancar di Tol Trans-Jawa km 312.',
          time: '31 Oktober 2024 • 11:45 WIB (Terakhir Diperbarui)'
        },
        {
          upcoming: true,
          icon: 'clock',
          title: 'Tiba di Hub Transit Jakarta & Pengantaran ke Rumah Pembeli',
          desc: 'Paket akan diserahkan kurir langsung ke tangan Hendra Wijaya di Jakarta Selatan.',
          time: 'Estimasi Tiba: Besok, 1 November 2024 • Siang'
        }
      ]
    },
    surabaya: {
      name: 'Rute Gianyar → Surabaya',
      buyer: 'Ibu Maya Kusuma',
      address: 'Jl. Darmo Permai III No. 8, Surabaya, Jawa Timur',
      craft: 'Panel Ukir Kayu Jati Pa\'tedong Tongkonan',
      resi: 'SIC-EXP-4491-SUB',
      courier: 'SiCepat Cargo Darat',
      cost: 'Rp 85.000 (Lunas)',
      title: 'Paket Panel Pahat (SIC-EXP-4491) — Menuju Surabaya',
      subtitle: 'Truk ekspedisi telah menyeberang Ketapang dan melaju di Tol Pasuruan Menuju Surabaya',
      pathD: 'M 348.5 280.5 Q 332 268, 314 261',
      destPos: { left: '40%', top: '72.4%' },
      destLabel: 'Tujuan: Surabaya',
      truckClass: 'truck-anim-surabaya',
      truckStatus: 'SiCepat Cargo • Di Tol Surabaya',
      timelineTitle: 'Riwayat Perjalanan Paket (Panel Pahat)',
      timelineResi: 'Resi: SIC-EXP-4491 • Ekspedisi Truk Kargo',
      steps: [
        {
          done: true,
          icon: 'check',
          title: 'Paket Dijemput Kurir dari Bengkel Gianyar',
          desc: 'Panel ukir kayu dikemas dengan peti palet kayu pelindung khusus anti benturan.',
          time: '30 Oktober 2024 • 10:00 WITA'
        },
        {
          done: true,
          icon: 'check',
          title: 'Menyeberang Selat Bali via Feri Gilimanuk-Ketapang',
          desc: 'Armada logistik mendarat di Ketapang dan langsung masuk gerbang tol Jawa Timur.',
          time: '30 Oktober 2024 • 16:30 WIB'
        },
        {
          active: true,
          icon: 'truck',
          title: 'Truk Bergerak di Tol Pasuruan Menuju Gudang Rungkut Surabaya (Posisi Truk Terkini)',
          desc: 'Truk mendekati pintu tol Waru Surabaya dalam kondisi cuaca cerah dan kecepatan normal.',
          time: '31 Oktober 2024 • 14:20 WIB (Terakhir Diperbarui)'
        },
        {
          upcoming: true,
          icon: 'clock',
          title: 'Kurir Lokal Mengantar ke Alamat Rumah Pembeli',
          desc: 'Kurir SiCepat mengantarkan ke Ibu Maya Kusuma di Jl. Darmo Permai Surabaya.',
          time: 'Estimasi Tiba: Hari ini, 31 Oktober 2024 • 18:30 WIB'
        }
      ]
    },
    medan: {
      name: 'Rute Gianyar → Medan',
      buyer: 'Dr. Budi Santoso',
      address: 'Jl. Diponegoro No. 45, Medan Baru, Kota Medan, Sumatera Utara',
      craft: 'Keris Luk 7 Brojol Pamor Udan Mas',
      resi: 'POS-CARGO-1092-MDN',
      courier: 'Pos Logistik Nusantara',
      cost: 'Rp 120.000 (Lunas)',
      title: 'Paket Keris Luk 7 (POS-CARGO-1092) — Menuju Medan',
      subtitle: 'Paket transit penerbangan kargo laut & darat ekspedisi lintas pulau Sumatera',
      pathD: 'M 348.5 280.5 Q 230 180, 109 95',
      destPos: { left: '13.8%', top: '26.3%' },
      destLabel: 'Tujuan: Medan',
      truckClass: 'truck-anim-medan',
      truckStatus: 'Pos Logistik • Lintas Sumatera',
      timelineTitle: 'Riwayat Perjalanan Paket (Keris Luk 7)',
      timelineResi: 'Resi: POS-CARGO-1092 • Ekspedisi Pos Nusantara',
      steps: [
        {
          done: true,
          icon: 'check',
          title: 'Paket Diinspeksi Segel Adat & Asuransi di Gianyar',
          desc: 'Pusaka keris dikemas dengan kotak beludru pelindung tebal dan sertifikat keaslian fisik.',
          time: '28 Oktober 2024 • 11:00 WITA'
        },
        {
          done: true,
          icon: 'check',
          title: 'Transit di Hub Logistik Kargo Utama Jakarta',
          desc: 'Paket lolos x-ray kargo bandara dan diteruskan ke armada kargo rute Sumatera.',
          time: '29 Oktober 2024 • 21:00 WIB'
        },
        {
          active: true,
          icon: 'truck',
          title: 'Armada Logistik Bergerak Menuju Pelabuhan Belawan Medan (Posisi Truk Terkini)',
          desc: 'Paket sedang dalam perjalanan jalur laut dan truk distribusi Sumatera Utara.',
          time: '31 Oktober 2024 • 08:30 WIB (Terakhir Diperbarui)'
        },
        {
          upcoming: true,
          icon: 'clock',
          title: 'Sortir Akhir di Kantor Pos Medan & Pengantaran Khusus',
          desc: 'Petugas pos mengantarkan paket berharga ke alamat Dr. Budi Santoso di Medan Baru.',
          time: 'Estimasi Tiba: 2 November 2024 • Siang'
        }
      ]
    }
  };

  let currentLogisticsRouteKey = 'jakarta';

  function selectLogisticsRoute(routeKey) {
    if (!LOGISTICS_ROUTES[routeKey]) routeKey = 'jakarta';
    currentLogisticsRouteKey = routeKey;
    const route = LOGISTICS_ROUTES[routeKey];

    // 1. Update route buttons UI
    document.querySelectorAll('.logistics-route-btn').forEach(btn => {
      const r = btn.getAttribute('data-route');
      if (r === routeKey) {
        btn.className = 'logistics-route-btn active px-3 py-1.5 text-xs font-semibold rounded-md bg-[#241B16] text-white shadow-xs transition-colors cursor-pointer';
      } else {
        btn.className = 'logistics-route-btn px-3 py-1.5 text-xs font-semibold rounded-md text-[#6B5E55] hover:bg-white transition-colors cursor-pointer';
      }
    });

    // 2. Update active shipment cards in left list
    document.querySelectorAll('.shipping-card-item').forEach(card => {
      const cardRoute = card.getAttribute('data-route');
      if (cardRoute === routeKey) {
        card.className = 'shipping-card-item active p-3.5 rounded-xl border-2 border-[#C88A36] bg-[#FFFDF9] cursor-pointer shadow-xs transition-all space-y-1.5';
      } else {
        card.className = 'shipping-card-item p-3.5 rounded-xl border border-[#EDE4D5] bg-white hover:bg-[#FAF7F2] cursor-pointer transition-all space-y-1.5';
      }
    });

    // 3. Update SVG Path
    const svgPath = document.getElementById('active-logistics-svg-path');
    if (svgPath) {
      svgPath.setAttribute('d', route.pathD);
    }

    // 4. Update Destination Beacon
    const destDot = document.getElementById('destination-hub-dot');
    const destLabel = document.getElementById('destination-hub-label');
    if (destDot) {
      destDot.style.left = route.destPos.left;
      destDot.style.top = route.destPos.top;
      destDot.title = `Tujuan: ${route.destLabel} (${route.buyer})`;
    }
    if (destLabel) {
      destLabel.textContent = route.destLabel;
    }

    // 5. Update Animated Truck Marker
    const truckBadge = document.getElementById('active-truck-badge');
    const truckStatus = document.getElementById('truck-status-text');
    if (truckBadge) {
      truckBadge.className = `truck-marker-wrap ${route.truckClass}`;
      truckBadge.setAttribute('title', route.truckStatus);
    }
    if (truckStatus) {
      truckStatus.textContent = route.truckStatus;
    }

    // 6. Update Live Route Title & Subtitle banner
    const liveTitle = document.getElementById('live-route-title');
    const liveSub = document.getElementById('live-route-subtitle');
    if (liveTitle) liveTitle.textContent = route.title;
    if (liveSub) liveSub.textContent = route.subtitle;

    // 7. Update Timeline Header
    const timeTitle = document.getElementById('timeline-detail-title');
    const timeResi = document.getElementById('timeline-detail-resi');
    if (timeTitle) timeTitle.textContent = route.timelineTitle;
    if (timeResi) timeResi.textContent = route.timelineResi;

    // 8. Render Timeline Steps
    const stepsContainer = document.getElementById('timeline-steps-container');
    if (stepsContainer) {
      stepsContainer.innerHTML = route.steps.map((st, idx) => {
        const isLast = idx === route.steps.length - 1;
        let iconHtml = '';
        let titleColor = 'text-gray-900';
        let badgeBg = 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500';

        if (st.done) {
          iconHtml = `<i data-lucide="check" class="w-3 h-3 text-emerald-800"></i>`;
          badgeBg = 'bg-emerald-100 text-emerald-800 border-2 border-emerald-500';
        } else if (st.active) {
          iconHtml = `<i data-lucide="truck" class="w-3 h-3 text-amber-800 animate-pulse"></i>`;
          badgeBg = 'bg-amber-100 text-amber-800 border-2 border-amber-500';
          titleColor = 'text-amber-900 font-bold';
        } else {
          iconHtml = `<i data-lucide="clock" class="w-3 h-3 text-gray-500"></i>`;
          badgeBg = 'bg-gray-100 text-gray-600 border-2 border-gray-300';
          titleColor = 'text-gray-600';
        }

        return `
          <div class="relative pl-7 timeline-step-item">
            ${!isLast ? '<div class="timeline-step-line"></div>' : ''}
            <span class="absolute left-0 top-0.5 w-5 h-5 rounded-full ${badgeBg} flex items-center justify-center text-[10px]">
              ${iconHtml}
            </span>
            <div class="space-y-0.5">
              <p class="text-xs font-bold ${titleColor}">${st.title}</p>
              <p class="text-[11px] text-[#6B5E55] mt-0.5">${st.desc}</p>
              <p class="text-[10px] ${st.active ? 'text-amber-700 font-semibold' : 'text-gray-400'} mt-1">${st.time}</p>
            </div>
          </div>
        `;
      }).join('');
    }

    if (window.lucide) {
      lucide.createIcons();
    }
  }

  // Bind route buttons
  document.querySelectorAll('.logistics-route-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const routeKey = btn.getAttribute('data-route');
      selectLogisticsRoute(routeKey);
      showToast(`Menampilkan ${LOGISTICS_ROUTES[routeKey]?.name || 'rute ekspedisi'}`);
    });
  });

  // Bind package cards
  document.querySelectorAll('.shipping-card-item').forEach(card => {
    card.addEventListener('click', () => {
      const routeKey = card.getAttribute('data-route');
      if (routeKey) {
        selectLogisticsRoute(routeKey);
      }
    });
  });

  // Copy tracking resi helper
  window.copyTrackingResi = function(resiToCopy) {
    const resi = resiToCopy || LOGISTICS_ROUTES[currentLogisticsRouteKey]?.resi || 'JNE-TRK-8821-DPS';
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(resi).then(() => {
        showToast(`Nomor resi ${resi} berhasil disalin ke papan klip!`);
      }).catch(() => {
        showToast(`Nomor resi: ${resi}`);
      });
    } else {
      showToast(`Nomor resi: ${resi}`);
    }
  };

  // =========================================================================
  // 19. MODAL RESI & CETAK ALAMAT PENGIRIMAN
  // =========================================================================
  const receiptModalBackdrop = document.getElementById('receipt-modal-backdrop');
  const receiptModalClose = document.getElementById('receipt-modal-close');
  const receiptCancelBtn = document.getElementById('receipt-cancel-btn');
  const printLabelBtn = document.getElementById('print-label-btn');

  function openReceiptModalWithOrder(order) {
    if (!receiptModalBackdrop) return;
    const elResi = document.getElementById('receipt-resi-num');
    const elBuyer = document.getElementById('receipt-buyer-name');
    const elAddress = document.getElementById('receipt-buyer-address');
    const elItem = document.getElementById('receipt-item-name');

    if (elResi) elResi.textContent = order.resi || 'JNE-TRK-8821-DPS';
    if (elBuyer) elBuyer.textContent = order.buyer || 'Hendra Wijaya';
    if (elAddress) elAddress.textContent = order.address || `${order.city}`;
    if (elItem) elItem.textContent = `${order.craft} (1 Paket)`;

    receiptModalBackdrop.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function openReceiptModalCurrentLogistics() {
    const route = LOGISTICS_ROUTES[currentLogisticsRouteKey];
    if (route) {
      openReceiptModalWithOrder({
        resi: route.resi,
        buyer: route.buyer,
        address: route.address,
        craft: route.craft
      });
    }
  }

  function closeReceiptModal() {
    if (!receiptModalBackdrop) return;
    receiptModalBackdrop.classList.add('hidden');
    document.body.style.overflow = '';
  }

  document.getElementById('open-receipt-btn')?.addEventListener('click', openReceiptModalCurrentLogistics);
  receiptModalClose?.addEventListener('click', closeReceiptModal);
  receiptCancelBtn?.addEventListener('click', closeReceiptModal);

  receiptModalBackdrop?.addEventListener('click', (e) => {
    if (e.target === receiptModalBackdrop) {
      closeReceiptModal();
    }
  });

  printLabelBtn?.addEventListener('click', () => {
    showToast('Mempersiapkan pencetakan label resi pengiriman...');
    setTimeout(() => {
      window.print();
    }, 400);
  });

  // =========================================================================
  // 20. INITIALIZATION RUN
  // =========================================================================
  renderKPISparklines();
  renderAnalyticsChart('6m');
  renderDetailedAnalyticsChart('6m');
  renderView();
  renderOrdersView();
  renderBuyersView();
  selectLogisticsRoute('jakarta');

  // Check initial URL hash on page load
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash && validViews.includes(initialHash)) {
    switchView(initialHash);
  } else {
    switchView('overview');
  }

  // Window scroll & tab blur listener to immediately hide any chart tooltips
  window.addEventListener('scroll', () => {
    const t1 = document.getElementById('chart-tooltip');
    const t2 = document.getElementById('detailed-chart-tooltip');
    if (t1) { t1.classList.remove('visible'); t1.style.opacity = '0'; }
    if (t2) { t2.classList.remove('visible'); t2.style.opacity = '0'; }
  }, { passive: true });

  if (window.lucide) {
    lucide.createIcons();
  }
});
