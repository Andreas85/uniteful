<script setup lang="ts">

const props = defineProps<Props>({
  openModal: { type: Boolean, default: false },
  message: { type: String },
  closeModal: Function,
  isModalLoading: { type: Boolean, default: false }
});

const emit = defineEmits(["handle-submit"]);
const { openModal, message, closeModal, isModalLoading } = toRefs(props);

const handleClick = () => {
  emit("handle-submit");
};
</script>

<template>
  <div v-if="openModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
    <div class="bg-white rounded-lg flex flex-col gap-4 p-6 md:w-[50%] sm:w-[80%] w-[90%]">
      <p class="text-lg font-bold mb-4 text-center">
        {{ message }}
      </p>
      <div class="flex justify-end items-center gap-4">
        <NxActionButton :button-label="'Cancel'" :onclick="closeModal" />
        <NxActionButton :custom-class="'custom-button-danger'" :is-loading="isModalLoading" :button-label="'Delete'"
          :onclick="handleClick" />
      </div>
    </div>
  </div>
</template>