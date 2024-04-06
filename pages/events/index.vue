<script setup lang="ts">

useHead({
  title: `Events | ${STRING_DATA.BRAND_NAME}`
})

</script>
<template>
  <div class="py-8">
    <TemplatesEvents :event-data="[]" />
  </div>
</template>
