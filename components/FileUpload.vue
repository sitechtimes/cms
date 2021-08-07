<template>
<!--  <input type="file" @change="uploadFile"/>-->
  <div class="pb-4" @change="uploadFile">
            <div v-if="file === null && !preview" class="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div class="space-y-1 text-center">
                <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
                  <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                </svg>
                <div class="text-sm text-gray-600 text-center">
                  <label for="file-upload" class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                    Upload a file
                    <input id="file-upload" name="file-upload" type="file" class="sr-only">
                  </label>
                </div>
                <p class="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

    <a v-if="file !== null && !preview"  @click="file = null" class="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
      Change Image
    </a>

    <img :src="file" alt=""/>
  </div>
</template>
<script>
  import axios from 'axios';

 export default {
   name: 'FileUpload',
   props: {
     preview: Boolean,
     image: String
   },
   data() {
    return {
      file: this.image
    }
   },
   methods: {
     // TODO: upload file to cloudinary
     async uploadFile(file) {

       if (file.target.files) {

         this.file = URL.createObjectURL(file.target.files[0]);

         // TODO: emit image to parent
         this.$emit('uploadImage', file.target.files[0])

       }
     }
   }
 }

</script>
