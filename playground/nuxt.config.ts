export default defineNuxtConfig({
  modules: ['../src/module'],
  nuxtPalette: {
    themes: {
      light: {
        primary: {
          DEFAULT: '#424412',
          foreground: '#fff',
        },
        secondary: '#425241',
        info: {
          DEFAULT: '#424412',
          foreground: '#fff',
          deep: {
            DEFAULT: '#fa2441',
            foreground: '#fff',
          },
        },
      },
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-10-17',
})
