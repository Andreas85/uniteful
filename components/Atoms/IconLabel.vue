<script setup lang="ts">

const props = defineProps({
  customClass: {
    type: String,
    default: ''
  },
  icon: String,
  iconSize: { type: String, default: '1.1rem' },
  iconColor: { type: String, default: '' }
})

const { icon, customClass, iconSize, iconColor } = toRefs(props)

const classes = computed(() => {
  if (customClass.value) {
    return customClass.value
  } else {
    return 'flex items-center gap-2 justify-start'
  }
})

</script>
<template>
  <div :class="classes">
    <template v-if="icon">
      <Icon :name="icon" :width="iconSize" :height="iconSize" :color="iconColor" />
    </template>
    <slot />
  </div>
</template>
