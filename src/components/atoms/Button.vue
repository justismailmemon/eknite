<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="loading"
    @click="$emit('click')"
  >
    <!-- Spinner -->
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

    <!-- Icon if provided -->
    <Icon v-if="icon && !loading" :name="icon" class="mr-2" />

    <!-- Slot content -->
    <slot>{{ loading ? "Loading..." : "Button" }}</slot>
  </button>
</template>

<script setup>
import { computed } from "vue";
import Icon from './Icon.vue'

const props = defineProps({
  type: { type: String, default: "button" },
  variant: { type: String, default: "primary" },
  customClass: { type: String, default: "" },
  icon: { type: String, default: null },
  loading: { type: Boolean, default: false }, 
});

const variantClasses = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  secondary: "bg-gray-500 text-white hover:bg-gray-600",
  success: "bg-green-500 text-white hover:bg-green-600",
  danger: "bg-red-500 text-white hover:bg-red-600",
  outline: "border border-gray-500 text-gray-500 hover:bg-gray-100",
};

const buttonClasses = computed(
  () =>
    `w-full py-3 rounded-lg transition duration-200 font-semibold flex items-center justify-center cursor-pointer ${
      variantClasses[props.variant] || variantClasses.primary
    } ${props.customClass} ${props.loading ? 'opacity-70 cursor-not-allowed' : ''}`
);
</script>