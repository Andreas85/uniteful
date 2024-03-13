<script setup lang="ts">

const props = defineProps({
  hasId: { type: Boolean, default: false },
  breadCrumbName: {
    type: String, default: ""
  }
})

const { hasId, breadCrumbName } = toRefs(props)
const route = useRoute();
const breadcrumbs = computed(() => useBreadcrumbs(route));

watchEffect(() => {
  if (hasId.value && breadcrumbs.value.length > 0) {
    breadcrumbs.value.pop();
  }
});

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
        {{ breadCrumbName }}
      </li>
    </ul>
  </div>
</template>
