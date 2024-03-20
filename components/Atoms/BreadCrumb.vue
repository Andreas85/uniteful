<script setup lang="ts">

const props = defineProps({
  hasId: { type: Boolean, default: false },
  breadCrumbName: {
    type: String, default: ""
  },
  breadCrumbLink: String,
})

const { hasId, breadCrumbName, breadCrumbLink } = toRefs(props)
const route = useRoute();
const breadcrumbs = computed(() => useBreadcrumbs(route));

</script>
<template>
  <div class="text-lg breadcrumbs">
    <ul>
      <li>
        <NuxtLink :to="ROUTE_CONSTANTS.HOME" class="gap-2">
          <SVGHomeSvg :customClass="'w-5 h-5'" />
        </NuxtLink>
      </li>
      <li v-for="(route, index) in breadcrumbs" key="index">
        <NuxtLink :to="route.path" class="gap-2">
          {{ route.label }}
        </NuxtLink>
      </li>
      <li v-if="hasId && breadCrumbName">
        <template v-if="breadCrumbLink">
          <NuxtLink :to="breadCrumbLink" class="gap-2">
            {{ breadCrumbName }}
          </NuxtLink>
        </template>
        <template v-else>
          {{ breadCrumbName }}
        </template>
      </li>
    </ul>
  </div>
</template>
