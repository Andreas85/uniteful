<script setup lang="ts">
import Avatar from 'primevue/avatar'

const props = defineProps({
  label: {
    type: String,
    default: ''
  }
})

const { label } = toRefs(props)

</script>

<template>
  <Avatar :label="label" size="large" shape="circle" />
</template>
