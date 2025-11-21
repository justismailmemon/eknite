<template>
  <div class="h-screen flex flex-col bg-white">
    <!-- HEADER -->
    <div
      class="w-full px-6 py-2 border-b flex items-center justify-between bg-white sticky top-0 z-10"
    >
      <div class="flex items-center gap-2">
        <Icon
          name="ArrowLeft"
          size="size-7"
          strokeWidth="1.5"
          class="cursor-pointer"
          @click="goBack"
        />
        <Text size="text-xl" weight="font-medium">
          {{ isEdit ? "Edit Document" : "Create Document" }}
        </Text>
      </div>

      <Button type="submit" width="fit" :loading="loading" @click="onSubmit">
        {{ isEdit ? "Update" : "Save" }}
      </Button>
    </div>

    <!-- BODY -->
    <div class="flex-1 overflow-y-auto px-6 py-4 mx-auto w-full">
      <div class="space-y-6">
        <!-- NAME -->
        <Input
          v-model="form.name"
          label="Name"
          placeholder="Enter document name"
          :error="errors.name"
        />

        <!-- CONTENT -->
        <Textarea
          v-model="form.content"
          label="Content"
          placeholder="Enter document content (optional)"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
/* IMPORTS */
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import Icon from "@/components/atoms/Icon.vue";
import Text from "@/components/atoms/Text.vue";
import Input from "@/components/atoms/Input.vue";
import Textarea from "@/components/atoms/Textarea.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import api from "@/api/axios.js";
import * as yup from "yup";
import { notify } from "@/utils/notify.js";

/* PROPS */
const props = defineProps({
  type: { type: String, default: "create" }, 
  documentId: { type: String, default: "" },
});

const emit = defineEmits(["refresh"]);


/* ROUTER */
const router = useRouter();
const route = useRoute();

/* STATE */
const isEdit = computed(() => props.type === "edit");

const form = ref({
  name: "",
  content: "",
});

const errors = ref({ name: "" });
const loading = ref(false);

/* VALIDATION */
const schema = yup.object({
  name: yup.string().required("Name is required"),
});

/* LOAD EXISTING DOCUMENT IN EDIT MODE */
const loadDocument = async () => {
  if (!isEdit.value || !props.documentId) return;

  try {
    loading.value = true;
    const res = await api.get(
      `/workspace/${route.params.id}/documents/${props.documentId}`
    );
    const doc = res.data.results;

    form.value.name = doc.title;
    form.value.content = doc.content || "";

    loading.value = false;
  } catch (err) {
    loading.value = false;
    notify("Failed to load document");
  }
};

onMounted(() => {
  loadDocument();
});

/* SUBMIT HANDLER (CREATE + EDIT) */
const onSubmit = async () => {
  errors.value = { name: "" };

  try {
    await schema.validate(form.value, { abortEarly: false });
    loading.value = true;

    let res;

    if (isEdit.value) {
      // UPDATE DOCUMENT
      res = await api.put(
        `/workspace/${route.params.id}/documents/${props.documentId}`,
        {
          title: form.value.name,
          content: form.value.content,
        }
      );
      notify("Document updated successfully");
    } else {
      // CREATE DOCUMENT
      res = await api.post(`/workspace/${route.params.id}/documents`, {
        title: form.value.name,
        content: form.value.content || "",
      });
      notify("Document created successfully");
    }

    loading.value = false;

    const docId = isEdit.value ? props.documentId : res.data.results[0]._id;

    router.push(`/workspace/${route.params.id}/documents`);
    emit("refresh");

  } catch (err) {
    loading.value = false;

    if (err.response?.data) {
      notify(err.response.data.message || "Something went wrong");
    }

    if (err.inner) {
      err.inner.forEach((e) => (errors.value[e.path] = e.message));
    }
  }
};

/* BACK CLICK */
const goBack = () => {
  router.push(`/workspace/${route.params.id}/documents`);
};
</script>
