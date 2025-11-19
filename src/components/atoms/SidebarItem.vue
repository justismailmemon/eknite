<template>
  <button
    class="w-full cursor-pointer text-left px-3 py-2 rounded-lg text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition">
    {{ label }}
  </button>
</template>

<script setup>
defineProps({
  label: String
});
</script>
