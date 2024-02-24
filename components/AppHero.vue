<script setup lang="ts">
import {useSearch} from '~/composables/useSearch';
const {searchId, submitSearch} = useSearch();
</script>

<template>
  <div class="relative bg-gray-900">
    <div aria-hidden="true" class="absolute inset-0 overflow-hidden">
      <img src="../assets/SuitUpPlayOn-HeaderBG.png" alt="" class="h-full w-full object-cover object-center"/>
    </div>
    <div aria-hidden="true" class="absolute inset-0 bg-gray-900 opacity-50"/>

    <div class="relative mx-auto flex max-w-3xl flex-col items-center text-center sm:py-12 lg:px-0">
      <div class="w-96 rounded-2xl overflow-hidden filter drop-shadow-2xl mb-2">
        <img src="../assets/BMT-Logo.png" alt="LOGO" class="max-w-full h-auto">
      </div>
      <div class="w-full">
        <form class="max-w-md mx-auto" @submit.prevent="submitSearch">
          <label for="default-search"
                 class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
                   xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
            </div>
            <input type="search" id="default-search" v-model="searchId"
                   class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                   placeholder="Search Teams, Items..." required/>
            <button type="submit"
                    class="text-white absolute end-2.5 bottom-2.5 bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Search
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
