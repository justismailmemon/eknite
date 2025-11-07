<!-- \src\components\atoms\Input.vue -->
<template>
  <a
    :href="href"
    :class="`text-blue-500 font-semibold hover:underline ${customClass}`"
  >
    <slot />
  </a>
</template>

<script setup>

const props = defineProps({
  href: { type: String, default: '#' },
  customClass: { type: String, default: '' }
})
</script>
