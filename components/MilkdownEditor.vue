<template>
  <Milkdown />
</template>

<script setup lang="ts">
import { Milkdown, useEditor } from '@milkdown/vue'
import '@milkdown/crepe/theme/common/style.css'
import '@milkdown/crepe/theme/frame.css'

const markdown = `# Milkdown Nuxt Commonmark

> You're scared of a world where you're needed.

This is a demo for using Milkdown with **Nuxt**.`

import { Crepe } from '@milkdown/crepe'

useEditor((root) => {
  const crepe = new Crepe({
    root,
  })

  return crepe
})
</script>
