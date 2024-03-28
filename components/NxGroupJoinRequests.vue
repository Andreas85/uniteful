<script setup lang="ts">
import Card from 'primevue/card'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()
const confirm1 = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Save',
    accept: () => {
      console.log('accept')
      // toast.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    },
    reject: () => {
      console.log('reject')
      // toast.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }
  })
}

const removeRequest = () => {
  confirm1()
}
</script>

<template>
  <Card>
    <template #title>
      Join Requests
    </template>
    <template #content>
      <div class="grid lg:grid-cols-3 gap-4">
        <div
          v-for="(member, index) in DUMMY_DATA"
          :key="index"
          class="border p-2 shadow rounded-lg border-gray-400 flex items-center justify-between gap-4"
        >
          <AtomsMemberCard
            :member="{member: member}"
            :is-request-member-card="true"
            @reject-api="removeRequest"
            @approve-api="removeRequest"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
