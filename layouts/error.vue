<template>
  <main class="min-h-screen">
    <img :src="require('../assets/images/404.jpg')" class="absolute inset-0 object-cover w-full h-full" />
    <div class="absolute inset-0 flex items-center justify-center px-5">
        <div v-if="error.statusCode === 404" class="text-center">
          <h1 class="text-6xl font-semibold text-white">404</h1>
          <p class="text-2xl text-white">Oooops!</p>
          <p class="mt-2 text-base text-white">Denne siden fant vi dessverre ikke. Dobbelsjekk at du har oppgitt en gyldig adresse.</p>
          <BaseButton outlined to="/" class="mt-6" >Gå tilbake til hjemmesiden</BaseButton>
        </div>
        <div v-else class="text-center">
          <h1 class="text-6xl font-semibold text-white">{{ error.statusCode }}</h1>
          <p class="text-2xl text-white">Oooops!</p>
          <p class="mt-2 text-base text-white">Her har det skjedd en feil i maskineriet. Våre teknikere er informert.</p>
          <BaseButton outlined to="/" class="mt-6" >Gå tilbake til hjemmesiden</BaseButton>
        </div>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'NotFound',
  meta: {
    navbarTransparent: true
  },
  props: ['error'],
  head: {
    title: 'Ikke funnet'
  }
})
</script>
