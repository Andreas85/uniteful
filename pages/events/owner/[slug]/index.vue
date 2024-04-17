<script setup lang="ts">
import _ from 'lodash'

definePageMeta({
  middleware: ['privateroute']
})

const { fetchEventDetailService } = useEventsService()
const { setEvent } = useEventStore()
const route = useRoute()
const { data: event, pending } = await useAsyncData(() => fetchEventDetailService({ id: route.params.slug?.toString() }))

watch(event, (newValue) => {
  if (newValue) {
    setEvent(newValue)
  }
}, { immediate: true })

</script>
<template>
  <template v-if="pending">
    <NxLoadingPage />
  </template>
  <template v-else-if="event === null">
    <AtomsComingSoon :label="STRING_DATA.GROUO_NOT_EXISTS" />
  </template>
  <template v-else>
    <TemplatesEventDetail />
  </template>
</template>
