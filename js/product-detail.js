/**
 * ==========================================================================
 * NUSAVA — PRODUCT DETAIL CONTROLLER SCRIPT (SUKKHACITTA 1:1 REPLICATION)
 * Single-Source Data Integration with `js/products-data.js`
 * Zero Border-Radius, Zero Slop, Pure Editorial Architecture
 * ==========================================================================
 */

(function () {
  'use strict';

  // Local Storage Cart Key (consistent with marketplace.js and main.js)
  const CART_STORAGE_KEY = 'nusava_cart_items';
  const CENTRAL_WA_PHONE = '6281234567890';

  // Application State
  const state = {
    product: null,
    selectedVariant: null,
    qty: 1,
    cart: []
  };

  // Helper: Format Rupiah
  function formatIDR(amount) {
    return 'Rp ' + Number(amount || 0).toLocaleString('id-ID');
  }

  function formatRupiah(num) {
    if (typeof num !== 'number') num = Number(num) || 0;
    return num.toLocaleString('id-ID');
  }

  // Helper: Get Cart from localStorage
  function getCart() {
    try {
      const stored = localStorage.getItem(CART_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      console.error('Error reading cart from localStorage', e);
      return [];
    }
  }

  // Helper: Save Cart to localStorage
  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      updateCartBadge();
      window.dispatchEvent(new CustomEvent('nusava-cart-updated', { detail: { cart } }));
    } catch (e) {
      console.error('Error saving cart to localStorage', e);
    }
  }

  // Helper: Show Editorial Toast
  function showToast(message) {
    const toast = document.getElementById('editorial-toast');
    const toastText = document.getElementById('toast-message-text');
    if (!toast || !toastText) return;

    toastText.textContent = message;
    toast.classList.add('show');

    if (window._toastTimer) clearTimeout(window._toastTimer);
    window._toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  }

  // Update Cart Badges across Navbar & Drawer
  function updateCartBadge() {
    const cart = getCart();
    const totalCount = cart.reduce((acc, item) => acc + (Number(item.qty) || 1), 0);

    const countEls = document.querySelectorAll('#cart-count, [data-cart-count], #nav-cart-count');
    countEls.forEach(el => {
      el.textContent = totalCount;
      if (totalCount > 0) el.classList.remove('hidden');
    });

    const drawerCounter = document.getElementById('drawer-cart-counter');
    if (drawerCounter) drawerCounter.textContent = `[${totalCount}]`;
  }

  /* --------------------------------------------------------------------------
     1. PARSE QUERY PARAM & RETRIEVE PRODUCT
     -------------------------------------------------------------------------- */
  function loadCurrentProduct() {
    const urlParams = new URLSearchParams(window.location.search);
    const queryId = urlParams.get('id') || 'KRY-001';

    if (typeof getProductByIdOrCode === 'function') {
      state.product = getProductByIdOrCode(queryId);
    } else if (typeof NUSAVA_PRODUCTS !== 'undefined' && NUSAVA_PRODUCTS.length > 0) {
      state.product = NUSAVA_PRODUCTS.find(p => p.code === queryId || String(p.id) === String(queryId)) || NUSAVA_PRODUCTS[0];
    }

    if (!state.product) {
      console.error('Produk tidak ditemukan, memuat fallback.');
      return;
    }

    // Default variant
    if (state.product.variants && state.product.variants.length > 0) {
      state.selectedVariant = state.product.variants[0];
    } else {
      state.selectedVariant = {
        id: 'standard',
        name: 'Format Standar Adat',
        label: 'Format Standar',
        priceDelta: 0
      };
    }

    // Set Document Title
    document.title = `${state.product.name} — Pusaka Adiluhung | Nusava`;
  }

  /* --------------------------------------------------------------------------
     2. RENDER MAIN EDITORIAL DETAILS (RIGHT COLUMN)
     -------------------------------------------------------------------------- */
  function renderProductDetails() {
    const p = state.product;
    if (!p) return;

    // Breadcrumb
    const bcCat = document.getElementById('breadcrumb-category');
    const bcTitle = document.getElementById('breadcrumb-title');
    if (bcCat) bcCat.textContent = p.catName || 'Koleksi Budaya';
    if (bcTitle) bcTitle.textContent = p.name;

    // Meta Origin & Duration
    const metaOrigin = document.getElementById('product-meta-origin');
    if (metaOrigin) {
      const dur = p.duration || 'Karya Tangan Asli';
      const dae = p.daerah || 'Nusantara';
      metaOrigin.textContent = `${dur.toUpperCase()} • ${dae.toUpperCase()}`;
    }

    // Name & Base Price
    const nameEl = document.getElementById('product-name');
    if (nameEl) nameEl.textContent = p.name;

    updatePriceDisplay();

    // Rating & Count
    const ratingEl = document.getElementById('product-rating-text');
    if (ratingEl) {
      const revCount = p.reviewsList ? p.reviewsList.length : 18;
      ratingEl.textContent = `${(p.rating || 5.0).toFixed(1)} (${revCount} Ulasan Kolektor)`;
    }

    // Short Description & Prose
    const shortDescEl = document.getElementById('product-short-desc');
    if (shortDescEl) shortDescEl.textContent = p.shortDesc || '';

    const philosophyEl = document.getElementById('product-philosophy');
    if (philosophyEl) philosophyEl.textContent = p.philosophy || p.desc || 'Karya ini menyimpan nilai luhur warisan leluhur Nusantara.';

    const locationText = p.village || p.daerah || p.origin || 'desa pengrajin';
    const artisanName = p.artisan || 'Pengrajin Lokal';

    const artisanStoryEl = document.getElementById('product-artisan-story');
    if (artisanStoryEl) artisanStoryEl.textContent = p.artisanStory || `Dikerjakan langsung oleh ${artisanName} di ${locationText}.`;

    // Accordions
    const specsAcc = document.getElementById('accordion-text-specs');
    if (specsAcc) {
      const mat = p.specs?.material || p.material || p.category || 'Material Alami Pilihan';
      const reg = p.specs?.registryCode || p.code || 'KRY-001';
      specsAcc.textContent = p.accordions?.specs || `Dimensi: ${p.dimensions || 'Sesuai spesifikasi adat'} • Bobot: ${p.weight || '750 gram'}. Material: ${mat}. Disertai nomor registrasi ${reg} dan sertifikat kurasi budaya.`;
    }

    const impactAcc = document.getElementById('accordion-text-impact');
    if (impactAcc) {
      impactAcc.textContent = p.accordions?.impact || `100% buatan tangan pengrajin di ${locationText}. 72% dari nilai apresiasi karya langsung mengalir menopang kesejahteraan dan kemandirian pengrajin lokal.`;
    }

    const careAcc = document.getElementById('accordion-text-care');
    if (careAcc) {
      careAcc.textContent = p.accordions?.care || (p.materialCare || 'Simpan di ruangan berventilasi baik. Bersihkan secara lembut dengan kuas bulu halus dan hindari paparan kimia sintetis.');
    }

    // Technical Matrix
    const mOrigin = document.getElementById('matrix-origin');
    const mArtisan = document.getElementById('matrix-artisan');
    const mDuration = document.getElementById('matrix-duration');
    const mMaterial = document.getElementById('matrix-material');
    const mCode = document.getElementById('matrix-code');

    if (mOrigin) mOrigin.textContent = p.specs?.origin || p.daerah || 'Nusantara';
    if (mArtisan) mArtisan.textContent = p.specs?.artisan || p.artisan || 'Sanggar Tradisional';
    if (mDuration) mDuration.textContent = p.specs?.duration || p.duration || 'Karya Tangan Manual';
    if (mMaterial) mMaterial.textContent = p.specs?.material || p.material || 'Material Alami Pilihan';
    if (mCode) mCode.textContent = p.specs?.registryCode || p.code || 'KRY-001';

    // Render Variants
    renderVariantsList();
  }

  /* --------------------------------------------------------------------------
     3. RENDER VARIANTS LIST (Sharp 0px Buttons)
     -------------------------------------------------------------------------- */
  function renderVariantsList() {
    const container = document.getElementById('variant-options-list');
    if (!container) return;

    const variants = state.product.variants || [
      { id: 'v1', name: 'Format Standar Adat', label: 'Format Standar', priceDelta: 0 },
      { id: 'v2', name: 'Dengan Kotak Jati Ukir Pusaka (+Rp 450.000)', label: 'Kotak Jati Ukir', priceDelta: 450000 },
      { id: 'v3', name: 'Edisi Panel Museum Akrilik (+Rp 950.000)', label: 'Panel Museum Akrilik', priceDelta: 950000 }
    ];

    container.innerHTML = variants.map(v => {
      const isActive = state.selectedVariant && state.selectedVariant.id === v.id;
      const deltaText = v.priceDelta > 0 ? ` (+${formatIDR(v.priceDelta)})` : '';
      return `
        <button type="button" 
                class="variant-btn ${isActive ? 'active' : ''}" 
                data-variant-id="${v.id}"
                aria-pressed="${isActive}">
          <div class="flex items-center">
            <span class="variant-radio-dot"></span>
            <span>${v.name}</span>
          </div>
          <span class="text-[11px] tracking-wider text-[#7A6F64] uppercase font-semibold">${v.label || ''}</span>
        </button>
      `;
    }).join('');

    // Attach click events
    container.querySelectorAll('.variant-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const vId = btn.dataset.variantId;
        const found = variants.find(x => x.id === vId);
        if (found) {
          state.selectedVariant = found;
          renderVariantsList();
          updatePriceDisplay();
        }
      });
    });
  }

  // Update dynamic price based on base price + variant delta
  function updatePriceDisplay() {
    const priceEl = document.getElementById('product-price');
    if (!priceEl || !state.product) return;

    const basePrice = state.product.price || 0;
    const delta = state.selectedVariant?.priceDelta || 0;
    const currentPrice = basePrice + delta;

    priceEl.textContent = formatIDR(currentPrice);
  }

  /* --------------------------------------------------------------------------
     4. RENDER VERTICAL STACKED GALLERY WITH CRAFT STORY OVERLAYS (LEFT COLUMN)
     -------------------------------------------------------------------------- */
  function renderGalleryStack() {
    const stack = document.getElementById('gallery-stack');
    if (!stack || !state.product) return;

    const p = state.product;

    // Establish 6-8 photos list
    let galleryPhotos = [];
    if (Array.isArray(p.gallery) && p.gallery.length >= 6) {
      galleryPhotos = [...p.gallery];
    } else {
      // Build an 7-photo editorial sequence using related craft & artisan images
      galleryPhotos = [
        p.img,
        'assets/images/content/jurnal-tenun-lambanapu.jpg',
        p.artisanImg || 'assets/images/pengrajin-tenun.jpg',
        'assets/images/content/produk-batik-giriloyo.jpg',
        'assets/images/content/jurnal-batik-giriloyo.jpg',
        'assets/images/pengrajin-ukir.jpg',
        p.img
      ];
    }

    // Map overlay stories
    const overlayMap = {};
    if (Array.isArray(p.overlayStories)) {
      p.overlayStories.forEach(story => {
        overlayMap[story.imageIndex] = story;
      });
    }

    // Default craft story overlays if missing
    if (!overlayMap[2]) {
      overlayMap[2] = {
        tag: 'DEDIKASI KARYA TANGAN',
        title: 'Ketelitian & Keheningan Tirakat Penempaan Adat',
        text: `Setiap helai dan guratan dikerjakan secara manual oleh ${p.artisan || 'sang maestro pengrajin'}. Mengandalkan kepekaan rasa dan doa leluhur yang diturunkan lintas generasi tanpa ketergantungan mesin pabrik.`
      };
    }
    if (!overlayMap[5]) {
      overlayMap[5] = {
        tag: '100% PEMBERDAYAAN ALAM & DESA',
        title: 'Warna Hayati & Kelestarian Bumi Nusantara',
        text: 'Menggunakan pigmen nabati murni yang dipanen dari hutan sekitar tanpa mencemari aliran air desa. 72% dari hasil karya langsung menjadi pendapatan ekonomi keluarga pengrajin.'
      };
    }

    // Render stack
    stack.innerHTML = galleryPhotos.map((imgSrc, index) => {
      const story = overlayMap[index];
      const hasOverlay = Boolean(story);

      return `
        <div class="gallery-photo-wrapper" data-gallery-index="${index}">
          <img src="${imgSrc}" 
               alt="${p.name} — Sudut ${index + 1}" 
               class="gallery-photo-img" 
               loading="${index === 0 ? 'eager' : 'lazy'}" 
               onerror="this.src='${p.img}';">
          
          ${hasOverlay ? `
            <div class="craft-story-overlay" role="note" aria-label="Catatan Filosofi Proses">
              <span class="craft-story-tag">${story.tag || 'KEAHLIAN MAESTRO'}</span>
              <h3 class="craft-story-title">${story.title}</h3>
              <p class="craft-story-text">${story.text}</p>
            </div>
          ` : ''}
        </div>
      `;
    }).join('');
  }

  /* --------------------------------------------------------------------------
     5. RENDER COMPLETE THE LOOK (KARYA PUSAKA PELENGKAP — 2 KARTU)
     -------------------------------------------------------------------------- */
  function renderCompleteTheLook() {
    const container = document.getElementById('complete-look-cards-container');
    if (!container || !state.product) return;

    let complements = [];
    if (Array.isArray(state.product.complements) && state.product.complements.length >= 2) {
      complements = state.product.complements.map(id => {
        return NUSAVA_PRODUCTS.find(x => x.id === id || x.code === id);
      }).filter(Boolean);
    }

    // Fallback if complements missing
    if (complements.length < 2 && typeof NUSAVA_PRODUCTS !== 'undefined') {
      complements = NUSAVA_PRODUCTS.filter(x => x.id !== state.product.id).slice(0, 2);
    }

    container.innerHTML = complements.slice(0, 2).map(item => {
      return `
        <a href="product-detail.html?id=${item.code || item.id}" class="complete-look-card group">
          <div class="complete-look-img-wrap">
            <img src="${item.img}" alt="${item.name}" class="complete-look-img" loading="lazy">
          </div>
          <div class="pt-3">
            <span class="text-[11px] tracking-[0.16em] uppercase text-[#7A6F64] block">
              ${item.duration || 'Karya Tangan'} • ${item.daerah || 'Nusantara'}
            </span>
            <h3 class="font-cinzel text-sm text-[#1E1510] font-medium mt-1 group-hover:text-[#7A6F64] transition-colors leading-snug">
              ${item.name}
            </h3>
            <span class="text-xs text-[#5A5046] block mt-1">
              ${formatIDR(item.price)}
            </span>
          </div>
        </a>
      `;
    }).join('');
  }

  /* --------------------------------------------------------------------------
     6. RENDER REVIEWS SECTION (3 KOLOM + MODAL TULIS APRESIASI)
     -------------------------------------------------------------------------- */
  function renderReviewsSection() {
    const container = document.getElementById('reviews-grid-container');
    if (!container || !state.product) return;

    const defaultReviews = [
      {
        author: 'Dr. Raden Mas Aryo',
        badge: 'Kolektor Terverifikasi',
        rating: 5,
        date: '18 Oktober 2026',
        city: 'Menteng, Jakarta Pusat',
        title: 'Keanggunan Otentik yang Menyentuh Jiwa',
        comment: 'Saat membuka kemasannya, aroma wangi rempah akar mengkudu dan dedaunan nila langsung tercium semerbak. Guratan motif kudanya sangat tegas dan tenunannya padat berbobot. Ini bukan sekadar kain, ini adalah doa leluhur Sumba yang hidup.'
      },
      {
        author: 'Clara Setyanegara',
        badge: 'Kolektor Terverifikasi',
        rating: 5,
        date: '29 September 2026',
        city: 'Denpasar, Bali',
        title: 'Pewarna Alami yang Sangat Dalam dan Hidup',
        comment: 'Warna biru nilanya memiliki kedalaman gradasi yang mustahil ditiru oleh mesin pabrik modern. Senang sekali 72% dari nilai apresiasi ini langsung diterima Mama penenun di Desa Lambanapu.'
      },
      {
        author: 'Hartono Widjaja',
        badge: 'Kolektor Terverifikasi',
        rating: 5,
        date: '12 September 2026',
        city: 'Surabaya, Jawa Timur',
        title: 'Pusaka WBTb yang Bernilai Investasi Budaya',
        comment: 'Disertai kartu sertifikat WBTb Kemendikbud dan nomor registrasi resmi. Panel tenun ini kini menjadi mahakarya utama di ruang galeri keluarga kami.'
      }
    ];

    const reviews = Array.isArray(state.product.reviewsList) && state.product.reviewsList.length > 0
      ? state.product.reviewsList
      : defaultReviews;

    container.innerHTML = reviews.slice(0, 3).map(rev => {
      const starsStr = '★'.repeat(rev.rating || 5);
      return `
        <article class="review-card">
          <div>
            <div class="star-rating-display mb-2">${starsStr}</div>
            <h3 class="font-garamond italic font-semibold text-base text-[#1E1510] leading-snug">
              "${rev.title}"
            </h3>
            <p class="text-xs text-[#5A5046] leading-relaxed my-3">
              ${rev.comment}
            </p>
          </div>
          <div class="pt-4 border-t border-[#E5DFD5]">
            <div class="flex items-center justify-between">
              <span class="text-xs font-semibold text-[#1E1510]">${rev.author}</span>
              <span class="text-[11px] tracking-wider uppercase font-semibold text-[#7A6F64] border border-[#D5CEC2] px-1.5 py-0.5">
                ${rev.badge || 'Kolektor'}
              </span>
            </div>
            <div class="text-[11px] text-[#7A6F64] mt-1">
              ${rev.city} • ${rev.date}
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  /* --------------------------------------------------------------------------
     7. SLIDE-OVER CART DRAWER MECHANICS (1:1 IDENTIK LANDING PAGE)
     -------------------------------------------------------------------------- */
  function openCartDrawer() {
    const overlay = document.getElementById('cart-overlay') || document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer') || document.getElementById('cart-drawer-panel');
    if (!overlay || !drawer) return;

    renderCartItemsList();

    overlay.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('cart-open');
    window.dispatchEvent(new CustomEvent('nusava-cart-opened'));
  }

  function closeCartDrawer() {
    const overlay = document.getElementById('cart-overlay') || document.getElementById('cart-drawer-overlay');
    const drawer = document.getElementById('cart-drawer') || document.getElementById('cart-drawer-panel');
    if (!overlay || !drawer) return;

    overlay.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
    document.body.classList.remove('cart-open');
    window.dispatchEvent(new CustomEvent('nusava-cart-closed'));
  }

  function renderCartItemsList() {
    const cart = getCart();
    const itemsEl = document.getElementById('cart-drawer-items') || document.getElementById('cart-items-wrapper');
    const totalEl = document.getElementById('cart-total-price');

    if (!itemsEl) return;

    const totalCount = cart.reduce((acc, c) => acc + (Number(c.qty) || 1), 0);
    const totalPrice = cart.reduce((acc, c) => acc + ((Number(c.price) || 0) * (Number(c.qty) || 1)), 0);

    // Update badges
    const badgeElements = document.querySelectorAll('#cart-count, [data-cart-count], #nav-cart-count');
    badgeElements.forEach(badge => {
      badge.textContent = totalCount;
      if (totalCount > 0) badge.classList.remove('hidden');
    });

    if (totalEl) {
      totalEl.textContent = 'Rp ' + formatRupiah(totalPrice);
    }

    const webCheckoutBtn = document.getElementById('btn-main-cart-web-checkout') || document.getElementById('cart-btn-web-checkout');
    if (webCheckoutBtn) {
      if (cart.length === 0) {
        webCheckoutBtn.classList.add('opacity-50', 'pointer-events-none');
        webCheckoutBtn.setAttribute('tabindex', '-1');
      } else {
        webCheckoutBtn.classList.remove('opacity-50', 'pointer-events-none');
        webCheckoutBtn.removeAttribute('tabindex');
      }
    }

    const waCheckoutBtn = document.getElementById('btn-main-cart-checkout') || document.getElementById('cart-btn-checkout-wa');
    if (waCheckoutBtn) {
      waCheckoutBtn.disabled = cart.length === 0;
      waCheckoutBtn.style.opacity = cart.length === 0 ? '0.5' : '1';
      waCheckoutBtn.style.cursor = cart.length === 0 ? 'not-allowed' : 'pointer';
    }

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
      return;
    }

    itemsEl.innerHTML = cart.map((item, index) => `
      <div class="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-[#EDE4D5] shadow-xs group">
        <a href="product-detail.html?id=${encodeURIComponent(item.code || item.id)}" class="w-16 h-16 rounded-lg bg-[#EDE4D5] overflow-hidden flex-shrink-0 block">
          <img src="${item.img || 'assets/images/logonusava.png'}" alt="${item.name || 'Karya Pusaka'}" class="w-full h-full object-cover" onerror="this.src='assets/images/logonusava.png'">
        </a>
        <div class="flex-1 min-w-0">
          <a href="product-detail.html?id=${encodeURIComponent(item.code || item.id)}" class="font-sans font-semibold text-xs sm:text-sm text-[#2B231D] hover:text-[#C5A059] transition-colors truncate block">
            ${item.name || 'Karya Pusaka'}
          </a>
          ${item.variantName && item.variantName !== 'Format Standar Adat' ? `<span class="inline-block text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-[#FAF7F2] text-[#963D06] border border-[#EDE4D5] mt-1">${item.variantName}</span>` : ''}
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

    // Attach cart item action events
    itemsEl.querySelectorAll('[data-cart-main-action]').forEach(btn => {
      btn.addEventListener('click', () => {
        const act = btn.getAttribute('data-cart-main-action');
        const idx = parseInt(btn.getAttribute('data-cart-idx'), 10);
        let currentCart = getCart();
        if (!currentCart[idx]) return;

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
        saveCart(currentCart);
        renderCartItemsList();
      });
    });
  }

  // Add Current Product & Variant to Cart
  function addCurrentProductToCart() {
    const p = state.product;
    if (!p) return;

    const basePrice = p.price || 0;
    const delta = state.selectedVariant?.priceDelta || 0;
    const finalPrice = basePrice + delta;
    const variantId = state.selectedVariant?.id || 'standard';
    const variantName = state.selectedVariant?.name || 'Format Standar Adat';

    let cart = getCart();

    // Match by product ID and variant
    const existingIndex = cart.findIndex(item => (item.id === p.id || item.code === p.code) && (item.variantId === variantId || (!item.variantId && variantId === 'standard')));

    if (existingIndex > -1) {
      cart[existingIndex].qty += state.qty;
    } else {
      cart.push({
        id: p.id,
        code: p.code || 'KRY-001',
        name: p.name,
        variantId: variantId,
        variantName: variantName,
        price: finalPrice,
        img: p.img,
        artisan: p.artisan,
        daerah: p.daerah,
        village: p.village,
        waPhone: p.waPhone || CENTRAL_WA_PHONE,
        qty: state.qty
      });
    }

    saveCart(cart);
    showToast(`"${p.name}" ditambahkan ke keranjang.`);
    openCartDrawer();
  }

  /* --------------------------------------------------------------------------
     8. WHATSAPP CHECKOUT INTEGRATIONS (1:1 DENGAN LANDING PAGE)
     -------------------------------------------------------------------------- */
  function checkoutViaWhatsApp() {
    const cart = getCart();
    if (cart.length === 0) {
      showToast('Keranjang belanjaanmu masih kosong');
      return;
    }

    let total = 0;
    let listText = '';
    cart.forEach((item, i) => {
      const itemSub = (Number(item.price) || 0) * (Number(item.qty) || 1);
      total += itemSub;
      const variantStr = (item.variantName && item.variantName !== 'Format Standar Adat') ? ` [${item.variantName}]` : '';
      listText += `${i + 1}. ${item.name}${variantStr} (${item.qty || 1}x) — Rp ${itemSub.toLocaleString('id-ID')}\n   Kode: ${item.code || item.id} | Asal: ${item.daerah || 'Nusantara'}\n`;
    });

    const msg = `Halo Sanggar Pengrajin & Tim Kurasi Nusava,\n\nSaya ingin memesan karya kerajinan berikut melalui katalog resmi Nusava:\n\n${listText}\nTotal Estimasi: Rp ${total.toLocaleString('id-ID')}\n\nMohon informasi ketersediaan karya dan detail pengiriman adat berasuransi. Terima kasih.`;
    const phone = '6281238994411';
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  function orderSingleDirectWA() {
    const p = state.product;
    if (!p) return;

    const basePrice = p.price || 0;
    const delta = state.selectedVariant?.priceDelta || 0;
    const finalPrice = basePrice + delta;
    const total = formatIDR(finalPrice * state.qty);

    const locText = p.village || p.daerah || p.origin || 'desa pengrajin';
    const artText = p.artisan || 'Sang Maestro';
    const message = `Halo Sang Maestro *${artText}* di ${locText} & Tim Nusava,%0A%0ASaya berminat untuk mengapresiasi dan memesan karya pusaka berikut:%0A- *Nama Karya*: ${p.name || ''}%0A- *Format/Kemasan*: ${state.selectedVariant?.name || 'Format Standar Adat'}%0A- *Asal Wilayah*: ${p.daerah || locText}%0A- *Jumlah*: ${state.qty} karya%0A- *Estimasi Nilai Apresiasi*: ${total}%0A%0AMohon informasi jadwal pengerjaan/pengiriman dan sertifikasi WBTb resmi. Terima kasih!`;

    const phone = p.waPhone || CENTRAL_WA_PHONE;
    const waUrl = `https://api.whatsapp.com/send?phone=${phone}&text=${message}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  function curatorConsultationWA() {
    const p = state.product;
    const pName = p ? p.name : 'Karya Pusaka Nusantara';
    const message = `Halo Kurator Seni & Budaya Nusava,%0A%0ASaya ingin berkonsultasi mengenai makna motif, sejarah pengerjaan, dan panduan koleksi untuk karya *${pName}*. Mohon panduan kuratorialnya. Terima kasih.`;
    const waUrl = `https://api.whatsapp.com/send?phone=${CENTRAL_WA_PHONE}&text=${message}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  /* --------------------------------------------------------------------------
     9. EVENT LISTENERS BINDING
     -------------------------------------------------------------------------- */
  function bindEventListeners() {
    // Mobile Navigation Drawer (Landing Page Synchronized)
    const mobileBtn = document.getElementById('mobile-menu-btn') || document.getElementById('mobile-nav-toggle');
    const mobileClose = document.getElementById('mobile-menu-close');
    const mobileDrawer = document.getElementById('mobile-drawer');
    const mobilePanel = document.getElementById('mobile-nav-panel');

    mobileBtn?.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('translate-x-full');
      } else if (mobilePanel) {
        mobilePanel.classList.toggle('hidden');
      }
    });

    mobileClose?.addEventListener('click', () => {
      mobileDrawer?.classList.add('translate-x-full');
    });

    // Cart Drawer Openers (All [data-cart-open] and #cart-drawer-trigger)
    const cartTriggers = document.querySelectorAll('[data-cart-open], #cart-drawer-trigger');
    cartTriggers.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openCartDrawer();
      });
    });

    const cartCloseBtn = document.getElementById('cart-close-btn') || document.getElementById('cart-drawer-close');
    const cartOverlay = document.getElementById('cart-overlay') || document.getElementById('cart-drawer-overlay');
    if (cartCloseBtn) cartCloseBtn.addEventListener('click', closeCartDrawer);
    if (cartOverlay) cartOverlay.addEventListener('click', closeCartDrawer);

    // Escape key closes modal & cart drawer
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeCartDrawer();
        closeReviewModal();
      }
    });

    // Quantity Selector in Right Column
    const btnMinus = document.getElementById('btn-qty-minus');
    const btnPlus = document.getElementById('btn-qty-plus');
    const qtyDisplay = document.getElementById('specs-qty-display');

    if (btnMinus && btnPlus && qtyDisplay) {
      btnMinus.addEventListener('click', () => {
        if (state.qty > 1) {
          state.qty--;
          qtyDisplay.textContent = state.qty;
        }
      });
      btnPlus.addEventListener('click', () => {
        if (state.qty < 99) {
          state.qty++;
          qtyDisplay.textContent = state.qty;
        }
      });
    }

    // Main CTA Button
    const btnAddToCart = document.getElementById('btn-add-to-cart-cta');
    if (btnAddToCart) {
      btnAddToCart.addEventListener('click', addCurrentProductToCart);
    }

    // Direct WhatsApp Button
    const btnQuickWA = document.getElementById('btn-quick-wa');
    if (btnQuickWA) {
      btnQuickWA.addEventListener('click', orderSingleDirectWA);
    }

    // Cart Drawer Checkout Buttons (Matching Landing Page)
    const btnCartCheckoutWA = document.getElementById('btn-main-cart-checkout') || document.getElementById('cart-btn-checkout-wa');
    if (btnCartCheckoutWA) {
      btnCartCheckoutWA.addEventListener('click', checkoutViaWhatsApp);
    }

    const btnCartCuratorWA = document.getElementById('cart-btn-curator-wa');
    if (btnCartCuratorWA) {
      btnCartCuratorWA.addEventListener('click', curatorConsultationWA);
    }

    // Minimalist Accordion (Garis 1px)
    const accordionTriggers = document.querySelectorAll('.accordion-trigger');
    accordionTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => {
        const itemType = trigger.dataset.accordion;
        const content = document.getElementById(`accordion-content-${itemType}`);
        const icon = trigger.querySelector('.accordion-icon-toggle');
        const isExpanded = trigger.getAttribute('aria-expanded') === 'true';

        // Close other accordions for clean editorial behavior
        accordionTriggers.forEach(otherTrig => {
          if (otherTrig !== trigger) {
            otherTrig.setAttribute('aria-expanded', 'false');
            const otherType = otherTrig.dataset.accordion;
            const otherContent = document.getElementById(`accordion-content-${otherType}`);
            const otherIcon = otherTrig.querySelector('.accordion-icon-toggle');
            if (otherContent) otherContent.classList.remove('open');
            if (otherIcon) otherIcon.textContent = '+';
          }
        });

        if (isExpanded) {
          trigger.setAttribute('aria-expanded', 'false');
          if (content) content.classList.remove('open');
          if (icon) icon.textContent = '+';
        } else {
          trigger.setAttribute('aria-expanded', 'true');
          if (content) content.classList.add('open');
          if (icon) icon.textContent = '−';
        }
      });
    });

    // Review Modal Events
    const btnOpenReviewModal = document.getElementById('btn-open-review-modal');
    const reviewModal = document.getElementById('review-modal');
    const reviewCloseBtn = document.getElementById('review-modal-close');
    const reviewCancelBtn = document.getElementById('review-btn-cancel');
    const reviewForm = document.getElementById('form-submit-review');

    function openReviewModal() {
      if (reviewModal) {
        reviewModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeReviewModal() {
      if (reviewModal) {
        reviewModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }

    if (btnOpenReviewModal) btnOpenReviewModal.addEventListener('click', openReviewModal);
    if (reviewCloseBtn) reviewCloseBtn.addEventListener('click', closeReviewModal);
    if (reviewCancelBtn) reviewCancelBtn.addEventListener('click', closeReviewModal);
    if (reviewModal) {
      reviewModal.addEventListener('click', (e) => {
        if (e.target === reviewModal) closeReviewModal();
      });
    }

    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nameInput = document.getElementById('review-input-name');
        const cityInput = document.getElementById('review-input-city');
        const ratingInput = document.getElementById('review-input-rating');
        const titleInput = document.getElementById('review-input-title');
        const commentInput = document.getElementById('review-input-comment');

        const newReview = {
          author: nameInput ? nameInput.value.trim() : 'Kolektor Nusava',
          badge: 'Kolektor Terverifikasi',
          rating: parseInt(ratingInput ? ratingInput.value : '5', 10),
          date: 'Hari ini',
          city: cityInput ? cityInput.value.trim() : 'Nusantara',
          title: titleInput ? titleInput.value.trim() : 'Apresiasi Warisan',
          comment: commentInput ? commentInput.value.trim() : 'Karya pusaka yang luar biasa indah.'
        };

        if (!Array.isArray(state.product.reviewsList)) {
          state.product.reviewsList = [];
        }
        state.product.reviewsList.unshift(newReview);

        renderReviewsSection();
        closeReviewModal();
        reviewForm.reset();
        showToast('Terima kasih. Apresiasi Anda telah diterbitkan.');
      });
    }

    // Navbar Scroll & Auto-Reveal Matching Landing Page
    if (window.initUniversalNavbar) {
      window.initUniversalNavbar();
    }

    // Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email');
        if (emailInput && emailInput.value.trim()) {
          showToast('Terima kasih. Anda telah terdaftar dalam Warta Warisan Nusava.');
          newsletterForm.reset();
        }
      });
    }

    // Cross-page Cart Synchronization
    window.addEventListener('storage', (e) => {
      if (e.key === CART_STORAGE_KEY) {
        updateCartBadge();
        renderCartItemsList();
      }
    });

    window.addEventListener('nusava-cart-updated', () => {
      updateCartBadge();
      renderCartItemsList();
    });
  }

  /* --------------------------------------------------------------------------
     10. INITIALIZATION LIFECYCLE
     -------------------------------------------------------------------------- */
  function init() {
    loadCurrentProduct();
    renderProductDetails();
    renderGalleryStack();
    renderCompleteTheLook();
    renderReviewsSection();
    updateCartBadge();
    bindEventListeners();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Interoperability exports
  window.openCartDrawer = openCartDrawer;
  window.closeCartDrawer = closeCartDrawer;
  window.syncCartUI = renderCartItemsList;

})();
