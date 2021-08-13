<template>
  <div :class="{ 'w-full': block, 'mb-8' : error }">
    <label
      :for="id" :class="{ 'sr-only' : hiddenLabel, 'mb-1' : label }"
      class="block text-sm font-semibold leading-5 text-gray-700"
    >
      {{ label }}
    </label>
    <div class="relative rounded-md">
      <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <BaseIcon v-if="icon" :name="icon" :fill="iconColor"/>
      </div>
      <input
        @input="$emit('input', $event.target.value)"
        :id="id"
        :value="value"
        :class="{
          'pl-10': icon,
          'w-full': block,
          'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red': error,
          'border-0 focus:ring-transparent' : plain,
        }"
        :placeholder="placeholder"
        :type="type"
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-800 focus:border-transparent block text-sm leading-5 border-gray-200 rounded-md"
      />
      <div v-if="error" class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <BaseIcon name="exclemation-circle" solid fill="text-red-500" />
      </div>
    </div>
    <p v-if="error" class="absolute text-sm text-red-600">{{ error }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseInput',
  props: {
    // controls the for and id fields in input and label
    id: {
      type: String,
      required: false,
      default: 'input'
    },
    // sets label to screen reader only
    hiddenLabel: {
      type: Boolean,
      required: false,
      default: false,
    },
    // sets the label itself
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: false,
    },
    value: {
      type: String,
      required: false
    },
    type: {
      type: String,
      required: false,
      default: 'text'
    },
    // decides wether an input should have an icon by defined icon name
    icon: {
      type: String,
      required: false,
      default: null
    },
    // sets color of icon if default is not prefered
    iconColor: {
      type: String,
      required: false,
      default: 'text-gray-400'
    },
    // expands input to 100% av available space
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: [Array, String],
      required: false
    },
    plain: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
})
</script>
