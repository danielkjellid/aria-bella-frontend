<template>
  <div class="fixed inset-0 z-50 overflow-y-auto">
    <div class="relative min-h-screen bg-white">
      <div class="h-full px-5 pt-5" :class="collapsedUserMenuActive ? 'pb-56' : 'pb-24'">
        <div class="flex items-center justify-between">
          <div class="text-center">
            <p class="text-base leading-6 text-gray-900">Meny</p>
          </div>
          <button @click="closeMobileMenu" class="hover:text-gray-800 w-5 h-5 text-gray-600">
            <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <nav class="mt-5">
          <div>
            <!-- product dropdown listing all categories and subcategories -->
            <BaseButton
              @click="catalogMenuActive = !catalogMenuActive"
              plain
              :class="renderNavbarLinkClasses"
              class="flex items-center"
            >
              Katalog
              <transition
                enter-class="-translate-y-1 opacity-0"
                enter-active-class="transition duration-200 ease-out"
                enter-to-class="translate-y-0 opacity-100"
                leave-class="translate-y-0 opacity-100"
                leave-active-class="transition duration-150 ease-in"
                leave-to-class="-translate-y-1 opacity-0"
              >
                <svg viewBox="0 0 20 20" fill="currentColor" class=" w-6 h-6 mt-px ml-1'text-gray-500 hover:fill-current">
                  <path fill-rule="evenodd" :d="renderChevronPath" clip-rule="evenodd"></path>
                </svg>
              </transition>
            </BaseButton>
            <transition
              enter-class="-translate-y-1 opacity-0"
              enter-active-class="transition duration-200 ease-out"
              enter-to-class="translate-y-0 opacity-100"
              leave-class="translate-y-0 opacity-100"
              leave-active-class="transition duration-150 ease-in"
              leave-to-class="-translate-y-1 opacity-0"
            >
              <!-- display dropdown menu accoring to state -->
              <div v-show="catalogMenuActive">
                <!-- loop through prop and set title and subcontent accordingly -->
                <div class="mt-6" v-for="menuItem in menuItems" :key="menuItem.id">
                  <h3 class="text-xs font-semibold leading-4 tracking-wide text-gray-500 uppercase">
                    {{ menuItem.name }}
                  </h3>
                  <div>
                    <nuxt-link
                      v-for="child in menuItem.children"
                      :key="child.id" :to="`/kategori/${menuItem.slug}/?subcategory=${child.slug}`"
                      class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-700"
                    >
                      {{ child.name }}
                    </nuxt-link>
                  </div>
                </div>
              </div>
            </transition>
          </div>
          <!-- <nuxt-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Inspirasjon</nuxt-link>
          <nuxt-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Tegnetime</nuxt-link>
          <nuxt-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Om oss</nuxt-link>
          <nuxt-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Tilbud</nuxt-link> -->

        </nav>
      </div>
      <!-- footer that displays usermenu -->
      <!-- if the user is not authenticated, they will be redirected to login upon click -->
      <div v-if="user" @click="collapsedUserMenuActive = !collapsedUserMenuActive" class="absolute bottom-0 left-0 right-0 px-5 py-5 bg-white border-t border-gray-200">
        <BaseButton plain class="hover:text-gray-600 flex items-center justify-between w-full text-left text-gray-500">
          <div class="flex items-center">
            <div v-if="user && user != undefined" :style="`background-color: ${user.avatar_color}`" class="flex items-center justify-center w-10 h-10 rounded-full">
              <span class="text-sm text-white">{{ user.initial }}</span>
            </div>
            <div class="ml-3">
              <div class="text-sm font-semibold leading-6 text-gray-800">{{ user.full_name }}</div>
              <div class="text-sm leading-5 text-gray-600">{{ user.email }}</div>
            </div>
          </div>
          <BaseIcon name="chevron-down" solid />
        </BaseButton>
        <div v-show="collapsedUserMenuActive" class="mt-5">
          <!-- <nuxt-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Din konto</nuxt-link>
          <nuxt-link to="/" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Innstillinger</nuxt-link> -->
          <button @click="logOut" class="hover:text-gray-600 block mt-4 text-base leading-7 text-gray-900">Logg ut</button>
        </div>
      </div>
      <div v-else class="absolute bottom-0 left-0 right-0 px-5 py-5 bg-white border-t border-gray-200">
        <BaseButton @click="redirectToLogin" plain class="hover:text-gray-600 flex items-center text-base leading-7 text-gray-900">
          <BaseIcon name="user" class="mr-2" />
          Logg inn
        </BaseButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useStore, useRouter, defineComponent, computed, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    menuItems: {
      required: true,
    }
  },
  setup(props, { emit }) {

    // bridge to vuex store and router
    const store = useStore()
    const router = useRouter()

    let catalogMenuActive = ref<boolean>(false)

    // emit to parent click event and close dropdown
    const closeMobileMenu = (): void => {
      catalogMenuActive.value = false
      emit('close-menu')
    }

    // get current user logged into application
    const user = computed(() => store.getters['auth/getCurrentUser'])

    let collapsedUserMenuActive = ref<boolean>(false)

    const logOut = (): void => {
      store.dispatch('common/resetNotification')
      store.dispatch('common/resetErrorNotification')
      collapsedUserMenuActive.value = false
      store.dispatch('auth/logOut')
      router.go(0) // refresh current page
      store.dispatch('common/setNotification', 'Logget ut suksessfullt!')
    }

    // render classes of links
    const renderNavbarLinkClasses = computed(() => {
      return 'hover:text-gray-600 block leading-8 text-gray-800 transition duration-150 ease-in-out'
    })

    // render active links
    const renderNavbarLinkActiveClasses = computed(() => {
      return 'text-gray-900'
    })

    const renderChevronPath = computed(() => {
      if (catalogMenuActive.value) return 'M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'

      return 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
    })

    // redirect user to login page
    const redirectToLogin = (): void => {
      router.push('/account/log-in/')
    }

    return {
      catalogMenuActive,
      collapsedUserMenuActive,
      user,
      logOut,
      renderNavbarLinkClasses,
      renderNavbarLinkActiveClasses,
      renderChevronPath,
      closeMobileMenu,
      redirectToLogin
    }
  },
})
</script>
