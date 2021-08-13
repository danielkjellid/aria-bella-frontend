<template>
  <div>
    <ul v-if="logs.length > 0">
      <li v-for="(log, index) in logs" :key="index">
        <div class="relative flex items-start pb-6">
          <span class="absolute top-4 bottom-4 left-2 ml-px h-auto w-0.5 bg-gray-200 mt-4" aria-hidden="true"></span>
          <svg class="w-5 h-5 mr-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          <div class="relative w-full text-sm">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-gray-900">Konto redigert</p>
              <p class="text-gray-400">{{ log.date_of_change }}</p>
            </div>
            <div class="mt-3">
              <p class="text-gray-500">{{ log.user }} endret <span class="font-semibold text-gray-800">{{ log.change.field }}</span> fra <span class="font-semibold text-gray-800">{{ log.change.old_value }}</span> til <span class="font-semibold text-gray-800">{{ log.change.new_value }}</span></p>
            </div>
          </div>
        </div>
      </li>
      <li>
        <div class="relative flex items-start pb-6">
          <BaseIcon name="check-circle" fill="text-green-400 mr-4" />
          <div class="w-full text-sm">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-gray-900">Konto opprettet</p>
              <p class="text-gray-400">{{ creationDate }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <ul v-else>
      <li>
        <div class="relative flex items-start pb-6">
          <BaseIcon name="check-circle" fill="text-green-400 mr-4" />
          <div class="w-full text-sm">
            <div class="flex items-center justify-between">
              <p class="font-semibold text-gray-900">Opprettet</p>
              <p class="text-gray-400">{{ creationDate }}</p>
            </div>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AdminAuditLog',
  props: {
    logs: {
      type: Array,
      required: true
    },
    creationDate: {
      type: String,
      required: false
    }
  }
})
</script>
