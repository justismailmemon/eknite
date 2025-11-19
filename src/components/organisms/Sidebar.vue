<template>
  <aside class="space-y-10">
    <!-- Workspace Admin Section -->
    <div>
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        Workspace Admin
      </h2>

      <nav class="space-y-1">
        <SidebarItem
          v-for="(item, index) in adminItems"
          :key="index"
          :label="item.label"
          :active="item.active"
        />
      </nav>
    </div>

    <!-- User Section -->
    <div>
      <h2 class="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
        User
      </h2>

      <nav class="space-y-1">
        <SidebarItem label="Profile" />

        <!-- Logout item triggers event -->
        <SidebarItem 
          label="Logout" 
          @click="$emit('logout')" 
        />
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
