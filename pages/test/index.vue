<script setup lang="ts">

const userData = ref<IUser>()
</script>

<template>
  <div>
    {{ userData?.title }}
  </div>
</template>
