<script setup lang="ts">

interface Props {
  open?: boolean;
}

const props = defineProps<Props>()
const { open } = toRefs(props)

</script>

<template>
  <div>
    <button v-tippy content="Hello!">Hover me</button>
  </div>
</template>
<!-- <template>
  <div class="tooltip tooltip-bottom" :class="{ 'tooltip-open': open }">
    <template>
      <slot name="button"></slot>
    </template>
    <template v-if="open">
      <div class="tooltip">
        <div
          class="tooltip-content bg-gray-700 text-white p-2 rounded-md shadow-md absolute left-1/2 transform -translate-x-1/2 bottom-full">
          <slot name="content">{{ text }}</slot>
        </div>
      </div>
    </template>
  </div>
</template> -->


<!-- <template>
  <div x-data="{ open: false }" @mouseenter="open = true" @mouseleave="open = false">
    <template x-if="open">
      <div class="tooltip">
        <slot name="button"></slot>
        <div
          class="tooltip-content bg-gray-700 text-white p-2 rounded-md shadow-md absolute left-1/2 transform -translate-x-1/2 bottom-full">
          <slot name="content">{{ text }}</slot>
        </div>
      </div>
    </template>
    <template x-if="!open">
      <slot name="button"></slot>
    </template>
  </div>
</template> -->
