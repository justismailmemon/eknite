<template>
  <div>
    <CreateDocument v-if="route.query.id === 'create-new'" />
    <div v-else>
      <Header>
        <div>
          <SelectBox
            :items="[
              { id: 1, label: '1111111111333333333...' },
              { id: 0, label: '09876543222' },
              { id: 1, label: '11111111111111111' },
              { id: 1, label: '1111111133333333333333...' },
              { id: 1, label: '112233' },
              { id: 1, label: '123' },
            ]"
            v-model="selectedItem"
          />
        </div>
      </Header>

      <div class="flex h-[calc(100vh-82px)]">
        <!-- Sidebar -->
        <div class="w-2/12 px-8 py-4 bg-gray-50">
          <Sidebar :adminItems="adminItems" @logout="$emit('logout')" />
        </div>

        <!-- Main Content -->
        <div class="w-10/12 px-6 py-4 space-y-6">
          <Hero
            title="Welcome to AI Studio!"
            subtitle="AI Studio empowers you to create and enhance your content using cutting-edge AI technology. Whether you're crafting documents, generating images, or producing audio, AI Studio connects you with leading AI models to bring your ideas to life."
          >
            <div>
              <Button variant="secondary" size="md" @click="goToCreateDocument">
                Document
              </Button>
            </div>
          </Hero>

          <Tabs />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

import Header from "@/components/organisms/Header.vue";
import Sidebar from "@/components/organisms/Sidebar.vue";
import Hero from "@/components/organisms/WorkspaceHero.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import CreateDocument from "@/pages/CreateWorkspace.vue";
import SelectBox from "@/components/molecules/SelectBox.vue";
import Tabs from "../organisms/Tabs.vue";

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

const router = useRouter();
const route = useRoute();

// Dynamic workspace ID from URL
const selectedWorkspace = route.params.id;

// Button → navigate to create document page
const goToCreateDocument = () => {
  router.push(`/workspace/${selectedWorkspace}/documents?id=create-new`);
};
</script>
