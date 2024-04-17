<script setup lang="ts">
import { toRefs } from 'vue'

const props = defineProps({
  foo: String,
  buttonLabel: String,
  disabled: Boolean,
  isSubmit: Boolean,
  isLoading: Boolean,
  customClass: String,
  icon: String,
  onclick: Function,
  isActionButton: {
    type: Boolean,
    default: true
  },
  isDeleteButton: {
    type: Boolean,
    default: false
  }
})

const {
  buttonLabel,
  isLoading,
  disabled,
  isSubmit,
  customClass,
  isActionButton,
  isDeleteButton
} = toRefs(props)

// Access the callbackProp from props
const handleClick = () => {
  // Call the callback function when the button is clicked
  if (props.onclick) {
    props.onclick()
  }
}

const buttonClasses = computed(() => {
  if (props.isDeleteButton) {
    return 'custom-action-button-class bg-red-600 hover:bg-red-400 text-white'
  } else if (props.isActionButton) {
    return 'custom-action-button-class bg-action-btn text-white'
  } else {
    return 'custom-action-button-class btn-active'
  }
})
</script>

<template>
  <button
    :type="isSubmit ? 'submit' : 'button'"
    :disabled="disabled || isLoading"
    class="btn min-w-24"
    :class="[customClass ? customClass : buttonClasses, disabled ? 'custom-btn-disabled' : '']"
    @click="handleClick"
  >
    <span class="flex items-center gap-2 justify-between">
      <template v-if="icon">
        <Icon :name="icon" width="1.1rem" height="1.1rem" />
      </template>
      <template v-if="isLoading">
        <AtomsLoading />
      </template>
      <template v-else>
        {{ buttonLabel }}
      </template>
    </span>
  </button>
</template>
