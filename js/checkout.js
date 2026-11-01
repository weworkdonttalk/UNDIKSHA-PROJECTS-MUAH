/**
 * ==========================================================================
 * NUSAVA — CHECKOUT CONTROLLER (VANILLA JS)
 * Handles Cart Retrieval, Dynamic Order Summary, Interactive Payment Methods,
 * Multi-Option Payment (VA, QRIS, WA), and Invoice Generation
 * ==========================================================================
 */

(function () {
  'use strict';

  const CART_STORAGE_KEY = 'nusava_cart_items';
  let selectedPaymentMethod = 'va'; // 'va', 'qris', 'wa'
  let selectedCourier = 'JNE Regular';

  // Format IDR Helper
  function formatIDR(amount) {
    if (typeof amount !== 'number') amount = Number(amount) || 0;
    return 'Rp ' + amount.toLocaleString('id-ID');
  }

  // Get Shared Cart
  function getCart() {
    try {
      const data = localStorage.getItem(CART_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn('Gagal membaca data keranjang:', e);
      return [];
    }
  }

  // Update Cart Badge on Navbar
  function updateNavCartBadge() {
    const cart = getCart();
    const count = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
    const badge = document.getElementById('nav-cart-count');
    if (badge) {
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }
  }

  // Render Checkout Order Summary
  function renderOrderSummary() {
    const cart = getCart();
    const container = document.getElementById('checkout-items-list');
    const badgeCount = document.getElementById('checkout-badge-count');
    const subtotalEl = document.getElementById('checkout-subtotal');
    const totalEl = document.getElementById('checkout-total-price');
    const btnSubmit = document.getElementById('btn-submit-order');

    if (!container) return;

    const totalCount = cart.reduce((acc, item) => acc + (item.qty || 1), 0);
    const subtotal = cart.reduce((acc, item) => acc + ((item.price || 0) * (item.qty || 1)), 0);

    if (badgeCount) badgeCount.textContent = `${totalCount} Karya`;
    if (subtotalEl) subtotalEl.textContent = formatIDR(subtotal);
    if (totalEl) totalEl.textContent = formatIDR(subtotal);

    if (cart.length === 0) {
      container.innerHTML = `
        <div class="py-8 text-center text-[#6B5E55] space-y-3">
          <div class="w-12 h-12 mx-auto rounded-full bg-[#EDE4D5] flex items-center justify-center text-[#C5A059]">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>
          </div>
          <p class="font-sans text-xs">Keranjang Anda masih kosong.</p>
          <a href="marketplace.html" class="inline-block px-4 py-2 rounded-full border border-[#963D06] text-[#963D06] hover:bg-[#963D06] hover:text-white transition-colors text-xs font-semibold">
            Pilih Karya Budaya Sekarang
          </a>
        </div>
      `;
      if (btnSubmit) {
        btnSubmit.disabled = true;
        btnSubmit.style.opacity = '0.5';
        btnSubmit.style.cursor = 'not-allowed';
      }
      return;
    }

    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.style.opacity = '1';
      btnSubmit.style.cursor = 'pointer';
    }

    container.innerHTML = cart.map(item => `
      <div class="flex items-center gap-3 p-2.5 rounded-xl bg-[#FAF7F2] border border-[#EDE4D5]/70">
        <img src="${item.img || 'assets/images/logonusava.png'}" alt="${item.name || 'Karya Pusaka'}" class="w-14 h-14 rounded-lg bg-[#EDE4D5] object-cover flex-shrink-0" onerror="this.src='assets/images/logonusava.png'" />
        <div class="flex-1 min-w-0">
          <h4 class="font-sans font-semibold text-xs text-[#2B231D] truncate block">
            ${item.name || 'Karya Pusaka'}
          </h4>
          <span class="text-[11px] text-[#7A6F64] block truncate">
            ${item.daerah || item.artisan || 'Karya Nusantara'}
          </span>
          <div class="flex items-center justify-between mt-1 text-xs">
            <span class="text-[#7A6F64]">Qty: <strong class="text-[#2B231D]">${item.qty || 1}</strong></span>
            <span class="font-bold text-[#963D06]">${formatIDR((item.price || 0) * (item.qty || 1))}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Payment Option Cards Selection
  function initPaymentOptions() {
    const cards = document.querySelectorAll('.payment-option-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedPaymentMethod = card.getAttribute('data-method') || 'va';
      });
    });
  }

  // Shipping Option Cards Selection
  function initShippingOptions() {
    const cards = document.querySelectorAll('.shipping-option-card');
    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
        selectedCourier = card.getAttribute('data-courier-name') || 'JNE Regular';
      });
    });
  }

  // Generate Unique Order ID
  function generateOrderID() {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    return `NSV-202610-${randomNum}`;
  }

  // Handle Checkout Submit
  window.handleCheckoutSubmit = function () {
    const cart = getCart();
    if (cart.length === 0) {
      alert('Keranjang belanja Anda masih kosong.');
      return;
    }

    const name = document.getElementById('cust-name')?.value.trim();
    const phone = document.getElementById('cust-phone')?.value.trim();
    const address = document.getElementById('cust-address')?.value.trim();
    const province = document.getElementById('cust-province')?.value.trim();
    const city = document.getElementById('cust-city')?.value.trim();
    const postal = document.getElementById('cust-postal')?.value.trim();

    if (!name || !phone || !address || !province || !city || !postal) {
      alert('Mohon lengkapi seluruh kolom bertanda bintang (*) sebelum melanjutkan.');
      return;
    }

    const orderID = generateOrderID();
    const subtotal = cart.reduce((acc, item) => acc + ((item.price || 0) * (item.qty || 1)), 0);

    // Populate Modal Elements
    const modal = document.getElementById('order-success-modal');
    const invoiceIdEl = document.getElementById('modal-invoice-id');
    const recipientEl = document.getElementById('modal-recipient');
    const methodEl = document.getElementById('modal-payment-method');
    const totalAmountEl = document.getElementById('modal-total-amount');
    const instructionsEl = document.getElementById('modal-payment-instructions');

    if (invoiceIdEl) invoiceIdEl.textContent = orderID;
    if (recipientEl) recipientEl.textContent = `${name} (${city}, ${province})`;
    if (totalAmountEl) totalAmountEl.textContent = formatIDR(subtotal);

    // Method Details
    if (selectedPaymentMethod === 'va') {
      if (methodEl) methodEl.textContent = 'Virtual Account Bank BCA';
      if (instructionsEl) {
        instructionsEl.innerHTML = `
          <div class="p-3 bg-white rounded-lg border border-[#EDE4D5]">
            <span class="text-[11px] text-[#7A6F64] block">Nomor Virtual Account BCA:</span>
            <span class="font-mono font-bold text-sm text-[#2B231D] tracking-wider block my-0.5">8801 9283 7102 9481</span>
            <span class="text-[10px] text-[#10B981] font-semibold">Tersedia 24 Jam • Verifikasi Otomatis</span>
          </div>
        `;
      }
    } else if (selectedPaymentMethod === 'qris') {
      if (methodEl) methodEl.textContent = 'QRIS Instan';
      if (instructionsEl) {
        instructionsEl.innerHTML = `
          <div class="p-3 bg-white rounded-lg border border-[#EDE4D5] text-center space-y-2">
            <span class="text-[11px] text-[#7A6F64] block">Scan Kode QRIS di bawah ini dengan aplikasi e-Wallet atau m-Banking Anda:</span>
            <div class="w-36 h-36 mx-auto bg-[#FAF7F2] border border-[#D5CEC2] rounded-lg p-2 flex items-center justify-center">
              <svg class="w-28 h-28 text-[#2B231D]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                <rect x="2" y="2" width="8" height="8" rx="1"/>
                <rect x="14" y="2" width="8" height="8" rx="1"/>
                <rect x="2" y="14" width="8" height="8" rx="1"/>
                <path d="M6 6h.01M18 6h.01M6 18h.01M14 14h3v3h-3zM14 20h6M20 14v6"/>
              </svg>
            </div>
            <span class="text-[10px] text-[#7A6F64] block">Mendukung GoPay, OVO, ShopeePay, DANA, BCA, Mandiri, BRImo</span>
          </div>
        `;
      }
    } else {
      if (methodEl) methodEl.textContent = 'WhatsApp Pengrajin (Opsional)';
      if (instructionsEl) {
        instructionsEl.innerHTML = `
          <div class="p-3 bg-white rounded-lg border border-[#EDE4D5]">
            <span class="text-[11px] text-[#7A6F64] block">Rincian pesanan siap diteruskan ke WhatsApp Pengrajin:</span>
            <button type="button" onclick="handleWhatsAppCheckout();" class="mt-2 w-full py-2 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-lg font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer">
              <span>Buka Chat WhatsApp Pengrajin Sekarang</span>
            </button>
          </div>
        `;
      }
    }

    // Save summary for clipboard copy
    window.__currentInvoiceData = {
      orderID,
      name,
      phone,
      address: `${address}, ${city}, ${province} (${postal})`,
      courier: selectedCourier,
      total: formatIDR(subtotal),
      method: selectedPaymentMethod.toUpperCase(),
      items: cart.map(i => `${i.name} (${i.qty}x)`).join(', ')
    };

    // Show Modal
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
    }

    // Clear cart upon successful order creation
    try {
      localStorage.removeItem(CART_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('nusava-cart-updated', { detail: { cart: [] } }));
      updateNavCartBadge();
    } catch (err) {
      console.warn(err);
    }
  };

  // Handle WhatsApp Checkout (Optional direct button)
  window.handleWhatsAppCheckout = function () {
    const cart = getCart();
    const name = document.getElementById('cust-name')?.value.trim() || 'Pembeli Nusava';
    const city = document.getElementById('cust-city')?.value.trim() || 'Indonesia';
    const total = cart.reduce((acc, item) => acc + ((item.price || 0) * (item.qty || 1)), 0);

    const itemsText = cart.map((i, idx) => `${idx + 1}. ${i.name} (${i.daerah || 'Nusantara'}) - ${i.qty || 1} karya (Rp ${(i.price || 0).toLocaleString('id-ID')})`).join('\n');

    const msg = `Halo Tim Pengrajin & Layanan Nusava,%0A%0ASaya ingin menyelesaikan pesanan karya budaya berikut:%0A${encodeURIComponent(itemsText)}%0A%0A*Kurir Pengiriman*: ${encodeURIComponent(selectedCourier)} (Gratis)%0A*Total Pembayaran*: ${encodeURIComponent(formatIDR(total))}%0A*Nama Pemesan*: ${encodeURIComponent(name)}%0A*Kota Pengiriman*: ${encodeURIComponent(city)}%0A%0AMohon konfirmasi ketersediaan karya dan jadwal pengiriman pesanan. Terima kasih!`;

    const waUrl = `https://wa.me/6281234567890?text=${msg}`;
    window.open(waUrl, '_blank');
  };

  // Copy Invoice Details to Clipboard
  window.copyInvoiceDetails = function () {
    const data = window.__currentInvoiceData;
    if (!data) return;

    const copyText = `--- INVOICE PESANAN NUSAVA ---
Nomor Invoice: ${data.orderID}
Penerima: ${data.name}
Alamat: ${data.address}
Kurir Pengiriman: ${data.courier || 'JNE Regular'} (Gratis)
Karya: ${data.items}
Total Tagihan: ${data.total}
Metode Pembayaran: ${data.method}
Status: Menunggu Konfirmasi Pengiriman`;

    navigator.clipboard.writeText(copyText).then(() => {
      const btnText = document.getElementById('copy-btn-text');
      if (btnText) {
        btnText.textContent = 'Berhasil Disalin!';
        setTimeout(() => {
          btnText.textContent = 'Salin Rincian Invoice';
        }, 2500);
      }
    }).catch(() => {
      alert('Rincian invoice berhasil disalin.');
    });
  };

  // Mobile Navigation Drawer
  function initMobileDrawer() {
    const openBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('mobile-menu-close');
    const drawer = document.getElementById('mobile-drawer');
    if (!drawer) return;

    openBtn?.addEventListener('click', () => {
      drawer.classList.remove('translate-x-full');
    });
    closeBtn?.addEventListener('click', () => {
      drawer.classList.add('translate-x-full');
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        drawer.classList.add('translate-x-full');
      });
    });
  }

  // Newsletter Subscription
  function initNewsletter() {
    const form = document.getElementById('newsletter-form');
    if (!form) return;
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = document.getElementById('newsletter-email');
      if (emailInput && emailInput.value.trim()) {
        alert('Terima kasih! Anda telah terdaftar dalam Warta Warisan Nusava.');
        emailInput.value = '';
      }
    });
  }

  // Initialization
  function init() {
    updateNavCartBadge();
    renderOrderSummary();
    initPaymentOptions();
    initShippingOptions();
    initMobileDrawer();
    initNewsletter();

    window.addEventListener('storage', (e) => {
      if (e.key === CART_STORAGE_KEY) {
        updateNavCartBadge();
        renderOrderSummary();
      }
    });

    window.addEventListener('nusava-cart-updated', () => {
      updateNavCartBadge();
      renderOrderSummary();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
