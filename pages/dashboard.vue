<template>
  <div class="container mx-auto">
    <header>
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <h1 class="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
      </div>
    </header>
    <main>

      <!--    table  -->
      <div class="py-4">
      <h1 class="text-l lg:px-10 font-bold">Drafts</h1>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <tbody class="bg-white divide-y divide-gray-200">

                  <ArticleRow :article="{ name: 'Veronica', company: 'Veridian Dynamics' }"/>
                  <ArticleRow />
                  <ArticleRow />

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!--    table  -->

      <div class="py-4">
      <h1 class="text-l lg:px-10 font-bold">In Review</h1>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <tbody class="bg-white divide-y divide-gray-200">

                  <ArticleRow />
                  <ArticleRow />

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>

      <!-- table -->

      <div class="py-4">
      <h1 class="text-l lg:px-10 font-bold">Ready for Publication</h1>
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

        <div class="flex flex-col">
          <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <tbody class="bg-white divide-y divide-gray-200">

                  <ArticleRow />
                  <ArticleRow />

                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>


    </main>
  </div>
</template>

<script>
 import ArticleRow from '../components/ArticleRow.vue' ;

  export default {
    layout: 'dashboard',
    component: {
      ArticleRow
    }
  }
</script>
