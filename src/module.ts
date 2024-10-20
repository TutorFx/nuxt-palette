import { defineNuxtModule, addPlugin, createResolver, useLogger, installModule } from '@nuxt/kit'
import type { Themes } from './types'
import { generateRootStyles, palettePathProcessor, paletteProcessor, tailwindThemeGenerator, validatePaths } from './runtime/processor'

// Module options TypeScript interface definition
export interface ModuleOptions {
  themes: Themes
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-palette',
    configKey: 'palette',
  },
  // Default configuration options of the Nuxt module
  defaults: {},
  async setup(_options, _nuxt) {
    const logger = useLogger('nuxt-palette')
    const resolver = createResolver(import.meta.url)

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    logger.info('Hello from my module!')

    const paths = palettePathProcessor(_options.themes)

    validatePaths(logger, paths)

    const palette = paletteProcessor(_options.themes, paths)

    const theme = tailwindThemeGenerator(_options.themes, paths)

    if (palette) {
      const root = generateRootStyles(palette, paths)
    }

    await installModule('@nuxtjs/tailwindcss', {
      // module configuration
      config: {
        theme: {
          extend: {
            colors: theme,
            fontFamily: {
              sans: 'Inter, ui-sans-serif, system-ui, -apple-system, Arial, Roboto, sans-serif',
            },
          },
        },
      },
    })
  },
})
