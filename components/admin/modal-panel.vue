<template>
  <div>
    <TransformFadeIn>
      <div v-show="active" @click="closeModal" class="absolute inset-0 transition-opacity bg-black bg-opacity-25" aria-hidden="true"></div>
    </TransformFadeIn>
    <TransformSlideFromRight>
      <div v-show="active" class="lg:w-5/12 fixed top-0 bottom-0 right-0 w-2/5">
        <div class="relative bg-white">
          <div class="h-screen px-12 py-8 overflow-y-auto">
            <div class="flex items-center justify-between px-4">
              <div class="flex items-center">
                <BaseButton @click="closeModal" plain class="mr-4">
                  <BaseIcon name="arrow-left" fill="text-gray-800" />
                </BaseButton>
                <slot name="title">
                  <h1 class="text-2xl font-semibold text-gray-900">{{ title }}</h1>
                </slot>
              </div>
              <BaseButton @click="closeModal" plain>
                <BaseIcon name="x" fill="text-gray-800" />
              </BaseButton>
            </div>
            <div class="pb-12 mt-8">
              <slot>
                Modal content
              </slot>
            </div>
          </div>
          <div class="absolute bottom-0 left-0 right-0">
            <div class="bg-gray-50 px-16 py-5">
              <div class="w-full">
                <BaseButton @click="saveEdit" class="w-full">{{ buttonText }}</BaseButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TransformSlideFromRight>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

import TransformFadeIn from '~/components/transform/fade-in.vue'
import TransformSlideFromRight from '~/components/transform/slide-from-right.vue'

export default defineComponent({
  name: 'AdminModalPanel',
  components: {
    TransformFadeIn,
    TransformSlideFromRight
  },
  props: {
    active: {
      type: Boolean,
      required: true,
      default: false
    },
    title: {
      type: String,
      required: true
    },
    buttonText: {
      type: String,
      default: 'Lagre'
    }
  },
  setup(props, { emit }) {
    const modalActive = computed(() => {
      return props.active
    })

    const closeModal = (): void => {
      emit('close')
    }

    const saveEdit = (): void => {
      emit('save')
    }

    return {
      modalActive,
      closeModal,
      saveEdit
    }
  }
})
</script>
