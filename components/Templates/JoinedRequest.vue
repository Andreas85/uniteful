<script setup lang="ts">
import Card from 'primevue/card'
import Dialog from 'primevue/dialog'

const { openModal, closeModal, showModal } = useModal()
const { loading, showLoading, hideLoading } = useLoader()
const selectedData = ref<any>({})
const groupData = ref<any>([])

const { pageRef, limitRef, totalPage, updateRouteQuery } = usePagination()

const { fetchGroupMembershipService, leaveGroupService } = useGroupsService()
// const { data: groupData, pending, refresh } = useFetch(() => fetchGroupMembershipService({ page: pageRef.value, limit: limitRef.value }))

const fetchData = () => {
  fetchGroupMembershipService({
    query: { page: pageRef.value, limit: limitRef.value },
    success: (data) => {
      const { rows, count } = data
      groupData.value = rows
      totalPage.value = Math.ceil(count / limitRef.value)
    }
  })
}

onMounted(() => {
  fetchData()
})

watch(groupData, (newValue) => {
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
      :field-label="'Reason to leave group'"
      :loading="loading"
      :button-label="'Leave'"
      @submit="handleReject"
    />
  </Dialog>
  <div class="flex flex-col gap-4 ">
    <Card>
      <template #title>
        Joined groups
      </template>
      <template #content>
        <template v-if="groupData?.length">
          <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
            <div
              v-for="( group, index ) in groupData"
              :key="index"
              class="border p-2 shadow rounded-lg border-gray-400 flex items-center justify-between gap-4"
            >
              <AtomsMemberCard
                :member="group"
                :is-request-member-card="true"
                :menu-items="items"
                :name="group?.group?.name"
                :email="group?.group?.email"
                :joined-at="group?.joinedAt"
                :show-group-icon="true"
                @menu-select="menuSelect"
              />
            </div>
          </div>
          <NxPagination :total-count="totalPage" :current-page="pageRef" @currentpage="handlePage" />
        </template>
        <template v-else>
          <AtomsComingSoon
            :custom-class="'flex items-center justify-center h-20'"
            :label="'Pending requests not found'"
          />
        </template>
      </template>
    </Card>
  </div>
</template>
