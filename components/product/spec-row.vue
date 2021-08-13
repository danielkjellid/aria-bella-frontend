<template>
  <tr>
    <td class="text-sm text-gray-700">{{ title }}</td>
    <td class="text-sm text-gray-900">
      <span v-for="(item, index) in fields" :key="item.name">
        <span v-if="index !== 0">, </span>
        <span>{{ item.name }}</span>
      </span>
    </td>
  </tr>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'ProductSpecRow',
  props: {
    title: {
      type: String,
      required: true
    },
    fields: {
      required: true
    }
  }
})
</script>
