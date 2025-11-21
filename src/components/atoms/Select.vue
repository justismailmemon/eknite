<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-[16px] font-medium text-gray-700"
    >
      {{ label }}
    </label>

    <select
      :id="id"
      :value="modelValue"
      @change="$emit('update:modelValue', $event.target.value)"
      :class="[
        'w-full rounded-lg border focus:outline-none transition bg-white',
        sizeClass,
        error
          ? 'border-red-500'
          : 'border-gray-300 focus:ring-primary focus:ring-2',
      ]"
    >
      <!-- Optional placeholder (disabled) -->
      <option
        v-if="placeholder"
        disabled
        value=""
      >
        {{ placeholder }}
      </option>

      <option
        v-for="option in options"
        :key="optionKey(option)"
        :value="optionValue(option)"
      >
        {{ optionLabel(option) }}
      </option>
    </select>

    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  modelValue: [String, Number],
  id: String,
  placeholder: String,
  label: String,
  error: String,

  // same size API as input atom
  size: {
    type: String,
    default: "md", // "sm" | "md" | "lg"
    validator: (val) => ["sm", "md", "lg"].includes(val),
  },

  // options can be ["A", "B"] or [{ label, value }]
  options: {
    type: Array,
    default: () => [],
  },
});

const emits = defineEmits(["update:modelValue"]);

// Map size → padding + font-size (same as input atom)
const sizeClass = computed(() => {
  const map = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return map[props.size];
});

// helpers so options can be strings or objects
const optionLabel = (option) =>
  typeof option === "object" ? option.label : option;

const optionValue = (option) =>
  typeof option === "object" ? option.value : option;

const optionKey = (option) =>
  typeof option === "object" ? option.value ?? option.label : option;
</script>
