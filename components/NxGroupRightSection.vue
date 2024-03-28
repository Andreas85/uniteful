<script setup lang="ts">

const { joinGroupService, leaveGroupService, fetchGroupDetailService } = useGroupsService()
const { loading, showLoading, hideLoading } = useLoader()
const groupStore = useGroupStore()
const { groupData } = storeToRefs(groupStore)

const handleCreateGroup = () => {
  showLoading()
  const payload = {
    groupId: groupData.value?._id ?? ''
  }
  // console.log(payload)
  if (groupData?.value?.isMember) {
    leaveGroupService({
      body: payload,
      success: (data) => {
        refreshData()
        hideLoading()
      },
      fail: (data) => {
        hideLoading()
      }
    })
    return
  }
  joinGroupService({
    body: payload,
    success: (data) => {
      refreshData()
      hideLoading()
    },
    fail: (data) => {
      hideLoading()
    }
  })
}

const refreshData = async () => {
  await refreshNuxtData(NUXT_ASYNC_DATA_KEY.HOME_PAGE_GROUP_DETAIL)
}

</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-4 items-center justify-start">
      <AtomsIconLabel :icon="'material-symbols:group-outline'">
        {{ groupData?.totalMembers ?? '-' }} members
      </AtomsIconLabel>
    </div>
    <AtomsIconLabel :icon="'mdi:user-outline'">
      Organized by {{ groupData?.owner?.name ?? groupData?.owner?.email }}
    </AtomsIconLabel>

    <div v-if="groupData?.canJoinGroup && !groupData?.isOwner" class="flex justify-end items-center ">
      <NxActionButton
        :is-loading="loading"
        :button-label="groupData?.isMember ? STRING_DATA.LEAVE.toUpperCase() : STRING_DATA.JOIN.toUpperCase()"
        @click="handleCreateGroup"
      />
    </div>
  </div>
</template>
