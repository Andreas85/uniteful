<script setup lang="ts">
import Card from 'primevue/card'
import { useConfirm } from 'primevue/useconfirm'
import Dialog from 'primevue/dialog'

const props = defineProps({
  memberId: { type: String, default: '' }
})

const confirm = useConfirm()
const route = useRoute()
const { openModal, closeModal, showModal } = useModal()
const { loading, showLoading, hideLoading } = useLoader()

const { pageRef, limitRef, totalPage, updateRouteQuery } = usePagination()
const groupId = ref('')
const selectedData = ref<any>({})
const groupMember = ref<any>([])
const { memberId } = toRefs(props)
const {
  fetchGroupMemberService, makeModeratorRequestService,
  removeModeratorRequestService
} = useGroupsService()

const groupStore = useGroupStore()
const { setGroupMembers } = useGroupStore()
const { groupMembers } = storeToRefs(groupStore)

const items = ref([
  {
    items: [
      {
        label: 'Moderator',
        icon: 'pi pi-user-plus',
        command: () => {
          // console.log(selectedData.value, 'moderationitem')
          moderatorRequest()
        }
      },
      {
        label: 'Remove',
        icon: 'pi pi-trash',
        command: () => {
          // removeRequest()
          showModal()
        }
      }
    ]
  }
])

const fetchData = () => {
  fetchGroupMemberService({
    query: { page: pageRef.value, limit: limitRef.value },
    groupId: groupId.value,
    success: (data) => {
      const { rows, count } = data
      setGroupMembers({
        rows,
        totalPage: Math.ceil(count / limitRef.value)
      })
    }
  })
}

watch(groupMembers, (newValue) => {
  if (newValue) {
    const { rows, totalPage: total } = newValue
    groupMember.value = rows
    totalPage.value = total
  }
}, { immediate: true })

watch(memberId, (newValue) => {
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

const refreshIfNeeded = () => {
  if (pageRef.value < totalPage.value && pageRef.value >= 0) {
    fetchData()
  }
}

watch(() => route.query, (newValue) => {
  if (newValue?.q) {
    const decrypt = getDataFromQueryParams(newValue?.q?.toString())
    pageRef.value = decrypt || 0
  }
  refreshIfNeeded()
})

const confirmRemove = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Remove',
    accept: () => {
      console.log('accept')

      removeModeratorService()
    },
    reject: () => {
      console.log('reject')
    }
  })
}

const confirmModerator = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Moderator',
    accept: () => {
      moderatorService()
    },
    reject: () => {
      console.log('reject')
    }
  })
}

const refreshData = async () => {
  await refreshNuxtData(NUXT_ASYNC_DATA_KEY.OWNER_GROUP_SLUG)
  await refreshNuxtData(NUXT_ASYNC_DATA_KEY.HOME_PAGE_GROUP_DETAIL)
}
const moderatorService = () => {
  makeModeratorRequestService({
    body: {
      groupId: groupId.value ?? '',
      memberId: selectedData.value?.member?._id ?? ''
    },
    success: (data) => {
      fetchData()
      // refreshData()
    }
  })
}

const removeModeratorService = (reason?: string) => {
  showLoading()
  removeModeratorRequestService({
    body: {
      groupId: groupId.value ?? '',
      memberId: selectedData.value?.member?._id ?? '',
      reason: reason ?? ''
    },
    success: (data) => {
      closeModal()
      fetchData()
      hideLoading()
      // refreshData()
    },
    fail: () => {
      closeModal()

      hideLoading()
    }
  })
}

const handleReject = ({ reason }:{reason:string}) => {
  removeModeratorService(reason)
  console.log('api hit')
}

const moderatorRequest = () => {
  confirmModerator()
}

const menuSelect = (member:{value:any}) => {
  selectedData.value = member.value
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
      :field-label="'Reason to remove'"
      :loading="loading"
      :button-label="'Remove'"
      @submit="handleReject"
    />
  </Dialog>
  <Card>
    <template #title>
      Group members
    </template>
    <template v-if="groupMember.length> 0" #content>
      <div class="grid lg:grid-cols-3 gap-4">
        <div
          v-for="(member, index) in groupMember"
          :key="index"
          class="border p-2 shadow rounded-lg border-gray-400 flex items-center justify-between gap-4 relative"
        >
          <AtomsMemberCard
            :member="member"
            :menu-items="items"
            :name="member?.member?.name"
            :email="member?.member?.email"
            :joined-at="member?.joinedAt"
            @menu-select="menuSelect"
          />
        </div>
      </div>
      <NxPagination :total-count="totalPage" :current-page="pageRef" @currentpage="handlePage" />
    </template>
    <template v-else #content>
      <AtomsComingSoon :label="STRING_DATA.MEMBER_NOT_FOUND" :custom-class="'flex items-center justify-center h-20'" />
    </template>
  </Card>
</template>
