<script setup lang="ts">
import Card from 'primevue/card'

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: ''
  },
  date: {
    type: String,
    default: ''
  },
  item: { type: Object, default: () => { } }
})

const emit = defineEmits(['clicked'])
const { customClass, date, item, name, description, image } = toRefs(props)

const moveToDetail = () => {
  emit('clicked', { _id: item.value._id, data: item.value })
}

</script>
<template>
  <div class="group-card cursor-pointer" @click="moveToDetail">
    <Card>
      <template #header>
        <NxImageRenderer :image-url="image ?? ''" />
      </template>
      <template #title>
        <h2 class="custom-h2-class line-clamp-1 cursor-pointer">
          {{ name }}
        </h2>
      </template>
      <template #content>
        <div class="flex flex-col gap-4">
          <p class="flex-1 line-clamp-2">
            {{ formattedDateAndTime(date) }}
          </p>
        </div>
      </template>
    </Card>
  </div>
</template>
