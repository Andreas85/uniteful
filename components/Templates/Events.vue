<script setup lang="ts">
import Dialog from 'primevue/dialog'

const props = defineProps({
  eventData: { type: Array as unknown as IEvents, default: () => [] },
  showCreate: {
    type: Boolean, default: false
  }
})

const emit = defineEmits(['card-click'])
const { eventData, showCreate } = props
const { createEventService } = useEventsService()
const { openModal, showModal, closeModal } = useModal()
const { loading, showLoading, hideLoading } = useLoader()
const userStore = useUserStore()
const errorResponse = ref('')

const { isAuthenticated } = storeToRefs(userStore)
const handleBack = () => {
  navigateTo(ROUTE_CONSTANTS.HOME)
}

const createService = async (payload: any) => {
  try {
    showLoading()
    // console.log(payload)
    // debugger
    const response = await createEventService(payload)
    refreshData()
    closeModal()
  } catch (error) {
    const message = handleQueryResponse(error)
    errorResponse.value = message
  } finally {
    hideLoading()
  }
}

const refreshData = async () => {
  await refreshNuxtData(NUXT_ASYNC_DATA_KEY.OWNER_EVENT)
}

const handleCreateEvent = (data: any) => {
  createService(data?.formData)
}

const handleCardClicked = (props: { _id: string, data: IGroup }) => {
  emit('card-click', props)
}

</script>
<template>
  <Dialog
    v-model:visible="openModal"
    modal
    :header="STRING_DATA.CREATE_EVENT"
    :style="{ width: '50rem' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <ModalsCreateEvent
      v-if="openModal"
      :add-event-modal="openModal"
      :close-event-modal="closeModal"
      :loading="loading"
      :error-response="errorResponse"
      @handle-submit="handleCreateEvent"
    />
  </Dialog>
  <div class="flex flex-col gap-4">
    <AtomsBreadCrumb />
    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">
        {{ STRING_DATA.EVENTS }}
      </h2>
      <NxActionButton
        v-if="isAuthenticated && showCreate"
        :button-label="STRING_DATA.CREATE_EVENT"
        :onclick="showModal"
      />
    </div>
    <template v-if="eventData?.length">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div v-for="(item, index) in eventData" :key="index">
          <AtomsEventCard
            :date="item?.createdAt"
            :item="item"
            :name="item?.name"
            :description="item?.description"
            :image="item?.image"
            @clicked="handleCardClicked"
          />
        </div>
      </div>
    </template>
    <template v-else>
      <AtomsComingSoon :show-search-image="true" />
    </template>
  </div>
</template>
