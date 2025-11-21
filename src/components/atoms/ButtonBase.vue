<template>
  <button
    :type="type"
    :disabled="loading"
    @click="emit('click')"
    :class="buttonClasses"
  >
    <LoadingSpinner v-if="loading" />
    <slot v-else />
  </button>
</template>

<script setup>
import { computed } from "vue";
import LoadingSpinner from "@/assets/svg/LoadingSpinner.vue";

const emit = defineEmits(["click"]);

const props = defineProps({
  type: { type: String, default: "button" },
  variant: { type: String, default: "primary" },
  width: { type: String, default: "w-full" },

  size: {
    type: String,
    default: "md",
    validator: (v) => ["sm", "md", "lg"].includes(v),
  },

  radius: { type: String, default: "lg" },
  customClass: { type: String, default: "" },
  loading: { type: Boolean, default: false },
  cursor: { type: String, default: "cursor-pointer" },
});

// Button sizes
const sizeClasses = {
  sm: "px-5 py-2 text-sm",
  md: "px-6 py-2.5 text-base",
  lg: "px-6 py-3 text-lg",
};

// Variants
const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  secondary: "bg-secondary text-gray-600 hover:bg-secondary-dark",
  outline:
    "border border-primary text-primary hover:border-primary-dark hover:text-primary-dark",
  danger: "bg-red-500 text-white hover:bg-red-600",

  icon:
    "inline-flex h-8 w-8 justify-center items-center rounded-full hover:bg-slate-100",
};

const buttonClasses = computed(() => {
  const isIcon = props.variant === "icon";

  return [
    !isIcon && props.width,
    !isIcon && sizeClasses[props.size],
    isIcon ? "rounded-full" : `rounded-${props.radius}`,
    variantClasses[props.variant],
    props.loading ? "cursor-not-allowed" : props.cursor,
    props.loading && "opacity-70",
    "transition duration-200 font-semibold flex items-center justify-center",
    props.customClass,
  ]
    .filter(Boolean)
    .join(" ");
});
</script>
