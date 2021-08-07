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
                     class="text-3xl font-bold leading-7 background-blue sm:text-3xl sm:truncate inline-block w-full text-wrap
               focus:outline-none focus:ring focus:border-blue-300 bg-gray-100"/>
            </div>

            <div class="mt-5 flex lg:mt-0 lg:ml-4">
        <span class="mr-3 md:mr-0">
    </span>

                  <button @click="preview = !preview" type="button"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 mr-3">
                <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                fill="currentColor" aria-hidden="true">
                   <path v-show="preview"
                    d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
                   <path v-show="!preview" fill-rule="evenodd"
                    d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z"
                    clip-rule="evenodd"/>
                  </svg>
                  {{ preview ? 'Edit': 'View' }}
              </button>

              <div class="relative inline-block text-left sm:ml-3 " @mouseover="open = true" @mouseleave="open = false">
                <div>
                  <button type="button"
                          class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
                          id="menu-button" aria-expanded="true" aria-haspopup="true">
                    Options
                    <svg class="-mr-1 ml-2 h-5 w-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clip-rule="evenodd"/>
                    </svg>
                  </button>
                </div>
                <div v-if="open"
                     class="origin-top-right absolute right-0 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none py-1"
                     role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabindex="-1">
                  <a @click="saveArticle"
                     class="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-gray-100 hover:bg-indigo-600 hover:text-white"
                     role="menuitem" tabindex="-1" id="menu-item-0">Save Article</a>
                  <a @click="reviewModel = !reviewModel"
                     class="cursor-pointer text-gray-700 block px-4 py-2 text-sm hover:bg-indigo-600 hover:text-white"
                     role="menuitem" tabindex="-1" id="menu-item-1">Send To Review</a>
                  <a @click="deleteModel = !deleteModel"
                     class="cursor-pointer text-red-700 block px-4 py-2 text-sm hover:bg-red-100 " role="menuitem"
                     tabindex="-1" id="menu-item-2">Delete</a>
                </div>
              </div>

            </div>
          </div>

          <CategoryPicker v-if="article.category !== undefined && !preview" @changeCategory="changeCategory"
                          :selectedCategory="article.category"/>

          <FileUpload v-if="article.imageUrl !== undefined" :preview="preview" :image="article.imageUrl"
                      @uploadImage="uploadImage"/>

          <div v-show="!preview" class="py-3">
            <label for="image-alt" class="block text-sm font-medium text-gray-700">Image Description</label>
              <input v-model="article.imageAlt" type="text" name="image-alt" id="image-alt"
                     class="mt-1 block py-2 px-3 md:w-2/5 w-full border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" />
          </div>

          <vue-editor v-model="article.content" v-show="!preview" :editor-toolbar="customToolbar" class="py-2"/>

          <div class="preview-content" v-show="preview" v-html="article.content"></div>


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
           <div>
             <div class="flex-1 min-w-0">
               <h1 class="text-3xl font-bold leading-9 background-blue pt-6
               focus:outline-none focus:ring focus:border-blue-300 bg-gray-100">{{ article.title }}</h1>
            </div>

            <div class="py-6 flex"
                 v-if="['editor', 'admin'].includes(this.$auth.user.role)">

                <span class="mr-3">
                  <button @click="sendToDraftModel = !sendToDraftModel" type="button"
                          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"/>
                    </svg>
                            Send back to Writer
                  </button>
                </span>

              <span class="sm:ml-3">
                  <button @click="sendToAdminModel = !sendToAdminModel" type="button"
                          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor" aria-hidden="true">
                       <path fill-rule="evenodd"
                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                             clip-rule="evenodd"/>
                      </svg>
                      Send to Admin
                  </button>
                </span>


            </div>
          </div>

          <h2 class="text-lg mb-4">
            <span class="font-bold">Category:</span>
            <span>{{ article.category }}</span>
          </h2>

          <img v-if="article.imageAlt" :src="article.imageUrl" class="py-4"/>

          <h2 v-if="article.imageAlt" class="text-lg mb-4">
            <span class="font-bold">Image Alt:</span>
            <span>{{ article.imageAlt }}</span>
          </h2>


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

      <div v-show="article.status === 'ready'">
        <div>
          <div class="flex-1 min-w-0">
            <h1 class="text-3xl font-bold leading-9 background-blue pt-6
               focus:outline-none focus:ring focus:border-blue-300 bg-gray-100">{{ article.title }}</h1>
          </div>

          <div class="py-6 flex"
               v-if="this.$auth.user.role === 'admin'">

                <span class="mr-3">

                  <button @click="sendToDraftModel = !sendToDraftModel" type="button"
                          class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <svg class="-ml-1 mr-2 h-5 w-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                         fill="currentColor" aria-hidden="true">
                        <path fill-rule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clip-rule="evenodd"/>
                    </svg>
                            Send back to Writer
                  </button>
                </span>

            <span class="sm:ml-3">
                  <button @click="publishedModel = !publishedModel" type="button"
                          class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                     <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                          fill="currentColor" aria-hidden="true">
                       <path fill-rule="evenodd"
                             d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                             clip-rule="evenodd"/>
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

            <PositionAlert
              v-if="publishedModel"
              @dismissModelAlert="publishedModel = false"
              title="Publish Article?"
              message="Are you sure you want to publish this article? All of your data will be permanently removed. This action cannot be undone."
              action="Publish Article"
              :articleId=articleId
              :articleCategory="article.category"
            />

          </div>
        </div>


        <h2 class="text-lg mb-4">
          <span class="font-bold">Category:</span>
          <span>{{ article.category }}</span>
        </h2>

        <img v-if="article.imageAlt" :src="article.imageUrl" class="py-4"/>

        <h2 v-if="article.imageAlt" class="text-lg mb-4">
          <span class="font-bold">Image Alt:</span>
          <span>{{ article.imageAlt }}</span>
        </h2>


        <div class="preview-content" v-html="article.content"></div>

      </div>
      </div>
    </div>
  </div>

