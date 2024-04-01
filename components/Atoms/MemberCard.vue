<script setup lang="ts">
import Menu from 'primevue/menu'
import { useGroupStore } from '~/stores/group'

const props = defineProps({
  member: { type: Object },
  menuItems: { type: Array, default: () => [] },
  isRequestMemberCard: {
    type: Boolean, default: false
  },
  isOrdinaryUser: {
    type: Boolean, default: false
  }
})

const userStore = useUserStore()
const groupStore = useGroupStore()

const { isAuthenticated } = storeToRefs(userStore)
const { groupData } = storeToRefs(groupStore)
const { member, isRequestMemberCard, menuItems } = toRefs(props)
const menu = ref()

const toggle = (event: Event) => {
  menu.value.toggle(event)
}

</script>

<template>
  <div class="flex items-center justify-start gap-4">
    <div class="flex items-center justify-start gap-4">
      <div class="avatar placeholder">
        <div class="bg-neutral text-neutral-content rounded-full w-16">
          <span class="text-xl">AI</span>
        </div>
      </div>
    </div>
    <div class="flex flex-col">
      <div>{{ member?.member?.name ?? member?.member?.email }}</div>
      <div>{{ getRequiredDataFormat(member?.joinedAt) }}</div>
    </div>
  </div>
  <div v-if="(!groupData?.isOrdinaryUser && isAuthenticated)" class="relative">
    <div class="card flex justify-content-center">
      <div aria-haspopup="true" aria-controls="overlay_menu" @click="toggle">
        <Icon class="cursor-pointer" :name="'ph:dots-three-vertical-bold'" :width="'2rem'" :height="'2rem'" />
      </div>
      <Menu id="overlay_menu" ref="menu" :model="menuItems" :popup="true" />
    </div>
  </div>
</template>
