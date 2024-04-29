<!-- eslint-disable camelcase -->
<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { helpers, required, requiredIf } from '@vuelidate/validators'
import Card from 'primevue/card'
import Dropdown from 'primevue/dropdown'
import AutoComplete from 'primevue/autocomplete'
import Checkbox from 'primevue/checkbox'
import Calendar from 'primevue/calendar'

const props = defineProps({
  userData: Object,
  loading: Boolean
})

const { awsPreSignedURLUpload } = useImageUpload()
const { userData, loading } = toRefs(props)
const userDataRef = ref(userData)
const { loading: imageLoading, showLoading, hideLoading } = useLoader()
const { fetchUserSearchervice } = useGroupsService()

const router = useRouter()
const emit = defineEmits(['handle-submit'])
const route = useRoute()
const toast = useToast()
const newInstruction = ref('')
const value = ref('')
const items = ref<any>([]) // for visibility type
const itemsRegistration = ref<any>([])
const showImage = ref(!!userData?.value?.image)

const visibilitiyUser = ref<string>('')
const registrationPolicyUser = ref<string>('')

const formData = reactive({
  eventName: userData?.value?.name,
  eventDesc: userData?.value?.description,
  duration: userData?.value?.duration,
  image: userData?.value?.image,
  groupValues: userData?.value?.groupValues ?? [],
  visibility: userData?.value?.visibility?.visibilityType ?? {},
  user_visibility: userData?.value?.user_visibility ?? [],
  registrationPolicy: userData?.value?.registrationPolicy ?? {},
  admissionPolicy: userData?.value?.admissionPolicy ?? {},
  commitment: userData?.value?.commitment ?? {},
  user_registration_policy: userData?.value?.user_registration_policy ?? [],
  startDate: new Date(userData?.value?.startDate),
  group: !!userData?.value?.group
})

const suggestedUsers = async (query:string) => {
  try {
    const payload = { searchString: query }
    const res = await fetchUserSearchervice(payload)
    console.log(res)
    return res
  } catch (error) {
    console.log(error)
  }
}

const visiblityTypesearch = async (event:any) => {
  const userData = await suggestedUsers(event.query)
  if (userData.length) {
    console.log(userData)
    items.value = [
      ...userData.map((item: { _id: any; name: any; email: any }) => ({
        id: item?._id,
        name: item.name,
        email: item.email
      }))
    ]
  }
  // items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}

const registrationTypeSearch = async (event:any) => {
  const userData = await suggestedUsers(event.query)
  if (userData.length) {
    console.log(userData)
    itemsRegistration.value = [
      ...userData.map((item: { _id: any; name: any; email: any }) => ({
        id: item?._id,
        name: item.name,
        email: item.email
      }))
    ]
  }
  // items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}

const rules = {
  eventName: {
    required: helpers.withMessage(ERROR_MESSAGE.EVENT_NAME_REQ, required)
  }
}

const back = () => {
  router.go(-1)
}

const toggleImageView = () => {
  showImage.value = !showImage.value
}

const v$ = useVuelidate(rules, formData)
const submitForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    const {
      eventName,
      eventDesc,
      visibility,
      user_visibility,
      user_registration_policy,
      admissionPolicy,
      registrationPolicy,
      image, commitment, duration, startDate,
      group
    } = formData
    const payload = {
      name: eventName,
      description: eventDesc,
      duration,
      group: group ? userData?.value?.group : null,
      startDate: new Date(startDate).toISOString(),
      commitmentLevel: commitment?.code,
      image,
      visibility: {
        visibilityType: visibility.code,
        cherryPickedUsers: user_visibility.length
          ? user_visibility?.map((item: { id: any }) => (item.id))
          : []
      },
      registrationPolicy: registrationPolicy.code
        ? {
            policyType: registrationPolicy.code,
            cherryPickedUsers: user_registration_policy?.map((item: { id: any }) => item.id) || []
          }
        : undefined,
      admissionPolicy: admissionPolicy?.code
    }

    if (visibility.code !== VISIBILITY.CHERRY_PICKED) {
      delete payload.visibility.cherryPickedUsers
    }

    if (!registrationPolicy?.code) {
      delete payload.registrationPolicy
    }

    if (registrationPolicy?.code !== VISIBILITY.CHERRY_PICKED) {
      delete payload.registrationPolicy?.cherryPickedUsers
    }

    if (!admissionPolicy.code) {
      delete payload.admissionPolicy
    }

    // console.log(toRaw(payload), 'modalcompo', admissionPolicy)
    emit('handle-submit', payload)
  } else {
    console.log('Invalid Form NOT Submitted')
  }
}

