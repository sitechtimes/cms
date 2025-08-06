<template>
  <div class="" id="editor"></div>
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

const model = defineModel<string>()

onMounted(async () => {
  const Quill = (await import('quill')).default
  const quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
    },
  })
})
</script>
