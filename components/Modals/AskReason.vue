<script setup lang="ts">

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

const submitForm = () => {
  emit('submit', formData)
}

</script>

<template>
  <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
    <AtomsBaseInput
      v-model="formData.reason"
      :placeholder="'Enter reason'"
      :label="fieldLabel"
      type="text"
    />
    <NxActionButton :is-loading="loading" :button-label="buttonLabel?.toUpperCase()" :is-submit="true" />
  </form>
</template>
