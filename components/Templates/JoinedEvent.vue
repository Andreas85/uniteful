<script setup lang="ts">
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'

const { openModal, closeModal, showModal } = useModal()
const { loading, showLoading, hideLoading } = useLoader()
const { loading: loadingFetch, showLoading: showLoadingFetch, hideLoading: hideLoadingFetch } = useLoader()
const selectedData = ref<any>({})
const eventData = ref<any>([])

const { pageRef, limitRef, totalPage, updateRouteQuery } = usePagination()

const { fetchEventMembershipService, leaveEventService } = useEventsService()

const fetchData = () => {
  showLoadingFetch()
  fetchEventMembershipService({
    query: { page: pageRef.value, limit: limitRef.value },
    success: (data) => {
      const { rows, count } = data
      eventData.value = rows
      totalPage.value = Math.ceil(count / limitRef.value)
      hideLoadingFetch()
    }
  })
}

onMounted(() => {
  fetchData()
})

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

const items = ref([
  {
    items: [
      {
        label: 'Leave',
        icon: 'pi pi-times',
        command: () => {
          // approveRequest()
          showModal()
        }
      }
    ]
  }
])

const menuSelect = (member: { value: any; }) => {
  selectedData.value = member.value
  // console.log(member.value)
}

const handleReject = ({ reason }: { reason: string }) => {
  // console.log('api hit', selectedData.value)
  leaveRequest(reason)
}

const leaveRequest = (reason: string) => {
  showLoading()
  leaveEventService({
    body: {
      eventId: selectedData.value?._id ?? '',
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
  const result = (eventData.value?.length && totalPage.value !== 0)
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
      :field-label="'Reason to leave event'"
      :loading="loading"
      :button-label="'Leave'"
      @submit="handleReject"
    />
  </Dialog>
  <div class="flex flex-col gap-4 ">
    <Card>
      <template #title>
        Joined Events
      </template>
      <template #content>
        <template v-if="loadingFetch">
          <NxLoadingPage :custom-class="'flex items-center justify-center h-20'" />
        </template>

        <div v-else-if="!hasRequiredData">
          <AtomsComingSoon :custom-class="'flex items-center justify-center h-20'" :label="'Joined request not found'" />
        </div>

        <template v-else>
          <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            <div
              v-for="( event, index ) in eventData"
              :key="index"
              class="border p-2 shadow rounded-lg border-gray-400 flex items-center justify-between gap-4"
            >
              <AtomsMemberCard
                :member="event"
                :is-request-member-card="true"
                :menu-items="items"
                :name="event?.name"
                :email="event?.email"
                :joined-at="event?.joinedAt"
                :show-group-icon="true"
                @menu-select="menuSelect"
              />
            </div>
          </div>
          <NxPagination :total-count="totalPage" :current-page="pageRef" @currentpage="handlePage" />
        </template>
      </template>
    </Card>
  </div>
</template>
