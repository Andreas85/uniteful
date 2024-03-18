<script setup lang="ts">

const props = defineProps({
  totalCount: Number,
})

const { totalCount } = toRefs(props)
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
    <button class="join-item btn">Page {{ totalCount ?? "22" }}</button>
    <button class="join-item btn" @click="handleNext">»</button>
  </div>
</template>
