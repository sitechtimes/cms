<template>
  <div>
    <div v-if="editorModals.article.value && editorModals.user.value">
      <NuxtLink
        :to="`/articles/${editorModals.route.params.id}`"
        class="du-btn text-md"
      >
        <Icon class="align-middle" name="heroicons:link-16-solid" />View
      </NuxtLink>
      <details ref="dropdown" class="du-dropdown du-dropdown-end">
        <summary class="du-btn m-1">Options</summary>
        <ul
          class="du-menu du-dropdown-content bg-base-100 du-rounded-box z-1 w-52 p-2 shadow-sm"
        >
          <li
            v-if="editorModals.article.value.status === 'ready'"
            @click="editorModals.confirmPublish"
          >
            <button>Publish Article</button>
          </li>
          <li @click="editorModals.saveArticle">
            <button>Save Article</button>
          </li>
          <li
            v-if="editorModals.article.value.status === 'draft'"
            @click="editorModals.confirmSend"
          >
            <button>Send to Review</button>
          </li>
          <li
            v-if="
              editorModals.article.value.status === 'review' &&
              editorModals.user?.value.role === 'admin'
            "
            @click="editorModals.confirmReady"
          >
            <button>Send to Ready</button>
          </li>
          <li @click="editorModals.confirmArticleDeletion">
            <button>Delete Article</button>
          </li>
        </ul>
      </details>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useArticleEditor } from '~/composables/useArticleEditor'
import unpack from '~/composables/unpacker'

const editor = useArticleEditor()
const editorModals = unpack(editor)
</script>
