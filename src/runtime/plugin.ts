import { defineNuxtPlugin } from '#app'

// @ts-expect-error - just ignore lol
import paletteConfig from '#build/palette.config.mjs'

export default defineNuxtPlugin((_nuxtApp) => {
  const { root, themeNames }: { root: string, themeNames: string[] } = paletteConfig

  useHead({
    style: [
      {
        children: root,
      },
    ],
  })

  return {
    provide: {
      themeNames,
    },
  }
})
