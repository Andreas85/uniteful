<script setup lang="ts">

import Breadcrumb from 'primevue/breadcrumb'

const props = defineProps({
  hasId: { type: Boolean, default: false },
  breadCrumbName: {
    type: String, default: ''
  },
  breadCrumbLink: { type: String, default: '' }
})

const { hasId, breadCrumbName, breadCrumbLink } = toRefs(props)
const route = useRoute()
const breadcrumbs = computed(() => {
  const updatedLinks = useBreadcrumbs(route)
  if (hasId.value) {
    updatedLinks.push({ path: breadCrumbLink.value, label: breadCrumbName.value })
  }
  return updatedLinks
})

</script>
<template>
  <div class="text-lg breadcrumbs">
    <Breadcrumb :model="breadcrumbs">
      <template #item="{ item, props }">
        <NuxtLink :to="item.path" v-bind="props.action">
          {{ item.label }}
        </Nuxtlink>
      </template>
    </Breadcrumb>
  </div>
</template>
