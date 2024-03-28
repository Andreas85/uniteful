<script setup lang="ts">

const props = defineProps({
  eventData: Array
})
const { eventData } = props
const { openModal, showModal, closeModal } = useModal()
const userStore = useUserStore()

const { isAuthenticated } = storeToRefs(userStore)
const handleBack = () => {
  navigateTo(ROUTE_CONSTANTS.HOME)
}

const handleCreateEvent = (data: any) => {
  console.log(data)
  closeModal()
}

</script>
<template>
  <ModalsCreateEvent
    v-if="openModal"
    :add-event-modal="openModal"
    :close-event-modal="closeModal"
    @handle-submit="handleCreateEvent"
  />
  <div class="flex flex-col gap-4">
    <AtomsBreadCrumb />
    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">
        {{ STRING_DATA.EVENTS }}
      </h2>
      <NxActionButton v-if="isAuthenticated" :button-label="STRING_DATA.CREATE_EVENT" :onclick="showModal" />
    </div>
    <template v-if="eventData?.length">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div v-for="(item, index) in eventData" :key="index" class="py-4 border border-gray-400 shadow rounded p-4">
          <AtomsEventCard :item="item" />
        </div>
      </div>
    </template>
    <template v-else>
      <AtomsComingSoon :show-search-image="true" />
    </template>
  </div>
</template>
