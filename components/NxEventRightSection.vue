<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const { joinEventService, leaveEventService, joinWaitingListService } = useEventsService()
const { loading, showLoading, hideLoading } = useLoader()
const eventStore = useEventStore()
const userStore = useUserStore()
const { eventData } = storeToRefs(eventStore)
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
  joinEventService({
    body: {
      eventId: eventData.value?._id ?? ''
    },
    success: (data) => {
      const newData = data?.data
      eventStore.setEvent(newData)
      hideLoading()
    },
    fail: (data) => {
      hideLoading()
    }
  })
}

const interestedRequest = () => {
  showLoading()
  joinWaitingListService({
    body: {
      eventId: eventData.value?._id ?? ''
    },
    success: (data) => {
      const newData = data?.data
      eventStore.setEvent(newData)
      hideLoading()
    },
    fail: (data) => {
      hideLoading()
    }
  })
}

const leaveRequest = () => {
  showLoading()
  leaveEventService({
    body: {
      eventId: eventData.value?._id ?? '',
      reason: formData?.reason ?? ''
    },
    success: (data) => {
      const newData = data?.data
      eventStore.setEvent(newData)
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

  if (eventData?.value?.isAttendee) {
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

const handleInterestedPeopleCall = () => {
  interestedRequest()
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
        :label="'Reason to leave event'"
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
        {{ eventData?.totalAttendee ?? '0' }} attendee
      </AtomsIconLabel>
    </div>
    <AtomsIconLabel :icon="'mdi:user-outline'">
      Organized by {{ eventData?.owner?.name ?? eventData?.owner?.email }}
    </AtomsIconLabel>
    <AtomsIconLabel :icon="'material-symbols:description-outline'">
      {{ eventData?.description ?? '-' }}
    </AtomsIconLabel>

    <div v-if="!eventData?.isOwner" class="flex justify-end items-center ">
      <NxActionButton
        v-if="eventData?.isAttendee"
        :is-delete-button="true"
        :button-label="STRING_DATA.LEAVE.toUpperCase()"
        @click="handleCreateGroup"
      />
      <NxActionButton
        v-else-if="eventData?.commitmentLevel === COMMITMENT_LEVEL.NOT_COMMITED"
        :button-label="STRING_DATA.INTERESTED.toUpperCase()"
        :is-loading="loading"
        @click="handleInterestedPeopleCall"
      />
      <NxActionButton
        v-else
        :is-loading="loading"
        :button-label="STRING_DATA.JOIN.toUpperCase()"
        :disabled="!eventData?.canJoinEvent"
        @click="handleCreateGroup"
      />
    </div>
  </div>
</template>
