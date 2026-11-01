/**
 * NUSAVA — High-Performance Page Transitions & Universal Luxury Navbar Engine
 * Lightweight, accessible, buttery-smooth page transition & navbar hover handler.
 * TECHTOPIA Vol. 2 · INTEGER#8 · Undiksha
 */
(function () {
  'use strict';

  // =========================================================================
  // 1. UNIVERSAL NAVBAR SCROLL AUTO-HIDE & TOP EDGE HOVER REVEAL
  // =========================================================================
  function initUniversalNavbar() {
    const nav = document.getElementById('navbar');
    if (!nav || window._universalNavbarBound) return;
    window._universalNavbarBound = true;

    let lastScrollY = window.scrollY;
    let isHovering = false;
    let isRevealedByHover = false;
    let ticking = false;

    // Top hover trigger zone at the very top of the viewport
    let trigger = document.getElementById('nav-hover-trigger');
    if (!trigger && document.body) {
      trigger = document.createElement('div');
      trigger.id = 'nav-hover-trigger';
      trigger.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:18px;z-index:9999;pointer-events:auto;';
      trigger.setAttribute('aria-hidden', 'true');
      document.body.prepend(trigger);
    }

    function revealNavbar() {
      isRevealedByHover = true;
      nav.classList.add('nav-hover-reveal');
      nav.classList.remove('nav-hidden');
    }

    function hideNavbar() {
      isHovering = false;
      isRevealedByHover = false;
      nav.classList.remove('nav-hover-reveal');
      if (window.scrollY > 100) {
        nav.classList.add('nav-hidden');
      }
    }

    function onScroll() {
      const currentY = window.scrollY;
      const deltaY = currentY - lastScrollY;

      // Scrolled style past 40px
      if (currentY > 40) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      // If currently being hovered or revealed by hover, NEVER hide on scroll!
      if (isHovering || isRevealedByHover) {
        lastScrollY = Math.max(0, currentY);
        ticking = false;
        return;
      }

      // Auto-hide on scroll down, reveal on scroll up
      if (currentY > 100) {
        if (deltaY > 6) {
          nav.classList.remove('nav-hover-reveal');
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
        requestAnimationFrame(onScroll);
        ticking = true;
      }
    }, { passive: true });

    // Mouse move: trigger reveal when within top 80px
    window.addEventListener('mousemove', (e) => {
      if (e.clientY <= 80) {
        isHovering = true;
        revealNavbar();
      } else if (e.clientY > 85 && isRevealedByHover && !nav.contains(e.target)) {
        hideNavbar();
      }
    }, { passive: true });

    if (trigger) {
      trigger.addEventListener('mouseenter', () => {
        isHovering = true;
        revealNavbar();
      });
    }

    nav.addEventListener('mouseenter', () => {
      isHovering = true;
      revealNavbar();
    });

    nav.addEventListener('mouseleave', (e) => {
      isHovering = false;
      if (e.clientY > 80) {
        hideNavbar();
      }
    });

    // Initial check
    onScroll();
  }
  window.initUniversalNavbar = initUniversalNavbar;

  // =========================================================================
  // 2. ENTRANCE & EXIT TRANSITIONS (Pure Opacity — Zero Transform)
  // =========================================================================
  let isTransitioning = false;

  function getOrCreateProgressBar() {
    let bar = document.getElementById('page-transition-bar');
    if (!bar && document.body) {
      bar = document.createElement('div');
      bar.id = 'page-transition-bar';
      bar.setAttribute('aria-hidden', 'true');
      document.body.prepend(bar);
    }
    return bar;
  }

  function triggerEntrance() {
    isTransitioning = false;
    if (document.body) {
      document.body.classList.remove('page-is-exiting');
      document.body.classList.remove('page-transition-ready');
      document.body.classList.add('page-is-loaded');
    }
    const bar = getOrCreateProgressBar();
    if (bar) {
      bar.classList.remove('animating');
      bar.style.width = '0%';
    }
    initUniversalNavbar();

    // Smooth scroll to hash anchor if present
    if (window.location.hash) {
      try {
        const hashEl = document.querySelector(window.location.hash);
        if (hashEl) {
          setTimeout(function () {
            hashEl.scrollIntoView({ behavior: 'smooth' });
          }, 80);
        }
      } catch (_) {}
    }
  }

  // Trigger entrance immediately if ready or on DOM load
  if (document.readyState === 'interactive' || document.readyState === 'complete') {
    triggerEntrance();
  } else {
    document.addEventListener('DOMContentLoaded', triggerEntrance);
  }
  window.addEventListener('load', triggerEntrance);

  // BFCache handler (Back/Forward Cache navigation)
  window.addEventListener('pageshow', function () {
    isTransitioning = false;
    triggerEntrance();
  });

  // Exit choreography on internal link click
  document.addEventListener('click', function (e) {
    const link = e.target.closest('a');
    if (!link) return;

    const rawHref = link.getAttribute('href');
    if (!rawHref) return;

    // Skip empty, placeholder or javascript anchors
    if (
      rawHref === '#' ||
      rawHref === '' ||
      rawHref.startsWith('javascript:') ||
      rawHref.startsWith('mailto:') ||
      rawHref.startsWith('tel:')
    ) {
      return;
    }

    // Skip hash-only anchor jumps (#jelajah, #katalog, etc.)
    if (rawHref.startsWith('#')) return;

    // Skip new tab, download, or explicit opt-out
    if (
      link.target === '_blank' ||
      link.hasAttribute('download') ||
      link.hasAttribute('data-no-transition') ||
      link.closest('[data-no-transition]')
    ) {
      return;
    }

    // Skip keyboard modifier clicks (open in new tab/window)
    if (e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.button !== 0) {
      return;
    }

    // Resolve full target URL
    let targetUrl;
    try {
      targetUrl = new URL(link.href, window.location.href);
    } catch (_) {
      return;
    }

    // Skip external URLs (different origin)
    if (targetUrl.origin !== window.location.origin) {
      return;
    }

    // Determine current & target page file names
    const currentPath = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();
    const targetPath = (targetUrl.pathname.split('/').pop() || 'index.html').toLowerCase();

    // If link is an anchor on the current page (e.g. index.html#jelajah while on index.html)
    if (targetPath === currentPath && targetUrl.hash) {
      const targetEl = document.querySelector(targetUrl.hash);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
        history.pushState(null, null, targetUrl.hash);
        return;
      }
    }

    // If link is to exact same page without hash, smoothly scroll to top
    if (targetPath === currentPath && !targetUrl.hash && targetUrl.search === window.location.search) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Prevent double-click glitch
    if (isTransitioning) {
      e.preventDefault();
      return;
    }
    isTransitioning = true;

    // Intercept internal link for smooth transition
    e.preventDefault();

    const bar = getOrCreateProgressBar();
    if (bar) {
      bar.classList.add('animating');
    }

    if (document.body) {
      document.body.classList.remove('page-is-loaded');
      document.body.classList.add('page-is-exiting');
    }

    // Navigate smoothly
    setTimeout(function () {
      window.location.href = link.href;
    }, 200);

    // Safety fallback: restore if navigation was aborted or delayed
    setTimeout(function () {
      isTransitioning = false;
      triggerEntrance();
    }, 1500);
  });
})();
