<template>
  <div
    v-if="modelValue"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
  >
    <div
      class="w-full max-w-lg rounded-2xl bg-white shadow-lg border border-slate-200 p-5"
      @click.stop
    >
      <!-- Header Slot -->
      <div class="mb-3">
        <slot name="header">
          <h3 class="text-base font-semibold text-slate-900">{{ title }}</h3>
        </slot>
      </div>

      <!-- Body Slot -->
      <div class="mb-4">
        <slot name="body"></slot>
      </div>

      <!-- Footer Slot -->
      <div class="flex justify-end gap-2 mt-4">
        <slot name="footer">
          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-sm border border-slate-200 text-slate-600 hover:bg-slate-50"
            @click="onCancel"
          >
            Cancel
          </button>

          <button
            type="button"
            class="px-3 py-1.5 rounded-lg text-sm text-white bg-primary hover:bg-primary/90"
            @click="onSave"
          >
            Save
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: Boolean, default: false },
  title: { type: String, default: "Modal Title" },
});

const emit = defineEmits(["update:modelValue", "save", "cancel"]);

const onCancel = () => {
  emit("cancel");
  emit("update:modelValue", false);
};

const onSave = () => {
  emit("save");
  emit("update:modelValue", false);
};
</script>
