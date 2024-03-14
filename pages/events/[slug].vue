<script setup lang="ts">
const route = useRoute();
const { $api } = useNuxtApp()
const todoRepo = todoService($api)
const { data: todo, refresh, pending, status } = await useAsyncData(() => todoRepo.getById({ id: route.params.slug }))

</script>
<template>
  <div class="py-8">
    <TemplatesEventDetail :eventData="todo" />
  </div>
</template>