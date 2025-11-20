<template>
  <div class="h-screen overflow-hidden">
    <!-- HEADER (full width, fixed) -->
    <header class="fixed inset-x-0 top-0 h-16 z-30">
      <Header>
        <!-- page-level controls -->
        <slot name="header-right" />
      </Header>
    </header>

    <div class="flex h-full">
      <!-- SIDEBAR (fixed, starts under header) -->
      <aside
        class="fixed top-16 left-0 bottom-0 w-64 bg-gray-50 border-r border-gray-100 overflow-y-auto"
      >
        <Sidebar :adminItems="adminItems" @logout="$emit('logout')" />
      </aside>

      <!-- MAIN (accounts for header + sidebar) -->
      <main
        class="mt-16 ml-64 h-[calc(100vh-4rem)] px-6 py-4 overflow-y-auto w-full"
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
