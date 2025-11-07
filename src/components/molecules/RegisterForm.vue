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
import Input from "../atoms/Input.vue";
import Button from "../atoms/Button.vue";
import axios from "axios";
import { notify } from "../../utils/notify.js";
import * as yup from "yup";

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
        const response = await axios.post(
          "http://localhost:5000/api/auth/register",
          this.form
        );
        notify(response.data.message, "success");
      } catch (error) {
        notify(error.response?.data?.message || "Registration failed", "error");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
