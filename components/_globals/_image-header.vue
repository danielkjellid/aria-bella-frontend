<template>
  <section>
    <article class="image-full-container relative overflow-hidden">
      <div class="table-cell align-middle">
        <img
          :src="object.image_1536x660"
          alt="Decorative background image"
          class="absolute bottom-0 left-0 right-0 object-cover w-full h-full"
          :srcset="`${object.image_512x512} 512w,
                    ${object.image_1024x1024} 1024w,
                    ${object.image_1024x480} 1024w,
                    ${object.image_1536x660} 1536w,
                    ${object.image_2048x800} 2048w,
                    ${object.image_2560x940} 2560w,
                    ${object.image_3072x940} 3072w`"
        >
        <div v-if="object.apply_filter" class="opacity-20 absolute inset-0 bg-black" />
        <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full px-4">
          <div class="text-center">
            <slot>
              <h1 class="text-2xl font-semibold text-white">{{ object.name }}</h1>
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

  .image-half-container {
    height: 375px;
    width: 100%;
  }

  @media (min-width: 640px) {
    .image-full-container {
      height: 300px;
      width: 100%;
    }

    .image-half-container {
      height: 300px;
      width: 100%;
    }
  }

  @media (min-width: 768px) {
    .image-full-container {
      height: 366px;
      width: 100%;
    }

    .image-half-container {
      height: 366px;
      width: 100%;
    }
  }

  @media (min-width:1024px) {
    .image-full-container {
      height: 480px;
      width: 100%;
    }

    .image-half-container {
      height: 480px;
      width: 100%;
    }
  }

  @media (min-width: 1280px) {
    .image-full-container {
      height: 660px;
      width: 100%;
    }

    .image-half-container {
      height: 660px;
      width: 100%;
    }
  }

  @media (min-width: 1536px) {
    .image-full-container {
      height: 800px;
      width: 100%;
    }

    .image-half-container {
      height: 800px;
      width: 100%;
    }
  }

  @media (min-width: 2048px) {
    .image-full-container {
      height: 800px;
      width: 100%;
    }

    .image-half-container {
      height: 800px;
      width: 100%;
    }
  }

  @media (min-width: 3072px) {
    .image-full-container {
      height: 940px;
      width: 100%;
    }

    .image-half-container {
      height: 940px;
      width: 100%;
    }
  }
</style>
