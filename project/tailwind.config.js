/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        script: ['"Dancing Script"', 'cursive'],
        vibes: ['"Great Vibes"', 'cursive'],
        display: ['"Playfair Display"', 'serif'],
        body: ['Poppins', 'sans-serif'],
      },
      colors: {
        blush: {
          50: '#fff5f8',
          100: '#ffe4ec',
          200: '#ffc9dd',
          300: '#ffa8c5',
          400: '#ff7faa',
          500: '#ff5c8a',
          600: '#ec3d6f',
          700: '#c92a55',
          800: '#a32048',
          900: '#7d1938',
        },
        rose: {
          50: '#fff1f3',
          100: '#ffe0e6',
          200: '#ffc6d2',
          300: '#ff9db0',
          400: '#ff6b8a',
          500: '#ff3d6e',
          600: '#ed1e54',
          700: '#c41141',
          800: '#9d0f37',
          900: '#7a0f2e',
        },
        lavender: {
          100: '#f3e8ff',
          200: '#e9d5ff',
          300: '#d8b4fe',
          400: '#c084fc',
          500: '#a855f7',
        },
        cream: {
          50: '#fffdfa',
          100: '#fff9f0',
          200: '#fff3e0',
        },
      },
      animation: {
        'float-up': 'floatUp linear infinite',
        'gentle-pulse': 'gentlePulse 2s ease-in-out infinite',
        'heartbeat': 'heartbeat 1.4s ease-in-out infinite',
        'sparkle-twinkle': 'sparkleTwinkle 1.8s ease-in-out infinite',
        'flicker': 'flicker 0.12s ease-in-out infinite alternate',
        'shimmer': 'shimmer 3s linear infinite',
        'bounce-soft': 'bounceSoft 0.6s ease-in-out',
        'wiggle': 'wiggle 0.5s ease-in-out',
        'petal-fall': 'petalFall linear infinite',
      },
      keyframes: {
        floatUp: {
          '0%': { transform: 'translateY(0) scale(1)', opacity: '0' },
          '10%': { opacity: '0.8' },
          '90%': { opacity: '0.6' },
          '100%': { transform: 'translateY(-110vh) scale(0.6)', opacity: '0' },
        },
        gentlePulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.15)', opacity: '1' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '15%': { transform: 'scale(1.12)' },
          '30%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.08)' },
          '60%': { transform: 'scale(1)' },
        },
        sparkleTwinkle: {
          '0%, 100%': { opacity: '0.3', transform: 'scale(0.7) rotate(0deg)' },
          '50%': { opacity: '1', transform: 'scale(1.2) rotate(180deg)' },
        },
        flicker: {
          '0%': { transform: 'scaleY(1) scaleX(1) rotate(-1deg)', opacity: '1' },
          '100%': { transform: 'scaleY(1.08) scaleX(0.92) rotate(1deg)', opacity: '0.9' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        bounceSoft: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-8deg)' },
          '75%': { transform: 'rotate(8deg)' },
        },
        petalFall: {
          '0%': { transform: 'translateY(-10vh) translateX(0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.9' },
          '90%': { opacity: '0.7' },
          '100%': { transform: 'translateY(110vh) translateX(40px) rotate(360deg)', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
