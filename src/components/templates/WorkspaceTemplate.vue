<template>
  <CreateWorkspace v-if="route.query.id === 'create-new-workspace'" />

  <BaseLayoutTemplate v-else :adminItems="adminItems" @logout="$emit('logout')">
    <div class="space-y-6">
      <Hero
        title="Workspaces"
        subtitle="Workspace is a centralized platform to securely store, organize, and share your team's assets."
      >
        <div>
          <Button variant="secondary" size="md" @click="goToCreateWorkspace">
            Workspace
          </Button>
        </div>
      </Hero>
      <WorkspaceGrid :workspaces="workspaces" />
    </div>
  </BaseLayoutTemplate>
</template>

<script setup>
import { useRouter, useRoute } from "vue-router";
import BaseLayoutTemplate from "@/components/templates/BaseLayoutTemplate.vue";
import Hero from "@/components/organisms/WorkspaceHero.vue";
import WorkspaceGrid from "@/components/organisms/WorkspaceGrid.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import CreateWorkspace from "@/pages/CreateWorkspace.vue";

defineProps({
  adminItems: { type: Array, required: true },
  workspaces: { type: Array, required: true },
});
defineEmits(["logout"]);

const router = useRouter();
const route = useRoute();

const goToCreateWorkspace = () => {
  router.push({ name: "Workspace", query: { id: "create-new-workspace" } });
};
</script>
