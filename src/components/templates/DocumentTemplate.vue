<template>
  <BaseLayoutTemplate :adminItems="adminItems" @logout="$emit('logout')">
    <!-- Put controls on the right side of the header (optional) -->
    <template #header-right>
      <SelectBox :items="headerItems" v-model="selectedItem" />
    </template>

    <!-- Body -->
    <CreateDocument v-if="route.query.id === 'create-new'" />
    <div v-else class="space-y-6">
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
  </BaseLayoutTemplate>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import BaseLayoutTemplate from "@/components/templates/BaseLayoutTemplate.vue";
import Hero from "@/components/organisms/WorkspaceHero.vue";
import Tabs from "@/components/organisms/Tabs.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import SelectBox from "@/components/molecules/SelectBox.vue";
import CreateDocument from "@/pages/CreateWorkspace.vue";

defineProps({
  adminItems: { type: Array, required: true },
});

defineEmits(["logout"]);

const route = useRoute();
const router = useRouter();

const selectedWorkspace = computed(() => route.params.id);

// header dropdown data
const selectedItem = ref(null);
const headerItems = [
  { id: 1, label: "1111111111333333333..." },
  { id: 0, label: "09876543222" },
  { id: 2, label: "11111111111111111" },
  { id: 3, label: "1111111133333333333333..." },
  { id: 4, label: "112233" },
  { id: 5, label: "123" },
];

const goToCreateDocument = () => {
  router.push(`/workspace/${selectedWorkspace.value}/documents?id=create-new`);
};
</script>
