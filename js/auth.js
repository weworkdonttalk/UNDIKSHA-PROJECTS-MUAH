/* =============================================================================
   NUSAVA — UNIVERSAL AUTHENTICATION & NAVBAR SYNC ENGINE (js/auth.js)
   Arsitektur Sentral Sesi Pengguna, Dropdown Profil & Sinkronisasi Lintas-Halaman
   Standar Kompetisi: TECHTOPIA Vol. 2 INTEGER#8 · Universitas Pendidikan Ganesha
   ============================================================================= */

(function (window, document) {
  'use strict';

  const AUTH_STORAGE_KEY = 'nusava_auth';
  const CART_STORAGE_KEY = 'nusava_cart_items';

  /* ---------------------------------------------------------------------------
     1. Data Access Helpers
     --------------------------------------------------------------------------- */
  function getCurrentUser() {
    try {
      const raw = localStorage.getItem(AUTH_STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (_) {
      return null;
    }
  }

  function setCurrentUser(userData) {
    try {
      if (!userData) {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      } else {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(userData));
      }
      renderNavbarAuth();
      window.dispatchEvent(new CustomEvent('nusava-auth-changed', { detail: { user: userData } }));
    } catch (e) {
      console.warn('Gagal menyimpan sesi pengguna:', e);
    }
  }

  function logoutUser(redirectUrl) {
    try {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      window.dispatchEvent(new CustomEvent('nusava-auth-changed', { detail: { user: null } }));
    } catch (_) {}

    if (typeof showToast === 'function') {
      showToast('Sesi telah diakhiri. Sampai jumpa!');
    }

    setTimeout(() => {
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        window.location.reload();
      }
    }, 450);
  }

  /* ---------------------------------------------------------------------------
     2. Smart Display Name Formatter (Ramah Nama Nusantara & Bali)
     --------------------------------------------------------------------------- */
  function formatDisplayName(fullName) {
    if (!fullName || typeof fullName !== 'string') return 'Pengguna';
    const words = fullName.trim().split(/\s+/);
    if (words.length === 0) return 'Pengguna';

    // Prefix nama adat Nusantara (Bali, Jawa, Bugis, dsb.)
    const prefixes = ['i', 'ni', 'ida', 'gusti', 'anak', 'tjokorda', 'raden', 'la', 'daeng'];
    const firstLower = words[0].toLowerCase();

    if (words[0].length <= 2 || prefixes.includes(firstLower)) {
      if (words.length > 1) {
        return `${words[0]} ${words[1]}`;
      }
      return words[0];
    }
    return words[0];
  }

  function getInitials(fullName) {
    if (!fullName || typeof fullName !== 'string') return 'U';
    const words = fullName.trim().split(/\s+/);
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return (words[0].charAt(0) + words[1].charAt(0)).toUpperCase();
  }

  /* ---------------------------------------------------------------------------
     3. Inline SVG Icons (100% Native, Bebas Dependency Eksternal)
     --------------------------------------------------------------------------- */
  const ICONS = {
    user: `<svg class="w-4 h-4 text-[#C5A059] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`,
    sparkles: `<svg class="w-3.5 h-3.5 text-[#C5A059] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"/></svg>`,
    dashboard: `<svg class="w-4 h-4 text-[#C5A059] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="9" rx="1.5" stroke-width="1.8"/><rect x="14" y="3" width="7" height="5" rx="1.5" stroke-width="1.8"/><rect x="14" y="12" width="7" height="9" rx="1.5" stroke-width="1.8"/><rect x="3" y="16" width="7" height="5" rx="1.5" stroke-width="1.8"/></svg>`,
    plus: `<svg class="w-4 h-4 text-[#C5A059] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>`,
    bag: `<svg class="w-4 h-4 text-[#C5A059] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg>`,
    hammer: `<svg class="w-4 h-4 text-[#C5A059] flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/></svg>`,
    logout: `<svg class="w-4 h-4 text-red-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.8" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>`,
    login: `<svg class="w-3.5 h-3.5 text-[#C5A059]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>`
  };

  /* ---------------------------------------------------------------------------
     4. Render Navbar Authentication State
     --------------------------------------------------------------------------- */
  function renderNavbarAuth() {
    const user = getCurrentUser();
    const desktopContainer = document.getElementById('nav-auth-container');
    const mobileContainer = document.getElementById('mobile-auth-container') || document.getElementById('mobile-auth-drawer');

    // ── A. Tampilan Desktop ──────────────────────────────────────────────────
    if (desktopContainer) {
      if (!user) {
        // Mode Belum Login
        desktopContainer.innerHTML = `
          <a href="login.html" id="nav-login-btn" class="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-[#C5A059]/60 hover:border-[#C5A059] bg-[#FAF7F2]/80 hover:bg-[#FAF7F2] text-[#2B231D] text-xs font-sans font-semibold tracking-wide transition-all shadow-xs cursor-pointer">
            ${ICONS.login}
            <span>Masuk</span>
          </a>
        `;
      } else {
        // Mode Sudah Login
        const isArtisan = user.role === 'pengrajin';
        const displayName = formatDisplayName(user.name);
        const initials = getInitials(user.name);
        const roleLabel = isArtisan ? 'Mitra Pengrajin Maestro' : 'Kolektor Pusaka';

        desktopContainer.innerHTML = `
          <div class="relative inline-block text-left" id="user-menu-wrapper">
            <button type="button" id="user-profile-btn" 
              class="flex items-center gap-2 pl-1.5 pr-3 py-1 rounded-full border border-[#C5A059] bg-[#FAF7F2] hover:bg-[#EDE4D5] text-[#2B231D] text-xs font-semibold shadow-xs transition-all cursor-pointer select-none"
              aria-expanded="false" aria-haspopup="true">
              <span class="w-6 h-6 rounded-full bg-[#241B16] text-[#FAF7F2] flex items-center justify-center text-[10px] font-bold tracking-tight overflow-hidden flex-shrink-0">
                ${user.avatar ? `<img src="${user.avatar}" alt="${displayName}" class="w-full h-full object-cover">` : initials}
              </span>
              <span class="max-w-[120px] truncate font-sans text-xs font-semibold text-[#2B231D]">
                ${displayName}
              </span>
              <span class="w-2 h-2 rounded-full ${isArtisan ? 'bg-emerald-500' : 'bg-[#C5A059]'} animate-pulse flex-shrink-0" 
                title="${roleLabel}"></span>
            </button>

            <!-- Dropdown Menu Luxury Editorial Apple-Style -->
            <div id="user-dropdown-menu" 
              class="hidden absolute right-0 mt-2.5 w-60 bg-[#FAF7F2] border border-[#EDE4D5] rounded-2xl shadow-xl py-2 z-50 backdrop-blur-md transition-all divide-y divide-[#EDE4D5]/70">
              
              <!-- Info Pengguna Singkat -->
              <div class="px-4 py-3 flex items-center gap-3">
                <span class="w-9 h-9 rounded-full bg-[#241B16] text-[#FAF7F2] flex items-center justify-center text-xs font-bold tracking-tight overflow-hidden flex-shrink-0 border border-[#C5A059]/40 shadow-xs">
                  ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}" class="w-full h-full object-cover">` : initials}
                </span>
                <div class="flex-1 min-w-0">
                  <p class="text-xs font-bold text-[#2B231D] truncate">${user.name}</p>
                  <p class="text-[10px] text-[#C5A059] font-semibold uppercase tracking-wider inline-flex items-center gap-1 mt-0.5">
                    ${ICONS.sparkles}
                    <span>${roleLabel}</span>
                  </p>
                  ${user.email ? `<p class="text-[11px] text-[#7A6E65] truncate mt-0.5">${user.email}</p>` : ''}
                </div>
              </div>

              <!-- Menu Utama Akun -->
              <div class="py-1.5">
                <a href="profile.html" class="flex items-center gap-2.5 px-4 py-2 text-xs text-[#2B231D] hover:bg-[#EDE4D5]/60 hover:text-[#C5A059] transition-colors font-medium">
                  ${ICONS.user}
                  <span>Profil Akun Saya</span>
                </a>

                ${isArtisan ? `
                  <a href="dashboard.html" class="flex items-center gap-2.5 px-4 py-2 text-xs text-[#2B231D] hover:bg-[#EDE4D5]/60 hover:text-[#C5A059] transition-colors font-medium">
                    ${ICONS.dashboard}
                    <span>Dashboard Pengrajin</span>
                  </a>
                  <a href="dashboard.html#tambah-karya" class="flex items-center gap-2.5 px-4 py-2 text-xs text-[#2B231D] hover:bg-[#EDE4D5]/60 hover:text-[#C5A059] transition-colors font-medium">
                    ${ICONS.plus}
                    <span>Tambah Karya</span>
                  </a>
                ` : `
                  <a href="profile.html#pesanan" class="flex items-center gap-2.5 px-4 py-2 text-xs text-[#2B231D] hover:bg-[#EDE4D5]/60 hover:text-[#C5A059] transition-colors font-medium">
                    ${ICONS.bag}
                    <span>Riwayat Pesanan Saya</span>
                  </a>
                  <a href="marketplace.html" class="flex items-center gap-2.5 px-4 py-2 text-xs text-[#2B231D] hover:bg-[#EDE4D5]/60 hover:text-[#C5A059] transition-colors font-medium">
                    ${ICONS.sparkles}
                    <span>Jelajahi Koleksi Budaya</span>
                  </a>
                `}
              </div>

              <!-- Tombol Keluar Sesi -->
              <div class="pt-1.5 pb-1">
                <button type="button" id="auth-logout-btn" 
                  class="w-full text-left flex items-center gap-2.5 px-4 py-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors cursor-pointer font-medium">
                  ${ICONS.logout}
                  <span>Keluar Sesi</span>
                </button>
              </div>

            </div>
          </div>
        `;

        // Toggle Interaksi Dropdown (Hover di Desktop & Click di Mobile/Touchscreen)
        const wrapper = document.getElementById('user-menu-wrapper');
        const trigger = document.getElementById('user-profile-btn');
        const dropdown = document.getElementById('user-dropdown-menu');

        if (trigger && dropdown) {
          trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('hidden');
          });

          // Tutup dropdown saat klik di luar
          document.addEventListener('click', (e) => {
            if (wrapper && !wrapper.contains(e.target)) {
              dropdown.classList.add('hidden');
            }
          });
        }

        // Event Logout
        document.getElementById('auth-logout-btn')?.addEventListener('click', () => {
          logoutUser();
        });
      }
    }

    // ── B. Tampilan Mobile Drawer ────────────────────────────────────────────
    if (mobileContainer) {
      if (!user) {
        mobileContainer.innerHTML = `
          <a href="login.html" id="mobile-login-btn" 
            class="w-full py-2.5 px-4 text-center text-xs font-semibold tracking-wider text-[#2B231D] bg-[#FAF7F2] hover:bg-[#EDE4D5] rounded-full border border-[#C5A059]/50 flex items-center justify-center gap-2 transition-colors shadow-xs">
            ${ICONS.login}
            <span>Masuk ke Akun</span>
          </a>
        `;
      } else {
        const isArtisan = user.role === 'pengrajin';
        const initials = getInitials(user.name);
        const roleLabel = isArtisan ? 'Mitra Pengrajin Maestro' : 'Kolektor Pusaka';

        mobileContainer.innerHTML = `
          <div class="p-3.5 bg-white/95 rounded-2xl border border-[#EDE4D5] shadow-xs flex flex-col gap-3">
            <!-- User Identity Header -->
            <div class="flex items-center gap-3">
              <span class="w-10 h-10 rounded-full bg-[#241B16] border border-[#C5A059]/40 text-[#FAF7F2] flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-xs overflow-hidden">
                ${user.avatar ? `<img src="${user.avatar}" alt="${user.name}" class="w-full h-full object-cover">` : initials}
              </span>
              <div class="flex-1 min-w-0">
                <p class="text-xs font-bold text-[#2B231D] truncate leading-tight">${user.name}</p>
                <span class="inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#9B7024] bg-[#C5A059]/15 px-2 py-0.5 rounded-full mt-1 border border-[#C5A059]/30">
                  ${roleLabel}
                </span>
              </div>
            </div>

            <!-- Action Links (Clean Apple iOS Style Stacked Rows with Icons & Chevrons) -->
            <div class="flex flex-col rounded-xl bg-[#FAF7F2] border border-[#EDE4D5]/80 overflow-hidden divide-y divide-[#EDE4D5]/70">
              <!-- Profil Saya -->
              <a href="profile.html" class="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-[#2B231D] hover:bg-[#EDE4D5]/60 hover:text-[#C5A059] transition-colors group">
                <span class="flex items-center gap-2.5">
                  ${ICONS.user}
                  <span>Profil Saya</span>
                </span>
                <svg class="w-3.5 h-3.5 text-[#B0A090] group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
              </a>

              <!-- Dashboard Pengrajin / Riwayat Pesanan -->
              ${isArtisan ? `
                <a href="dashboard.html" class="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-[#2B231D] hover:bg-[#EDE4D5]/60 hover:text-[#C5A059] transition-colors group">
                  <span class="flex items-center gap-2.5">
                    ${ICONS.dashboard}
                    <span>Dashboard Pengrajin</span>
                  </span>
                  <svg class="w-3.5 h-3.5 text-[#B0A090] group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                </a>
              ` : `
                <a href="profile.html#pesanan" class="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-[#2B231D] hover:bg-[#EDE4D5]/60 hover:text-[#C5A059] transition-colors group">
                  <span class="flex items-center gap-2.5">
                    ${ICONS.bag}
                    <span>Riwayat Pesanan Saya</span>
                  </span>
                  <svg class="w-3.5 h-3.5 text-[#B0A090] group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
                <a href="marketplace.html" class="flex items-center justify-between px-3.5 py-2.5 text-xs font-medium text-[#2B231D] hover:bg-[#EDE4D5]/60 hover:text-[#C5A059] transition-colors group">
                  <span class="flex items-center gap-2.5">
                    ${ICONS.sparkles}
                    <span>Jelajahi Koleksi Budaya</span>
                  </span>
                  <svg class="w-3.5 h-3.5 text-[#B0A090] group-hover:text-[#C5A059] group-hover:translate-x-0.5 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                </a>
              `}
            </div>

            <!-- Keluar Sesi Button (Apple-Style Destructive Action) -->
            <button type="button" id="mobile-auth-logout-btn" 
              class="w-full py-2 px-3 rounded-xl flex items-center justify-center gap-2 text-xs font-medium text-red-600 bg-red-50/70 hover:bg-red-100/80 border border-red-200/50 transition-colors cursor-pointer">
              ${ICONS.logout}
              <span>Keluar Sesi</span>
            </button>
          </div>
        `;

        document.getElementById('mobile-auth-logout-btn')?.addEventListener('click', () => {
          logoutUser();
        });
      }
    }
  }

  /* ---------------------------------------------------------------------------
     5. Multi-Tab Realtime Synchronization Listener
     --------------------------------------------------------------------------- */
  window.addEventListener('storage', (event) => {
    if (event.key === AUTH_STORAGE_KEY) {
      renderNavbarAuth();
    }
  });

  // Auto-init on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', renderNavbarAuth);
  } else {
    renderNavbarAuth();
  }

  // Export ke Global Namespace
  window.NusavaAuth = {
    getCurrentUser,
    setCurrentUser,
    logoutUser,
    renderNavbarAuth,
    formatDisplayName,
    getInitials
  };

})(window, document);
