<script setup lang="ts">

definePageMeta({
  middleware: ["privateroute"]
})

const { fetchGroupDetailService } = useGroupsService()
const route = useRoute();
const { $api } = useNuxtApp()
const userTodo = userService($api)
const { data: user, refresh, pending, status } = await useAsyncData(() => fetchGroupDetailService({ id: route.params.slug }))

</script>
<template>
  <template v-if="pending">
      <NxLoadingPage />
    </template>
    <template v-else>
      <!-- <div class="pt-8"> -->
        <TemplatesGroupDetail :userData="user" />
      <!-- </div> -->
    </template>
</template>