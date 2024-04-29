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
  showMutedText?: boolean;
  mutedText?: string;
}

const props = defineProps<Props>()
const { mutedText, showMutedText, label, id, type, modelValue, placeholder, disabled, errorMessage, showHint, isTextarea, min, max, rows } =
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
    <label class="flex items-center gap-1 mb-2 text-sm font-medium text-gray-900" :for="id">{{ label }}
      <div v-if="showHint" class="hint">
        (in hours)
      </div>
    </label>
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
    <span
      v-if="showMutedText"
      class="mutedClass {
"
    >{{ mutedText }}</span>
    <span v-if="errorMessage" class="errorClass">{{ errorMessage }}</span>
  </div>
</template>

<style scoped></style>
