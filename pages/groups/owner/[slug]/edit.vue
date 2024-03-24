<script setup lang="ts">

definePageMeta({
  middleware: ['privateroute']
})

const route = useRoute()
const router = useRouter()
const emit = defineEmits(['handle-submit'])
const { fetchGroupDetailService } = useGroupsService()
const { updateGroupService } = useGroupsService()
const { data: user, refresh, pending, status } = await useAsyncData(() => fetchGroupDetailService({ id: route.params.slug?.toString() }))

const { loading, showLoading, hideLoading } = useLoader()
const toast = useToast()

const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Updated', life: 3000 })
}

const showError = (message:string) => {
  toast.add({ severity: 'error', summary: 'Error Message', detail: message ?? 'Message Content', life: 3000 })
}

const back = () => {
  navigateTo(ROUTE_CONSTANTS.GROUP_OWNER + '/' + route.params.slug)
}
const upateGroup = async (payload:any) => {
  try {
    showLoading()
    const response = await updateGroupService({ id: route.params.slug?.toString() ?? '', formData: payload })
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

console.log(user)
</script>
<template>
  <template v-if="pending">
    <NxLoadingPage />
  </template>
  <template v-else>
    <div class="py-8">
      <NxGroupEditForm :user-data="sanitizedUserDetail(user)" :loading="loading" @handle-submit="handleUpdateGroup" />
    </div>
  </template>
</template>: any: any: any: any
