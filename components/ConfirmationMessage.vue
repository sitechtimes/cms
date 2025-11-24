<template>
  <div
    v-if="message"
    class="fixed inset-x-0 z-99 mx-3 w-auto rounded-lg transition-opacity xl:mx-auto xl:max-w-7xl"
    :style="{
      opacity: progress < 0.6 ? 1 : (1 - progress) * 2.5,
    }"
  >
    <div class="flex items-center justify-between p-4">
      <p class="flex items-center">
        <Icon class="m-2" :name="icon" /> {{ message }}
      </p>
      <div
        class="order-none flex aspect-square w-10 items-center justify-center rounded-full align-middle hover:bg-gray-100/50"
      >
        <Icon
          class="m-auto"
          name="heroicons:x-mark-16-solid"
          @click="emit('close')"
        />
      </div>
    </div>
    <progress
      class="du-progress block w-full rounded-t-none rounded-b-lg"
      :value="progress * 100"
      max="100"
    ></progress>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits<{
  close: []
}>()

defineProps<{
  icon: string
  message: string
  progress: number
}>()

console.log('im running')
</script>
