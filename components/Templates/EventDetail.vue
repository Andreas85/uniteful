<script setup lang="ts">
import Card from 'primevue/card'
const { openModal, showModal, closeModal } = useModal()

const route = useRoute()
const eventStore = useEventStore()
const { eventData } = storeToRefs(eventStore)

const sectionClass = () => ('lg:w-1/2 w-full h-full')
const imageClass = () => ('rounded-lg min-h-96 aspect-video')

const lgPlaceholderImage = 'https://placehold.co/1920x1080?text=Uniteful'
const mdPlaceholderImage = 'https://placehold.co/600x400?text=Uniteful'
const imageSizePlaceholderRef = ref(lgPlaceholderImage)
const isImageLoaded = ref<boolean>(false)

const navigateToEdit = () => {
  const path = `${ROUTE_CONSTANTS.EVENTS_OWNER}/${route.params.slug?.toString()}/edit`
  navigateTo(path)
}

const handleLoading = () => {
  isImageLoaded.value = true
}

</script>
<template>
  <NxConfirmationModal
    v-if="openModal"
    :open-modal="openModal"
    :message="MESSAGES.DELETE_EVENT"
    :close-modal="closeModal"
  />
  <div class="flex flex-col gap-4 pt-8 mb-4">
    <AtomsBreadCrumb v-if="eventData?.name" />
    <div v-if="eventData?.isOwner" class="flex justify-end items-center ">
      <NxActionButton :button-label="STRING_DATA.EDIT.toUpperCase()" :onclick="navigateToEdit" />
    </div>
    <section ref="el" class="flex w-full mx-auto lg:flex-row flex-col gap-5 py-4">
      <div class="lg:w-1/2 w-full rounded-lg min-h-full">
        <ClientOnly fallback-tag="span">
          <!-- this component will only be rendered on client side -->
          <template v-if="eventData?.image">
            <span v-show="isImageLoaded">
              <img :src="eventData?.image" alt="group-image" :class="imageClass()" @load="handleLoading">
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
          {{ eventData?.name }}
        </template>
        <template #content>
          <NxEventRightSection />
        </template>
      </Card>
    </section>
    <section v-if="eventData?.isOwner">
      <NxPolicySection :data="eventData" />
    </section>
    <section v-if="eventData?.isOwner">
      <NxEventMembers :event-id="eventData?._id" />
    </section>
  </div>
</template>
