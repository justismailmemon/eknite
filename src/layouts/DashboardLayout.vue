<template>
  <div class="flex h-screen">
    <!-- Sidebar (fixed) -->
    <aside class="w-64 bg-gray-50 border-r fixed top-0 left-0 h-full overflow-y-auto">
      <Sidebar :adminItems="adminItems" @logout="onLogout" />
    </aside>

    <!-- Main area -->
    <div class="flex-1 ml-64">
      <!-- Header (fixed) -->
      <header class="h-16 bg-white border-b px-6 flex items-center justify-between fixed top-0 left-64 right-0 z-30">
        <Header />
      </header>

      <!-- Page content (scrolls) -->
      <main class="pt-16 p-6 h-screen overflow-y-auto">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import Header from "@/components/organisms/Header.vue";
import Sidebar from "@/components/organisms/Sidebar.vue";

const adminItems = [
  { label: "Settings", icon: "Settings" },
  { label: "Security", icon: "ShieldCheck" },
  { label: "Billing", icon: "CreditCard" },
  { label: "Apps", icon: "AppWindow" },
  { label: "Documents", icon: "FileText" },
];

const onLogout = () => {
  localStorage.removeItem("token");
  window.location.href = "/login";
};
</script>
