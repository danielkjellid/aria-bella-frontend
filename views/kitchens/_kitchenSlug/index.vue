<template>
  <main>
    <BaseImageHeader :object="kitchen" />
    <!-- main site content -->
    <div class="sm:px-16 sm:py-8 xl:px-0 relative max-w-2xl px-5 py-6 mx-auto">
      <section class="mt-6">
        <div>
          <ProductDescriptionBlock
            :title="kitchen.name"
            :loaded="loaded"
            :text="kitchen.description"
          />
        </div>
        <div v-if="kitchen.example_from_price" class="mt-8">
          <div class="bg-gray-50 rounded-md">
            <div class="xl:grid-cols-2 grid grid-cols-1">
              <div>
                <img
                  class="example-image-container rounded-tr-md rounded-tl-md xl:rounded-tr-none xl:rounded-l-md"
                  src="https://flishuset.s3.amazonaws.com/CACHE/images/media/kitchens/example/pricing/be25ba775bfc67ebf10da79e0e3b61b0.jpg"
                  alt="Image of example set up"
                  srcset="https://flishuset.s3.amazonaws.com/CACHE/images/media/kitchens/example/pricing/be25ba775bfc67ebf10da79e0e3b61b0.jpg 460w,
                          https://flishuset.s3.amazonaws.com/CACHE/images/media/kitchens/example/pricing/be25ba775bfc67ebf10da79e0e3b61b0.jpg 550w"
                >
              </div>
              <div class="sm:px-6 xl:px-8 px-5 py-6">
                <div>
                  <div class="flex items-center justify-between">
                    <h2 class="text-xl font-semibold text-gray-900">Priseksempel</h2>
                    <p class="text-sm font-semibold text-gray-800">kr {{ kitchen.example_from_price | formatPrice}}</p>
                  </div>
                  <p class="mt-3 text-sm text-gray-700">Priseksempel for oppsett ekskludert benkeplater, armatur og hvitevarer. Få et konkret tilbud gjennom en tegnetime.</p>
                  <a href="https://jke-design.com/no/booking/velg-tidspunkt/?sId=2784" target="_blank" rel="noopener noreferrer" class="hover:underline mt-4 text-sm">Bestill tegnetime →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="kitchen.extra_description" class="mt-8">
          <p class="text-sm text-gray-700">{{ kitchen.extra_description }}</p>
        </div>
        <div v-if="kitchen.can_be_painted" class="mt-12">
          <article>
            <h2 class="text-lg font-semibold text-gray-900">Malte fronter</h2>
            <p class="mt-4 text-sm text-gray-700">Nordic One kan fås i malte fronter. Du kan velge fritt mellom ca. 2000 farger. Ta kontakt med oss for mer informasjon.</p>
          </article>
        </div>
        <div v-if="kitchen.silk_variants.length > 0" class="mt-12">
          <ProductVariantBlock
            title="Silks"
            :loaded="loaded"
            :variants="kitchen.silk_variants"
            :canBeSelected="false"
          />
        </div>
        <div v-if="kitchen.decor_variants.length > 0" class="mt-12">
          <ProductVariantBlock
            title="Dekor"
            :loaded="loaded"
            :variants="kitchen.decor_variants"
            :canBeSelected="false"
          />
        </div>
        <div v-if="kitchen.plywood_variants.length > 0" class="mt-12">
          <ProductVariantBlock
            title="Finér"
            :loaded="loaded"
            :variants="kitchen.plywood_variants"
            :canBeSelected="false"
          />
        </div>
        <div v-if="kitchen.laminate_variants.length > 0" class="mt-12">
          <ProductVariantBlock
            title="Laminat"
            :loaded="loaded"
            :variants="kitchen.laminate_variants"
            :canBeSelected="false"
          />
        </div>
        <div v-if="kitchen.exclusive_variants.length > 0" class="mt-12">
          <ProductVariantBlock
            title="Eksklusiv"
            :loaded="loaded"
            :variants="kitchen.exclusive_variants"
            :canBeSelected="false"
          />
        </div>
        <div v-if="kitchen.trend_variants.length > 0" class="mt-12">
          <ProductVariantBlock
            title="Trend farger"
            :loaded="loaded"
            :variants="kitchen.trend_variants"
            :canBeSelected="false"
          />
        </div>
        <div class="mt-12">
          <div class="bg-gray-50 px-5 py-5 rounded-md">
            <div class="flex flex-wrap items-center justify-between">
              <div class="mr-4">
                <h2 class="font-semibold text-gray-900">Tegnetime</h2>
                <p class="mt-1 text-sm text-gray-700">Book en uforpliktende tegnetime med en interiørdesigner!</p>
              </div>
              <a href="https://jke-design.com/no/booking/velg-tidspunkt/?sId=2784" target="_blank" rel="noopener noreferrer" class="hover:underline mt-4 text-sm">Bestill tegnetime →</a>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, useContext, useRoute, useMeta, ref } from '@nuxtjs/composition-api'
import ProductDescriptionBlock from '~/components/product/description-block.vue'
import ProductVariantBlock from '~/components/product/variant-block.vue'


export default defineComponent({
  name: 'Kitchen',
  meta: {
    navbarTransparent: true
  },
  head: {},
  components: {
    ProductDescriptionBlock,
    ProductVariantBlock
  },
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

    interface KitchenVariantObj {
      id?: number
      name: string
      color_hex?: string
      image?: string
    }

    interface KitchenObj {
      id: number
      name: string
      slug: string
      description: string
      extra_description: string
      apply_filter: boolean
      example_from_price: string
      can_be_painted: boolean
      silk_variants: KitchenVariantObj[]
      decor_variants: KitchenVariantObj[]
      plywood_variants: KitchenVariantObj[]
      laminate_variants: KitchenVariantObj[]
      exclusive_variants: KitchenVariantObj[]
      trend_variants: KitchenVariantObj[]
      image_512x512: string
      image_1024x1024: string
      image_1024x480: string
      image_1536x660: string
      image_2048x800: string
      image_2560x940: string
      image_3072x940: string
    }

    const slug = route.value.params.kitchenSlug
    let loaded = ref<boolean>(false)

    /************
    ** Kitchen **
    ************/

    let kitchen = ref<KitchenObj>({
      id: 0,
      name: '',
      slug: '',
      description: '',
      extra_description: '',
      apply_filter: false,
      example_from_price: '',
      can_be_painted: false,
      silk_variants: [],
      decor_variants: [],
      plywood_variants: [],
      laminate_variants: [],
      exclusive_variants: [],
      trend_variants: [],
      image_512x512: '',
      image_1024x1024: '',
      image_1024x480: '',
      image_1536x660: '',
      image_2048x800: '',
      image_2560x940: '',
      image_3072x940: '',
    })

    // get products attached to category
    const fetchKitchen = async (): Promise<void> => {
      await $axios.$get(`kitchens/${slug}/`)
        .then(data => {
          kitchen.value = data

          title.value = data.name
          meta.value = [
            {
              name: 'description',
              content: `Detaljside av kjøkkenserien ${data.name}`
            }
          ]

          // when products are loaded, set loaded to true
          loaded.value = true
        })
    }

    fetchKitchen()

    return {
      kitchen,
      loaded
    }
  }
})
</script>
