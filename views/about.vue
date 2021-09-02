<template>
  <main class>
    <BaseImageHeader :object="image" />
    <section class="max-w-screen-xl px-8 py-12 mx-auto text-center">
      <h1 class="pb-6 text-3xl font-extrabold text-gray-900">
        Lorem ipsum dolor sit amet.
      </h1>
      <p class="text-md max-w-prose mx-auto text-gray-800">
        I'm baby distillery taxidermy trust fund bitters. Hoodie hashtag hell of
        keffiyeh raw denim godard ugh, health goth try-hard +1 slow-carb. Next
        level trust fund fashion axe cold-pressed shoreditch, blog sartorial
        live-edge roof party humblebrag prism. Pork belly food truck live-edge
        brooklyn chambray authentic squid tumblr gochujang copper mug actually
        vaporware chicharrones. Four dollar toast banjo leggings, lomo retro
        gochujang vegan bitters pinterest actually coloring book glossier.
      </p>
      <p class="text-md max-w-prose pt-5 mx-auto text-gray-800">
        Activated charcoal sustainable man bun mixtape bushwick migas hell of
        literally beard echo park aesthetic cornhole snackwave asymmetrical
        chartreuse. Wayfarers af everyday carry gastropub williamsburg.
      </p>
    </section>
    <section class="px-8 pb-12">
      <div class=" md:grid-cols-2 lg:grid-cols-3 gap-14 justify-items-center justify-self-center grid max-w-screen-lg grid-cols-1 mx-auto">
        <div v-for="store in stores" :key="store.name" class="w-80 flex flex-col">
          <div class="relative w-full h-64 mb-4">
            <img
              :src="store.image"
              alt="image of store"
              class="absolute inset-0 object-cover w-full h-full rounded-md"
            />
          </div>
          <p class="pb-1 font-semibold text-gray-900">{{ store.storeName }}</p>
          <p class="text-brand-700 pb-4 text-sm">
            {{ store.address }}
          </p>
          <p class="pb-1 text-sm text-gray-800">
            {{ store.info }}
          </p>
          <div class="mt-2">
            <a :href="`mailto:${store.email}`" class="hover:text-brand-600 flex items-center text-sm text-gray-700">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              <span class="ml-2">{{ store.email }}</span>
            </a>
            <a :href="`tel:${store.phoneNumber}`" class="hover:text-brand-600 flex items-center mt-2 text-sm text-gray-700">
              <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              <span class="ml-2">{{ store.phoneNumber }}</span>
            </a>
          </div>

        </div>
      </div>
    </section>
    <section class="max-w-3xl px-8 pt-12 pb-24 mx-auto">
      <div class="bg-brand-50 px-5 py-5 rounded-md">
        <div class="flex flex-wrap items-center justify-between">
          <div class="mr-4">
            <h2 class="text-brand-700 font-semibold">Noe du lurer på?</h2>
            <p class="mt-1 text-sm text-gray-700">
              Lorem ipsum dolor sit amet.
            </p>
          </div>
          <BaseButton plain to="/contact-us/" class="hover:underline text-brand-800 text-sm">Kontakt oss →</BaseButton>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "About",
  meta: {},
  head: {},
  setup() {
    const image = {
      name: "Om oss",
      image_512x512: "https://source.unsplash.com/random",
      image_1024x1024: "https://source.unsplash.com/random",
      image_1024x480: "https://source.unsplash.com/random",
      image_1536x660: "https://source.unsplash.com/random",
      image_2048x800: "https://source.unsplash.com/random",
      image_2560x940: "https://source.unsplash.com/random",
      image_3072x940: "https://source.unsplash.com/random",
    }

    const stores = [
      {
        storeName: 'Bella Drammen',
        image: 'https://source.unsplash.com/random',
        address: 'St. Hallvardsvei 15, 3414 Lierstranda',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dicta voluptatum ipsum blanditiis perferendis soluta quibusdam cum. Nostrum, aliquam magni.',
        phoneNumber: '+47 33 24 07 30',
        email: 'bella@bella.no'
      },
      {
        storeName: 'Bella Oslo',
        image: 'https://source.unsplash.com/random',
        address: 'Bygdøy Allè 69D, 0265 Oslo',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dicta voluptatum ipsum blanditiis perferendis soluta quibusdam cum. Nostrum, aliquam magni.',
        phoneNumber: '+47 21 38 47 30',
        email: 'studio@bella.no'
      },
      {
        storeName: 'Bella Tønsberg',
        image: 'https://source.unsplash.com/random',
        address: 'Baglergaten 1, 3110 Tønsberg',
        info: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum dicta voluptatum ipsum blanditiis perferendis soluta quibusdam cum. Nostrum, aliquam magni.',
        phoneNumber: '+47 40 00 69 50',
        email: 'katherine@bella.no'
      },
    ]

    return {
      image,
      stores
    }
  },
});
</script>
