<template>
  <section v-if="images">
    <article class="image-full-container relative overflow-hidden">
      <div class="table-cell align-middle">
        <div
          v-for="(image, index) in images"
          :key="`image-containter-${index}`"
          class="absolute inset-0"
          v-show="showingIndex === index"
        >
            <img
                :src="image.image_1536x660"
                alt=""
                class="absolute inset-0 object-cover w-full h-full"
                :srcset="`${image.image_512x512} 512w,
                          ${image.image_640x275} 640w,
                          ${image.image_1024x1024} 1024w,
                          ${image.image_1024x575} 1024w,
                          ${image.image_1536x860} 1536w,
                          ${image.image_2048x1150} 2048w`"
            >
            <div v-if="image.apply_filter" class="opacity-20 absolute inset-0 bg-black" />
        </div>
      </div>
      <div class="table-cell align-middle">
        <slot></slot>
        <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
          <ImageCarouselControls v-if="images.length > 1" :images="images" :showingIndex="showingIndex" @next="next" @previous="previous" />
        </div>
      </div>
    </article>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'
import ImageCarouselControls from '@/components/image-carousel-controls.vue'

export default defineComponent({
  name: 'ImageCarousel',
  components: {
    ImageCarouselControls,
  },
  props: {
    images: {
      type: Array,
      required: true
    }
  },
  setup(props) {
    let showingIndex= ref<number>(0)

    const next = () => {
      // show the next image if the current index is within the array
      if (showingIndex.value < props.images.length-1) {
        showingIndex.value += 1

      // if not, reset the count
      } else {
        showingIndex.value = 0
      }
    }

    const previous = () => {
      // if the first image is displayed, set the index to the last
      // this is to prevent a negative index
      if (showingIndex.value === 0) {
        showingIndex.value = props.images.length-1

      // if not, show the previous image
      } else {
        showingIndex.value -= 1
      }
    }

    return {
      showingIndex,
      next,
      previous
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

    .image-half-container {
      height: 100%;
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
