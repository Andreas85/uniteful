<script setup lang="ts">

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
  __v: number;
}

const props = defineProps({
  customClass: {
    type: String,
    default: ""
  },
  item: { type: Object as IGroupData },
})

const emit = defineEmits(["clicked"])
// const { customClass, item } = toRefs(props)

const handleClick = () => {
  emit("clicked")
}

</script>
<template>
  <div class="flex flex-col gap-4 min-h-40">
    <h2 class="custom-h2-class line-clamp-2">
      {{ item.name }}
    </h2>
    <p class="flex-1 ">
      totalMembers :{{ item.totalMembers }}
    </p>
    <NuxtLink class="custom-link text-right" :to="ROUTE_CONSTANTS.GROUP_OWNER + '/' + item._id">Read more ..</NuxtLink>
  </div>
</template>
