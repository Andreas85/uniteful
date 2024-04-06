<script setup lang="ts">
const props = defineProps({
  hasChildren: {
    type: Boolean,
    default: false
  },
  sizeClass: String,
  valueClass: String,
  heading: {
    type: String,
    required: true
  },
  headingClass: String,
  value: {
    type: [String, Number, Object, Array],
    default: null
  }
})

const { sizeClass, headingClass, heading, valueClass, hasChildren, value } = toRefs(props)
</script>
<template>
  <div :class="['grid', 'grid-cols-12', sizeClass]">
    <div :class="['font-bold', headingClass || 'lg:col-span-4', 'col-span-full']">
      {{ heading }}
    </div>
    <div :class="[valueClass || 'lg:col-span-8', 'col-span-full']">
      <slot v-if="hasChildren"></slot>
      <span v-else>{{ value }}</span>
    </div>
  </div>
</template>
