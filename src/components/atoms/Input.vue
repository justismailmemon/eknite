<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-2 text-[16px] font-medium text-gray-700"
    >
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      :class="[
        'w-full px-4 py-3 rounded-lg border focus:outline-none',
        error
          ? 'border-red-500'
          : 'border-gray-300 focus:ring-primary focus:ring-2',
      ]"
    />
    <p v-if="error" class="text-red-500 text-sm mt-1">{{ error }}</p>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  id: String,
  type: { type: String, default: "text" },
  placeholder: String,
  label: String,
  error: String,
});

const emits = defineEmits(["update:modelValue"]);
</script>
