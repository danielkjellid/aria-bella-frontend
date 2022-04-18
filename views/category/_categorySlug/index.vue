<template>
  <div>
    <BaseNavbar />
    <main>
      <BaseImageheader :object="category" />
      <div class="container max-w-screen-xl min-h-screen mx-auto">
        <BaseBreadcrumbs :breadcrumbs="breadcrumbs" class="px-4 py-8" />
        <section class="xl:px-0 px-4 pb-8">
          <div class="lg:gap-8 grid max-w-screen-xl grid-cols-1 gap-12 mx-auto">
            <div
              v-for="(subcategory, index) in subCategories"
              :key="subcategory.id"
              class="lg:grid-cols-3 lg:gap-16 grid content-center grid-cols-1 gap-4"
            >
              <div
                class="image-container shrink-0 lg:col-span-2 relative col-span-1 overflow-hidden rounded-md"
                :class="index % 2 == 0 ? 'lg:order-2 order-1' : 'order-1'"
              >
                <img
                  v-if="loaded"
                  :src="subcategory.images.image600x440"
                  alt=""
                  class="absolute inset-0 object-cover w-full h-full"
                  :srcset="
                    `${subcategory.images.image500x305} 500w,
                          ${subcategory.images.image600x440} 600w,
                          ${subcategory.images.image850x520} 850w`
                  "
                />
                <div v-else class="animate-pulse image-container h-4 bg-gray-400 rounded" />
              </div>
              <div
                class="lg:self-center lg:px-16 self-start order-1 col-span-1"
                :class="index % 2 == 0 ? 'order-2 lg:order-1' : 'order-1'"
              >
                <div class="flex items-center justify-between">
                  <h1 v-if="loaded" class="text-xl font-medium text-gray-900">
                    {{ subcategory.name }}
                  </h1>
                  <div v-else class="animate-pulse w-4/5 h-6 bg-gray-400 rounded" />
                  <BaseButton
                    v-if="loaded"
                    plain
                    :to="`/category/${category.slug}/${subcategory.slug}/`"
                    class="hover:underline lg:hidden inline-flex text-sm"
                    >Se produkter →</BaseButton
                  >
                  <div v-else class="animate-pulse lg:hidden w-2/5 h-4 bg-gray-400 rounded" />
                </div>
                <div>
                  <p v-if="loaded" class="mt-2 text-sm text-gray-700">
                    {{ subcategory.description }}
                  </p>
                  <div v-else class="animate-pulse mt-2 mb-4 space-y-2">
                    <div class="h-4 bg-gray-400 rounded" />
                    <div class="w-3/4 h-4 bg-gray-400 rounded" />
                    <div class="h-4 bg-gray-400 rounded" />
                    <div class="w-1/2 h-4 bg-gray-400 rounded" />
                  </div>
                </div>
                <BaseButton
                  v-if="loaded"
                  plain
                  :to="`/category/${category.slug}/${subcategory.slug}/`"
                  class="hover:underline lg:inline-flex hidden mt-4 text-sm"
                  >Se produkter →</BaseButton
                >
                <div v-else class="w-2/5 h-4 bg-gray-400 rounded" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
    <BaseFooter />
  </div>
</template>

<script>
export default {
  name: 'CategoryList',
  head() {
    return {
      title: `${this.metaTitle}`,
      meta: [
        {
          name: 'description',
          content: `Underkategorier innenfor ${this.currentCategory}.`,
        },
      ],
    }
  },
  computed: {
    metaTitle() {
      // make first letter of category slug capital
      return this.currentCategory.charAt(0).toUpperCase() + this.currentCategory.slice(1)
    },
    currentCategory() {
      return this.$route.params.categorySlug
    },
    breadcrumbs() {
      return [
        { text: 'Flishuset', disabled: false, href: '/' },
        { text: `${this.metaTitle}`, disabled: true },
      ]
    },
  },
  data() {
    return {
      subCategories: [],
      category: {},
      loaded: false,
    }
  },
  methods: {
    fetchCategory() {
      const category = this.$route.params.categorySlug
      this.$axios.get(`categories/${category}/`).then(category => {
        this.category = category.data
      })
    },
    fetchSubCategories() {
      const category = this.$route.params.categorySlug
      this.$axios.get(`categories/${category}/subcategories/`).then(category => {
        this.subCategories = category.data
        this.loaded = true
      })
    },
  },
  created() {
    this.fetchCategory()
    this.fetchSubCategories()
  },
}
</script>

<style scoped>
.image-container {
  width: 100%;
  height: 250px;
}
@media (min-width: 640px) {
  .image-container {
    height: 350px;
  }
}
@media (min-width: 768px) {
  .image-container {
    height: 440px;
  }
}
@media (min-width: 1024px) {
  .image-container {
    height: 500px;
    width: 100%;
    max-width: 850px;
  }
}
@media (min-width: 1280px) {
  .image-container {
    height: 520px;
    width: 100%;
    max-width: 850px;
  }
}
</style>
