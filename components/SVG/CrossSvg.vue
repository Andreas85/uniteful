<script setup lang="ts">

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['clicked'])
const { customClass } = toRefs(props)

const handleClick = () => {
  emit('clicked')
}
const classes = computed(() => {
  if (customClass.value) {
    return customClass.value
  } else {
    return 'w-6 h-6'
  }
})

</script>
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="cursor-pointer"
    :class="classes"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    @click="handleClick"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
  </svg>
</template>
