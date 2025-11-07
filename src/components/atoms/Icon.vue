<!-- \src\components\atoms\Icon.vue -->
<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :class="`w-${size} h-${size} ${customClass}`"
  />
  <span v-else class="text-red-500">Icon not found</span>
</template>


<script setup>
import * as TablerIcons from '@tabler/icons-vue'
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true }, // Tabler icon name like "IconBrandGithub"
  size: { type: [Number, String], default: 5 }, // Tailwind width/height (w-5 h-5)
  customClass: { type: String, default: '' }
})

const iconComponent = computed(() => TablerIcons[props.name] || null)
</script>
