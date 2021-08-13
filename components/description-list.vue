<template>
  <div class="max-w-5xl mx-auto mt-6">
    <dl class="gap-x-4 gap-y-8 sm:grid-cols-2 grid grid-cols-1">
      <div
        v-for="(field, index) in fields"
        :key="index"
        class="sm:col-span-1"
      >
        <dt class="text-sm font-semibold text-gray-500">
          {{ field.text }}
        </dt>
        <dd
          v-for="(value, property, index) in item"
          :key="index"
          class="mt-1 text-sm text-gray-900"
        >
          <template v-if="field.name === property">
            <slot :name="property" :item="item">
              {{ value }}
            </slot>
          </template>
        </dd>
      </div>
    </dl>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'DescriptionList',
  props: {
    // array of objects which attaches the correct field name to the correct label
    fields: {
      type: Array,
      required: true,
    },
    // data
    item: {
      type: Object,
      required: true,
    }
  }
})
</script>
