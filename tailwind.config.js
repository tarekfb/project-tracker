module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        // coolors palette
        transparent: 'transparent',
        current: 'currentColor',
        charcoal: '#85d7ff',
        persianGreen: '#1fb6ff',
        orangeYellowCrayola: '#009eeb',
        sandyBrown: '#ff7ce5',
        burntSienna: '#ff49db',
        // coolors palette
        imperialRed: '#1d3557',
        honeyDew: '#F1FAEE',
        powderBlue: '#A8DADC',
        celadonBlue: '#457B9D',
        prussianBlue: '#1D3557',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
