import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'
import type { Themes } from './types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  themes: Themes
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-palette',
    configKey: 'nuxtPalette',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  setup(_options, _nuxt) {
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))
  },
})
