<script setup lang="ts">
interface Props {
  modelValue?: string;
  id?: string;
  customClass?: string;
  placeholder?: string;
  disabled?: boolean;
}

const props = defineProps<Props>();
const { id, modelValue, placeholder, disabled } =
  toRefs(props);
const emit = defineEmits<{
  (event: "update:modelValue", value: any): void;
}>();

function handleInput(event: any) {
  const target = event.target;
  emit("update:modelValue", target.value);
}
</script>
<template>
  <div class="relative">
    <SVGSearchSvg :customClass="'absolute left-2 bottom-[0.6rem] h-[1.2rem] w-[1.2rem] mr-2'" />

    <input class="search-form-controls" :id="id" type="type" :value="modelValue" :placeholder="placeholder"
      :disabled="disabled" @input="handleInput" />
  </div>
</template>
