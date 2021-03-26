<template>
  <tr>
    <td class="px-2 py-4 whitespace-nowrap">
      <div class="flex items-center">

        <div class="ml-4">
          <div class="text-sm font-medium text-gray-900">
            {{ article.name }}
<!--            How to use Tailwind Components in Vue.js-->
          </div>

        </div>
      </div>
    </td>
    <td class="px-6 py-4 whitespace-nowrap">
      <div class="text-sm text-gray-900">January 10, 2020</div>
    </td>

    <td class="px-6 py-4 whitespace-nowrap">
        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Draft
        </span>
    </td>

    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
      <a class="text-indigo-600 hover:text-indigo-900" href="#">Edit</a>
    </td>
  </tr>
</template>

<script>
  export default {
    name: "hello",
    props: {
      article: Object
    }
  }
</script>
