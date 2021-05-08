<template>
  <div class="py-4 max-w-7xl mx-auto py-4px-4 sm:px-6 lg:px-8">
    <h1 class="text-l px-2 font-bold">{{ title }}</h1>
    <div class="max-w-7xl mx-auto py-6">
      <div class="flex flex-col">
        <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class=" align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table class="min-w-full divide-y divide-gray-200">
                <tbody class="bg-white divide-y divide-gray-200">

                <slot></slot>

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Table',
    props: {
      title: String,
    }
  }
</script>
