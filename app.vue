<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'

const { getProfileService } = useProfileService()
const userStore = useUserStore()

const { isAuthenticated } = storeToRefs(userStore)

const fetchUserProfile = () => {
  getProfileService({
    success: (data) => {
      const newData = data?.data?.user
      userStore?.setUser(newData)
    }
  })
}

watch(isAuthenticated, (newValue) => {
  if (newValue) {
    fetchUserProfile()
  }
}, { immediate: true })

</script>
<template>
  <ConfirmDialog />
  <Toast />
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
