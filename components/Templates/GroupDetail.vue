<script setup lang="ts">
import Card from 'primevue/card'

const props = defineProps({
  groupData: Object
})

const { groupData } = toRefs(props)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const route = useRoute()

const sectionClass = () => ('lg:w-1/2 w-full ')
const navigateToEdit = () => {
  const path = `${ROUTE_CONSTANTS.GROUP_OWNER}/${route.params.slug?.toString()}/edit`
  navigateTo(path)
}

</script>
<template>
  <div class="flex flex-col gap-4 pt-8">
    <AtomsBreadCrumb v-if="groupData?.name" :has-id="true" />
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
          <div class="flex flex-col gap-4">
            <AtomsIconLabel :icon="'basil:location-outline'">
              {{ groupData?.location ?? '-' }}
            </AtomsIconLabel>
            <div class="flex gap-4 items-center justify-start">
              <AtomsIconLabel :icon="'material-symbols:group-outline'">
                {{ groupData?.totalMembers ?? '-' }} members
              </AtomsIconLabel>
              <span>
                {{ groupData?.isPublic ? 'Public' : 'Private' }} group
              </span>
            </div>
            <AtomsIconLabel :icon="'mdi:user-outline'">
              Organized by {{ groupData?.owner?.name ?? '-' }}
            </AtomsIconLabel>
          </div>
        </template>
      </Card>
    </section>
    <section class="mb-4">
      <NxGroupMembers :member-id="'test'" />
    </section>
  </div>
</template>
