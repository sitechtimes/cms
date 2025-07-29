<template>
  <tr>
    <td class="px-2 py-4 whitespace-nowrap">
      <div class="flex items-center">
        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            {{ article.title }}
          </div>
        </div>
      </div>
    </td>

    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ formatDate }}</div>
    </td>

    <td class="px-6 py-4 whitespace-nowrap">
      <span
        class="inline-flex rounded-full bg-green-100 px-2 text-xs leading-5 font-semibold text-green-800 capitalize"
      >
        {{ article.status }}
      </span>
    </td>

    <td
      v-if="article.status !== 'draft'"
      class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap"
    >
      <div class="text-sm text-gray-900">{{ article.customAuthor }}</div>
    </td>

    <td class="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
      <NuxtLink
        class="text-indigo-600 hover:text-indigo-900"
        :to="`/articles/${article._id}`"
      >
        {{ articleActionText }}
      </NuxtLink>
    </td>
  </tr>
</template>

<script setup lang="ts">
const props = defineProps<{ article: Article }>()

const formatDate = computed(() => {
  const date = new Date(props.article.updatedAt)

  const formattedDate = date.toLocaleString('en', {
    month: 'short',
    weekday: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return formattedDate
})

const articleActionText = computed(() => {
  if (props.article.status === 'draft') return 'Edit'
  if (props.article.status === 'review' || 'ready') return 'View'
})
</script>
