/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      clipPath: {
        polygon:
          "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)", // Custom polygon shape
      },
      keyframes: {
        waveEffect: {
          '0%, 100%': { boxShadow: '0 0 0 0 white' },
          '50%': { boxShadow: '0 0 0 8px yellow' },
        },
      },
      animation: {
        fadeouttopright: 'fade-out-top-right 1s ease-in-out 0.25s 1',
        'wave-animation': 'waveEffect 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
