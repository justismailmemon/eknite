<template>
  <header class="h-[85px] border-b border-gray-300 w-full bg-white p-4 md:px-8 flex items-center justify-between">

    <!-- Logo / Brand -->
    <div>
      <Text
        tag="h1"
        size="text-4xl"
        weight="font-semibold"
        color="text-primary"
      >
        Eknite
      </Text>
    </div>

    <!-- Username + Slot (page-specific actions) -->
    <div class="flex items-center space-x-4">
      <div class="flex items-center space-x-2">
        <img
          src="https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg"
          alt="User avatar"
          class="rounded-full h-10 w-10"
        />
        <Text size="text-lg" color="text-gray-500" weight="font-medium">
          Welcome, {{ username }}
        </Text>
      </div>

      <!-- Page-level control injected by BaseLayoutTemplate via default slot -->
      <slot />
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Text from "@/components/atoms/Text.vue";

const username = ref("User");

onMounted(() => {
  const saved = localStorage.getItem("username");
  if (saved && saved !== "null" && saved !== "undefined") {
    username.value = saved;
  }
});
</script>
