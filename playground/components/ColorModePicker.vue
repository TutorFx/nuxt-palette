<script setup>
function iconName(theme) {
  if (theme === 'system') return 'i-ph-laptop'
  if (theme === 'light') return 'i-ph-sun'
  if (theme === 'dark') return 'i-ph-moon'
  return 'i-ph-coffee'
}
</script>

<template>
  <div>
    <ul class="list-none p-0 m-0">
      <li
        v-for="theme of ['system', ...$themeNames]"
        :key="theme"
        :class="{
          preferred: !$colorMode.unknown && theme === $colorMode.preference,
          selected: !$colorMode.unknown && theme === $colorMode.value,
        }"
        class="inline-block p-3 mr-5 leading-[0] relative top-0 cursor-pointer
        border border-border [&.preferred]:border-primary-foreground [&.preferred]:-top-1
        [&.selected]:text-primary-foreground rounded-md hover:-top-1 duration-300 transition-[top] ease-in-out"
        @click="$colorMode.preference = theme"
      >
        <Icon
          :name="iconName(theme)"
          class="size-6"
        />
      </li>
    </ul>
    <p class="p-5">
      <ColorScheme
        placeholder="..."
        tag="span"
      >
        Preference: <b>{{ $colorMode.preference }}</b>
        <span v-if="$colorMode.preference === 'system'">&nbsp;(<i>{{ $colorMode.value }}</i> mode detected)</span>
        <span v-if="$colorMode.forced">&nbsp;(<i>{{ $colorMode.value }}</i> forced)</span>
      </ColorScheme>
    </p>
  </div>
</template>
