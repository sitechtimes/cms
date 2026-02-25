<template>
  <div class="du-tabs du-tabs-border mx-auto max-w-7xl px-4">
    <input
      v-for="(label, i) in names"
      :key="i"
      :name="label"
      type="radio"
      class="du-tab hover:text-primary du-tabs-border text-md font-semibold"
      :aria-label="label"
      :checked="model === i"
      @click="changeModel(i)"
    />
    <SearchBar :articles="articleSets[chosenTab]" :chosen-tab="chosenTab" />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  names: string[]
  chosenTab: number
}>()

const model = defineModel<number>()
const articleStore = useArticleStore()

const articleSets = computed(() => [
  articleStore.articles,
  articleStore.reviewArticles,
  articleStore.readyArticles,
  articleStore.publishedArticle?.articles,
])

function changeModel(i: number) {
  model.value = i
}
</script>
