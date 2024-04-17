<script setup lang="ts">

definePageMeta({
  middleware: ['privateroute']
})

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['handle-submit'])
const { fetchEventDetailService, updateEventService } = useEventsService()

const { data: user, refresh, pending, status } = await useAsyncData(() => fetchEventDetailService({ id: route.params.slug?.toString() }))

const { loading, showLoading, hideLoading } = useLoader()
const toast = useToast()

const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Updated', life: 3000 })
}

const showError = (message: string) => {
  toast.add({ severity: 'error', summary: 'Error Message', detail: message ?? 'Message Content', life: 3000 })
}

const back = () => {
  navigateTo(ROUTE_CONSTANTS.EVENTS_OWNER + '/' + route.params.slug)
}
const upateGroup = async (payload: any) => {
  try {
    showLoading()
    const response = await updateEventService({ id: user.value._id?.toString() ?? '', formData: payload })
    showSuccess()
    back()
  } catch (error) {
    const message = handleQueryResponse(error)
    showError(message)
  } finally {
    hideLoading()
  }
}

const handleUpdateGroup = (data: any) => {
  // const { name, desc, groupValues, visibility } = data.formData
  const payload = {
    ...data
  }
  console.log(payload)
  upateGroup(payload)
}

</script>
<template>
  <template v-if="pending">
    <NxLoadingPage />
  </template>
  <template v-else>
    <div class="py-8">
      <NxEventEditForm :user-data="sanitizedUserDetail(user)" :loading="loading" @handle-submit="handleUpdateGroup" />
    </div>
  </template>
</template>
