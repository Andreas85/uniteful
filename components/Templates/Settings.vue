<script setup lang="ts">
import Card from 'primevue/card'
const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const headingClass = () => ('md:col-span-4 col-span-full')
const valueClass = () => ('md:col-span-8 col-span-full')
const showImage = ref<boolean>(false)
const imageRef = ref<string>('')
const { loading: imageLoading, showLoading, hideLoading } = useLoader()

const toggleImageView = () => {
  showImage.value = !showImage.value
}

const handleUpload = (e: { fileUrl: any }) => {
  const { fileUrl } = e
  console.log(fileUrl)
  // imageUploadRequest(fileUrl)
}

</script>
<template>
  <div class="py-8">
    <div class="flex flex-col gap-4 lg:w-3/5 md:w-4/5 mx-auto">
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
          <img v-if="showImage" :src="imageRef" alt="group-image">
          <template v-else>
            <div v-if="!imageLoading" class="flex flex-col gap-6">
              <nx-image-upload :file-name="`user/${user?._id}.png`" :has-profile-image="true" @upload-event="handleUpload" />
            </div>
            <div v-else class="flex items-center justify-center min-h-20">
              <AtomsLoading />
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
              :value="getUserName(user)"
              :heading="'Name'"
            />
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
