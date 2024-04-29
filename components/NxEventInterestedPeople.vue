<script setup lang="ts">
import Card from 'primevue/card'
import { useConfirm } from 'primevue/useconfirm'
import Dialog from 'primevue/dialog'

const props = defineProps({
  eventId: { type: String, default: '' }
})

const confirm = useConfirm()
const route = useRoute()

const { pageRef, limitRef, totalPage, updateRouteQuery } = usePagination()
const evtId = ref('')
const selectedData = ref<any>({})
const eventMember = ref<any>([])
const { eventId } = toRefs(props)
const { fetchInterestedPeopleEvent } = useEventsService()
const interestedPeople = ref<any>([])

const items = ref([
  {
    items: [
      {
        label: 'Remove',
        icon: 'pi pi-trash',
        command: () => {
          // removeRequest()
          // showModal()
        }
      }
    ]
  }
])

const fetchData = () => {
  fetchInterestedPeopleEvent({
    query: { page: pageRef.value, limit: limitRef.value },
    eventId: eventId.value,
    success: (data) => {
      const { rows, count } = data
      interestedPeople.value = rows
      totalPage.value = Math.ceil(count / limitRef.value)
    }
  })
}

watch(eventId, (newValue) => {
  if (newValue) {
    evtId.value = newValue
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

const menuSelect = (member:{value:any}) => {
  selectedData.value = member.value
}

</script>

<template>
  <Card>
    <template #title>
      Interested people
    </template>
    <template v-if="interestedPeople.length> 0" #content>
      <div class="grid lg:grid-cols-3 gap-4">
        <div
          v-for="(member, index) in interestedPeople"
          :key="index"
          class="border p-2 shadow rounded-lg border-gray-400 flex items-center justify-between gap-4"
        >
          <AtomsMemberCard
            :member="member"
            :menu-items="items"
            :name="member?.attendee?.name"
            :email="member?.attendee?.email"
            :joined-at="member?.appliedAt"
            :show-icons="false"
            @menu-select="menuSelect"
          />
        </div>
      </div>
      <NxPagination :total-count="totalPage" :current-page="pageRef" @currentpage="handlePage" />
    </template>
    <template v-else #content>
      <AtomsComingSoon :label="STRING_DATA.INTERESTED_PEOPLE_NOT_FOUND" :custom-class="'flex items-center justify-center h-20'" />
    </template>
  </Card>
</template>
