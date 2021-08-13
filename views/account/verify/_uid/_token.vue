<template>
  <div />
</template>

<script lang="ts">
import AuthSidebarContent from '~/components/auth-sidebar-content.vue'
import { useStore, useContext, useRouter, useRoute, defineComponent } from '@nuxtjs/composition-api'
import $catchError from '~/mixins/catch-error'

export default defineComponent({
  name: 'VerifyAccount',
  layout: 'auth',
  head: {
    title: 'Bekreft kontoen din',
    meta: [
      {
        name: 'description',
        content: 'Bekreft kontoen din'
      }
    ]
  },
  components: {
    AuthSidebarContent
  },
  setup() {

    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const { $axios} = useContext()

    const verifyEmail = async (): Promise<void> => {
      // unique id and token required to verify email
      const uid = route.value.params.uid
      const token = route.value.params.token

      const payload = {
        uid: uid,
        token: token
      }

      return await $axios.$post(`users/verify/confirm/${uid}/${token}/`, payload)
        .then((): void => {
          // confirm change success to user and redirect to login
          store.dispatch('auth/setUserAccountVerified', true)
          store.dispatch('common/setNotification', 'Konto bekreftet')
          router.push('/')
        })
        .catch(error => {
          store.dispatch('common/setErrorNotification', $catchError(error))
          router.push('/')
        })
    }

    // call function upon component creation
    verifyEmail()
  }
})
</script>
