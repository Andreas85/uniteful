<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const { joinGroupService, leaveGroupService } = useGroupsService()
const { loading, showLoading, hideLoading } = useLoader()
const groupStore = useGroupStore()
const userStore = useUserStore()
const { groupData } = storeToRefs(groupStore)
const { isAuthenticated } = storeToRefs(userStore)
const { openModal, showModal } = useModal()
const { openModal: openModalLeave, closeModal: closeModalLeave, showModal: showModalLeave } = useModal()

const formData = reactive({
  reason: ''
})

const rules = {
  reason: {
    required: helpers.withMessage(ERROR_MESSAGE.REASON, required)
  }
}

const v$ = useVuelidate(rules, formData)

const joinRequest = () => {
  showLoading()
  joinGroupService({
    body: {
      groupId: groupData.value?._id ?? ''
    },
    success: (data) => {
      const newData = data?.data
      const updatedDate = getGroupStoreData(newData)
      groupStore.setGroup(updatedDate)
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
      groupId: groupData.value?._id ?? '',
      reason: formData?.reason ?? ''
    },
    success: (data) => {
      const newData = data?.data
      const updatedDate = getGroupStoreData(newData)
      groupStore.setGroup(updatedDate)
      hideLoading()
      closeModalLeave()
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

  if (groupData?.value?.hasPendingJoinRequest || groupData?.value?.isMember) {
    // confirmLeave()
    showModalLeave()

    return
  }
  joinRequest()
}

const submitForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    leaveRequest()
  } else {
    console.log('Invalid Form NOT Submitted')
  }
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

  <Dialog
    v-model:visible="openModalLeave"
    modal
    :header="STRING_DATA.CONFIRMATON"
    :style="{ width: '40vw' }"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
  >
    <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
      <AtomsBaseInput
        v-model="formData.reason"
        :placeholder="'Enter reason'"
        :label="'Reason to leave group'"
        type="text"
        :error-message="v$?.reason?.$error ? v$?.reason?.$errors?.[0]?.$message : ''
        "
      />
      <NxActionButton :is-loading="loading" :button-label="STRING_DATA.LEAVE.toUpperCase()" :is-submit="true" />
    </form>
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
    <AtomsIconLabel v-if="groupData?.isModerator" :icon="'carbon:user-role'">
      Moderator
    </AtomsIconLabel>
    <div v-if="!groupData?.isOwner" class="flex justify-end items-center ">
      <NxActionButton
        v-if="groupData?.hasPendingJoinRequest || groupData?.isMember"
        :is-delete-button="true"
        :button-label="groupData?.hasPendingJoinRequest ? STRING_DATA.WITHDRAW.toUpperCase() : STRING_DATA.LEAVE.toUpperCase()"
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
