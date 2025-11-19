<template>
  <div>
    <!-- Label -->
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-[16px] font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <!-- Textarea -->
    <textarea
      :id="id"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :rows="rows"
      :class="[
        'w-full rounded-lg border focus:outline-none transition resize-none',
        sizeClass,
        error
          ? 'border-red-500'
          : 'border-gray-300 focus:ring-primary focus:ring-2',
      ]"
    ></textarea>

    <!-- Error -->
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  id: String,
  placeholder: String,
  label: String,
  error: String,

  rows: {
    type: Number,
    default: 5,
  },

  size: {
    type: String,
    default: "md",
    validator: (val) => ["sm", "md", "lg"].includes(val),
  },
});

const emits = defineEmits(["update:modelValue"]);

// Shared padding tokens (same as Input + Button)
const sizeClass = computed(() => {
  const map = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return map[props.size];
});
</script>
