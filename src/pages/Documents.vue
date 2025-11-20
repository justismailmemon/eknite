<template>
  <DocumentTemplate
    :adminItems="adminItems"
    @logout="handleLogout"
  />
</template>

<script setup>
import { useRouter } from "vue-router";
import DocumentTemplate from "@/components/templates/DocumentTemplate.vue";

const router = useRouter();

const adminItems = [
  { label: "Settings", icon: "Settings" },
  { label: "Security", icon: "ShieldCheck" },
  { label: "Billing", icon: "CreditCard" },
  { label: "Apps", icon: "AppWindow" },
  { label: "Documents", icon: "FileText" },
];

const handleLogout = () => {
  localStorage.removeItem("token");
  router.push("/login");
};
</script>
