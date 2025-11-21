<template>
  <div class="relative w-64" ref="dropdownRef">
    <!-- Selected Box -->
    <div
      class="flex items-center justify-between bg-white border border-gray-300 rounded-xl px-3 py-2 cursor-pointer"
      @click="toggle"
    >
      <div class="flex items-center gap-3 overflow-hidden">
        <div
          class="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
        >
          <LoadingSpinner v-if="loading" />

          <span v-else>{{ selected?.label.charAt(0).toUpperCase() }}</span>
        </div>

        <span class="truncate max-w-[140px]">
          {{ loading ? "Loading..." : selected?.label || "Select..." }}
        </span>
      </div>

      <span class="text-gray-700" v-if="!loading">
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

    <!-- DROPDOWN -->
    <transition name="fade">
      <div
        v-if="open"
        class="dropdown-menu absolute left-0 right-0 bg-white border border-gray-300 shadow-lg rounded-xl mt-2 max-h-60 overflow-auto z-50"
      >
        <div
          v-if="loading"
          class="flex items-center justify-center py-4 text-gray-600"
        >
          <svg class="animate-spin h-6 w-6 text-gray-700" viewBox="0 0 24 24">
            <circle
              class="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              stroke-width="4"
            />
            <path
              class="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z"
            />
          </svg>
        </div>

        <div
          v-else
          v-for="item in items"
          :key="item.value"
          @click="choose(item)"
          class="flex items-center gap-3 px-3 py-2 cursor-pointer rounded"
          :class="{
            'bg-gray-100 text-black font-medium':
              selected?.value === item.value,
            'hover:bg-gray-50': selected?.value !== item.value,
          }"
        >
          <div
            class="w-8 h-8 bg-gray-200 rounded-md flex items-center justify-center"
          >
            {{ item.label.charAt(0).toUpperCase() }}
          </div>

          <span class="truncate">{{ item.label }}</span>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import LoadingSpinner from "@/assets/svg/LoadingSpinner.vue";

const props = defineProps({
  items: Array,
  modelValue: Object,
  loading: Boolean,
});

const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const dropdownRef = ref(null);

const selected = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});

const toggle = () => {
  if (!props.loading) open.value = !open.value;
};

const choose = (item) => {
  if (!props.loading) {
    selected.value = item;
    open.value = false;
  }
};

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    open.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
