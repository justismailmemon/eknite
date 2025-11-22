<template>
  <form
    class="border-t border-slate-200 bg-white px-3 pt-[11px] pb-1 flex items-center gap-3"
    @submit.prevent="onSubmit"
  >
    <div class="flex-1">
      <Textarea
        :modelValue="modelValue"
        @update:modelValue="(val) => emit('update:modelValue', val)"
        placeholder="Type a message…"
        :rows="1"
        @keydown.enter.exact.prevent="onEnterKey"
        @keydown.enter.shift.stop
      />
    </div>

    <Button
      type="submit"
      variant="icon"
      :disabled="sending || !canSend"
      :class="[
        'transition',
        sending || !canSend ? 'opacity-50 cursor-not-allowed' : '',
      ]"
    >
      <Icon name="Send" size="sm" />
    </Button>
  </form>
</template>

<script setup>
import { computed } from "vue";
import Textarea from "@/components/atoms/Textarea.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import Icon from "@/components/atoms/Icon.vue";

const props = defineProps({
  modelValue: {
    type: String,
    default: "",
  },
  sending: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["update:modelValue", "send"]);

const canSend = computed(() => !!props.modelValue.trim());

const onEnterKey = () => {
  if (!canSend.value || props.sending) return;
  emit("send");
};

const onSubmit = () => {
  if (!canSend.value || props.sending) return;
  emit("send");
};
</script>
