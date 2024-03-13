<script setup lang="ts">
import { defineProps, toRefs, defineEmits } from 'vue';

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

const props = defineProps<Props>();
const { label, id, type, modelValue, placeholder, disabled, errorMessage, showHint, isTextarea, min, max, rows } =
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
  <div class="w-full">
    <label class="block mb-2 text-sm font-medium text-gray-900" :for="id">{{ label }}</label>
    <textarea v-if="isTextarea" :class="errorMessage ? 'form-controls-error' : 'form-controls'" :id="id"
      :rows="rows ?? '5'" :value="modelValue" :placeholder="placeholder" :disabled="disabled"
      @input="handleInput"></textarea>
    <input v-else :class="errorMessage ? 'form-controls-error' : 'form-controls'" :id="id" :type="type"
      :value="modelValue" :placeholder="placeholder" :disabled="disabled" @input="handleInput" :min="min" :max="max" />
    <div v-if="showHint" class="hint">(in seconds)</div>
    <span v-if="errorMessage" class="errorClass">{{ errorMessage }}</span>
  </div>
</template>

<style scoped></style>
