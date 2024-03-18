<script setup lang="ts">

const props = defineProps({
  userData: Object,
})
const { userData } = props

</script>
<template>
  <div class="flex flex-col gap-4">
    <AtomsBreadCrumb :hasId="true" :breadCrumbName="userData?.name" />
    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">Total Members: {{ userData?.totalMembers }}</h2>
    </div>

  </div>
</template>
