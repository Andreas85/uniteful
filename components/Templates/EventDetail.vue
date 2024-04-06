<script setup lang="ts">

const props = defineProps({
  eventData: Object,
})
const { eventData } = props
const { openModal, showModal, closeModal } = useModal()

</script>
<template>
  <NxConfirmationModal v-if="openModal" :openModal="openModal" :message="MESSAGES.DELETE_EVENT"
    :closeModal="closeModal" />
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between gap-4 flex-wrap">

      <AtomsBreadCrumb :hasId="true" :breadCrumbName="eventData?.todo" />
      <div class="flex justify-end items-center gap-4">
        <NxActionButton :button-label="'Edit'" />
        <NxActionButton :button-label="'Delete'" :onclick="showModal" :isDeleteButton="true" />
      </div>
    </div>
    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">{{ eventData?.todo }}</h2>
    </div>

  </div>
</template>
