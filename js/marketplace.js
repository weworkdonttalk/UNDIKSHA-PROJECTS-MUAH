/**
 * ==========================================================================
 * NUSAVA — PASAR KRIYA & PRODUK BUDAYA NUSANTARA CONTROLLER
 * Architecture: Vanilla JS (ES6+), Zero External Libraries
 * Multi-Facet Filter, Dynamic Craft Tiles, Cart Sync & WhatsApp Sanggar Flow
 * ==========================================================================
 */

(function () {
  'use strict';

  // 1. STATE MANAGEMENT
  const state = {
    category: 'all',
    region: 'all',
    status: 'all',
    technique: 'all',
    sort: 'recommended',
    search: '',
    isFilterDrawerOpen: false,
    isCartDrawerOpen: false,
    isMobileNavOpen: false,
    isSearchOpen: false
  };

  const CART_STORAGE_KEY = 'nusava_cart_items';

  // Helper: Format IDR
  function formatRupiah(num) {
    if (typeof num !== 'number') return '0';
    return num.toLocaleString('id-ID');
  }

  // Helper: Escape HTML
  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // Helper: Debounce
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  /* --------------------------------------------------------------------------
     2. CART MANAGEMENT (LOCALSTORAGE SYNCHRONIZATION)
     -------------------------------------------------------------------------- */
  function getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Gagal membaca keranjang:', e);
      return [];
    }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      updateCartBadge();
      renderCartDrawer();
      window.dispatchEvent(new CustomEvent('nusava-cart-updated', { detail: { cart } }));
    } catch (e) {
      console.error('Gagal menyimpan keranjang:', e);
    }
  }

  function updateCartBadge() {
    const cart = getCart();
    const totalCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
    const badgeElements = document.querySelectorAll('[data-cart-count]');
    badgeElements.forEach(badge => {
      badge.textContent = totalCount;
    });
  }

  function getCatalogProducts() {
    if (typeof getSynchronizedCatalog === 'function') {
      return getSynchronizedCatalog();
    }
    if (typeof BASE_CATALOG_8 !== 'undefined') {
      return BASE_CATALOG_8;
    }
    return typeof NUSAVA_PRODUCTS !== 'undefined' ? NUSAVA_PRODUCTS : [];
  }

  function addToCart(productId, qty = 1) {
    const products = getCatalogProducts();
    const product = products.find(p => p.id === productId || p.code === productId);
    if (!product) return;

    let cart = getCart();
    const existingIndex = cart.findIndex(item => item.id === product.id || item.code === product.code);

    if (existingIndex > -1) {
      cart[existingIndex].qty = (cart[existingIndex].qty || 1) + qty;
    } else {
      cart.push({
        id: product.id,
        code: product.code || `KRY-${String(product.id).padStart(3, '0')}`,
        name: product.name,
        price: product.price,
        img: product.img,
        daerah: product.origin || product.daerah || (product.specs && product.specs.origin) || '',
        artisan: product.artisan || '',
        qty: qty
      });
    }

    saveCart(cart);
    showToast(`"${product.name}" ditambahkan ke keranjang`);
    openCartDrawer();
  }

  function updateCartItemQty(index, delta) {
    let cart = getCart();
    if (!cart[index]) return;

    cart[index].qty = (cart[index].qty || 1) + delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
    saveCart(cart);
  }

  function removeCartItem(index) {
    let cart = getCart();
    if (!cart[index]) return;
    const removedName = cart[index].name;
    cart.splice(index, 1);
    saveCart(cart);
    showToast(`"${removedName}" dihapus dari Keranjang`);
  }

  function renderCartDrawer() {
    const cart = getCart();
    const container = document.getElementById('cart-items-container');
    const emptyState = document.getElementById('cart-empty-message');
    const totalPriceEl = document.getElementById('cart-total-price');
    const checkoutBtn = document.getElementById('btn-cart-checkout-wa');
    const webCheckoutBtn = document.getElementById('btn-cart-web-checkout');

    if (!container) return;

    if (cart.length === 0) {
      container.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      if (totalPriceEl) totalPriceEl.textContent = 'Rp 0';
      if (webCheckoutBtn) {
        webCheckoutBtn.classList.add('opacity-50', 'pointer-events-none');
        webCheckoutBtn.setAttribute('tabindex', '-1');
      }
      if (checkoutBtn) {
        checkoutBtn.disabled = true;
        checkoutBtn.style.opacity = '0.5';
        checkoutBtn.style.cursor = 'not-allowed';
      }
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');
    if (webCheckoutBtn) {
      webCheckoutBtn.classList.remove('opacity-50', 'pointer-events-none');
      webCheckoutBtn.removeAttribute('tabindex');
    }
    if (checkoutBtn) {
      checkoutBtn.disabled = false;
      checkoutBtn.style.opacity = '1';
      checkoutBtn.style.cursor = 'pointer';
    }

    let subtotal = 0;
    let html = '';

    cart.forEach((item, index) => {
      const itemTotal = item.price * (item.qty || 1);
      subtotal += itemTotal;

      html += `
        <div class="flex items-center gap-3.5 p-3.5 rounded-xl bg-white border border-[#EDE4D5] shadow-xs group">
          <a href="product-detail.html?id=${encodeURIComponent(item.code || item.id)}" class="w-16 h-16 rounded-lg bg-[#EDE4D5] overflow-hidden flex-shrink-0 block">
            <img src="${item.img || 'assets/images/logonusava.png'}" alt="${escapeHtml(item.name)}" class="w-full h-full object-cover" onerror="this.src='assets/images/logonusava.png'">
          </a>
          <div class="flex-1 min-w-0">
            <a href="product-detail.html?id=${encodeURIComponent(item.code || item.id)}" class="font-sans font-semibold text-xs sm:text-sm text-[#2B231D] hover:text-[#C5A059] transition-colors truncate block">
              ${escapeHtml(item.name)}
            </a>
            <p class="text-[11px] text-[#6B5E55] font-sans truncate mt-0.5">
              ${escapeHtml(item.daerah || item.artisan || 'Karya Nusantara')}
            </p>
            <div class="flex items-center justify-between mt-2 pt-0.5">
              <span class="text-xs font-bold text-[#963D06]">
                Rp ${formatRupiah(item.price)}
              </span>
              <div class="flex items-center gap-2">
                <div class="flex items-center border border-[#EDE4D5] rounded-full bg-[#FAF7F2] overflow-hidden shadow-2xs">
                  <button type="button" class="px-2 py-0.5 text-xs text-[#2B231D] hover:bg-[#EDE4D5] transition-colors cursor-pointer" data-cart-action="minus" data-cart-index="${index}" aria-label="Kurangi kuantitas">−</button>
                  <span class="px-2 text-xs font-semibold text-[#2B231D] select-none">${item.qty || 1}</span>
                  <button type="button" class="px-2 py-0.5 text-xs text-[#2B231D] hover:bg-[#EDE4D5] transition-colors cursor-pointer" data-cart-action="plus" data-cart-index="${index}" aria-label="Tambah kuantitas">+</button>
                </div>
                <button type="button" class="text-xs text-[#A08070] hover:text-[#FF6262] transition-colors cursor-pointer p-1" data-cart-action="remove" data-cart-index="${index}" title="Hapus dari keranjang" aria-label="Hapus dari keranjang">
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    container.innerHTML = html;
    if (totalPriceEl) totalPriceEl.textContent = `Rp ${formatRupiah(subtotal)}`;

    // Add event listeners inside cart container
    container.querySelectorAll('[data-cart-action]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const action = btn.getAttribute('data-cart-action');
        const idx = parseInt(btn.getAttribute('data-cart-index'), 10);
        if (action === 'minus') {
          updateCartItemQty(idx, -1);
        } else if (action === 'plus') {
          updateCartItemQty(idx, 1);
        } else if (action === 'remove') {
          removeCartItem(idx);
        }
      });
    });
  }

  function handleCheckoutWhatsApp() {
    const cart = getCart();
    if (cart.length === 0) return;

    let total = 0;
    let listText = '';
    cart.forEach((item, i) => {
      const itemSub = item.price * (item.qty || 1);
      total += itemSub;
      listText += `${i + 1}. ${item.name} (${item.qty}x) — Rp ${formatRupiah(itemSub)}\n   Kode: ${item.code || item.id} | Asal: ${item.daerah || 'Nusantara'}\n`;
    });

    const msg = `Halo Sanggar Pengrajin & Tim Kurasi Nusava,\n\nSaya ingin mengapresiasi dan memesan karya pusaka berikut melalui katalog resmi Nusava:\n\n${listText}\nTotal Estimasi Nilai Apresiasi: Rp ${formatRupiah(total)}\n\nMohon informasi ketersediaan karya dan detail pengiriman adat berasuransi. Terima kasih atas dedikasi merawat warisan leluhur.`;

    // Default contact phone (Sanggar Lambanapu / Tim Kurasi Pusat)
    const phone = '6281238994411';
    const waUrl = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  }

  /* --------------------------------------------------------------------------
     3. TOAST NOTIFICATION HELPER
     -------------------------------------------------------------------------- */
  let toastTimer = null;
  function showToast(message) {
    const toast = document.getElementById('editorial-toast');
    const msgEl = document.getElementById('toast-message');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* --------------------------------------------------------------------------
     4. FILTER & SORT LOGIC (Aesop & Teenage Engineering Standards)
     -------------------------------------------------------------------------- */
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

    if (countAll) countAll.textContent = `[${pad(allCount)}]`;
    if (countWastra) countWastra.textContent = `[${pad(wastraCount)}]`;
    if (countKriya) countKriya.textContent = `[${pad(kriyaCount)}]`;
    if (countLogam) countLogam.textContent = `[${pad(logamCount)}]`;
    if (countAnyaman) countAnyaman.textContent = `[${pad(anyamanCount)}]`;
  }

  function getFilteredAndSortedProducts() {
    const products = getCatalogProducts();
    updateCategoryTabCounts(products);
    
    let result = products.filter(p => {
      // Category Filter
      if (state.category !== 'all') {
        if (state.category === 'logam-instrumen') {
          if (p.cat !== 'logam-instrumen' && p.cat !== 'musik') return false;
        } else if (p.cat !== state.category) {
          return false;
        }
      }

      // Region Filter
      if (state.region !== 'all') {
        const pRegion = (p.region || '').toLowerCase();
        if (pRegion !== state.region) return false;
      }

      // Status Filter
      if (state.status !== 'all') {
        const isReady = (p.status || '').toLowerCase().includes('kirim') || (p.status || '').toLowerCase().includes('ready');
        if (state.status === 'ready' && !isReady) return false;
        if (state.status === 'wbtb' && isReady) return false;
      }

      // Technique Filter
      if (state.technique !== 'all' && p.technique !== state.technique) {
        return false;
      }

      // Live Search Filter
      if (state.search.trim()) {
        const query = state.search.toLowerCase().trim();
        const searchable = [
          p.name,
          p.catName,
          p.cat,
          p.category,
          p.regionName,
          p.region,
          p.origin,
          p.daerah,
          p.techniqueName,
          p.artisan,
          p.curator,
          p.village,
          p.material,
          p.code,
          p.desc
        ].filter(Boolean).join(' ').toLowerCase();

        if (!searchable.includes(query)) {
          return false;
        }
      }

      return true;
    });

    // Sorting
    if (state.sort === 'price-asc') {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (state.sort === 'price-desc') {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    } else if (state.sort === 'duration-desc') {
      result.sort((a, b) => (b.durationDays || 0) - (a.durationDays || 0));
    } else {
      // Default: Recommended
      result.sort((a, b) => (a.id || 0) - (b.id || 0));
    }

    return result;
  }

  function updateFilterActiveIndicator() {
    const indicator = document.getElementById('filter-active-indicator');
    const textEl = document.getElementById('filter-active-text');
    if (!indicator) return;

    const hasFilter = (state.region !== 'all') || (state.technique !== 'all') || (state.status !== 'all') || (state.search.trim().length > 0);
    if (hasFilter) {
      indicator.classList.remove('hidden');
      indicator.classList.add('flex');
      if (textEl) {
        if (state.search.trim()) {
          textEl.textContent = `CARI: "${state.search.trim().toUpperCase()}"`;
        } else if (state.region !== 'all') {
          textEl.textContent = `DAERAH: ${state.region.toUpperCase()}`;
        } else {
          textEl.textContent = 'FILTER AKTIF';
        }
      }
    } else {
      indicator.classList.add('hidden');
      indicator.classList.remove('flex');
    }
  }

  /* --------------------------------------------------------------------------
     5. DOM RENDERING (THE 4-COLUMN FAIRE & AESOP GRID)
     -------------------------------------------------------------------------- */
  function renderCatalogGrid() {
    const grid = document.getElementById('catalog-grid');
    const emptyState = document.getElementById('catalog-empty-state');
    const activeCountEl = document.getElementById('catalog-active-count');

    if (!grid) return;

    const filteredProducts = getFilteredAndSortedProducts();
    updateFilterActiveIndicator();
    if (activeCountEl) {
      activeCountEl.textContent = `[ ${filteredProducts.length} Karya ]`;
    }

    // Handle Empty State
    if (filteredProducts.length === 0) {
      grid.innerHTML = '';
      if (emptyState) emptyState.classList.remove('hidden');
      return;
    }

    if (emptyState) emptyState.classList.add('hidden');

    let html = '';
    filteredProducts.forEach(item => {
      const code = item.code || item.id || 'KRY-001';
      const detailUrl = `product-detail.html?id=${encodeURIComponent(code)}`;
      const isReady = (item.status || '').toLowerCase().includes('kirim') || (item.status || '').toLowerCase().includes('ready');
      const badgeText = isReady ? 'SIAP KIRIM' : 'KERAJINAN ASLI';
      const originPart = (item.origin || item.daerah || 'NUSANTARA').toUpperCase();
      const artisanPart = (item.artisan || 'PENGRAJIN').toUpperCase();
      const microContext = `${originPart} • ${artisanPart}`;
      const durationText = item.duration || 'Buatan Tangan';

      html += `
        <article class="catalog-card-faire card-3d marketplace-card-rise group" data-code="${code}" data-cat="${item.cat}">
          <!-- Area Visual (Rasio Potret 3:4) -->
          <div class="catalog-card-visual relative">
            <img src="${item.img || 'assets/images/logonusava.png'}" alt="${escapeHtml(item.name)}" class="catalog-card-img" loading="lazy" onerror="this.src='assets/images/logonusava.png'">
            
            <!-- 1 Badge Status Kurasi (Pojok Kiri Atas) -->
            <span class="catalog-curation-badge">${badgeText}</span>
            
            <!-- Calm Action Bar on Hover (Deep Espresso #1E1610, WCAG AAA) -->
            <div class="catalog-action-bar">
              <a href="${detailUrl}" class="btn-action-detail">
                <span>LIHAT DETAIL &amp; CERITA</span>
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
            <span class="layer-1-micro truncate" title="${escapeHtml(microContext)}">${escapeHtml(microContext)}</span>
            
            <!-- Lapis 2: Nama Karya Pusaka -->
            <h3 class="layer-2-title" title="${escapeHtml(item.name)}">
              <a href="${detailUrl}">${escapeHtml(item.name)}</a>
            </h3>
            
            <!-- Lapis 3: Harga & Estimasi Kriya -->
            <div class="layer-3-value">
              <span class="layer-3-price">Rp ${formatRupiah(item.price)}</span>
              <span class="layer-3-duration">${escapeHtml(durationText)}</span>
            </div>
          </div>
        </article>
      `;
    });

    grid.innerHTML = html;

    // Attach quick cart event listeners
    grid.querySelectorAll('[data-quick-cart]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const code = btn.getAttribute('data-quick-cart');
        addToCart(code, 1);
      });
    });

    // Make visual card area navigate to product detail on mobile/desktop tap
    grid.querySelectorAll('.catalog-card-faire').forEach(card => {
      const code = card.getAttribute('data-code');
      const visual = card.querySelector('.catalog-card-visual');
      if (visual && code) {
        visual.addEventListener('click', (e) => {
          if (e.target.closest('[data-quick-cart]')) return;
          if (e.target.closest('.btn-action-detail')) return;
          window.location.href = `product-detail.html?id=${encodeURIComponent(code)}`;
        });
      }
    });

    // Trigger Fluid Staggered Rise Entrance & 3D Tactile Interactions
    animateAndBindMarketplaceCards(grid);
  }

  /* --------------------------------------------------------------------------
     5B. STAGGERED RISE ANIMATION & 3D TACTILE ENGINE (Apple Spring Physics)
     -------------------------------------------------------------------------- */
  function animateAndBindMarketplaceCards(container) {
    if (!container) return;
    const cards = container.querySelectorAll('.marketplace-card-rise');
    if (!cards.length) return;

    // 1. Entrance Staggered Wave (IntersectionObserver)
    if ('IntersectionObserver' in window) {
      let batchCounter = 0;
      let lastCall = Date.now();

      const observer = new IntersectionObserver((entries) => {
        const now = Date.now();
        if (now - lastCall > 350) {
          batchCounter = 0;
        }
        lastCall = now;

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            const staggerDelay = (batchCounter % 4) * 75; // 0ms, 75ms, 150ms, 225ms per row
            batchCounter++;

            setTimeout(() => {
              card.classList.add('is-visible');
            }, staggerDelay);

            observer.unobserve(card);
          }
        });
      }, {
        threshold: 0.05,
        rootMargin: '0px 0px -20px 0px'
      });

      cards.forEach(card => observer.observe(card));
    } else {
      cards.forEach((card, idx) => {
        setTimeout(() => {
          card.classList.add('is-visible');
        }, (idx % 8) * 60);
      });
    }

    // 2. Bind Interactive 3D Cursor Tracking & Specular Light
    cards.forEach(bindCardTilt);
  }

  function bindCardTilt(card) {
    if (!card || card._tiltBound) return;
    card._tiltBound = true;

    let bounds = null;
    let rAF = null;

    card.addEventListener('mouseenter', () => {
      bounds = card.getBoundingClientRect();
      card.setAttribute('data-tilting', 'true');
      card.style.transition = 'transform 0.12s ease-out, box-shadow 0.2s ease-out, border-color 0.3s ease';
    });

    card.addEventListener('mousemove', (e) => {
      if (!bounds) bounds = card.getBoundingClientRect();
      if (!bounds.width || !bounds.height) return;

      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      const pctX = (mouseX / bounds.width) - 0.5;
      const pctY = (mouseY / bounds.height) - 0.5;

      const maxTilt = 7; // subtle luxury tilt
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
        card.style.boxShadow = `${shadowX}px ${shadowY}px 28px -6px rgba(36, 27, 22, 0.18), 0 0 16px rgba(197, 160, 89, 0.22)`;
      });
    });

    card.addEventListener('mouseleave', () => {
      if (rAF) cancelAnimationFrame(rAF);
      card.removeAttribute('data-tilting');
      bounds = null;
      card.style.transition = 'transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.35s ease';
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      card.style.boxShadow = '';
      setTimeout(() => {
        if (!card.hasAttribute('data-tilting')) {
          card.style.transform = '';
          card.style.transition = '';
        }
      }, 550);
    });
  }

  /* --------------------------------------------------------------------------
     6. FILTER DRAWER CONTROLS & POPULATION
     -------------------------------------------------------------------------- */
  function populateFilterDrawerOptions() {
    const regionContainer = document.getElementById('filter-region-list');
    const techniqueContainer = document.getElementById('filter-technique-list');

    // Populate Regions
    if (regionContainer && typeof NUSAVA_REGIONS !== 'undefined') {
      let rHtml = '';
      NUSAVA_REGIONS.forEach(reg => {
        const isActive = state.region === reg.id;
        rHtml += `
          <div class="editorial-filter-option ${isActive ? 'active' : ''}" data-filter-type="region" data-filter-val="${reg.id}">
            <span>${escapeHtml(reg.label)}</span>
          </div>
        `;
      });
      regionContainer.innerHTML = rHtml;

      regionContainer.querySelectorAll('.editorial-filter-option').forEach(el => {
        el.addEventListener('click', () => {
          state.region = el.getAttribute('data-filter-val');
          populateFilterDrawerOptions();
          renderCatalogGrid();
        });
      });
    }

    // Populate Techniques
    if (techniqueContainer && typeof NUSAVA_TECHNIQUES !== 'undefined') {
      let tHtml = '';
      NUSAVA_TECHNIQUES.forEach(tech => {
        const isActive = state.technique === tech.id;
        tHtml += `
          <div class="editorial-filter-option ${isActive ? 'active' : ''}" data-filter-type="technique" data-filter-val="${tech.id}">
            <span>${escapeHtml(tech.label)}</span>
          </div>
        `;
      });
      techniqueContainer.innerHTML = tHtml;

      techniqueContainer.querySelectorAll('.editorial-filter-option').forEach(el => {
        el.addEventListener('click', () => {
          state.technique = el.getAttribute('data-filter-val');
          populateFilterDrawerOptions();
          renderCatalogGrid();
        });
      });
    }
  }

  /* --------------------------------------------------------------------------
     7. DRAWER TOGGLE UTILITIES
     -------------------------------------------------------------------------- */
  function openFilterDrawer() {
    const drawer = document.getElementById('filter-drawer');
    const backdrop = document.getElementById('filter-backdrop');
    if (!drawer || !backdrop) return;

    populateFilterDrawerOptions();
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    state.isFilterDrawerOpen = true;
  }

  function closeFilterDrawer() {
    const drawer = document.getElementById('filter-drawer');
    const backdrop = document.getElementById('filter-backdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    state.isFilterDrawerOpen = false;
  }

  function openCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    renderCartDrawer();
    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('cart-open');
    state.isCartDrawerOpen = true;
    window.dispatchEvent(new CustomEvent('nusava-cart-opened'));
  }

  function closeCartDrawer() {
    const drawer = document.getElementById('cart-drawer');
    const backdrop = document.getElementById('cart-backdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    document.body.classList.remove('cart-open');
    state.isCartDrawerOpen = false;
    window.dispatchEvent(new CustomEvent('nusava-cart-closed'));
  }

  function openMobileNav() {
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.add('active');
    backdrop.classList.add('active');
    document.body.style.overflow = 'hidden';
    state.isMobileNavOpen = true;
  }

  function closeMobileNav() {
    const drawer = document.getElementById('mobile-nav-drawer');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    if (!drawer || !backdrop) return;

    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    document.body.style.overflow = '';
    state.isMobileNavOpen = false;
  }

  function toggleSearchBar() {
    const searchBar = document.getElementById('nav-search-bar');
    const input = document.getElementById('live-search-input');
    if (!searchBar) return;

    const isHidden = searchBar.classList.contains('hidden');
    if (isHidden) {
      searchBar.classList.remove('hidden');
      if (input) {
        input.focus();
        input.select();
      }
      state.isSearchOpen = true;
    } else {
      searchBar.classList.add('hidden');
      state.isSearchOpen = false;
    }
  }

  function closeSearchBar() {
    const searchBar = document.getElementById('nav-search-bar');
    if (searchBar) searchBar.classList.add('hidden');
    state.isSearchOpen = false;
  }

  /* --------------------------------------------------------------------------
     8. URL PARAMETERS PARSING
     -------------------------------------------------------------------------- */
  function parseUrlParameters() {
    try {
      const params = new URLSearchParams(window.location.search);
      
      const catParam = params.get('cat');
      if (catParam) {
        state.category = catParam;
      }

      const regParam = params.get('region');
      if (regParam) {
        state.region = regParam;
      }

      const qParam = params.get('q');
      if (qParam) {
        state.search = qParam;
        const input = document.getElementById('live-search-input');
        if (input) input.value = qParam;
        toggleSearchBar();
      }

      const openCartParam = params.get('openCart');
      if (openCartParam === 'true' || openCartParam === '1') {
        setTimeout(openCartDrawer, 300);
      }
    } catch (e) {
      console.warn('Gagal membaca URL search params:', e);
    }
  }

  function syncCategoryTabUI() {
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
      const cat = tab.getAttribute('data-category');
      if (cat === state.category) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });
  }

  /* --------------------------------------------------------------------------
     9. EVENT BINDINGS & INITIALIZATION
     -------------------------------------------------------------------------- */
  function initEventBindings() {
    // Category Index Bar (.category-index-btn)
    const indexBtns = document.querySelectorAll('.category-index-btn');
    indexBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        state.category = btn.getAttribute('data-filter') || 'all';
        indexBtns.forEach(b => {
          const isActive = b.getAttribute('data-filter') === state.category;
          b.classList.toggle('active', isActive);
          b.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });
        renderCatalogGrid();
      });
    });

    // Unified Control Bar inputs
    const catalogSearchInput = document.getElementById('catalog-search-input');
    if (catalogSearchInput) {
      catalogSearchInput.addEventListener('input', debounce((e) => {
        state.search = e.target.value;
        renderCatalogGrid();
      }, 150));
    }

    const catalogRegionFilter = document.getElementById('catalog-region-filter');
    if (catalogRegionFilter) {
      catalogRegionFilter.addEventListener('change', (e) => {
        state.region = e.target.value;
        renderCatalogGrid();
      });
    }

    const catalogStatusFilter = document.getElementById('catalog-status-filter');
    if (catalogStatusFilter) {
      catalogStatusFilter.addEventListener('change', (e) => {
        state.status = e.target.value;
        renderCatalogGrid();
      });
    }

    const catalogSortFilter = document.getElementById('catalog-sort-filter');
    if (catalogSortFilter) {
      catalogSortFilter.addEventListener('change', (e) => {
        state.sort = e.target.value;
        renderCatalogGrid();
      });
    }

    // 1. Category Tabs Click
    const tabs = document.querySelectorAll('.category-tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        state.category = tab.getAttribute('data-category') || 'all';
        renderCatalogGrid();
      });
    });

    // 2. Sort Select Change
    const sortSelect = document.getElementById('select-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        state.sort = e.target.value;
        renderCatalogGrid();
      });
    }

    // 3. Filter Drawer Trigger & Buttons
    const btnOpenFilter = document.getElementById('btn-open-filter-drawer');
    if (btnOpenFilter) {
      btnOpenFilter.addEventListener('click', openFilterDrawer);
    }

    const btnCloseFilter = document.getElementById('btn-close-filter-drawer');
    if (btnCloseFilter) {
      btnCloseFilter.addEventListener('click', closeFilterDrawer);
    }

    const filterBackdrop = document.getElementById('filter-backdrop');
    if (filterBackdrop) {
      filterBackdrop.addEventListener('click', closeFilterDrawer);
    }

    const btnApplyFilters = document.getElementById('btn-apply-filters');
    if (btnApplyFilters) {
      btnApplyFilters.addEventListener('click', () => {
        closeFilterDrawer();
        renderCatalogGrid();
      });
    }

    const btnDrawerReset = document.getElementById('btn-drawer-reset');
    if (btnDrawerReset) {
      btnDrawerReset.addEventListener('click', () => {
        state.region = 'all';
        state.technique = 'all';
        populateFilterDrawerOptions();
        renderCatalogGrid();
        showToast('Filter daerah & teknik diatur ulang');
      });
    }

    const btnResetFilters = document.getElementById('btn-reset-filters');
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', () => {
        state.region = 'all';
        state.technique = 'all';
        state.search = '';
        const searchInput = document.getElementById('live-search-input');
        if (searchInput) searchInput.value = '';
        renderCatalogGrid();
        showToast('Semua filter dinormalkan');
      });
    }

    const btnEmptyReset = document.getElementById('btn-empty-reset');
    if (btnEmptyReset) {
      btnEmptyReset.addEventListener('click', () => {
        state.category = 'all';
        state.region = 'all';
        state.technique = 'all';
        state.search = '';
        syncCategoryTabUI();
        const searchInput = document.getElementById('live-search-input');
        if (searchInput) searchInput.value = '';
        renderCatalogGrid();
      });
    }

    // 4. Cart Drawer Triggers
    const openCartButtons = document.querySelectorAll('[data-cart-open]');
    openCartButtons.forEach(btn => {
      btn.addEventListener('click', openCartDrawer);
    });

    const btnCloseCart = document.getElementById('btn-close-cart-drawer');
    if (btnCloseCart) {
      btnCloseCart.addEventListener('click', closeCartDrawer);
    }

    const cartBackdrop = document.getElementById('cart-backdrop');
    if (cartBackdrop) {
      cartBackdrop.addEventListener('click', closeCartDrawer);
    }

    const btnCartCheckoutWA = document.getElementById('btn-cart-checkout-wa');
    if (btnCartCheckoutWA) {
      btnCartCheckoutWA.addEventListener('click', handleCheckoutWhatsApp);
    }

    // 5. Mobile Nav Triggers (Synchronized with Landing Page)
    const mobileBtn = document.getElementById('mobile-menu-btn') || document.getElementById('btn-open-mobile-nav');
    const mobileClose = document.getElementById('mobile-menu-close') || document.getElementById('btn-close-mobile-nav');
    const mobileDrawer = document.getElementById('mobile-drawer');

    mobileBtn?.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('translate-x-full');
      } else {
        openMobileNav();
      }
    });

    mobileClose?.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.add('translate-x-full');
      } else {
        closeMobileNav();
      }
    });

    const mobileNavBackdrop = document.getElementById('mobile-nav-backdrop');
    if (mobileNavBackdrop) {
      mobileNavBackdrop.addEventListener('click', () => {
        closeMobileNav();
        mobileDrawer?.classList.add('translate-x-full');
      });
    }

    // 6. Search Bar Triggers
    const btnToggleSearch = document.getElementById('btn-toggle-search');
    if (btnToggleSearch) {
      btnToggleSearch.addEventListener('click', toggleSearchBar);
    }

    const btnCloseSearch = document.getElementById('btn-close-search');
    if (btnCloseSearch) {
      btnCloseSearch.addEventListener('click', closeSearchBar);
    }

    const searchInput = document.getElementById('live-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', debounce((e) => {
        state.search = e.target.value;
        renderCatalogGrid();
      }, 150));
    }

    // 7. Keyboard Navigation (ESC closes drawers/search)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (state.isFilterDrawerOpen) closeFilterDrawer();
        if (state.isCartDrawerOpen) closeCartDrawer();
        if (state.isMobileNavOpen) closeMobileNav();
        if (state.isSearchOpen) closeSearchBar();
      }
    });

    // 8. Newsletter Form
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
      newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = document.getElementById('newsletter-email-input');
        const successMsg = document.getElementById('newsletter-success');
        if (emailInput && emailInput.value) {
          if (successMsg) successMsg.classList.remove('hidden');
          emailInput.value = '';
          showToast('Terima kasih! Anda terhubung dengan warta pusaka Nusava');
        }
      });
    }

    // 9. Navbar Scroll & Auto-Reveal Matching Landing Page
    const nav = document.getElementById('navbar');
    if (nav) {
      let lastScrollY = window.scrollY;
      let ticking = false;

      function handleScroll() {
        const currentY = window.scrollY;
        const deltaY = currentY - lastScrollY;

        if (currentY > 40) {
          nav.classList.add('scrolled');
        } else {
          nav.classList.remove('scrolled');
        }

        if (currentY > 100) {
          if (deltaY > 6) {
            nav.classList.add('nav-hidden');
          } else if (deltaY < -6) {
            nav.classList.remove('nav-hidden');
          }
        } else {
          nav.classList.remove('nav-hidden');
        }

        lastScrollY = Math.max(0, currentY);
        ticking = false;
      }

      window.addEventListener('scroll', () => {
        if (!ticking) {
          requestAnimationFrame(handleScroll);
          ticking = true;
        }
      }, { passive: true });

      // Immediate initial check
      handleScroll();
    }

    // 10. Window Storage Sync (If cart changed in another tab or product-detail page)
    window.addEventListener('storage', (e) => {
      if (e.key === CART_STORAGE_KEY) {
        updateCartBadge();
        if (state.isCartDrawerOpen) {
          renderCartDrawer();
        }
      } else if (e.key === 'nusava_artisan_products') {
        renderCatalogGrid();
      }
    });

    window.addEventListener('nusava-cart-updated', () => {
      updateCartBadge();
      if (state.isCartDrawerOpen) {
        renderCartDrawer();
      }
    });
  }

  /* --------------------------------------------------------------------------
     10. INITIALIZATION
     -------------------------------------------------------------------------- */
  function init() {
    parseUrlParameters();
    syncCategoryTabUI();
    updateCartBadge();
    initEventBindings();
    populateFilterDrawerOptions();
    renderCatalogGrid();
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Export functions to window for interoperability
  window.NusavaMarketplace = {
    addToCart,
    openCartDrawer,
    closeCartDrawer,
    showToast,
    getCart
  };

})();
