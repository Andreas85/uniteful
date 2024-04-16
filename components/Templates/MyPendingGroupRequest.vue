<script setup lang="ts">
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'

const { pageRef, limitRef, totalPage, updateRouteQuery } = usePagination()

const { myPendingGroupReqeustService, leaveGroupService } = useGroupsService()
const groupData = ref<any>([])
const selectedData = ref<any>({})

const { openModal, closeModal, showModal } = useModal()
const { loading, showLoading, hideLoading } = useLoader()
const { loading: loadingFetch, showLoading: showLoadingFetch, hideLoading: hideLoadingFetch } = useLoader()

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

const fetchData = () => {
  showLoadingFetch()
  myPendingGroupReqeustService({
    query: { page: pageRef.value, limit: limitRef.value },
    success: (data) => {
      const { rows, count } = data
      groupData.value = rows
      totalPage.value = Math.ceil(count / limitRef.value)
      hideLoadingFetch()
    }
  })
}

onMounted(() => {
  fetchData()
})

const items = ref([
  {
    items: [
      {
        label: 'Withdraw',
        icon: 'pi pi-times',
        command: () => {
          showModal()
        }
      }
    ]
  }
])

const menuSelect = (member: { value: any; }) => {
  selectedData.value = member.value
}

const handleReject = ({ reason }: { reason: string }) => {
  console.log('api hit', selectedData.value)
  leaveRequest(reason)
  // closeModal()
}

const leaveRequest = (reason: string) => {
  showLoading()
  leaveGroupService({
    body: {
      groupId: selectedData.value?.group?._id ?? '',
      reason: reason ?? ''
    },
    success: (data) => {
      fetchData()
      hideLoading()
      closeModal()
    },
    fail: (data) => {
      hideLoading()
      closeModal()
    }
  })
}

const hasRequiredData = computed(() => {
  const result = (groupData.value?.length && totalPage.value !== 0)
  // console.log(result, 'result')
  return result
})

</script>
<template>
  <Dialog
    v-model:visible="openModal"
    modal
    :header="STRING_DATA.CONFIRMATON"
    :style="{ width: '40vw' }"
    :breakpoints="PRIMEVUE_BREAKPOINTS"
  >
    <ModalsAskReason
      :field-label="'Reason to withdraw group'"
      :loading="loading"
      :button-label="'Withdraw'"
      @submit="handleReject"
    />
  </Dialog>
  <Card>
    <template #title>
      Pending requests
    </template>
    <template #content>
      <template v-if="loadingFetch">
        <NxLoadingPage :custom-class="'flex items-center justify-center h-20'" />
      </template>

      <div v-else-if="!hasRequiredData">
        <AtomsComingSoon :custom-class="'flex items-center justify-center h-20'" :label="'Pending request not found'" />
      </div>

      <template v-else>
        <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          <div
            v-for="( group, index ) in groupData "
            :key="index"
            class="border p-2 shadow rounded-lg border-gray-400 flex items-center justify-between gap-4"
          >
            <AtomsMemberCard
              :member="group"
              :is-request-member-card="true"
              :menu-items="items"
              :name="group?.group?.name"
              :email="group?.group?.email"
              :show-group-icon="true"
              :joined-at="group?.joinedAt"
              @menu-select="menuSelect"
            />
          </div>
        </div>
        <NxPagination :total-count="totalPage" :current-page="pageRef" @currentpage="handlePage" />
      </template>
    </template>
  </Card>
</template>
