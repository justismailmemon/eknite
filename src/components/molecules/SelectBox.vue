<template>
  <div class="relative w-64">
    <!-- Selected Box -->
    <div
      class="flex items-center justify-between bg-white border border-gray-300 rounded-xl px-3 py-2 cursor-pointer"
      @click="toggle"
    >
      <!-- LEFT BOX -->
      <div class="flex items-center gap-3 overflow-hidden">
        <div class="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
          {{ selected?.id }}
        </div>

        <!-- TEXT -->
        <span class="truncate max-w-[140px]">
          {{ selected?.label || "Select..." }}
        </span>
      </div>

      <!-- ARROW -->
      <span class="text-gray-700">
        <svg
          :class="{ 'rotate-180': open }"
          class="h-4 w-4 transform transition-transform"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fill-rule="evenodd"
            d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.24 4.25a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
          />
        </svg>
      </span>
    </div>

    <!-- DROPDOWN LIST -->
    <div
      v-if="open"
      class="absolute left-0 right-0 bg-white border border-gray-300 shadow-lg rounded-xl mt-2 max-h-60 overflow-auto z-50"
    >
      <div
        v-for="item in items"
        :key="item.id"
        @click="choose(item)"
        class="flex items-center gap-3 px-3 py-2 cursor-pointer hover:bg-gray-100"
      >
        <!-- LEFT BOX -->
        <div class="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center">
          {{ item.id }}
        </div>

        <!-- TEXT -->
        <span class="truncate">
          {{ item.label }}
        </span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  items: Array,
  modelValue: Object,
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const selected = ref(props.modelValue || null);

const toggle = () => (open.value = !open.value);

const choose = (item) => {
  selected.value = item;
  open.value = false;
  emit("update:modelValue", item);
};
</script>
