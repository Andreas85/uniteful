<script setup lang="ts">

interface Props {
  label: string;
  modelValue?: string;
  id?: string;
  customClass?: string;
  type: string;
  placeholder?: string;
  disabled?: boolean;
  errorMessage?: any;
  showHint?: boolean;
  isTextarea?: boolean;
  min?: string;
  max?: string;
  rows?: string;
}

const props = defineProps<Props>()
const { label, id, type, modelValue, placeholder, disabled, errorMessage, showHint, isTextarea, min, max, rows } =
  toRefs(props)
const emit = defineEmits<{
  (event: 'update:modelValue', value: any): void;
}>()

function handleInput (event: any) {
  const target = event.target
  emit('update:modelValue', target.value)
}
</script>

<template>
  <div class="w-full">
    <label class="block mb-2 text-sm font-medium text-gray-900" :for="id">{{ label }}</label>
    <textarea
      v-if="isTextarea"
      :id="id"
      :class="errorMessage ? 'form-controls-error' : 'form-controls'"
      :rows="rows ?? '5'"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
    />
    <input
      v-else
      :id="id"
      :class="errorMessage ? 'form-controls-error' : 'form-controls'"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :min="min"
      :max="max"
      @input="handleInput"
    >
    <div v-if="showHint" class="hint">
      (in hours)
    </div>
    <span v-if="errorMessage" class="errorClass">{{ errorMessage }}</span>
  </div>
</template>

<style scoped></style>
