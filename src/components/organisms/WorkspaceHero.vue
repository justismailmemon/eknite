<template>
  <div
    class="bg-primary w-full rounded-lg flex items-center justify-between gap-6 px-6 py-6"
  >
    <div>
      <Text
        v-if="title"
        tag="h2"
        size="text-3xl"
        weight="font-medium"
        color="text-secondary"
      >
        {{ title }}
      </Text>

      <Text v-if="subtitle" tag="p" size="text-sm" color="text-secondary" class="pt-2">
        {{ subtitle }}
      </Text>
    </div>

    <div>
      <slot />
    </div>
  </div>
</template>

<script setup>
import Text from "@/components/atoms/Text.vue";

defineProps({
  title: {
    type: String,
    default: "Workspace",
  },
  subtitle: {
    type: String,
    default:
      "Workspace is a centralized platform to store and share your team's videos and documents.",
  },
});
</script>

<style scoped></style>
