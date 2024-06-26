<script setup lang="ts">
const userStore = useUserStore()
const { logout } = userStore
const { isAuthenticated, user } = storeToRefs(userStore)

const updatedAuthenticated = computed(() => isAuthenticated.value)
const drawerNavlinks = ref<any>([])

const emit = defineEmits(['route-link-clicked'])

const handleClick = () => {
  emit('route-link-clicked')
}

const handleDrawerOptions = () => {
  const updateRoutes = URL_ROUTES.filter(item => item.isAuthenticatedRoute === updatedAuthenticated.value)
  drawerNavlinks.value = updateRoutes
}

onMounted(() => {
  handleDrawerOptions()
})

// Watch for changes in isAuthenticated and update drawerNavlinks accordingly
watchEffect(() => {
  handleDrawerOptions()
})

const handleLogout = () => {
  logout()
  navigateTo(ROUTE_CONSTANTS.HOME)
  handleClick()
}

</script>
<template>
  <div class="flex flex-col gap-4 w-full h-full">
    <div class="flex flex-col gap-4 transform transition duration-300 py-4 flex-1 overflow-y-scroll min-h-[70vh]">
      <AtomsIconLabel
        v-for="(item, index) in drawerNavlinks"
        :key="index"
        :custom-class="'flex items-center justify-between flex-row-reverse'"
        :icon="item?.icon"
        :icon-size="'2rem'"
        :icon-color="'grey'"
      >
        <NuxtLink class="text-xl font-bold" :to="item?.path" @click="handleClick">
          {{ item?.label }}
        </NuxtLink>
      </AtomsIconLabel>
    </div>
    <template v-if="updatedAuthenticated">
      <hr class="bg-gray-600 ">
      <div class="flex items-center justify-between">
        <div class="cursor-pointer">
          <div v-if="user?.profileImage" class="avatar">
            <div class="w-12 rounded-full">
              <img :src="user?.profileImage">
            </div>
          </div>
          <template v-else>
            <NxAvatar :label="getInitials(user?.name) " />
          </template>
        </div>
        <AtomsIconLabel :icon="'material-symbols:logout'">
          <div class="cursor-pointer" @click="handleLogout">
            {{ STRING_DATA.LOGOUT }}
          </div>
        </AtomsIconLabel>
      </div>
    </template>
  </div>
</template>
