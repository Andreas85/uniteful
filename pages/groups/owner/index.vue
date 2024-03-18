<script setup lang="ts">
definePageMeta({
  middleware: ["privateroute"],
})

useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`,
})

const pageRef = ref(0);
const limitRef = ref(6);
const totalCount = ref(6);
const totalPage = ref(2);

const { fetchGroupOwnershipService } = useGroupsService();
const { data: GroupData, refresh } = useAsyncData(() => fetchGroupOwnershipService({ page: pageRef.value, limit: limitRef.value }))


const prevPage = () => {
  if (pageRef.value > 0) {
    pageRef.value = pageRef.value - 1
    refresh()
  }
}

const nextPage = () => {
  const lastPage = Math.floor(totalCount.value / limitRef.value)
  if (pageRef.value < lastPage) {
    pageRef.value = pageRef.value + 1
    refresh()
  }
}

</script>
<template>
  <div class="flex flex-col gap-4 ">
    <TemplatesGroups :users="GroupData" :heading="STRING_DATA.YOUR_GROUPS" />
    <NxPagination :totalCount="totalPage" v-on:prev="prevPage" v-on:next="nextPage" />
  </div>
</template>
