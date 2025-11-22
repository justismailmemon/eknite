<template>
  <div>
    <!-- CREATE -->
    <CreateDocument
      type="create"
      v-if="route.query.id === 'create-new-document'"
      @refresh="refreshData"
    />

    <!-- EDIT -->
    <CreateDocument
      type="edit"
      v-else-if="route.query.id && route.query.id !== 'create-new-document'"
      :documentId="route.query.id"
      @refresh="refreshData"
    />

    <!-- LIST / MAIN -->
    <BaseLayoutTemplate v-else :adminItems="adminItems" @logout="$emit('logout')">
      <!-- HEADER RIGHT: SELECT WORKSPACE -->
      <template #header-right>
        <SelectBox
          :items="headerItems"
          :loading="loading"
          v-model="selectedItem"
          @update:modelValue="handleSelect"
        />
      </template>

      <!-- MAIN TABS -->
      <div class="space-y-6">
        <Hero
          title="Welcome to AI Studio!"
          subtitle="AI Studio empowers you to create and enhance your content using cutting-edge AI technology."
        >
          <div>
            <Button variant="secondary" size="md" @click="goToCreateDocument">
              New Document
            </Button>
          </div>
        </Hero>

        <Tabs
          :documents="documents"
          @filters="emitFilters"
          @deleted="emitDelete"
          @delete-selected="emitBulkDelete"
        />
      </div>
    </BaseLayoutTemplate>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseLayoutTemplate from "@/components/templates/BaseLayoutTemplate.vue";
import Hero from "@/components/organisms/WorkspaceHero.vue";
import Tabs from "@/components/organisms/Tabs.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import SelectBox from "@/components/molecules/SelectBox.vue";
import CreateDocument from "@/pages/CreateDocument.vue";

const props = defineProps({
  adminItems: Array,
  workspaces: Array,
  documents: Array,
  currentWorkspace: Object,
  loading: Boolean,
});

const emit = defineEmits(["logout", "filters", "deleted", "delete-selected"]);

const route = useRoute();
const router = useRouter();

const selectedWorkspaceId = computed(() => route.params.id);

// SelectBox items
const headerItems = computed(() =>
  props.workspaces.map((ws) => ({
    label: ws.name,
    id: ws._id,
    value: ws._id,
  }))
);

const selectedItem = ref(null);

// Sync selected workspace with dropdown
watch(
  () => props.workspaces,
  () => {
    const match = headerItems.value.find(
      (i) => String(i.value) === String(selectedWorkspaceId.value)
    );
    selectedItem.value = match || null;
  },
  { immediate: true }
);

const goToCreateDocument = () => {
  router.push(
    `/workspace/${selectedWorkspaceId.value}/documents?id=create-new-document`
  );
};

// Workspace changed from selectbox
const handleSelect = (item) => {
  router.push(`/workspace/${item.value}/documents`);
};

const refreshData = () => {
  emit("filters", { searchText: "", sort: "last_modified" });
};

// BUBBLE EVENTS UP
const emitFilters = (f) => emit("filters", f);
const emitDelete = (id) => emit("deleted", id);
const emitBulkDelete = (ids) => emit("delete-selected", ids);
</script>
