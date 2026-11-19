export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        /**
         * Palette derived from the Ayesha Herbal & Beauty identity:
         * the brand pink (#E91E63), its deep rose (#D81B60), the blush cream
         * (#FFF0F5) already used across her packaging and website, and a
         * restrained herbal green + antique gold for accents.
         */
        brand: {
          50: '#FFF5F9',
          100: '#FFE9F1',
          200: '#FBD0E0',
          300: '#F7ADC8',
          400: '#F27DA9',
          500: '#E91E63', // brand pink
          600: '#D81B60', // primary CTA (4.9:1 on white)
          700: '#AD1457',
          800: '#8A0F46',
          900: '#6A0B35',
          950: '#45061F',
        },
        // Neutral ink scale — warm near-black for readability on blush.
        ink: '#211018',
        'ink-soft': '#755363',
        // Page + section surfaces.
        cream: '#FFFBFD',
        blush: '#FFF0F5',
        // Herbal accent for ingredients and natural cues.
        leaf: {
          50: '#F3F7F3',
          100: '#E4EEE5',
          500: '#5D8264',
          600: '#476B4D',
          700: '#38553D',
        },
        // Antique gold used sparingly for hairlines and premium details.
        gold: {
          100: '#F8EFD4',
          200: '#EFDCA8',
          300: '#E2C273',
          400: '#D4AF37',
          500: '#C9A227',
          600: '#A9861B',
        },
      },
      fontFamily: {
        // Editorial serif for headings, clean geometric sans for body/UI.
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"DM Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 30px -12px rgba(173, 20, 87, 0.24)',
        card: '0 2px 14px -4px rgba(33, 16, 24, 0.10)',
        glow: '0 18px 50px -22px rgba(216, 27, 96, 0.38)',
      },
      borderRadius: {
        blob: '1.75rem',
        arch: '42% 42% 1.5rem 1.5rem',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(6deg)' },
          '50%': { transform: 'translateY(-8px) rotate(3deg)' },
        },
      },
      animation: {
        marquee: 'marquee 28s linear infinite',
        'fade-up': 'fade-up 0.55s ease-out both',
        'fade-in': 'fade-in 0.4s ease-out both',
        'slide-in-right': 'slide-in-right 0.28s ease-out both',
        float: 'float 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
