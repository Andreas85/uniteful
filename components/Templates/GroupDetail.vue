<script setup lang="ts">
import Card from 'primevue/card'
import { useGroupStore } from '~/stores/group'

const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const groupStore = useGroupStore()
const { groupData } = storeToRefs(groupStore)
const route = useRoute()

const sectionClass = () => ('lg:w-1/2 w-full h-full')
const navigateToEdit = () => {
  const path = `${ROUTE_CONSTANTS.GROUP_OWNER}/${route.params.slug?.toString()}/edit`
  navigateTo(path)
}

</script>
<template>
  <div class="flex flex-col gap-4 pt-8 mb-4">
    <AtomsBreadCrumb v-if="groupData?.name" />
    <div v-if="groupData?.isOwner" class="flex justify-end items-center ">
      <NxActionButton :button-label="STRING_DATA.EDIT.toUpperCase()" :onclick="navigateToEdit" />
    </div>
    <section class="flex w-full mx-auto lg:flex-row flex-col gap-5 py-4">
      <div class="lg:w-1/2 w-full rounded-lg min-h-full">
        <img v-if="groupData?.image" :src="groupData?.image" alt="group-image" class="rounded-lg min-h-96">
        <img v-else src="~assets/img/sample.png" class="rounded-lg min-h-96">
      </div>
      <Card :class="sectionClass()">
        <template #title>
          {{ groupData?.name }}
        </template>
        <template #content>
          <NxGroupRightSection />
        </template>
      </Card>
    </section>
    <section v-if="groupData?.groupValues && groupData?.groupValues?.length > 0">
      <NxGroupValueRender />
    </section>
    <section>
      <NxGroupMembers :member-id="groupData?._id" />
    </section>
    <section>
      <NxGroupJoinRequests />
    </section>
  </div>
</template>
