<script setup lang="ts">
import { useResizeObserver } from '@vueuse/core';

const isMobileView = ref({
  mobileView: false,
  isOpenTopbar: false,
});

const navbarElement = ref(null)
const searchValue = ref("");
const searchSvgClicked = ref(false);

const toggleSearchClick = () => {
  searchSvgClicked.value = !searchSvgClicked.value
}

useResizeObserver(navbarElement, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  isMobileView.value.mobileView = width < 1024
})

const handleSignup = () => {
  navigateTo(ROUTE_CONSTANTS.SIGN_UP)
}

const toggleTopBar = () => {
  isMobileView.value.isOpenTopbar = !isMobileView.value.isOpenTopbar
};

</script>

<template>
  <div ref="navbarElement" class="navbar fixed top-0 bg-white z-50  border-b-2" :class="{
    'p-4': isMobileView.mobileView
    , 'px-4': !isMobileView.mobileView
  }">
    <template v-if="!isMobileView.mobileView">
      <div class="lg:flex hidden flex-row items-center justify-between w-full">
        <div class="flex items-center justify-start gap-12">
          <NuxtLink :to="ROUTE_CONSTANTS.HOME" class="text-xl font-bold cursor-pointer ">
            {{ STRING_DATA.BRAND_NAME.toUpperCase() }}
          </NuxtLink>
          <AtomsSearchBox :placeholder="'Search events'" v-model="searchValue" />
        </div>
        <AtomsNavlinks />
      </div>
    </template>
    <template v-else>
      <div class="flex flex-col w-full gap-4">
        <div class="flex items-center justify-between w-full relative bg-white">
          <template v-if="!isMobileView.isOpenTopbar">
            <AtomsMenuSvg v-on:clicked="toggleTopBar" />
          </template>
          <template v-else>
            <AtomsCrossSvg v-on:clicked="toggleTopBar" />
          </template>
          <NuxtLink :to="ROUTE_CONSTANTS.HOME" class="text-xl font-bold cursor-pointer ">
            {{ STRING_DATA.BRAND_NAME.toUpperCase() }}
          </NuxtLink>
          <AtomsSearchSvg :customClass="'h-[1.2rem] w-[1.2rem]'" v-on:clicked="toggleSearchClick" />

        </div>
        <template v-if="searchSvgClicked">
          <AtomsSearchBox :placeholder="'Search events'" v-model="searchValue" />
        </template>
      </div>
      <div class="custom-drawer-class" :class="{ '-translate-x-full': !isMobileView.isOpenTopbar }">
        <HocCustomDrawer v-on:route-link-clicked="toggleTopBar" />
      </div>
    </template>
  </div>
</template>
