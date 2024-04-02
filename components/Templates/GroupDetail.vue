<!-- eslint-disable vue/valid-v-show -->
<script setup lang="ts">
import Card from 'primevue/card'
import { useResizeObserver } from '@vueuse/core'

const lgPlaceholderImage = 'https://placehold.co/1920x1080?text=United'
const mdPlaceholderImage = 'https://placehold.co/600x400?text=United'

const groupStore = useGroupStore()
const { groupData } = storeToRefs(groupStore)
const route = useRoute()
const isUserOwnerRoute = ref(false)
const isImageLoaded = ref<boolean>(false)

const sectionClass = () => ('lg:w-1/2 w-full h-full')
const imageClass = () => ('rounded-lg min-h-96 aspect-video')

const imageSizePlaceholderRef = ref(lgPlaceholderImage)
const navigateToEdit = () => {
  const path = `${ROUTE_CONSTANTS.GROUP_OWNER}/${route.params.slug?.toString()}/edit`
  navigateTo(path)
}

const handleLoading = () => {
  isImageLoaded.value = true
}

watch(route, (newValue) => {
  if (newValue) {
    const isOwnerIncludedInRoute = newValue?.fullPath?.split('/')?.includes('owner')
    isUserOwnerRoute.value = isOwnerIncludedInRoute
  }
}, { immediate: true })

const el = ref(null)
const text = ref('')

useResizeObserver(el, (entries) => {
  const entry = entries[0]
  const { width, height } = entry.contentRect
  text.value = `width: ${width}, height: ${height}`
  if (width <= 992) {
    imageSizePlaceholderRef.value = lgPlaceholderImage
  } else {
    imageSizePlaceholderRef.value = mdPlaceholderImage
  }
})

</script>
<template>
  <div class="flex flex-col gap-4 pt-8 mb-4">
    <AtomsBreadCrumb v-if="groupData?.name" />
    <div v-if="groupData?.isOwner" class="flex justify-end items-center ">
      <NxActionButton :button-label="STRING_DATA.EDIT.toUpperCase()" :onclick="navigateToEdit" />
    </div>
    <section ref="el" class="flex w-full mx-auto lg:flex-row flex-col gap-5 py-4">
      <div class="lg:w-1/2 w-full rounded-lg min-h-full">
        <ClientOnly fallback-tag="span">
          <!-- this component will only be rendered on client side -->
          <template v-if="groupData?.image">
            <span v-show="isImageLoaded">
              <img :src="groupData?.image" alt="group-image" :class="imageClass()" @load="handleLoading">
            </span>
            <span v-show="!isImageLoaded">
              <img :src="imageSizePlaceholderRef" @load="handleLoading">
            </span>
          </template>
          <template v-else>
            <img :src="imageSizePlaceholderRef" @load="handleLoading">
          </template>
          <template #fallback>
            <!-- this will be rendered on server side -->
            <img :src="imageSizePlaceholderRef" @load="handleLoading">
          </template>
        </ClientOnly>
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
      <NxGroupJoinRequests v-if="isUserOwnerRoute && (groupData?.isOwner || groupData?.isModerator)" />
    </section>
  </div>
</template>
