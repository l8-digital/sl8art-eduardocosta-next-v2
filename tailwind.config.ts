import type { Config } from 'tailwindcss'
import forms from '@tailwindcss/forms'
import aspectRatio from '@tailwindcss/aspect-ratio'
const defaultTheme = require('tailwindcss/defaultTheme');
import plugin from 'tailwindcss/plugin'

const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/templates/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/sections/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--bg-primary) / <alpha-value>)",
        secondary: "rgb(var(--bg-secondary) / <alpha-value>)",
        tertiary: "rgb(var(--bg-tertiary) / <alpha-value>)",
        quaternary: "rgb(var(--bg-dark) / <alpha-value>)",
        quinary: "rgb(var(--bg-black) / <alpha-value>)",
        success: {
          light: '#69ff91',
          DEFAULT: '#1ED561',
          dark: '#00a233',
        },
        'white': {
          light: '#f3f3f6',
          DEFAULT: '#ffffff',
          dark: '#9b9b9b',
        },
        'black': {
          light: '#272437',
          DEFAULT: '#000000',
          dark: '#464746',
        },
        'gray': {
          light: '#AAAAAA',
          DEFAULT: '#545D6F',
          dark: '#2F2D40',
        },
        'orange': {
          light: '#ffb346',
          DEFAULT: '#fe8206',
          dark: '#c45300',
        },
        'red': {
          light: '#ff6b70',
          DEFAULT: '#F44336',
          dark: '#a3001e',
        },
        'blue': {
          light: '#6793ff',
          DEFAULT: '#0f66e9',
          dark: '#003db6',
        },
        'yellow': {
          light: '#ffee4d',
          DEFAULT: '#F9BC00',
          dark: '#c18c00',
        },
        'green': {
          light: '#69ff91',
          DEFAULT: '#1ED561',
          dark: '#00a233',
          100: '#F2FDFC',
        },
        transparent: 'transparent',
        current: 'currentColor',
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          md: '1rem',
          sm: '.8rem',
        },
      },
      fontFamily: {
        sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
        'secondary': ['Bebas Neue'],
        'tertiary': ['Red Hat Display']
      },
      aspectRatio: {
        auto: 'auto',
        square: '1 / 1',
        video: '16 / 9',
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9',
        10: '10',
        11: '11',
        12: '12',
        13: '13',
        14: '14',
        15: '15',
        16: '16',
      },
    },
  },
  plugins: [
    forms({ strategy: 'base' }),
    aspectRatio,
    plugin(function ({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          '@screen sm': { maxWidth: '640px' },
          '@screen md': { maxWidth: '768px' },
          '@screen lg': { maxWidth: '1024px' },
          '@screen xl': { maxWidth: '1280px' },
        },
      })
    }),
  ],
}

export default config