</template>

<script>
  import {VueEditor} from "vue2-editor";
  import SuccessAlert from "../../../components/alerts/SuccessAlert";
  import ErrorMessage from "../../../components/ErrorMessage";
  import FileUpload from "../../../components/FileUpload";
  import WarningAlert from "../../../components/alerts/WarningAlert";
  import PositionAlert from "@/components/position/PositionAlert";
  import axios from 'axios';

  export default {
    layout: 'dashboard',
    middleware: ['mainAuth'],
    components: {
      FileUpload,
      VueEditor, SuccessAlert, ErrorMessage, WarningAlert, PositionAlert
    },
    data() {
      return {
        articleId: this.$route.params.id,

        preview: false,
        reviewModel: false,
        deleteModel: false,
        sendToDraftModel: false,
        sendToAdminModel: false,
        publishedModel: false,
        open: false,

        success: null,
        errors: null,

        articleImage: null,
        article: Object,

        customToolbar: [
          [{header: [false, 1, 2, 3, 4, 5, 6]}],
          ["bold", "italic", "underline", "strike"],
          [{list: "ordered"}, {list: "bullet"}],
          [{script: "sub"}, {script: "super"}],
          ["clean"]
        ]
      }
    },

    async beforeMount() {
      // fill editor with info
      try {
        const article = await this.$axios.get(`cms/${this.articleId}`);
        this.article = article.data;
        console.log(article.data);
      } catch (e) {

        // TODO: add 404 page
        this.$router.push('/')
      }
    },
    methods: {
      async saveArticle() {
        try {

          // TODO: refactor upload image to cloudinary
          if (this.articleImage) {
            const fd = new FormData()

            fd.append("file", this.articleImage)
            fd.append('upload_preset', 'rr7kbagm')

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

        } catch (e) {
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

        } catch (e) {
          // TODO: handle error
          console.log(e);
        }
      },

      async deleteDraft() {
        try {
          await this.$axios.delete(`cms/${this.articleId}`);
          this.$router.push('/')
        } catch (e) {
          console.log(e)
        }
      },

      changeCategory(category) {
        this.article.category = category;
      },
      uploadImage(image) {
        this.articleImage = image
      },
      dismissModelDelete() {
        this.deleteModel = false
      },
      dismissModelAlert() {
        this.reviewModel = false
      },
      dismissAlert() {
        this.success = null
      },
      dismissDraftAlert() {
        this.sendToDraftModel = false;
      },

    }
  }
</script>

<style>
  ul {
    list-style: disc !important;
  }

  ol {
   list-style: decimal !important;
  }

  ul, ol {
    margin-left: 3rem;
  }

  .preview-content > * {
    font-size: revert !important;
    font-weight: normal !important;
  }
</style>
