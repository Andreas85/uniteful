<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, requiredIf } from '@vuelidate/validators'
import Dropdown from 'primevue/dropdown'
import Calendar from 'primevue/calendar'

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
const formData = reactive<any>({
  eventName: '',
  location: '',
  group: '',
  startDate: '',
  duration: '',
  commitment: '',
  admissionPolicy: '',
  maxCapacity: 0
})

const rules = {
  eventName: {
    required: helpers.withMessage(ERROR_MESSAGE.EVENT_REQ, required)
  },
  location: {
    required: helpers.withMessage(ERROR_MESSAGE.LOCATION_REQ, required)
  },
  duration: {
    required: helpers.withMessage('Duration is required', required)
  }
}

const v$ = useVuelidate(rules, formData)
const submitForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    const { eventName, location, group, startDate, duration, commitment, admissionPolicy, maxCapacity } = formData
    const payload = {
      formData: {
        name: eventName, location, group: group?.id, startDate: getISODate(startDate), duration, commitmentLevel: commitment?.code, admissionPolicy: admissionPolicy?.code, maxCapacity
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
        name: item?.name,
        slug: item?.slug
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
  if ((value === 0) || (!isNaN(value) && value)) {
    formData[field] = value
    return
  }
  formData[field] = null
}

</script>
<template>
  <div class="flex flex-col gap-4 w-full">
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
      <div class="p-fluid flex flex-col gap-4">
        <label class="block text-sm font-medium text-gray-900">Commitment level</label>
        <Dropdown
          v-model="formData.commitment"
          :options="COMMITMENT"
          option-label="name"
          placeholder="Select commitment level"
          class="dropdown-class"
        />
      </div>

      <div class="p-fluid flex flex-col gap-4">
        <label class="block text-sm font-medium text-gray-900">Admission policy</label>
        <Dropdown
          v-model="formData.admissionPolicy"
          :options="EVENT_ADMISSION_POLICY"
          option-label="name"
          placeholder="Select admission policy"
          class="dropdown-class"
        />
      </div>
      <div class="p-fluid flex flex-col gap-4">
        <!-- {{ JSON.stringify(formData.startDate) }} -->
        <label class="block text-sm font-medium text-gray-900">Start date</label>
        <Calendar
          v-model="formData.startDate"
          show-time
          hour-format="12"
          :hide-on-date-time-select="true"
          :placeholder="'Enter start date'"
          :min-date="new Date()"
          class="dateTimeCustomClass"
        />
      </div>
      <AtomsBaseInput
        v-model="formData.duration"
        :placeholder="'Enter duration'"
        :label="'Duration'"
        type="text"
        :show-hint="true"
        :error-message="v$?.duration?.$error ? v$?.duration?.$errors?.[0]?.$message : ''"
        @input="handleDurationInput('duration', $event)"
      />
      <AtomsBaseInput
        v-model="formData.maxCapacity"
        :placeholder="'Enter maximum capacity'"
        :label="'Maximum capacity'"
        :show-muted-text="formData.maxCapacity === 0"
        :muted-text="'0 means unlimited'"
        type="text"
        :error-message="v$?.maxCapacity?.$error ? v$?.maxCapacity?.$errors?.[0]?.$message : ''"
        @input="handleDurationInput('maxCapacity', $event)"
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
</template>
