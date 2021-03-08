<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="flex items-center justify-around">
      <h1 class="text-3xl font-extrabold text-gray-900">Your Articles</h1>
      <button
        type="submit"
        class="py-2 px-4 border border-transparent rounded-md font-bold text-white bg-yellow-400 hover:bg-yellow-300">
        Create Article
      </button>
    </div>
    <ArticleHeader />
  </div>
</template>

<script>
import ArticleHeader from '../components/ArticleHeader';
export default {
  components: {
    ArticleHeader
  },
};
</script>

<style></style>
