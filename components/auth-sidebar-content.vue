<template>
  <div>
    <div class="mb-8 text-center">
      <slot name="auth-heading">
        <!-- heading content -->
      </slot>
    </div>
    <div v-if="errorMessage" class="mb-8">
      <BaseError :errors="errorMessage" />
    </div>
    <slot name="auth-content" @set-errors="console.log('fired')">
      <!-- auth body content -->
    </slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, useStore } from '@nuxtjs/composition-api'
export default defineComponent({
  name: 'AuthSidebarContent',
  props: {
    errorMessage: {
      type: String,
      required: false
    }
  },
})
</script>
