<script setup lang="ts">

import Paginator from 'primevue/paginator'

const props = defineProps({
  totalCount: { type: Number, default: 0 },
  currentPage: { type: Number, default: 0 }
})

const { totalCount, currentPage } = toRefs(props)
const first = ref(0)
const emit = defineEmits(['currentpage'])

const handlePageChange = (e: PageState) => {
  const { page } = e
  emit('currentpage', { page })
}

watch(currentPage, (newValue) => {
  first.value = newValue
}, { immediate: true })

</script>
<template>
  <Paginator
    v-model:first="first"
    :rows="1"
    :total-records="totalCount"
    template="FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
    @page="handlePageChange"
  />
</template>
