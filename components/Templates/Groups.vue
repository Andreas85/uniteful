<script setup lang="ts">

const props = defineProps({
  users: Array,
})
const { users } = toRefs(props)
const { openModal, showModal, closeModal } = useModal()
const { loading, showLoading, hideLoading } = useLoader()
const { createGroupService } = useGroupsService()
const errorResponse = ref("");

const handleBack = () => {
  navigateTo(ROUTE_CONSTANTS.HOME)
}

const addGroup = async (payload) => {
  try {
    showLoading()
    console.log(payload)
    const response = await createGroupService(payload)
    console.log(response)
    closeModal()
  } catch (error) {
    const message = handleQueryResponse(error)
    errorResponse.value = message
  } finally {
    hideLoading()
  }
}

const handleCreateGroup = (data: any) => {
  const { name } = data.formData
  const payload = {
    name
  }
  console.log(payload)
  addGroup(payload)
}

const handleCloseModal = () => {
  closeModal()
  errorResponse.value = ''
}

</script>
<template>
  <ModalsCreateGroup v-if="openModal" :addGroupModal="openModal" :closeGroupModal="handleCloseModal"
    v-on:handle-submit="handleCreateGroup" :loading="loading" :errorResponse="errorResponse" />
  <div class=" flex flex-col gap-4">
    <AtomsBreadCrumb />

    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">{{ STRING_DATA.YOUR_GROUPS }}</h2>
      <NxActionButton :buttonLabel="STRING_DATA.CREATE_GROUP" :onclick="showModal" />
    </div>
    <template v-if="users.length">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div v-for="( item, index ) in  users " :key="index" class="py-4 border border-gray-400 shadow rounded p-4">
          <AtomsGroupCard :item="item" />
        </div>
      </div>
    </template>
    <template v-else>
      <AtomsComingSoon :showSearchImage="true" />
    </template>

  </div>
</template>
