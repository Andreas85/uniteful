<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, requiredIf } from "@vuelidate/validators";
import Card from 'primevue/card';
import Dropdown from 'primevue/dropdown';
import AutoComplete from 'primevue/autocomplete';

const props = defineProps({
  userData: Object,
  loading: Boolean,
})

const { awsPreSignedURLUpload } = useImageUpload()
const { userData, loading } = toRefs(props)
const { loading: imageLoading, showLoading, hideLoading } = useLoader()

const router = useRouter();
const emit = defineEmits(["handle-submit"]);
const route = useRoute();
const toast = useToast();
const newInstruction = ref("");
const value = ref("");
const items = ref([]);

const search = (event) => {
  items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
}
const formData = reactive({
  groupName: userData.value?.name,
  groupDesc: userData.value?.desc,
  groupValues: userData.value?.groupValues ?? [],
  visibility: userData.value?.visibility ?? {},
  registration_policy: {},
  group_admission_policy: {}
})

const back = () => {
  router.go(-1)
}

const handleAddInstruction = () => {
  if (newInstruction.value) {
    formData.groupValues.push(newInstruction.value);
    newInstruction.value = "";
  }
};

const handleDeleteInstruction = (index: number) => {
  if (index >= 0 && index < formData.groupValues.length) {
    formData.groupValues.splice(index, 1);
  }
};
const rules = {
  groupName: {
    required: helpers.withMessage(ERROR_MESSAGE.GROUP_NAME_REQ, required),
  },
};


const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    const { groupName, groupDesc, groupValues, visibility } = formData;
    const payload = {
      formData: {
        name: groupName,
        desc: groupDesc,
        groupValues: groupValues,
        visibility: {
          visibilityType: visibility.code
        }
      },
    };

    // console.log(payload, "modalcompo");
    emit('handle-submit', payload)
  } else {
    console.log("Invalid Form NOT Submitted");
  }
};

const handleUpload = (e: IFileRef) => {
  const { fileUrl } = e
  imageUploadRequest(fileUrl)
}

const imageUploadRequest = async (file: FileList[0]) => {
  try {
    showLoading()
    console.log(file.name, "cakked")
    const res = await awsPreSignedURLUpload(file)
    // console.log(res)
  } catch (error) {
    toast.add({ severity: 'error', summary: 'Error Message', detail: error?.data, life: 5000 });
  } finally {
    hideLoading()
  }
}

</script>
<template>
  <div class="flex flex-col gap-4 mx-auto  lg:w-3/5 md:w-4/5">
    <AtomsBreadCrumb :hasId="true" :breadCrumbName="userData?.name"
      :breadCrumbLink="ROUTE_CONSTANTS.GROUP_OWNER + '/' + route.params.slug" />
    <Toast />
    <!-- {{ JSON.stringify(selectedCity) }} -->
    <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">

      <Card>
        <template #title>Picture</template>
        <template #content>
          <div class="flex flex-col gap-6" v-if="!imageLoading">
            <nx-image-upload v-on:upload-event="handleUpload" />
          </div>
          <div v-else class="flex items-center justify-center min-h-20">
            <AtomsLoading />
            <!-- <img v-if="fileRef.blobUrl" :src="fileRef.blobUrl" alt=""> -->
          </div>
        </template>
      </Card>
      <Card>
        <template #title>Basic Information</template>
        <template #content>
          <div class="flex flex-col gap-6">
            <AtomsBaseInput v-model="formData.groupName" :placeholder="'Enter your group name'" :label="'Group name'"
              :type="'text'" :errorMessage="v$?.groupName?.$error ? v$?.grouName?.$errors?.[0]?.$message : ''" />
            <AtomsBaseInput v-model="formData.groupDesc" :placeholder="'Enter your group description'"
              :label="'Description'" :type="'text'"
              :errorMessage="v$?.groupDesc?.$error ? v$?.groupDesc?.$errors?.[0]?.$message : ''" :isTextarea="true" />
          </div>
        </template>
      </Card>


      <Card>
        <template #title>Visibility</template>
        <template #content>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">Type</label>
              <Dropdown v-model="formData.visibility" :options="VISIBILITY_TYPE" optionLabel="name"
                placeholder="Select visibility type"
                class="w-full md:w-14rem bg-gray-50 border border-brand-color text-gray-900 sm:text-sm  hover:bg-gray-100" />
            </div>
            <template v-if="formData.visibility.code === VISIBILITY.CHERRY_PICKED">
              <div class="p-fluid">
                <label class="block mb-2 text-sm font-medium text-gray-900">Users</label>
                <AutoComplete v-model="value" multiple :suggestions="items" @complete="search"
                  inputClass="w-full px-2 py-1"
                  class="rounded-lg  bg-gray-50 border border-brand-color text-gray-900 sm:text-sm  hover:bg-gray-100" />
              </div>
            </template>
          </div>
        </template>
      </Card>

      <Card>
        <template #title>Policy</template>
        <template #content>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">Registration</label>
              <Dropdown v-model="formData.registration_policy" :options="REGISTRATION_POLICY" optionLabel="name"
                placeholder="Select registration policy"
                class="w-full md:w-14rem bg-gray-50 border border-brand-color text-gray-900 sm:text-sm  hover:bg-gray-100" />
            </div>

            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900">Group admission</label>
              <Dropdown v-model="formData.group_admission_policy" :options="GROUP_ADMISSION_POLICY" optionLabel="name"
                placeholder="Select group admission policy"
                class="w-full md:w-14rem bg-gray-50 border border-brand-color text-gray-900 sm:text-sm  hover:bg-gray-100" />
            </div>
          </div>
        </template>
      </Card>


      <Card>
        <template #title>Add group values</template>
        <template #content>

          <div class="flex items-center justify-center gap-2">
            <input class="form-controls flex-1" v-model="newInstruction" placeholder="Add groupValues" type="text" />

            <div class="btn rounded-full" @click="handleAddInstruction">
              <Icon :name="'ic:outline-plus'" :width="'1.1rem'" :height="'1.1rem'" />
            </div>
          </div>
          <template v-if="formData.groupValues?.length">
            <ul class="flex flex-col items-start gap-2 my-2">
              <li class="w-full" v-for="(_, index) in formData.groupValues" :key="index">
                <div class="flex items-center justify-center gap-2">
                  <input class="form-controls flex-1" v-model="formData.groupValues[index]"
                    placeholder="Add group values" type="text" />
                  <div class="btn rounded-full" @click="() => handleDeleteInstruction(index)">
                    <Icon :name="'mdi:trash-outline'" :width="'1.1rem'" :height="'1.1rem'" />
                  </div>
                </div>
              </li>
            </ul>
          </template>
        </template>
      </Card>

      <div class="flex items-center justify-end gap-4">
        <NxActionButton :isSubmit="true" :buttonLabel="STRING_DATA.UPDATE.toUpperCase()" :is-loading="loading" />
      </div>
    </form>
  </div>
</template>


<style scoped></style>