<!-- \src\components\atoms\Input.vue -->
<template>
  <div>
    <label v-if="label" :for="id" class="block mb-2 text-sm font-medium text-gray-700">{{ label }}</label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :placeholder="placeholder"
      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
    />
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: [String, Number],
  id: String,
  type: { type: String, default: 'text' },
  placeholder: String,
  label: String
})

const emits = defineEmits(['update:modelValue'])
</script>
