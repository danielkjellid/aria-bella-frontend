<template>
  <main class="mx-auto">
    <BaseImageHeader :object="kitchenHeaderImage" />
    <!-- site product content -->
    <div class="container max-w-screen-xl min-h-screen mx-auto">
      <BaseBreadcrumbs :breadcrumbs="breadcrumbs" class="xl:px-0 px-4 py-8" />
      <div class="xl:px-0 px-4">
        <div class="bg-gray-50 relative w-full">
          <div class="sm:h-72 md:absolute md:right-0 md:h-full md:w-1/2 md:top-0 z-10 h-56">
            <video
              controls
              height="2000"
              src="https://flishuset.s3.eu-north-1.amazonaws.com/media/kitchens/videos/JKE-Design-production.mp4"
              class="z-25 object-cover w-full h-full"
            >
              Sorry, your browser doesn't support embedded videos,
              but don't worry, you can <a href="https://flishuset.s3.eu-north-1.amazonaws.com/media/kitchens/videos/JKE-Design-production.mp4">download it</a>
              and watch it with your favorite video player!
            </video>
          </div>
          <div class="max-w-7xl sm:px-6 lg:px-8 lg:py-16 relative px-4 py-12 mx-auto">
            <div class="md:mr-auto md:w-1/2 md:pr-10">
              <h2 class="text-base font-semibold tracking-wider text-gray-500 uppercase">
                Stilrene nordiske kjøkken
              </h2>
              <p class="sm:text-4xl mt-2 text-3xl font-extrabold tracking-tight text-gray-900">
                En verden av muligheter, skreddersydd for deg.
              </p>
              <p class="mt-3 text-lg text-gray-600">
                Vi er stolte samarbeidspartnere med Kjøkkenhuset Lillestrøm, som tilbyr et hav av mulige løsninger fra JKE Design, skreddersydd dine behov.
              </p>
              <div class="mt-2">
                <a href="https://jke-design.com/no/booking/velg-tidspunkt/?sId=2784" target="_blank" rel="noopener noreferrer" class="hover:bg-gray-900 focus:outline-none focus:border-gray-900 focus:ring-gray active:bg-gray-900 inline-flex items-center flex-shrink-0 px-4 py-2 mt-8 text-sm font-semibold leading-5 text-white transition duration-150 ease-in-out bg-gray-800 border border-transparent rounded-md">Bestill tegnetime hos oss i dag!</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section class="mt-5">
        <div v-if="loaded">
          <div
            class="lg:flex lg:items-center lg:mb-5 w-full mb-8"
            v-for="(kitchen, index) in fetchedKitchens"
            :key="kitchen.id"
            :class="index % 2 == 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'"
          >
            <div class="image-container flex-shrink-0 overflow-hidden">
              <img
                :src="kitchen.thumbnail_660x400"
                alt=""
                :srcset="`${kitchen.thumbnail_500x305} 500w,
                          ${kitchen.thumbnail_660x400} 660w,
                          ${kitchen.thumbnail_850x520} 850w`"
              >
            </div>
            <div class="lg:px-16 px-4">
              <div class="flex items-center justify-between mt-4">
                <h1 class="text-xl font-semibold text-gray-900">{{ kitchen.name }}</h1>
                <BaseButton plain :to="`/kitchens/${kitchen.slug}/`" class="hover:underline lg:hidden text-sm">Les mer →</BaseButton>
              </div>
              <p class="mt-2 text-sm text-gray-700">{{ kitchen.thumbnail_description }}</p>
              <BaseButton plain :to="`/kitchens/${kitchen.slug}/`" class="hover:underline lg:block hidden mt-4 text-sm">Les mer →</BaseButton>
            </div>
          </div>
        </div>
        <div v-else>
          <!-- sceleton loading -->
          <div
            class="lg:flex lg:items-center lg:mb-5 w-full mb-8"
            v-for="i in 8"
            :key="i"
            :class="i % 2 == 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'"
          >
            <div class="image-container animate-pulse flex-shrink-0 overflow-hidden bg-gray-400" />
            <div class="lg:px-16 w-full px-4">
              <div class="animate-pulse flex items-center justify-between mt-4">
                <div class="w-2/5 h-8 bg-gray-400 rounded" />
                <div class="animate-pulse lg:hidden w-1/4 h-6 bg-gray-400 rounded" />
              </div>
              <div class="animate-pulse mt-5 space-y-2">
                <div class="h-4 bg-gray-400 rounded" />
                <div class="w-5/6 h-4 bg-gray-400 rounded" />
                <div class="h-4 bg-gray-400 rounded" />
                <div class="w-4/6 h-4 bg-gray-400 rounded" />
              </div>
              <div class="animate-pulse lg:block hidden w-1/4 h-6 mt-4 bg-gray-400 rounded" />
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, useContext, useRoute, useMeta, ref, toRefs, reactive } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'Kitchens',
  meta: {
    navbarTransparent: true
  },
  head: {},
  setup() {

    /**************
    ** Utilities **
    **************/

    const route = useRoute()
    const { $axios } = useContext()
    const { title, meta } = useMeta()

    /***********************
    ** Component specific **
    ***********************/

    interface KitchenImageObj {
      name: string
      image_512x512: string
      image_1024x1024: string
      image_1024x480: string
      image_1536x660: string
      image_2048x800: string
      image_2560x940: string
      image_3072x940: string
    }

    interface KitchenListObj {
      id: number,
      name: string,
      slug: string,
      thumbnail_description: string
      thumbnail_500x305: string
      thumbnail_660x550: string
      thumbnail_850x520: string
    }

    let loaded = ref<boolean>(false)

    const breadcrumbs = computed(() => {
      return [
        { text: 'Flishuset', disabled: false, href: '/' },
        { text: 'Kjøkken', disabled: true },
      ]
    })

    /*************
    ** Kitchens **
    *************/

    const kitchenHeaderImage = ref<KitchenImageObj>({
      name: 'Kjøkken',
      image_512x512: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/4327513b303bdda4203fcea3505383bf.jpg',
      image_1024x1024: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/598aac538a099b7a2943731a769abc46.jpg',
      image_1024x480: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/3f6c9bc7b7784b50aced890e0073e1da_YNMYSBh.jpg',
      image_1536x660: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/d1a0f21a4b80fe684fe8ce56abf82bb7_o0VQgFk.jpg',
      image_2048x800: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/aa5c87e019add477da9f674f9213bbaa_SQPv9LT.jpg',
      image_2560x940: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/902a5579ae8dc54d446f20369fbe8783.jpg',
      image_3072x940: 'https://flishuset.s3.eu-north-1.amazonaws.com/CACHE/images/media/kitchens/default/af0b0547d2eef32a2923f7948116f393.jpg',
    })

    let fetchedKitchens = ref<KitchenListObj[]>([])

    const fetchKitchens = async () => {
      await $axios.$get('kitchens/')
        .then(kitchens => {
          fetchedKitchens.value = kitchens
          loaded.value = true
        })
    }

    fetchKitchens()

    title.value = 'Kjøkken'
    meta.value = [
      {
        name: 'description',
        content: 'En oversikt over kjøkken vi fører.'
      }
    ]

    return {
      loaded,
      breadcrumbs,
      kitchenHeaderImage,
      fetchedKitchens
    }
  }
})
</script>

<style scoped>
  .image-container {
    width: 100%;
    height: 250px;
  }

  @media (min-width: 640px) {
    .image-container {
      height: 300px;
    }
  }

  @media (min-width: 768px) {
    .image-container {
      height: 350px;
    }
  }

  @media (min-width: 1024px) {
    .image-container {
      height: 400px;
      width: 60%;
    }
  }

  @media (min-width: 1280px) {
    .image-container {
      height: 520px;
      width: 66%;
    }
  }
</style>
