<script setup lang="ts">
import Card from "primevue/card";

const props = defineProps({
  memberId: String,
});

const { memberId } = toRefs(props);

watchEffect(() => {
  if (memberId.value) {
    console.log(`API call for memberId: ${memberId.value}`);
  }
});
</script>

<template>
  <Card>
    <template #title>All members</template>
    <template #content>
      <div class="grid lg:grid-cols-3 gap-4">
        <div
          v-for="(member, index) in DUMMY_DATA"
          :key="index"
          class="border p-2 shadow rounded-lg border-gray-400 flex items-center justify-start gap-4"
        >
          <div>
            <div class="avatar placeholder">
              <div class="bg-neutral text-neutral-content rounded-full w-16">
                <span class="text-xl">AI</span>
              </div>
            </div>
          </div>
          <div class="flex flex-col">
            <div>{{ member.name }}</div>
            <div>{{ member.createdAt }}</div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>