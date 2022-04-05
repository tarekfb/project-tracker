module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // coolors palette
        // https://coolors.co/d7c9aa-7b2d26-006992-27476e-001d4a
        transparent: 'transparent',
        current: 'currentColor',
        whiteBeige: '#d7c9aaff',
        redLight: '#f14f47',
        redDark: '#7b2d26ff',
        blueLight: '#006992ff',
        blueDarker: '#27476eff',
        blueDarkest: '#001d4aff',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
