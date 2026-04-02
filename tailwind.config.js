/** @type {import('tailwindcss').Config} */
export default {
    content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#818cf8',
          light: '#a5b4fc',
          dark: '#6366f1',
        },
        accent: {
          DEFAULT: '#22d3ee',
          light: '#67e8f9',
        },
        dark: {
          100: '#1e2d45',
          200: '#1a2540',
          300: '#0f172a',
          400: '#253550',
        }
      },
      fontFamily: {
        fontPrimary: ['Inter', 'Space Grotesk', 'Mulish', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #6366f1, #06b6d4)',
        'gradient-hero': 'linear-gradient(135deg, #080b14 0%, #0d1117 50%, #080b14 100%)',
      },
      boxShadow: {
        'glow': '0 0 30px rgba(99, 102, 241, 0.3)',
        'glow-sm': '0 0 15px rgba(99, 102, 241, 0.2)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.3)',
        'card': '0 4px 24px rgba(0, 0, 0, 0.4)',
        'card-hover': '0 8px 40px rgba(99, 102, 241, 0.25)',
      },
      animation: {
        'float': 'float 4s ease-in-out infinite',
        'pulse-slow': 'pulse 4s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        }
      }
    },
  },
  plugins: [],
}
