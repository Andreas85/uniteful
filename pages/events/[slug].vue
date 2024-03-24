<script setup lang="ts">
definePageMeta({
  middleware: ['privateroute']
})
const route = useRoute()
const { $api } = useNuxtApp()
const todoRepo = todoService($api)
const { data: todo, refresh, pending, status } = await useAsyncData(() => todoRepo.getById({ id: route.params.slug }))

</script>
<template>
  <div class="py-8">
    <TemplatesEventDetail :event-data="todo ?? {}" />
  </div>
</template>
