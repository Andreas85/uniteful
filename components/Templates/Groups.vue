<script setup lang="ts">

const { openModal, showModal, closeModal } = useModal()

const handleBack = () => {
  navigateTo(ROUTE_CONSTANTS.HOME)
}

const handleCreateGroup = (data: any) => {
  closeModal()
}

</script>
<template>
  <ModalsCreateGroup :addGroupModal="openModal" :closeGroupModal="closeModal" v-on:handle-submit="handleCreateGroup" />
  <div class="flex flex-col gap-4">
    <AtomsBreadCrumb />

    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">{{ STRING_DATA.YOUR_GROUPS }}</h2>
      <AtomsActionButton :buttonLabel="STRING_DATA.CREATE_GROUP" :onclick="showModal" />
    </div>
    <AtomsComingSoon :showSearchImage="true" />

  </div>
</template>
