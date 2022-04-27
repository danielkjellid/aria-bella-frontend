<template>
  <main>
    <BaseImageHeader :object="category" />
    <!-- site product content -->
    <div class="container px-5 py-8 mx-auto">
      <!-- filter menu on smaller devices -->
      <div v-show="filterMobileMenuActive" class="fixed inset-0 z-50 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div @click="filterMobileMenuActive = false" class="absolute inset-0 transition-opacity bg-black bg-opacity-50"></div>
            <transition
              enter-class="-translate-x-full"
              enter-active-class="sm:duration-700 transition duration-500 ease-in-out transform"
              enter-to-class="translate-x-0"
              leave-class="translate-x-0"
              leave-active-class="sm:duration-700 transition duration-500 ease-in-out transform"
              leave-to-class="-translate-x-full"
            >
              <section v-show="filterMobileMenuActive" class="absolute inset-y-0 left-0 z-50 flex max-w-full mr-10">
                <div class="w-screen max-w-xs">
                  <div class="flex flex-col h-full py-6 space-y-6 overflow-y-scroll bg-white shadow-xl">
                    <header class="sm:px-6 px-4">
                      <div class="flex items-start justify-between space-x-3">
                        <h2 class="text-base font-semibold leading-6 text-gray-900">Filtrer</h2>
                        <div class="h-7 flex items-center">
                          <button @click="filterMobileMenuActive = false" class="hover:text-gray-800 w-5 h-5 text-gray-600">
                            <svg fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                              <path d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                          </button>
                        </div>
                      </div>
                    </header>
                    <div class="relative flex-1 px-3">
                      <div class="mb-5" v-if="filters.length > 0">
                        <h3 class="px-3 text-xs font-semibold leading-4 tracking-wide text-gray-500 uppercase">Valgte filtre</h3>
                        <div class="mt-2">
                          <BaseButton v-for="(filter, index) in filters" :key="`${filter}-${index}`" plain class="hover:bg-gray-100 bg-gray-50 w-full px-2 py-2 mb-1 text-sm leading-6 text-gray-500 border border-gray-200 rounded" @click="() => toggleFilter(filter)">
                            <div class="flex items-center">
                              <BaseIcon name="x" solid height="h-4" width="w-4" />
                              <span class="ml-3 text-gray-700">{{ filter }}</span>
                            </div>
                          </BaseButton>
                        </div>
                      </div>
                      <ProductFilterBlock :loading="fetchState.pending" title="Fasonger" :items="availableFilters.shapes" :activeFilters="filters" @toggle-filter="toggleFilter" />
                      <ProductFilterBlock :loading="fetchState.pending" title="Materiale" :items="availableFilters.materials" :activeFilters="filters" @toggle-filter="toggleFilter" />
                      <ProductFilterBlock :loading="fetchState.pending" title="Farger" :items="availableFilters.colors" :activeFilters="filters" @toggle-filter="toggleFilter">
                        <template #box="{ item }">
                          <div :style="`background-color: ${item.color_hex}`" class="w-5 h-5 mr-3 border border-gray-200 rounded-full"></div>
                        </template>
                      </ProductFilterBlock>
                    </div>
                  </div>
                </div>
              </section>
            </transition>
        </div>
      </div>

      <BaseBreadcrumbs :breadcrumbs="breadcrumbs" class="lg:px-3"/>
      <TransformFadeIn>
        <div v-show="filterMenuActive" class="lg:block hidden mt-8">
          <div class="grid grid-cols-5 gap-3">
            <ProductFilterBlock :loading="fetchState.pending" title="Fasonger" :items="availableFilters.shapes" :activeFilters="filters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock :loading="fetchState.pending" title="Materiale" :items="availableFilters.materials" :activeFilters="filters" @toggle-filter="toggleFilter" />
            <ProductFilterBlock :loading="fetchState.pending" title="Farger" :items="availableFilters.colors" :activeFilters="filters" @toggle-filter="toggleFilter">
              <template #box="{ item }">
                <div :style="`background-color: ${item.color_hex}`" class="w-5 h-5 mr-3 border border-gray-200 rounded-full"></div>
              </template>
            </ProductFilterBlock>
          </div>
        </div>
      </TransformFadeIn>
      <div class="mt-5">
        <div class="w-full">
          <section class="lg:px-3">
            <div>
              <div class="lg:hidden w-full mb-2">
                <BaseButton @click="filterMobileMenuActive = true" light class="lg:hidden flex items-center justify-center w-full mr-3">
                  <BaseIcon name="filter" class="mr-2" fill="text-brand-500" />
                  Filter
                  <span v-if="filters.length > 0" class="text-brand-800 bg-brand-400 flex items-center justify-center w-5 h-5 ml-2 text-xs rounded-full">{{ countFiltersActive }}</span>
                </BaseButton>
              </div>
              <form @submit.prevent="searchEndpoint()">
                <div class="flex items-center w-full">
                  <BaseInput
                    v-model="search"
                    icon="search"
                    placeholder="Søk i tusenvis av varer"
                    block
                    label="search"
                    hiddenLabel
                  />
                  <BaseButton light @click="filterMenuActive = !filterMenuActive" class="lg:flex hidden ml-2">
                    <BaseIcon v-if="!filterMenuActive" name="filter" class="mr-2" fill="text-brand-500" />
                    <BaseIcon v-else name="x" outline class="mr-2" fill="text-brand-500" />
                    Filter
                    <span v-if="filters.length > 0" class="text-brand-800 bg-brand-400 flex items-center justify-center w-5 h-5 ml-2 text-xs rounded-full">{{ countFiltersActive }}</span>
                  </BaseButton>
                  <BaseButton type="submit" class="ml-2">Søk i varer</BaseButton>
                </div>
              </form>
            </div>
          </section>
          <!-- <section class="lg:px-3 relative mt-5">
            <div class="auto-cols-max relative grid grid-flow-col gap-2 overflow-x-auto">
              <div v-for="c in tempCat" :key="c" class="relative">
                <div class="w-72 table-cell h-48 align-middle rounded-md">
                  <img :src="c.img" class="absolute bottom-0 left-0 right-0 object-cover w-full h-full rounded-md" />
                  <div class="hover:bg-opacity-50 absolute inset-0 flex items-center justify-center h-full px-4 bg-black bg-opacity-25 rounded-md">
                    <h2 class="text-2xl font-semibold text-white">{{c.title}}</h2>
                  </div>
                </div>
              </div>
              <div class="absolute inset-0">
                <div class="absolute top-0 bottom-0 right-0 flex items-center">
                  <BaseIcon class="test" name="chevron-right" solid fill="text-brand-600" height="h-8" width="w-8" />
                </div>
              </div>
            </div>
          </section> -->
          <!-- <section class="lg:px-3 relative mt-5">
            <Test />
          </section> -->
          <!-- <section class="lg:px-3 relative mt-5">
            <ProductCategoriesBlock :categories="tempCat" />
          </section> -->

          <div v-if="fetchState.pending">
            <section class="animate-pulse sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 lg:gap-1 grid w-full grid-cols-1 gap-6 px-3 mt-5">
              <div v-for="i in 12" :key="i" style="height: 408px" class="w-full bg-gray-400 rounded" />
            </section>
          </div>
          <div v-else>
            <section v-if="products.length > 0" class="sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-4 lg:gap-1 grid w-full grid-cols-1 gap-6 mt-5">
              <ProductCard v-for="product in filteredProducts" :key="`${product.id}-${product.name}`" :product="product" />
            </section>
            <section v-else class="px-3">
              <BaseNodata errorMessage="Vi fant dessverre ingen ting..." />
            </section>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts">
