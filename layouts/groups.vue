<script setup lang="ts">
import _ from 'lodash'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import { ROUTE_CONSTANTS } from '../utils'

const route = useRoute()
const groupContants = Object.values(ROUTE_CONSTANTS)
const active = ref(route.path === ROUTE_CONSTANTS.GROUP_MEMBER ? 1 : 0)

onMounted(() => {
  const groupFound = groupContants.filter(path => route.path === path)
  if (groupFound.length > 0) {
    navigateTo(_.first(groupFound))
  }
})

const vueTabClick = (event: any) => {
  const { index } = event
  if (index === 0) {
    navigateTo(ROUTE_CONSTANTS.GROUP_OWNER)
  }
  if (index === 1) {
    navigateTo(ROUTE_CONSTANTS.GROUP_MEMBER)
  }
}

</script>
<template>
  <div v-if="!$route.params.slug" class="py-2">
    <TabView v-model:activeIndex="active" class="bg-transparent" @tab-change="vueTabClick">
      <TabPanel v-for="tab in GROUPS_TAB" :key="tab.id" :header="tab.label">
        <slot />
      </TabPanel>
    </TabView>
  </div>
  <template v-else>
    <slot />
  </template>
</template>
