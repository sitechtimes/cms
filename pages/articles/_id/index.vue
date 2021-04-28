<template>
  <div>
   <!--  TODO: refactor draft check into separate component  -->

  <div class="container mx-auto">
    <div class="max-w-7xl mx-auto px-2 py-4 sm:px-6 lg:px-8">


      <div v-show="article.status === 'draft'">
      <SuccessAlert v-if="success !== null" :message="success" @dismissAlert="dismissAlert"/>
      <ErrorMessage v-if="errors !== null" :errors="errors"/>

    <div class="lg:flex lg:items-center lg:justify-between py-6">
      <div class="flex-1 min-w-0">
        <input type="text"
               v-model="article.title"
               class="text-2xl font-bold leading-7 background-blue sm:text-3xl sm:truncate inline-block
               focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"/>
      </div>

      <div class="mt-5 flex lg:mt-0 lg:ml-4">

        <span class="hidden sm:block ml-3">
        <button @click="preview = !preview" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">


        <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
          <path v-show="preview" d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
          <path v-show="!preview" fill-rule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clip-rule="evenodd" />
        </svg>
        {{ preview ? 'Edit': 'View' }}
      </button>
    </span>

        <span class="sm:ml-3">

      <button @click="saveArticle" type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 -ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
        </svg>
        Save Article
      </button>

    </span>

      </div>
    </div>

      <vue-editor v-model="article.content" v-show="!preview" :editor-toolbar="customToolbar" class="py-2" />

      <div class="preview-content" v-show="preview" v-html="article.content"></div>

      <div class="flex justify-center py-4">
        <button @click="reviewModel = !reviewModel" type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
          </svg>
          Send to Review
        </button>
      </div>

      <SendToReviewModel v-if="reviewModel" @dismissModelAlert="dismissModelAlert" @sendToReview="sendToReview"/>
      </div>


      <div v-show="article.status === 'review'|| article.status === 'ready'">
           <div class="lg:flex lg:items-center lg:justify-between py-6">
             <div class="flex-1 min-w-0">
               <h1 class="text-2xl font-bold leading-7 background-blue sm:text-3xl sm:truncate inline-block
               focus:outline-none focus:ring focus:border-blue-300 bg-gray-100">{{ article.title }}</h1>
             </div>
           </div>
         <div class="preview-content" v-html="article.content"></div>
      </div>

    </div>

  </div>
  </div>
</template>

<script>
  import { VueEditor } from "vue2-editor";
  import SuccessAlert from "../../../components/alerts/SuccessAlert";
  import ErrorMessage from "../../../components/ErrorMessage";
  import SendToReviewModel from "../../../components/alerts/SendToReviewAlert";

  export default {
    layout: 'dashboard',
    components: {
      VueEditor, SuccessAlert, ErrorMessage, SendToReviewModel
    },
  data () {
    return {
      articleId: this.$route.params.id,

      preview: false,
      reviewModel: false,

      success: null,
      errors: null,

      article: Object,
      customToolbar: [
        [{ header: [false, 1, 2, 3, 4, 5, 6] }],
        ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ script: "sub" }, { script: "super" }],
        [{ indent: "-1" }, { indent: "+1" }],
        ["clean"]
      ]
    }
  },

  async mounted() {
    // fill editor with info
    try {
      const article = await this.$axios.get(`/users/${this.$auth.user.id}/articles/${this.articleId}`);
      this.article = article.data;

    }catch (e){
      // TODO: add 404 page
      this.$router.push('/')
    }
  },
    methods: {
      async saveArticle() {
        try {

          await this.$axios.put(`/users/${this.$auth.user.id}/articles/${this.articleId}`, {
            ...this.article
          });

          this.errors = null
          this.success = "The Article has been successfully saved!";

        }catch(e){
          this.success = null
          this.errors = e.response.data.errors;
        }
      },
      async sendToReview() {
        try {

          await this.$axios.put(`/users/${this.$auth.user.id}/articles/${this.articleId}`, {
            ...this.article,
            status: 'review'
          });

          this.reviewModel = false

        }catch(e){
          // TODO: handle error
          console.log(e);
        }
      },
      dismissAlert(){
        this.success = null
      },
      dismissModelAlert(){
        this.reviewModel = false
      }
    }
}
</script>

<style>
  .preview-content > * {
    font-size: revert !important;
    font-weight: normal !important;
  }
</style>
