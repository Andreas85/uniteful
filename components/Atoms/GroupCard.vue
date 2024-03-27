<script setup lang="ts">
import Card from 'primevue/card'

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  },
  item: { type: Object as IGroup }
})

const emit = defineEmits(['clicked'])
const { customClass, item } = toRefs(props)
const router = useRouter()
const handleClick = () => {
  emit('clicked')
}

const moveToDetail = () => {
  emit('clicked', { _id: item.value._id, data: item.value })
}

</script>
<template>
  <Card>
    <template #title>
      <h2 class="custom-h2-class line-clamp-2 cursor-pointer" @click="moveToDetail">
        {{ item.name }}
      </h2>
    </template>
    <template #content>
      <div class="flex flex-col gap-4 min-h-40">
        <p class="flex-1 ">
          totalMembers :{{ item.totalMembers }}
        </p>
      </div>
    </template>
  </Card>
</template>
