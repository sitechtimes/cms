<template>
  <div class="container mx-auto">
      <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="flex-1 min-w-0">
        <h1 class="text-3xl font-bold text-gray-900">Profile</h1>
      </div>

    <div class="mt-5 md:mt-0 grid md:grid-cols-2">
          <div class="py-5 space-y-6">
              <div class="col-span-3 sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input type="text" name="company_website"
                         class="border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 py-3 px-3" :value="this.$auth.user.email" disabled>
                </div>
              </div>

              <div class="col-span-3 sm:col-span-2">
                <label  class="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input type="text" name="company_website"
                         class="border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 py-3 px-3"
                         :value="user !== null ? user.name : '' " disabled>
                </div>
              </div>

              <div class="col-span-3 sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700">
                  Role
                </label>
                <div class="mt-1 flex rounded-md shadow-sm">
                  <input type="text" name="company_website"
                       class="border focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300 py-3 px-3"  :value="this.$auth.user.role" disabled>
                </div>
              </div>

            <div>
              <label class="block text-sm font-medium text-gray-700">
                Photo
              </label>

              <div class="mt-1 flex items-center">
                <span class="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <svg v-if="user === null" class="h-full w-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                  <img :src="viewImage === null ? user.imageUrl: viewImage" v-else />
                </span>

                <div @change="uploadFile">
                <label class="ml-5 py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 cursor-pointer">
                  Change
                  <input id="file-upload" name="file-upload" type="file" class="sr-only"/>
                </label>
                </div>
            </div>

          </div>

        <div class="py-3">
            <button @click="save" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
        </div>
          </div>
    </div>
    </div>
  </div>
  </template>
<script>
 import axios from "axios";
 import imageCompression from 'browser-image-compression';

 export default {
   layout: 'dashboard',
   middleware: ['mainAuth'],
   // TODO: password update
   data () {
     return {
       user: null,
       image: null,
       viewImage: null
     };
   },
   async mounted() {
     const user = await this.$axios.get(`/users/${this.$auth.user.id}`);
     this.user = user.data;
   },
   methods: {
     uploadFile(file){
       if (file.target.files) {

         this.viewImage = URL.createObjectURL(file.target.files[0]);

         this.image = file.target.files[0]
       }
     },
     async save() {
       try {
         if (this.image) {

           // TODO: update image compression
           const imageFile = await imageCompression(this.image, {});

           const fd = new FormData();
           fd.append("file", imageFile);
           fd.append('upload_preset', 'nuk0splv');

           const req = {
             url: "https://api.cloudinary.com/v1_1/sitechtimes/image/upload/",
             data: fd,
             method: 'POST',
           }

           const res = await axios(req);

           await this.$axios.put(`users/${this.$auth.user.id}`, {
             imageUrl: res.data.url
           });
         }
       }catch(e) {
         console.log(e);
       }
     }
   }
 }
</script>
