<template>
  <div :class="{ 'w-full': block, 'mb-8' : error }">
    <label :for="id" :class="{ 'sr-only' : hiddenLabel, 'mb-1' : label }" class="block text-sm font-semibold leading-5 text-gray-700">{{ label }}</label>
    <div class="relative rounded-md">
      <textarea
        @input="$emit('input', $event.target.value)"
        :id="id"
        :value="value"
        :class="{
          'w-full': block,
          'pr-10 border-red-300 text-red-900 placeholder-red-300 focus:border-red-300 focus:ring-red': error,
        }"
        :placeholder="placeholder"
        class="form-input block text-sm leading-5"
        rows="4"
      >
        <slot></slot>
      </textarea>
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
  name: 'BaseTextarea',
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
    // expands input to 100% av available space
    block: {
      type: Boolean,
      required: false,
      default: false
    },
    error: {
      type: [Array, String],
      required: false
    }
  }
})
</script>
