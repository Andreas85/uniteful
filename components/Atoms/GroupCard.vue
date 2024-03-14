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
  <div class="flex flex-col gap-4 min-h-40">
    <h2 class="custom-h2-class line-clamp-2">
      {{ item.address.address }}
    </h2>
    <p class="flex-1 line-clamp-4">
      {{ item.userAgent }}
    </p>
    <NuxtLink class="custom-link text-right" :to="ROUTE_CONSTANTS.GROUPS + '/' + item.id">Read more ..</NuxtLink>
  </div>
</template>
