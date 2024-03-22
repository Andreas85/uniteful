<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, requiredIf } from "@vuelidate/validators";
import Card from "primevue/card";
import Dropdown from "primevue/dropdown";
import AutoComplete from "primevue/autocomplete";
import Chip from "primevue/chip";

const props = defineProps({
  userData: Object,
  loading: Boolean,
});

const { awsPreSignedURLUpload } = useImageUpload();
const { userData, loading } = toRefs(props);
const userDataRef = ref(userData);
const { loading: imageLoading, showLoading, hideLoading } = useLoader();
const { fetchUserSearchervice } = useGroupsService();

const router = useRouter();
const emit = defineEmits(["handle-submit"]);
const route = useRoute();
const toast = useToast();
const newInstruction = ref("");
const value = ref("");
const items = ref([]); // for visibility type
const items_registration = ref([]);
const showImage = ref(!!userData.value?.image);

const visibilitiyUser = ref<string>("");
const registrationPolicyUser = ref<string>("");

const formData = reactive({
  groupName: userData.value?.name,
  groupDesc: userData.value?.description,
  image: userData.value?.image,
  groupValues: userData.value?.groupValues ?? [],
  visibility: userData.value?.visibility?.visibilityType ?? {},
  user_visibility: userData.value?.user_visibility ?? [],
  registrationPolicy: userData.value?.registrationPolicy ?? {},
  admissionPolicy: userData.value?.admissionPolicy ?? {},
  user_registration_policy: userData.value?.user_registration_policy ?? [],
});

const suggestedUsers = async (query) => {
  try {
    const payload = { searchString: query };
    const res = await fetchUserSearchervice(payload);
    console.log(res);
    return res;
  } catch (error) {
    console.log(error);
  }
};

const visiblityTypesearch = async (event) => {
  const userData = await suggestedUsers(event.query);
  if (userData.length) {
    console.log(userData);
    items.value = [
      ...userData.map((item) => ({
        id: item?._id,
        name: item.name,
        email: item.email,
      })),
    ];
  }
  // items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
};

const registrationTypeSearch = async (event) => {
  const userData = await suggestedUsers(event.query);
  if (userData.length) {
    console.log(userData);
    items_registration.value = [
      ...userData.map((item) => ({
        id: item?._id,
        name: item.name,
        email: item.email,
      })),
    ];
  }
  // items.value = [...Array(10).keys()].map((item) => event.query + '-' + item);
};

const back = () => {
  router.go(-1);
};

const toggleImageView = () => {
  showImage.value = !showImage.value;
};

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
    const {
      groupName,
      groupDesc,
      groupValues,
      visibility,
      user_visibility,
      user_registration_policy,
      admissionPolicy,
      registrationPolicy,
      image,
    } = formData;
    const payload = {
      name: groupName,
      description: groupDesc,
      image: image,
      groupValues: groupValues ?? [],
      visibility: {
        visibilityType: visibility.code,
        cherryPickedUsers: user_visibility.length
          ? user_visibility?.map((item) => (item.id))
          : [],
      },
      registrationPolicy: {
        policyType: registrationPolicy.code,
        cherryPickedUsers: user_registration_policy?.length
          ? user_registration_policy?.map((item) => (item.id))
          : [],
      },
      admissionPolicy: { policyType: admissionPolicy.code },
    };

    if (visibility.code !== VISIBILITY.CHERRY_PICKED) {
      delete payload.visibility.cherryPickedUsers;
    }

    if (!registrationPolicy.code) {
      delete payload.registrationPolicy;
    }

    if (!registrationPolicy.code) {
      delete payload.registrationPolicy.cherryPickedUsers;
    }

    if (!admissionPolicy.code) {
      delete payload.admissionPolicy;
    }

    console.log(toRaw(payload), "modalcompo", admissionPolicy);
    emit("handle-submit", payload);
  } else {
    console.log("Invalid Form NOT Submitted");
  }
};

const handleUpload = (e: IFileRef) => {
  const { fileUrl } = e;
  imageUploadRequest(fileUrl);
};

const imageUploadRequest = async (file: FileList[0]) => {
  try {
    showLoading();
    console.log(file.name, "cakked");
    const res = await awsPreSignedURLUpload(file);
    console.log(res, "-imageurl");
    formData.image = res;
    showImage.value = true;
  } catch (error) {
    console.log(error);
    toast.add({
      severity: "error",
      summary: "Error Message",
      detail: error?.data,
      life: 5000,
    });
  } finally {
    hideLoading();
  }
};

