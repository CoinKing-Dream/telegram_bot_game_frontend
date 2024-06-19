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
    screens: {
      'xm': '320px',
      
      'sm': '425px',
      // => @media (min-width: 425px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    }
  },
  plugins: [],
};
