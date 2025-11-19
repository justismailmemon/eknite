<!-- \src\components\organisms\LoginCard.vue -->
<template>
  <div class="w-full max-w-[500px] p-8 space-y-6 bg-white rounded-xl shadow-lg">
    <Text tag="h2" size="text-2xl" weight="font-bold" color="text-gray-800"
      >Sign in to your account</Text
    >
    <LoginForm />

    <div class="flex items-center justify-center space-x-2">
      <Text> Don't have an account? </Text>
      <a href="/register" class="underline">
        <Text color="text-primary" weight="font-semibold">Sign Up</Text>
      </a>
    </div>
  </div>
</template>

<script setup>
import Text from "@/components/atoms/Text.vue";
import LoginForm from "@/components/molecules/LoginForm.vue";
</script>
