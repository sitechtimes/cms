<template>
  <tr>
    <td class="px-2 py-4 whitespace-nowrap">
      <div class="flex items-center">

        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            {{ article.title.substring(0, 25) }}
          </div>

        </div>
      </div>
    </td>

    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">{{ formatDate }}</div>
    </td>

    <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {{ capitalizeStatus }}
        </span>
    </td>


    <td v-if="article.status !== 'draft'"  class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <div class="text-sm text-gray-900">{{ article.userName }}</div>
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <nuxt-link class="text-indigo-600 hover:text-indigo-900"
                 :to="`/articles/${article.id}`">
        {{ articleActionText }}
      </nuxt-link>
    </td>

  </tr>
</template>

<script>
  export default {
    name: 'ArticleRow',
    props: ['article'],
    computed: {
      capitalizeStatus() {
        return this.article.status.charAt(0).toUpperCase() + this.article.status.slice(1);
      },

      formatDate() {
        const date  = new Date(this.article.updatedAt);

        const formattedDate = date.toLocaleString('en',
          { month: 'short', weekday: 'short', day: 'numeric', year: 'numeric'});

        return formattedDate;
      },

      articleActionText() {
        if (this.article.status === 'draft') return "Edit";
        if (this.article.status === 'review' || 'ready') return "View";
      }
    },
  }

</script>
