<!-- \src\pages\Workspace.vue -->
<template>
  <div class="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
    <div class="max-w-5xl w-full bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl border border-white/20 p-10 text-white">
      <header class="mb-8 text-center">
        <h1 class="text-4xl font-bold mb-2">Welcome to Your Workspace</h1>
        <p class="text-sm opacity-90">Manage your projects, tasks, and teams all in one place.</p>
      </header>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Example workspace cards -->
        <div
          v-for="(item, index) in workspaces"
          :key="index"
          class="bg-white/20 p-6 rounded-xl hover:bg-white/30 transition shadow-lg cursor-pointer"
        >
          <h2 class="text-xl font-semibold mb-2">{{ item.title }}</h2>
          <p class="text-sm opacity-80">{{ item.description }}</p>
        </div>
      </div>

      <div class="text-center mt-10">
        <button
          class="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-md hover:bg-gray-100 transition"
        >
          + Create New Workspace
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const workspaces = ref([
  { title: "Design System", description: "Atomic design components and UI setup." },
  { title: "Frontend App", description: "Vue + Tailwind + API integration project." },
  { title: "Backend API", description: "Node.js + MongoDB services for your app." },
]);
</script>
