<script setup lang="ts">
const props = defineProps({
  customClass: {
    type: String, default: ''
  }
})
const { customClass } = toRefs(props)

const classes = computed(() => {
  if (customClass.value) {
    return customClass.value
  } else {
    return 'flex items-center justify-center min-h-[70vh]'
  }
})
</script>
<template>
  <div :class="classes">
    <AtomsLoading />
  </div>
</template>
