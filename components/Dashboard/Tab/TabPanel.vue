<template>
  <div
    class="mx-auto max-w-7xl px-4"
    v-if="userStore.user && ['editor', 'admin'].includes(userStore.user.role)"
  >
    <div class="du-tabs du-tabs-border">
      <div v-for="(title, index) in titles">
        <input
          type="radio"
          name="article-status"
          class="du-tab hover:text-primary du-tabs-border text-md font-semibold"
          :aria-label="title"
          :checked="index === selectedId"
          @click="emit('tabClicked', index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const emit = defineEmits<{ tabClicked: [title: number] }>()

defineProps<{
  titles: string[]
  selectedId: number
}>()
</script>
