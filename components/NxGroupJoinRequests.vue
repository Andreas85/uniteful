<script setup lang="ts">
import Card from 'primevue/card'
import { useConfirm } from 'primevue/useconfirm'
const confirm = useConfirm()

const items = ref([
  {
    items: [
      {
        label: 'Accept',
        icon: 'pi pi-check',
        command: () => {
          approveRequest()
        }
      },
      {
        label: 'Reject',
        icon: 'pi pi-times',
        command: () => {
          rejectRequest()
        }
      }
    ]
  }
])

const confirmReject = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Reject',
    accept: () => {
      console.log('accept')
    },
    reject: () => {
      console.log('reject')
    }
  })
}

const confirmApprove = () => {
  confirm.require({
    message: 'Are you sure you want to proceed?',
    header: 'Confirmation',
    icon: 'pi pi-exclamation-triangle',
    rejectClass: 'p-button-secondary p-button-outlined',
    rejectLabel: 'Cancel',
    acceptLabel: 'Approve',
    accept: () => {
      console.log('accept')
    },
    reject: () => {
      console.log('reject')
    }
  })
}

const rejectRequest = () => {
  confirmReject()
}

const approveRequest = () => {
  confirmApprove()
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
            :menu-items="items"
          />
        </div>
      </div>
    </template>
  </Card>
</template>
