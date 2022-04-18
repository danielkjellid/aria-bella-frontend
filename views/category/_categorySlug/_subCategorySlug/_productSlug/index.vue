<template>
  <main>
    <TransformFadeIn>
      <div v-show="variantModalActive" class="fixed inset-0 z-10 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="sm:block sm:p-0 flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center">
          <!-- Background overlay, show/hide based on modal state -->
          <div @click="variantModalActive = false" class="bg-opacity-80 fixed inset-0 transition-opacity bg-black" aria-hidden="true"></div>

          <!-- This element is to trick the browser into centering the modal contents. -->
          <span class="sm:inline-block sm:align-middle sm:h-screen hidden" aria-hidden="true">&#8203;</span>

          <div class="sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6 inline-block overflow-hidden align-bottom transition-all transform">
            <div>
              <img :src="variantImage" alt="Image of Memory Mood">
            </div>
          </div>

          <BaseButton @click="variantModalActive = false" plain class="hover:text-gray-500 absolute top-0 right-0 mt-5 mr-5 text-white">
            <BaseIcon name="x" outline fill="fill-current" height="w-8" width="w-8" />
          </BaseButton>
        </div>
      </div>
    </TransformFadeIn>
    <ImageCarousel :images="product.images">
      <div class="absolute inset-0 max-w-screen-xl mx-auto">
        <div class="xl:flex reset-margin-2xl items-center justify-end hidden h-full mr-12">
          <!-- info box on larger devices -->
          <div class="info-box bg-white rounded-md">
            <div class="px-5 py-5">
              <div>
                <div v-if="fetchState.pending" class="animate-pulse space-y-2">
                  <div class="w-1/3 h-8 bg-gray-400 rounded" />
                  <div class="h-4 bg-gray-400 rounded" />
                  <div class="h-4 bg-gray-400 rounded" />
                  <div class="w-5/6 h-4 bg-gray-400 rounded" />
                </div>
                <div v-else>
                  <h1 class="text-xl font-semibold text-gray-900">{{ product.name }}</h1>
                  <p class="mt-5 text-sm text-gray-700">{{ product.short_description }}</p>
                </div>
              </div>
              <div v-if="fetchState.pending" class="animate-pulse mt-5">
                <div class="w-2/3 h-8 bg-gray-400 rounded" />
              </div>
              <div v-else class="mt-5">
                <h2 v-if="product.site_state.display_price" class="text-lg font-semibold text-gray-900">kr {{ product.site_state.gross_price | formatPrice }} <span class="text-gray-600">per {{ product.unit }}</span></h2>
              </div>
              <div v-if="product.variants" class="mt-5">
                <h2 class="text-sm font-semibold text-gray-900">Varianter</h2>
                <div v-if="fetchState.pending" class="animate-pulse flex items-center mt-3 space-x-3">
                  <div v-for="i in 5" :key="i" class="w-8 h-8 bg-gray-400 rounded-full" />
                </div>
                <div v-else class="grid grid-cols-8 gap-3 mt-3">
                  <button v-for="variant in product.variants" :key="variant.id" @click="selectVariant(variant.id)">
                    <div class="relative">
                      <img
                        class="w-8 h-8 border-2 border-gray-200 rounded-full"
                        :src="variant.image"
                        :class="{'border-brand-500': order.selectedVariant === variant.id}"
                      />
                      <div v-if="order.selectedVariant === variant.id" class="absolute inset-0 flex items-center justify-center">
                        <BaseIcon solid name="check" fill="text-brand-600" />
                      </div>
                    </div>
                  </button>
                </div>
              </div>
              <div v-if="product.sizes" class="mt-5">
                <h2 class="text-sm font-semibold text-gray-900">Størrelser</h2>
                <div v-if="fetchState.pending" class="animate-pulse gap-y-3 grid grid-cols-3 gap-6 mt-3">
                  <div v-for="i in 5" :key="i" class="h-4 bg-gray-400 rounded" />
                </div>
                <div v-else class="gap-y-3 grid grid-cols-3 gap-6 mt-3">
                  <BaseButton
                    v-for="size in product.sizes"
                    :key="size.id"
                    @click="selectSize(size.id)"
                    plain
                    class="hover:underline text-sm"
                    :class="{'text-brand-500 font-semibold': order.selectedSize === size.id}"
                  >
                    <BaseIcon v-if="order.selectedSize === size.id" solid name="check" height="h-4" width="w-4" class="mr-1" />
                    {{ size.name }}
                  </BaseButton>
                  <BaseButton v-if="product.available_in_special_sizes" @click="selectSize('Spesialstørrelse')" plain class="hover:underline text-sm">Spesialstørrelser*</BaseButton>
                </div>
              </div>
              <!-- <div class="mt-6" v-if="!product.can_be_purchased_online">
                <div class="flex items-center justify-between">
                  <div class="w-full">
                    <BaseButton class="flex justify-center w-full">Legg til i handlekurv</BaseButton>
                  </div>
                  <div class="flex items-center justify-end flex-shrink-0 ml-3">
                    <BaseButton @click="decreseQuantity" plain class="mr-3">
                      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
                      </svg>
                    </BaseButton>
                    <span class="text-base font-semibold text-gray-900">{{ this.order.amount }} <span class="font-semibold text-gray-600">{{ this.product.unit }}</span></span>
                    <BaseButton @click="increaseQuantity" plain class="ml-3">
                      <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </BaseButton>
                  </div>
                </div>
              </div>
              <div class="mt-6" v-else>
                <BaseButton light class="flex justify-center w-full">Ta kontakt med butikk</BaseButton>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </ImageCarousel>
    <!-- main site content -->
    <div class="sm:px-16 sm:py-8 xl:px-0 max-w-2xl px-5 py-6 mx-auto">
      <section class="mt-12">
        <div>
          <ProductDescriptionBlock
            :title="product.name"
            :price="{gross_price: product.site_state.gross_price, unit: product.unit}"
            :display_price="product.site_state.display_price"
            :loaded="!fetchState.pending"
            :text="product.short_description"
          />
        </div>
        <div class="mt-12">
          <ProductDescriptionBlock
            title="Beskrivelse"
            :loaded="!fetchState.pending"
            :text="product.description"
          />
        </div>
        <div v-if="product.variants.length > 0" class="mt-12">
          <ProductVariantBlock
            title="Varianter"
            :loaded="!fetchState.pending"
            :variants="product.variants"
            :order="order"
            @on-select="displayVariantModal"
          />
        </div>
        <div v-if="product.sizes.length > 0" class="mt-12">
          <article>
            <h2 class="text-lg font-semibold text-gray-900">Størrelser <span class="text-gray-600">oppgitt i cm</span></h2>
            <div class="mt-6">
              <!-- buttons to select sizes -->
              <!-- sceleton loaded placeholder for sizes -->
              <div v-if="fetchState.pending" class="gap-y-6 sm:grid-cols-4 sm:gap-8 grid grid-cols-3 gap-10">
                <div v-for="i in 4" :key="i" class="w-full h-4 bg-gray-400 rounded"></div>
              </div>
              <div v-else class="gap-y-6 sm:grid-cols-4 sm:gap-8 grid grid-cols-3 gap-10">
                <BaseButton
                  v-for="size in product.sizes"
                  :key="size.id"
                  @click="selectSize(size.id)"
                  plain
                  class="hover:underline text-sm"
                  :class="{'text-green-500 font-semibold': order.selectedSize === size.id}"
                >
                  <BaseIcon v-if="order.selectedSize === size.id" solid name="check" height="h-4" width="w-4" class="mr-1" />
                  {{ size.name }}
                </BaseButton>
                <BaseButton v-if="product.available_in_special_sizes" @click="selectSize('Spesialstørrelse')" plain class="hover:underline text-sm">Spesialstørrelser*</BaseButton>
              </div>


              <!-- text to tell users to contact for more info regarding sizes -->
              <p v-if="product.available_in_special_sizes" class="mt-6 text-xs text-gray-700">* Produktet finnes i størrelser utover det som er standard, eller kan tilpasses dine behov. Ta kontakt med oss for mer informasjon!</p>
            </div>
          </article>
        </div>
        <div class="mt-12">
          <article class="mt-12">
            <h2 class="text-lg font-semibold text-gray-900">Spesifikasjoner</h2>
            <!-- sceleton loaded for specifcations -->
            <table v-if="fetchState.pending" class="lg:w-3/4 animate-pulse w-64 mt-6">
              <tbody>
                <tr v-for="i in 6" :key="i">
                  <td class="text-sm text-gray-700"><div class="w-11/12 h-4 bg-gray-400 rounded"></div></td>
                  <td class="text-sm text-gray-700"><div class="w-11/12 h-4 bg-gray-400 rounded"></div></td>
                </tr>
              </tbody>
            </table>
            <table v-else class="lg:w-3/4 w-64 mt-6">
              <tbody>
                <tr class="mt-6 sr-only">
                  <th>Spesifikasjon</th>
                  <th>Verdi</th>
                </tr>
                <ProductSpecRow title="Farge" :fields="product.colors" />
                <ProductSpecRow title="Stil" :fields="product.styles" />
                <ProductSpecRow title="Bruksområde" :fields="product.applications" />
                <ProductSpecRow title="Materiale" :fields="product.materials" />
                <tr v-if="product.absorption">
                  <td class="text-sm text-gray-700">Vannoppsug</td>
                  <td class="text-sm text-gray-900">&lt;{{ product.absorption | formatPrice }}%</td>
                </tr>
                <tr>
                  <td class="text-sm text-gray-700">Opprinnelse</td>
                  <td class="text-sm text-gray-900">{{ product.origin_country }}</td>
                </tr>
              </tbody>
            </table>
          </article>
        </div>
        <div class="mt-12">
          <ProductFilesBlock :loaded="!fetchState.pending" :files="product.files" />
        </div>
      </section>
    </div>

    <!-- menu for adding proucts on smaller devices -->
    <!-- <div class="xl:hidden bg-gray-50 sticky bottom-0 left-0 right-0 border-t border-gray-200">
      <div class="sm:px-16 sm:py-8 max-w-2xl px-5 py-6 mx-auto">
        <div class="flex items-center justify-between">
          <div class="w-full">
            <BaseButton class="flex justify-center w-full">Legg til i handlekurv</BaseButton>
          </div>
          <div class="flex items-center justify-end flex-shrink-0 ml-3">
            <BaseButton @click="decreseQuantity" plain class="mr-3">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 12H6" />
              </svg>
            </BaseButton>
            <span class="text-base font-semibold text-gray-900">{{ this.order.amount }} <span class="font-semibold text-gray-600">{{ this.product.unit }}</span></span>
            <BaseButton @click="increaseQuantity" plain class="ml-3">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </BaseButton>
          </div>
        </div>
      </div>
    </div> -->
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, useContext, useRoute, useMeta, ref, toRefs, reactive, useFetch } from '@nuxtjs/composition-api'
import ImageCarousel from '~/components/image-carousel.vue'
import ProductSpecRow from '~/components/product/spec-row.vue'
import ProductDescriptionBlock from '~/components/product/description-block.vue'
import ProductVariantBlock from '~/components/product/variant-block.vue'
import ProductFilesBlock from '~/components/product/files-block.vue'


