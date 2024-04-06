<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { helpers, required, requiredIf } from "@vuelidate/validators";

const emit = defineEmits(["handle-submit"]);
const props = defineProps({
  addEventModal: Boolean,
  closeEventModal: Function
});
const { addEventModal, closeEventModal } = toRefs(props);

const formData = reactive({
  eventName: "",
  location: "",
  group: "",
  startDate: "",
  endDate: "",
});

const rules = {
  eventName: {
    required: helpers.withMessage(ERROR_MESSAGE.EVENT_REQ, required),
  },
  location: {
    required: helpers.withMessage(ERROR_MESSAGE.LOCATION_REQ, required),
  },
};

const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    const { eventName, location, group, startDate, endDate } = formData;
    console.log("Api Call", location);
    const payload = {
      formData: {
        name: eventName, location, group, startDate: getISODate(startDate), endDate: getISODate(endDate)
      },
    };
    // console.log(payload, "modalcompo");
    emit('handle-submit', payload)
  } else {
    console.log("Invalid Form NOT Submitted");
  }
};

const handleInput = (field: any) => {
  formData[field] = "";
};

</script>
<template>
  <AtomsCustomModal :openModal="addEventModal">
    <div class="flex flex-col gap-4 w-full">
      <h2 class="text-center font-bold text-xl">{{ STRING_DATA.CREATE_EVENT }}</h2>
      <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
        <AtomsBaseInput v-model="formData.eventName" :placeholder="'Enter your event name'" :label="'Event name'"
          :type="'text'" :errorMessage="v$?.eventName?.$error ? v$?.eventName?.$errors?.[0]?.$message : ''" />
        <AtomsBaseInput v-model="formData.location" :placeholder="'Enter your location'" :label="'Location'"
          :type="'text'" :errorMessage="v$?.location?.$error ? v$?.location?.$errors?.[0]?.$message : ''" />
        <AtomsBaseInput v-model="formData.group" :placeholder="'Enter your group'" :label="'Group'" :type="'text'" />
        <AtomsBaseInput v-model="formData.startDate" :label="'Start date'" :type="'date'" :min="getTodayDate()"
          @input="handleInput('endDate')" />
        <AtomsBaseInput v-model="formData.endDate" :label="'End date'" :type="'date'" :min="formData.startDate" />
        <div class="flex items-center justify-end gap-4" :min="getTodayDate()">
          <NxActionButton :isSubmit="true" :buttonLabel="STRING_DATA.ADD.toUpperCase()" />
          <NxActionButton :onclick="closeEventModal" :buttonLabel="STRING_DATA.CLOSE.toUpperCase()" />
        </div>
      </form>
    </div>
  </AtomsCustomModal>
</template>
