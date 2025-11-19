<template>
  <div
    class="bg-white cursor-pointer border border-transparent hover:border-gray-200 
           transition-all duration-200 shadow-sm hover:shadow-md 
           rounded-lg p-4 flex flex-col items-center justify-center select-none"
  >
    <Text 
      tag="h3" 
      size="text-2xl" 
      class="font-bold text-gray-800"
    >
      {{ name }}
    </Text>

    <Text 
      tag="p" 
      size="text-sm" 
      class="text-gray-500 mt-1"
    >
      {{ name }}
    </Text>
  </div>
</template>

<script setup>
import Text from "@/components/atoms/Text.vue";

defineProps({
  name: {
    type: String,
    required: true,
  },
});
</script>
