<template>
  <main class>
    <BaseImageHeader :object="image" />
    <section
      class="md:flex-row lg:gap-32 flex flex-col max-w-screen-lg gap-16 px-8 py-12 mx-auto">
      <div class="flex-1">
        <h3 class="pb-6 text-3xl font-extrabold text-gray-900">Noe du lurer på?</h3>
        <p class="max-w-prose pb-6 text-sm text-gray-800">
          Aliquam sed egestas justo, quis finibus mi. Sed facilisis, arcu nec
          auctor ultrices, ex erat ornare turpis, at sollicitudin. Jettulerer
          med dagen.
        </p>
        <div class="flex flex-row items-center gap-2">
          <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <p class="text-sm text-gray-600">
            St. Hallvardsvei 15, 3414 Lierstranda
          </p>
        </div>
        <div class="flex flex-row items-center gap-2 py-3">
          <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <p class="text-sm text-gray-600">+47 33 24 07 30</p>
        </div>
        <div class="flex flex-row items-center gap-2">
          <svg class="w-5 h-5 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
          <p class="text-sm text-gray-600">bella@bella.no</p>
        </div>
      </div>
      <div class="flex-1">
        <form @submit.prevent="sendMessage">
          <BaseInput
            id="id_name"
            v-model="contact.name"
            label="Navn"
            block
            class="pb-4"
          />
          <BaseInput
            id="id_email"
            v-model="contact.email"
            label="Email"
            block
            type="email"
            class="pb-4"
          />
          <BaseInput
            id="id_phone_number"
            v-model="contact.phone_number"
            label="Telefon"
            block
            class="pb-4"
          />
          <BaseTextarea
            id="id_meta_description"
            v-model="contact.message"
            label="Melding"
            block
            class="pb-4"
          />
          <BaseButton type="submit">Send</BaseButton>
        </form>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "@nuxtjs/composition-api";

export default defineComponent({
  name: "Contact",
  head: {
    title: 'Kontakt oss'
  },
  setup() {
    interface ContactObj {
      name: string;
      email: string;
      phone_number: string;
      message: string;
    }

    let contact = reactive<ContactObj>({
      name: "",
      email: "",
      phone_number: "",
      message: "",
    });

    const image = {
      name: "Kontakt",
      image_512x512: "https://source.unsplash.com/random",
      image_1024x1024: "https://source.unsplash.com/random",
      image_1024x480: "https://source.unsplash.com/random",
      image_1536x660: "https://source.unsplash.com/random",
      image_2048x800: "https://source.unsplash.com/random",
      image_2560x940: "https://source.unsplash.com/random",
      image_3072x940: "https://source.unsplash.com/random",
    };

    const sendMessage = async () => {
      console.log(contact);
    };

    return {
      contact,
      image,
      sendMessage,
    };
  },
});
</script>
