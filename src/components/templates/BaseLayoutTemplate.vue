<template>
  <div class="h-screen overflow-hidden">
    <header class="fixed inset-x-0 top-0 h-16 z-30">
      <Header>
        <slot name="header-right" />
      </Header>
    </header>

    <div class="flex h-full">
      <aside
        class="fixed top-[85px] left-0 bottom-0 w-64 bg-gray-50 border-r border-gray-100 overflow-y-auto"
      >
        <Sidebar :adminItems="adminItems" @logout="$emit('logout')" />
      </aside>
      <main
        class="mt-[85px] ml-64 h-[calc(100vh-85px)] px-6 py-4 overflow-y-auto w-full"
      >
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/organisms/Header.vue";
import Sidebar from "@/components/organisms/Sidebar.vue";

defineProps({
  adminItems: { type: Array, required: true },
});
defineEmits(["logout"]);
</script>
