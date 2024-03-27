<script setup lang="ts">
definePageMeta({
  middleware: ['privateroute']
})

useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`
})

const route = useRoute()
const pageRef = ref(route.query.q ? getDataFromQueryParams(route?.query?.q) : 0)
const limitRef = ref(6)

const { fetchGroupsService } = useGroupsService()
const { data: GroupData, refresh, pending } = useAsyncData(NUXT_ASYNC_DATA_KEY.HOME_PAGE_GROUP, () => fetchGroupsService({ page: pageRef.value, limit: limitRef.value }))

const totalPage = ref(Math.ceil(GroupData.value?.count / limitRef.value))

const prevPage = () => updatePage(pageRef.value - 1)
const nextPage = () => updatePage(pageRef.value + 1)

const updatePage = (newPage: number) => {
  if (newPage >= 0 && newPage < totalPage.value) {
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
  const path = ROUTE_CONSTANTS.GROUPS + '/' + data.slug
  navigateTo(path)
}

</script>
<template>
  <NuxtLayout name="dashboard">
    <div class="flex flex-col gap-4 ">
      <template v-if="pending">
        <NxLoadingPage />
      </template>
      <template v-else>
        <TemplatesGroups :users="GroupData?.rows" :heading="STRING_DATA.GROUPS" @card-click="handleCardClick" />
        <NxPagination
          :total-count="totalPage?.toString()"
          :current-page="(pageRef + 1)?.toString()"
          @prev="prevPage"
          @next="nextPage"
        />
      </template>
    </div>
  </NuxtLayout>
</template>
