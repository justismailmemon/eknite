<template>
  <button
    @click="$emit('click')"
    class="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium
           transition-all duration-200 cursor-pointer group"
    :class="
      isActive
        ? 'bg-gray-900 text-white shadow-sm'
        : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
    "
  >
    <!-- Icon -->
    <Icon
      v-if="icon"
      :name="icon"
      size="sm"
      class="text-gray-400 group-hover:text-gray-900 transition"
    />

    <!-- Label -->
    <span>{{ label }}</span>
  </button>
</template>

<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import Icon from "@/components/atoms/Icon.vue";

const props = defineProps({
  label: String,
  icon: String,
  route: String, // 👈 expected route name
});

const route = useRoute();

// automatically detect if this sidebar item is active
const isActive = computed(() => route.name === props.route);
</script>
