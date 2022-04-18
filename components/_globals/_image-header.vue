<template>
  <section v-if="object.images">
    <article class="image-full-container relative overflow-hidden">
      <div class="table-cell align-middle">
        <img
          :src="object.images_1536x860"
          alt="Decorative background image"
          class="absolute bottom-0 left-0 right-0 object-cover w-full h-full"
          :srcset="`${object.images.image_512x512} 512w,
                    ${object.images.image_640x275} 640w,
                    ${object.images.image_1024x1024} 1024w,
                    ${object.images.image_1024x575} 1024w,
                    ${object.images.image_1536x860} 1536w,
                    ${object.images.image_2048x1150} 2048w`"
        >
        <div v-if="object.apply_filter" class="opacity-20 absolute inset-0 bg-black" />
        <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full px-4">
          <div class="text-center">
            <slot>
              <h2 class="text-2xl font-medium text-white">{{ object.name }}</h2>
            </slot>
          </div>
        </div>
        <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
          <BaseButton icon light plain @click="navigateToContent">
            <BaseIcon class="animate-bounce-slow" name="chevron-down" fill="text-white hover:text-gray-300" height="h-12" width="w-12" />
          </BaseButton>
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import breakpoints from '~/utils/breakpoints'

export default defineComponent({
  name: 'BaseImageheader',
  props: {
    object: {
      type: Object,
      required: true
    }
  },
  setup() {
    const bp = breakpoints

    const navigateToContent = (): void => {
      if (bp.w > 1536 && bp.w <= 3072) return window.scrollTo({top: 800, left: 0, behavior: 'smooth'})
      if (bp.w > 1024 && bp.w <= 1536) return window.scrollTo({top: 660, left: 0, behavior: 'smooth'})
      if (bp.w > 768 && bp.w <= 1024) return window.scrollTo({top: 480, left: 0, behavior: 'smooth'})
      if (bp.w > 640 && bp.w <= 768) return window.scrollTo({top: 366, left: 0, behavior: 'smooth'})
      if (bp.w > 375 && bp.w <= 640) return window.scrollTo({top: 300, left: 0, behavior: 'smooth'})
      if (bp.w > 0 && bp.w <= 375) return window.scrollTo({top: 375, left: 0, behavior: 'smooth'})

      return window.scrollTo({top: 940, left: 0, behavior: 'smooth'})
    }

    return {
      navigateToContent
    }
  }
})
</script>

<style scoped>
  .image-full-container {
    height: 375px;
    width: 100%;
  }

  @media (min-width: 640px) {
    .image-full-container {
      height: 330px;
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .image-full-container {
      height: 370px;
      width: 100%;
    }
  }

  @media (min-width: 1024px) {
    .image-full-container {
      height: 575px;
      width: 100%;
    }
  }

  @media (min-width: 1536px) {
    .image-full-container {
      height: 860px;
      width: 100%;
    }
  }

  @media (min-width: 2048px) {
    .image-full-container {
      height: 1150px;
      width: 100%;
    }
  }
</style>
