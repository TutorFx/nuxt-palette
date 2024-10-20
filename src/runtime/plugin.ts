import { defineNuxtPlugin } from '#app'

// @ts-expect-error - just ignore lol
import paletteConfig from '#build/palette.config.mjs'

export default defineNuxtPlugin((_nuxtApp) => {
  useHead({
    style: [
      {
        children: paletteConfig.root,
      },
    ],
  })
})
