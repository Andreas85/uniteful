<script setup lang="ts">
import Card from 'primevue/card'
import Button from 'primevue/button'

const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const headingClass = () => ('md:col-span-4 col-span-full')
const valueClass = () => ('md:col-span-8 col-span-full')

const showImage = ref<boolean>(false)
const imageRef = ref<string>('')

const toggleImageView = () => {
  showImage.value = !showImage.value
}

</script>
<template>
  <div class="py-8">
    <!-- @click="handleProfileUpdate" -->
    <div class="flex flex-col gap-4 lg:w-3/5 md:w-4/5 mx-auto">
      <div class="flex items-center justify-end">
        <Button :label="STRING_DATA.EDIT_PROFILE.toUpperCase()" link @click="()=>navigateTo(ROUTE_CONSTANTS.PROFILE_EDIT)" />
      </div>
      <Card>
        <template #title>
          <div class="flex items-center justify-between gap-4">
            <span> Picture </span>
            <NxActionButton
              v-if="imageRef"
              :button-label="!showImage
                ? STRING_DATA.CANCEL.toUpperCase()
                : STRING_DATA.CHANGE.toUpperCase()
              "
              @click="toggleImageView"
            />
          </div>
        </template>
        <template #content>
          <img v-if="user?.profileImage" class="profile-image-class" :src="user?.profileImage" alt="group-image">
          <template v-else>
            <div class="cursor-pointer flex items-center justify-center">
              <NxAvatar :label="getInitials(user?.name)" :size="'xlarge'" />
            </div>
          </template>
        </template>
      </Card>
      <Card>
        <template #title>
          Profile
        </template>
        <template #content>
          <div class="flex flex-col gap-4">
            <NxShowLabelValue
              :heading-class="headingClass()"
              :value-class="valueClass()"
              :value="user?.email"
              :heading="'Email'"
            />
            <NxShowLabelValue
              :heading-class="headingClass()"
              :value-class="headingClass()"
              :value="user?.name"
              :heading="'Name'"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
