<script setup lang="ts">

const props = defineProps({
  users: Array,
})
const { users } = toRefs(props)
const { openModal, showModal, closeModal } = useModal()

const handleBack = () => {
  navigateTo(ROUTE_CONSTANTS.HOME)
}

const handleCreateGroup = (data: any) => {
  closeModal()
  console.log(data)
}

</script>
<template>
  <ModalsCreateGroup v-if="openModal" :addGroupModal="openModal" :closeGroupModal="closeModal"
    v-on:handle-submit="handleCreateGroup" />
  <div class="flex flex-col gap-4">
    <AtomsBreadCrumb />

    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">{{ STRING_DATA.YOUR_GROUPS }}</h2>
      <NxActionButton :buttonLabel="STRING_DATA.CREATE_GROUP" :onclick="showModal" />
    </div>
    <!-- <AtomsComingSoon :showSearchImage="true" /> -->
    <!-- {{ JSON.stringify(users) }} -->
    <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
      <div v-for="(item, index) in users" :key="index" class="py-4 border border-gray-400 shadow rounded p-4">
        <AtomsGroupCard :item="item" />
      </div>
    </div>

  </div>
</template>
