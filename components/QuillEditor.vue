<template>
  <div class="bg-white" id="editor"></div>
</template>

<script setup lang="ts">
import 'quill/dist/quill.snow.css'
import type { Delta } from 'quill'

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ font: [] }],

  ['bold', 'italic', 'underline', 'strike'],
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ script: 'sub' }, { script: 'super' }],
  [{ indent: '-1' }, { indent: '+1' }],

  [{ color: [] }, { background: [] }],
  [{ align: [] }],

  ['clean'],
]

const html = defineModel<string>('html')

const betterDelta = ref<Delta>()

const emit = defineEmits<{
  updateDelta: [delta: Delta]
}>()

onMounted(async () => {
  const Quill = (await import('quill')).default
  const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
    },
  })

  if (!betterDelta.value) {
    betterDelta.value = quill.clipboard.convert({ html: html.value })
  }

  quill.setContents(betterDelta.value)

  quill.on('text-change', () => {
    html.value = quill.getSemanticHTML()
    betterDelta.value = quill.getContents()
    emit('updateDelta', betterDelta.value)
  })
})
</script>

<style>
.ql-toolbar {
  background-color: #fff;
}
</style>
