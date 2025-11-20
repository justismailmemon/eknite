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
import api from "@/api/axios.js";
import WorkspaceTemplate from "@/components/templates/WorkspaceTemplate.vue";

const router = useRouter();

const adminItems = ref([
  { label: "Settings", icon: "Settings" },
  { label: "Security", icon: "ShieldCheck" },
  { label: "Billing", icon: "CreditCard" },
  { label: "Apps", icon: "AppWindow" },
  { label: "Documents", icon: "FileText" },
]);

const workspaces = ref([]);

const fetchWorkspaces = async () => {
  try {
    const res = await api.get("/workspace");
    if (res.data.success) workspaces.value = res.data.results;
  } catch (error) {
    console.log("Error loading workspaces:", error);
  }
};

onMounted(fetchWorkspaces);

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
