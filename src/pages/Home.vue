<!-- \src\pages\Home.vue -->
<template>
  <div class="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 text-white px-6">
    <!-- Hero Section -->
    <div class="max-w-3xl text-center space-y-6">
      <h1 class="text-5xl font-extrabold drop-shadow-lg">
        Welcome to <span class="text-yellow-300">Eknite</span>
      </h1>
      <p class="text-lg opacity-90 leading-relaxed">
        A modern workspace to manage your projects, collaborate with your team, and grow your ideas.
      </p>

      <!-- Buttons -->
      <div class="flex flex-wrap justify-center gap-4 mt-8">
        <RouterLink
          to="/register"
          class="px-8 py-3 bg-white text-indigo-600 font-semibold rounded-full shadow-md hover:bg-gray-100 transition"
        >
          Get Started
        </RouterLink>

        <RouterLink
          to="/workspace"
          class="px-8 py-3 bg-transparent border border-white/70 rounded-full hover:bg-white/20 transition"
        >
          Go to Workspace
        </RouterLink>
      </div>
    </div>

    <!-- Footer -->
    <footer class="mt-16 text-sm opacity-80">
      © 2025 Eknite. All rights reserved.
    </footer>
  </div>
</template>

<script setup>
</script>
