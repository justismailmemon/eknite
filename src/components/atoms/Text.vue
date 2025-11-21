<!-- src/components/atoms/Text.vue -->
<template>
  <component
    :is="tag"
    :class="[size, weight, color, customClass, underline ? 'underline' : '']"
  >
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  tag: { type: String, default: "span" },
  size: { type: String, default: "" },
  weight: { type: String, default: "" },
  color: { type: String, default: "" },
  customClass: { type: String, default: "" },

  // SIMPLE BOOLEAN UNDERLINE
  underline: { type: Boolean, default: false },
});
</script>
