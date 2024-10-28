import { defineNuxtModule, addPlugin, createResolver, useLogger, installModule, addTemplate } from '@nuxt/kit'
import defu from 'defu'

import type { ModuleOptions } from './types'
import { generateRootStyles, palettePathProcessor, paletteProcessor, tailwindThemeGenerator, validatePaths } from './runtime/processor'
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

    const { themes, defaultTheme } = options
    const paths = palettePathProcessor(themes)

    validatePaths(logger, paths)

    const palette = paletteProcessor(themes, paths)
    const theme = tailwindThemeGenerator(themes, paths)

    const root = generateRootStyles(palette, paths)

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
      getContents: () => 'export default ' + JSON.stringify({ root }),
    })

    logger.success('Nuxt-Palette loaded')
  },
})
