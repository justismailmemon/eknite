<!-- \src\components\molecules\LoginForm.vue -->
<template>
  <form @submit.prevent="onSubmit" class="space-y-5">
    <Input v-model="email" label="Email" placeholder="you@example.com" type="email" />
    <Input v-model="password" label="Password" placeholder="********" type="password" />

    <div class="flex items-center justify-between text-sm">
      <Checkbox v-model="rememberMe">Remember me</Checkbox>
      <Link href="#">Forgot password?</Link>
    </div>

    <Button type="submit">Sign In</Button>
  </form>
</template>

<script setup>
import Input from '../atoms/Input.vue'
import Button from '../atoms/Button.vue'
import Checkbox from '../atoms/Checkbox.vue'
import Link from '../atoms/Link.vue'
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)

function onSubmit() {
  console.log({ email: email.value, password: password.value, rememberMe: rememberMe.value })
  alert(`Logged in as ${email.value}`)
}
</script>
