<template>
  <div>
    <div>
      <NuxtLink :to="`/articles/${route.params.id}`" class="du-btn text-md">
        <Icon class="align-middle" name="heroicons:link-16-solid" />View
      </NuxtLink>
      <details ref="dropdown" class="du-dropdown du-dropdown-end">
        <summary class="du-btn m-1">Options</summary>
        <ul
          class="du-menu du-dropdown-content bg-base-100 du-rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li v-if="article.status === 'ready'" @click="confirmPublish">
            <button>Publish Article</button>
          </li>
          <li @click="saveArticle">
            <button>Save Article</button>
          </li>
          <li v-if="article.status === 'draft'" @click="confirmSend">
            <button>Send to Review</button>
          </li>
          <li
            v-if="article.status === 'review' && user?.role === 'admin'"
            @click="confirmReady"
          >
            <button>Send to Ready</button>
          </li>
          <li @click="confirmArticleDeletion">
            <button>Delete Article</button>
          </li>
        </ul>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArticleEditor } from '~/composables/useArticleEditor'

const editor = useArticleEditor()

const {
  route,
  user,
  article,
  dropdown,
  modal1,
  modal2,
  modal3,
  modal4,
  fileSelection,
  confirmationMessage,
  progress,
  topics,
  changeImage,
  saveArticle,
  confirmSend,
  sendToReview,
  confirmReady,
  readyArticle,
  confirmPublish,
  publishArticle,
  confirmArticleDeletion,
  deleteArticle,
} = editor
</script>
