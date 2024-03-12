<script setup lang="ts">
const addEventModal = ref(false);

const openEventModal = () => addEventModal.value = true;
const closeEventModal = () => addEventModal.value = false;
const handleBack = () => {
  navigateTo(ROUTE_CONSTANTS.HOME)
}

</script>
<template>
  <ModalsCreateEvent :addEventModal="addEventModal" :closeEventModal="closeEventModal" />
  <div class="flex flex-col gap-4">
    <AtomsIconLabel :icon="'mi:arrow-left'" :iconSize="'2rem'">
      <div class="text-2xl cursor-pointer" @click="handleBack">{{ STRING_DATA.BACK_TO_HOME }}</div>
    </AtomsIconLabel>
    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">{{ STRING_DATA.YOUR_EVENTS }}</h2>
      <AtomsActionButton :buttonLabel="STRING_DATA.CREATE_EVENT" :onclick="openEventModal" />
    </div>
    <!-- <AtomsComingSoon :showSearchImage="true" /> -->

    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      <div v-for="(item, index) in DUMMY_DATA" :key="index" class="py-4 border border-gray-400 shadow rounded p-4">
        <AtomsEventCard :item="item" />
      </div>
    </div>

  </div>
</template>
