<script setup lang="ts">

definePageMeta({
  middleware: ['auth']
})

useHead({
  title: `Signup | ${STRING_DATA.BRAND_NAME}`
})

</script>
<template>
  <div class="auth-section-class">
    <TemplatesSignup />
  </div>
</template>
