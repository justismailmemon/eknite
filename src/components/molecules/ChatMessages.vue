<template>
  <div
    ref="container"
    class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/60"
  >
    <!-- MESSAGES -->
    <div
      v-for="msg in messages"
      :key="msg._id || msg.tempId"
      class="flex"
      :class="msg.sender === 'user' ? 'justify-end' : 'justify-start'"
    >
      <div class="max-w-[72%] space-y-1">
        <!-- BUBBLE -->
        <div
          class="px-3 py-2 text-sm rounded-2xl shadow-xs"
          :class="msg.sender === 'user'
            ? 'bg-primary text-white rounded-br-md'
            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-md'"
        >
          <Text size="text-sm" class="leading-relaxed whitespace-pre-wrap">
            {{ msg.text }}
          </Text>
        </div>

        <!-- USER ACTIONS -->
        <div
          v-if="msg.sender === 'user' && msg._id"
          class="flex items-center gap-2 justify-end text-[11px]"
        >
          <button
            type="button"
            @click.stop="$emit('edit', msg)"
            class="px-2 py-[2px] rounded-full bg-slate-50 border border-slate-300 text-slate-600
                   hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800 transition"
          >
            Edit
          </button>

          <button
            type="button"
            @click.stop="$emit('delete', msg)"
            class="px-2 py-[2px] rounded-full bg-slate-50 border border-slate-300 text-slate-600
                   hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800 transition"
          >
            Delete
          </button>
        </div>

        <!-- BOT ACTIONS -->
        <div
          v-if="msg.sender === 'bot' && msg._id"
          class="flex items-center flex-wrap gap-2 justify-start text-[11px]"
        >
          <button
            type="button"
            @click="$emit('copy', msg)"
            class="px-2 py-[2px] rounded-full bg-slate-50 border border-slate-300 text-slate-600
                   hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800 transition"
          >
            Copy
          </button>

          <button
            type="button"
            @click.stop="$emit('delete', msg)"
            class="px-2 py-[2px] rounded-full bg-slate-50 border border-slate-300 text-slate-600
                   hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800 transition"
          >
            Delete
          </button>

          <!-- NEW BOT OPTIONS -->
          <button
            class="px-2 py-[2px] rounded-full bg-slate-50 border border-slate-300 text-slate-600
                   hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800 transition"
            @click="$emit('insert', msg)"
          >
            Insert
          </button>

          <button
            class="px-2 py-[2px] rounded-full bg-slate-50 border border-slate-300 text-slate-600
                   hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800 transition"
            @click="$emit('prepend', msg)"
          >
            Prepend
          </button>

          <button
            class="px-2 py-[2px] rounded-full bg-slate-50 border border-slate-300 text-slate-600
                   hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800 transition"
            @click="$emit('append', msg)"
          >
            Append
          </button>

          <button
            class="px-2 py-[2px] rounded-full bg-slate-50 border border-slate-300 text-slate-600
                   hover:bg-slate-100 hover:border-slate-400 hover:text-slate-800 transition"
            @click="$emit('overwrite', msg)"
          >
            Overwrite
          </button>
        </div>
      </div>
    </div>

    <!-- BOT TYPING INDICATOR -->
    <div v-if="isBotTyping" class="flex justify-start mt-1">
      <div
        class="inline-flex items-center gap-2 px-3 py-2 rounded-2xl bg-white border border-slate-200 text-xs text-slate-500"
      >
        <span class="inline-flex gap-1">
          <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style="animation-delay: 0.1s"></span>
          <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-bounce" style="animation-delay: 0.2s"></span>
        </span>
        Eknite is thinking…
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue';
import Text from "@/components/atoms/Text.vue";

defineProps({
  messages: Array,
  isBotTyping: Boolean
});

defineEmits(["edit", "delete", "copy", "insert", "prepend", "append", "overwrite"]);

const container = ref(null);

const scrollToBottom = async () => {
  await nextTick();
  if (container.value) container.value.scrollTop = container.value.scrollHeight;
};

defineExpose({ scrollToBottom });
</script>
