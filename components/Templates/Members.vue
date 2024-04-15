<script setup lang="ts">
import Card from 'primevue/card'

const props = defineProps({
  users: Array,
  heading: String,
  buttonLabel: String
})

const route = useRoute()
const emit = defineEmits(['card-click'])
const { users, heading } = toRefs(props)

const handleCardClicked = (props: { _id: string, data: IGroup }) => {
  emit('card-click', props)
}

</script>
<template>
  <div class=" flex flex-col gap-4">
    <AtomsBreadCrumb v-if="route.path !== ROUTE_CONSTANTS.HOME" />

    <div class="flex items-center justify-between">
      <h2 class="custom-h2-class">
        {{ heading }}
      </h2>
    </div>
    <template v-if="users?.length">
      <div class="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
        <div v-for="( item, index ) in users " :key="index">
          <div class="group-card cursor-pointer">
            <Card>
              <template #header>
                <NxImageRenderer :image-url="item?.image ?? ''" />
              </template>
              <template #title>
                <h2 class="custom-h2-class line-clamp-1 cursor-pointer">
                  {{ item?.group?.name }}
                </h2>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <AtomsComingSoon :show-search-image="true" />
    </template>
  </div>
</template>
