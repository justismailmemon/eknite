<template>
  <form @submit.prevent="handleSubmit" class="space-y-5" novalidate>
    <Input
      v-model="form.name"
      label="Name"
      placeholder="John Doe"
      type="text"
      :error="errors.name"
    />

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

    <Button type="submit" :loading="loading">Sign Up</Button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import api from "@/api/axios.js";
import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import * as yup from "yup";
import { notify } from "@/utils/notify.js";

const router = useRouter();

// Form state
const form = ref({
  name: "",
  email: "",
  password: "",
});

const errors = ref({});
const loading = ref(false);

// Validation schema
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

// Validate input
const validate = async () => {
  try {
    await schema.validate(form.value, { abortEarly: false });
    errors.value = {};
    return true;
  } catch (err) {
    errors.value = {};
    err.inner?.forEach((e) => {
      errors.value[e.path] = e.message;
    });
    return false;
  }
};

// Handle submit
const handleSubmit = async () => {
  const isValid = await validate();
  if (!isValid) return;

  loading.value = true;

  try {
    // 1. REGISTER
    await api.post("/auth/register", form.value);

    notify("Registration successful!", "success");

    // 2. AUTO LOGIN
    const loginResponse = await api.post("/auth/login", {
      email: form.value.email,
      password: form.value.password,
    });

    const { token, user } = loginResponse.data;

    // Save token & username
    if (token) localStorage.setItem("token", token);
    if (user?.name) localStorage.setItem("username", user.name);

    notify("Logged in successfully!", "success");

    // 3. Redirect
    router.push("/workspace");
  } catch (error) {
    notify(
      error.response?.data?.message || "Something went wrong",
      "error"
    );
  } finally {
    loading.value = false;
  }
};
</script>
