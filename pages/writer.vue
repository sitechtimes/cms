<template>
  <div class="bg-gray-50 min-h-screen">
    <PanelNaviation />
    <ArticleHeader />
  </div>
</template>

<script>
import ArticleHeader from '../components/ArticleHeader';
import PanelNavigation from '../components/PanelNavigation';
export default {
  components: [ArticleHeader, PanelNavigation
  ],
};
</script>

<style></style>
