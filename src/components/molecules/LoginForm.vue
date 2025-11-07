<template>
  <form @submit.prevent="onSubmit" class="space-y-5">
    <Input
      v-model="email"
      label="Email"
      placeholder="you@example.com"
      type="email"
    />
    <Input
      v-model="password"
      label="Password"
      placeholder="********"
      type="password"
    />

    <div class="flex items-center justify-between text-sm">
      <Checkbox v-model="rememberMe">Remember me</Checkbox>
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

export default {
  components: { Input, Button, Checkbox, Link },

  data() {
    return {
      email: "",
      password: "",
      rememberMe: false,
      loading: false, 
    };
  },

  methods: {
    async onSubmit() {
      this.loading = true;
      try {
        const response = await axios.post("http://localhost:5000/api/auth/login", {
          email: this.email,
          password: this.password,
        });

        notify(response.data.message, "success");

        if (this.rememberMe) {
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