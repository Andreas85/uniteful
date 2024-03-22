<script setup lang="ts">
import TabMenu from 'primevue/tabmenu';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';
const route = useRoute();
const selectedTab = ref<Tab>(GROUPS_TAB?.[0]);

const handleTabClick = (data: Tab) => {
  selectedTab.value = data;
  if (data.sectionId === HAST_ID.OWNER) {
    navigateTo(ROUTE_CONSTANTS.GROUP_OWNER)
    return;
  }
  if (data.sectionId === HAST_ID.MEMBER) [
    navigateTo(ROUTE_CONSTANTS.GROUP_MEMBER)
  ]
};

onMounted(() => {
  if (route.path === ROUTE_CONSTANTS.GROUP_OWNER) {
    selectedTab.value = GROUPS_TAB?.[0]
    navigateTo(ROUTE_CONSTANTS.GROUP_OWNER)
  }
  if (route.path === ROUTE_CONSTANTS.GROUP_MEMBER) {
    selectedTab.value = GROUPS_TAB?.[1]
    navigateTo(ROUTE_CONSTANTS.GROUP_MEMBER)
  }
})

const tabs = ref([
    { title: 'Tab 1', content: 'Tab 1 Content' },
    { title: 'Tab 2', content: 'Tab 2 Content' },
    { title: 'Tab 3', content: 'Tab 3 Content' }
]);

const vueTabClick = (event:  TabViewChangeEvent) => {
  console.log(event)
  const {index} = event
  if (index === 0) {
    // selectedTab.value = GROUPS_TAB?.[0]
    navigateTo(ROUTE_CONSTANTS.GROUP_OWNER)
  }
  if (index === 1) {
    // selectedTab.value = GROUPS_TAB?.[1]
    navigateTo(ROUTE_CONSTANTS.GROUP_MEMBER)
  }
}
const active = ref(0);
</script>
<template>
  <!-- <NxCustomTab v-if="!$route.params.slug" :tab-list="GROUPS_TAB" v-on:tab-click="handleTabClick"
    :active-tab="selectedTab" />
  <slot /> -->
    <div class='py-2' v-if="!$route.params.slug">
      <TabView @tab-change="vueTabClick" class="bg-transparent">
        <TabPanel v-for="tab in GROUPS_TAB" :key="tab.id" :header="tab.label" >
          <slot />
        </TabPanel>
      </TabView>
    </div>
    <template v-else>
      <slot />
    </template>        
</template>