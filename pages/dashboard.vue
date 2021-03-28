<template>
  <div class="container mx-auto">
    <!--    <header>-->
    <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="lg:flex lg:items-center lg:justify-between">
        <div class="flex-1 min-w-0">
          <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        </div>

        <div class="mt-5 flex lg:mt-0 lg:ml-4 py-2">
        <span class="sm:ml-3">
        <button type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">

          <!--    TODO: button should be at the same height      -->
          <svg class="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Create New Article
        </button>

        </span>
        </div>
      </div>
    </div>
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

                    <ArticleRow title='This is an Article title'/>
                    <ArticleRow title='This is an Article title'/>

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

                    <ArticleRow title='This is an Article title'/>
                    <ArticleRow title='This is an Article title'/>

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

                    <ArticleRow title='This is an Article title'/>
                    <ArticleRow title='This is an Article title'/>
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
    components: {
      ArticleRow
    }
  }
</script>
