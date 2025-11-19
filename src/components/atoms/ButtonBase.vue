<template>
  <button
    :type="type"
    :disabled="loading"
    @click="$emit('click')"
    :class="buttonClasses"
  >
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5 mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"/>
    </svg>

    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: { type: String, default: "button" },
  variant: { type: String, default: "primary" },
  width: { type: String, default: "w-full" },

  size: { type: String, default: "md", validator: (v) => ["sm","md","lg"].includes(v) },
  radius: { type: String, default: "lg" },

  customClass: { type: String, default: "" },
  loading: { type: Boolean, default: false },
});

const sizeClasses = {
  sm: "px-5 py-2 text-sm",      // updated
  md: "px-6 py-2.5 text-base",  // updated
  lg: "px-6 py-3 text-lg",      // updated
};


const buttonClasses = computed(() => {
  return `
    ${props.width}
    ${sizeClasses[props.size]}
    rounded-${props.radius}
    transition duration-200 font-semibold flex items-center justify-center cursor-pointer
    btn-${props.variant}
    ${props.loading ? "btn-loading" : ""}
    ${props.customClass}
  `;
});
</script>
