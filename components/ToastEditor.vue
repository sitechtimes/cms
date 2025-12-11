<template>
  <ClientOnly>
    <div class="bg-white" ref="editorContainer"></div>
    <template #fallback>
      <div
        class="flex h-[500px] items-center justify-center rounded border bg-white text-gray-500"
      >
        <div class="text-center">
          <div
            class="mx-auto mb-2 h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900"
          ></div>
          <p>Loading editor...</p>
        </div>
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
const html = defineModel<string>()
const editorContainer = ref<HTMLElement>()
const isEditorReady = ref(false)

// Initialize editor only after mount
onMounted(() => {
  initializeEditor()
})

const initializeEditor = async () => {
  if (!editorContainer.value) {
    // Retry after a short delay if container isn't ready
    setTimeout(initializeEditor, 100)
    return
  }

  try {
    // Clear any existing content
    editorContainer.value.innerHTML = ''

    // Dynamic imports for client-side only

    const { Editor } = await import('@toast-ui/editor')
    await import('@toast-ui/editor/dist/toastui-editor.css')
    const colorSyntax = (
      await import(
        '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.js'
      )
    ).default

    await import(
      '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css'
    )

    const editor = new Editor({
      el: editorContainer.value,
      height: '500px',
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      usageStatistics: false,
      toolbarItems: [
        ['heading', 'bold', 'italic', 'strike'],
        ['hr', 'quote'],
        ['ul', 'ol', 'indent', 'outdent'],
        ['table', 'image', 'link'],
        ['codeblock'],
        ['scrollSync'],
      ],
      plugins: [colorSyntax],
    })

    // Set initial content after a small delay to ensure editor is fully initialized
    setTimeout(() => {
      if (html.value) {
        editor.setHTML(html.value)
      }
    }, 100)

    // Update model on content change
    editor.on('change', () => {
      html.value = editor.getHTML()
      console.log(html.value)
    })

    isEditorReady.value = true

    // Cleanup
    onBeforeUnmount(() => {
      try {
        editor.destroy()
      } catch (e) {
        console.warn('Error destroying editor:', e)
      }
      isEditorReady.value = false
    })
  } catch (error) {
    console.error('Failed to initialize ToastUI Editor:', error)
  }
}
</script>

<style>
/* Ensure proper styling */
.toastui-editor-defaultUI {
  border: 1px solid #e5e5e5;
  border-radius: 4px;
}

ul.tui-colorpicker-clearfix {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

div.tui-colorpicker-clearfix {
  display: inline-block;
  margin: 5px 0;
}

.tui-colorpicker-palette-preview {
  margin-top: 4px;
  margin-left: -22px;
  width: 16px !important;
  height: 16px !important;
  display: inline-block; 
  border-radius: 50%;
  border: solid 1px rgba(0, 0, 0, 0.1);
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

.tui-colorpicker-svg {
  display: block;
}

.tui-colorpicker-slider-container {
  margin: 5px 0 0;
  height: 122px;
  zoom: 1;
  padding: 0;
}

.tui-colorpicker-slider-left {
  width: 120px;
  height: 120px;
}

.tui-colorpicker-slider-right {
  width: 18px;
  height: 120px;
}

.tui-colorpicker-svg-slider {
  width: 121.6px;
  height: 121.6px;
  overflow: hidden;
}

.tui-colorpicker-svg-huebar {
  width: 19.6px;
  height: 121.6px;
}

</style>