export default defineComponent({
  name: 'Product',
  meta: {
    navbarTransparent: true
  },
  head: {},
  components: {
    ImageCarousel,
    ProductDescriptionBlock,
    ProductVariantBlock,
    ProductSpecRow,
    ProductFilesBlock
  },
  setup() {

    /**************
    ** Utilities **
    **************/

    const route = useRoute()
    const { $axios } = useContext()
    const { title, meta } = useMeta()

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

    interface ProductImageObj {
      apply_filter: boolean
      image_512x512: string
      image_1024x1024: string
      image_1024x480: string
      image_1536x660: string
      image_2048x800: string
      image_2560x940: string
      image_3072x940: string
    }

    interface ProductSiteState {
      gross_price: string
      display_price: boolean
      can_be_purchased_online: boolean
      can_be_picked_up: boolean
    }

    interface ProductObj {
      id: number
      name: string
      unit: string
      slug: string
      short_description: string
      description: string
      available_in_special_sizes: boolean
      absorption: number
      sizes: ProductMetaObj[]
      colors: ProductMetaObj[]
      styles: ProductMetaObj[]
      applications: ProductMetaObj[]
      materials: ProductMetaObj[]
      images: ProductImageObj[]
      variants: ProductMetaObj[]
      files: ProductMetaObj[]
      origin_country: string
      site_state: ProductSiteState
    }

    interface ProductOrderObj {
      selectedVariant: number | null
      selectedSize: number | null
      amount: number
    }

    const slug = route.value.params.productSlug

    /************
    ** Product **
    ************/

    let product = ref<ProductObj>({
      id: 0,
      name: '',
      unit: '',
      slug: '',
      short_description: '',
      description: '',
      available_in_special_sizes: false,
      absorption: 0,
      sizes: [],
      colors: [],
      styles: [],
      applications: [],
      materials: [],
      images: [],
      variants: [],
      files: [],
      origin_country: '',
      site_state: {} as ProductSiteState
    })

    /**********
    ** Order **
    ***********/

    let order = reactive<ProductOrderObj>({
      selectedVariant: null,
      selectedSize: null,
      amount: 1
    })

    let { selectedVariant, selectedSize, amount } = toRefs(order)

    const increaseQuantity = (): number => {
      return amount.value = order.amount++
    }

    const decreaseQuantity = (): number => {
      // if the order amount is above 1, decrese amount
      if (order.amount > 1) return amount.value--
      // if not, set the amount to 1 to prevent a negative amount
      return amount.value = 1
    }

    const selectVariant = (variant: number): number => {
      return selectedVariant.value = variant
    }

    const selectSize = (size: number): number => {
      return selectedSize.value = size
    }

    let variantModalActive = ref<boolean>(false)
    let variantImage = ref<string>('')

    const displayVariantModal = (variant: ProductMetaObj) => {
      variantModalActive.value = true

      if (variant.thumbnail) {
        variantImage.value = variant.thumbnail
      }
    }

    const { fetch, fetchState } = useFetch(async () => {
      product.value = await $axios.$get(`products/${slug}/`)

      title.value = product.value.name
      meta.value = [
        {
          name: 'description',
          content: `Detaljside av produktet ${product.value.name}`
        }
      ]
    })

    fetch()

    return {
      product,
      order,
      fetchState,
      increaseQuantity,
      decreaseQuantity,
      selectVariant,
      selectSize,
      variantImage,
      variantModalActive,
      displayVariantModal
    }
  }
})
</script>

<style scoped>
  .info-box {
    width: 370px;
  }
  @media (min-width: 1340px) {
    .reset-margin-2xl {
      margin: 0;
    }
  }
</style>

