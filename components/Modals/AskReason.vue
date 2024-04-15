<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

const props = defineProps({
  loading: { type: Boolean, default: false },
  buttonLabel: { type: String, default: '' },
  fieldLabel: { type: String, default: '' }
})

const { loading, buttonLabel, fieldLabel } = toRefs(props)
const emit = defineEmits(['submit'])

const formData = reactive({
  reason: ''
})

const rules = {
  reason: {
    required: helpers.withMessage(ERROR_MESSAGE.REASON, required)
  }
}

const v$ = useVuelidate(rules, formData)

const submitForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    emit('submit', formData)
  } else {
    console.log('Invalid Form NOT Submitted')
  }
}

</script>

<template>
  <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
    <AtomsBaseInput
      v-model="formData.reason"
      :placeholder="'Enter reason'"
      :label="fieldLabel"
      type="text"
      :error-message="v$?.reason?.$error ? v$?.reason?.$errors?.[0]?.$message : ''
      "
    />
    <NxActionButton :is-loading="loading" :button-label="buttonLabel?.toUpperCase()" :is-submit="true" />
  </form>
</template>
