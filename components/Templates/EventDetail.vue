<script setup lang="ts">

const props = defineProps({
  eventData: Object,
})
const { eventData } = props

</script>
<template>
  <div class="flex flex-col gap-4">
    <AtomsBreadCrumb :hasId="true" :breadCrumbName="eventData.todo" />
    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">{{ eventData.todo }}</h2>
    </div>

  </div>
</template>
