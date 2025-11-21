<!-- \src\components\organisms\Register.vue -->
<template>
  <div class="w-full max-w-[500px] p-8 space-y-6 bg-white rounded-xl shadow-lg">
    <Text tag="h2" size="text-2xl" weight="font-bold" color="text-gray-800"
      >Sign up to your account</Text
    >
    <RegisterForm />

  <div class="flex items-center justify-center space-x-2">
      <Text>Already have an account? </Text>
      <a href="/login">
        <Text color="text-primary" weight="font-semibold" underline>Sign In</Text>
      </a>
    </div>
   
  </div>
</template>

<script setup>
import Text from "@/components/atoms/Text.vue";
import RegisterForm from "@/components/molecules/RegisterForm.vue";
</script>
