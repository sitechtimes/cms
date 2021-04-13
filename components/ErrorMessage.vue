<template>
<div v-if="errors">
  <div class="relative py-3 pl-4 pr-10 leading-normal text-red-700 bg-red-100 rounded-lg" role="alert">
    <p class="text-sm pb-2 font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5 fill-current inline-block">
        <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd" />
      </svg>
      There were {{ errors.length }} errors:
    </p>

    <ul v-for="error in errors" class="list-disc px-8">
      <li class="text-sm">{{ error.message }}</li>
    </ul>
  </div>
</div>
</template>
<script>
  export default {
    name: 'ErrorMessage',
    props: {
      errors: Array
    }
  }
</script>
