<script setup lang="ts">
interface ITooltip {
  isEnabled: boolean;
  isVisible: boolean;
  isDestroyed: boolean;
  isMounted: boolean;
  isShown: boolean;
}


const route = useRoute();
const userStore = useUserStore()
const { isAuthenticated } = storeToRefs(userStore)
const isTippyOpen = ref(false);

const handleSignup = () => {
  navigateTo(ROUTE_CONSTANTS.SIGN_UP)
}

const toggleTippy = () => {
  isTippyOpen.value = !isTippyOpen.value
}

const onStateChange = (e: ITooltip) => {
  const { isVisible } = e
  if (isVisible) {
    isTippyOpen.value = true
    return;
  }
  isTippyOpen.value = false
}

const iconcompute = computed(() => (!isTippyOpen.value ? 'fa-solid:caret-up' : 'fa-solid:caret-down'))
</script>
<template>
  <div class=" flex items-center gap-8">
    <template v-if="isAuthenticated">

      <div class="relative">
        <tippy trigger="click" content-class="content-wrapper" @state="onStateChange">
          <template #default>
            <div class="avatar cursor-pointer flex items-center" @click="toggleTippy">
              <div class="w-12 rounded-full">
                <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
              </div>
              <Icon :name="iconcompute" :width="'1.1rem'" :height="'1.1rem'" />
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
