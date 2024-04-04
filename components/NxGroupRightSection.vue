<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()

const { joinGroupService, leaveGroupService, fetchGroupDetailService } = useGroupsService()
const { loading, showLoading, hideLoading } = useLoader()
const groupStore = useGroupStore()
const userStore = useUserStore()
const { groupData } = storeToRefs(groupStore)
const { isAuthenticated } = storeToRefs(userStore)
const { openModal, closeModal, showModal } = useModal()

const joinRequest = () => {
  showLoading()
  joinGroupService({
    body: {
      groupId: groupData.value?._id ?? ''
    },
    success: (data) => {
      refreshData()
      hideLoading()
    },
    fail: (data) => {
      hideLoading()
    }
  })
}

const leaveRequest = () => {
  showLoading()
  leaveGroupService({
    body: {
      groupId: groupData.value?._id ?? ''
    },
    success: (data) => {
      refreshData()
      hideLoading()
    },
    fail: (data) => {
      hideLoading()
    }
  })
}

const handleCreateGroup = () => {
  if (!isAuthenticated.value) {
    showModal()
    return
  }

  if (groupData?.value?.isMember) {
    confirmLeave()

    return
  }
  joinRequest()
}

const refreshData = async () => {
  await refreshNuxtData(NUXT_ASYNC_DATA_KEY.HOME_PAGE_GROUP_DETAIL)
}

const confirmLeave = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Leave',
    accept: () => {
      leaveRequest()
    },
    reject: () => {
      console.log('reject')
    },
    onShow: () => console.log('show'),
    onHide: () => console.log('hide')
  })
}

</script>

<template>
  <Dialog
    v-model:visible="openModal"
    modal
    :header="STRING_DATA.ACCOUNT"
    :style="{ width: '40vw' }"
    :breakpoints="PRIMEVUE_BREAKPOINTS"
  >
    <ModalsAuth />
  </Dialog>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 items-center justify-start">
      <AtomsIconLabel :icon="'material-symbols:group-outline'">
        {{ groupData?.totalMembers ?? '-' }} members
      </AtomsIconLabel>
    </div>
    <AtomsIconLabel :icon="'mdi:user-outline'">
      Organized by {{ groupData?.owner?.name ?? groupData?.owner?.email }}
    </AtomsIconLabel>
    <AtomsIconLabel :icon="'material-symbols:description-outline'">
      {{ groupData?.description ?? '-' }}
    </AtomsIconLabel>
    <div v-if="!groupData?.isOwner" class="flex justify-end items-center ">
      <NxActionButton
        v-if="groupData?.isMember"
        :is-delete-button="true"
        :button-label="STRING_DATA.LEAVE.toUpperCase()"
        @click="handleCreateGroup"
      />
      <NxActionButton
        v-else
        :is-loading="loading"
        :button-label="STRING_DATA.JOIN.toUpperCase()"
        :disabled="!groupData?.canJoinGroup"
        @click="handleCreateGroup"
      />
    </div>
  </div>
</template>
