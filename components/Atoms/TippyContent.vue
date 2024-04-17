<script setup lang="ts">

const userStore = useUserStore()
const { logout } = userStore
const { isAuthenticated } = storeToRefs(userStore)

const handlelogout = () => {
  logout()
  navigateTo(ROUTE_CONSTANTS.LOGIN)
}
</script>
<template>
  <div class="bg-white border border-gray-400 shadow-lg p-4 rounded-lg text-sm min-w-60 ">
    <div class="flex flex-col gap-4">
      <NuxtLink :to="ROUTE_CONSTANTS.EVENTS_OWNER">
        {{ STRING_DATA.YOUR_EVENTS }}
      </NuxtLink>
      <NuxtLink :to="ROUTE_CONSTANTS.GROUP_OWNER">
        {{ STRING_DATA.YOUR_GROUPS }}
      </NuxtLink>
      <NuxtLink :to="ROUTE_CONSTANTS.PROFILE">
        {{ STRING_DATA.PROFILE }}
      </NuxtLink>
      <hr class="bg-gray-500">
      <template v-if="isAuthenticated">
        <NuxtLink class="cursor-pointer" @click="handlelogout">
          {{ STRING_DATA.LOGOUT }}
        </NuxtLink>
      </template>
    </div>
  </div>
</template>
