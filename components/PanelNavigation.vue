<template>
  <div class="text-gray-700 bg-white border-t border-b body-font mt-2">
    <div class="flex flex-col flex-wrap p-5 mx-auto md:items-center md:flex-row">
      <div class="flex flex-wrap items-center justify-center text-base ">
        <ul>
          <li>
            <nuxt-link to="/writer" class="mr-5 text-sm font-semibold text-gray-600 lg:ml-24 hover:text-gray-800">
            Your Articles</nuxt-link>
          </li>
        </ul>
        <ul>
          <li>
            <nuxt-link to="/review" class="mr-5 text-sm font-semibold text-gray-600 lg:ml-24 hover:text-gray-800">
          Articles In Review</nuxt-link>
          </li>
        </ul>
        <ul>
          <li>
            <nuxt-link to="/published" class="mr-5 text-sm font-semibold text-gray-600 lg:ml-24 hover:text-gray-800">
          Ready to be Published</nuxt-link>
          </li>
        </ul>        
      </div>
      <div class="flex ml-auto">
        <button
          class="items-center px-8 py-2 ml-auto font-semibold transition duration-500 ease-in-out transform rounded-lg text-white bg-yellow-400 hover:bg-yellow-300 focus:ring focus:outline-none">
          Create Article
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PanelNavigation"
};
</script>

<style></style>
