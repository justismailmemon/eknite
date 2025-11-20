<template>
  <aside class="w-full space-y-5 bg-gray-50 h-full px-6 py-4">
    <!-- Workspace Admin -->
    <div>
      <h2
        class="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2"
      >
        Workspace Admin
      </h2>

      <nav class="flex flex-col space-y-1">
        <SidebarItem
          v-for="(item, index) in adminItems"
          :key="index"
          :label="item.label"
          :active="item.active"
          :icon="item.icon"
        />
      </nav>
    </div>

    <!-- Divider -->
    <div class="border-t border-gray-200"></div>

    <!-- User Section -->
    <div>
      <h2
        class="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2"
      >
        User
      </h2>

      <nav class="flex flex-col space-y-1">
        <SidebarItem label="Profile" icon="user" />
        <SidebarItem label="Logout" icon="logout" @click="$emit('logout')" />
      </nav>
    </div>
  </aside>
</template>

<script setup>
import SidebarItem from "@/components/atoms/SidebarItem.vue";

defineProps({
  adminItems: {
    type: Array,
    required: true,
  },
});

defineEmits(["logout"]);
</script>
