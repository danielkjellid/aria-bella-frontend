<template>
  <main>
    <section>
      <!-- main promotional campaign -->
      <article class="image-full-container relative overflow-hidden">
        <div class="table-cell align-middle">
          <!-- dummy images for the time being -->
          <img
            src="https://flishuset.s3.amazonaws.com/media/front/bella/041de3343063683abb398e8943a85d99.jpg"
            alt=""
            class="absolute bottom-0 left-0 right-0 object-cover w-full h-full"
            srcset="https://flishuset.s3.amazonaws.com/media/front/bella/1d03a79727a259818a747fe0387e9e22.jpg 512w,
                    https://flishuset.s3.amazonaws.com/media/front/bella/8090c13aceb4bfac595c8809d7d0a342.jpg 1024w,
                    https://flishuset.s3.amazonaws.com/media/front/bella/035e9c26ac37bda6b81a733562e86731.jpg 1024w,
                    https://flishuset.s3.amazonaws.com/media/front/bella/041de3343063683abb398e8943a85d99.jpg 1536w,
                    https://flishuset.s3.amazonaws.com/media/front/bella/f2447d85152cb2ed0ec22c4fe13a4ef0.jpg 2048w,
                    https://flishuset.s3.amazonaws.com/media/front/bella/d1e4279bf090cdd53c399b747483f295.jpg 2560w,
                    https://flishuset.s3.amazonaws.com/media/front/bella/f9a89f4bf906eb873455f77e3516d13f.jpg 3072w"
          >
          <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full px-4">
            <div class="text-center">
              <h2 class="text-2xl font-semibold text-white">Velkommen til vår nye nettside</h2>
              <h3 class="mt-3 text-lg text-white">En verden av ro, ærlige materialer, naturlige farger og bærekraftige design</h3>
              <!-- <BaseButton class="mt-5" outlined to="`/kampanje/`">
                Se den her
              </BaseButton> -->
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0 flex justify-center mb-8 text-center">
            <div>
              <BaseIcon class="animate-bounce-slow" name="chevron-down" fill="text-white hover:text-gray-300" height="h-12" width="w-12" />
            </div>
          </div>
        </div>
      </article>
    </section>
    <div>
      <section class="max-w-3xl px-8 py-8 mx-auto text-center">
        <p class="text-sm text-gray-900">
          Fliser fra Flishuset er av svært høy kvalitet. Alle våre fliser er gjennomfarget og betegnes som ”full body stone” på fagspråket. Denne type fliser egner seg til alle bruksområder. Flisene er bygget på modul, slik at det vil være mulig å kombinere ulike størrelser med fliser og de vil stemme overens i fuger.
        </p>
        <br>
        <p class="text-sm text-gray-900">
          En stor andel av våre kunder er “vanlige kunder” som ønsker fliser i fra våre anerkjente Italienske produsenter. En annen stor andel av kundene våre er arkitekter og interiørarkitekter.
        </p>
        <br>
        <p class="text-sm text-gray-900">
          Vi leverer over hele landet.
        </p>
      </section>
      <!-- categories -->
      <section v-if="fetchState.pending" class="animate-pulse grid grid-cols-1 gap-0">
        <div v-for="i in 5" :key="i" class="image-full-container bg-gray-400" />
      </section>
      <section v-else class="sm:grid-cols-2 grid grid-cols-1 gap-0">
        <article
          v-for="category in categories"
          :key="category.id"
          class="relative overflow-hidden"
          :class="category.width === 'full' ? 'col-span-2 image-full-container' : 'col-span-2 sm:col-span-1 image-half-container'"
        >
          <div class="table-cell align-middle">
            <img
              v-if="category.width === 'full'"
              :src="category.image_1536x660"
              :alt="`Placeholder image for the ${category.name} category.`"
              class="absolute bottom-0 left-0 right-0 object-cover w-full h-full"
              :srcset="`${category.image_512x512} 512w,
                        ${category.image_1024x1024} 1024w,
                        ${category.image_1024x480} 1024w,
                        ${category.image_1536x660} 1536w,
                        ${category.image_2048x800} 2048w,
                        ${category.image_2560x940} 2560w,
                        ${category.image_3072x940} 3072w`"
            >
            <img
              v-else
              :src="category.image_1024x1024"
              :alt="`Placeholder image of the ${category.name} category.`"
              class="object-cover"
              :srcset="`${category.image_512x512} 512w,
                        ${category.image_1024x1024} 1024w`"
            >
          </div>
          <div v-if="category.apply_filter" class="opacity-20 absolute inset-0 bg-black" />
          <div class="absolute bottom-0 left-0 right-0 flex items-center justify-center h-full">
            <h1 class="text-xl text-white">{{ category.name }}</h1>
          </div>
          <div class="absolute bottom-0 left-0 right-0 mb-8 text-center">
            <BaseButton outlined :to="`/category/${category.slug}/`">
              {{ category.name }}
            </BaseButton>
          </div>
        </article>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, useFetch, ref, useContext } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Home',
  meta: {
    navbarTransparent: true
  },
  head: {
    title: 'Hjem',
  },
  setup() {

    const { $axios } = useContext()

    const categories = ref({})

    const { fetch, fetchState } = useFetch(async () => {
      categories.value = await $axios.$get('categories/')
    })

    fetch()

    return {
      categories,
      fetchState
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
