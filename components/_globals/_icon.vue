<template>
  <div
    v-html="renderRequirePath"
    :class="[dark ? 'text-gray-900' : fill, height, width]"
    class="flex-none"
  ></div>
</template>

<script lang="ts">
import { defineComponent, computed } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseIcon',
  props: {
    // name of the icon to be used
    name: {
      type: String,
      required: true,
    },
    // applies the dark theme variant to the icon
    dark: {
      type: Boolean,
      required: false,
      default: false,
    },
    // decides what color the button should be, its a light gray by default
    fill: {
      type: String,
      required: false,
      default: 'fill-current'
    },
    // decides if the icon should be outlined or solid
    solid: {
      type: Boolean,
      required: false,
      default: false,
    },
    // decides the height of the icon
    height: {
      type: String,
      required: false,
      default: 'h-5'
    },
    // decides the width of the icon
    width: {
      type: String,
      required: false,
      default: 'w-5'
    }
  },
  setup(props) {
    const renderRequirePath = computed((): string => {
      if (props.solid) {
        return require(`../../assets/icons/solid/${props.name}.svg?raw`)
      } else {
        return require(`../../assets/icons/outline/${props.name}.svg?raw`)
      }
    })

    return {
      renderRequirePath
    }
  }
})
</script>
