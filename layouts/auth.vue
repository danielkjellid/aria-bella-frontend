<template>
  <div>
    <BaseNotification
      :display="errorMessage"
      :success="false"
      title="Oida! Noe gikk galt"
      @close-notification="resetErrorMessage"
    />
    <BaseNotification
      :display="notification"
      :success="true"
      :title="notification"
      @close-notification="resetNotification"
    />
    <div :style="`background-image: url(${require('../assets/images/auth.jpg')});`" class="bg-center bg-no-repeat bg-cover">
      <div class="md:bg-transparent bg-white">
        <div class="md:m-0 lg:max-w-md max-w-sm min-h-screen px-5 py-6 m-auto bg-white">
          <nav class="absolute top-0 left-0 mt-5 ml-4">
            <router-link to="/" class="flex items-center text-sm font-semibold leading-5 text-gray-900">
              <svg class="flex-shrink-0 w-5 h-5 mr-1 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd"></path>
              </svg>
              Tilbake til
            </router-link>
          </nav>
          <div v-if="!currentUser" class="pt-20">
            <div v-if="navigableRoute" class="flex justify-center mb-8">
              <Tabs :tabs="tabs" />
            </div>
            <Nuxt />
          </div>
          <div v-else class="pt-20">
            <div class="mb-8 text-center">
              <h1 class="text-xl font-semibold text-gray-900">Velkommen tilbake!</h1>
              <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
                Du er allerede logget inn som {{ currentUser.full_name }} <button plain @click="logOut" class="ml-1 font-semibold text-gray-900 underline">Logg ut?</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useRoute, useRouter, useStore } from '@nuxtjs/composition-api'
import Tabs from '~/components/tabs.vue'

export default defineComponent({
  name: 'AuthTemplate',
  head: {
    title: 'Bella',
    titleTemplate: 'Bella - %s',
    htmlAttrs: {
      lang: 'no',
    },
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Bella er en familiedrevet flisebutikk med over 25 års erfaring. Velkommen!'
      }
    ]
  },
  components: {
    Tabs,
  },
  setup() {

    const store = useStore()
    const route = useRoute()
    const router = useRouter()

    const tabs = [
      { text: 'Logg inn', to: '/account/log-in/'},
      { text: 'Opprett konto', to: '/account/register/'},
    ]

    const navigableRoute = computed(() => {
      if (route.value.name === 'account-log-in' || route.value.name === 'account-register') return true

      return false
    })

    const currentUser = computed(() => {
      return store.getters['auth/getCurrentUser']
    })

    const logOut = () => {
      store.dispatch('auth/logOut')
      router.push({name: 'Index'})
    }

    const errorMessage = computed(() => {
      return store.getters['common/getErrorNotification']
    })

    const resetErrorMessage = () => {
      if (errorMessage.value) {
        store.dispatch('common/resetErrorNotification')
      }
    }

    const notification = computed(() => {
      return store.getters['common/getNotification']
    })

    const resetNotification = () => {
      if (notification.value) {
        store.dispatch('common/resetNotification')
      }
    }

    return {
      tabs,
      navigableRoute,
      currentUser,
      logOut,
      errorMessage,
      resetErrorMessage,
      notification,
      resetNotification
    }
  },
})
</script>
