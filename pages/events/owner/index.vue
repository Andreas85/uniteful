<script setup lang="ts">
definePageMeta({
  middleware: ['privateroute']
})

useHead({
  title: `Events | ${STRING_DATA.BRAND_NAME}`
})

const route = useRoute()
const { pageRef, limitRef, totalPage, updateRouteQuery } = usePagination()

const { fetchEventOwnershipService } = useEventsService()
const { data: EventData, refresh, pending } = useAsyncData(NUXT_ASYNC_DATA_KEY.OWNER_EVENT, () => fetchEventOwnershipService({ page: pageRef.value, limit: limitRef.value }))

watch(EventData, (newValue) => {
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
  const path = ROUTE_CONSTANTS.EVENTS_OWNER + '/' + data?.slug
  navigateTo(path)
}

</script>
<template>
  <div class="flex flex-col gap-4 ">
    <template v-if="pending">
      <NxLoadingPage />
    </template>
    <template v-else>
      <TemplatesEvents :event-data="EventData?.rows" :show-create="true" @card-click="handleCardClick" />
      <NxPagination
        :total-count="totalPage"
        :current-page="pageRef"
        @currentpage="handlePage"
      />
    </template>
  </div>
</template>
