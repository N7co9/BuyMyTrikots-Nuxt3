<template>
  <div>
    <AppHeaderFixedBackground />
    <NuxtPage />
    <AppFooterFixed />
  </div>
</template>
<script setup lang="ts">
import AppFooterFixed from "~/components/footer/AppFooterFixed.vue";
import AppHeaderFixedBackground from "~/components/header/AppHeaderFixedBackground.vue";
</script>