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

            <span class="sm:ml-3">
      <button @click="deleteModel = !deleteModel" type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white  hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 bg-red-600">
        <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </span>



          </div>
        </div>
        <FileUpload v-if="article.imageUrl !== undefined" :preview="preview" :image="article.imageUrl" @uploadImage="uploadImage"/>

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

        <WarningAlert
          v-if="reviewModel"
          @dismissModelAlert="dismissModelAlert" @allowAction="updateArticleStatus('review')"
          title="Send Article to Review?"
          message="Are you sure you want to send your article to review? All of your data will be permanently removed. This action cannot be undone."
          action="Send to Review"
        />

        <WarningAlert
          v-if="deleteModel"
          @dismissModelAlert="dismissModelDelete" @allowAction="deleteDraft"
          title="Delete Article?"
          message="Are you sure you want to delete your article? All of your data will be permanently removed. This action cannot be undone."
          action="Delete Article"
        />
      </div>

      <div v-show="article.status === 'review'">
           <div class="lg:flex lg:items-center lg:justify-between py-6">
             <div class="flex-1 min-w-0">
               <h1 class="text-2xl font-bold leading-7 background-blue sm:text-3xl sm:truncate inline-block
               focus:outline-none focus:ring focus:border-blue-300 bg-gray-100">{{ article.title }}</h1>
             </div>

             <div class="mt-5 flex lg:mt-0 lg:ml-4"
                  v-if="['editor', 'admin'].includes(this.$auth.user.role)">

                <span class="hidden sm:block ml-3">
                  <button @click="sendToDraftModel = !sendToDraftModel" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                            Send back to Writer
                  </button>
                </span>

              <span class="sm:ml-3">
                  <button @click="sendToAdminModel = !sendToAdminModel" type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                       <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      Send to Admin
                  </button>
                </span>


             </div>
           </div>
          <img :src="article.imageUrl" />
         <div class="preview-content" v-html="article.content"></div>
      </div>

      <WarningAlert
        v-if="sendToDraftModel"
        @dismissModelAlert="dismissDraftAlert" @allowAction="updateArticleStatus('draft')"
        title="Send article back to the writer?"
        message="Are you sure you want to send your article to review? All of your data will be permanently removed. This action cannot be undone."
        action="Send back to writer"
      />

      <WarningAlert
        v-if="sendToAdminModel"
        @dismissModelAlert="sendToAdminModel = false" @allowAction="updateArticleStatus('ready')"
        title="Send article to admin?"
        message="Are you sure you want to delete your article? All of your data will be permanently removed. This action cannot be undone."
        action="Send article to admin"
      />
    </div>

    <div v-show="article.status === 'ready'">
      <div class="lg:flex lg:items-center lg:justify-between py-6">
          <div class="flex-1 min-w-0">
            <h1 class="text-2xl font-bold leading-7 background-blue sm:text-3xl sm:truncate inline-block
               focus:outline-none focus:ring focus:border-blue-300 bg-gray-100">{{ article.title }}</h1>
          </div>

          <div class="mt-5 flex lg:mt-0 lg:ml-4"
               v-if="this.$auth.user.role === 'admin'">

                <span class="hidden sm:block ml-3">
                  <button @click="sendToDraftModel = !sendToDraftModel" type="button" class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                    </svg>
                            Send back to Writer
                  </button>
                </span>

            <span class="sm:ml-3">
                  <button @click="publishDraft" type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                       <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                    Published Article
                  </button>
                </span>

            <WarningAlert
              v-if="sendToDraftModel"
              @dismissModelAlert="dismissDraftAlert" @allowAction="updateArticleStatus('draft')"
              title="Send article back to the writer?"
              message="Are you sure you want to send your article to review? All of your data will be permanently removed. This action cannot be undone."
              action="Send back to writer"
            />

            <WarningAlert
              v-if="publishedModel"
              @dismissModelAlert="publishedModel = false" @allowAction="publishDraft"
              title="Publish Article?"
              message="Are you sure you want to publish this article? All of your data will be permanently removed. This action cannot be undone."
              action="Publish Article"
            />

          </div>
        </div>

        <img :src="article.imageUrl" />
        <div class="preview-content" v-html="article.content"></div>
      </div>
    </div>
  </div>

</template>

<script>
  import { VueEditor } from "vue2-editor";
  import SuccessAlert from "../../../components/alerts/SuccessAlert";
  import ErrorMessage from "../../../components/ErrorMessage";
  import FileUpload from "../../../components/FileUpload";
  import WarningAlert from "../../../components/alerts/WarningAlert";
  import axios from 'axios';

  export default {
    layout: 'dashboard',
    // middleware
    components: {
      FileUpload,
      VueEditor, SuccessAlert, ErrorMessage, WarningAlert,
    },
  data () {
    return {
      articleId: this.$route.params.id,

      preview: false,
      reviewModel: false,
      deleteModel: false,
      sendToDraftModel: false,
      sendToAdminModel: false,
      publishedModel: false,

      success: null,
      errors: null,

      articleImage: null,
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

  async beforeMount() {
    // fill editor with info
    try {
      const article = await this.$axios.get(`cms/${this.articleId}`);
      this.article = article.data;
      // console.log(article.data);
    }catch (e){
      // TODO: add 404 page
      // console.log(e)
      this.$router.push('/')
    }
  },
    methods: {
      async saveArticle() {
        try {

          // TODO: refactor upload image to cloudinary
          if (this.articleImage) {
            const fd = new FormData()
            console.log(this.articleImage);

            fd.append("file", this.articleImage)
            fd.append('upload_preset', 'rr7kbagm')
            console.log(fd)

            const req = {
              url: "https://api.cloudinary.com/v1_1/sitechtimes/image/upload/",
              data: fd,
              method: 'POST',
            }

            const res = await axios(req);
            this.article.imageUrl = res.data.url
          }


          await this.$axios.put(`cms/${this.articleId}`, {
            ...this.article
          });


          this.errors = null
          this.success = "The Article has been successfully saved!";

        }catch(e){
          this.success = null
          this.errors = e.response.data.errors;
        }
      },
      async updateArticleStatus(status) {
        try {

          await this.$axios.put(`cms/${this.articleId}`, {
            status: status
          });

          this.$router.push('/')

        }catch(e){
          // TODO: handle error
          console.log(e);
        }
      },

      async deleteDraft(){
        try {
          await this.$axios.delete(`cms/${this.articleId}`);
          this.$router.push('/')
        }catch(e) {
          console.log(e)
        }
      },
      async publishDraft(){
        try {
          const res = await this.$axios.get(`cms/${this.articleId}/publish`);
          console.log(res);
        }catch(e){
          console.log(e);
        }
      },
      uploadImage(image){
        this.articleImage = image
      },
      dismissModelDelete(){
        this.deleteModel = false
      },
      dismissModelAlert(){
        this.reviewModel = false
      },
      dismissAlert(){
        this.success = null
      },
      dismissDraftAlert(){
        this.sendToDraftModel = false;
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
