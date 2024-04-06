<script setup lang="ts">

const props = defineProps({
  imageUrl: { type: String, default: '' }

})

const lgPlaceholderImage = 'https://placehold.co/1920x1080?text=Uniteful'

const { imageUrl } = toRefs(props)

const isImageLoaded = ref<boolean>(false)
const imageSizePlaceholderRef = ref(lgPlaceholderImage)

const imageClass = () => ('rounded-t-lg ')
const handleLoading = () => {
  isImageLoaded.value = true
}

</script>

<template>
  <ClientOnly fallback-tag="span">
    <!-- this component will only be rendered on client side -->
    <template v-if="imageUrl">
      <span v-show="isImageLoaded">
        <img :src="imageUrl" alt="group-image" @load="handleLoading">
      </span>
      <span v-show="!isImageLoaded">
        <img :src="imageSizePlaceholderRef" @load="handleLoading">
      </span>
    </template>
    <template v-else>
      <img :src="imageSizePlaceholderRef" @load="handleLoading">
    </template>
    <template #fallback>
      <!-- this will be rendered on server side -->
      <img :src="imageSizePlaceholderRef" @load="handleLoading">
    </template>
  </ClientOnly>
</template>