const handleItemSelect = (
  event: AutoCompleteItemSelectEvent,
  isRegistrationPolicyUser = false
) => {
  const { value: selectedData } = event;
  console.log(selectedData);
  // debugger
  if (isRegistrationPolicyUser) {
    const isPresent = formData.user_registration_policy.findIndex(
      (item) => ( item.id === selectedData.value )
    );
    if (isPresent === -1) {
      formData.user_registration_policy.push(selectedData);
    }
    registrationPolicyUser.value = "";
    return;
  }
  const isPresent = formData.user_visibility.findIndex(
    (item) => (item.id === selectedData.value)
  );
  // console.log(isPresent)
  if (isPresent === -1) {
    formData.user_visibility.push(selectedData);
  }
  visibilitiyUser.value = "";
};

const handleRemoveChips = (
  event: Event,
  id: string,
  isRegistrationPolicyUser = false
) => {
  if (isRegistrationPolicyUser) {
    const updatedData = formData.user_registration_policy.filter(
      (item) => item?.id !== id
    );
    formData.user_registration_policy = updatedData;
    return;
  }

  const updatedData = formData.user_visibility?.filter(
    (item) => item?.id !== id
  );
  formData.user_visibility = updatedData;
};
</script>
<template>
  <div class="flex flex-col gap-4 mx-auto lg:w-3/5 md:w-4/5">
    <AtomsBreadCrumb
      :hasId="true"
      :breadCrumbName="userData?.name"
      :breadCrumbLink="ROUTE_CONSTANTS.GROUP_OWNER + '/' + route.params.slug"
    />

    <!-- {{ JSON.stringify(formData.image) }} -->
    <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
      <Card>
        <template #title>
          <div class="flex items-center justify-between gap-4">
            <span> Picture </span>
            <NxActionButton
              v-if="formData.image"
              :buttonLabel="
                !showImage
                  ? STRING_DATA.CANCEL.toUpperCase()
                  : STRING_DATA.CHANGE.toUpperCase()
              "
              @click="toggleImageView"
            />
          </div>
        </template>
        <template #content>
          <img v-if="showImage" :src="formData.image" alt="group-image" />
          <template v-else>
            <div class="flex flex-col gap-6" v-if="!imageLoading">
              <nx-image-upload
                v-on:upload-event="handleUpload"
                :url="formData.image"
              />
            </div>
            <div v-else class="flex items-center justify-center min-h-20">
              <AtomsLoading />
            </div>
          </template>
        </template>
      </Card>
      <Card>
        <template #title>Basic Information</template>
        <template #content>
          <div class="flex flex-col gap-6">
            <AtomsBaseInput
              v-model="formData.groupName"
              :placeholder="'Enter your group name'"
              :label="'Group name'"
              :type="'text'"
              :errorMessage="
                v$?.groupName?.$error
                  ? v$?.grouName?.$errors?.[0]?.$message
                  : ''
              "
            />
            <AtomsBaseInput
              v-model="formData.groupDesc"
              :placeholder="'Enter your group description'"
              :label="'Description'"
              :type="'text'"
              :errorMessage="
                v$?.groupDesc?.$error
                  ? v$?.groupDesc?.$errors?.[0]?.$message
                  : ''
              "
              :isTextarea="true"
            />
          </div>
        </template>
      </Card>

      <Card>
        <template #title>Visibility</template>
        <template #content>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Type</label
              >
              <Dropdown
                v-model="formData.visibility"
                :options="VISIBILITY_TYPE"
                optionLabel="name"
                placeholder="Select visibility type"
                class="w-full md:w-14rem bg-gray-50 border border-brand-color text-gray-900 sm:text-sm hover:bg-gray-100"
              />
            </div>
            <!-- {{JSON.stringify(formData.user_visibility)}} -->
            <template
              v-if="formData.visibility.code === VISIBILITY.CHERRY_PICKED"
            >
              <div class="p-fluid flex flex-col gap-4">
                <label class="block mb-2 text-sm font-medium text-gray-900"
                  >Users</label
                >
                <AutoComplete
                  v-model="visibilitiyUser"
                  optionLabel="name"
                  :suggestions="items"
                  @complete="visiblityTypesearch"
                  inputClass="w-full px-2 py-1"
                  @item-select="handleItemSelect"
                  class="rounded-lg bg-gray-50 border border-brand-color text-gray-900 sm:text-sm hover:bg-gray-100"
                />
                <!-- {{ JSON.stringify(formData.user_visibility) }} -->
                <div
                  class="flex flex-wrap gap-2"
                  v-if="formData.user_visibility.length > 0"
                >
                  <!-- <Chip
                    :label="item.name || item.email"
                    v-for="(item, index) in formData.user_visibility"
                    removable
                    @remove="(e) => handleRemoveChips(e, item?.id)"
                  /> -->
                  <!-- :label="item.name || item.email" -->
                  <!-- removable -->
                  <div
                    v-for="(item, index) in formData.user_visibility"
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
        <template #title>Registration policy</template>
        <template #content>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block text-sm font-medium text-gray-900"
                >Policy type</label
              >
              <Dropdown
                v-model="formData.registrationPolicy"
                :options="REGISTRATION_POLICY"
                optionLabel="name"
                placeholder="Select registration policy"
                class="w-full md:w-14rem bg-gray-50 border border-brand-color text-gray-900 sm:text-sm hover:bg-gray-100"
              />
            </div>
            <template
              v-if="
                formData.registrationPolicy.code === VISIBILITY.CHERRY_PICKED
              "
            >
              <div class="p-fluid flex flex-col gap-4">
                <label class="block text-sm font-medium text-gray-900"
                  >Users</label
                >
                <AutoComplete
                  v-model="registrationPolicyUser"
                  optionLabel="name"
                  :suggestions="items_registration"
                  @complete="registrationTypeSearch"
                  @item-select="(e) => handleItemSelect(e, true)"
                  inputClass="w-full px-2 py-1"
                  class="rounded-lg bg-gray-50 border border-brand-color text-gray-900 sm:text-sm hover:bg-gray-100"
                />
                <div
                  class="flex flex-wrap gap-2"
                  v-if="formData.user_registration_policy?.length > 0"
                >
                  <!-- <Chip
                    :label="item.name || item.email"
                    v-for="(item, index) in formData.user_registration_policy"
                    removable
                    @remove="(e) => handleRemoveChips(e, item?.id, true)"
                  /> -->
                  <div
                    v-for="(item, index) in formData.user_registration_policy"
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
        <template #title>Group admission</template>
        <template #content>
          <div class="flex flex-col gap-6">
            <div>
              <label class="block mb-2 text-sm font-medium text-gray-900"
                >Policy type</label
              >
              <Dropdown
                v-model="formData.admissionPolicy"
                :options="GROUP_ADMISSION_POLICY"
                optionLabel="name"
                placeholder="Select group admission policy"
                class="w-full md:w-14rem bg-gray-50 border border-brand-color text-gray-900 sm:text-sm hover:bg-gray-100"
              />
            </div>
          </div>
        </template>
      </Card>

      <Card>
        <template #title>Add group values</template>
        <template #content>
          <div class="flex items-center justify-center gap-2">
            <input
              class="form-controls flex-1"
              v-model="newInstruction"
              placeholder="Add groupValues"
              type="text"
            />

            <div class="btn rounded-full" @click="handleAddInstruction">
              <Icon
                :name="'ic:outline-plus'"
                :width="'1.1rem'"
                :height="'1.1rem'"
              />
            </div>
          </div>
          <template v-if="formData.groupValues?.length">
            <ul class="flex flex-col items-start gap-2 my-2">
              <li
                class="w-full"
                v-for="(_, index) in formData.groupValues"
                :key="index"
              >
                <div class="flex items-center justify-center gap-2">
                  <input
                    class="form-controls flex-1"
                    v-model="formData.groupValues[index]"
                    placeholder="Add group values"
                    type="text"
                  />
                  <div
                    class="btn rounded-full"
                    @click="() => handleDeleteInstruction(index)"
                  >
                    <Icon
                      :name="'mdi:trash-outline'"
                      :width="'1.1rem'"
                      :height="'1.1rem'"
                    />
                  </div>
                </div>
              </li>
            </ul>
          </template>
        </template>
      </Card>

      <div class="flex items-center justify-end gap-4">
        <NxActionButton
          :isSubmit="true"
          :buttonLabel="STRING_DATA.UPDATE.toUpperCase()"
          :is-loading="loading"
        />
      </div>
    </form>
  </div>
</template>

<style scoped></style>
