<script setup lang="ts">
import Card from 'primevue/card'
import { useConfirm } from 'primevue/useconfirm'

const props = defineProps({
  memberId: { type: String, default: '' }
})

const confirm = useConfirm()
const route = useRoute()

const { pageRef, limitRef, totalPage, updateRouteQuery } = usePagination()
const groupId = ref('')
const groupMember = ref([])
const { memberId } = toRefs(props)
const { fetchGroupMemberService } = useGroupsService()

const items = ref([
  {
    items: [
      {
        label: 'Moderator',
        icon: 'pi pi-user-plus',
        command: () => {
          moderatorRequest()
        }
      },
      {
        label: 'Remove',
        icon: 'pi pi-trash',
        command: () => {
          removeRequest()
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
      groupMember.value = rows
      totalPage.value = Math.ceil(count / limitRef.value)
    }
  })
}

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
      console.log('accept')
    },
    reject: () => {
      console.log('reject')
    }
  })
}

const removeRequest = () => {
  confirmRemove()
}

const moderatorRequest = () => {
  confirmModerator()
}

</script>

<template>
  <Card>
    <template #title>
      All members
    </template>
    <template v-if="groupMember.length> 0" #content>
      <div class="grid lg:grid-cols-3 gap-4">
        <div
          v-for="(member, index) in groupMember"
          :key="index"
          class="border p-2 shadow rounded-lg border-gray-400 flex items-center justify-between gap-4"
        >
          <AtomsMemberCard
            :member="member"
            :menu-items="items"
          />
        </div>
      </div>
      <NxPagination :total-count="totalPage" :current-page="pageRef" @currentpage="handlePage" />
    </template>
    <template v-else #content>
      <AtomsComingSoon :label="STRING_DATA.MEMBER_NOT_FOUND" />
    </template>
  </Card>
</template>
