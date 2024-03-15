<script setup lang="ts">

definePageMeta({
  middleware: ["privateroute"]
})

useHead({
  title: `Your Events | ${STRING_DATA.BRAND_NAME}`,
})

</script>
<template>
  <div class="py-8">
    <TemplatesEvents :eventData="[]" />
  </div>
</template>
