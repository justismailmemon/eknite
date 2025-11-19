<!-- src/pages/Login.vue -->
<template>
  <AuthTemplate>
    <LoginCard />
  </AuthTemplate>
</template>

<script setup>
import AuthTemplate from '@/components/templates/AuthTemplate.vue'
import LoginCard from '@/components/organisms/LoginCard.vue'
</script>