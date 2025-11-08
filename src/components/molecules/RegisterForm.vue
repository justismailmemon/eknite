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

<script>
import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import axios from "axios";
import { notify } from "@/utils/notify.js";
import * as yup from "yup";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export default {
  components: { Input, Button },

  data() {
    return {
      form: {
        name: "",
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
        } else if (err.path) {
          this.errors[err.path] = err.message;
        }
        return false;
      }
    },

    async handleSubmit() {
      const isValid = await this.validate();
      if (!isValid) return;

      this.loading = true;
      try {
        // 1. Register user
        await axios.post(`${API_BASE_URL}/auth/register`, this.form);

        notify("Registration successful!", "success");

        // 2. Auto-login
        const loginResponse = await axios.post(`${API_BASE_URL}/auth/login`, {
          email: this.form.email,
          password: this.form.password,
        });

        const token = loginResponse.data.token;
        if (token) {
          localStorage.setItem("token", token); // save token for authenticated requests
        }

        notify("Logged in successfully!", "success");

        // 3. Redirect (example using Vue Router)
        this.$router.push("/workspace");
      } catch (error) {
        notify(
          error.response?.data?.message || "Something went wrong",
          "error"
        );
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
