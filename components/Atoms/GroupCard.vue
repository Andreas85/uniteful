<script setup lang="ts">
import Card from 'primevue/card';
interface IGroupData {
  _id: string;
  deleted: boolean;
  name: string;
  totalMembers: number;
  isPublic: boolean;
  owner: string;
  groupValues: any[];
  createdAt: Date;
  updatedAt: Date;
  slug: string;
  newTEst: string;
  __v: number;
}
// import type { IGroupData } from "../../types.d.ts"
const props = defineProps({
  customClass: {
    type: String,
    default: ""
  },
  item: { type: Object as IGroupData },
})

const emit = defineEmits(["clicked"])
const { customClass, item } = toRefs(props)
const router = useRouter();
const handleClick = () => {
  emit("clicked")
}

const moveToDetail = () => {
  emit('clicked', item.value._id)
  const path = ROUTE_CONSTANTS.GROUP_OWNER + '/' + item.value._id

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
