<script setup lang="ts">
const route = useRoute()

</script>
<template>
  <div class="default-layout">
    <HocHeader />

    <div class="common-padding ">
      <slot />
    </div>
  </div>
</template>
