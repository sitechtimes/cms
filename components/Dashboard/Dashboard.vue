<template>
  <div>
    <DashboardHeader />
    <TabPanel
      v-model="chosenTab"
      :names="['My Articles', 'In Review', 'Ready']"
    />
    <DashboardMyArticles v-if="chosenTab === 0" />
    <DashboardReadyArticles v-if="chosenTab === 1" />
    <DashboardReviewArticles v-if="chosenTab === 2" />
  </div>
</template>

<script setup lang="ts">
import { DashboardReadyArticles } from '#components'

const chosenTab = ref(0)
</script>
