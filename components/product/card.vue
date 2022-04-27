<template>
  <article
    @mouseenter="showVariants = true"
    @mouseleave="showVariants = false"
    class="product-card lg:px-3 lg:py-3 relative bg-white"
    :class="{'shadow' : showVariants }"
  >
    <nuxt-link :to="`${product.slug}/`">
      <div class="product-media relative overflow-hidden bg-gray-100">
        <img :src="productImage" :alt="`Image of ${product.name}`">
        <div class="absolute bottom-0 left-0 mb-6">
          <!--          <div v-show="product.site_state.can_be_purchased_online" class="py-1 pl-2 pr-3 text-sm font-semibold text-white bg-gray-900 bg-opacity-75 rounded-r-full">Kan kjøpes på nett</div>-->
          <!-- TODO: add logic to check if product is part of campagin -->
          <!-- <div class="inline-block py-1 pl-2 pr-3 mt-2 text-sm font-semibold text-white bg-indigo-600 rounded-r-full">-20%</div> -->
        </div>
      </div>
      <div class="product-info pt-4 pb-1">
        <div v-if="!showVariants" class="flex items-center justify-between">
          <p class="w-1/2 text-base font-semibold text-gray-900 truncate">{{ product.name }}</p>
          <p v-if="product.display_price" class="w-1/2 text-sm font-semibold text-right text-gray-900">fra {{ product.gross_price | formatPrice }} <span class="text-gray-500">{{ product.unit }}</span></p>
          <!-- TODO: add logic for discounted products -->
          <!-- <p class="text-sm font-semibold text-gray-900">
            <span class="text-gray-500"><strike>kr 499,00</strike></span> - old price
            <span class="text-red-600"> kr 399,00 </span> - new price
            <span class="text-gray-500">m2</span> - unit
          </p> -->
        </div>
        <div v-else class="flex items-center" @mouseleave="productImage = product.thumbnail">
          <div
            @mouseover="productImage = product.thumbnail"
            class="w-8 h-8 mr-2 overflow-hidden border-2 border-gray-200 rounded-full"
          >
            <img :src="product.thumbnail" :alt="`Image of ${product.name}`">
          </div>
          <div v-for="(variant, index) in product.variants" :key="`${index}-${variant}`">
            <div
              v-if="index <= indexBasedOnBreakpont"
              @mouseover="productImage = variant.thumbnail"
              class="w-8 h-8 mr-2 overflow-hidden border-2 border-gray-200 rounded-full"
            >
              <img :src="variant.image" :alt="`Image of ${product.name} variant: ${variant.name}`">
            </div>
          </div>
          <div v-if="amountOfVariants > 0" class="text-sm text-gray-500">
            +{{ amountOfVariants }}
          </div>
        </div>
      </div>
    </nuxt-link>
  </article>
</template>

<script lang="ts">
import { computed, defineComponent } from '@nuxtjs/composition-api'

import breakpoints from '~/utils/breakpoints'

export default defineComponent({
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true,
    }
  },
  setup(props) {
    let showVariants: boolean = false
    let productImage: string = props.product.thumbnail
    let bp = breakpoints

    const indexBasedOnBreakpont = computed(() => {
      if (bp.w <= 375) return 6
      if (bp.w <= 640) return 4
      if (bp.w <= 768) return 6
      if (bp.w <= 1024) return 3
      if (bp.w <= 1280) return 3
      if (bp.w <= 1440) return 3
      if (bp.w <= 1920) return 5

      return 3
    })

    const amountOfVariants = computed(() => {
      const amount: number = (props.product.variants.length)-(indexBasedOnBreakpont.value)
      return amount
    })

    return {
      showVariants,
      productImage,
      indexBasedOnBreakpont,
      amountOfVariants
    }
  }
})
</script>

<style scoped>
  .product-card {
    width: 100%;
    height: auto;
  }

  .product-media {
    height: auto;
    width: 100%;
  }

  .product-info {
    width: 100%;
  }
</style>
