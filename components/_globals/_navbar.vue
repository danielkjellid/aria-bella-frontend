<template>
  <div>
    <BaseNotification
      :display="notification"
      :success="true"
      :title="notification"
      @close-notification="resetNotification"
    />
    <BaseNotification
      :display="errorNotification"
      :success="false"
      :title="errorNotification"
      @close-notification="resetErrorNotification"
    />
    <header :class="!renderNavbarTransparent ? 'relative' : 'absolute left-0 right-0'" v-click-outside="hideFlyoutMenu">
      <!-- color of navbar content is rended according to route meta -->
      <!-- this is because we want to render a transparent bar and white text over pages where there is an image on top -->
      <div class="relative z-10" :class="!renderNavbarTransparent ? 'bg-white shadow' : ( flyoutMenuActive ? 'bg-white shadow' : 'navbar-blur')">
        <transition name="home">
          <p v-show="flyoutMenuActive" class="z-50 text-red-900">Test</p>
        </transition>
        <div style="max-width: 1600px;" class="sm:py-4 sm:px-8 px-5 py-5 mx-auto">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <div>
                <nuxt-link to="/">
                  <svg class="w-12 h-12" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 377.947 377.947">
                    <path d="M189.037 374.166c-102.117 0-185.196-83.08-185.196-185.197S86.92 3.773 189.037 3.773c102.118 0 185.198 83.079 185.198 185.196 0 102.118-83.08 185.197-185.198 185.197" fill="#231f20"/>
                    <path d="M169.832 237.967c-9.988 0-19.052-4-26.333-11.804-10.318-10.859-11.548-32.584-2.744-48.427 4.725-8.33 13.597-14.243 23.733-15.816 9.487-1.47 18.607 1.097 25.027 7.045 3.15 2.922 8.437 9.78 8.437 22.899 0 1.753-.113 2.835-.117 2.88l-.151 1.53h-52.213l-.171 1.267a51.03 51.03 0 00-.11 3.32c0 7.948 2.018 14.582 5.838 19.182 7.932 9.549 22.848 10.572 32.685 6.042 3.628-1.673 7.843-5.352 8.651-6.072l2.86-2.601v11.175l-.577.513c-.915.776-5.566 4.593-10.675 6.359-4.85 1.678-9.59 2.508-14.14 2.508zm-22.327-51.108h40.258c-.27-2.107-1.206-5.991-4.408-9.851-3.063-3.695-7.35-5.837-12.398-6.199-5.99-.436-12.34 1.808-16.98 5.994-3.44 3.126-5.637 7.662-6.472 10.056M89.668 237.932c-.411 0-.82-.008-1.231-.024-8.554-.33-16.23-4.08-22.202-10.844-6.428-7.123-6.928-18.907-6.928-22.348v-66.595h9.763v32.594a34.986 34.986 0 019.88-6.255c14.99-6.23 29.767-2.864 38.567 8.779l-.002.001c11.158 14.94 9.583 41.804-3.163 54.279-6.863 6.66-15.797 10.413-24.684 10.413zm3.873-67.38c-3.391 0-6.952.78-10.53 2.377-13.782 6.152-13.94 16.156-13.94 16.579v14.423c0 1.865.231 11.438 4.814 16.762 4.25 5.038 9.68 7.82 15.705 8.051 6.588.244 13.344-2.599 18.504-7.833 4.768-4.891 7.615-13.27 7.615-22.412 0-7.422-1.957-14.419-5.369-19.199-4.145-5.739-10.142-8.748-16.8-8.748M212.105 235.741v-97.62h10.024v97.616l-10.024.004M238.835 235.741v-97.62h10.024v97.616l-10.024.004M284.813 237.868c-6.612 0-13.492-1.952-18.278-7.033-3.695-3.94-5.731-9.104-5.731-14.542 0-.42.016-.869.045-1.37.372-5.716 2.955-10.818 7.268-14.367 4.394-3.608 13.331-5.937 21.974-8.19 6.468-1.683 17.289-4.503 17.289-6.745v-1.745c0-1.597-.321-5.695-3.31-9.225-3.013-3.328-5.93-4.51-11.142-4.51-7.935 0-18.223 4.47-21.072 6.099l-2.568 1.464.097-10.06.991-.445c6.76-3.051 13.99-4.998 20.355-5.484 8.346-.639 15.284 1.746 20.088 6.902 5.381 5.826 6.072 12.482 6.072 17.628v49.496h-8.327l-1.184-7.85c-2.02 2.556-4.596 4.716-7.663 6.428-3.782 2.12-9.245 3.548-14.904 3.549zm22.567-41.741c-2.123.837-5.439 1.784-10.69 3.202-8.057 2.172-18.065 4.872-21.682 7.823-2.884 2.361-4.579 5.697-4.65 9.152v.225c0 3.224 1.378 6.218 3.878 8.43 4.433 3.898 11.201 4.037 16.056 2.862 6.9-1.696 11.837-6.201 14.673-13.388 2.247-5.693 2.422-11.344 2.422-12.94 0-.161-.003-.286-.004-.373l-.003-.108v-4.885" fill="#fff"/>
                  </svg>
                </nuxt-link>
              </div>
              <!-- navigation from lg breakpoint and above -->
              <nav class="lg:block hidden ml-5">
                <!-- button to toggle the flyout meunu -->
                <BaseButton
                  @click="flyoutMenuActive = !flyoutMenuActive"
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
                    <svg viewBox="0 0 20 20" fill="currentColor" class="w-6 h-6 mt-px ml-1" :class="{'text-gray-500 hover:fill-current' : !renderNavbarTransparent}">
                      <path fill-rule="evenodd" :d="renderChevronPath" clip-rule="evenodd"></path>
                    </svg>
                  </transition>
                </BaseButton>
                <!-- commented out as the links are not functional yet -->
                <!-- <nuxt-link to="/kjokken" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Inspirasjon</nuxt-link> -->
                <!-- <nuxt-link to="/tegnetime" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Tegnetime</nuxt-link> -->
                <!-- <nuxt-link to="/om-oss" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Om oss</nuxt-link> -->
                <!-- <nuxt-link to="/tilbud" :class="renderNavbarLinkClasses" :active-class="renderNavbarLinkActiveClasses" class="ml-4">Tilbud</nuxt-link> -->
              </nav>
            </div>
            <div class="flex items-center">
              <!-- user menu, if not authenticated the button will redirect you to the login page -->
              <div v-click-outside="hideUserMenu" class="relative mr-3">
                <div class="flex items-center">
                  <BaseButton aria-label="Open user menu" @click="openUserMenuOrRedirect" icon plain :light="renderNavbarIconLight">
                    <div v-if="user && user != undefined" :style="`background-color: ${user.avatar_color}`" class="flex items-center justify-center w-10 h-10 rounded-full">
                      <span class="text-sm text-white">{{ user.initial }}</span>
                    </div>
                    <div v-else>
                      <BaseIcon name="user" height="h-6" width="w-6" fill="text-white" />
                    </div>
                  </BaseButton>
                </div>
                <transition
                  enter-class="transform scale-95 opacity-0"
                  enter-active-class="transition duration-200 ease-out"
                  enter-to-class="ransform scale-100 opacity-100"
                  leave-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-to-class="transform scale-95 opacity-0"
                >
                  <div v-show="userMenuActive" class="absolute right-0 min-w-full mt-2 origin-top-right bg-white rounded shadow">
                    <div class="w-full px-5 py-5 border-b border-gray-200">
                      <div class="flex items-center">
                        <div class="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-gray-400 rounded-full">
                          <BaseIcon name="user" fill="text-gray-500" />
                        </div>
                        <div v-if="user" class="ml-3">
                          <div class="text-sm font-semibold leading-6 text-gray-800">{{ user.full_name }}</div>
                          <div class="text-xs font-semibold leading-5 text-gray-600">{{ user.email }}</div>
                        </div>
                      </div>
                    </div>
                    <div class="px-5 py-3" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                      <!-- <nuxt-link to="#" class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-900">Din konto</nuxt-link>
                      <nuxt-link to="#" class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-900">Innstillinger</nuxt-link> -->
                      <button @click="logOut" class="hover:text-gray-600 block py-2 text-sm leading-6 text-gray-900">Logg ut</button>
                    </div>
                  </div>
                </transition>
              </div>
              <!-- cart commented out as its not functional yet -->
              <!-- link and icon to cart -->
              <!-- <BaseButton to="/" icon plain :light="renderNavbarIconLight" class="lg:mr-0 flex items-center mr-3">
                <BaseIcon name="shopping-bag" height="h-6" width="w-6"/>
                 <span class="ml-1 text-sm font-semibold" :class="!renderNavbarTransparent ? 'text-gray-600' : 'text-gray-400'">0</span>
              </BaseButton> -->
              <!-- menu button for md screens and bellow -->
              <BaseButton @click="mobileMenuActive = true" plain icon :light="renderNavbarIconLight" class="lg:hidden">
                <BaseIcon name="menu" height="h-6" width="w-6" />
              </BaseButton>
            </div>
          </div>
        </div>
      </div>
      <!-- flyoutmenu component -->
      <TransformFadeIn>
        <FlyoutMenu v-show="flyoutMenuActive" key="flyout-menu" @close-menu="flyoutMenuActive = false" :menuItems="menuItems" />
      </TransformFadeIn>

      <!-- mobile menu component -->
      <TransformSlideFromRight>
        <MobileMenu v-show="mobileMenuActive" key="mobile-menu" @close-menu="mobileMenuActive = false" :menuItems="menuItems" />
      </TransformSlideFromRight>
    </header>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useRouter, useStore } from '@nuxtjs/composition-api'
