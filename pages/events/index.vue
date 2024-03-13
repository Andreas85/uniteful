<script setup lang="ts">
const { data: todos, refresh, pending, status } = await getRequestUseFetch(ENDPOINTS.TODOS)

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
