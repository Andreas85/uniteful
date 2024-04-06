<script setup lang="ts">

import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

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
  <div role="tablist" class="tabs tabs-bordered flex items-center justify-center  sticky top-16 bg-[#f6f7f8] tabs-lg">
    <a v-for="tab in tabList" :key="tab.id" class="tab font-bold md:w-auto w-full"
      :class="{ 'tab-active': (activeTab.id === tab.id) }" @click="() => handleTabClick(tab)">
      {{ tab.label }}
    </a>
  </div>

    <!-- <TabView>
            <TabPanel header="Header I">
                <p class="m-0">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
                    consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
            </TabPanel>
            <TabPanel header="Header II">
                <p class="m-0">
                    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim
                    ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Consectetur, adipisci velit, sed quia non numquam eius modi.
                </p>
            </TabPanel>
            <TabPanel header="Header III">
                <p class="m-0">
                    At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                    officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus.
                </p>
            </TabPanel>
        </TabView> -->
</template>
