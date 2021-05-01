<template>
  <div class="container mx-auto">
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex-1 min-w-0">
          <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div class="mt-5 flex lg:mt-0 lg:ml-4 py-2">
        <button type="button" @click="createArticle" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

          <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Create New Article
        </button>

        </div>
      </div>
    </div>
    <main>

      <TabPanel @tabClicked="tabClicked"/>

      <!--   table  -->
      <div class="pt-6" v-if="tabId === 1">
        <ArticleTable title="Draft" :articles="sortArticles('draft')"/>
        <ArticleTable title="In Review" :articles="sortArticles('review')"/>
        <ArticleTable title="Ready for Publication" :articles="sortArticles('ready')"/>
      </div>

      <div class="pt-2" v-if="tabId === 2">
        <ArticleTable title="" :articles="reviewArticles" />
      </div>

      <div class="pt-2" v-if="tabId === 3">
        <ArticleTable title="" :articles="readyArticles" />
      </div>

    </main>
  </div>
</template>

<script>
  import ArticleRow from '../components/ArticleRow.vue' ;
  import ArticleTable from "../components/ArticleTable";
  import TabPanel from "../components/tabs/TabPanel";

  export default {
    layout: 'dashboard',
    middleware: ['auth'],
    components: { ArticleTable,  ArticleRow, TabPanel },
    data() {
      return {
        tabId: 1,
        articles: [],
        reviewArticles: [],
        readyArticles: [],
      }
    },
    async mounted() {
      const articles = await this.$axios.get(`cms/`);
      this.articles = articles.data;

      if (['editor', 'admin'].includes(this.$auth.user.role)) {
        const reviewArticles = await this.$axios.get('cms/review');
        this.reviewArticles = reviewArticles.data;
      }

      if (this.$auth.user.role === 'admin') {
        const readyArticles = await this.$axios.get('cms/ready');
        this.readyArticles = readyArticles.data;
      }
    },
    methods: {
      sortArticles (status) {
        return this.articles.filter(article => {
          return article.status === status;
        });
      },
      async createArticle() {
        try {
          const article = await this.$axios.post(`/cms`);
          this.$router.push(`/articles/${article.data.id}`)
        }catch(e){
          console.log(e);
        }
      },

      tabClicked(tabId){
        this.tabId = tabId
      },

    }
  }
</script>
