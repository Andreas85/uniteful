<script setup lang="ts">

import Calendar from 'primevue/calendar'
const props = defineProps({
  dateTimeValue: String
})

const { dateTimeValue } = toRefs(props)

</script>

<template>
  <div class="flex-auto">
    <label for="calendar-12h" class="font-bold block mb-2"> 12h Format </label>
    <Calendar id="calendar-12h" v-model="dateTimeValue" show-time hour-format="12" />
  </div>
</template>
