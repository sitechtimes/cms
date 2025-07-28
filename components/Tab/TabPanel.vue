<template>
  <div
    class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
    v-if="auth.user && ['editor', 'admin'].includes(auth.user.role)"
  >
    <div class="flex flex-wrap space-x-6">
      <Tab
        :id="1"
        title="My Articles"
        :isActive="openTab === 1"
        @tabClicked="toggleTabs"
      />
      <Tab
        :id="2"
        title="In Review"
        :isActive="openTab === 2"
        @tabClicked="toggleTabs"
      />
      <Tab
        :id="3"
        title="Ready"
        :isActive="openTab === 3"
        @tabClicked="toggleTabs"
        v-if="auth.user.role === 'admin'"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const openTab = ref(1)
const auth = useUserStore()
const emit = defineEmits<{ tabClicked: [id: number] }>()

function toggleTabs(id: number) {
  openTab.value = id
  emit('tabClicked', openTab.value)
}
</script>
