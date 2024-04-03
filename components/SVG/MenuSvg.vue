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
    class="cursor-pointer"
    xmlns="http://www.w3.org/2000/svg"
    :class="classes"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    @click="handleClick"
  >
    <path d="M3 12h18M3 6h18M3 18h18" />
  </svg>
</template>
