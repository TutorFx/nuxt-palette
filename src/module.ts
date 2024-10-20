import { defineNuxtModule, addPlugin, createResolver, useLogger, installModule, addTemplate } from '@nuxt/kit'
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

    const paths = palettePathProcessor(_options.themes)

    validatePaths(logger, paths)

    const palette = paletteProcessor(_options.themes, paths)

    const theme = tailwindThemeGenerator(_options.themes, paths)

    if (!palette || !paths) return

    const root = generateRootStyles(palette, paths)

    if (!root) return

    await installModule('@nuxtjs/tailwindcss', {
      // module configuration
      config: {
        theme: {
          extend: {
            colors: theme,
          },
        },
      },
    })

    await installModule('@nuxtjs/color-mode', {
      // module configuration
      dataValue: 'theme',
      preference: 'light',
    })

    addTemplate({
      filename: 'palette.config.mjs',
      getContents: () => 'export default ' + JSON.stringify({ root }),
    })

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolver.resolve('./runtime/plugin'))

    logger.success('Nuxt-Palette loaded')
  },
})
