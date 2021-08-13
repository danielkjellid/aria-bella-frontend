<template>
  <div class="w-72 sticky top-0 bottom-0 left-0 flex flex-col flex-none h-screen">
    <div class="relative flex flex-col flex-grow pt-8 pb-4 overflow-y-auto bg-gray-100">
      <div class="flex items-center flex-shrink-0 px-10">
        <svg class="w-8 h-8 text-gray-800" viewBox="0 0 308.48 308.48">
          <path stroke-width=".32" d="m0 154.24v-154.24h308.48v86.4h-222.08v23.36h109.63l2.6933 2.7442v83.523l-2.7442 2.6933h-109.58v109.76h-86.4zm112.64 111.04v-43.2h83.2v86.4h-83.2zm109.44 0v-43.2h86.4v86.4h-86.4zm0-111.04v-41.6h86.4v83.2h-86.4z" fill="currentColor"/>
        </svg>
      </div>
      <div class="flex flex-col flex-grow mt-8">
        <nav class="flex-1 space-y-1">
          <div>
            <nuxt-link
              to="/backend/overview"
              class="hover:bg-gray-200 flex items-center justify-between w-full px-10 py-2 text-sm font-semibold text-gray-800"
            >
              Hjem
              <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </nuxt-link>
          </div>
          <div class="space-y-1">
            <nuxt-link
              to="/backend/users"
              class="hover:bg-gray-200 flex items-center justify-between w-full px-10 py-2 text-sm font-semibold text-gray-800"
            >
              Brukere
              <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
              </svg>
            </nuxt-link>
          </div>
          <div class="space-y-1">
            <button @click="inventoryMenuOpen = !inventoryMenuOpen" class="hover:bg-gray-200 flex items-center justify-between w-full px-10 py-2 text-sm font-semibold text-gray-800">
              Inventar
              <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path v-if="inventoryMenuOpen" fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                <path v-else fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div v-show="inventoryMenuOpen" class="space-y-1">
              <nuxt-link
                to="/backend/inventory/products/"
                class="hover:bg-gray-200 group flex items-center w-full px-10 py-2 text-sm text-gray-700"
                active-class="font-semibold text-blue-600 bg-gray-200"
              >Produkter
              </nuxt-link>
              <nuxt-link
                to="/backend/overview/"
                class="hover:bg-gray-200 group flex items-center w-full px-10 py-2 text-sm text-gray-700"
                active-class="font-semibold text-blue-600 bg-gray-200"
              >Forespørsler
              </nuxt-link>
              <nuxt-link
                to="/backend/overview/1"
                class="hover:bg-gray-200 group flex items-center w-full px-10 py-2 text-sm text-gray-700"
                active-class="font-semibold text-blue-600 bg-gray-200"
              >Discounts
              </nuxt-link>
            </div>
          </div>
          <div class="space-y-1">
            <button @click="marketingMenuOpen = !marketingMenuOpen" class="hover:bg-gray-200 flex items-center justify-between w-full px-10 py-2 text-sm font-semibold text-gray-800">
              Markedsføring
              <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path v-if="marketingMenuOpen" fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                <path v-else fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div v-show="marketingMenuOpen" class="space-y-1">
              <nuxt-link
                to="/backend/inventory/products/"
                class="hover:bg-gray-200 group flex items-center w-full px-10 py-2 text-sm text-gray-700"
                active-class="font-semibold text-blue-600 bg-gray-200"
              >Produkter
              </nuxt-link>
              <nuxt-link
                to="/backend/overview/"
                class="hover:bg-gray-200 group flex items-center w-full px-10 py-2 text-sm text-gray-700"
                active-class="font-semibold text-blue-600 bg-gray-200"
              >Forespørsler
              </nuxt-link>
              <nuxt-link
                to="/backend/overview/1"
                class="hover:bg-gray-200 group flex items-center w-full px-10 py-2 text-sm text-gray-700"
                active-class="font-semibold text-blue-600 bg-gray-200"
              >Discounts
              </nuxt-link>
            </div>
          </div>
          <div class="space-y-1">
            <button @click="administrativeMenuOpen = !administrativeMenuOpen" class="hover:bg-gray-200 flex items-center justify-between w-full px-10 py-2 text-sm font-semibold text-gray-800">
              Administrativt
              <svg class="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path v-if="administrativeMenuOpen" fill-rule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clip-rule="evenodd" />
                <path v-else fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div v-show="administrativeMenuOpen" class="space-y-1">
              <nuxt-link
                to="/backend/inventory/products/"
                class="hover:bg-gray-200 group flex items-center w-full px-10 py-2 text-sm text-gray-700"
                active-class="font-semibold text-blue-600 bg-gray-200"
              >Produkter
              </nuxt-link>
              <nuxt-link
                to="/backend/overview/"
                class="hover:bg-gray-200 group flex items-center w-full px-10 py-2 text-sm text-gray-700"
                active-class="font-semibold text-blue-600 bg-gray-200"
              >Forespørsler
              </nuxt-link>
              <nuxt-link
                to="/backend/overview/1"
                class="hover:bg-gray-200 group flex items-center w-full px-10 py-2 text-sm text-gray-700"
                active-class="font-semibold text-blue-600 bg-gray-200"
              >Discounts
              </nuxt-link>
            </div>
          </div>
        </nav>
      </div>
      <button v-if="currentUser && currentUser != undefined" v-click-outside="hideRequestUserMenu" @click="requestUserMenuOpen = !requestUserMenuOpen" class="hover:bg-gray-200 absolute bottom-0 left-0 right-0 w-full px-10 py-3 mb-16">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div :style="`background-color: ${currentUser.avatar_color}`" class="flex items-center justify-center w-10 h-10 rounded-full">
              <span class="text-sm text-white">{{ currentUser.initial }}</span>
            </div>
            <p class="ml-3 text-sm font-semibold text-gray-800">{{ currentUser.full_name }}</p>
          </div>
          <button>
            <svg class="w-5 h-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
            </svg>
          </button>
        </div>
      </button>
      <TransformFadeIn>
        <div v-show="requestUserMenuOpen" class="absolute bottom-0 left-0 right-0 px-5 mb-32">
          <div class="py-2 bg-white rounded-md shadow">
            <nuxt-link to="/" class="hover:bg-gray-200 flex items-center px-4 py-3 text-sm text-gray-700">
              <svg class="w-5 h-5 mr-3 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Gå til front
            </nuxt-link>
            <button @click="logOut" class="hover:bg-gray-200 flex items-center w-full px-4 py-3 text-sm text-red-600">
              <svg class="w-5 h-5 mr-3 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logg ut
            </button>
          </div>
        </div>
      </TransformFadeIn>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useStore, useRoute, useRouter } from '@nuxtjs/composition-api'
import TransformFadeIn from '~/components/transform/fade-in.vue'

export default defineComponent({
  name: 'AdminSidebar',
  components: {
    TransformFadeIn
  },
  setup() {

    /**********
    ** Utils **
    **********/

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    /******************
    ** User and auth **
    ******************/

    let requestUserMenuOpen: boolean = false

    const currentUser = computed(() => {
      return store.getters['auth/getCurrentUser']
    })

    const hideRequestUserMenu = (): void => {
      requestUserMenuOpen = false
    }

    const logOut = (): void => {
      store.dispatch('auth/logOut')
      // redirect to home
      router.push('/')
      store.dispatch('common/setNotification', 'Logget ut suksessfullt!')
    }

    /**************
    ** Inventory **
    **************/

    let inventoryMenuOpen: boolean = route.value.fullPath.includes('inventory')

    /**************
    ** Marketing **
    **************/

    let marketingMenuOpen: boolean = false

    /*******************
    ** Administrative **
    *******************/

    let administrativeMenuOpen: boolean = false

    return {
      requestUserMenuOpen,
      currentUser,
      hideRequestUserMenu,
      logOut,
      inventoryMenuOpen,
      marketingMenuOpen,
      administrativeMenuOpen
    }
  }
})
</script>
