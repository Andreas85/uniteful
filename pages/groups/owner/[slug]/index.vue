<script setup lang="ts">
import _ from 'lodash'

definePageMeta({
  middleware: ['privateroute']
})

const { fetchGroupDetailService } = useGroupsService()
const { setGroup } = useGroupStore()
const route = useRoute()
const { data: user, refresh, pending, status } = await useAsyncData(() => fetchGroupDetailService({ id: route.params.slug?.toString() }))

const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)

watch(user, (newValue) => {
  if (newValue) {
    if (isAuthenticated.value) {
      const storeData = getGroupStoreData(newValue)
      // console.log(storeData, 'wahererwe')
      setGroup(storeData)
    } else {
      setGroup(newValue)
    }
  }
}, { immediate: true })

</script>
<template>
  <template v-if="pending">
    <NxLoadingPage />
  </template>
  <template v-else-if="user === null">
    <AtomsComingSoon :label="STRING_DATA.GROUO_NOT_EXISTS" />
  </template>
  <template v-else>
    <TemplatesGroupDetail />
  </template>
</template>
