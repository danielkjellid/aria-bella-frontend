const { colors } = require('tailwindcss/defaultTheme')

module.exports = {
  purge: {
    enabled: false,
    content: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './views/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    ],
    options: {
      safelist: ['transform', 'duration-500', 'ease-in-out', 'opacity-0', 'opacity-100']
    }
  },
  theme: {
    extend: {
      colors: {
        gray : {
          '50': '#f9fafb',
          ...colors.gray
        },
        blue: {
          '50': '#F7FAFC',
          ...colors.blue
        },
        red: {
          '50': '#fdf2f2',
          ...colors.red
        },
        brand: {
          '50': '#FCF8F7',
          '100': '#F5E1D5',
          '200': '#F2CFBB',
          '300': '#F0C1A6',
          '400': '#F3B693',
          '500': '#EDA17A',
          '600': '#EA9264',
          '700': '#DE8456',
          '800': '#D87846',
          '900': '#C76C3D'
        }
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
      }
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/forms')
  ],
}
