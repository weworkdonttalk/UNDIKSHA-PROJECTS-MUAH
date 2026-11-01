/**
 * =============================================================================
 * NUSAVA — SHARED TAILWIND CSS CONFIGURATION (js/tailwind-config.js)
 * Standar Desain: TECHTOPIA Vol. 2 · INTEGER#8 · Universitas Pendidikan Ganesha
 * =============================================================================
 */

tailwind.config = {
  theme: {
    extend: {
      colors: {
        canvas: '#F5EFE6',
        surface: '#FAF7F2',
        'surface-elevated': '#EDE4D5',
        ivory: '#F5EFE6',
        'ivory-soft': '#EDE4D5',
        card: '#FAF7F2',
        dark: '#241B16',
        'dark-card': '#2D221C',
        'dark-2': '#2D221C',
        espresso: '#2B231D',
        charcoal: '#6B5E55',
        gold: '#C5A059',
        'gold-light': '#B38F46',
        amber: '#C5A059',
        olive: '#AEAC79',
      },
      fontFamily: {
        cinzel: ['"Cinzel"', '"Playfair Display"', 'Georgia', 'serif'],
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        garamond: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.22, 1, 0.36, 1)',
        expo: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    }
  }
};
