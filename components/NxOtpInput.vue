<script setup lang="ts">

import InputOtp from 'primevue/inputotp'

const props = defineProps({
  otpCode: { type: String, default: '' }
})

const emit = defineEmits(['handleOnChange'])
const { otpCode } = toRefs(props)

const handleChangePrime = (event:any) => {
  const { value } = event
  emit('handleOnChange', value)
}

</script>
<template>
  <div class="custom-otp-class" style="display: flex; flex-direction: row">
    <InputOtp v-model="otpCode" @change="handleChangePrime" />
  </div>
</template>

<style>
.p-inputotp .p-inputtext {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}

.otp-input {
  width: 40px;
  height: 40px;
  padding: 5px;
  margin: 0 10px;
  font-size: 20px;
  border-radius: 4px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  text-align: center;
}

.otp-input.is-complete {
  background-color: #e4e4e4;
}

.otp-input::-webkit-inner-spin-button,
.otp-input::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
