<script setup lang="ts">
definePageMeta({
  middleware: ["privateroute"],
})

useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`,
})


const { fetchGroupOwnershipService } = useGroupsService();
const { data: GroupData, refresh } = useAsyncData(() => fetchGroupOwnershipService())


</script>
<template>

  <!-- <NxCustomTab :tab-list="GROUPS_TAB" v-on:tab-click="handleTabClick" :active-tab="selectedTab" /> -->
  <TemplatesGroups :users="GroupData" />
</template>
