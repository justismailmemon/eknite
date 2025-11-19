<template>
<div>
<CreateWorkspace v-if="route.query.id === 'create-new'" />
    <div v-else>
    <Header />

    <div class="flex h-[calc(100vh-82px)]">
      <!-- Sidebar -->
      <div class="w-2/12 px-8 py-4 bg-gray-50">
        <Sidebar :adminItems="adminItems" @logout="$emit('logout')" />
      </div>

      <!-- Main Content -->
      <div class="w-10/12 px-6 py-4 space-y-6">
        <Hero
          title="Workspaces"
          subtitle="Workspace is a centralized platform to securely store, organize, and share your team's videos, documents and etc."
        >
          <div>
            <Button variant="secondary" size="md" @click="goToCreateWorkspace">
              Workspace
            </Button>
          </div>
        </Hero>

        <!-- WORKSPACE GRID (Cards Section) -->
        <WorkspaceGrid :workspaces="workspaces" />
      </div>
    </div>
  </div>
</div>
</template>

<script setup>
import Header from "@/components/organisms/Header.vue";
import Sidebar from "@/components/organisms/Sidebar.vue";
import Hero from "@/components/organisms/WorkspaceHero.vue";
import WorkspaceGrid from "@/components/organisms/WorkspaceGrid.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import CreateWorkspace from "@/pages/CreateWorkspace.vue";
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const route = useRoute();

defineProps({
  adminItems: {
    type: Array,
    required: true,
  },
  workspaces: {
    type: Array,
    required: true,
  },
});

defineEmits(["logout"]);

const goToCreateWorkspace = () => {
  router.push(`/workspace?id=create-new`);
};
</script>
