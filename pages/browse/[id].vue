<script setup lang="ts">
import { fetchData } from "~/services/backendDataApi";
const { items } = await fetchData();
console.log(items)
</script>

<template>
  <div class="container mx-auto">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <div v-for="item in items" :key="item.itemId" class="bg-white overflow-hidden shadow-lg rounded-lg">
        <img v-if="item.thumbnail" :src="item.thumbnail" alt="Item Image" class="w-full h-56 object-cover object-center">
        <div class="p-4">
          <h2 class="text-gray-800 font-semibold text-lg mb-2">{{ item.name }}</h2>
          <p class="text-gray-600 text-sm mb-2">Position: {{ item.position }}</p>
          <p class="text-gray-600 text-sm mb-2">Nationality: {{ item.nationality }}</p>
          <p class="text-gray-600 text-sm mb-2">Price: ${{ item.price }}</p>
          <p class="text-gray-600 text-sm mb-2">Club Name: {{ item.clubName }}</p>
          <p class="text-gray-600 text-sm mb-2">Club Address: {{ item.clubAddress }}</p>
          <p class="text-gray-600 text-sm mb-2">Club Founded: {{ item.clubFounded }}</p>
          <p class="text-gray-600 text-sm mb-2">Club Website: <a :href="item.clubWebsite" target="_blank">{{ item.clubWebsite }}</a></p>
          <img v-if="item.clubEmblem" :src="item.clubEmblem" alt="Club Emblem" class="w-12 h-12 object-cover object-center">
        </div>
      </div>
    </div>
  </div>
</template>