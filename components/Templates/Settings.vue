<script setup lang="ts">
const userStore = useUserStore();

const { user } = storeToRefs(userStore);
const headingClass = () => ('md:col-span-4 col-span-full')
const valueClass = () => ('md:col-span-4 col-span-full')

</script>
<template>
  <div class="py-8">
    <div class="flex flex-col gap-4 lg:w-3/5 md:w-4/5 mx-auto">
      <h2 class="custom-h2-class underline">Profile</h2>
      <NxShowLabelValue :headingClass="headingClass()" :valueClass="valueClass()" :value="user.email"
        :heading="'Email'" />
      <NxShowLabelValue :headingClass="headingClass()" :valueClass="headingClass()" :value="user.firstName"
        :heading="'Firstname'" />
      <NxShowLabelValue :headingClass="headingClass()" :valueClass="headingClass()" :value="user.lastName"
        :heading="'Lastname'" />
    </div>
  </div>
</template>