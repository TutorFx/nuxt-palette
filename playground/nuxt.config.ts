export default defineNuxtConfig({
  modules: ['../src/module'],
  palette: {
    themes: {
      light: {
        primary: {
          f: '#424412',
          b: '#fff',
        },
        secondary: '#425241',
        info: {
          f: '#424412',
          b: '#fff',
          deep: {
            f: '#fa2441',
            b: '#fff',
          },
        },
      },
      dark: {
        primary: {
          f: '#424412',
          b: '#fff',
        },
        secondary: '#425241',
        info: {
          f: '#424412',
          b: '#fff',
          deep: {
            f: '#fa2441',
            b: '#fff',
          },
        },
      },
    },
  },
  devtools: { enabled: true },
  compatibilityDate: '2024-10-17',
})
