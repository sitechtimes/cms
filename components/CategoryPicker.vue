<template>
    <div class="mt-10 sm:mt-0 mb-6">
      <div class="md:grid md:grid-cols-3 md:gap-6">
        <div class="md:col-span-1 ">
          <div class="col-span-6 sm:col-span-3 mr-8">
            <label for="country" class="block text-sm font-medium text-gray-700">Category</label>
            <select v-model="selected" @change="changeCategory" id="country" name="country" autocomplete="country" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">

              <!-- TODO: refactor category attempt  -->
              <option v-if="category === selectedCategory" v-for="category in categories" selected>{{ category }}</option>
              <option v-if="category !== selectedCategory" v-for="category in categories" selected>{{ category }}</option>

            </select>
          </div>

        </div>
      </div>
    </div>
</template>

<script>
  export default {
    props: {
      selectedCategory: String
    },
    data(){
     return {
       // TODO: update list of categories
       categories: [
         'Tech', 'US', 'World', 'Sports'
       ],
       selected: this.selectedCategory
     }
    },
    methods: {
      changeCategory(){
        this.$emit('changeCategory', this.selected);
      }
    }
  }
</script>
