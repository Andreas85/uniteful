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
      d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
    </path>
  </svg>

</template>
