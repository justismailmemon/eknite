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
        <Text color="primary">Forgot password?</Text></a
      >
    </div>

    <Button type="submit" :loading="loading">Sign In</Button>
  </form>
</template>

<script>
import Input from "@/components/atoms/Input.vue";
import Text from "@/components/atoms/Text.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import axios from "axios";
import { notify } from "@/utils/notify.js";
import * as yup from "yup";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default {
  components: { Input, Button, Text },

  data() {
    return {
      form: {
        email: "",
        password: "",
      },
      errors: {},
      loading: false,
    };
  },

  methods: {
    async validate() {
      const schema = yup.object().shape({
        email: yup
          .string()
          .email("Enter a valid email")
          .required("Email is required"),
        password: yup
          .string()
          .min(6, "Password must be at least 6 characters")
          .required("Password is required"),
      });

      try {
        await schema.validate(this.form, { abortEarly: false });
        this.errors = {};
        return true;
      } catch (err) {
        this.errors = {};
        if (err.inner) {
          err.inner.forEach((e) => {
            this.errors[e.path] = e.message;
          });
        }
        return false;
      }
    },

    async handleSubmit() {
      const isValid = await this.validate();
      if (!isValid) return;

      this.loading = true;

      try {
        const { data } = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: this.form.email,
          password: this.form.password,
        });

        notify(data.message, "success");

        // ✅ Save token
        localStorage.setItem("token", data.token);

        // ✅ Save username
        localStorage.setItem("username", data.user.name);

        // Redirect
        this.$router.push({ name: "Workspace" });
      } catch (error) {
        notify(error.response?.data?.message || "Login failed", "error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
