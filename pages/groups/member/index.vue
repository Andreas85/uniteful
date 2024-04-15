<script setup lang="ts">
definePageMeta({
  middleware: ['privateroute']
})

useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`
})

</script>
<template>
  <div class="flex flex-col gap-4 ">
    <TemplatesJoinedRequest />
    <TemplatesMyPendingGroupRequest />
  </div>
</template>
