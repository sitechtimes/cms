<template>
  <div class="bg-white" id="editor"></div>
</template>

<script setup lang="ts">
import 'quill/dist/quill.snow.css'

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

const html = defineModel<string>()

onMounted(async () => {
  const Quill = (await import('quill')).default
  const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
    },
  })

  quill.setContents(quill.clipboard.convert({ html: html.value }))

  quill.on('text-change', () => {
    html.value = quill.getSemanticHTML()
  })
})
</script>

<style>
.ql-toolbar {
  background-color: #fff;
}
</style>
