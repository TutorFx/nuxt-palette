import { defineNuxtModule, addPlugin, createResolver, useLogger, installModule, addTemplate } from '@nuxt/kit'
import { defu } from 'defu'

import type { ModuleOptions } from './types'
import { generateRootStyles, extractPalettePaths, processPalette, generateTailwindTheme, validatePaths } from './runtime/processor'
import { DEFAULT_PALETTE_OPTIONS } from './runtime/constants'

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

    const options = defu(_options, DEFAULT_PALETTE_OPTIONS)

    const { themes, defaultTheme, shades } = options
    const paths = extractPalettePaths(themes)

    validatePaths(logger, paths)

    const themeNames = Object.keys(themes)
    const palette = processPalette(themes, paths)
    const theme = generateTailwindTheme(themes, paths, shades)

    const root = generateRootStyles(palette, paths, defaultTheme)

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
      preference: defaultTheme,
    })

    addTemplate({
      filename: 'palette.config.mjs',
      getContents: () => 'export default ' + JSON.stringify({ root, themeNames }),
    })

    logger.success('Nuxt-Palette loaded')
  },
})
