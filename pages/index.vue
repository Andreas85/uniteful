<script setup lang="ts">
import _ from 'lodash'
import { usePagination } from '~/composables/usePagination'

definePageMeta({
  middleware: ['privateroute']
})

useHead({
  title: `Your Groups | ${STRING_DATA.BRAND_NAME}`
})

const { fetchGroupsService, fetchGroupDetailService } = useGroupsService()
const url = useRequestURL()
const userStore = useUserStore()
const { setGroup } = useGroupStore()
const { isAuthenticated } = storeToRefs(userStore)
const subDomainRef = ref(getSubdomainFromHost(url.host)) // Need to update this line to enable subdomain feature
const route = useRoute()

const { pageRef, limitRef, totalPage, updateRouteQuery } = usePagination()

const fetchGroupData = (NUXT_ASYNC_DATA_KEY.HOME_PAGE_GROUP, () => fetchGroupsService({ page: pageRef.value, limit: limitRef.value }))
const fetchGroupDetailData = (NUXT_ASYNC_DATA_KEY.HOME_PAGE_GROUP_DETAIL, () => fetchGroupDetailService({ id: subDomainRef.value ?? '' }))

const requestFetctApi = () => {
  if (subDomainRef.value) {
    return fetchGroupDetailData()
  } else {
    return fetchGroupData()
  }
}

const { data: GroupData, refresh, pending } = useAsyncData(requestFetctApi)

watch(GroupData, (newValue) => {
  if (!newValue) { return }
  if (subDomainRef.value) {
    setGroup(isAuthenticated.value ? getGroupStoreData(newValue) : newValue)
  } else {
    totalPage.value = Math.ceil(newValue?.count / limitRef.value)
  }
}, { immediate: true })

const handlePage = (e:PageState) => {
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
  const path = ROUTE_CONSTANTS.GROUPS + '/' + data.slug
  navigateTo(path)
}

</script>
<template>
  <template v-if="!subDomainRef">
    <NuxtLayout name="dashboard">
      <div class="flex flex-col gap-4 ">
        <template v-if="pending">
          <NxLoadingPage />
        </template>
        <template v-else-if="GroupData === null || totalPage ===0">
          <NxLoadingPage />
        </template>
        <template v-else>
          <TemplatesGroups :users="GroupData?.rows" :heading="STRING_DATA.GROUPS" @card-click="handleCardClick" />
          <NxPagination :total-count="totalPage" :current-page="pageRef" @currentpage="handlePage" />
        </template>
      </div>
    </NuxtLayout>
  </template>
  <template v-else>
    <template v-if="pending">
      <NxLoadingPage />
    </template>
    <template v-else-if="GroupData === null">
      <AtomsComingSoon :label="STRING_DATA.GROUO_NOT_EXISTS" />
    </template>
    <template v-else>
      <TemplatesGroupDetail />
    </template>
  </template>
</template>
