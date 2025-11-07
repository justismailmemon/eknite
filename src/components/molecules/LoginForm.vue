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

    <div class="flex items-center justify-between text-sm">
      <Checkbox v-model="form.rememberMe">Remember me</Checkbox>
      <Link href="#">Forgot password?</Link>
    </div>

    <Button type="submit" :loading="loading">Sign In</Button>
  </form>
</template>

<script>
import Input from "../atoms/Input.vue";
import Button from "../atoms/Button.vue";
import Checkbox from "../atoms/Checkbox.vue";
import Link from "../atoms/Link.vue";
import axios from "axios";
import { notify } from "../../utils/notify.js";
import * as yup from "yup";

export default {
  components: { Input, Button, Checkbox, Link },

  data() {
    return {
      form: {
        email: "",
        password: "",
        rememberMe: false,
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
        const response = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: this.form.email,
            password: this.form.password,
          }
        );

        notify(response.data.message, "success");

        if (this.form.rememberMe) {
          localStorage.setItem("token", response.data.token);
        }
      } catch (error) {
        notify(error.response?.data?.message || "Login failed", "error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
