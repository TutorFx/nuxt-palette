export default defineNuxtConfig({
  modules: [
    '../../src/module',
    'shadcn-nuxt',
    '@nuxt/icon',
    '@nuxt/image',
  ],
  devtools: { enabled: true },
  compatibilityDate: '2024-10-17',
  palette: {
    themes: {
      light: {
        test: '#eb4034',
        background: 'hsl(204 100% 95%)',
        foreground: 'hsl(204 5% 0%)',
        muted: {
          b: 'hsl(166 30% 85%)',
          f: 'hsl(204 5% 35%)',
        },
        popover: {
          b: 'hsl(204 100% 95%)',
          f: 'hsl(204 100% 0%)',
        },
        card: {
          b: 'hsl(204 50% 90%)',
          f: 'hsl(204 5% 10%)',
        },
        border: 'hsl(204 30% 50%)',
        input: 'hsl(204 30% 18%)',
        primary: {
          b: 'hsl(204 73% 36%)',
          f: 'hsl(0 0% 100%)',
        },
        secondary: {
          b: 'hsl(204 30% 70%)',
          f: 'hsl(0 0% 0%)',
        },
        accent: {
          b: 'hsl(166 30% 80%)',
          f: 'hsl(204 5% 10%)',
        },
        destructive: {
          b: 'hsl(0 100% 30%)',
          f: 'hsl(204 5% 90%)',
        },
        ring: 'hsl(204 73% 36%)',
      },
      dark: {
        background: 'hsl(204 50% 5%)',
        foreground: 'hsl(204 5% 90%)',
        muted: {
          b: 'hsl(217.2, 32.6%, 17.5%)',
          f: 'hsl(215, 20.2%, 65.1%)',
        },
        popover: {
          b: 'hsl(204 50% 5%)',
          f: 'hsl(204 5% 90%)',
        },
        card: {
          b: 'hsl(204 50% 0%)',
          f: 'hsl(204 5% 90%)',
        },
        border: 'hsl(204 30% 18%)',
        input: 'hsl(204 30% 18%)',
        primary: {
          b: 'hsl(204 73% 36%)',
          f: 'hsl(0 0% 100%)',
        },
        secondary: {
          b: 'hsl(204 30% 10%)',
          f: 'hsl(0 0% 100%)',
        },
        accent: {
          b: 'hsl(166 30% 15%)',
          f: 'hsl(204 5% 90%)',
        },
        destructive: {
          b: 'hsl(0 100% 30%)',
          f: 'hsl(204 5% 90%)',
        },
        ring: 'hsl(204 73% 36%)',
      },
    },
  },
  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui',
  },
})
