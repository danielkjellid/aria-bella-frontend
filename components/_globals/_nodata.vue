<template>
  <div class="min-w-full mt-5 border-2 border-gray-200 border-dashed w-full">
    <div class="p-12 text-center">
      <p class="text-gray-500">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script>
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseNodata',
  props: {
    errorMessage: {
      type: String,
      required: false,
      default: 'Ingen data'
    }
  }
})
</script>
