<script setup lang="ts">
import Card from 'primevue/card';
interface IFileRef {
  blobUrl: string;
  base64Url: string;
  fileUrl: string;
}

const props = defineProps({
  userData: Object,
})

const { userData } = toRefs(props)
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

const route = useRoute();

const sectionClass = () => ("lg:w-1/2 w-full ")
const navigateToEdit = () => {
  navigateTo(route.fullPath + "/edit")
}

</script>
<template>
  <div class="flex flex-col gap-4 pt-8">
  <template v-if="!userData">
      <NxLoadingPage />
    </template>
    <template v-else>
    <AtomsBreadCrumb v-if="userData?.name" :hasId="true" :breadCrumbName="userData?.name" />
    <div class="flex justify-end items-center ">
      <NxActionButton :buttonLabel="STRING_DATA.EDIT.toUpperCase()" :onclick="navigateToEdit" />
    </div>
    <section class="flex w-full mx-auto lg:flex-row flex-col gap-5 py-4">
      <div class="lg:w-1/2 w-full rounded-lg min-h-full">
        <img v-if="userData?.image" :src="userData?.image" alt="group-image" class="rounded-lg min-h-96" />
        <img v-else src="~assets/img/sample.png" class="rounded-lg min-h-96" />
      </div>
      <Card :class="sectionClass()">
        <template #title>{{ userData.name }}</template>
        <template #content>
          <div class="flex flex-col gap-4">

          <AtomsIconLabel :icon="'basil:location-outline'">
            {{ userData?.location ?? '-' }}
          </AtomsIconLabel>
          <div class="flex gap-4 items-center justify-start">

            <AtomsIconLabel :icon="'material-symbols:group-outline'">
              {{ userData?.totalMembers ?? '-' }} members
            </AtomsIconLabel>
            <span>
              {{ userData?.isPublic ? 'Public' : 'Private' }} group
            </span>
          </div>
          <AtomsIconLabel :icon="'mdi:user-outline'">
            Organized by {{ user?.firstName ?? '-' }}
          </AtomsIconLabel>
        </div>
        </template>
      </Card>
    </section>
    <section class="mb-4">
      <NxGroupMembers :memberId="'test'" />
    </section>
      </template>
  </div>
</template>
