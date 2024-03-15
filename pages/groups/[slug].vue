<script setup lang="ts">
definePageMeta({
  middleware: ["privateroute"]
})
const route = useRoute();
const { $api } = useNuxtApp()
const userTodo = userService($api)
const { data: user, refresh, pending, status } = await useAsyncData(() => userTodo.getById({ id: route.params.slug }))

</script>
<template>
  <div class="py-8">
    <TemplatesGroupDetail :userData="user" />
  </div>
</template>