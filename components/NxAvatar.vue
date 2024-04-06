<script setup lang="ts">
import Avatar from 'primevue/avatar'

const props = defineProps({
  label: {
    type: String,
    default: ''
  },
  size: {
    type: String,
    default: 'large'
  }
})

const { label, size } = toRefs(props)

</script>

<template>
  <Avatar :label="label" :size="size ?? 'large'" shape="circle" />
</template>
