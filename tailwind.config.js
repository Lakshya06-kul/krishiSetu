/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        agri: {
          primary: '#16A34A',
          primaryDark: '#15803D',
          secondary: '#2563EB',
          accent: '#F59E0B',
          success: '#22C55E',
          warning: '#F59E0B',
          error: '#EF4444',
          info: '#0EA5E9',
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          border: '#E5E7EB',
          text: '#111827',
          subtext: '#64748B',
          cardBg: '#FFFFFF',
        }
      },
      borderRadius: {
        'btn': '14px',
        'card': '20px',
        'modal': '24px',
        'input': '12px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(22, 163, 74, 0.08), 0 2px 6px -1px rgba(0, 0, 0, 0.04)',
        'medium': '0 10px 30px -4px rgba(22, 163, 74, 0.15), 0 4px 12px -2px rgba(0, 0, 0, 0.05)',
        'large': '0 20px 40px -6px rgba(0, 0, 0, 0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
