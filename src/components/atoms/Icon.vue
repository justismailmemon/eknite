<template>
  <component
    :is="iconComponent"
    :size="px || undefined"
    :stroke-width="strokeWidthNum"
    :class="['icon', sizeClass]"
  />
</template>

<script setup>
import { computed } from "vue";
import * as icons from "lucide-vue-next";

const props = defineProps({
  name: { type: String, required: true },

  // "sm" | "md" | "lg" | numeric | Tailwind ("size-8", "w-6 h-6")
  size: { type: [String, Number], default: "md" },

  // optional exact px (overrides lucide size)
  px: { type: [Number, String], default: null },

  strokeWidth: { type: [Number, String], default: 2 },
});

const iconComponent = computed(() => icons[props.name] || icons.CircleHelp);

// class-based sizing
const sizeClass = computed(() => {
  const map = { sm: "size-4", md: "size-5", lg: "size-6" };
  const raw = String(props.size).trim();

  if (/^(size-\d+|w-\d+\s*h-\d+|w-\[\d+px\]\s*h-\[\d+px\])$/.test(raw)) return raw;
  if (/^\d+$/.test(raw)) return `w-${raw} h-${raw}`;
  return map[raw] || map.md;
});

// normalize strokeWidth
const strokeWidthNum = computed(() => {
  const n = Number(props.strokeWidth);
  return Number.isFinite(n) ? n : 2;
});
</script>

<style scoped>
.icon {
  /* shared icon styles if needed */
}
</style>
