<script setup lang="ts">

interface Tab {
  id: number;
  label: string;
  sectionId?: string;
}

const props = defineProps({
  tabList: { type: Array as Tab[] },
  activeTab: { type: Object as Tab }
});
const emit = defineEmits(["tab-click"]);
const { tabList, activeTab } = toRefs(props);

const handleTabClick = (data: any) => {
  emit("tab-click", data);
};

</script>
<template>
  <div role="tablist" class="tabs tabs-bordered flex items-center justify-center  sticky top-16 bg-white tabs-lg">
    <a v-for="tab in tabList" :key="tab.id" class="tab font-bold md:w-auto w-full"
      :class="{ 'tab-active': (activeTab.id === tab.id) }" @click="() => handleTabClick(tab)">
      <!-- {{ tab.id }} {{ activeTab.id }} -->
      {{ tab.label }}
    </a>
  </div>
</template>
