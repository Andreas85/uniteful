<script setup lang="ts">
const route = useRoute();

const URL = `${ENDPOINTS.TODOS}/${route.params.slug}`
const { data: todo } = await getRequestUseFetch(URL)

</script>
<template>
  <div class="py-8">
    <TemplatesEventDetail :eventData="todo" />
  </div>
</template>