<template>
  <div>
    <AppHeader />
    <NuxtPage />
    <AppFooterBrowse />
  </div>
</template>
<script setup lang="ts">
import AppFooterBrowse from "~/components/footer/AppFooterBrowse.vue";
import AppHeader from "~/components/header/AppHeader.vue";
</script>