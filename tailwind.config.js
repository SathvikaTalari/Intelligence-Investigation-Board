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
          bg: '#14110F',
        },
        sidebar: {
          bg: '#1B1715',
        },
        card: {
          bg: '#2B241F',
        },
        paper: {
          DEFAULT: '#E8D9B5',
        },
        leather: {
          DEFAULT: '#5A3B1C',
        },
        gold: {
          DEFAULT: '#C89B3C',
        },
        copper: {
          DEFAULT: '#B06A2C',
        },
        crimson: {
          DEFAULT: '#8B2E2E',
        },
        olive: {
          DEFAULT: '#5B6E43',
        },
        txt: {
          main: '#F5E6C8',
          muted: '#BCA98A',
        },
        border: {
          main: 'rgba(255,230,180,0.08)',
        }
      },
      fontFamily: {
        cinzel: ['Cinzel', 'serif'],
        cormorant: ['Cormorant Garamond', 'serif'],
        playfair: ['Playfair Display', 'serif'],
        inter: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'leather-texture': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.15%22/%3E%3C/svg%3E')",
        'paper-texture': "url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22 opacity=%220.08%22/%3E%3C/svg%3E')",
      }
    },
  },
  plugins: [],
}
