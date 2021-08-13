<template>
  <div class="border-b border-gray-200">
    <nav class="flex -mb-px">
      <nuxt-link
        v-for="(tab, index) in tabs"
        :key="index"
        :to="tab.to"
        exact-active-class="focus:border-gray-700 text-gray-900 border-gray-900"
        class="hover:text-gray-900 hover:border-gray-900 focus:outline-none focus:text-gray-700 focus:border-gray-200 whitespace-nowrap px-3 py-4 text-sm font-semibold leading-5 text-gray-600 border-b-2 border-transparent"
      >
        {{ tab.text }}
      </nuxt-link>
    </nav>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Tabs',
  props: {
    // array of tabs text and path of which they should lead to
    tabs: {
      type: Array,
      required: true,
    }
  }
})
</script>
