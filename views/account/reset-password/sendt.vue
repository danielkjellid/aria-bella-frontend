<template>
  <AuthSidebarContent>
    <template #auth-heading>
      <h1 class="text-xl font-semibold text-gray-900">Instruksjoner sendt</h1>
      <div class="flex items-center justify-center mt-1 mb-6 text-sm text-gray-700">
        Vi har sendt deg instruksjoner på e-post om hvordan du setter et nytt passord. Den burde være hos deg ganske snart.
      </div>
      <hr>
      <p class="mt-6 text-sm text-gray-600">
        Får du ikke e-post fra oss? Undersøk søppelpost og reklame-mappen din og forsikre deg om ikke er registrert hos oss med en annen e-postadresse enn den du fylte inn i feltet. Er du i tvil om du skrev riktig? <router-link to="/konto/nullstill-passord/" class="ml-1 font-semibold text-gray-900 underline">Gå tilbake</router-link>
      </p>
    </template>
  </AuthSidebarContent>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import AuthSidebarContent from '~/components/auth-sidebar-content.vue'

export default defineComponent({
  name: 'ResetPasswordComfirmation',
  layout: 'auth',
  head: {
    title: 'Passordet er sendt!',
    meta: [
      {
        name: 'description',
        content: 'Vi har sendt deg en e-post med instruksjoner om hvordan du nullstiller passordet ditt.'
      }
    ]
  },
  components: {
    AuthSidebarContent
  }
})
</script>
