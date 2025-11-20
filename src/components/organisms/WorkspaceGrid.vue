<template>
  <div class="grid grid-cols-4 gap-4">
    <WorkspaceCard
      v-for="(item, index) in workspaces"
      :key="index"
      :name="item.name"
      @click="openWorkspace(item._id)"
    />
  </div>
</template>

<script setup>
import { useRouter } from "vue-router"
import WorkspaceCard from "@/components/molecules/WorkspaceCard.vue"

const router = useRouter()

defineProps({
  workspaces: Array,
})

const openWorkspace = (id) => {
  router.push(`/workspace/${id}/documents`)
}
</script>
