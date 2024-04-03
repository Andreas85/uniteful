<script setup lang="ts">
import Dialog from 'primevue/dialog'

const props = defineProps({
  users: Array,
  heading: String,
  buttonLabel: String
})

const route = useRoute()
const emit = defineEmits(['card-click'])
const { users, heading } = toRefs(props)
const { openModal, showModal, closeModal } = useModal()
const { loading, showLoading, hideLoading } = useLoader()
const { createGroupService } = useGroupsService()
const errorResponse = ref('')

const handleBack = () => {
  navigateTo(ROUTE_CONSTANTS.HOME)
}

const addGroup = async (payload) => {
  try {
    showLoading()
    console.log(payload)
    const response = await createGroupService(payload)
    refreshData()
    closeModal()
  } catch (error) {
    const message = handleQueryResponse(error)
    errorResponse.value = message
  } finally {
    hideLoading()
  }
}

const handleCreateGroup = (data: any) => {
  const payload = {
    ...data?.formData
  }
  console.log(payload)
  addGroup(payload)
}

const handleCloseModal = () => {
  closeModal()
  errorResponse.value = ''
}

const refreshData = async () => {
  await refreshNuxtData(NUXT_ASYNC_DATA_KEY.OWNER_GROUP)
}

const handleCardClicked = (props: {_id: string, data: IGroup}) => {
  emit('card-click', props)
}

</script>
<template>
  <Dialog v-model:visible="openModal" modal :header="STRING_DATA.ADD_GROUP" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <ModalsCreateGroup
      v-if="openModal"
      :add-group-modal="openModal"
      :close-group-modal="handleCloseModal"
      :loading="loading"
      :error-response="errorResponse"
      @handle-submit="handleCreateGroup"
    />
  </Dialog>
  <div class=" flex flex-col gap-4">
    <AtomsBreadCrumb v-if="route.path !== ROUTE_CONSTANTS.HOME" />

    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">
        {{ heading }}
      </h2>
      <NxActionButton v-if="buttonLabel" :button-label="buttonLabel" :onclick="showModal" />
    </div>
    <template v-if="users?.length">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div v-for="( item, index ) in users " :key="index">
          <AtomsGroupCard :item="item" @clicked="handleCardClicked" />
        </div>
      </div>
    </template>
    <template v-else>
      <AtomsComingSoon :show-search-image="true" />
    </template>
  </div>
</template>
