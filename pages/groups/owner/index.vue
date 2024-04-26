<script setup lang="ts">
definePageMeta({
  middleware: ['privateroute']
})

useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`
})

const route = useRoute()
const pageRef = ref(route.query.q ? getDataFromQueryParams(route.query.q) : 0)
const limitRef = ref(6)

const { fetchGroupOwnershipService } = useGroupsService()
const { data: GroupData, refresh, pending } = useAsyncData(NUXT_ASYNC_DATA_KEY.OWNER_GROUP, () => fetchGroupOwnershipService({ page: pageRef.value, limit: limitRef.value }))

const totalPage = ref(0)

watch(GroupData, (newValue) => {
  if (newValue) {
    const { count } = newValue
    totalPage.value = Math.ceil(count / limitRef.value)
  }
}, { immediate: true })

const handlePage = (e: PageState) => {
  const { page } = e
  updatePage(page)
}

const updatePage = (newPage: number) => {
  const isPageCountValid = (newPage >= 0 && newPage < totalPage.value)
  if (isPageCountValid) {
    pageRef.value = newPage
    updateRouteQuery()
  }
}

const updateRouteQuery = () => {
  const encryptvalue = setDataInQueryParams(pageRef.value)
  navigateTo(`${route.path}?q=${encryptvalue}`)
}

const refreshIfNeeded = () => {
  if (pageRef.value < totalPage.value && pageRef.value >= 0) {
    refresh()
  }
}

watch(() => route.query, (newValue) => {
  if (newValue?.q) {
    const decrypt = getDataFromQueryParams(newValue?.q?.toString())
    pageRef.value = decrypt || 0
  }
  refreshIfNeeded()
})

const handleCardClick = (props: { _id: string, data: IGroup }) => {
  const { data } = props
  const path = ROUTE_CONSTANTS.GROUP_OWNER + '/' + data?.slug
  navigateTo(path)
}

</script>
<template>
  <div class="flex flex-col gap-4 ">
    <template v-if="pending">
      <NxLoadingPage />
    </template>
    <template v-else>
      <TemplatesGroups
        :users="GroupData?.rows"
        :heading="STRING_DATA.YOUR_GROUPS"
        :button-label="STRING_DATA.CREATE_GROUP"
        @card-click="handleCardClick"
      />
      <NxPagination
        v-if="totalPage > 0"
        :total-count="totalPage"
        :current-page="pageRef"
        @currentpage="handlePage"
      />
    </template>
  </div>
</template>
