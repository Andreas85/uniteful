<script setup lang="ts">

const props = defineProps({
  customClass: {
    type: String,
    default: ""
  }
})
const emit = defineEmits(["clicked"])
const { customClass } = toRefs(props)

const handleClick = () => {
  emit("clicked")
}
const classes = computed(() => {
  if (customClass.value) {
    return customClass.value;
  } else {
    return "w-4 h-4 stroke-current";
  }
});

</script>
<template>
  <svg @click="handleClick" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="cursor-pointer"
    :class="classes">
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
      d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
  </svg>

</template>
