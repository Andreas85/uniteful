<script setup lang="ts">

const isModal = ref(true)
const show = ref({ login: true, signup: false })

const showSignup = () => {
  show.value = { login: false, signup: true }
}

const showLogin = () => {
  show.value = { login: true, signup: false }
}

</script>

<template>
  <template v-if="show.login">
    <TemplatesLogin :is-modal="isModal" @show-sign-up="showSignup" />
  </template>
  <template v-else>
    <TemplatesSignup :is-modal="isModal" @show-login="showLogin" />
  </template>
</template>
