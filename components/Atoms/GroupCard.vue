<script setup lang="ts">
import Card from 'primevue/card'

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  },
  item: { type: Object, default: () => {} }
})

const emit = defineEmits(['clicked'])
const { customClass, item } = toRefs(props)

const moveToDetail = () => {
  emit('clicked', { _id: item.value._id, data: item.value })
}

</script>
<template>
  <div class="group-card cursor-pointer" @click="moveToDetail">
    <Card>
      <template #header>
        <NxImageRenderer :image-url="item?.image ?? ''" />
      </template>
      <template #title>
        <h2 class="custom-h2-class line-clamp-1 cursor-pointer">
          {{ item.name }}
        </h2>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <p class="flex-1 ">
            totalMembers :{{ item.totalMembers }}
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>
