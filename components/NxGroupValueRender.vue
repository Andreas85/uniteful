<script setup lang="ts">
import Card from 'primevue/card'
import { useGroupStore } from '~/stores/group'
const groupStore = useGroupStore()
const { groupData } = storeToRefs(groupStore)
</script>

<template>
  <Card>
    <template #title>
      {{ STRING_DATA.GROUP_VALUES }}
    </template>
    <template #content>
      <ul v-if="groupData?.groupValues && (groupData?.groupValues?.length > 0)" class="list-disc">
        <li v-for="(item, index) in groupData?.groupValues" :key="index" class="ms-4">
          {{ item }}
        </li>
      </ul>
      <AtomsComingSoon
        v-else
        :custom-class="'flex items-center justify-center h-20'"
        :label="'Group values not found'"
      />
    </template>
  </Card>
</template>
