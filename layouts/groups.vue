<script setup lang="ts">

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
  } else {
    selectedTab.value = GROUPS_TAB?.[1]
    navigateTo(ROUTE_CONSTANTS.GROUP_MEMBER)
  }
})


</script>
<template>
  <NxCustomTab :tab-list="GROUPS_TAB" v-on:tab-click="handleTabClick" :active-tab="selectedTab" />
  <slot />
</template>