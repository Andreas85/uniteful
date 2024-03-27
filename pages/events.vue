<script setup lang="ts">
const layoutname = ref<string>('dashboard')
</script>
<template>
  <NuxtLayout :name="layoutname">
    <NuxtPage />
  </NuxtLayout>
</template>
