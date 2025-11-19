<!-- src/components/molecules/Button.vue -->
<template>
  <ButtonBase
    :type="type"
    :variant="variant"
    :customClass="customClass"
    :disabled="loading"
    @click="$emit('click')"
  >
    <svg
      v-if="loading"
      class="animate-spin size-5 mr-2 text-white"
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

    <Icon class="mr-2" size="md" v-if="icon && !loading" :name="icon" />
    <slot></slot>
  </ButtonBase>
</template>

<script setup>
import ButtonBase from "@/components/atoms/ButtonBase.vue";
import Icon from "@/components/atoms/Icon.vue";

defineProps({
  type: { type: String, default: "button" },
  variant: { type: String, default: "primary" },
  customClass: { type: String, default: "" },
  icon: { type: String, default: null },
  loading: { type: Boolean, default: false },
});
</script>
