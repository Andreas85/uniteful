<script setup lang="ts">
interface Props {
  customClass?: string;
  label?: string;
  showSearchImage?: boolean;
}

const props = defineProps<Props>()
const { label, customClass, showSearchImage } = toRefs(props)

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
    <template v-if="!showSearchImage">
      {{ label ?? STRING_DATA.COMING_SOON }}
    </template>
    <template v-else>
      <img src="~/assets/img/search-image.png" class="lg:w-[30%] w-4/5">
    </template>
  </div>
</template>
