<template>
  <ModalBase v-model="show">
    <!-- Header Slot -->
    <template #header>
      <h3 class="text-base font-semibold text-slate-900">{{ title }}</h3>
    </template>

    <!-- Body Slot -->
    <template #body>
      <p v-if="message" class="text-sm text-slate-500 mb-4">{{ message }}</p>
    </template>

    <!-- Footer Slot -->
    <template #footer>
      <div class="flex justify-end gap-2 mt-2">
        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-sm border border-slate-200 text-slate-600 hover:bg-slate-50"
          @click="onCancel"
        >
          {{ cancelLabel }}
        </button>

        <button
          type="button"
          class="px-3 py-1.5 rounded-lg text-sm text-white bg-red-600 hover:bg-red-700"
          @click="onConfirm"
        >
          {{ confirmLabel }}
        </button>
      </div>
    </template>
  </ModalBase>
</template>

<script setup>
import { ref, watch } from "vue";
import ModalBase from '@/components/organisms/ModalBase.vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "Are you sure?" },
  message: { type: String, default: "" },
  confirmLabel: { type: String, default: "Delete" },
  cancelLabel: { type: String, default: "Cancel" },
});

const emit = defineEmits(["update:modelValue", "confirm", "cancel"]);

const show = ref(props.modelValue);

watch(() => props.modelValue, val => show.value = val);

const onCancel = () => {
  emit("cancel");
  show.value = false;
  emit("update:modelValue", false);
};

const onConfirm = () => {
  emit("confirm");
  show.value = false;
  emit("update:modelValue", false);
};
</script>
