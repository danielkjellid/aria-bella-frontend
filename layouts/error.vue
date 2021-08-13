<template>
  <main>
    <div class="px-5 py-5 -mt-24">
      <div class="flex items-center justify-center min-h-screen">
        <div v-if="error.statusCode === 404" class="text-center">
          <h1 class="text-6xl font-semibold text-gray-800">404</h1>
          <p class="text-2xl text-gray-900">Oooops!</p>
          <p class="mt-2 text-base text-gray-700">Denne siden fant vi dessverre ikke. Dobbelsjekk at du har oppgitt en gyldig adresse.</p>
          <BaseButton to="/" class="mt-6" >Gå tilbake til hjemmesiden</BaseButton>
        </div>
        <div v-else class="text-center">
          <h1 class="text-6xl font-semibold text-gray-800">{{ error.statusCode }}</h1>
          <p class="text-2xl text-gray-900">Oooops!</p>
          <p class="mt-2 text-base text-gray-700">Her har det skjedd en feil i maskineriet. Våre teknikere er informert.</p>
          <BaseButton to="/" class="mt-6" >Gå tilbake til hjemmesiden</BaseButton>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ['error'],
  layout: 'error'
}
</script>
