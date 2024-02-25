<script setup lang="ts">
definePageMeta({
  layout: 'registration-layout'
})

import useRegistration from '~/composables/user/useRegistration';
const { username, email, password, errorMessage, submitForm } = useRegistration()
const formSubmitted = ref(false);
const handleSubmit = async () => {
  await submitForm();
  formSubmitted.value = true;
};
</script>

<template>
  <div class="flex justify-center bg-gradient-to-b from-lime-100">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <a href="/">
            <img class="drop-shadow-2xl -ml-3" src="../../assets/BMT-Logo.png" alt="Your Company" />
          </a>
          <h2 class="mt-2 text-2xl font-bold leading-9 flex justify-center tracking-tight text-gray-900">Create an account</h2>
          <p class="mt-2 flex justify-center text-sm leading-6 text-gray-500">
            Already a member?
            <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500 ml-2">Sign in here</a>
          </p>
        </div>

        <div class="mt-10">
          <div v-if="errorMessage.length > 0" v-for="error in errorMessage" :key="error.message" class="bg-red-500 text-white font-bold rounded-md py-2 px-4">
            <p>{{ error.message }}</p>
          </div>
          <div v-else-if="formSubmitted" class="bg-green-500 text-white font-bold rounded-md py-2 px-4">
            <p>Registration successful, you can log in <a href="/user/login">here</a> now.</p>
          </div>

          <div>
            <form @submit.prevent="handleSubmit" class="space-y-6">
              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Username</label>
                <div class="mt-2">
                  <input v-model="username" id="username" name="username" autocomplete="username" required="" class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                  <input v-model="email" id="email" name="email" type="email"  autocomplete="email" required="" class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>

              <div>
                <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                <div class="mt-2">
                  <input v-model="password" id="password" name="password" type="password" autocomplete="current-password" required="" class="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <input id="terms" name="terms" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                  <label for="terms" class="ml-3 block text-sm leading-6 text-gray-700">I agree to the <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">terms and conditions</a></label>
                </div>
              </div>
              <div>
                <button type="submit" class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Create Account</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