import TransformFadeIn from '~/components/transform/fade-in.vue'
import TransformSlideFromRight from '~/components/transform/slide-from-right.vue'
import MobileMenu from '~/components/mobile-menu.vue'
import FlyoutMenu from '~/components/flyout-menu.vue'

export default defineComponent({
  name: 'BaseNavbar',
  components: {
    MobileMenu,
    FlyoutMenu,
    TransformFadeIn,
    TransformSlideFromRight
  },
  setup() {

    /**************
    ** Utilities **
    **************/

    // bridge to router, route and store
    const store = useStore()
    const router = useRouter()

    /***********************
    ** Component specific **
    ***********************/

    let mobileMenuActive = ref<boolean>(false)
    let flyoutMenuActive = ref<boolean>(false)

    // set the menu items in the catalog dropdown
    // fetched from the API
    const menuItems = computed(() => {
      return store.getters['inventory/getNavbarCategories']
    })

    // render the navbar background and color of content accordingly based on route meta
    const renderNavbarTransparent = computed(() => {
      return store.getters['common/getRenderNavbarTransparent']
    })

    // render classes of links according to the route meta
    const renderNavbarLinkClasses = computed(() => {
      if (!renderNavbarTransparent.value || flyoutMenuActive.value) return 'hover:text-gray-600 leading-8 text-gray-800 transition duration-150 ease-in-out'

      return 'text-white leading-8 transition duration-150 ease-in-out hover:text-gray-200'
    })

    // set active links according to route meta
    const renderNavbarLinkActiveClasses = computed(() => {
      if (! renderNavbarTransparent.value || flyoutMenuActive.value) return 'text-gray-900'

      return 'active-pale-link'
    })

    const renderNavbarIconLight = computed(() => {
      if (!renderNavbarTransparent.value) return false
      if (flyoutMenuActive.value) return false

      return true
    })

    const renderChevronPath = computed(() => {
      if (flyoutMenuActive.value) return 'M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z'

      return 'M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z'
    })

    const toggleFlyoutMenu = () => {
      flyoutMenuActive.value = !flyoutMenuActive.value
    }

    const hideFlyoutMenu = (): void => {
      if (flyoutMenuActive.value) flyoutMenuActive.value = false
    }

    /******************
    ** User and auth **
    ******************/

    let userMenuActive = ref<boolean>(false)

    // get current user logged into application
    const user = computed(() => store.getters['auth/getCurrentUser'])

    // property that holds if the user is authenticated
    // used to show sub user menu or redirect user to login page
    const userIsAuthenticated = computed(() => {
      store.getters['auth/getIsAuthenticated']
    })

    const hideUserMenu = (): void => {
      if (userMenuActive.value) userMenuActive.value = false
    }

    // check if the user is autheticated and open the menu or redirect to login accordingly
    const openUserMenuOrRedirect = (): void => {
      if (user.value) {
        flyoutMenuActive.value = false
        userMenuActive.value = !userMenuActive.value
      } else {
        router.push('/account/log-in/')
      }
    }

    const logOut = (): void => {
      store.dispatch('common/resetNotification')
      store.dispatch('common/resetErrorNotification')
      store.dispatch('auth/logOut')
      userMenuActive.value = false
      store.dispatch('common/setNotification', 'Logget ut suksessfullt!')
    }

    /******************
    ** Notifications **
    ******************/

    const notification = computed(() => {
      return store.getters['common/getNotification']
    })

    const errorNotification = computed(() => {
      return store.getters['common/getErrorNotification']
    })

    const resetNotification = () => {
      if (notification) {
        return store.dispatch('common/resetNotification')
      }
    }

    const resetErrorNotification = () => {
      if (errorNotification) {
        return store.dispatch('common/resetErrorNotification')
      }
    }

    return {
      mobileMenuActive,
      flyoutMenuActive,
      menuItems,
      renderNavbarTransparent,
      renderNavbarLinkClasses,
      renderNavbarLinkActiveClasses,
      renderNavbarIconLight,
      renderChevronPath,
      toggleFlyoutMenu,
      hideFlyoutMenu,
      userMenuActive,
      user,
      userIsAuthenticated,
      hideUserMenu,
      openUserMenuOrRedirect,
      logOut,
      notification,
      errorNotification,
      resetNotification,
      resetErrorNotification,
    }
  },
})
</script>

<style scoped>
.slide-in-enter-active {
  animation: slide-in-right 0.4s linear;
}

.slide-in-leave-active {
  animation: slide-in-right 0.4s linear reverse;
}

@keyframes slide-in-right {
  from {
    margin-left: 100%;
  }
  to {
    margin-left: 0%;
  }
}

.active-pale-link {
  color: #ffffff !important;
}

.navbar-blur {
  background-color: rgba(145, 146, 140, 0.3);
 -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
}
</style>
