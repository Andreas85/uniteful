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
    return "w-4 h-4";
  }
});

</script>
<template>
  <svg @click="handleClick" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
    class="cursor-pointer stroke-current" :class="classes">
    <path fill="white" d="M4 21V9l8-6l8 6v12h-6v-7h-4v7z" stroke-width="2" />

  </svg>

</template>
