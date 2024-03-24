<script setup lang="ts">
definePageMeta({
  middleware: ['privateroute']
})

useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`
})

const route = useRoute()
const pageRef = ref(0)
const limitRef = ref(6)
const totalCount = ref(6)
const queryParam = ref(useRoute().query ?? {})

const { fetchGroupOwnershipService } = useGroupsService()
const { data: GroupData, refresh, pending } = useAsyncData(NUXT_ASYNC_DATA_KEY.OWNER_GROUP, () => fetchGroupOwnershipService({ page: pageRef.value, limit: limitRef.value }))

const totalPage = ref(Math.ceil(GroupData.value?.count / limitRef.value))

const prevPage = () => {
  if (pageRef.value > 0) {
    pageRef.value = pageRef.value - 1
    // refresh()
    const encryptvalue = setDataInQueryParams(pageRef.value)
    navigateTo(route.path + '?q=' + encryptvalue)
  }
}

const nextPage = () => {
  // console.log(useRoute().query)
  if (pageRef.value < totalPage.value) {
    pageRef.value = pageRef.value + 1
    // refresh()
    const encryptvalue = setDataInQueryParams(pageRef.value)
    navigateTo(route.path + '?q=' + encryptvalue)
  }
}

watch(() => route.query, (newValue) => {
  const lastPage = Math.floor(totalCount.value / limitRef.value)
  queryParam.value = newValue
  if (queryParam.value?.q) {
    const decrypt = getDataFromQueryParams(queryParam.value?.q.toString())
    pageRef.value = decrypt
    console.log(decrypt, '>>')
  }
  console.log(pageRef.value, totalPage.value, 'totalpaeg ->')

  if (pageRef.value < totalPage.value || pageRef.value > 0) {
    refresh()
  }
})

const handleCardClick = (idd:string) => {
  const path = ROUTE_CONSTANTS.GROUP_OWNER + '/' + idd
  navigateTo(path)
}

</script>
<template>
  <div class="flex flex-col gap-4 ">
    <template v-if="pending">
      <NxLoadingPage />
    </template>
    <template v-else>
      <TemplatesGroups :users="GroupData.rows" :heading="STRING_DATA.YOUR_GROUPS" :button-label="STRING_DATA.CREATE_GROUP" @card-click="handleCardClick" />
      <NxPagination :total-count="totalPage?.toString()" :current-page="(pageRef+1)?.toString()" @prev="prevPage" @next="nextPage" />
    </template>
  </div>
</template>
