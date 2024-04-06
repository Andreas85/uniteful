<script setup lang="ts">

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  },
  item: { type: Object }

})

const emit = defineEmits(['clicked'])
const { customClass, item } = toRefs(props)

const handleClick = () => {
  emit('clicked')
}

</script>
<template>
  <div class="flex flex-col gap-4 min-h-40">
    <h2 class="custom-h2-class line-clamp-2">
      {{ item?.todo }}
    </h2>
    <p class="flex-1" />
    <NuxtLink class="custom-link text-right" :to="ROUTE_CONSTANTS.EVENTS + '/' + item?._id">
      Read more ..
    </NuxtLink>
  </div>
</template>