import { computed, defineComponent, useContext, useRoute, useMeta, ref, watch, useFetch } from '@nuxtjs/composition-api'
import Section from '~/components/admin/section.vue'
import ProductCard from '~/components/product/card.vue'
import ProductCategoriesBlock from '~/components/product/categories-block.vue'
import ProductFilterBlock from '~/components/product/filter-block.vue'
import TransformFadeIn from '~/components/transform/fade-in.vue'
import Test from '~/components/test.vue'

export default defineComponent({
  name: 'Category',
  meta: {
    navbarTransparent: true
  },
  head: {},
  components: {
    ProductCard,
    ProductFilterBlock,
    ProductCategoriesBlock,
    TransformFadeIn,
    Section,
    Test
  },
  setup() {

    const tempCat = [
      {
        title: 'Vasker',
        img: 'https://www.antoniolupi.it/resources/halfhd/5e6f46c766d10a004db43983/uploads/2020/12/16/1608124438546_lavabi.jpg'
      },
      {
        title: 'Badekar',
        img: 'https://www.antoniolupi.it/resources/halfhd/5e6f46c766d10a004db43986/uploads/2020/12/16/1608124194478_vasche.jpg'
      },
      {
        title: 'Kraner',
        img: 'https://www.antoniolupi.it/resources/halfhd/5e6f46c766d10a004db43992/uploads/2020/12/16/1608124694550_rubinetti.jpg'
      },
      {
        title: 'Dusjhoder',
        img: 'https://www.antoniolupi.it/resources/halfhd/5e6f46c766d10a004db4398c/uploads/2020/12/16/1608124647266_soffioni.jpg'
      },
      {
        title: 'Speil og lys',
        img: 'https://www.antoniolupi.it/resources/halfhd/5e6f46c766d10a004db4399e/uploads/2020/12/17/1608204991931_al_showroom_2020_10_01_pedana_06_25_gen.jpg'
      },
      {
        title: 'Peis',
        img: 'https://www.antoniolupi.it/resources/halfhd/5e6f46c766d10a004db43989/uploads/2020/12/16/1608124612788_camini.jpg'
      },
      {
        title: 'Tepper',
        img: 'https://www.antoniolupi.it/resources/halfhd/602e3e2236de77d912e445fd/uploads/2021/2/18/1613643377829_09_al_showroom_2020_10_22_pietra_fuoco_05_gen.jpg'
      },
      {
        title: 'Topper',
        img: 'https://www.antoniolupi.it/resources/halfhd/5e6f46c766d10a004db4398f/uploads/2020/12/16/1608124670264_top.jpg'
      },

    ]

    /**************
    ** Utilities **
    **************/

    const route = useRoute()
    const { $axios } = useContext()
    const { title } = useMeta()

    interface ProductMetaObj {
      id?: number
      name: string
      color_hex?: string
      thumbnail?: string
      image?: string
      additional_cost?: number
      count?: number
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
      slug: string
      categories: ProductMetaObj[]
      colors: ProductMetaObj[]
      shapes: ProductMetaObj[]
      materials: ProductMetaObj[]
      thumbnail: string
      variants: ProductMetaObj[]
    }

    /***************
    ** Categories **
    ***************/

    let category: any = ref<object>({})

    const currentCategory = computed(() => {
      return route.value.params.categorySlug
    })

    console.log(route.value)

    const currentSubCategory = computed(() => {
      return route.value.params.subCategorySlug
    })

    const formattedCurrentCategory = computed(() => {
      return currentCategory.value.charAt(0).toUpperCase() + currentCategory.value.slice(1)
    })


    /***********************
    ** Component specific **
    ***********************/

    let loaded = ref<boolean>(false)
    let filterMobileMenuActive = ref<boolean>(false)
    let filterMenuActive = ref<boolean>(false)

    const breadcrumbs = computed(() => {
      return [
        { text: 'Bella', disabled: false, href: '/' },
        { text: `${formattedCurrentCategory.value}`, disabled: false, href: `/category/${currentCategory.value}/` },
        { text: `${category.value.name}`, disabled: true }
      ]
    })

    // make first letter of category slug capital
    title.value = category.value.name


    /*************
    ** Products **
    *************/

    let fetchedProducts = ref<ProductObj[]>([])

    const products = computed(() => {
      return fetchedProducts.value
    })

    /***********
     ** Query **
    ***********/

    let search = ref<string>('')
    const query = ref<string | (string | null)[]>(route.value.query.subcategory)

    const routeQuery = computed(() => {
      let routeQuery = route.value.query.subcategory

      if (routeQuery && typeof routeQuery === 'string') return routeQuery = routeQuery.replace(/-/g, ' ')

      return null
    })

    const searchEndpoint = () => {
      $axios.$get(`categories/category/${currentSubCategory.value}/products/?search=${search.value}`)
        .then(products => {
          fetchedProducts.value = products
          loaded.value = true
        })
    }

    /**************
    ** Filtering **
    **************/

    let selectedFilters = ref<string[]>([])

    const filters = computed(() => {
      return selectedFilters.value
    })

    const countFiltersActive = computed(() => {
      return selectedFilters.value.length
    })

    const availableFilters = computed(() => {
      interface TempArrayObj {
        shapes: ProductMetaObj[]
        materials: ProductMetaObj[]
        colors: ProductMetaObj[]
      }

      let filters = {
        shapes: [],
        materials: [],
        colors: []
      } as TempArrayObj

      // create a temporary array of fields
      let tempArray: TempArrayObj = {shapes: [], materials: [], colors: []}

      // concat each object in the respected array in the product list
      filteredProducts.value.map(product => {
        product.shapes.map(shape => tempArray.shapes.push(shape))
        product.materials.map(material => tempArray.materials.push(material))
        product.colors.map(color => tempArray.colors.push(color))
      })

      // function to add an instance of an element to the filters object
      let appendFilter = (array: ProductMetaObj[], destination: string) => {

        type DestinationArray = 'shapes' | 'materials' | 'colors'

        // map the array arg
        array.map(element => {
          // store the count of each instance
          let count = array.filter(el => el.name === element.name).length

          // create a new version of array where duplicates are removed
          let uniqueStyles = array.reduce((unique: ProductMetaObj[], object: ProductMetaObj) => {
            // if the object is unique, push it to own unique array
            if (!unique.some((obj) => obj.name === object.name)) {
              unique.push(object)
            }
            // return as an array of unique objects
            return unique
          }, [])

          // find index of element in mapping
          let objectIndex: number = uniqueStyles.findIndex(object => object.name === element.name)
          // append the count property and value
          uniqueStyles[objectIndex].count = count

          // check if the destinatio is the colors object
          // if so, we want to add a specific field unique to the color objects
          if (destination === 'colors') {
            uniqueStyles[objectIndex].color_hex = element.color_hex
          }

          // set the desination list equal to unique list with added properties
          filters[(destination as DestinationArray)] = uniqueStyles
        })
      }

      // append filters to the filter object
      appendFilter(tempArray.shapes, 'shapes')
      appendFilter(tempArray.materials, 'materials')
      appendFilter(tempArray.colors, 'colors')

      // return available fitlers
      return filters
    })

    const filteredProducts = computed(() => {
      // check each product filter if any values is inside the selectedFilter array
      const productList = products.value.filter((product: ProductObj) =>
        filters.value.every(filter =>
          product.shapes.some(shape => shape.name === filter) ||
          product.materials.some(material => material.name === filter) ||
          product.colors.some(color => color.name === filter)
        )
      )

      // if any filters is selected, return the filtered list
      if (productList.length > 0) {
        return productList

      // if not, return all products
      } else {
        return products.value
      }
    })

    const toggleFilter = (filter: string) => {
      if (selectedFilters.value.includes(filter)) {
        selectedFilters.value.splice(selectedFilters.value.indexOf(filter), 1)
      } else {
        selectedFilters.value.push(filter)
      }
    }

    const { fetch, fetchState } = useFetch(async () => {
      category.value = await $axios.$get(`categories/category/${currentSubCategory.value}/`)
      fetchedProducts.value = await $axios.$get(`categories/category/${currentSubCategory.value}/products/`)
    })

    watch(query, (currentValue, oldValue) => {
      fetch()
      selectedFilters.value = []
    })

    fetch()

    return {
      search,
      fetchState,
      breadcrumbs,
      category,
      filters,
      availableFilters,
      products,
      filteredProducts,
      filterMenuActive,
      filterMobileMenuActive,
      toggleFilter,
      searchEndpoint,
      countFiltersActive,
      tempCat
    }
  }
})
</script>

<style scoped>
  .container {
    max-width: 1700px;
  }

  .slide-in-enter-active {
    animation: slide-in-left 0.4s linear;
  }

  .slide-in-leave-active {
    animation: slide-in-left 0.4s linear reverse;
  }

  @keyframes slide-in-left {
    from {
      margin-right: 100%;
    }
    to {
      margin-right: 0%;
    }
  }

  .test {
    animation: nudge 2s infinite;
  }

  @keyframes nudge {
    0%, 100% {
      transform: translateX(-25%);
      animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
    }
    50% {
      transform: translateX(0%);
      animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
    }
  }
</style>
