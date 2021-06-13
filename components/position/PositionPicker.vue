<template>
  <div class="mt-10 sm:mt-0 mb-6">
      <div class="md:col-span-1 ">
        <div class="col-span-6 sm:col-span-3 mr-8">
          <label for="country" class="block text-sm font-medium text-gray-700">Select Article Position</label>
          <select v-model="selected" @change="changePlacement" class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
            <option v-for="place in placements">{{ place }}</option>
          </select>
        </div>
      </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      placements: ["none", "main", "sub", "detail"],
      selected:  'none'
    }
  },
  methods: {
    changePlacement(){
      this.$emit('changePlacement', this.selected);
    }
  }
}
</script>
