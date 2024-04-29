<script setup lang="ts">
import Menu from 'primevue/menu'
import { useGroupStore } from '~/stores/group'

const props = defineProps({
  member: { type: Object, default: () => {} },
  menuItems: { type: Array, default: () => [] },
  isRequestMemberCard: {
    type: Boolean, default: false
  },
  isOrdinaryUser: {
    type: Boolean, default: false
  },
  name: {
    type: String, default: ''
  },
  profileImage: {
    type: String, default: ''
  },
  joinedAt: {
    type: String, default: ''
  },
  email: {
    type: String, default: ''
  },
  showGroupIcon: {
    type: Boolean, default: false
  },
  showIcons: {
    type: Boolean, default: true
  }
})

const emit = defineEmits(['menuSelect'])
const userStore = useUserStore()
const groupStore = useGroupStore()

const { isAuthenticated } = storeToRefs(userStore)
const { groupData } = storeToRefs(groupStore)
const { showIcons, member, showGroupIcon, isRequestMemberCard, menuItems, name, profileImage, joinedAt, email } = toRefs(props)
const menu = ref()
const menuItemRef = ref<any>([])
const toggle = (event: Event) => {
  menu.value.toggle(event)
  handleSelectMenu()
}

const handleSelectMenu = () => {
  emit('menuSelect', member)
}

watch(member, (newValue) => {
  if (newValue?.isModerator) {
    const updateItems = menuItems.value?.[0]?.items?.filter((item: any) => item?.label !== 'Moderator')
    // console.log('updateItems', updateItems)
    menuItemRef.value = [{ items: updateItems }]
  } else {
    menuItemRef.value = menuItems.value
  }
}, { immediate: true })

const handleModeratorClick = (event: Event) => {
  if (isAuthenticated && groupData?.value?.isOwner) {
    toggle(event)
  }
}

</script>

<template>
  <div class="flex items-center justify-start gap-4">
    <div class="flex items-center justify-start gap-4">
      <div v-if="showGroupIcon" class="avatar">
        <svg xmlns="http://www.w3.org/2000/svg" width="2rem" height="2rem" viewBox="0 0 1920 1792">
          <path
            d="M593 896q-162 5-265 128H194q-82 0-138-40.5T0 865q0-353 124-353q6 0 43.5 21t97.5 42.5T384 597q67 0 133-23q-5 37-5 66q0 139 81 256m1071 637q0 120-73 189.5t-194 69.5H523q-121 0-194-69.5T256 1533q0-53 3.5-103.5t14-109T300 1212t43-97.5t62-81t85.5-53.5T602 960q10 0 43 21.5t73 48t107 48t135 21.5t135-21.5t107-48t73-48t43-21.5q61 0 111.5 20t85.5 53.5t62 81t43 97.5t26.5 108.5t14 109t3.5 103.5M640 256q0 106-75 181t-181 75t-181-75t-75-181t75-181T384 0t181 75t75 181m704 384q0 159-112.5 271.5T960 1024T688.5 911.5T576 640t112.5-271.5T960 256t271.5 112.5T1344 640m576 225q0 78-56 118.5t-138 40.5h-134q-103-123-265-128q81-117 81-256q0-29-5-66q66 23 133 23q59 0 119-21.5t97.5-42.5t43.5-21q124 0 124 353m-128-609q0 106-75 181t-181 75t-181-75t-75-181t75-181t181-75t181 75t75 181"
          />
        </svg>
      </div>
      <template v-else>
        <div v-if="profileImage" class="avatar">
          <div class="w-12 rounded-full">
            <img :src="profileImage">
          </div>
        </div>
        <template v-else>
          <NxAvatar :label="getInitials(name)" />
        </template>
      </template>
    </div>
    <div class="flex flex-col gap-2">
      <div class="flex flex-wrap items-center justify-start gap-4">
        <div>{{ name ?? email }}</div>
        <template v-if="member?.isModerator">
          <div
            aria-haspopup="true"
            aria-controls="overlay_menu"
            class="cursor-pointer flex flex-wrap items-center justify-start gap-2 border border-brand-color text-brand-color px-2 py-[2px] shadow rounded-lg"
            @click="handleModeratorClick"
          >
            <span class="text-sm">Moderator</span>
            <Icon
              v-if="((groupData?.isOwner) && isAuthenticated) "
              class="cursor-pointer"
              :name="'akar-icons:cross'"
              :width="'1rem'"
              :height="'1rem'"
            />
          </div>
        </template>
      </div>
      <div>{{ formattedDateAndTime(joinedAt) }}</div>
    </div>
  </div>
  <div v-if="((groupData?.isOwner) && isAuthenticated && showIcons)" class="relative">
    <div class="card flex justify-content-center">
      <div v-if="!member?.isModerator" aria-haspopup="true" aria-controls="overlay_menu" @click="toggle">
        <Icon class="cursor-pointer" :name="'ph:dots-three-vertical-bold'" :width="'2rem'" :height="'2rem'" />
      </div>
      <Menu id="overlay_menu" ref="menu" :model="menuItemRef" :popup="true" />
    </div>
  </div>
</template>
