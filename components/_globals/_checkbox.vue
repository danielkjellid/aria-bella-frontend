<template>
  <div class="flex items-center" :class="{'mr-3' : hiddenLabel }">
    <label class="inline-flex">
      <input
        @change="$emit('input', $event.target.checked)"
        type="checkbox"
        :checked="checked"
        class="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 focus:border-transparent w-5 h-5 text-gray-800 rounded"
      >
      <div v-if="!hiddenLabel" class="ml-3 -mt-px text-sm">
        <span class="block font-semibold text-gray-800">{{ label }}</span>
        <span v-if="helpText" class="block text-gray-500">{{ helpText }}</span>
      </div>
    </label>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'BaseCheckbox',
  props: {
    id: {
      type: String,
      required: false,
    },
    label: {
      type: String,
      required: true,
    },
    helpText: {
      type: String,
      required: false,
    },
    checked: {
      type: Boolean,
      required: true,
      default: true
    },
    hiddenLabel: {
      type: Boolean,
      required: false,
      default: false,
    }
  }
})
</script>
