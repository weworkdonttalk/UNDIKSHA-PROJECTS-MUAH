/* =============================================================================
   NUSAVA — PROFILE CONTROLLER & ORDER ARCHIVE ENGINE (js/profile.js)
   Interaktivitas Tab, Manajemen Data Pribadi, & Arsip Koleksi Pesanan
   Standar Kompetisi: TECHTOPIA Vol. 2 INTEGER#8 · Universitas Pendidikan Ganesha
   ============================================================================= */

(function (window, document) {
  'use strict';

  /* ---------------------------------------------------------------------------
     1. Inisialisasi Sesi Pengguna
     --------------------------------------------------------------------------- */
  function getActiveUser() {
    let user = window.NusavaAuth ? window.NusavaAuth.getCurrentUser() : null;
    
    // Default Fallback jika belum login (untuk demo/penilaian juri lomba)
    if (!user) {
      user = {
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
      if (window.NusavaAuth) {
        window.NusavaAuth.setCurrentUser(user);
      }
    }
    return user;
  }

  /* ---------------------------------------------------------------------------
     2. Render Data Profil ke Tampilan & Formulir
     --------------------------------------------------------------------------- */
  function renderProfileHeroAndForm() {
    const user = getActiveUser();
    if (!user) return;

    const isArtisan = user.role === 'pengrajin';
    const initials = window.NusavaAuth ? window.NusavaAuth.getInitials(user.name) : 'U';

    // Hero Elements
    const avatarEl = document.getElementById('profile-hero-avatar');
    const previewAvatarEl = document.getElementById('profile-preview-avatar');
    const nameEl = document.getElementById('profile-hero-name');
    const subtitleEl = document.getElementById('profile-hero-subtitle');
    const roleBadgeEl = document.getElementById('profile-role-badge');
    const emailEl = document.getElementById('profile-hero-email');
    const regionEl = document.getElementById('profile-hero-region');
    const portalBtnEl = document.getElementById('profile-portal-btn');
    const roleDotEl = document.getElementById('profile-role-dot');

    if (avatarEl) {
      if (user.avatar) {
        avatarEl.innerHTML = `<img src="${user.avatar}" alt="${user.name}" class="w-full h-full object-cover">`;
      } else {
        avatarEl.textContent = initials;
      }
    }

    if (previewAvatarEl) {
      if (user.avatar) {
        previewAvatarEl.innerHTML = `<img src="${user.avatar}" alt="${user.name}" class="w-full h-full object-cover">`;
      } else {
        previewAvatarEl.textContent = initials;
      }
    }

    if (nameEl) nameEl.textContent = user.name;
    
    if (subtitleEl) {
      if (isArtisan) {
        subtitleEl.textContent = `${user.title || 'Maestro Seni Ukir Tradisional'} • ${user.studio || 'Sanggar Seni Budaya'}`;
      } else {
        subtitleEl.textContent = user.title || 'Pecinta dan Pelestari Karya Warisan Budaya Nusantara';
      }
    }

    if (roleBadgeEl) {
      roleBadgeEl.textContent = isArtisan ? 'Mitra Pengrajin Maestro' : 'Kolektor Pusaka';
      if (isArtisan) {
        roleBadgeEl.className = 'px-3 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider bg-emerald-900/20 text-emerald-800 border border-emerald-600/40';
      } else {
        roleBadgeEl.className = 'px-3 py-1 rounded-full text-[11px] font-sans font-bold uppercase tracking-wider bg-[#EDE4D5] text-[#2B231D] border border-[#C5A059]/40';
      }
    }

    if (roleDotEl) {
      roleDotEl.className = `absolute bottom-1 right-1 w-6 h-6 rounded-full ${isArtisan ? 'bg-emerald-500' : 'bg-[#C5A059]'} border-2 border-[#FAF7F2] flex items-center justify-center text-white shadow-xs`;
    }

    if (emailEl) emailEl.textContent = user.email || 'user@nusava.id';
    if (regionEl) regionEl.textContent = user.region || 'Indonesia';

    if (portalBtnEl) {
      if (isArtisan) {
        portalBtnEl.href = 'dashboard.html';
        portalBtnEl.innerHTML = `<span>Buka Dashboard Pengrajin</span><span>↗</span>`;
      } else {
        portalBtnEl.href = 'marketplace.html';
        portalBtnEl.innerHTML = `<span>Jelajahi Koleksi Budaya</span><span>→</span>`;
      }
    }

    // Form Inputs
    const fieldName = document.getElementById('field-name');
    const fieldTitle = document.getElementById('field-title');
    const fieldEmail = document.getElementById('field-email');
    const fieldPhone = document.getElementById('field-phone');
    const fieldRegion = document.getElementById('field-region');
    const fieldStudio = document.getElementById('field-studio');
    const fieldAddress = document.getElementById('field-address');

    if (fieldName) fieldName.value = user.name || '';
    if (fieldTitle) fieldTitle.value = user.title || '';
    if (fieldEmail) fieldEmail.value = user.email || '';
    if (fieldPhone) fieldPhone.value = user.phone || '081234567890';
    if (fieldRegion) fieldRegion.value = user.region || '';
    if (fieldStudio) fieldStudio.value = user.studio || '';
    if (fieldAddress) fieldAddress.value = user.address || '';
  }

  /* ---------------------------------------------------------------------------
     3. Tabbed Navigation Logic (Apple Segmented Controller)
     --------------------------------------------------------------------------- */
  function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.profile-tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab-target');
        if (!targetId) return;

        // Toggle active button
        tabButtons.forEach(b => {
          b.classList.remove('active');
          b.classList.add('text-[#6B5E55]');
        });
        btn.classList.add('active');
        btn.classList.remove('text-[#6B5E55]');

        // Toggle pane visibility
        tabPanes.forEach(pane => {
          if (pane.id === targetId) {
            pane.classList.remove('hidden');
            pane.classList.add('block');
          } else {
            pane.classList.add('hidden');
            pane.classList.remove('block');
          }
        });
      });
    });
  }

  /* ---------------------------------------------------------------------------
     4. Form Submission & Update LocalStorage
     --------------------------------------------------------------------------- */
  function initProfileForm() {
    const form = document.getElementById('profile-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const user = getActiveUser();
      user.name = document.getElementById('field-name')?.value.trim() || user.name;
      user.title = document.getElementById('field-title')?.value.trim() || user.title;
      user.email = document.getElementById('field-email')?.value.trim() || user.email;
      user.phone = document.getElementById('field-phone')?.value.trim() || user.phone;
      user.region = document.getElementById('field-region')?.value.trim() || user.region;
      user.studio = document.getElementById('field-studio')?.value.trim() || user.studio;
      user.address = document.getElementById('field-address')?.value.trim() || user.address;

      if (window.NusavaAuth) {
        window.NusavaAuth.setCurrentUser(user);
      } else {
        localStorage.setItem('nusava_auth', JSON.stringify(user));
      }

      renderProfileHeroAndForm();
      showProfileToast('Profil berhasil diperbarui dan tersimpan aman!');
    });
  }

  /* ---------------------------------------------------------------------------
     5. Orders & Collections Renderer (Tab 2)
     --------------------------------------------------------------------------- */
  const DEFAULT_ORDERS = [
    {
      id: 'NSV-ORD-2026-081',
      date: '01 Nov 2026',
      status: 'shipping',
      statusLabel: 'Dalam Pengiriman (JNE Reguler)',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-300',
      resi: 'JNE-NSV-849201',
      courier: 'JNE Reguler (Asuransi Penuh)',
      items: [
        {
          name: 'Tenun Ikat Pewarna Alami Sumba',
          origin: 'Wamena / Sumba Timur',
          artisan: 'Sanggar Tenun Lambanapu',
          qty: 1,
          price: 3600000,
          image: 'assets/images/content/produk-tenun-sumba.jpg'
        }
      ],
      total: 3600000
    },
    {
      id: 'NSV-ORD-2026-074',
      date: '28 Okt 2026',
      status: 'completed',
      statusLabel: 'Selesai &amp; Bersertifikat WBTb',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      resi: 'JNT-NSV-771920',
      courier: 'J&T Express Kilat Budaya',
      items: [
        {
          name: 'Batik Tulis Nitik Kuno Imogiri',
          origin: 'Bantul, D.I. Yogyakarta',
          artisan: 'Paguyuban Batik Giriloyo',
          qty: 1,
          price: 1950000,
          image: 'assets/images/content/produk-batik-giriloyo.jpg'
        }
      ],
      total: 1950000
    },
    {
      id: 'NSV-ORD-2026-062',
      date: '15 Okt 2026',
      status: 'crafting',
      statusLabel: 'Sedang Ditempa Sang Maestro',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-300',
      resi: 'PROSES-SANGGAR',
      courier: 'Kurir Pengrajin Antar Pulau',
      items: [
        {
          name: 'Perisai Talawang Motif Kamang Dayak',
          origin: 'Hulu Mahakam, Kaltim',
          artisan: 'Sanggar Ukir Kayu Ulin Mahakam',
          qty: 1,
          price: 2850000,
          image: 'assets/images/content/wilayah-kalimantan-talawang.jpg'
        }
      ],
      total: 2850000
    }
  ];

  function renderOrdersList() {
    const container = document.getElementById('profile-orders-container');
    if (!container) return;

    let orders = [];
    try {
      const raw = localStorage.getItem('nusava_orders');
      if (raw) orders = JSON.parse(raw);
    } catch (_) {}

    if (!orders || orders.length === 0) {
      orders = DEFAULT_ORDERS;
    }

    container.innerHTML = orders.map(ord => {
      const formattedTotal = 'Rp ' + Number(ord.total || 0).toLocaleString('id-ID');
      const itemsHtml = (ord.items || []).map(item => `
        <div class="flex items-center gap-4 py-3 border-b border-[#EDE4D5]/60 last:border-none">
          <img src="${item.image || 'assets/images/logonusava.png'}" alt="${item.name}" 
            class="w-16 h-16 rounded-xl object-cover border border-[#EDE4D5] flex-shrink-0 bg-[#EDE4D5]/30">
          <div class="flex-1 min-w-0">
            <h4 class="font-display font-bold text-sm text-[#2B231D] truncate">${item.name}</h4>
            <p class="text-xs text-[#6B5E55] font-sans mt-0.5 truncate">${item.artisan} • ${item.origin}</p>
            <div class="text-xs font-semibold text-[#C5A059] mt-1 font-sans">
              ${item.qty} karya × Rp ${(item.price || 0).toLocaleString('id-ID')}
            </div>
          </div>
        </div>
      `).join('');

      return `
        <div class="p-5 sm:p-6 bg-[#FAF7F2] rounded-2xl border border-[#EDE4D5] hover:border-[#C5A059] transition-all shadow-xs">
          <!-- Order Header Bar -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[#EDE4D5]">
            <div class="flex items-center gap-3">
              <span class="font-mono text-xs font-bold text-[#2B231D] tracking-wider">${ord.id}</span>
              <span class="text-xs text-[#7A6F64]">• ${ord.date}</span>
            </div>
            <span class="px-3 py-1 rounded-full text-[10px] font-sans font-bold uppercase tracking-wider border ${ord.statusColor || 'bg-amber-100 text-amber-800 border-amber-300'} flex items-center gap-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-current animate-ping"></span>
              <span>${ord.statusLabel || 'Dalam Proses'}</span>
            </span>
          </div>

          <!-- Items -->
          <div class="py-2">
            ${itemsHtml}
          </div>

          <!-- Order Footer Bar -->
          <div class="pt-4 border-t border-[#EDE4D5] flex flex-wrap items-center justify-between gap-4">
            <div class="text-xs text-[#7A6F64] font-sans">
              <span>Pengiriman: </span>
              <strong class="text-[#2B231D]">${ord.courier || 'Kurir Standar'}</strong>
              ${ord.resi && ord.resi !== 'PROSES-SANGGAR' ? `<span class="ml-2 font-mono text-[11px] bg-[#EDE4D5] px-2 py-0.5 rounded">Resi: ${ord.resi}</span>` : ''}
            </div>
            <div class="flex items-center gap-4">
              <div class="text-right">
                <span class="text-[10px] text-[#7A6F64] uppercase font-bold tracking-wider block">Total Pembayaran</span>
                <span class="font-display font-bold text-base text-[#963D06]">${formattedTotal}</span>
              </div>
              <button type="button" onclick="window.trackOrderClick('${ord.id}', '${ord.resi}')" class="px-4 py-2 rounded-full bg-[#FAF7F2] hover:bg-[#EDE4D5] border border-[#C5A059] text-xs font-sans font-bold text-[#2B231D] transition-colors cursor-pointer">
                Lacak Resi ↗
              </button>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Global handler untuk tombol lacak resi
  window.trackOrderClick = function (orderId, resi) {
    if (resi && resi !== 'PROSES-SANGGAR') {
      showProfileToast(`Nomor Resi ${resi} telah disalin! Paket sedang dalam pengantaran kurir.`);
      try {
        navigator.clipboard.writeText(resi);
      } catch (_) {}
    } else {
      showProfileToast(`Pesanan ${orderId} saat ini sedang dikerjakan dengan seksama oleh sang maestro.`);
    }
  };

  /* ---------------------------------------------------------------------------
     6. Password Change Form Simulation
     --------------------------------------------------------------------------- */
  function initPasswordForm() {
    const form = document.getElementById('password-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const newPass = document.getElementById('new-pass')?.value;
      const confirmPass = document.getElementById('confirm-pass')?.value;

      if (!newPass || newPass.length < 6) {
        showProfileToast('Kata sandi baru minimal harus 6 karakter!');
        return;
      }

      if (newPass !== confirmPass) {
        showProfileToast('Konfirmasi kata sandi tidak cocok!');
        return;
      }

      form.reset();
      showProfileToast('Kata sandi berhasil diperbarui dengan aman!');
    });
  }

  /* ---------------------------------------------------------------------------
     7. Logout Handlers
     --------------------------------------------------------------------------- */
  function initLogoutButtons() {
    const quickLogout = document.getElementById('profile-quick-logout-btn');
    const dangerLogout = document.getElementById('danger-logout-btn');

    const handleLogout = () => {
      if (confirm('Apakah Anda yakin ingin keluar dari sesi akun ini?')) {
        if (window.NusavaAuth) {
          window.NusavaAuth.logoutUser('index.html');
        } else {
          localStorage.removeItem('nusava_auth');
          window.location.href = 'index.html';
        }
      }
    };

    quickLogout?.addEventListener('click', handleLogout);
    dangerLogout?.addEventListener('click', handleLogout);
  }

  /* ---------------------------------------------------------------------------
     8. Custom Toast Notification
     --------------------------------------------------------------------------- */
  function showProfileToast(message) {
    const toast = document.getElementById('profile-toast');
    const msgEl = document.getElementById('toast-message');
    if (!toast || !msgEl) return;

    msgEl.textContent = message;
    toast.classList.add('show');

    clearTimeout(window._profileToastTimer);
    window._profileToastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3200);
  }

  /* ---------------------------------------------------------------------------
     9. Mobile Drawer Controller
     --------------------------------------------------------------------------- */
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

  /* ---------------------------------------------------------------------------
     9b. Upload & Manajemen Foto Profil Pengguna
     --------------------------------------------------------------------------- */
  function initAvatarUpload() {
    const heroInput = document.getElementById('profile-avatar-input');
    const formInput = document.getElementById('profile-avatar-input-form');
    const removeBtn = document.getElementById('profile-remove-avatar-btn');
    const heroAvatarWrapper = document.getElementById('profile-hero-avatar')?.parentElement;

    function handleFile(file) {
      if (!file) return;
      if (!file.type.startsWith('image/')) {
        showProfileToast('Harap pilih file gambar (JPG, PNG, atau WEBP)!');
        return;
      }
      if (file.size > 8 * 1024 * 1024) {
        showProfileToast('Ukuran file maksimal 8MB!');
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        const rawDataUrl = e.target.result;
        const img = new Image();
        img.onload = () => {
          // Kompresi skala kanvas presisi 320x320 agar jernih dan ringan (<40KB di localStorage)
          const maxDim = 320;
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
          const optimizedDataUrl = canvas.toDataURL('image/jpeg', 0.88);

          const user = getActiveUser();
          user.avatar = optimizedDataUrl;

          if (window.NusavaAuth) {
            window.NusavaAuth.setCurrentUser(user);
          } else {
            localStorage.setItem('nusava_auth', JSON.stringify(user));
          }

          renderProfileHeroAndForm();
          showProfileToast('Foto profil berhasil diperbarui!');
        };
        img.onerror = () => {
          showProfileToast('Gagal memproses gambar. Coba format lain.');
        };
        img.src = rawDataUrl;
      };
      reader.readAsDataURL(file);
    }

    heroInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      heroInput.value = '';
    });

    formInput?.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      formInput.value = '';
    });

    removeBtn?.addEventListener('click', () => {
      const user = getActiveUser();
      if (!user.avatar) {
        showProfileToast('Belum ada foto profil kustom yang terpasang.');
        return;
      }
      delete user.avatar;
      if (window.NusavaAuth) {
        window.NusavaAuth.setCurrentUser(user);
      } else {
        localStorage.setItem('nusava_auth', JSON.stringify(user));
      }
      renderProfileHeroAndForm();
      showProfileToast('Foto profil dihapus, kembali ke inisial nama.');
    });

    // Drag and Drop support pada Hero Avatar
    if (heroAvatarWrapper) {
      ['dragenter', 'dragover'].forEach(eventName => {
        heroAvatarWrapper.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          heroAvatarWrapper.classList.add('scale-105');
        });
      });

      ['dragleave', 'drop'].forEach(eventName => {
        heroAvatarWrapper.addEventListener(eventName, (e) => {
          e.preventDefault();
          e.stopPropagation();
          heroAvatarWrapper.classList.remove('scale-105');
        });
      });

      heroAvatarWrapper.addEventListener('drop', (e) => {
        const file = e.dataTransfer?.files?.[0];
        if (file) handleFile(file);
      });
    }
  }

  /* ---------------------------------------------------------------------------
     10. Bootstrap on DOM Ready
     --------------------------------------------------------------------------- */
  function initProfilePage() {
    renderProfileHeroAndForm();
    initAvatarUpload();
    initTabNavigation();
    initProfileForm();
    renderOrdersList();
    initPasswordForm();
    initLogoutButtons();
    initMobileDrawer();

    // Auto-sync whenever auth session changes
    window.addEventListener('nusava-auth-changed', renderProfileHeroAndForm);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePage);
  } else {
    initProfilePage();
  }

})(window, document);
