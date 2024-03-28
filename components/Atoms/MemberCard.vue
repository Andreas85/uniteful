<script setup lang="ts">
import { useGroupStore } from '~/stores/group'

const props = defineProps({
  member: { type: Object },
  isRequestMemberCard: {
    type: Boolean, default: false
  },
  isOrdinaryUser: {
    type: Boolean, default: false
  }
})

const emit = defineEmits(['remove-api', 'reject-api', 'approve-api', 'moderator-api'])
const userStore = useUserStore()
const groupStore = useGroupStore()

const { isAuthenticated } = storeToRefs(userStore)
const { groupData } = storeToRefs(groupStore)
const { member, isRequestMemberCard } = toRefs(props)

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
    <AtomsTippyThreeDot
      :show-join-request-tippy="isRequestMemberCard"
      @remove="emit('remove-api')"
      @reject="emit('reject-api')"
      @approve="emit('approve-api')"
      @moderator="emit('moderator-api')"
    />
  </div>
</template>
