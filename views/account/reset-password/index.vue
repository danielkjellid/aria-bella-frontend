<template>
  <AuthSidebarContent>
    <template #auth-heading>
      <h1 class="text-xl font-semibold text-gray-900">Har du glemt passordet ditt?</h1>
      <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
        Gi oss e-postadressen din, så sende vi deg instruksjoner for hvordan du kan sette et nytt!
      </div>
    </template>
    <template #auth-content>
      <form class="max-w-sm m-auto" @submit.prevent="sendResetEmail">
        <div>
          <BaseInput
            id="id_email"
            v-model="email"
            label="E-post"
            block
            type="email"
            :error="$errorMsg(errors.email)"
            @input="resetErrorMessage"
          />
        </div>
        <BaseButton type="submit" class="flex justify-center w-full mt-4">Nullstill passordet mitt</BaseButton>
      </form>
    </template>
  </AuthSidebarContent>
</template>

<script lang="ts">
import AuthSidebarContent from '~/components/auth-sidebar-content.vue'
import { defineComponent, useStore, computed, ref, useContext, useRouter } from '@nuxtjs/composition-api'
import $catchError from '~/mixins/catch-error'
import $errorMsg from '~/mixins/error-message'

export default defineComponent({
  name: 'ResetPassword',
  layout: 'auth',
  head: {
    title: 'Nullstill passord',
    meta: [
      {
        name: 'description',
        content: 'Nullstill passordet ditt hos oss'
      }
    ]
  },
  components: {
    AuthSidebarContent
  },
  setup() {

    const store = useStore()
    const router = useRouter()
    const { $axios} = useContext()

    let email = ref<string>('')
    let errors = ref<object | string>('')

    const sendResetEmail = async (): Promise<void> => {
      return await $axios.$post('users/password/reset/', {email: email.value})
        .then((): void => {
          // reset previous errors
          errors.value = {}
          store.dispatch('common/setNotification', 'E-post med nullstilling av passord sendt!')
          router.push('/account/reset-password/sendt/')
        })
        .catch(error => {
          errors.value = $catchError(error)
          store.dispatch('common/setErrorNotification', $catchError(error))

          // reset variables
          email.value = ''
        })
    }

    const errorMessage = computed(() => {
      return store.getters['auth/getAuthTemplateErrorMessage']
    })

    const resetErrorMessage = (): void => {
      if (errorMessage.value) {
        store.dispatch('common/resetErrorNotification')
      }

      if (errors.value) {
        errors.value = {}
      }
    }

    return {
      email,
      sendResetEmail,
      errors,
      $errorMsg,
      resetErrorMessage
    }
  }
})
</script>
