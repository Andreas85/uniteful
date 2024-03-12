<script setup lang="ts">
interface Props {
  openModal: boolean;
  isSmall?: boolean;
}
const props = defineProps<Props>();
const { openModal = false, isSmall } = toRefs(props);
</script>
<template>
  <div v-if="openModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg flex flex-col items-center justify-center gap-4 p-6 md:w-1/2 sm:w-4/5 w-11/12"
      :class="{ 'md:w-[472px]': isSmall }">
      <slot></slot>
    </div>
  </div>
</template>