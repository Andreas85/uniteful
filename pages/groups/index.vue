<script setup lang="ts">
definePageMeta({
  middleware: ["privateroute"]
})
useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`,
})
</script>
<template>
  <div class="py-8">
    <TemplatesGroups />
  </div>
</template>
