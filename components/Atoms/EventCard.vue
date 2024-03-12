<script setup lang="ts">

const props = defineProps({
  customClass: {
    type: String,
    default: ""
  },
  item: Object,

})

const emit = defineEmits(["clicked"])
const { customClass, item } = toRefs(props)

const handleClick = () => {
  emit("clicked")
}

</script>
<template>
  <div class="flex flex-col gap-4">
    {{ item.location }}
  </div>
</template>
