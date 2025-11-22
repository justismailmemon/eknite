<template>
  <ModalBase
    v-model="show"
    title="Edit Message"
    @save="handleSave"
    @cancel="handleCancel"
  >
    <!-- Body Slot -->
    <template #body>
      <TextareaAtom
        v-model="text"
        placeholder="Update your message..."
      />
    </template>
  </ModalBase>
</template>

<script setup>
import { ref, watch } from "vue";
import ModalBase from '@/components/organisms/ModalBase.vue';
import TextareaAtom from '@/components/atoms/Textarea.vue';

const props = defineProps({
  modelValue: { type: Boolean, default: false },
  text: { type: String, default: "" },
});

const emit = defineEmits(["update:modelValue", "save"]);

const show = ref(props.modelValue);
const text = ref(props.text);

watch(() => props.modelValue, val => show.value = val);
watch(() => props.text, val => text.value = val);

const handleSave = () => {
  emit("save", text.value);
  show.value = false;
  emit("update:modelValue", false);
};

const handleCancel = () => {
  show.value = false;
  emit("update:modelValue", false);
};
</script>
