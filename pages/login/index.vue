<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
  // or middleware: 'auth'
})

useHead({
  title: `Login | ${STRING_DATA.BRAND_NAME}`
})

</script>
<template>
  <div class="auth-section-class">
    <TemplatesLogin />
  </div>
</template>
