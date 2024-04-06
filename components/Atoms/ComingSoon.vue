<script setup lang="ts">
interface Props {
  label?: string;
  showSearchImage?: boolean;
}

const props = defineProps<Props>()
const { label, showSearchImage } = toRefs(props)

</script>
<template>
  <div class="flex items-center justify-center min-h-[70vh]">
    <template v-if="!showSearchImage">
      {{ label ?? STRING_DATA.COMING_SOON }}
    </template>
    <template v-else>
      <img src="~/assets/img/search-image.png" class="lg:w-[30%] w-4/5">
    </template>
  </div>
</template>
