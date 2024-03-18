<script setup lang="ts">
definePageMeta({
  middleware: ["privateroute"]
})
const { fetchGroupOwnershipDetailService } = useGroupsService()
const route = useRoute();
const { $api } = useNuxtApp()
const userTodo = userService($api)
const { data: user, refresh, pending, status } = await useAsyncData(() => fetchGroupOwnershipDetailService({ id: route.params.slug }))

</script>
<template>
  <div class="py-8">
    {{ JSON.stringify(user) }}
    <!-- <TemplatesGroupDetail :userData="user" /> -->
  </div>
</template>