<template>
  <div class="h-screen flex flex-col bg-white">
    <!-- HEADER BAR -->
    <div
      class="w-full px-6 py-2 border-b flex items-center justify-between bg-white sticky top-0 z-10"
    >
      <div class="flex items-center gap-2">
        <Icon name="ArrowLeft" size="size-7" strokeWidth="1.5" class="cursor-pointer" @click="goToWorkspace" />
        <Text size="text-xl" weight="font-medium">Create Workspace</Text>
      </div>

      <Button type="submit" @click="onSubmit" width="fit" :loading="loading">
        Save
      </Button>
    </div>

    <!-- BODY -->
    <div class="flex-1 overflow-y-auto px-6 py-4 mx-auto w-full">
      <div class="space-y-6">
        <!-- Name Field -->
        <Input
          v-model="form.name"
          label="Name"
          placeholder="Enter workspace name"
          type="text"
          :error="errors.name"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import api from "@/api/axios.js";
import Icon from "@/components/atoms/Icon.vue";
import * as yup from "yup";
import Text from "@/components/atoms/Text.vue";
import Input from "@/components/atoms/Input.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import { notify } from "@/utils/notify.js";

// Router
  const router = useRouter();
  const route = useRoute();

// Initial form
const form = ref({
  name: "",
});

const loading = ref(false);
const errors = ref({ name: "" });

// Validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
});

// Submit handler
const onSubmit = async () => {
  errors.value = { name: "" };

  try {
    await schema.validate(form.value, { abortEarly: false });

    loading.value = true;

    // Use custom axios instance
    const res = await api.post("/workspace", {
      name: form.value.name,
    });

    loading.value = false;

    // Show backend message
    notify(res.data.message || "Workspace created successfully");

    // Redirect to new workspace
    const newId = res.data.results[0]._id;
    router.push(`/workspace/${newId}/documents`);

    // Reset form
    form.value.name = "";
  } catch (err) {
    loading.value = false;

    // Backend error
    if (err.response?.data) {
      notify(err.response.data.message || "Something went wrong");
    }

    // Validation errors
    if (err.inner) {
      err.inner.forEach((e) => {
        errors.value[e.path] = e.message;
      });
    }
  }
};

const goToWorkspace = () => {
  router.push({ name: "Workspace" });
};
</script>
