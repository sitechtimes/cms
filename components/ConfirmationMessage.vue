<template>
  <div
    v-if="message"
    :class="['z-99', 'fixed', 'w-7xl', 'rounded-lg', bgColorClass]"
  >
    <div class="justify-content p-4">
      <p><Icon :name="icon" /> {{ message }}</p>
      <button @click="startMessage">fre</button>
    </div>
    <progress
      class="du-progress w-full"
      :value="progress * 20"
      max="100"
    ></progress>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  icon: string
  message: string
  color: 'red' | 'green'
}>()

const progress = ref(0)

const bgColorClass = computed(() => `bg-${props.color}-300`)

function startMessage() {
  progress.value = 0

  const duration = 5000
  const startTime = performance.now()

  const update = (now: DOMHighResTimeStamp) => {
    const elapsed = now - startTime
    progress.value = Math.min((elapsed / duration) * 5, 5)
    if (elapsed < duration) {
      requestAnimationFrame(update)
    }
  }

  requestAnimationFrame(update)
}
</script>
