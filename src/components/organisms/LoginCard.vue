<!-- \src\components\organisms\LoginCard.vue -->
<template>
  <div class="w-full max-w-[500px] p-8 space-y-6 bg-white rounded-xl shadow-lg">
    <Text tag="h2" size="3xl" weight="bold" color="gray-800"
      >Sign in to your account</Text
    >
    <LoginForm />

    <div class="flex items-center justify-center gap-2 text-gray-400">
      <Text class="border-b w-1/5"></Text>
      <Text>or continue with</Text>
      <Text class="border-b w-1/5"></Text>
    </div>

    <div class="flex gap-4 justify-center">
      <Button variant="outline" icon="IconBrandGoogle">Google</Button>
      <Button variant="outline" icon="IconBrandGithub">GitHub</Button>
    </div>

    <Text class="text-center text-sm text-gray-500">
      Don't have an account? <Link href="/register">Sign Up</Link>
    </Text>
  </div>
</template>

<script setup>
import Text from "@/components/atoms/Text.vue";
import Link from "@/components/atoms/Link.vue";
import Button from "@/components/molecules/ButtonIcon.vue";
import LoginForm from "@/components/molecules/LoginForm.vue";
</script>
