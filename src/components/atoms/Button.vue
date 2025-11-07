<!-- \src\components\atoms\Button.vue -->
<template>
  <button :type="type" :class="buttonClasses" @click="$emit('click')">
    <Icon v-if="icon" :name="icon" class="mr-2" />
    <slot />
  </button>
</template>

<script setup>
import { computed } from "vue";
import Icon from './Icon.vue'  // Use your Icon atom

const props = defineProps({
  type: { type: String, default: "button" },
  variant: { type: String, default: "primary" },
  customClass: { type: String, default: "" },
  icon: { type: String, default: null }, // pass Tabler icon **name string**
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
    `w-full py-3 rounded-lg transition duration-200 font-semibold flex items-center justify-center ${
      variantClasses[props.variant] || variantClasses.primary
    } ${props.customClass}`
);
</script>
