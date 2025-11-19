<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :class="`${sizeClasses} ${customClass}`"
  />
  <span v-else class="text-red-500">Icon not found</span>
</template>

<script setup>
import * as TablerIcons from "@tabler/icons-vue";
import { computed } from "vue";

const props = defineProps({
  name: { type: String, required: true },

  // Small, medium, large sizes — customizable
  size: { type: String, default: "md" },

  customClass: { type: String, default: "" },
});

const sizeMap = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
  xxl: "w-8 h-8",
};

const sizeClasses = computed(() => sizeMap[props.size] || sizeMap["md"]);

const iconComponent = computed(() => TablerIcons[props.name] || null);
</script>
