<script setup lang="ts">

const addGroupModal = ref(false);

const openGroupModal = () => addGroupModal.value = true;
const closeGroupModal = () => addGroupModal.value = false;
const handleBack = () => {
  navigateTo(ROUTE_CONSTANTS.HOME)
}

</script>
<template>
  <ModalsCreateGroup :addGroupModal="addGroupModal" :closeGroupModal="closeGroupModal" />
  <div class="flex flex-col gap-4">
    <AtomsIconLabel :icon="'mi:arrow-left'" :iconSize="'2rem'">
      <div class="text-2xl cursor-pointer" @click="handleBack">{{ STRING_DATA.BACK_TO_HOME }}</div>
    </AtomsIconLabel>
    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">{{ STRING_DATA.YOUR_GROUPS }}</h2>
      <AtomsActionButton :buttonLabel="STRING_DATA.CREATE_GROUP" :onclick="openGroupModal" />
    </div>
    <AtomsComingSoon :showSearchImage="true" />

  </div>
</template>
