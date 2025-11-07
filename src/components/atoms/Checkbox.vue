<!-- \src\components\atoms\Checkbox.vue -->
<template>
  <label class="flex items-center gap-2">
    <input
      type="checkbox"
      :checked="modelValue"
      @change="$emit('update:modelValue', $event.target.checked)"
      class="w-4 h-4 rounded border-gray-300 focus:ring-blue-500"
    />
    <span><slot /></span>
  </label>
</template>

<script setup>
const props = defineProps({
  modelValue: Boolean
})

const emits = defineEmits(['update:modelValue'])
</script>
