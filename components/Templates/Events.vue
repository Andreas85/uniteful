<script setup lang="ts">

const props = defineProps({
  eventData: Array,
})
const { eventData } = props
const { openModal, showModal, closeModal } = useModal()

const handleBack = () => {
  navigateTo(ROUTE_CONSTANTS.HOME)
}

const handleCreateEvent = (data: any) => {
  console.log(data)
  closeModal()
}

</script>
<template>
  <ModalsCreateEvent v-if="openModal" :addEventModal="openModal" :closeEventModal="closeModal"
    v-on:handle-submit="handleCreateEvent" />
  <div class="flex flex-col gap-4">
    <AtomsBreadCrumb />
    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">{{ STRING_DATA.YOUR_EVENTS }}</h2>
      <NxActionButton :buttonLabel="STRING_DATA.CREATE_EVENT" :onclick="showModal" />
    </div>
    <!-- <AtomsComingSoon :showSearchImage="true" /> -->
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      <div v-for="(item, index) in eventData" :key="index" class="py-4 border border-gray-400 shadow rounded p-4">
        <AtomsEventCard :item="item" />
      </div>
    </div>

  </div>
</template>
