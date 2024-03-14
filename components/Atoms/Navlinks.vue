<script setup lang="ts">

const route = useRoute();
const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)
const handleSignup = () => {
  navigateTo(ROUTE_CONSTANTS.SIGN_UP)
}
</script>
<template>
  <div class=" flex items-center gap-8">
    <template v-if="isAuthenticated">

      <div class="relative">
        <tippy trigger="click" content-class="content-wrapper">
          <template #default>
            <div class="avatar cursor-pointer">
              <div class="w-12 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
            </div>
          </template>
          <template #content>
            <AtomsTippyContent />
          </template>
        </tippy>
      </div>
    </template>
    <template v-else>
      <AtomsIconLabel :icon="'material-symbols:login'">
        <NuxtLink :to="ROUTE_CONSTANTS.LOGIN">{{ STRING_DATA.LOGIN }}</NuxtLink>
      </AtomsIconLabel>
      <NxActionButton :buttonLabel="STRING_DATA.SIGN_UP" :icon="'mdi:register-outline'" :onclick="handleSignup" />
    </template>
  </div>
</template>
