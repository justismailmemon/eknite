<template>
  <div class="w-full">
    <!-- HEADER BAR -->
    <div class="flex items-center justify-between mb-4">
      <!-- LEFT: TABS -->
      <div class="flex border-b border-gray-300">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          @click="activeTab = tab.key"
          :class="[
            'px-4 py-2 mr-4 font-medium cursor-pointer',
            activeTab === tab.key
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500',
          ]"
        >
          {{ tab.label }}
        </button>
      </div>

      <!-- RIGHT: SEARCH + SORT + ACTION BAR -->
      <div class="flex items-center gap-3">
        <!-- ACTION BAR (selected rows) -->
        <transition name="fade">
          <div
            v-if="selectedRows.length > 0"
            class="flex items-center whitespace-nowrap gap-3 rounded-lg"
          >
            <span class="font-medium text-indigo-700 text-sm">
              {{ selectedRows.length }} selected
            </span>

            <ButtonBase variant="outline" size="sm">Move</ButtonBase>
            <ButtonBase variant="outline" size="sm">Copy</ButtonBase>

            <ButtonBase
              variant="outline"
              size="sm"
              class="text-red-600 border-red-300"
              @click="deleteSelected"
            >
              Delete
            </ButtonBase>
          </div>
        </transition>

        <!-- SORT (using Select) -->
        <Select
          v-model="sort"
          size="sm"
          :options="sortOptions"
          @update:modelValue="emitFilters"
        />

        <!-- SEARCH -->
        <Input
          placeholder="Search..."
          size="sm"
          v-model="searchText"
          @input="emitFilters"
        />
      </div>
    </div>

    <!-- TABLES -->
    <Table
      v-if="activeTab === 'recent'"
      :rows="localDocuments"
      v-model:selectedRows="selectedRows"
      @deleted="removeDocument"
    />

    <Table
      v-if="activeTab === 'folders'"
      :rows="[]"
      v-model:selectedRows="selectedRows"
    />

    <Table
      v-if="activeTab === 'shared'"
      :rows="[]"
      v-model:selectedRows="selectedRows"
    />
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import Table from "@/components/molecules/Table.vue";
import ButtonBase from "@/components/atoms/ButtonBase.vue";
import Input from "@/components/atoms/Input.vue";
import Select from "@/components/atoms/Select.vue";

// PROPS
const props = defineProps({
  documents: Array,
});

// EMITS
const emit = defineEmits(["filters", "delete-selected"]);

// LOCAL COPY (no prop mutation)
const localDocuments = ref([...props.documents]);

watch(
  () => props.documents,
  (val) => (localDocuments.value = [...val])
);

// UI STATE
const activeTab = ref("recent");
const selectedRows = ref([]);
const searchText = ref("");
const sort = ref("last_modified");

// SORT OPTIONS (for Select)
const sortOptions = [
  { label: "Last Modified", value: "last_modified" },
  { label: "Name A–Z", value: "title_asc" },
  { label: "Name Z–A", value: "title_desc" },
  { label: "Newest Created", value: "created_desc" },
  { label: "Oldest Created", value: "created_asc" },
];

// TABS
const tabs = [
  { key: "recent", label: "Recent Docs" },
  { key: "folders", label: "Folders" },
  { key: "shared", label: "Shared" },
];

// EMIT FILTER INPUT
const emitFilters = () => {
  emit("filters", {
    searchText: searchText.value,
    sort: sort.value,
  });
};

// Remove document from local
const removeDocument = (id) => {
  localDocuments.value = localDocuments.value.filter((d) => d._id !== id);
};

// Delete selected button
const deleteSelected = () => {
  emit("delete-selected", selectedRows.value);
};
</script>
