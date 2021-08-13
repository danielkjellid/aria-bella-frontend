<template>
  <article>
    <h2 class="text-lg font-semibold text-gray-900">{{ title }}</h2>
    <div v-if="loaded" class="sm:grid-cols-5 sm:gap-6 grid grid-cols-3 gap-8 mt-6">
      <button
        v-for="variant in variants"
        :key="variant.id"
        @click="selectVariant(variant)"
        class="flex items-start justify-center text-center"
      >
        <div>
          <div class="relative">
            <img
              v-if="variant.image"
              class="w-20 h-20 mx-auto border-2 border-gray-200 rounded-full"
              :src="variant.image"
            />
            <div v-else-if="variant.color_hex" :style="`background-color: ${variant.color_hex }`" class="w-20 h-20 mx-auto border-2 border-gray-200 rounded-full" />
          </div>
          <h3 class="mt-3 text-sm font-semibold text-gray-900">{{ variant.name }}</h3>
        </div>
      </button>
    </div>
    <!-- sceleton loaded placeholder for variants -->
    <div v-else class="sm:grid-cols-5 sm:gap-6 animate-pulse grid grid-cols-3 gap-8 mt-6">
      <div v-for="i in 5" :key="i"><div class="w-20 h-20 mx-auto bg-gray-400 rounded-full"></div><h3 class="w-2/4 h-4 mx-auto mt-3 bg-gray-400 rounded"></h3></div>
    </div>
  </article>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductVariantBlock',
  props: {
    title: {
      type: String,
      required: false,
      default: 'Varianter'
    },
    variants: {
      required: true
    },
    loaded: {
      type: Boolean,
      required: true
    },
    order: {
      type: Object,
      required: false
    },
  },
  setup(props, { emit }) {

    interface ProductMetaObj {
      id?: number
      name: string
      color_hex?: string
      thumbnail?: string
      image?: string
      additional_cost?: number
      count?: number
      file?: string
    }

    const selectVariant = (variant: ProductMetaObj) => {
      emit('on-select', variant)
    }

    const isSelected = (id: number) => {
      if (props.order) {
        if (props.order.selectedVariant === id) return true
      }

      return false
    }

    return {
      selectVariant,
      isSelected
    }
  }
})
</script>
