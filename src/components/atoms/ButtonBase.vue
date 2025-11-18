<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="loading"
    @click="$emit('click')"
  >
    <svg
      v-if="loading"
      class="animate-spin h-5 w-5 mr-2 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
      ></path>
    </svg>

    <slot></slot>
  </button>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  type: { type: String, default: "button" },
  variant: { type: String, default: "primary" },

  /** NEW PROP: control button width **/
  width: { type: String, default: "w-full" },

  customClass: { type: String, default: "" },
  icon: { type: String, default: null },
  loading: { type: Boolean, default: false },
});

const variantClasses = {
  primary: "bg-primary text-white hover:bg-primary-dark",
  outline:
    "border border-primary text-outline hover:border-primary-dark hover:text-primary-dark",

  danger: "bg-red-500 text-white hover:bg-red-600",
};

const buttonClasses = computed(
  () =>
    `${
      props.width
    } py-3 rounded-lg transition duration-200 font-semibold flex items-center justify-center cursor-pointer ${
      variantClasses[props.variant]
    } ${props.customClass} ${
      props.loading ? "opacity-70 cursor-not-allowed" : ""
    }`
);
</script>
