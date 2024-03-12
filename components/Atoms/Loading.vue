<script setup lang="ts">
interface Props {
  isSmall?: boolean;
  hideLoading?: boolean;
}

const props = defineProps<Props>();
const { isSmall = false, hideLoading = false } = props;
</script>
<template>
  <span class="loading loading-spinner" :class="{ 'loading-xs': isSmall }"></span>
  <span v-if="!hideLoading"> &nbsp; Loading </span>
</template>