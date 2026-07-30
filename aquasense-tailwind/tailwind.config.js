// path: tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "#e2ebf4",
        background: "#f5f8fc",
        foreground: "#0b1e33",
        primary: {
          50: "#eaf6fd",
          100: "#cde0ed",
          200: "#9bbad6",
          300: "#6a8ba8",
          400: "#3a6f8f",
          500: "#0b6b8f",
          600: "#095a7a",
          700: "#074a65",
          800: "#053950",
          900: "#03283b",
          DEFAULT: "#0b6b8f",
        },
        ocean: {
          50: "#f0f7fa",
          100: "#d4eaf5",
          200: "#a8d4eb",
          300: "#6bbde0",
          400: "#3a9fd4",
          500: "#0b7b9e",
          600: "#096380",
          700: "#074d66",
          800: "#053b4d",
          900: "#032a35",
        },
        status: {
          healthy: "#2c9f6b",
          warning: "#d4a13e",
          critical: "#c74545",
          info: "#3a6f8f",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted: "#f8fafd",
          elevated: "#f0f4fa",
        },
        text: {
          primary: "#0b1e33",
          secondary: "#34597a",
          muted: "#6b8ba8",
          placeholder: "#7a99b5",
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xs: "4px",
        sm: "8px",
        DEFAULT: "12px",
        md: "16px",
        lg: "20px",
        xl: "24px",
        '2xl': "28px",
        '3xl': "32px",
        full: "9999px",
      },
      boxShadow: {
        xs: '0 1px 2px rgba(0, 29, 55, 0.02)',
        sm: '0 2px 8px rgba(0, 29, 55, 0.03)',
        DEFAULT: '0 4px 14px rgba(0, 29, 55, 0.04)',
        md: '0 8px 24px rgba(0, 29, 55, 0.06)',
        lg: '0 12px 32px rgba(0, 29, 55, 0.08)',
        xl: '0 20px 48px rgba(0, 29, 55, 0.12)',
        'soft': '0 4px 14px rgba(0, 29, 55, 0.02)',
        'hover': '0 12px 28px rgba(7, 54, 90, 0.08)',
        'card': '0 4px 12px rgba(0, 0, 0, 0.02)',
        'modal': '0 40px 80px rgba(0, 0, 0, 0.12)',
        'glass': '0 8px 32px rgba(11, 107, 143, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease',
        'slide-up': 'slideUp 0.25s ease',
        'slide-in': 'slideIn 0.3s ease',
        'shimmer': 'shimmer 1.2s infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'scale(0.96) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(40px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
