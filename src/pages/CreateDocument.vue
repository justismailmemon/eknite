<template>
  <div class="h-screen flex flex-col bg-white">
    <!-- HEADER -->
    <header
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

      <div class="flex items-center gap-3">
        <!-- VIEW MODE TOGGLES -->
        <div class="hidden md:flex items-center gap-1.5">
          <!-- PREVIEW ONLY -->
          <button
            type="button"
            class="p-1.5 rounded-md border text-gray-500 hover:text-primary hover:border-primary transition flex items-center justify-center"
            :class="
              viewMode === 'preview'
                ? 'bg-primary/5 border-primary text-primary'
                : 'border-gray-200'
            "
            @click="setViewMode('preview')"
          >
            <Icon name="PanelRight" size="size-5" strokeWidth="1.5" />
          </button>

          <!-- SPLIT -->
          <button
            type="button"
            class="p-1.5 rounded-md border text-gray-500 hover:text-primary hover:border-primary transition flex items-center justify-center"
            :class="
              viewMode === 'split'
                ? 'bg-primary/5 border-primary text-primary'
                : 'border-gray-200'
            "
            @click="setViewMode('split')"
          >
            <Icon name="PanelsLeftRight" size="size-5" strokeWidth="1.5" />
          </button>

          <!-- EDIT ONLY -->
          <button
            type="button"
            class="p-1.5 rounded-md border text-gray-500 hover:text-primary hover:border-primary transition flex items-center justify-center"
            :class="
              viewMode === 'edit'
                ? 'bg-primary/5 border-primary text-primary'
                : 'border-gray-200'
            "
            @click="setViewMode('edit')"
          >
            <Icon name="PanelLeft" size="size-5" strokeWidth="1.5" />
          </button>
        </div>

        <Button type="submit" width="fit" :loading="loading" @click="onSubmit">
          {{ isEdit ? "Update" : "Save" }}
        </Button>
      </div>
    </header>

    <!-- BODY -->
    <div class="flex-1 overflow-y-auto px-6 py-4 mx-auto w-full">
      <div
        ref="splitContainer"
        class="flex flex-col md:flex-row gap-4 md:gap-0 overflow-hidden h-[calc(100vh-96px)]"
      >
        <!-- LEFT: FORM -->
        <div
          class="w-full md:w-auto md:h-full overflow-auto"
          :style="leftStyle"
        >
          <div class="space-y-6 pr-0 md:pr-6">
            <Input
              v-model="form.name"
              label="Name"
              placeholder="Enter document name"
              :error="errors.name"
            />

            <Textarea
              v-model="form.content"
              label="Content"
              placeholder="Enter document content (optional)"
            />
          </div>
        </div>

        <!-- DIVIDER (split mode only) -->
        <div
          v-if="viewMode === 'split'"
          class="hidden md:flex relative items-center justify-center w-6 cursor-col-resize select-none group"
          @mousedown="onDividerMouseDown"
        >
          <div
            class="w-[2px] h-full bg-gray-300 rounded-full group-hover:bg-primary transition-colors"
          ></div>
          <div class="absolute flex flex-col items-center justify-center gap-1">
            <span
              class="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-primary"
            ></span>
            <span
              class="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-primary"
            ></span>
            <span
              class="w-1.5 h-1.5 rounded-full bg-gray-400 group-hover:bg-primary"
            ></span>
          </div>
        </div>

        <!-- RIGHT: CHATBOT -->
        <div class="w-full md:w-auto md:h-full" :style="rightStyle">
          <ChatBot
            :workspace-id="workspaceIdComputed"
            :document-id="isEdit ? props.documentId : null"
            :chat-id="props.chatId"
            :content="form.content"
            @update:content="(val) => (form.content = val)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import Icon from "@/components/atoms/Icon.vue";
import Text from "@/components/atoms/Text.vue";
import Input from "@/components/atoms/Input.vue";
import Textarea from "@/components/atoms/Textarea.vue";
import Button from "@/components/atoms/ButtonBase.vue";
import ChatBot from "@/components/organisms/Chatbot.vue";
import api from "@/api/axios.js";
import * as yup from "yup";
import { notify } from "@/utils/notify.js";

const props = defineProps({
  type: { type: String, default: "create" }, // create | edit
  documentId: { type: String, default: "" },
  workspaceId: { type: String, required: true },
  chatId: { type: String, required: true }, // temp or real
});

