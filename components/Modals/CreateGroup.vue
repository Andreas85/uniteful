<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, requiredIf } from "@vuelidate/validators";

interface Props {
  addGroupModal?: boolean;
  closeGroupModal?: Function;
}

const emit = defineEmits(["handleSubmit"]);
const props = defineProps<Props>();
const { addGroupModal, closeGroupModal } = toRefs(props);

const formData = reactive({
  groupName: "",
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
    const { groupName } = formData;
    const payload = {
      formData: {
        input: groupName,
      },
    };

    // console.log(payload, "modalcompo");
    emit('handle-submit', payload)
  } else {
    console.log("Invalid Form NOT Submitted");
  }
};

</script>
<template>
  <AtomsCustomModal :openModal="addGroupModal">
    <div class="flex flex-col gap-4 w-full">
      <h2 class="text-center font-bold text-lg">{{ STRING_DATA.ADD_GROUP }}</h2>
      <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
        <AtomsBaseInput v-model="formData.groupName" :placeholder="'Enter your group name'" :label="'Group name'"
          :type="'text'" :errorMessage="v$?.groupName?.$error ? v$?.groupName?.$errors?.[0]?.$message : ''" />
        <div class="flex items-center justify-end gap-4">
          <AtomsActionButton :isSubmit="true" :buttonLabel="STRING_DATA.ADD.toUpperCase()" />
          <AtomsActionButton :onclick="closeGroupModal" :buttonLabel="STRING_DATA.CLOSE.toUpperCase()" />
        </div>
      </form>
    </div>
  </AtomsCustomModal>
</template>
