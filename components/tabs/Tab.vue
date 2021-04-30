<template>
  <button
    class="py-3 px-6 focus:outline-none text-gray-500 border-b-2 font-bold font-medium text-sm"
    v-on:click="onTabClick"
    v-bind:class="{
         'text-indigo-600 border-indigo-600': this.isActive === id,
          'text-gray-600': this.isActive !== id
        }">
    {{ title }}
  </button>
</template>

<script>
 export default {
   name: 'Tab',
   props: {
     id: Number,
     title: String,
     isActive: Number
   },
   methods: {
    onTabClick() {
      this.$emit('tabClicked', this.id)
    }
   }
 }
</script>
