// ts-shim.d.ts

import { NuxtAxiosInstance } from '@nuxtjs/axios'

import Vue from 'vue'

declare module '*.vue' {
  export default Vue
}


declare module '@nuxt/types' {
  interface Context {
    $axios: NuxtAxiosInstance
  }

  interface Context {
    $context(message: string): void
  }
}

