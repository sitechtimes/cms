<template>
  <div
    class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    v-if="userStore.user && ['editor', 'admin'].includes(userStore.user.role)"
  >
    <div class="du-tabs du-tabs-border">
      <div v-for="(title, index) in titles">
        <input
          type="radio"
          name="my_tabs_2"
          class="du-tab"
          :aria-label="title"
          :checked="index === selectedId"
          @click="emit('tabClicked', index)"
        />
        <div
          class="du-tab-content cursor-pointer border-b-2 px-6 py-3 text-sm font-bold text-gray-500 focus:outline-none"
        >
          {{ title }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const userStore = useUserStore()
const emit = defineEmits<{ tabClicked: [title: number] }>()

const props = defineProps<{
  titles: string[]
  selectedId: number
}>()
</script>
