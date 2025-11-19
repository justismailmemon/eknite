<template>
  <DocumentTemplate
    :adminItems="adminItems"
    :workspaces="workspaces"
    @logout="handleLogout"
  />
</template>

<script setup>
import { useRouter } from "vue-router";
import DocumentTemplate from "@/components/templates/DocumentTemplate.vue";

const router = useRouter();

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
