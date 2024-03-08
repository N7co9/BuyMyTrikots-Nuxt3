<script setup>
import {
  CreditCardIcon,
  FingerPrintIcon,
  UserCircleIcon,
  CheckCircleIcon,
  XMarkIcon
} from '@heroicons/vue/24/outline'
import {HomeIcon} from "@heroicons/vue/24/outline/index.js";
import useUpdateUsername from '~/composables/settings/username/useUpdateUsername.ts'
import useUpdateEmail from '~/composables/settings/email/useUpdateEmail.ts'
import {useState} from "nuxt/app";
import {ref} from 'vue';

const showAlert = ref(false);
const showUsernameModal = ref(false);
const showEmailModal = ref(false);

const {newUsername, usernameResponseMessage, submitUsernameForm} = useUpdateUsername()
const {newEmail, emailResponse, submitEmailForm} = useUpdateEmail()
import {refreshPage} from "~/composables/refresh/useSlowRefresh.ts";


const closeAlert = () => {
  showAlert.value = false;
};
const openAlert = () => {
  showAlert.value = true;
};

const openUsernameModal = () => {
  showUsernameModal.value = true;
};

const closeUsernameModal = () => {
  showUsernameModal.value = false;
};
const saveUsername = async () => {
  await submitUsernameForm()
  if (usernameResponseMessage.value.response.type === 'OK') {
    await refreshPage()
  }
};

const openEmailModal = () => {
  showEmailModal.value = true;
};

const closeEmailModal = () => {
  showEmailModal.value = false;
};
const saveEmail = async () => {
  await submitEmailForm();
  setTimeout(() => {
    if (emailResponse.value.sent) {
      openAlert();
      closeEmailModal();
    }
  }, 1000);
};


const user = useState('user').value
const accessToken = useCookie('token').value

definePageMeta({
  layout: 'settings-layout'
})

const secondaryNavigation = [
  {name: 'General', href: '#', icon: UserCircleIcon, current: true},
  {name: 'Security', href: '/user/settings/security', icon: FingerPrintIcon, current: false},
  {name: 'Billing', href: '/user/settings/billing', icon: CreditCardIcon, current: false},
  {name: 'Home', href: '/', icon: HomeIcon, current: false},
]

