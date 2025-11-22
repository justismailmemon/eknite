<template>
  <div class="h-full flex flex-col bg-white">
    <!-- HEADER -->
    <ChatHeader :isBotTyping="isBotTyping" />

    <!-- BODY -->
    <div class="flex-1 px-6 py-4 bg-slate-50">
      <div
        class="h-full rounded-2xl border border-slate-200 bg-white shadow-sm flex flex-col overflow-hidden"
      >
        <!-- MESSAGES -->
        <div class="h-[calc(100vh-250px)] overflow-hidden flex flex-col">
          <ChatMessages
            ref="messagesRef"
            :messages="messages"
            :isBotTyping="isBotTyping"
            @edit="openEditModal"
            @delete="openDeleteModal"
            @copy="copyBotText"
            @insert="applyBotAction('insert', $event)"
            @prepend="applyBotAction('prepend', $event)"
            @append="applyBotAction('append', $event)"
            @overwrite="applyBotAction('overwrite', $event)"
          />
        </div>

        <!-- INPUT -->
        <ChatInput
          v-model="userInput"
          :sending="sending"
          @send="sendMessage"
        />
      </div>
    </div>

    <!-- EDIT MODAL -->
    <EditMessageModal
      v-model="showEditModal"
      :text="editText"
      title="Edit your message"
      label="Message"
      @save="confirmEdit"
    />

    <!-- DELETE MODAL -->
    <ConfirmModal
      v-model="showDeleteModal"
      title="Delete message?"
      message="This will remove this message and its paired reply (if any)."
      confirmLabel="Delete"
      cancelLabel="Cancel"
      @confirm="confirmDelete"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import api from "@/api/axios.js";

import ChatHeader from "@/components/molecules/ChatHeader.vue";
import ChatMessages from "@/components/molecules/ChatMessages.vue";
import ChatInput from "@/components/molecules/ChatInput.vue";
import ConfirmModal from "@/components/molecules/ConfirmModal.vue";
import EditMessageModal from "@/components/molecules/EditMessageModal.vue";

/** PROPS */
const props = defineProps({
  workspaceId: {
    type: String,
    default: "",
  },
  documentId: {
    type: [String, null],
    default: null,
  },
  chatId: {
    type: String,
    default: "",
  },
  // document content
  content: {
    type: String,
    default: "",
  },
});

/** EMITS */
const emit = defineEmits(["update:content"]);

const route = useRoute();

/** ROUTE FALLBACKS */
const routeWorkspaceId = computed(() => route.params.id || "");
const routeDocumentId = computed(() => {
  const q = route.query.id;
  return q && q !== "create-new-document" ? String(q) : null;
});

/** FINAL workspaceId & documentId */
const workspaceId = computed(
  () => props.workspaceId || routeWorkspaceId.value
);

const documentId = computed(() => {
  if (props.documentId) return String(props.documentId);
  return routeDocumentId.value;
});

/** temp chat id while document not created */
const tempChatId = ref(`temp-${Date.now()}`);

/** actual chat_id we send to backend */
const chatId = computed(() => {
  return props.chatId || documentId.value || tempChatId.value;
});

/** STATE */
const messages = ref([]);
const userInput = ref("");
const isBotTyping = ref(false);
const sending = ref(false);

/** REFS */
const messagesRef = ref(null);

/** MODALS */
const showEditModal = ref(false);
const showDeleteModal = ref(false);
const editingMessage = ref(null);
const deletingMessage = ref(null);
const editText = ref("");

/** SCROLL */
const scrollToBottom = async () => {
  await nextTick();
  if (messagesRef.value?.scrollToBottom) {
    messagesRef.value.scrollToBottom();
  }
};

/** LOAD HISTORY (only if documentId exists) */
onMounted(loadHistory);

async function loadHistory() {
  if (!documentId.value) {
    messages.value = [];
    return;
  }

  try {
    const { data } = await api.get(
      `/ai-chat/${workspaceId.value}/document-ai-chat`,
      {
        params: { document_id: documentId.value },
        skipProgress: true,
      }
    );

    messages.value = data.messages || [];
    await scrollToBottom();
  } catch (err) {
    console.error("Load history error", err);
  }
}

/** SEND MESSAGE */
const sendMessage = async () => {
  const text = userInput.value.trim();
  if (!text) return;
  if (sending.value) return;

  const tempId = Date.now();

  const tempUserMsg = {
    tempId,
    sender: "user",
    text,
  };
  messages.value.push(tempUserMsg);
  await scrollToBottom();

  userInput.value = "";
  isBotTyping.value = true;
  sending.value = true;

  try {
    const { data } = await api.post(
      `/ai-chat/${workspaceId.value}/document-ai-chat`,
      { text },
      {
        params: { document_id: chatId.value },
        skipProgress: true,
      }
    );

    // remove temp
    messages.value = messages.value.filter((m) => m.tempId !== tempId);

    messages.value.push(data.userMessage);
    messages.value.push(data.botMessage);
  } catch (err) {
    console.error("send error", err);
  } finally {
    isBotTyping.value = false;
    sending.value = false;
    await scrollToBottom();
  }
};

/** APPLY BOT TEXT TO DOCUMENT CONTENT TEXTAREA */
const applyBotAction = (mode, msg) => {
  const botText = (msg && msg.text) || "";
  const current = props.content || "";
  let next = current;
  const sep = current ? "\n\n" : "";

  switch (mode) {
    case "insert":
    case "append":
      next = current + sep + botText;
      break;
    case "prepend":
      next = botText + (current ? "\n\n" + current : "");
      break;
    case "overwrite":
      next = botText;
      break;
    default:
      return;
  }

  emit("update:content", next);
};

/** EDIT FLOW */
function openEditModal(msg) {
  if (!msg._id) return;
  editingMessage.value = msg;
  editText.value = msg.text;
  showEditModal.value = true;
}

async function confirmEdit(newText) {
  const msg = editingMessage.value;
  if (!msg || !msg._id) return;

  try {
    await api.put(
      `/ai-chat/${workspaceId.value}/document-ai-chat/${msg._id}`,
      { text: newText },
      { params: { document_id: chatId.value }, skipProgress: true }
    );
    msg.text = newText;
  } catch (err) {
    console.error("Edit error", err);
  } finally {
    editingMessage.value = null;
  }
}

/** DELETE FLOW */
function openDeleteModal(msg) {
  deletingMessage.value = msg;
  showDeleteModal.value = true;
}

async function confirmDelete() {
  const msg = deletingMessage.value;
  if (!msg) return;

  // local temp (not saved yet)
  if (!msg._id) {
    messages.value = messages.value.filter(
      (m) => m._id !== msg._id && m.tempId !== msg.tempId
    );
    deletingMessage.value = null;
    return;
  }

  try {
    const { data } = await api.delete(
      `/ai-chat/${workspaceId.value}/document-ai-chat/${msg._id}`,
      { params: { document_id: chatId.value }, skipProgress: true }
    );

    // Remove this message
    messages.value = messages.value.filter((m) => m._id !== msg._id);

    // Remove paired messages from backend response
    if (data.deletedBot) {
      messages.value = messages.value.filter((m) => m._id !== data.deletedBot);
    }
    if (data.deletedUser) {
      messages.value = messages.value.filter((m) => m._id !== data.deletedUser);
    }
  } catch (err) {
    console.error("Delete error", err);
  } finally {
    deletingMessage.value = null;
  }
}

/** COPY BOT TEXT */
async function copyBotText(msg) {
  try {
    await navigator.clipboard.writeText(msg.text || "");
  } catch (e) {
    console.error("Clipboard error", e);
  }
}
</script>
