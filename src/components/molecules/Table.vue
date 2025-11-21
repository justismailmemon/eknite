<template>
  <div class="relative">
    <div
      class="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <table class="min-w-full text-sm">
        <!-- HEADER -->
        <thead
          class="bg-slate-50 !rounded-t-2xl text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
        >
          <tr>
            <th class="w-10 px-4 py-3">
              <input
                type="checkbox"
                class="h-4 w-4"
                :checked="isAllChecked"
                @change="toggleAll"
              />
            </th>
            <th class="px-4 py-3">Name</th>
            <th class="px-4 py-3">Owner</th>
            <th class="px-4 py-3">Folders</th>
            <th class="px-4 py-3">Documents</th>
            <th class="px-4 py-3">Order</th>
            <th class="px-4 py-3">Last Modified</th>
            <th class="w-10 px-4 py-3 text-center">Actions</th>
          </tr>
        </thead>

        <!-- BODY -->
        <tbody class="divide-y divide-slate-100 text-sm text-slate-700">
          <tr
            v-for="row in rows"
            :key="row._id"
            :class="[
              'transition-colors cursor-pointer',
              selectedRows.includes(row._id)
                ? 'bg-indigo-50'
                : 'hover:bg-slate-50',
            ]"
          >
            <!-- CHECKBOX -->
            <td class="px-4 py-3">
              <input
                type="checkbox"
                class="h-4 w-4"
                :value="row._id"
                :checked="selectedRows.includes(row._id)"
                @change="toggleRow(row._id)"
              />
            </td>

            <!-- NAME -->
            <td class="max-w-xs truncate px-4 py-3 font-medium">
              {{ row.title || "-" }}
            </td>

            <!-- OWNER -->
            <td class="px-4 py-3">{{ row.owner || "-" }}</td>

            <!-- FOLDERS -->
            <td class="px-4 py-3">{{ row.folders || "-" }}</td>

            <!-- DOCUMENTS -->
            <td class="px-4 py-3">{{ row.documents || "-" }}</td>

            <!-- ORDER -->
            <td class="px-4 py-3">{{ row.order || "-" }}</td>

            <!-- LAST MODIFIED -->
            <td class="px-4 py-3 text-slate-500">
              {{ formatDate(row._updated) }}
            </td>

            <!-- ACTIONS -->
            <td class="relative px-4 py-3 text-center">
              <Button
                variant="icon"
                class="menu-btn"
                @click="toggleMenu(row._id)"
              >
                ⋮
              </Button>

              <!-- DROPDOWN -->
              <transition name="fade">
                <div
                  v-if="openMenu === row._id"
                  class="dropdown-menu absolute right-2 top-9 z-50 w-36 rounded-lg border border-slate-200 bg-white shadow-lg"
                  @click.stop
                >
                  <button
                    class="block cursor-pointer w-full px-3 py-2 text-left hover:bg-slate-50"
                    @click.stop="goToEditDocument(row._id)"
                  >
                    Edit
                  </button>

                  <button
                    class="block cursor-pointer w-full px-3 py-2 text-left hover:bg-slate-50"
                  >
                    Move
                  </button>

                  <button
                    class="block cursor-pointer w-full px-3 py-2 text-left hover:bg-slate-50"
                  >
                    Copy
                  </button>

                  <button
                    class="block cursor-pointer w-full px-3 py-2 text-left hover:bg-slate-50"
                  >
                    Share
                  </button>

                  <button
                    class="block cursor-pointer w-full px-3 py-2 text-left text-red-600 hover:bg-red-50"
                    @click.stop="deleteDoc(row._id)"
                  >
                    Delete
                  </button>
                </div>
              </transition>
            </td>
          </tr>

          <tr v-if="rows.length === 0">
            <td colspan="8" class="px-6 py-10 text-center text-slate-400">
              No items found.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import Button from "@/components/atoms/ButtonBase.vue";
import api from "@/api/axios.js";
import { notify } from "@/utils/notify.js";

const props = defineProps({
  rows: Array,
  selectedRows: Array,
});

// ❗ FIX: declare deleted event
const emit = defineEmits(["update:selectedRows", "deleted"]);

const route = useRoute();
const router = useRouter();

const openMenu = ref(null);

const formatDate = (date) => {
  if (!date) return "-";
  return new Date(date).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

// CLICK OUTSIDE
const handleClickOutside = (event) => {
  if (
    !event.target.closest(".dropdown-menu") &&
    !event.target.closest(".menu-btn")
  ) {
    openMenu.value = null;
  }
};

onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() =>
  document.removeEventListener("click", handleClickOutside)
);

// CHECKBOXES
const isAllChecked = computed(
  () => props.rows.length > 0 && props.selectedRows.length === props.rows.length
);

const toggleAll = (e) => {
  emit(
    "update:selectedRows",
    e.target.checked ? props.rows.map((r) => r._id) : []
  );
};

const toggleRow = (id) => {
  const list = [...props.selectedRows];
  if (list.includes(id)) {
    emit("update:selectedRows", list.filter((x) => x !== id));
  } else {
    emit("update:selectedRows", [...list, id]);
  }
};

// MENU
const toggleMenu = (id) => {
  openMenu.value = openMenu.value === id ? null : id;
};

// EDIT NAVIGATION
const goToEditDocument = (id) => {
  router.push(`/workspace/${route.params.id}/documents?id=${id}`);
};

// DELETE
const deleteDoc = async (docId) => {
  try {
    const wsId = route.params.id;

    const res = await api.delete(`/workspace/${wsId}/documents/${docId}`);

    notify(res.data?.message || "Document deleted", "success");

    emit("deleted", docId);

    openMenu.value = null;
  } catch (error) {
    notify(error?.response?.data?.message || "Delete failed", "error");
  }
};
</script>

