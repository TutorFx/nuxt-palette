<script setup>
useSeoMeta({
  title: 'Nuxt Palette Demo',
  description: 'Demo of using @TutorFx/nuxt-palette for Nuxt, supporting dark mode and custom colors',
})
</script>

<template>
  <div class="min-h-[100dvh] grid items-center">
    <div class="grid gap-10 p-14">
      <NuxtImg
        width="140"
        class="mx-auto"
        src="https://github.com/TutorFx/nuxt-palette/raw/main/brand/logo.svg"
      />
      <div class="container mx-auto text-center">
        <ColorModePicker />
        <NuxtPage />
        <p class="p-4 rounded-lg bg-secondary text-secondary-foreground inline-block">
          <span>Demo based on </span>
          <a
            class="text-primary-foreground underline"
            href="https://github.com/TutorFx/nuxt-palette"
          >@TutorFx/nuxt-palette</a> <span>module.</span>
        </p>
      </div>
    </div>
  </div>
</template>

<style>
body {
  @apply bg-base text-base-foreground transition-colors duration-300
}
</style>
