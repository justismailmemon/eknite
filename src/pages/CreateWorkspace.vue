<template>
  <div class="h-screen flex flex-col bg-white">
    <!-- HEADER BAR -->
    <div
      class="w-full px-8 py-3 border-b flex items-center justify-between bg-white sticky top-0 z-10"
    >
      <h1 class="text-2xl font-bold text-gray-900">Create Workspace</h1>

      <Button type="submit" @click="onSubmit" width="fit" :loading="loading">
        Save
      </Button>
    </div>

    <!-- EDITOR BODY -->
    <div class="flex-1 overflow-y-auto px-8 py-6 mx-auto w-full">
      <div class="space-y-6">
        <!-- Name -->
        <Input
          v-model="form.name"
          label="Name"
          placeholder="Enter document name"
          type="text"
          :error="errors.name"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import * as yup from "yup";

import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/ButtonBase.vue";

// Get workspace ID
const route = useRoute();
const workspaceId = route.params.id;

// Form state
const form = ref({
  name: "",
});

const loading = ref(false);
const errors = ref({ name: "" });

// Yup validation
const schema = yup.object({
  name: yup.string().required("Name is required"),
});

// Submit handler
const onSubmit = async () => {
  errors.value = { name: "" };

  try {
    await schema.validate(form.value, { abortEarly: false });

    loading.value = true;

    await axios.post("http://localhost:5000/api/workspace", {
      name: form.value.name,
      workspaceId, // optional if needed
    });

    loading.value = false;
    alert("Document saved successfully!");

    // reset form
    form.value.name = "";
  } catch (err) {
    loading.value = false;

    if (err.inner) {
      err.inner.forEach((e) => {
        errors.value[e.path] = e.message;
      });
    }
  }
};
</script>