const handleUpload = (e: { fileUrl: any }) => {
  const { fileUrl } = e
  imageUploadRequest(fileUrl)
}

const imageUploadRequest = async (file: FileList[0]) => {
  try {
    showLoading()
    console.log(file.name, 'cakked')
    const res = await awsPreSignedURLUpload(file)
    console.log(res, '-imageurl')
    formData.image = res
    showImage.value = true
  } catch (error: any) {
    console.log(error)
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

const handleItemSelect = (
  event: any,
  isRegistrationPolicyUser = false
) => {
  const { value: selectedData } = event
  console.log(selectedData)
  // debugger
  if (isRegistrationPolicyUser) {
    const isPresent = formData.user_registration_policy.findIndex(
      (item: { id: any }) => (item.id === selectedData.value)
    )
    if (isPresent === -1) {
      formData.user_registration_policy.push(selectedData)
    }
    registrationPolicyUser.value = ''
    return
  }
  const isPresent = formData.user_visibility.findIndex(
    (item: { id: any }) => (item.id === selectedData.value)
  )
  // console.log(isPresent)
  if (isPresent === -1) {
    formData.user_visibility.push(selectedData)
  }
  visibilitiyUser.value = ''
}

const handleRemoveChips = (
  event: Event,
  id: string,
  isRegistrationPolicyUser = false
) => {
  if (isRegistrationPolicyUser) {
    const updatedData = formData.user_registration_policy.filter(
      (item: { id: string }) => item?.id !== id
    )
    formData.user_registration_policy = updatedData
    return
  }

  const updatedData = formData.user_visibility?.filter(
    (item: { id: string }) => item?.id !== id
  )
  formData.user_visibility = updatedData
}

const handleCloseEdit = () => {
  navigateTo(ROUTE_CONSTANTS.EVENTS_OWNER + '/' + route.params.slug)
}

</script>
<template>
  <div class="flex flex-col gap-4 mx-auto lg:w-3/5 md:w-4/5">
    <AtomsBreadCrumb />

    <!-- {{ JSON.stringify(formData.image) }} -->
    <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
      <Card>
        <template #title>
          <div class="flex items-center justify-between gap-4">
            <span> Picture </span>
            <NxActionButton
              v-if="formData.image"
              :button-label="
                !showImage
                  ? STRING_DATA.CANCEL.toUpperCase()
                  : STRING_DATA.CHANGE.toUpperCase()
              "
              @click="toggleImageView"
            />
          </div>
        </template>
        <template #content>
          <img v-if="showImage" :src="formData.image" alt="group-image" class="aspect-video w-full object-contain">
          <template v-else>
            <div v-if="!imageLoading" class="flex flex-col gap-6">
              <nx-image-upload
                :url="formData.image"
                :file-name="`groups/${route.params.slug}.png`"
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
          Basic Information
        </template>
        <template #content>
          <div class="flex flex-col gap-6">
            <AtomsBaseInput
              v-model="formData.eventName"
              :placeholder="'Enter your event name'"
              :label="'Event name'"
              :type="'text'"
              :error-message="
                v$?.eventName?.$error
                  ? v$?.eventName?.$errors?.[0]?.$message
                  : ''
              "
            />

            <AtomsBaseInput
              v-model="formData.eventDesc"
              :placeholder="'Enter your event description'"
              :label="'Description'"
              :type="'text'"
              :error-message="
                v$?.eventDesc?.$error
                  ? v$?.eventDesc?.$errors?.[0]?.$message
                  : ''
              "
              :is-textarea="true"
            />
            <AtomsBaseInput
              v-model="formData.duration"
              :show-hint="true"
              :placeholder="'Enter duration name'"
              :label="'Event duration'"
              :type="'text'"
              :error-message="
                v$?.duration?.$error
                  ? v$?.duration?.$errors?.[0]?.$message
                  : ''
              "
            />

            <div class="p-fluid flex flex-col gap-4">
              <!-- {{ JSON.stringify(formData.startDate) }} -->
              <label class="block text-sm font-medium text-gray-900">Start date</label>
              <Calendar
                v-model="formData.startDate"
                show-time
                hour-format="12"
                :hide-on-date-time-select="true"
                :placeholder="'Enter start date'"
                class="dateTimeCustomClass"
              />
            </div>
          </div>
        </template>
      </Card>
      <!-- {{ JSON.stringify(formData.group) }} -->
      <div class="flex align-items-center">
        <Checkbox v-model="formData.group" input-id="specific-group" name="group" :binary="true" />
        <label for="specific-group" class="ms-2"> This event is for specific group</label>
      </div>
      <Card>
        <template #title>
          Visibility
        </template>
        <template #content>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">Type</label>
              <Dropdown
                v-model="formData.visibility"
                :options="VISIBILITY_TYPE_EVENT"
                option-label="name"
                placeholder="Select visibility type"
                class="dropdown-class"
              />
            </div>
            <template v-if="formData.visibility.code === VISIBILITY.CHERRY_PICKED">
              <div class="p-fluid flex flex-col gap-4">
                <label class="block mb-2 text-sm font-medium text-gray-900">Users</label>
                <AutoComplete
                  v-model="visibilitiyUser"
                  option-label="name"
                  :suggestions="items"
                  input-class="w-full px-2 py-1"
                  class="rounded-lg bg-gray-50 border border-brand-color text-gray-900 sm:text-sm hover:bg-gray-100"
                  @complete="visiblityTypesearch"
                  @item-select="handleItemSelect"
                />
                <div v-if="formData.user_visibility.length > 0" class="flex flex-wrap gap-2">
                  <div
                    v-for="(item, index) in formData.user_visibility"
                    :key="index"
                    class="flex items-center justify-start gap-2 bg-gray-200 rounded-full px-2 py-1"
                  >
                    <span>{{ item.name || item.email }}</span>

                    <Icon
                      :name="'charm:cross'"
                      :width="'1.1rem'"
                      class="cursor-pointer"
                      :height="'1.1rem'"
                      @click="(e) => handleRemoveChips(e, item?.id)"
                    />
                  </div>
                </div>
              </div>
            </template>

            <template v-if="formData.visibility.code === VISIBILITY.EVERYONE_IN_GROUP">
              <div class="p-fluid flex flex-col gap-4">
                <label class="block mb-2 text-sm font-medium text-gray-900">Groups</label>
                <!-- v-model="visibilitiyUser"
                :suggestions="items"
                @complete="visiblityTypesearch"
                @item-select="handleItemSelect" -->
                <AutoComplete
                  option-label="name"
                  input-class="w-full px-2 py-1"
                  class="rounded-lg bg-gray-50 border border-brand-color text-gray-900 sm:text-sm hover:bg-gray-100"
                />
                <div v-if="formData.user_visibility.length > 0" class="flex flex-wrap gap-2">
                  <div
                    v-for="(item, index) in formData.user_visibility"
                    :key="index"
                    class="flex items-center justify-start gap-2 bg-gray-200 rounded-full px-2 py-1"
                  >
                    <span>{{ item.name || item.email }}</span>

                    <Icon
                      :name="'charm:cross'"
                      :width="'1.1rem'"
                      class="cursor-pointer"
                      :height="'1.1rem'"
                      @click="(e) => handleRemoveChips(e, item?.id)"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </Card>

      <Card>
        <template #title>
          Registration policy
        </template>
        <template #content>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-900">Policy type</label>
              <Dropdown
                v-model="formData.registrationPolicy"
                :options="REGISTRATION_POLICY"
                option-label="name"
                placeholder="Select registration policy"
                class="dropdown-class"
              />
            </div>
            <template
              v-if="
                formData.registrationPolicy.code === VISIBILITY.CHERRY_PICKED
              "
            >
              <div class="p-fluid flex flex-col gap-4">
                <label class="block text-sm font-medium text-gray-900">Users</label>
                <AutoComplete
                  v-model="registrationPolicyUser"
                  option-label="name"
                  :suggestions="itemsRegistration"
                  input-class="w-full px-2 py-1"
                  class="rounded-lg bg-gray-50 border border-brand-color text-gray-900 sm:text-sm hover:bg-gray-100"
                  @complete="registrationTypeSearch"
                  @item-select="(e) => handleItemSelect(e, true)"
                />
                <div v-if="formData.user_registration_policy?.length > 0" class="flex flex-wrap gap-2">
                  <div
                    v-for="(item, index) in formData.user_registration_policy"
                    :key="index"
                    class="flex items-center justify-start gap-2 bg-gray-200 rounded-full px-2 py-1"
                  >
                    <span>{{ item.name || item.email }}</span>

                    <Icon
                      :name="'charm:cross'"
                      :width="'1.1rem'"
                      class="cursor-pointer"
                      :height="'1.1rem'"
                      @click="(e) => handleRemoveChips(e, item?.id)"
                    />
                  </div>
                </div>
              </div>
            </template>

            <template v-if="formData.registrationPolicy.code === VISIBILITY.EVERYONE_IN_GROUP">
              <div class="p-fluid flex flex-col gap-4">
                <label class="block mb-2 text-sm font-medium text-gray-900">Groups</label>
                <!-- v-model="visibilitiyUser"
                :suggestions="items"
                @complete="visiblityTypesearch"
                @item-select="handleItemSelect" -->
                <AutoComplete
                  option-label="name"
                  input-class="w-full px-2 py-1"
                  class="rounded-lg bg-gray-50 border border-brand-color text-gray-900 sm:text-sm hover:bg-gray-100"
                />
                <div v-if="formData.user_visibility.length > 0" class="flex flex-wrap gap-2">
                  <div
                    v-for="(item, index) in formData.user_visibility"
                    :key="index"
                    class="flex items-center justify-start gap-2 bg-gray-200 rounded-full px-2 py-1"
                  >
                    <span>{{ item.name || item.email }}</span>

                    <Icon
                      :name="'charm:cross'"
                      :width="'1.1rem'"
                      class="cursor-pointer"
                      :height="'1.1rem'"
                      @click="(e) => handleRemoveChips(e, item?.id)"
                    />
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </Card>

      <Card v-if="formData.group">
        <template #title>
          Admission policy
        </template>
        <template #content>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">Policy type</label>
              <Dropdown
                v-model="formData.admissionPolicy"
                :options="EVENT_ADMISSION_POLICY"
                option-label="name"
                placeholder="Select admission policy"
                class="dropdown-class"
              />
            </div>
          </div>
        </template>
      </Card>

      <Card v-if="formData.group">
        <template #title>
          Commitment
        </template>
        <template #content>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">Commitment type</label>
              <Dropdown
                v-model="formData.commitment"
                :options="COMMITMENT"
                option-label="name"
                placeholder="Select commitment policy"
                class="dropdown-class"
              />
            </div>
          </div>
        </template>
      </Card>

      <div class="flex items-center justify-end gap-4">
        <NxActionButton
          :is-action-button="false"
          :onclick="handleCloseEdit"
          :button-label="STRING_DATA.CLOSE.toUpperCase()"
        />
        <NxActionButton :is-submit="true" :button-label="STRING_DATA.UPDATE.toUpperCase()" :is-loading="loading" />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
