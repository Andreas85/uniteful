<script setup lang="ts">
const { $api } = useNuxtApp()
const todoRepo = todoService($api)
const { data: todos, refresh, pending, status } = await useAsyncData(() => todoRepo.get())


definePageMeta({
  middleware: ["privateroute"]
})

useHead({
  title: `Your Events | ${STRING_DATA.BRAND_NAME}`,
})

</script>
<template>
  <div class="py-8">
    <TemplatesEvents :eventData="todos.todos" />
  </div>
</template>
