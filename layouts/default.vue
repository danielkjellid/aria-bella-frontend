<template>
  <div class="content relative min-h-screen">
    <div v-if="isDevEnvironment" class="dev-env-warning z-50 py-1 text-center">
      <span class="z-50 text-sm font-semibold text-yellow-900">Development environment</span>
    </div>
    <SiteMessage :display="confimedAccount == false">
      <div class="md:hidden flex-col">
        <span>Bekreft kontoen din gjennom e-posten vi har sendt deg. Ikke mottatt?</span>
        <BaseButton @click="sendNewVerificationEmail" plain class="hover:text-gray-700 sm:ml-0 ml-1 font-semibold underline">Send e-post</BaseButton>
      </div>
      <div class="md:block hidden">
        <span>{{ userFirstName }}, for å kunne gå videre må du bekrefte kontoen din ved å trykke på knappen i e-posten vi har sendt deg på {{ userEmail }}. Ikke mottatt e-post?</span>
        <BaseButton @click="sendNewVerificationEmail" plain class="hover:text-gray-900 ml-1 font-semibold underline">Send e-post på nytt</BaseButton>
      </div>
    </SiteMessage>
    <div>
      <BaseNavbar />
      <Nuxt class="relative min-h-screen" />
      <BaseFooter />
    </div>
    <div v-show="showMessage" class="sm:pb-5 fixed inset-x-0 bottom-0 pb-2">
      <div class="sm:px-6 lg:px-8 max-w-screen-xl px-2 mx-auto">
        <div class="sm:p-3 p-2 bg-white rounded-lg shadow-lg">
          <div class="flex flex-wrap items-center justify-between">
            <div class="flex items-center">
              <span class="bg-brand-100 flex p-2 rounded-lg">
                <svg class="text-brand-600 w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </span>
              <p class="ml-3 font-semibold text-gray-800">
                <span class="md:hidden">
                  Vi har lansert ny nettside!
                </span>
                <span class="md:flex md:items-center hidden">
                  Ny nettside! Masse spennende innhold kommer, så besøk oss gjerne igjen 😊
                </span>
              </p>
            </div>
            <div class="sm:order-3 sm:ml-2 flex-shrink-0 order-2">
              <button @click="hideMessage" type="button" class="hover:text-gray-600 flex p-2 -mr-1 text-gray-500 transition duration-150 ease-in-out rounded-md" aria-label="Dismiss">
                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useStore, ref } from '@nuxtjs/composition-api'
import SiteMessage from '@/components/site-message.vue'

export default defineComponent({
  name: 'Default',
  head: {
    title: 'Bella',
    titleTemplate: 'Bella fliser - %s',
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
    SiteMessage
  },
  setup() {

    /**********
    ** Utils **
    ***********/

    const store = useStore()

    /*******************
    ** Bottom message **
    *******************/

    let showMessage = ref<boolean>(false)

    if (process.browser) {
      showMessage.value = localStorage.getItem('show_message') ? JSON.parse(localStorage.getItem('show_message') as string) : true
    }

    const hideMessage = () => {
      showMessage.value = false

      if (process.browser) {
        localStorage.setItem('show_message', JSON.stringify(false))
      }
    }

    /*********
    ** Auth **
    *********/

    const currentUser = computed(() => store.getters['auth/getCurrentUser'])

    const confimedAccount = computed(() => store.getters['auth/getIsAccountVerifiedOrAnonymous'])

    const userEmail = computed(() => {
      if (currentUser.value) return currentUser.value.email

      return undefined
    })

    const userFirstName = computed(() => {
      if (currentUser.value) return currentUser.value.first_name

      return undefined
    })

    const sendNewVerificationEmail = () => {
      store.dispatch('auth/resendVerificationEmail')
    }

    /****************
    ** Development **
    ****************/

   const isDevEnvironment = computed(() => {
     if (process.env.NODE_ENV !== 'production') return true

     return false
   })

    return {
      showMessage,
      hideMessage,
      currentUser,
      confimedAccount,
      userEmail,
      userFirstName,
      sendNewVerificationEmail,
      isDevEnvironment
    }
  },
})
</script>

<style>
  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-Regular.otf');
    font-weight: 400;
    font-style: normal;
  }

  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-RegularItalic.otf');
    font-weight: 400;
    font-style: italic;
  }

  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-Book.otf');
    font-weight: 500;
    font-style: regular;
  }

  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-BookItalic.otf');
    font-weight: 500;
    font-style: Italic;
  }

  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-SemiBold.otf');
    font-weight: 600;
    font-style: regular;
  }

  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-SemiBoldItalic.otf');
    font-weight: 600;
    font-style: Italic;
  }

  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-Bold.otf');
    font-weight: 700;
    font-style: regular;
  }

  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-BoldItalic.otf');
    font-weight: 700;
    font-style: Italic;
  }

  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-Black.otf');
    font-weight: 900;
    font-style: regular;
  }

  @font-face {
    font-family: 'MessinaSans';
    src: url('./assets/fonts/MessinaSans-BlackItalic.otf');
    font-weight: 900;
    font-style: Italic;
  }

  .content {
    font-family: 'MessinaSans', serif;
  }
</style>

<style scoped>
  .dev-env-warning {
    background: repeating-linear-gradient(
      45deg,
      #FBBF24,
      #FBBF24 10px,
      #F59E0B 10px,
      #F59E0B 20px
    );
  }
</style>
