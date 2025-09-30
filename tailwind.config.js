/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#6366F1',
        secondary: '#8B5CF6',
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        critical: '#EF4444',
        background: '#F8FAFC',
        text: '#1F2937'
      },
      fontFamily: {
        'pretendard': ['Pretendard', 'system-ui', 'sans-serif']
      }
    },
  },
  plugins: [],
}
