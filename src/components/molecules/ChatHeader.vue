<template>
  <div
    class="px-6 py-3 border-b border-slate-200 flex items-center justify-between bg-white/80 backdrop-blur"
  >
    <div class="flex items-center gap-3">
      <div
        class="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center"
      >
        <Icon
          name="MessageCircle"
          size="md"
          strokeWidth="1.5"
          class="text-primary"
        />
      </div>

      <div>
        <Text size="text-base" weight="font-semibold" class="text-slate-900">
          Chat with Eknite
        </Text>
        <Text size="text-xs" class="text-slate-500">
          Ask anything about your content or documents.
        </Text>
      </div>
    </div>

    <div v-if="isBotTyping" class="hidden md:flex items-center gap-2">
      <span class="inline-flex gap-1">
        <span
          class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
        ></span>
        <span
          class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
          style="animation-delay: 0.1s"
        ></span>
        <span
          class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"
          style="animation-delay: 0.2s"
        ></span>
      </span>
      <Text size="text-xs" class="text-slate-500">Eknite is thinking…</Text>
    </div>
  </div>
</template>

<script setup>
import Icon from "@/components/atoms/Icon.vue";
import Text from "@/components/atoms/Text.vue";

defineProps({
  isBotTyping: {
    type: Boolean,
    default: false,
  },
});
</script>
