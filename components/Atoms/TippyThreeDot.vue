<script setup lang="ts">
import { useGroupStore } from '~/stores/group'

const props = defineProps({
  showJoinRequestTippy: {
    type: Boolean, default: false
  }
})

const emit = defineEmits(['remove', 'moderator', 'approve', 'reject'])

const groupStore = useGroupStore()
const { groupData } = storeToRefs(groupStore)
const isTippyOpen = ref(false)
const { showJoinRequestTippy } = toRefs(props)

const onStateChange = (e: ITooltip) => {
  const { isVisible } = e
  if (isVisible) {
    isTippyOpen.value = true
    return
  }
  isTippyOpen.value = false
}

const toggleTippy = () => {
  isTippyOpen.value = !isTippyOpen.value
}

</script>
<template>
  <div class="relative">
    <tippy trigger="click" @state="onStateChange">
      <template #default>
        <Icon
          class="cursor-pointer"
          :name="'ph:dots-three-vertical-bold'"
          :width="'2rem'"
          :height="'2rem'"
          @click="toggleTippy"
        />
      </template>
      <template #content>
        <div
          class="bg-white border border-gray-400 shadow-lg p-2 rounded-lg text-sm min-w-40 absolute -right-6 z-50 pointer-events-auto"
          :class="{'-top-32': groupData?.isOwner,'-top-20': groupData?.isModerator}"
        >
          <div class="flex flex-col gap-4">
            <template v-if="!showJoinRequestTippy">
              <NxActionButton
                v-if="groupData?.isOwner"
                :button-label="STRING_DATA.MAKE_MODERATOR.toUpperCase()"
                @click=" emit('moderator')"
              />
              <NxActionButton
                :button-label="STRING_DATA.REMOVE.toUpperCase()"
                :is-delete-button="true"
                @click=" emit('remove')"
              />
            </template>
            <template v-else>
              <NxActionButton
                v-if="groupData?.isOwner"
                :button-label="STRING_DATA.APPROVE.toUpperCase()"
                @click=" emit('approve')"
              />
              <NxActionButton
                :button-label="STRING_DATA.REJECT.toUpperCase()"
                :is-delete-button="true"
                @click=" emit('reject')"
              />
            </template>
          </div>
        </div>
      </template>
    </tippy>
  </div>
</template>
