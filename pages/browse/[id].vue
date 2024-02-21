<script setup lang="ts">
definePageMeta({
  layout: 'browse-layout'
})
import { StarIcon } from '@heroicons/vue/20/solid'
import { fetchData } from "~/services/backendDataApi";
const { items } = await fetchData();

items.forEach(item => {
  item.reviewCount = Math.floor(Math.random() * 15) + 1; // Random number between 1 and 15
  item.rating = Math.floor(Math.random() * 3) + 3; // Random number between 3 and 5
});

async function addToBag(id: number): Promise<void>
{
  const response = await fetch(`http://localhost:8000/shopping/cart/add/${id}/${1}`);
  console.log(response);
}
</script>

<template>
  <div class="bg-white">
    <div class="mx-auto w-3/4 overflow-hidden sm:px-6 lg:px-8">
      <h2 class="sr-only">Products</h2>
      <div class="-mx-px grid grid-cols-2 border-l border-gray-200 sm:mx-0 md:grid-cols-3 lg:grid-cols-5 mb-36">
        <div v-for="item in items" :key="item.id" class="group relative border-b border-r border-gray-200 p-4 sm:p-6">
          <div class="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-200 group-hover:opacity-75">
            <img v-if="item.thumbnail" :src="item.thumbnail" :alt="item.name" class="h-full w-full object-cover object-center" />
          </div>
          <div class="pb-4 pt-10 text-center">
            <h3 class="text-sm font-medium text-gray-900">
              <span aria-hidden="true" class="absolute inset-0" />
              {{ item.name }} Trikot
            </h3>
            <div class="mt-3 flex flex-col items-center">
              <p class="sr-only">{{ item.rating }} out of 5 stars</p>
              <div class="flex items-center">
                <StarIcon v-for="rating in [0, 1, 2, 3, 4]" :key="rating" :class="[item.rating > rating ? 'text-yellow-400' : 'text-gray-200', 'h-5 w-5 flex-shrink-0']" aria-hidden="true" />
              </div>
              <p class="mt-1 text-sm text-gray-500">{{ item.reviewCount }} reviews</p>
            </div>
            <p class="mt-4 text-base font-medium text-gray-900">{{ item.price }} $</p>
            <button type="button" @click="addToBag(item.id)" class="relative mt-4 px-4 py-2 w-3/4 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
              Add to Bag
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
