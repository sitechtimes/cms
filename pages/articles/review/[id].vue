<template>
    <div>
        <main v-if="article" class="mx-auto max-w-3xl py-8 md:max-w-7xl">
            <div v-if="article.editorResponses" class="max-w-7xl py-4">
                <label class="text-md block font-medium text-gray-700"> Editor Notes </label>
                <div class="mt-1 flex flex-col w-80 rounded-md shadow-md md:w-100 lg:w-120">
                    <h3 class="text-md flex-1 px-3 py-3" v-for="response in article.editorResponses" :key="response.name">
                        {{ response.name }}: {{ response.text }}
                    </h3>
                </div>
            </div>
            <ArticleComponent :article="article" />
        </main>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
    layout: 'navbar',
})

const article = ref<Article>()
const route = useRoute()

onBeforeMount(async () => {
    article.value = await requestEndpoint<Article>(
        `/cms/${route.params.id}`,
        'GET'
    )
    
    console.log('Fetched article:')
    console.log(article.value)
})
</script>
