<template>
  <div>
    <AppHeader />
    <AppHero />
    <NuxtPage />
    <AppFooterFixed />
  </div>
</template>
<script setup lang="ts">
import AppFooterFixed from "~/components/footer/AppFooterFixed.vue";
import AppHeader from "~/components/header/AppHeader.vue";
</script>