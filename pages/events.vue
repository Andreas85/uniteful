<script setup lang="ts">
const route = useRoute()
const layoutname = ref<string>('')

watch(() => route.path, (newValue) => {
  if (newValue === ROUTE_CONSTANTS.EVENTS) {
    layoutname.value = 'dashboard'
  } else {
    layoutname.value = 'events'
  }
}, { immediate: true })

</script>
<template>
  <NuxtLayout :name="layoutname">
    <NuxtPage />
  </NuxtLayout>
</template>
