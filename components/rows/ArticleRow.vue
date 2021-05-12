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
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          {{ capitalizeStatus }}
        </span>
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <nuxt-link class="text-indigo-600 hover:text-indigo-900"
                 :to="`/articles/${article.id}`">{{ articleActionText }}</nuxt-link>
    </td>
  </tr>
</template>

<script>
// This component is for the rows on the table and containsn the title, date, status, and actions the user can take on the articles
  export default {
    name: 'ArticleRow',
    props: 
    // the name of the article
    ['article'],
    computed: {

      // @vuese
      capitalizeStatus() {
        // 
        return this.article.status.charAt(0).toUpperCase() + this.article.status.slice(1);
      },

      formatDate() {
        // shows the date the article was last updated
        const date  = new Date(this.article.updatedAt);

        const formattedDate = date.toLocaleString('en',
          { month: 'short', weekday: 'short', day: 'numeric', year: 'numeric'});

        return formattedDate;
      },

      articleActionText() {
        // shows whether article can be edited or reviewed
        if (this.article.status === 'draft') return "Edit";
        if (this.article.status === 'review' || 'ready') return "View";
      }
    },
  }

</script>
