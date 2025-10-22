<template>
  <tr v-if="current" class="h-12">
    <td
      class="w-fit min-w-40 overflow-hidden text-sm font-medium text-ellipsis whitespace-nowrap text-gray-900"
    >
      {{ current.title }}
    </td>

    <td class="w-60 min-w-40 text-sm text-gray-900">
      {{ formatDate }}
    </td>

    <td class="w-40 min-w-32">
      <span
        class="inline-flex rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 capitalize"
      >
        {{ current.status }}
      </span>
    </td>

    <td class="w-40 min-w-20 text-right text-sm font-medium whitespace-nowrap">
      <NuxtLink
        v-if="article && article.status === 'draft'"
        class="text-indigo-600 hover:text-indigo-900"
        :to="`/articles/edit/${article._id}`"
      >
        Edit
      </NuxtLink>
      <NuxtLink
        v-if="
          article && [article.status === 'review' || article.status === 'ready']
        "
        class="text-indigo-600 hover:text-indigo-900"
        :to="`/articles/${article._id}`"
      >
        View
      </NuxtLink>
      <NuxtLink
        v-if="publishedArticle"
        class="text-indigo-600 hover:text-indigo-900"
        :to="`/articles/view/${publishedArticle.slug}`"
      >
        View
      </NuxtLink>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps<{
  article?: Article
  publishedArticle?: PublishedArticle
}>()

const current = computed(() => props.article || props.publishedArticle)

const formatDate = computed(() => {
  const updatedAt =
    props.article?.updatedAt || props.publishedArticle?.updatedAt

  if (!updatedAt) return ''

  const date = new Date(updatedAt)

  return date.toLocaleString('en', {
    month: 'short',
    weekday: 'short',
    day: 'numeric',
    year: 'numeric',
  })
})
</script>
