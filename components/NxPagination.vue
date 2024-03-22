<script setup lang="ts">

const props = defineProps({
  totalCount: String,
  currentPage: String,
})

const { totalCount, currentPage } = toRefs(props)
const emit = defineEmits(["prev", "next"])

const handleNext = () => {
  emit("next")
}

const handlePrev = () => {
  emit("prev")
}

</script>
<template>
  <div class="join flex items-center justify-center mb-4">
    <button class="join-item btn" @click="handlePrev">«</button>
    <button class="join-item btn">Page {{ currentPage ?? "22" }}</button>
    <button class="join-item btn" @click="handleNext">»</button>
  </div>
</template>
