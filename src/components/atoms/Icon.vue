<template>
  <component
    v-if="iconComponent"
    :is="iconComponent"
    :class="`${sizeClasses} ${customClass}`"
  />
  <span v-else class="text-red-500 text-xs">Icon not found</span>
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
  xs: "size-3",
  sm: "size-4",
  md: "size-5",
  lg: "size-6",
  xl: "size-7",
  xxl: "size-8",
};

const sizeClasses = computed(() => sizeMap[props.size] || sizeMap["md"]);

const iconComponent = computed(() => TablerIcons[props.name] || null);
</script>
