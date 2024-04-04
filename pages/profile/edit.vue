<script setup lang="ts">
import Card from 'primevue/card'
import { useVuelidate } from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import Button from 'primevue/button'

definePageMeta({
  middleware: ['privateroute']
})

const { awsPreSignedURLUpload } = useImageUpload()
const { getProfileService } = useProfileService()
const { updateProfileService } = useProfileService()
const userStore = useUserStore()

const { user } = storeToRefs(userStore)
const toast = useToast()
const showImage = ref<boolean>(false)
const imageRef = ref<string>('')
const { loading: imageLoading, showLoading, hideLoading } = useLoader()
const { loading, showLoading: showLoadingProfile, hideLoading: hideLoadingProfile } = useLoader()

const formData = reactive({
  name: '',
  profileImage: ''
})

const rules = {
  name: {
    required: helpers.withMessage(ERROR_MESSAGE.NAME_REQ, required)
  }
}

const v$ = useVuelidate(rules, formData)

const toggleImageView = () => {
  showImage.value = !showImage.value
}

const imageUploadRequest = async (file: FileList[0]) => {
  try {
    showLoading()
    const res = await awsPreSignedURLUpload(file)
    formData.profileImage = res
    showImage.value = true
  } catch (error: any) {
    toast.add({
      severity: 'error',
      summary: 'Error Message',
      detail: error?.data,
      life: 5000
    })
  } finally {
    hideLoading()
  }
}

const handleUpload = (e: { fileUrl: any }) => {
  const { fileUrl } = e
  imageUploadRequest(fileUrl)
}

const fetchUserProfile = () => {
  getProfileService({
    success: (data) => {
      const newData = data?.data?.user
      userStore?.setUser(newData)
    }
  })
}

const updateProfileRequest = () => {
  showLoadingProfile()
  const { name, profileImage } = formData
  // console.log(name, profileImage, formData.name, formData.profileImage)
  updateProfileService({
    body: {
      profileImage,
      name
    },
    success: (data: any) => {
      hideLoadingProfile()
      navigateTo(ROUTE_CONSTANTS.PROFILE)
      fetchUserProfile()
    },
    fail: (data) => {
      hideLoadingProfile()
    }
  })
}

const handleProfileUpdate = () => {
  updateProfileRequest()
}

const submitForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    handleProfileUpdate()
  } else {
    console.log('Invalid Form NOT Submitted')
  }
}

watch(user, (newValue) => {
  if (newValue) {
    showImage.value = !!newValue?.profileImage
    imageRef.value = newValue?.profileImage ?? ''
    formData.profileImage = newValue?.profileImage ?? ''
    formData.name = newValue?.name
  }
}, { immediate: true })

</script>
<template>
  <div class="py-8">
    <div class="flex flex-col gap-4 lg:w-3/5 md:w-4/5 mx-auto">
      <div class="flex items-center justify-end">
        <Button :label="STRING_DATA.BACK.toUpperCase()" link @click="()=>navigateTo(ROUTE_CONSTANTS.PROFILE)" />
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
          <img v-if="showImage" class="profile-image-class" :src="formData.profileImage" alt="group-image">
          <template v-else>
            <div v-if="!imageLoading" class="flex flex-col gap-6">
              <nx-image-upload
                :file-name="`users/${user?._id}_profile.png`"
                :has-profile-image="true"
                @upload-event="handleUpload"
              />
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
            <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
              <AtomsBaseInput
                v-model="formData.name"
                :placeholder="'Enter your name'"
                :label="'Name'"
                type="text"
                :error-message="v$?.name?.$error ? v$?.name?.$errors?.[0]?.$message : ''
                "
              />
              <NxActionButton
                :is-loading="loading"
                :button-label="STRING_DATA.UPDATE.toUpperCase()"
                :is-submit="true"
              />
            </form>
          </div>
        </template>
      </Card>
    </div>
  </div>
</template>
