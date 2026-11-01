/**
 * ==========================================================================
 * NUSAVABOT — FLOATING AI CHATBOT CONTROLLER (VANILLA JS ES6+)
 * Client-Side Conversation Engine, PUSAKA Knowledge Base & UMKM Recommendation
 * Strict Zero-Emoji Policy: 100% Pure Inline SVG Icons
 * Sesuai Standar Kompetisi Web Design TECHTOPIA Vol. 2
 * ==========================================================================
 */

(function () {
  'use strict';

  // State Management
  const chatState = {
    isOpen: false,
    isTyping: false,
    hasInteracted: false,
    history: []
  };

  // Inline SVG Icon Constants (Zero-Emoji Compliance)
  const ICONS = {
    compass: `<svg class="nusabot-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    shield: `<svg class="nusabot-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    feather: `<svg class="nusabot-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/><line x1="16" y1="8" x2="2" y2="22"/><line x1="17.5" y1="15" x2="9" y2="15"/></svg>`,
    mapPin: `<svg class="nusabot-chip-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>`,
    arrowRight: `<svg class="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`
  };

  // DOM Elements
  let els = {};

  function initElements() {
    els = {
      container: document.getElementById('nusabot-widget'),
      teaser: document.getElementById('nusabot-teaser'),
      launcher: document.getElementById('nusabot-launcher'),
      popup: document.getElementById('nusabot-popup'),
      closeBtn: document.getElementById('nusabot-close-btn'),
      chatBody: document.getElementById('nusabot-chat-body'),
      messagesContainer: document.getElementById('nusabot-messages'),
      inputField: document.getElementById('nusabot-input'),
      sendBtn: document.getElementById('nusabot-send-btn')
    };
  }

  /* --------------------------------------------------------------------------
     1. KNOWLEDGE BASE & INTENT MATCHING (PUSAKA & UMKM)
     -------------------------------------------------------------------------- */
  function getBotResponse(rawText) {
    const text = rawText.trim().toLowerCase();

    // 1. Rekomendasi Karya UMKM / Produk
    if (
      text.includes('rekomendasi') ||
      text.includes('karya umkm') ||
      text.includes('produk') ||
      text.includes('kriya') ||
      text.includes('katalog') ||
      text.includes('beli') ||
      text.includes('pesan')
    ) {
      return {
        text: 'Tentu! Berikut adalah tiga karya adiluhung kurasi Nusava yang paling banyak diapresiasi oleh pecinta budaya Nusantara karena teknik pembuatannya yang murni tanpa mesin industri:',
        products: [1, 2, 3] // Sumba, Giriloyo, Noken
      };
    }

    // 2. Filosofi Tema PUSAKA
    if (
      text.includes('pusaka') ||
      text.includes('filosofi') ||
      text.includes('tema') ||
      text.includes('techtopia') ||
      text.includes('arti')
    ) {
      return {
        text: 'Tema PUSAKA (Preserving Unity, Sustaining Ancestral Knowledge & Artistry) mencerminkan keyakinan bahwa kekayaan budaya Nusantara adalah jembatan persatuan bangsa. Setiap karya kriya bukan sekadar komoditas, melainkan rekaman sejarah, doa, dan kearifan para empu yang dijaga kelestariannya dari generasi ke generasi.'
      };
    }

    // 3. Panduan Rawat Wastra & Kriya
    if (
      text.includes('rawat') ||
      text.includes('perawatan') ||
      text.includes('cuci') ||
      text.includes('lerak') ||
      text.includes('awet') ||
      text.includes('simpan')
    ) {
      return {
        text: 'Merawat pusaka berpewarna alami membutuhkan kelembutan tradisi:\n• Wastra Tenun & Batik: Jangan gunakan deterjen kimia sintetis. Cuci tangan menggunakan sari buah lerak alami, hindari memeras kencang, dan angin-anginkan di tempat teduh.\n• Kriya Kayu & Totem: Usapkan minyak kelapa murni (VCO) setiap 6 bulan sekali agar urat kayu tidak retak oleh udara kering.\n• Kriya Perak: Simpan dalam kantong beludru kedap udara dan bersihkan dengan kain mikrofiber halus.'
      };
    }

    // 4. Eksplorasi Daerah / Wilayah Nusantara
    if (
      text.includes('daerah') ||
      text.includes('wilayah') ||
      text.includes('kepulauan') ||
      text.includes('peta') ||
      text.includes('jelajah')
    ) {
      return {
        text: 'Nusava mengintegrasikan karya dari 6 kepulauan besar Nusantara:\n• Bali & Nusa Tenggara: Tenun Ikat Sumba, Perak Celuk, Sasando Rote, Anyaman Ketak.\n• Jawa: Batik Canting Giriloyo, Keris Kamardikan, Gerabah Kasongan.\n• Sumatera: Songket Lepus Emas Sriwijaya.\n• Kalimantan: Perisai Ukir Talawang Dayak.\n• Sulawesi: Tenun Sutra Sengkang Bugis.\n• Papua & Maluku: Noken Rajut Lembah Baliem, Patung Totem Mbis Asmat.'
      };
    }

    // 5. Spesifik: Batik Giriloyo
    if (text.includes('batik') || text.includes('giriloyo') || text.includes('canting')) {
      return {
        text: 'Batik Tulis Nitik Giriloyo adalah warisan UNESCO 2009 dari Imogiri, Yogyakarta. Dibuat menggunakan canting belah cawang khusus tanpa garis lurus biasa, melainkan susunan jutaan titik malam alami.',
        products: [2]
      };
    }

    // 6. Spesifik: Tenun Sumba
    if (text.includes('tenun') || text.includes('sumba') || text.includes('hinggi')) {
      return {
        text: 'Kain Tenun Ikat Hinggi Sumba Timur ditenun selama 8 bulan oleh Kelompok Mama Lambanapu. Menggunakan 40 kali celupan ramuan akar pohon mengkudu dan daun nila liar alami.',
        products: [1]
      };
    }

    // 7. Spesifik: Noken Papua
    if (text.includes('noken') || text.includes('papua') || text.includes('baliem')) {
      return {
        text: 'Tas Noken dirajut oleh para mama di Lembah Baliem dari serat kulit kayu melinjo liar. Diakui UNESCO sebagai simbol rahim kehidupan dan cinta kasih ibu Papua.',
        products: [3]
      };
    }

    // 8. Spesifik: Keris atau Perak
    if (text.includes('keris') || text.includes('perak') || text.includes('celuk') || text.includes('logam')) {
      return {
        text: 'Karya tempa logam Nusantara memadukan kesabaran api dan ketelitian rasa:\n• Keris Kamardikan Dhapur Sengkelat luk 13 pamor Wos Wutah karya empu Aeng Tong-Tong Sumenep.\n• Perhiasan Perak Filigri Kembang Teratai karya maestro banjar Celuk Gianyar Bali.',
        products: [4, 9]
      };
    }

    // 9. Transparansi & Dampak Pengrajin (Fair Craft)
    if (text.includes('harga') || text.includes('dampak') || text.includes('umkm') || text.includes('pengrajin')) {
      return {
        text: 'Nusava menerapkan asas Perdagangan Berkeadilan (Fair Craft). Hingga 72% dari nilai apresiasi langsung disalurkan ke keluarga pengrajin di desa adat, 18% untuk pelestarian bahan alami lokal, dan 10% untuk sertifikasi keaslian budaya resmi.'
      };
    }

    // 10. Salam / Sapaan
    if (text.includes('halo') || text.includes('hai') || text.includes('pagi') || text.includes('siang') || text.includes('sore') || text.includes('malam')) {
      return {
        text: 'Salam hangat! Saya NusaBot, asisten kurator cerdas Nusava. Saya siap membantu Anda menelusuri kisah pusaka, filosofi motif adat, maupun rekomendasi karya kriya asli langsung dari para maestro desa.'
      };
    }

    // Default Fallback
    return {
      text: 'Pertanyaan yang sangat menarik. Sebagai kurator budaya, saya siap membantu Anda menjelajahi keagungan tradisi Nusantara. Anda dapat memilih salah satu topik rekomendasi di bawah ini atau menanyakan tentang tenun, batik, ukiran, maupun pengrajin daerah tertentu.'
    };
  }

  /* --------------------------------------------------------------------------
     2. UI RENDERING & MESSAGE DISPATCH
     -------------------------------------------------------------------------- */
  function formatIDR(amount) {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0
    }).format(amount);
  }

  function appendUserMessage(text) {
    const row = document.createElement('div');
    row.className = 'nusabot-msg-row user';
    row.innerHTML = `
      <div class="nusabot-msg-content-wrap">
        <div class="nusabot-bubble-user">
          ${escapeHtml(text)}
        </div>
        <span class="nusabot-msg-time">Baru saja</span>
      </div>
    `;
    els.messagesContainer.appendChild(row);
    scrollToBottom();
  }

  function appendBotMessage(responseObj) {
    showTypingIndicator();

    setTimeout(() => {
      removeTypingIndicator();

      const row = document.createElement('div');
      row.className = 'nusabot-msg-row bot';

      let productsHtml = '';
      if (responseObj.products && Array.isArray(responseObj.products) && typeof NUSAVA_PRODUCTS !== 'undefined') {
        const matching = NUSAVA_PRODUCTS.filter(p => responseObj.products.includes(p.id));
        if (matching.length > 0) {
          productsHtml = matching.map(p => `
            <div class="nusabot-product-card">
              <img src="${p.img}" alt="${escapeHtml(p.name)}" class="nusabot-product-card-img" onerror="this.src='assets/images/logonusava.png'">
              <div class="nusabot-product-card-body">
                <span class="nusabot-product-card-title">${escapeHtml(p.name)}</span>
                <span class="nusabot-product-card-meta">${escapeHtml(p.daerah)} • ${escapeHtml(p.duration || 'Karya Tangan')}</span>
                <div class="nusabot-product-card-footer">
                  <span class="nusabot-product-card-price">${formatIDR(p.price)}</span>
                  <a href="${getProductDetailUrl(p.id)}" class="nusabot-product-card-btn" data-nusabot-product="${p.id}">
                    <span>Lihat Karya</span>
                    ${ICONS.arrowRight}
                  </a>
                </div>
              </div>
            </div>
          `).join('');
        }
      }

      row.innerHTML = `
        <div class="nusabot-bot-avatar-small">
          <img src="assets/icons/logo-nusabot.png" alt="NusaBot Avatar">
        </div>
        <div class="nusabot-msg-content-wrap">
          <div class="nusabot-bubble-bot">
            ${formatBotText(responseObj.text)}
            ${productsHtml}
          </div>
          <span class="nusabot-msg-time">Baru saja</span>
        </div>
      `;

      els.messagesContainer.appendChild(row);
      attachProductCardListeners(row);
      scrollToBottom();
    }, 750);
  }

  function getProductDetailUrl(productId) {
    let code = `KRY-${String(productId).padStart(3, '0')}`;
    if (typeof NUSAVA_PRODUCTS !== 'undefined') {
      const p = NUSAVA_PRODUCTS.find(item => item.id === productId || item.code === productId);
      if (p && p.code) code = p.code;
    }
    return `product-detail.html?id=${encodeURIComponent(code)}`;
  }

  function attachProductCardListeners(scopeEl) {
    scopeEl.querySelectorAll('[data-nusabot-product]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(btn.dataset.nusabotProduct);
        // If on marketplace.html, trigger slideover drawer directly
        if (typeof window.NusavaMarketplace !== 'undefined' && window.NusavaMarketplace.openProductDrawer) {
          e.preventDefault();
          window.NusavaMarketplace.openProductDrawer(id);
        } else if (typeof window.openProductQuickView === 'function') {
          e.preventDefault();
          window.openProductQuickView(id);
        }
      });
    });
  }

  function showTypingIndicator() {
    removeTypingIndicator();
    const typingRow = document.createElement('div');
    typingRow.id = 'nusabot-typing-row';
    typingRow.className = 'nusabot-msg-row bot';
    typingRow.innerHTML = `
      <div class="nusabot-bot-avatar-small">
        <img src="assets/icons/logo-nusabot.png" alt="NusaBot Avatar">
      </div>
      <div class="nusabot-typing-indicator">
        <div class="nusabot-typing-dot"></div>
        <div class="nusabot-typing-dot"></div>
        <div class="nusabot-typing-dot"></div>
      </div>
    `;
    els.messagesContainer.appendChild(typingRow);
    scrollToBottom();
  }

  function removeTypingIndicator() {
    const existing = document.getElementById('nusabot-typing-row');
    if (existing) existing.remove();
  }

  function scrollToBottom() {
    if (els.chatBody) {
      els.chatBody.scrollTop = els.chatBody.scrollHeight;
    }
  }

  function formatBotText(str) {
    return escapeHtml(str).replace(/\n/g, '<br>');
  }

  function escapeHtml(text) {
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, m => map[m]);
  }

  /* --------------------------------------------------------------------------
     3. INTERACTION HANDLERS & POPUP TOGGLE
     -------------------------------------------------------------------------- */
  function openChatbot() {
    chatState.isOpen = true;
    chatState.hasInteracted = true;
    if (els.popup) els.popup.classList.add('active');
    if (els.launcher) els.launcher.classList.add('open');
    if (els.teaser) els.teaser.classList.remove('visible');

    // Auto focus on input after opening
    setTimeout(() => {
      if (els.inputField) els.inputField.focus();
    }, 250);
  }

  function closeChatbot() {
    chatState.isOpen = false;
    if (els.popup) els.popup.classList.remove('active');
    if (els.launcher) els.launcher.classList.remove('open');
  }

  function toggleChatbot() {
    if (chatState.isOpen) {
      closeChatbot();
    } else {
      openChatbot();
    }
  }

  function handleSendMessage() {
    if (!els.inputField) return;
    const text = els.inputField.value.trim();
    if (!text) return;

    appendUserMessage(text);
    els.inputField.value = '';

    const response = getBotResponse(text);
    appendBotMessage(response);
  }

  function handleChipClick(chipText) {
    appendUserMessage(chipText);
    const response = getBotResponse(chipText);
    appendBotMessage(response);
  }

  /* --------------------------------------------------------------------------
     4. EVENT BINDINGS
     -------------------------------------------------------------------------- */
  function bindEvents() {
    // Launcher button toggle
    if (els.launcher) {
      els.launcher.addEventListener('click', toggleChatbot);
    }

    // Teaser pill click
    if (els.teaser) {
      els.teaser.addEventListener('click', openChatbot);
    }

    // Close button
    if (els.closeBtn) {
      els.closeBtn.addEventListener('click', closeChatbot);
    }

    // Send button click
    if (els.sendBtn) {
      els.sendBtn.addEventListener('click', handleSendMessage);
    }

    // Input Enter key press
    if (els.inputField) {
      els.inputField.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleSendMessage();
        }
      });
    }

    // Quick-reply suggestion chips click
    document.querySelectorAll('[data-nusabot-chip]').forEach(chipBtn => {
      chipBtn.addEventListener('click', () => {
        const text = chipBtn.dataset.nusabotChip;
        handleChipClick(text);
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && chatState.isOpen) {
        closeChatbot();
      }
    });

    // Delay teaser pill appearance by 2.5s (as agreed with user)
    setTimeout(() => {
      if (!chatState.hasInteracted && els.teaser) {
        els.teaser.classList.add('visible');
      }
    }, 2500);

    // Wire up any external CTA buttons targeting NusaBot
    document.querySelectorAll('[data-open-nusabot]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openChatbot();
      });
    });

    // Auto-hide NusaBot whenever the cart drawer opens (Prevent covering checkout buttons)
    function syncCartDrawerState() {
      const cartDrawer = document.getElementById('cart-drawer');
      const isCartOpen = document.body.classList.contains('cart-open') ||
                         document.body.classList.contains('cart-drawer-open') ||
                         (cartDrawer && (cartDrawer.classList.contains('open') || cartDrawer.classList.contains('active')));
      if (els.container) {
        if (isCartOpen) {
          if (chatState.isOpen) closeChatbot();
          els.container.style.opacity = '0';
          els.container.style.pointerEvents = 'none';
          els.container.style.visibility = 'hidden';
          els.container.style.transform = 'translateY(20px) scale(0.9)';
        } else {
          els.container.style.opacity = '';
          els.container.style.pointerEvents = '';
          els.container.style.visibility = '';
          els.container.style.transform = '';
        }
      }
    }

    const cartDrawerEl = document.getElementById('cart-drawer');
    if (window.MutationObserver) {
      const obs = new MutationObserver(syncCartDrawerState);
      if (cartDrawerEl) obs.observe(cartDrawerEl, { attributes: true, attributeFilter: ['class'] });
      obs.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    }
    window.addEventListener('nusava-cart-opened', syncCartDrawerState);
    window.addEventListener('nusava-cart-closed', syncCartDrawerState);
  }

  /* --------------------------------------------------------------------------
     5. GLOBAL EXPORT
     -------------------------------------------------------------------------- */
  window.openNusaBot = function (initialQuery) {
    openChatbot();
    if (initialQuery && typeof initialQuery === 'string') {
      handleChipClick(initialQuery);
    }
  };

  /* --------------------------------------------------------------------------
     6. INITIALIZATION
     -------------------------------------------------------------------------- */
  function init() {
    initElements();
    bindEvents();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
