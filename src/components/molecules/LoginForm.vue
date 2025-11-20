<template>
  <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
    <Input
      v-model="form.email"
      label="Email"
      placeholder="you@example.com"
      type="email"
      :error="errors.email"
    />

    <Input
      v-model="form.password"
      label="Password"
      placeholder="********"
      type="password"
      :error="errors.password"
    />

    <div class="flex items-center justify-end">
      <a href="#forgot-password" class="underline">
        <Text color="primary">Forgot password?</Text>
      </a>
    </div>

    <Button type="submit" :loading="loading">Sign In</Button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/axios.js";       // ✅ use custom axios instance
import Input from "@/components/atoms/Input.vue";
import Text from "@/components/atoms/Text.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import * as yup from "yup";
import { notify } from "@/utils/notify.js";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});

const errors = ref({});
const loading = ref(false);

// Validation schema
const schema = yup.object().shape({
  email: yup.string().email("Enter a valid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Validate input fields
const validate = async () => {
  try {
    await schema.validate(form.value, { abortEarly: false });
    errors.value = {};
    return true;
  } catch (err) {
    errors.value = {};
    if (err.inner) {
      err.inner.forEach((e) => {
        errors.value[e.path] = e.message;
      });
    }
    return false;
  }
};

// Submit login form
const handleSubmit = async () => {
  const isValid = await validate();
  if (!isValid) return;

  loading.value = true;

  try {
    const { data } = await api.post("/auth/login", {
      email: form.value.email,
      password: form.value.password,
    });

    notify(data.message || "Logged in successfully", "success");

    // Save token & username
    localStorage.setItem("token", data.token);
    localStorage.setItem("username", data.user.name);

    // Redirect
    router.push({ name: "Workspace" });
  } catch (error) {
    notify(error.response?.data?.message || "Login failed", "error");
  } finally {
    loading.value = false;
  }
};
</script>
