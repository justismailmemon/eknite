<template>
  <WorkspaceTemplate
    :adminItems="adminItems"
    :workspaces="workspaces"
    @logout="handleLogout"
  />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios"; // your axios baseURL file
import WorkspaceTemplate from "@/components/templates/WorkspaceTemplate.vue";

const router = useRouter();

const adminItems = ref([
  { label: "Settings", active: true },
  { label: "Security", active: false },
  { label: "Billing & Invoices", active: false },
  { label: "Apps", active: false },
  { label: "Terms and Conditions", active: false },
]);

// Workspace Cards Data
const workspaces = ref([]);

// GET API CALL
const fetchWorkspaces = async () => {
  try {
    const res = await axios.get("http://localhost:5000/api/workspace");

    if (res.data.success) {
      workspaces.value = res.data.results; // store data
    }
  } catch (error) {
    console.log("Error loading workspaces:", error);
  }
};

// Auto load on page open
onMounted(() => {
  fetchWorkspaces();
});

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
