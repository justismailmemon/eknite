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

      <!-- RIGHT SIDE -->
      <div class="flex items-center gap-3">
        <!-- ACTION BAR -->
        <transition name="fade">
          <div
            v-if="selectedRows.length > 0"
            class="flex items-center whitespace-nowrap gap-3 rounded-lg"
          >
            <span class="font-medium text-indigo-700 text-sm">
              {{ selectedRows.length }} selected
            </span>

            <ButtonBase variant="outline" size="sm" @click="moveSelected">
              Move
            </ButtonBase>

            <ButtonBase variant="outline" size="sm" @click="copySelected">
              Copy
            </ButtonBase>

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

        <!-- SEARCH -->
        <Input placeholder="Search..." size="sm" />
        <!-- ACTION BAR -->
      </div>
    </div>

    <!-- TABLE -->
    <Table
      v-if="activeTab === 'recent'"
      :rows="recentRows"
      v-model:selectedRows="selectedRows"
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
import { ref } from "vue";
import Table from "@/components/molecules/Table.vue";
import ButtonBase from "@/components/atoms/ButtonBase.vue";
import Input from "../atoms/Input.vue";

const tabs = [
  { key: "recent", label: "Recent Docs" },
  { key: "folders", label: "Folders" },
  { key: "shared", label: "Shared" },
];

const activeTab = ref("recent");
const search = ref("");
const selectedRows = ref([]);

const recentRows = [
  {
    id: 1,
    name: "Project Plan",
    owner: "Ali",
    folders: 2,
    docs: 4,
    order: 1,
    modified: "2 days ago",
  },
  {
    id: 2,
    name: "Report",
    owner: "Sara",
    folders: 1,
    docs: 1,
    order: 2,
    modified: "1 week ago",
  },
  {
    id: 3,
    name: "Invoices",
    owner: "John",
    folders: 4,
    docs: 15,
    order: 3,
    modified: "3 days ago",
  },
];

// ACTION BAR EVENTS
const moveSelected = () => console.log("Move:", selectedRows.value);
const copySelected = () => console.log("Copy:", selectedRows.value);
const deleteSelected = () => console.log("Delete:", selectedRows.value);
</script>
