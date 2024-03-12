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

</script>
<template>
  <AtomsCustomModal :openModal="addGroupModal">
    <div class="flex flex-col gap-4 w-full">
      <h2 class="text-center font-bold text-lg">Add Group</h2>
      <AtomsActionButton :onclick="closeGroupModal" :buttonLabel="'Close'" />
    </div>
  </AtomsCustomModal>
</template>
