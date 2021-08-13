<template>
  <AuthSidebarContent :errorMessage="errorMessage">
    <template #auth-heading>
      <h1 class="text-xl font-semibold text-gray-900">Skriv inn det nye passordet ditt</h1>
      <div class="flex items-center justify-center mt-1 text-sm text-gray-700">
        For sikkerhets skyld ber vi deg skrive inn det nye passordet ditt to ganger, slik at vi kan dobbelsjekke at du har skrevet det riktig.
      </div>
    </template>
    <template #auth-content>
      <form class="max-w-sm m-auto" @submit.prevent="resetPassword">
        <div>
          <BaseInput
            id="id_password"
            v-model="newPassword1"
            label="Nytt passord"
            block
            type="password"
            :error="$errorMsg(errors.new_password1)"
            @input="resetErrorMessage"
          />
        </div>
        <div class="mt-5">
          <BaseInput
            id="id_password2"
            v-model="newPassword2"
            label="Bekfreft nytt passord"
            block
            type="password"
            :error="$errorMsg(errors.new_password2)"
            @input="resetErrorMessage"
          />
        </div>
        <BaseButton type="submit" class="flex justify-center w-full mt-4">Sett nytt passord</BaseButton>
      </form>
    </template>
  </AuthSidebarContent>
</template>

<script lang="ts">
import AuthSidebarContent from '~/components/auth-sidebar-content.vue'
import { useStore, computed, ref, useContext, useRouter, useRoute} from '@nuxtjs/composition-api'
import $catchError from '~/mixins/catch-error'
import $errorMsg from '~/mixins/error-message'

export default {
  name: 'SetPassword',
  layout: 'auth',
  head: {
    title: 'Lag nytt passord',
    meta: [
      {
        name: 'description',
        content: 'Lag det nye passordet ditt'
      }
    ]
  },
  components: {
    AuthSidebarContent
  },
  setup() {

    const store = useStore()
    const router = useRouter()
    const { $axios } = useContext()
    const route = useRoute()

    let newPassword1 = ref<string>('')
    let newPassword2 = ref<string>('')
    let errors = ref<object | string>('')

    const resetPassword = async (): Promise<void> => {
      const uid: string = route.value.params.uid
      const token: string = route.value.params.token

      const payload = {
        new_password1: newPassword1.value,
        new_password2: newPassword2.value,
        uid: uid,
        token: token
      }

      return await $axios.$post(`users/password/reset/confirm/${uid}/${token}/`, payload)
        .then((): void => {
          // reset previous errors
          errors.value = {}

          // confirm change success to user and redirect to login
          store.dispatch('common/setNotification', 'Nytt passord satt! Du kan nå logge inn.')
          router.push('/account/log-in/')
        })
        .catch((error: typeof errors) => {
          // set errors for fields and notify user
          errors.value = $catchError(error)
          store.dispatch('common/setErrorNotification', $catchError(error))

          // reset variables
          newPassword1.value = ''
          newPassword2.value = ''
        })
    }

    const errorMessage = computed(() => {
      return store.getters['common/getErrorNotification']
    })

    const resetErrorMessage = () => {
      if (errorMessage.value) {
        store.dispatch('common/resetErrorNotification')
      }

      if (errors.value) {
        errors.value = {}
      }
    }

    return {
      newPassword1,
      newPassword2,
      resetPassword,
      errors,
      $errorMsg,
      resetErrorMessage
    }
  }
}
</script>
