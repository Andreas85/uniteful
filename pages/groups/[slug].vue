<script setup lang="ts">

definePageMeta({
  middleware: ['privateroute']
})

const { fetchGroupDetailService } = useGroupsService()
const route = useRoute()
const { data: user, refresh, pending, status } = await useAsyncData(() => fetchGroupDetailService({ id: route.params.slug?.toString() }))

</script>
<template>
  <template v-if="pending">
    <NxLoadingPage />
  </template>
  <template v-else>
    <TemplatesGroupDetail :group-data="user" />
  </template>
</template>
