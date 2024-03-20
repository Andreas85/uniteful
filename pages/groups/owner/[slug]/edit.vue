<script setup lang="ts">

definePageMeta({
  middleware: ["privateroute"]
})

const route = useRoute();
const emit = defineEmits(["handle-submit"]);
const { fetchGroupDetailService } = useGroupsService()
const { updateGroupService } = useGroupsService()
const { data: user, refresh, pending, status } = await useAsyncData(() => fetchGroupDetailService({ id: route.params.slug }))

const { loading, showLoading, hideLoading } = useLoader()
const toast = useToast()

const showSuccess = () => {
  toast.add({ severity: 'success', summary: 'Success Message', detail: 'Updated', life: 3000 });
};

const showError = (message) => {
  toast.add({ severity: 'error', summary: 'Error Message', detail: message ?? 'Message Content', life: 3000 });
};

const upateGroup = async (payload) => {
  try {
    showLoading()
    const response = await updateGroupService({ id: route.params.slug ?? "", formData: payload })
    showSuccess()
  } catch (error) {
    const message = handleQueryResponse(error)
    showError(message)
  } finally {
    hideLoading()
  }
}

const handleUpdateGroup = (data: any) => {
  const { name, desc, groupValues } = data.formData
  const payload = {
    name, desc, groupValues
  }
  // console.log(payload)
  upateGroup(payload)
}

</script>
<template>
  <div class="py-8">
    <Toast />
    <NxGroupEditForm :userData="user" v-on:handle-submit="handleUpdateGroup" :loading="loading" />
  </div>
</template>