<template>
  <DocumentTemplate
    :adminItems="adminItems"
    :workspaces="workspaces"
    :documents="documents"
    :currentWorkspace="currentWorkspace"
    :loading="loadingWorkspaces"
    @filters="applyFilters"
    @refresh="fetchAll"
    @deleted="removeDocument"
    @logout="handleLogout"
  />
</template>

<script setup>
import { ref, onMounted, computed, watch } from "vue";
import { useRouter, useRoute } from "vue-router";
import api from "@/api/axios.js";
import DocumentTemplate from "@/components/templates/DocumentTemplate.vue";

const router = useRouter();
const route = useRoute();

// Sidebar items
const adminItems = ref([
  { label: "Settings", icon: "Settings" },
  { label: "Security", icon: "ShieldCheck" },
  { label: "Billing", icon: "CreditCard" },
  { label: "Apps", icon: "AppWindow" },
  { label: "Documents", icon: "FileText" },
]);

// DATA
const workspaces = ref([]);
const documents = ref([]);
const loadingWorkspaces = ref(false);

const workspaceId = computed(() => route.params.id);

// API FILTERS (connected to Tabs)
const filters = ref({
  searchText: "",
  sort: "last_modified",
});

const currentWorkspace = computed(
  () =>
    workspaces.value.find((w) => String(w._id) === String(workspaceId.value)) ||
    null
);

// FETCH ALL
async function fetchAll() {
  loadingWorkspaces.value = true;

  try {
    const params = {
      page: 1,
      limit: 50,
      searchText: filters.value.searchText,
      sort: filters.value.sort,
    };

    const [wsRes, docsRes] = await Promise.all([
      api.get("/workspace"),
      api.get(`/workspace/${workspaceId.value}/documents`, { params }),
    ]);

    if (wsRes.data?.success) workspaces.value = wsRes.data.results;
    if (docsRes.data?.success) documents.value = docsRes.data.results;
  } catch (err) {
    console.error("Error loading documents:", err);
  }

  loadingWorkspaces.value = false;
}

// UPDATE FILTERS FROM TEMPLATE
const applyFilters = (f) => {
  filters.value = f;
  fetchAll();
};

// REMOVE DOC LOCALLY
const removeDocument = (id) => {
  documents.value = documents.value.filter((d) => d._id !== id);
};

onMounted(fetchAll);

// Reload if workspace changes
watch(workspaceId, () => fetchAll());

function handleLogout() {
  localStorage.removeItem("token");
  router.push("/login");
}
</script>
