<template>
  <div />
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['privateroute']
})
navigateTo(ROUTE_CONSTANTS.GROUP_OWNER)
</script>