const emit = defineEmits(["refresh"]);

const router = useRouter();
const route = useRoute();

const isEdit = computed(() => props.type === "edit");
const workspaceIdComputed = computed(
  () => props.workspaceId || String(route.params.id || "")
);

/* FORM STATE */
const form = ref({
  name: "",
  content: "",
});

const errors = ref({ name: "" });
const loading = ref(false);

/* VIEW MODES */
const viewMode = ref("split");
const splitContainer = ref(null);
const leftWidth = ref(50);
const isDragging = ref(false);
let startX = 0;
let startLeftWidth = 50;

const leftStyle = computed(() => {
  if (viewMode.value === "edit") {
    return { flexBasis: "100%", display: "block" };
  }
  if (viewMode.value === "preview") {
    return { flexBasis: "0%", display: "none" };
  }
  return { flexBasis: leftWidth.value + "%" };
});

const rightStyle = computed(() => {
  if (viewMode.value === "edit") {
    return { flexBasis: "0%", display: "none" };
  }
  if (viewMode.value === "preview") {
    return { flexBasis: "100%", display: "block" };
  }
  return { flexBasis: 100 - leftWidth.value + "%" };
});

const resetBodyStyles = () => {
  document.body.style.removeProperty("user-select");
  document.body.style.removeProperty("cursor");
};

const setViewMode = (mode) => {
  viewMode.value = mode;
  if (mode === "split") leftWidth.value = 50;
};

const onDividerMouseDown = (e) => {
  if (viewMode.value !== "split") return;
  e.preventDefault();
  isDragging.value = true;
  startX = e.clientX;
  startLeftWidth = leftWidth.value;

  document.body.style.userSelect = "none";
  document.body.style.cursor = "col-resize";

  window.addEventListener("mousemove", onDividerMouseMove);
  window.addEventListener("mouseup", onDividerMouseUp);
};

const onDividerMouseMove = (e) => {
  if (!isDragging.value || !splitContainer.value) return;
  const rect = splitContainer.value.getBoundingClientRect();
  const deltaX = e.clientX - startX;
  const containerWidth = rect.width || 1;
  const deltaPercent = (deltaX / containerWidth) * 100;
  let next = startLeftWidth + deltaPercent;
  next = Math.max(20, Math.min(80, next));
  leftWidth.value = next;
};

const onDividerMouseUp = () => {
  if (!isDragging.value) return;
  isDragging.value = false;
  resetBodyStyles();
  window.removeEventListener("mousemove", onDividerMouseMove);
  window.removeEventListener("mouseup", onDividerMouseUp);
};

onBeforeUnmount(() => {
  resetBodyStyles();
  window.removeEventListener("mousemove", onDividerMouseMove);
  window.removeEventListener("mouseup", onDividerMouseUp);
});

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
      `/workspace/${workspaceIdComputed.value}/documents/${props.documentId}`
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

onMounted(loadDocument);

/* SUBMIT HANDLER (CREATE + EDIT) */
const onSubmit = async () => {
  errors.value = { name: "" };

  try {
    await schema.validate(form.value, { abortEarly: false });
    loading.value = true;

    let res;

    if (isEdit.value) {
      // UPDATE
      res = await api.put(
        `/workspace/${workspaceIdComputed.value}/documents/${props.documentId}`,
        {
          title: form.value.name,
          content: form.value.content,
        }
      );
      notify("Document updated successfully");
      loading.value = false;

      emit("refresh");
      router.push(
        `/workspace/${workspaceIdComputed.value}/documents?id=${props.documentId}`
      );
      return;
    }

    // CREATE
    res = await api.post(`/workspace/${workspaceIdComputed.value}/documents`, {
      title: form.value.name,
      content: form.value.content || "",
    });

    const newId = res.data.results[0]._id;

    // attach the temp chat to this new document
    try {
      await api.post(
        `/ai-chat/${workspaceIdComputed.value}/document-ai-chat/attach-temp`,
        {
          temp_chat_id: props.chatId,
          document_id: newId,
        }
      );
    } catch (attachErr) {
      console.error("Attach-temp failed", attachErr);
    }

    notify("Document created successfully");
    loading.value = false;

    emit("refresh");
    router.push(
      `/workspace/${workspaceIdComputed.value}/documents?id=${newId}`
    );
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

/* BACK */
const goBack = () => {
  router.push(`/workspace/${workspaceIdComputed.value}/documents`);
};
</script>
