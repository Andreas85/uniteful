<script setup lang="ts">
import Card from 'primevue/card'
import { findSelectedAdmissionPolicy, findSelectedRegistrationPolicy, findSelectedVisibility } from '~/utils/helper'

const props = defineProps({
  data: {
    type: Object, default: () => {}
  }
})

const { data } = toRefs(props)

const formData = reactive({
  visibility: '',
  registrationPolicy: '',
  admissionPolicy: ''
})

const headingClass = () => ('md:col-span-4 col-span-full')
const valueClass = () => ('md:col-span-8 col-span-full')

watch(data, (newValue) => {
  if (newValue) {
    formData.visibility = findSelectedVisibility(newValue)?.name ?? '-'
    formData.registrationPolicy = findSelectedRegistrationPolicy(newValue)?.name ?? '-'
    formData.admissionPolicy = findSelectedAdmissionPolicy(newValue)?.name ?? '-'
  }
}, { immediate: true })

</script>

<template>
  <div class="grid lg:grid-cols-3 gap-4">
    <Card>
      <template #title>
        Visibility
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <NxShowLabelValue
            :heading-class="headingClass()"
            :value-class="valueClass()"
            :value="formData?.visibility ?? '-'"
            :heading="'Type'"
          />
        </div>
      </template>
    </Card>

    <Card>
      <template #title>
        Registration policy
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <NxShowLabelValue
            :heading-class="headingClass()"
            :value-class="valueClass()"
            :value="formData?.registrationPolicy ?? '-'"
            :heading="'Policy type'"
          />
        </div>
      </template>
    </Card>

    <Card>
      <template #title>
        Admission policy
      </template>
      <template #content>
        <div class="flex flex-col gap-6">
          <NxShowLabelValue
            :heading-class="headingClass()"
            :value-class="valueClass()"
            :value="formData?.admissionPolicy ?? '-'"
            :heading="'Policy type'"
          />
        </div>
      </template>
    </Card>
  </div>
</template>
