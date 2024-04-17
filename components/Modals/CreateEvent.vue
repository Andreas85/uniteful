<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, requiredIf } from '@vuelidate/validators'
import Dropdown from 'primevue/dropdown'

const emit = defineEmits(['handle-submit'])
const props = defineProps({
  addEventModal: Boolean,
  closeEventModal: Function,
  loading: { type: Boolean, default: false },
  errorResponse: { type: String, default: '' }
})
const { addEventModal, closeEventModal } = toRefs(props)
const { autoCompleteGroupSearchService } = useGroupsService()

const groupData = ref<string>('')
const groupList = ref<any>([]) // for visibility type
const formData = reactive({
  eventName: '',
  location: '',
  group: '',
  startDate: '',
  duration: ''
})

const rules = {
  eventName: {
    required: helpers.withMessage(ERROR_MESSAGE.EVENT_REQ, required)
  },
  location: {
    required: helpers.withMessage(ERROR_MESSAGE.LOCATION_REQ, required)
  }
}

const v$ = useVuelidate(rules, formData)
const submitForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    const { eventName, location, group, startDate, duration } = formData
    const payload = {
      formData: {
        name: eventName, location, group: group?.id, startDate: getISODate(startDate), duration: getISODate(duration)
      }
    }
    // console.log(payload, 'modalcompo')
    emit('handle-submit', payload)
  } else {
    console.log('Invalid Form NOT Submitted')
  }
}

const handleInput = (field: string) => {
  formData[field] = ''
}

const suggestedGroup = async () => {
  try {
    const res = await autoCompleteGroupSearchService()
    groupList.value = [
      ...res.map((item: { _id: any; name: string; slug: string }) => ({
        id: item?._id,
        name: item.name,
        slug: item.slug
      }))
    ]
    return res
  } catch (error) {
    console.log(error)
  }
}

onBeforeMount(() => {
  suggestedGroup()
})

const handleDurationInput = (field: any, event: any) => {
  const value = parseInt(event.target.value)
  if (!isNaN(value) && value) {
    formData[field] = value
    return
  }
  formData[field] = null
}

</script>
<template>
  <AtomsCustomModal :open-modal="addEventModal">
    <div class="flex flex-col gap-4 w-full">
      <h2 class="text-center font-bold text-xl">
        {{ STRING_DATA.CREATE_EVENT }}
      </h2>
      <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
        <AtomsBaseInput
          v-model="formData.eventName"
          :placeholder="'Enter your event name'"
          :label="'Event name'"
          :type="'text'"
          :error-message="v$?.eventName?.$error ? v$?.eventName?.$errors?.[0]?.$message : ''"
        />
        <AtomsBaseInput
          v-model="formData.location"
          :placeholder="'Enter your location'"
          :label="'Location'"
          :type="'text'"
          :error-message="v$?.location?.$error ? v$?.location?.$errors?.[0]?.$message : ''"
        />
        <div class="p-fluid flex flex-col gap-4">
          <label class="block text-sm font-medium text-gray-900">Group</label>
          <Dropdown
            v-model="formData.group"
            :options="groupList ?? []"
            option-label="name"
            placeholder="Select group"
            class="dropdown-class"
          />
        </div>
        <AtomsBaseInput
          v-model="formData.startDate"
          :label="'Start date'"
          :type="'date'"
          :min="getTodayDate()"
          @input="handleInput('startDate')"
        />
        <AtomsBaseInput
          v-model="formData.duration"
          :placeholder="'Enter duration'"
          :label="'Duration'"
          :type="'text'"
          :show-hint="true"
          :error-message="v$?.duration?.$error ? v$?.duration?.$errors?.[0]?.$message : ''"
          @input="handleDurationInput('duration', $event)"
        />
        <span v-if="errorResponse" class="errorClass">{{
          errorResponse
        }}</span>
        <div class="flex items-center justify-end gap-4" :min="getTodayDate()">
          <NxActionButton :is-action-button="false" :onclick="closeEventModal" :button-label="STRING_DATA.CLOSE.toUpperCase()" />
          <NxActionButton :is-submit="true" :button-label="STRING_DATA.ADD.toUpperCase()" :is-loading="loading" />
        </div>
      </form>
    </div>
  </AtomsCustomModal>
</template>
