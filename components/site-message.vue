<template>
  <div v-if="display" class="relative top-0 left-0 right-0 z-40 bg-white shadow-md">
    <div style="max-width: 1600px;" class="sm:px-8 px-5 py-3 mx-auto">
      <div class="flex items-center text-sm font-semibold text-gray-700">
        <span :class="iconBackground" class="flex p-2 mr-3 -ml-1 rounded-lg">
          <svg :class="iconColor" class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </span>
        <div class="flex-col items-center">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'SiteMessage',
  props: {
    display: {
      type: Boolean,
      required: true
    },
    iconBackground: {
      type: String,
      default: 'bg-yellow-200'
    },
    iconColor: {
      type: String,
      default: 'text-yellow-600'
    },
    icon: {
      type: String,
      default: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9'
    }
  }
})
</script>