</script>
<template>
  <div class="mx-auto max-w-7xl pt-16 lg:flex lg:gap-x-16 lg:px-8">
    <h1 class="sr-only">General Settings</h1>

    <aside
        class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-20">
      <nav class="flex-none px-4 sm:px-6 lg:px-0">
        <ul role="list" class="flex gap-x-3 gap-y-1 whitespace-nowrap lg:flex-col">
          <li v-for="item in secondaryNavigation" :key="item.name">
            <a :href="item.href"
               :class="[item.current ? 'bg-gray-50 text-indigo-600' : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50', 'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm leading-6 font-semibold']">
              <component :is="item.icon"
                         :class="[item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600', 'h-6 w-6 shrink-0']"
                         aria-hidden="true"/>
              {{ item.name }}
            </a>
          </li>
        </ul>
      </nav>
    </aside>

    <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-20">
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Profile</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">This information will be displayed publicly so be careful what
            you share.</p>

          <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Username</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.username }}</div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500"
                        @click="openUsernameModal">Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Email address</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.email }}</div>
                <button type="button" class="font-semibold text-indigo-600 hover:text-indigo-500"
                        @click="openEmailModal">
                  Update
                </button>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">Role</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.roles }}</div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
      <div class="mx-auto max-w-2xl space-y-16 sm:space-y-20 lg:mx-0 lg:max-w-none py-24">
        <div>
          <h2 class="text-base font-semibold leading-7 text-gray-900">Private Information</h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Do not share this Information with anyone.
          </p>

          <dl class="mt-6 space-y-6 divide-y divide-gray-100 border-t border-gray-200 text-sm leading-6">
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">verification_token</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.verificationToken }}</div>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">is_verified</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.isVerified }}</div>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">password_hash</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.password }}</div>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">user_id</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ user.id }}</div>
              </dd>
            </div>
            <div class="pt-6 sm:flex">
              <dt class="font-medium text-gray-900 sm:w-64 sm:flex-none sm:pr-6">assigned_apitoken</dt>
              <dd class="mt-1 flex justify-between gap-x-6 sm:mt-0 sm:flex-auto">
                <div class="text-gray-900">{{ accessToken }}</div>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  </div>

  <!---- MODALS GO HERE BRR !-->

  <div v-if="showUsernameModal"
       class="fixed inset-0 overflow-y-auto flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
      <div class="p-8">
        <div class="justify-center flex font-bold">
          <h1>Update your Username</h1>
        </div>
        <div class="border mt-4">
        </div>
        <div class="justify-center flex drop-shadow-2xl">
          <img
              src="https://media0.giphy.com/media/pkKAGYc7AWxwYiqidq/giphy.gif?cid=ecf05e47rjc0yuf6dp4g1zd4jqn8xq3s0d0urnp7dcvualc0&ep=v1_gifs_related&rid=giphy.gif&ct=s"
              alt="">
        </div>
        <form @submit.prevent="saveUsername">
          <div class="mb-6 relative">
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                    <span class="text-gray-500">👤</span>
            </span>
            <input type="text" v-model="newUsername" placeholder="MyNewUsername123" required
                   class="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div v-if="usernameResponseMessage?.response?.type === 'Exception'"
               class="text-red-500 font-bold text-center mb-6">
            <p>{{ usernameResponseMessage.response.message }}</p>
          </div>
          <div v-if="usernameResponseMessage?.response?.type === 'OK'" class="text-green-500 font-bold">
            <p>
              {{ usernameResponseMessage.response.message }}</p>
          </div>
          <div class="flex justify-center">
            <button type="button" @click="saveUsername"
                    class="w-32 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
            <button type="button" @click="closeUsernameModal"
                    class="ml-4 w-32 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>


  <!---- EMAIL MODAL WHOhAAA !-->

  <div v-if="showEmailModal"
       class="fixed inset-0 overflow-y-auto flex justify-center items-center bg-gray-900 bg-opacity-50">
    <div class="bg-white rounded-lg overflow-hidden shadow-xl max-w-lg w-full">
      <div class="p-8">
        <div class="justify-center flex font-bold">
          <h1>Update your E-Mail Address</h1>
        </div>
        <div class="border mt-4">
        </div>
        <div class="justify-center flex drop-shadow-2xl">
          <img
              src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGg5NmdtdzV2NjNycnVza2R2OXF6dGluczRtbTdsb2phMWV1dnBrZiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/sUvXqhA9nukbIM0MyO/giphy.gif"
              alt="">
        </div>
        <form @submit.prevent="saveEmail">
          <div class="mb-6 relative"> <!-- relative position for the icon wrapper -->
            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
          <!-- Replace this span with your actual icon -->
          <span class="text-gray-500">📧</span>
        </span>
            <input type="email" autocomplete="email" v-model="newEmail" placeholder="John@Doe.com" required
                   class="block w-full p-3 pl-10 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500">
          </div>
          <div v-if="emailResponse.sent === false" class="text-red-500 font-bold text-center mb-6">
            <p>An error occurred.</p>
          </div>
          <div class="flex justify-center">
            <button type="submit" :disabled="loading"
                    class="w-32 py-3 px-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Save
            </button>
            <button type="button" @click="closeEmailModal"
                    class="ml-4 w-32 py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-md bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>


  <!---- ALLLEEERRRTTT !-->

  <div v-if="showAlert" class="flex justify-center items-center">
    <div class="rounded-md bg-green-50 p-4 w-1/2">
      <div class="flex">
        <div class="flex-shrink-0">
          <CheckCircleIcon class="h-5 w-5 text-green-400" aria-hidden="true"/>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium text-green-800">Verification Email has been sent!</p>
        </div>
        <div class="ml-auto pl-3">
          <div class="-mx-1.5 -my-1.5">
            <button @click.prevent="closeAlert" type="button"
                    class="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50">
              <span class="sr-only">Dismiss</span>
              <XMarkIcon class="h-5 w-5" aria-hidden="true"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
