<script setup lang="ts">

import Breadcrumb from 'primevue/breadcrumb';
const home = ref({
    icon: 'pi pi-home',
    route: '/introduction'
});
const items = ref([
    { label: 'Components' },
    { label: 'Form' },
    { label: 'InputText', route: '/inputtext' }
]);

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

    <!-- <Breadcrumb :home="home" :model="breadcrumbs">
            <template #item="{ item, props }">
                <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                    <NuxtLink :to="href" v-bind="props.action" @click="navigate">
                        <span :class="[item.icon, 'text-color']" />
                        <span class="text-primary font-semibold">{{ item.label }}</span>
                    </NuxtLi>
                </router-link>
                <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                    <span class="text-color">{{ item.label }}</span>
                </a>
            </template>
        </Breadcrumb> -->
  </div>
</template>
