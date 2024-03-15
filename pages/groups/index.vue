<script setup lang="ts">
const { fetchGroupsService } = useGroupsService();

// const { $api } = useNuxtApp()
// const userRepo = userService($api)
const { data: users, refresh, pending, status } = await useAsyncData(() => fetchGroupsService())

definePageMeta({
  middleware: ["privateroute"]
})
useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`,
})
</script>
<template>
  <div class="py-8">
    <TemplatesGroups :users="[]" />
  </div>
</template>
