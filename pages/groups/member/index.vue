<script setup lang="ts">
definePageMeta({
  middleware: ['privateroute']
})

useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`
})

const { fetchGroupMembershipService } = useGroupsService()
const { data: GroupData, refresh } = useAsyncData(() => fetchGroupMembershipService({ limit: '6', page: '0' }))

</script>
<template>
  <TemplatesGroups :users="GroupData" :heading="STRING_DATA.YOUR_MEMBERS" />
</template>
