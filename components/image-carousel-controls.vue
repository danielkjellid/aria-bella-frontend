<template>
  <div class="flex items-center justify-center">
    <button @click="previous" aria-label="previous image" class="hover:bg-black hover:bg-opacity-50 flex items-center justify-center w-8 h-8 text-white bg-transparent border border-white rounded-full">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16l-4-4m0 0l4-4m-4 4h18" />
      </svg>
    </button>
    <div class="flex items-center ml-20 mr-20 space-x-3">
      <div
        v-for="index in images.length"
        :key="index"
        class="w-2 h-2 border border-white rounded-full"
        :class="{'bg-white' : index-1 === (showingIndex % images.length)}"
      ></div>
    </div>
    <button @click="next" aria-label="next image" class="hover:bg-black hover:bg-opacity-50 flex items-center justify-center w-8 h-8 text-white bg-transparent border border-white rounded-full">
      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ImageCarouselControls',
  props: {
    images: {
      required: true
    },
    showingIndex: {
      type: Number,
      required: true
    }
  },
  setup(props, { emit }) {
    const previous = (): void => {
      emit('previous')
    }

    const next = (): void => {
      emit('next')
    }

    return {
      previous,
      next
    }
  }
})
</script>
