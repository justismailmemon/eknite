<template>
  <div class="relative">
    <div class="overflow-visible rounded-2xl border border-slate-200 bg-white shadow-sm">
      <table class="min-w-full text-sm">

        <!-- HEADER -->
        <thead class="bg-slate-50 !rounded-t-2xl text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
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
            :key="row.id"
            :class="[
              'transition-colors',
              selectedRows.includes(row.id) ? 'bg-indigo-50' : 'hover:bg-slate-50',
            ]"
          >
            <!-- CHECKBOX -->
            <td class="px-4 py-3">
              <input
                type="checkbox"
                class="h-4 w-4"
                :value="row.id"
                :checked="selectedRows.includes(row.id)"
                @change="toggleRow(row.id)"
              />
            </td>

            <!-- NAME -->
            <td class="max-w-xs truncate px-4 py-3 font-medium">
              {{ row.name }}
            </td>

            <!-- OWNER -->
            <td class="px-4 py-3">{{ row.owner }}</td>

            <!-- FOLDERS -->
            <td class="px-4 py-3">{{ row.folders }}</td>

            <!-- DOCUMENTS -->
            <td class="px-4 py-3">{{ row.docs }}</td>

            <!-- ORDER -->
            <td class="px-4 py-3">{{ row.order }}</td>

            <!-- LAST MODIFIED -->
            <td class="px-4 py-3 text-slate-500">{{ row.modified }}</td>

            <!-- ACTIONS -->
            <td class="relative px-4 py-3 text-center">
              <button
                type="button"
                class="menu-btn inline-flex h-8 w-8 justify-center items-center rounded-full hover:bg-slate-100"
                @click="toggleMenu(row.id)"
              >
                ⋮
              </button>

              <!-- DROPDOWN -->
              <transition name="fade">
                <div
                  v-if="openMenu === row.id"
                  class="dropdown-menu absolute right-2 top-9 z-50 w-36 rounded-lg border border-slate-200 bg-white shadow-lg"
                >
                  <button class="block w-full px-3 py-2 text-left hover:bg-slate-50">Edit</button>
                  <button class="block w-full px-3 py-2 text-left hover:bg-slate-50">Move</button>
                  <button class="block w-full px-3 py-2 text-left hover:bg-slate-50">Copy</button>
                  <button class="block w-full px-3 py-2 text-left hover:bg-slate-50">Share</button>
                  <button class="block w-full px-3 py-2 text-left text-red-600 hover:bg-red-50">Delete</button>
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

const props = defineProps({
  rows: Array,
  selectedRows: Array,
});

const emit = defineEmits(["update:selectedRows"]);
const openMenu = ref(null);

// CLICK OUTSIDE CLOSE
const handleClickOutside = (event) => {
  if (
    !event.target.closest(".dropdown-menu") &&
    !event.target.closest(".menu-btn")
  ) {
    openMenu.value = null;
  }
};
onMounted(() => document.addEventListener("click", handleClickOutside));
onBeforeUnmount(() => document.removeEventListener("click", handleClickOutside));

// SELECT LOGIC
const isAllChecked = computed(
  () => props.rows.length > 0 && props.selectedRows.length === props.rows.length
);

const toggleAll = (e) => {
  const checked = e.target.checked;
  const newList = checked ? props.rows.map((r) => r.id) : [];
  emit("update:selectedRows", newList);
};

const toggleRow = (id) => {
  const list = [...props.selectedRows];
  if (list.includes(id)) {
    emit("update:selectedRows", list.filter((x) => x !== id));
  } else {
    emit("update:selectedRows", [...list, id]);
  }
};

// DROPDOWN
const toggleMenu = (id) => {
  openMenu.value = openMenu.value === id ? null : id;
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 120ms ease-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
