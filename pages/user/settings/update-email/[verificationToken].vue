<script setup lang="ts">
import { ref } from 'vue'
import useVerifyToken from "~/composables/settings/email/useVerifyToken";
import {refreshPage} from "~/composables/refresh/useSlowRefresh";

const { verificationToken, verifyResponse, verifyToken } = useVerifyToken()

const isLoading = ref(true);

const verify = async () => {
  await verifyToken();
  setTimeout(() => {
    if (verifyResponse.value.response.type === 'OK') {
      isLoading.value = false;
      refreshPage()
    }
  }, 2000);
};

verify();
</script>

<template>
  <div class="bg-gradient-to-b from-blue-100">
    <div v-if="isLoading" class="justify-center flex">
      <div class="w-96 rounded-2xl overflow-hidden filter drop-shadow-2xl mb-2">
        <img src="assets/BMT-Logo.png" alt="LOGO" class="max-w-full h-auto">
      </div>
    </div>

    <div  class="mx-auto max-w-lg pt-16">
      <h1 v-if="isLoading" class="text-3xl font-semibold text-center mb-8">Verify Your Email</h1>

      <div class="flex items-center justify-center mb-6" v-if="isLoading">
        <div class="spinner"></div>
      </div>

      <div class="flex items-center justify-center mb-6 font-bold" v-if="!isLoading">
        <img src="https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExazEwOXd1cjV6a2R0YXBnem5xMDl0d2Vlb3h5dDl2OWdjd2QxMXpycyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/zZeaS8hWEEp5Tligy5/giphy.gif" alt="">
      </div>

      <div class="flex items-center justify-center text-green-500 mt-12 font-bold" v-if="!isLoading">
        <p>Verification successful. Redirecting you now..</p>
      </div>

      <div class="text-center" v-if="result !== null">
        <p>{{ result }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Loading spinner styles */
.spinner {
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: #4299e1;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
