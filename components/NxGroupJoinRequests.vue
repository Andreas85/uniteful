<script setup lang="ts">
import Dialog from 'primevue/dialog'
import Card from 'primevue/card'
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps({
  id: { type: String, default: '' }
})

const { openModal, closeModal, showModal } = useModal()
const { loading, showLoading, hideLoading } = useLoader()

const confirm = useConfirm()
const route = useRoute()

const { pageRef, limitRef, totalPage, updateRouteQuery } = usePagination()
const groupId = ref('')
const groupMember = ref<any>([])
const { id } = toRefs(props)
const { pendingReqeustForGroupService, approveMemberRequestService, rejectMemberRequestService } = useGroupsService()

const items = ref([
  {
    items: [
      {
        label: 'Approve',
        icon: 'pi pi-check',
        command: () => {
          approveRequest()
        }
      },
      {
        label: 'Reject',
        icon: 'pi pi-times',
        command: () => {
          showModal()
          // rejectRequest()
        }
      }
    ]
  }
])

const confirmReject = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Reject',
    accept: () => {
      console.log('accept')
    },
    reject: () => {
      console.log('reject')
    }
  })
}

const approveRequestService = () => {
  showLoading()
  approveMemberRequestService({
    body: {
      groupId: groupId.value ?? ''
    },
    success: (data) => {
      console.log('hit', data)
      fetchData()
      hideLoading()
    },
    fail: (data) => {
      hideLoading()
    }
  })
}

const rejectRequestService = (reason:string) => {
  showLoading()
  rejectMemberRequestService({
    body: {
      groupId: groupId.value ?? ''
      // reason: reason ?? ''
    },
    success: (data) => {
      fetchData()
      hideLoading()
      closeModal()
    },
    fail: (data) => {
      hideLoading()
    }
  })
}

const confirmApprove = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Approve',
    accept: () => {
      console.log('accept')
      approveRequestService()
    },
    reject: () => {
      console.log('reject')
    }
  })
}

const handleReject = (event: {reason:string}) => {
  const { reason } = event
  console.log(reason, 'reason')
  rejectRequestService(reason)
  // closeModal()
}

const rejectRequest = () => {
  confirmReject()
}

const approveRequest = () => {
  confirmApprove()
}

const fetchData = () => {
  pendingReqeustForGroupService({
    query: { page: pageRef.value, limit: limitRef.value },
    groupId: groupId.value,
    success: (data) => {
      const { rows, count } = data
      groupMember.value = rows
      totalPage.value = Math.ceil(count / limitRef.value)
    }
  })
}

watch(id, (newValue) => {
  if (newValue) {
    groupId.value = newValue
    fetchData()
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

</script>

<template>
  <Dialog v-model:visible="openModal" modal :header="STRING_DATA.CONFIRMATON" :style="{ width: '40vw' }" :breakpoints="PRIMEVUE_BREAKPOINTS">
    <ModalsAskReason :field-label="'Reason to reject'" :loading="loading" :button-label="'Reject'" @submit="handleReject" />
  </Dialog>
  <Card>
    <template #title>
      Pending requests
    </template>
    <template #content>
      <!-- {{ JSON.stringify(groupMember) }} -->
      <template v-if="groupMember?.length">
        <div class="grid lg:grid-cols-3 gap-4">
          <div
            v-for="(member, index) in groupMember"
            :key="index"
            class="border p-2 shadow rounded-lg border-gray-400 flex items-center justify-between gap-4"
          >
            <AtomsMemberCard
              :member="member"
              :is-request-member-card="true"
              :menu-items="items"
              :name="member?.member?.name"
              :email="member?.member?.email"
              :joined-at="member?.joinedAt"
            />
          </div>
        </div>
        <NxPagination
          :total-count="totalPage"
          :current-page="pageRef"
          @currentpage="handlePage"
        />
      </template>
      <AtomsComingSoon
        v-else
        :custom-class="'flex items-center justify-center h-20'"
        :label="'Group values not found'"
      />
    </template>
  </Card>
</template>
