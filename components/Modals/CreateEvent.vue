<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, requiredIf } from "@vuelidate/validators";

const emit = defineEmits(["handleSubmit"]);
const props = defineProps({
  addEventModal: Boolean,
  closeEventModal: Function
});
const { addEventModal, closeEventModal } = toRefs(props);

const formData = reactive({
  location: "",
  group: ""
});

const rules = {
  location: {
    required: helpers.withMessage(ERROR_MESSAGE.LOCATION_REQ, required),
  },
};

const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    const { location } = formData;
    console.log("Api Call", location);
    const payload = {
      formData: {
        input: location,
      },
    };

    // login(payload);
  } else {
    console.log("Invalid Form NOT Submitted");
  }
};


</script>
<template>
  <AtomsCustomModal :openModal="addEventModal">
    <div class="flex flex-col gap-4 w-full">
      <h2 class="text-center font-bold text-xl">{{ STRING_DATA.CREATE_EVENT }}</h2>
      <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
        <AtomsBaseInput v-model="formData.location" :placeholder="'Enter your location'" :label="'Location'"
          :type="'text'" :errorMessage="v$?.location?.$error ? v$?.location?.$errors?.[0]?.$message : ''" />
        <AtomsBaseInput v-model="formData.group" :placeholder="'Enter your group'" :label="'Group'" :type="'text'" />
        <div class="flex items-center justify-end gap-4">
          <AtomsActionButton :isSubmit="true" :buttonLabel="STRING_DATA.ADD.toUpperCase()" />
          <AtomsActionButton :onclick="closeEventModal" :buttonLabel="STRING_DATA.CLOSE.toUpperCase()" />
        </div>
      </form>
    </div>
  </AtomsCustomModal>
</template>
