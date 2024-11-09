export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-10-17',
  palette: {
    themes: {
      light: {
        base: {
          b: '#f3f5f4',
          f: '#243746',
        },
        primary: {
          f: '#158876',
          b: '#f3f5f4',
        },
        secondary: {
          f: '#fdf9f3',
          b: '#071521',
        },
        border: '#ddd',
      },
      dark: {
        base: {
          b: '#091a28',
          f: '#ebf4f1',
        },
        primary: {
          f: '#41b38a',
          b: '#f3f5f4',
        },
        secondary: {
          f: '#fdf9f3',
          b: '#071521',
        },
        border: '#0d2538',
      },
      sepia: {
        base: {
          f: '#433422',
          b: '#f1e7d0',
        },
        primary: {
          f: '#41b38a',
          b: '#f3f5f4',
        },
        secondary: {
          f: '#504231',
          b: '#eae0c9',
        },
        border: '#ded0bf',
      },
    },
  },
})
