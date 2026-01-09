/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        trust: {
          green: '#10B981', // Verified
          yellow: '#F59E0B', // Uncertain
          red: '#EF4444', // High Risk
          DEFAULT: '#10B981'
        },
        guardian: {
          blue: '#3B82F6', // Neutral/Guardian
          dark: '#0f172a', // Background
          slate: '#1E293B', // Panels
        }
      },
      fontFamily: {
        mono: ['"Fira Code"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 3s linear infinite',
        'ping-slow': 'ping 3s cubic-bezier(0, 0, 0.2, 1) infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.5s ease-out forwards',
        'hologram': 'hologram 4s ease-in-out infinite alternate',
      },
      keyframes: {
        scan: {
          '0%': { transform: 'translateY(-100%)', opacity: '0.5' },
          '100%': { transform: 'translateY(100%)', opacity: '0.5' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        hologram: {
          '0%': { filter: 'hue-rotate(0deg) brightness(1)' },
          '100%': { filter: 'hue-rotate(15deg) brightness(1.2)' },
        }
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
        'radial-glow': "radial-gradient(circle at center, rgba(59, 130, 246, 0.15) 0%, transparent 70%)",
      }
    },
  },
  plugins: [],
}