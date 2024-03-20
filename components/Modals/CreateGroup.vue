<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, requiredIf } from "@vuelidate/validators";

interface Props {
  addGroupModal?: boolean;
  closeGroupModal?: Function;
  loading?: boolean,
  errorResponse?: string;
}

const emit = defineEmits(["handle-submit"]);
const props = defineProps<Props>();
const { loading, addGroupModal, closeGroupModal, errorResponse } = toRefs(props);
const { awsPreSignedURLUpload } = useImageUpload();
const fileRef = ref("");

const newInstruction = ref("");
const formData = reactive({
  groupName: "",
  groupDesc: "",
});

const rules = {
  groupName: {
    required: helpers.withMessage(ERROR_MESSAGE.GROUP_NAME_REQ, required),
  },
};

const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    const { groupName, groupDesc } = formData;
    const payload = {
      formData: {
        name: groupName,
        desc: groupDesc,
      },
    };

    // console.log(payload, "modalcompo");
    emit('handle-submit', payload)
  } else {
    console.log("Invalid Form NOT Submitted");
  }
};


const handleChange = async (e) => {
  try {
    const payload = e.target.files[0]

    console.log(payload.name, payload)
    await awsPreSignedURLUpload(payload)
  } catch (error) {
    console.log(error.data)
  }
}

</script>
<template>
  <AtomsCustomModal :openModal="addGroupModal">
    <div class="flex flex-col gap-4 w-full">
      <h2 class="text-center font-bold text-lg">{{ STRING_DATA.ADD_GROUP }}</h2>


      <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
        <AtomsBaseInput v-model="formData.groupName" :placeholder="'Enter your group name'" :label="'Group name'"
          :type="'text'" :errorMessage="v$?.groupName?.$error ? v$?.groupName?.$errors?.[0]?.$message : ''" />
        <AtomsBaseInput v-model="formData.groupDesc" :placeholder="'Enter your group description'"
          :label="'Description'" :type="'text'"
          :errorMessage="v$?.groupDesc?.$error ? v$?.groupDesc?.$errors?.[0]?.$message : ''" :isTextarea="true" />
        <span v-if="errorResponse" class="errorClass">{{
    errorResponse
  }}</span>
        <div class="flex items-center justify-end gap-4">
          <NxActionButton :isSubmit="true" :buttonLabel="STRING_DATA.ADD.toUpperCase()" :is-loading="loading" />
          <NxActionButton :onclick="closeGroupModal" :buttonLabel="STRING_DATA.CLOSE.toUpperCase()" />
        </div>
      </form>
    </div>
  </AtomsCustomModal>
</template>