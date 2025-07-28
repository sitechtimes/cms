<template>
  <div>
    <button
      @click="onTabClick"
      :class="
        isActive
          ? 'border-blue-500 text-blue-600'
          : 'border-gray-300 text-gray-500 hover:text-gray-700'
      "
      class="cursor-pointer border-b-2 px-6 py-3 text-sm font-bold text-gray-500 focus:outline-none"
    >
      {{ props.title }}
    </button>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  id: number
  title: string
  isActive: boolean
}>()

const emit = defineEmits<{ tabClicked: [id: number] }>()

const onTabClick = () => {
  emit('tabClicked', props.id)
}
</script>

<style scoped></style>
