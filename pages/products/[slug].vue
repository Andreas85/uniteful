<script setup lang="ts">
const route = useRoute();

const URL = `${ENDPOINTS.TODOS}/${route.params.slug}`
const { data: todo } = await getRequestUseFetch(URL)

</script>
<template>
  <div class="w-4/5 mx-auto border shadow p-4">
    {{ todo?.title }}
  </div>
</template>