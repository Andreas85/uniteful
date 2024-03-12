<script setup lang="ts">
const { data: todos, refresh, pending, status } = await getRequestUseFetch(ENDPOINTS.TODOS)
const nuxtApp = useNuxtApp();

const todoStore = useTodosStore()
const { setTodosData } = todoStore
const userStore = useUserStore()
const { token } = storeToRefs(userStore)
const { signin, logout } = userStore

const AddStore = () => {
  setTodosData(todos.value)
}

const setCookie = async () => {
  const payload = {
    username: 'kminchelle',
    password: '0lelplR',
  }
  await signin(payload)
}

if (todos.value) {
  setTodosData(todos.value)
}

</script>
<template>
  <div class="w-4/5 mx-auto border shadow p-4">
    <div class="flex flex-col gap-4">

      <button class="btn btn-secondary btn-sm" @click="AddStore()">Add to Store</button>
      <button v-if="!token" class="btn btn-secondary btn-sm" @click="setCookie()">User token cookie</button>
      <button v-else class="btn btn-secondary btn-sm" @click="logout()">LOGOUT</button>
    </div>
    <TemplatesProducts />
  </div>
</template>