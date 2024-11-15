import palette from '../../../src/module'

export default defineNuxtConfig({
  modules: [
    palette,
  ],
  // TODO: Fix
  // @ts-expect-error this is a type error
  palette: {
    themes: {
      light: {
        primary: {
          f: '#158876',
          b: '#f3f5f4',
        },
      },
      dark: {
        primary: {
          f: '#41b38a',
          b: '#f3f5f4',
        },
      },
      sepia: {
        primary: {
          f: '#41b38a',
          b: '#f3f5f4',
        },
      },
    },
  },
})
