/**
 * NUSAVA - Pendaftaran Mitra Pengrajin & Kolektor (Vanilla ES6+)
 * Handles interactive role switching, form validation, 60fps parallax,
 * and seamless redirect to Studio / Marketplace.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // 1. Element References
  const registerForm = document.getElementById('registerForm');
  const roleArtisanBtn = document.getElementById('roleArtisanBtn');
  const roleBuyerBtn = document.getElementById('roleBuyerBtn');

  const pageTitle = document.getElementById('pageTitle');
  const pageSubtitle = document.getElementById('pageSubtitle');
  const nameLabel = document.getElementById('nameLabel');
  const nameHelper = document.getElementById('nameHelper');
  const nameInput = document.getElementById('nameInput');

  const artisanRegionGroup = document.getElementById('artisanRegionGroup');
  const artisanCategoryGroup = document.getElementById('artisanCategoryGroup');
  const regionInput = document.getElementById('regionInput');
  const categorySelect = document.getElementById('categorySelect');

  const emailInput = document.getElementById('emailInput');
  const emailHelper = document.getElementById('emailHelper');
  const passwordInput = document.getElementById('passwordInput');
  const confirmPasswordInput = document.getElementById('confirmPasswordInput');
  const togglePasswordBtn = document.getElementById('togglePasswordBtn');
  const eyeOpenSvg = document.getElementById('eyeOpenSvg');
  const eyeSlashSvg = document.getElementById('eyeSlashSvg');

  const submitBtn = document.getElementById('submitBtn');
  const btnText = document.getElementById('btnText');
  const btnSpinner = document.getElementById('btnSpinner');

  const demoArtisanPreset = document.getElementById('demoArtisanPreset');
  const demoBuyerPreset = document.getElementById('demoBuyerPreset');
  const formToast = document.getElementById('formToast');
  const toastMessage = document.getElementById('toastMessage');

  const wayangWrapper = document.querySelector('.wayang-parallax-wrapper');
  const cloudLayer = document.querySelector('.cloud-parallax-layer');

  let selectedRole = 'artisan'; // Default role: Mitra Pengrajin

  // 2. Role Switcher
  function setRole(role) {
    selectedRole = role;

    if (role === 'artisan') {
      roleArtisanBtn.className = 'py-1.5 px-3 rounded-md text-xs font-semibold text-[#FDF3D7] bg-[#463F3A] transition-all flex items-center justify-center gap-1.5 cursor-pointer';
      roleBuyerBtn.className = 'py-1.5 px-3 rounded-md text-xs font-semibold text-[#C4BDB7] hover:text-[#FDF3D7] transition-all flex items-center justify-center gap-1.5 cursor-pointer';

      if (pageTitle) pageTitle.textContent = 'Daftar';
      if (pageSubtitle) pageSubtitle.textContent = 'Buka studio digital & masuk ekosistem Nusava';
      if (nameLabel) nameLabel.innerHTML = 'Nama Sanggar / Maestro <span class="required-star text-[#FF6262] font-bold" aria-hidden="true">*</span>';
      if (nameHelper) nameHelper.textContent = 'Nama sanggar atau nama lengkap maestro pengrajin';
      if (nameInput) nameInput.placeholder = 'Contoh: Sanggar Ukir Celuk Maestro Sukadana';

      if (artisanRegionGroup) artisanRegionGroup.classList.remove('hidden');
      if (artisanCategoryGroup) artisanCategoryGroup.classList.remove('hidden');

      if (btnText) btnText.textContent = 'Daftarkan Sanggar & Buka Studio';
    } else {
      roleBuyerBtn.className = 'py-1.5 px-3 rounded-md text-xs font-semibold text-[#FDF3D7] bg-[#463F3A] transition-all flex items-center justify-center gap-1.5 cursor-pointer';
      roleArtisanBtn.className = 'py-1.5 px-3 rounded-md text-xs font-semibold text-[#C4BDB7] hover:text-[#FDF3D7] transition-all flex items-center justify-center gap-1.5 cursor-pointer';

      if (pageTitle) pageTitle.textContent = 'Daftar';
      if (pageSubtitle) pageSubtitle.textContent = 'Buka studio digital & masuk ekosistem Nusava';
      if (nameLabel) nameLabel.innerHTML = 'Nama Lengkap Kolektor <span class="required-star text-[#FF6262] font-bold" aria-hidden="true">*</span>';
      if (nameHelper) nameHelper.textContent = 'Nama lengkap pembeli / pencinta warisan budaya';
      if (nameInput) nameInput.placeholder = 'Contoh: Raden Ayu Larasati';

      if (artisanRegionGroup) artisanRegionGroup.classList.add('hidden');
      if (artisanCategoryGroup) artisanCategoryGroup.classList.add('hidden');

      if (btnText) btnText.textContent = 'Daftar Sebagai Kolektor';
    }
  }

  roleArtisanBtn?.addEventListener('click', () => setRole('artisan'));
  roleBuyerBtn?.addEventListener('click', () => setRole('buyer'));

  // Check URL query parameters (e.g., ?role=buyer or ?role=artisan)
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('role') === 'buyer') {
    setRole('buyer');
  } else {
    setRole('artisan');
  }

  // 3. Password Toggle Visibility
  if (togglePasswordBtn && passwordInput && eyeOpenSvg && eyeSlashSvg) {
    togglePasswordBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const isPassword = passwordInput.getAttribute('type') === 'password';

      if (isPassword) {
        passwordInput.setAttribute('type', 'text');
        eyeOpenSvg.style.display = 'none';
        eyeSlashSvg.style.display = 'block';
        togglePasswordBtn.setAttribute('aria-label', 'Sembunyikan password');
      } else {
        passwordInput.setAttribute('type', 'password');
        eyeOpenSvg.style.display = 'block';
        eyeSlashSvg.style.display = 'none';
        togglePasswordBtn.setAttribute('aria-label', 'Tampilkan password');
      }
      passwordInput.focus();
    });
  }

  // 4. Smooth Mouse Parallax (60 FPS LERP)
  if (wayangWrapper && window.innerWidth >= 1024) {
    let targetX = 0, targetY = 0;
    let currentX = 0, currentY = 0;

    window.addEventListener('mousemove', (e) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetY = (e.clientY / window.innerHeight - 0.5) * 2;
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
    });

    const lerp = (start, end, factor) => start + (end - start) * factor;

    const updateParallax = () => {
      if (window.innerWidth >= 1024) {
        currentX = lerp(currentX, targetX, 0.05);
        currentY = lerp(currentY, targetY, 0.05);

        const wayangX = currentX * 16;
        const wayangY = currentY * 10;
        const tiltX = -currentY * 3.0;
        const tiltY = currentX * 3.0;

        wayangWrapper.style.transform = `translate3d(${wayangX}px, ${wayangY}px, 0) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

        if (cloudLayer) {
          const cloudX = currentX * 8;
          const cloudY = currentY * 5;
          cloudLayer.style.transform = `translate3d(${cloudX}px, ${cloudY}px, 0)`;
        }
      }
      requestAnimationFrame(updateParallax);
    };
    requestAnimationFrame(updateParallax);
  }

  // 5. Toast Notification Helper
  let toastTimeout = null;
  const showToast = (message) => {
    if (!formToast || !toastMessage) return;
    toastMessage.textContent = message;
    formToast.classList.add('is-visible');

    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      formToast.classList.remove('is-visible');
    }, 3500);
  };

  // 6. Validation Helpers
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const markInputState = (input, isValid) => {
    if (!input) return;
    if (isValid) {
      input.classList.remove('is-invalid');
    } else {
      input.classList.add('is-invalid');
    }
  };

  // 7. Form Submission
  if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const emailVal = emailInput ? emailInput.value.trim() : '';
      const passVal = passwordInput ? passwordInput.value : '';
      const confirmVal = confirmPasswordInput ? confirmPasswordInput.value : '';
      const regionVal = regionInput ? regionInput.value.trim() : 'Bali (Gianyar & Celuk)';
      const categoryVal = categorySelect ? categorySelect.value : 'Seni Ukir Kayu & Relief';

      let isValid = true;

      // Validate Name
      if (!nameVal || nameVal.length < 2) {
        markInputState(nameInput, false);
        isValid = false;
      } else {
        markInputState(nameInput, true);
      }

      // Validate Region (Artisan only)
      if (selectedRole === 'artisan' && (!regionVal || regionVal.length < 3)) {
        markInputState(regionInput, false);
        isValid = false;
      } else if (regionInput) {
        markInputState(regionInput, true);
      }

      // Validate Email
      if (!emailVal || !emailRegex.test(emailVal)) {
        markInputState(emailInput, false);
        isValid = false;
      } else {
        markInputState(emailInput, true);
      }

      // Validate Password
      if (!passVal || passVal.length < 6) {
        markInputState(passwordInput, false);
        showToast('Kata sandi minimal 6 karakter.');
        isValid = false;
      } else {
        markInputState(passwordInput, true);
      }

      // Validate Confirm Password
      if (passVal !== confirmVal) {
        markInputState(confirmPasswordInput, false);
        showToast('Konfirmasi kata sandi tidak cocok.');
        isValid = false;
      } else {
        markInputState(confirmPasswordInput, true);
      }

      if (!isValid) return;

      // Execute Registration
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.85';
        submitBtn.style.cursor = 'wait';
        if (btnText) btnText.textContent = 'Mendaftarkan Akun...';
        if (btnSpinner) btnSpinner.classList.remove('hidden');
      }

      let userData;
      if (selectedRole === 'artisan') {
        userData = {
          role: 'pengrajin',
          name: nameVal,
          studio: nameVal.toLowerCase().includes('sanggar') ? nameVal : 'Bengkel Kriya ' + nameVal,
          region: regionVal,
          category: categoryVal,
          title: 'Maestro Seni Kriya Adat',
          email: emailVal,
          avatar: 'assets/images/pengrajin-ukir.jpg',
          verified: true,
          loggedInAt: new Date().toISOString()
        };
        localStorage.setItem('nusava_auth', JSON.stringify(userData));
        showToast('Pendaftaran Berhasil! Membuka Studio Pengrajin & Karya AI...');
        setTimeout(() => {
          window.location.href = 'dashboard.html';
        }, 850);
      } else {
        userData = {
          role: 'pembeli',
          name: nameVal,
          title: 'Kolektor Warisan Budaya',
          email: emailVal,
          avatar: 'assets/images/pengrajin-batik.jpg',
          cartCount: 0,
          verified: true,
          loggedInAt: new Date().toISOString()
        };
        localStorage.setItem('nusava_auth', JSON.stringify(userData));
        showToast('Pendaftaran Berhasil! Mengalihkan ke Galeri Pusaka...');
        setTimeout(() => {
          window.location.href = 'marketplace.html';
        }, 850);
      }
    });
  }

  // 8. 1-Click Fast Presets for Competition Judges
  demoArtisanPreset?.addEventListener('click', () => {
    setRole('artisan');
    if (nameInput) nameInput.value = 'I Wayan Sukadana';
    if (regionInput) regionInput.value = 'Desa Celuk & Gianyar, Bali';
    if (categorySelect) categorySelect.value = 'Seni Ukir Kayu & Relief';
    if (emailInput) emailInput.value = 'wayan.sukadana@nusava.id';
    if (passwordInput) passwordInput.value = 'maestro123';
    if (confirmPasswordInput) confirmPasswordInput.value = 'maestro123';

    [nameInput, regionInput, emailInput, passwordInput, confirmPasswordInput].forEach(el => {
      if (el) {
        el.classList.add('ring-2', 'ring-[#F1C469]');
        setTimeout(() => el.classList.remove('ring-2', 'ring-[#F1C469]'), 800);
      }
    });

    showToast('Data Maestro I Wayan Sukadana terisi otomatis.');
  });

  demoBuyerPreset?.addEventListener('click', () => {
    setRole('buyer');
    if (nameInput) nameInput.value = 'Raden Ayu Larasati';
    if (emailInput) emailInput.value = 'larasati@nusava.id';
    if (passwordInput) passwordInput.value = 'kolektor123';
    if (confirmPasswordInput) confirmPasswordInput.value = 'kolektor123';

    [nameInput, emailInput, passwordInput, confirmPasswordInput].forEach(el => {
      if (el) {
        el.classList.add('ring-2', 'ring-[#AEAC79]');
        setTimeout(() => el.classList.remove('ring-2', 'ring-[#AEAC79]'), 800);
      }
    });

    showToast('Data Kolektor Raden Ayu Larasati terisi otomatis.');
  });
});
