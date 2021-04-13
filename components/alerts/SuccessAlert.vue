<!-- TODO: make alert dynamic and allow to pass prop type -->
<template>
  <div v-show="show" class="container mx-auto">
        <div class="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
    <div class=" py-3 pl-4 pr-10 leading-normal text-green-700 bg-green-100 rounded-lg flex center items-center justify-between" role="alert">
      <p class="text-sm font-bold inline-block">

        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 inline-block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {{ message }}
      </p>


      <div class="order-2 flex-shrink-0 sm:order-3 sm:ml-3 inline-block">
        <button @click="show = !show" type="button" class="-mr-1 flex p-2 rounded-md hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 inline-block">
          <span class="sr-only">Dismiss</span>

          <svg class="h-6 w-6 text-green" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        show: false
      }
    },
    props: {
      message: String
    }
  }
</script>
