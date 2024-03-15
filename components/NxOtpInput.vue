<script setup lang="ts">

import VOtpInput from "vue3-otp-input";
const props = defineProps({
  otpCode: String
});

const emit = defineEmits(["handleOnChange"]);
const { otpCode } = toRefs(props);

const otpInput = ref<any>(null);

const handleOnComplete = (value: string) => {
  console.log("OTP completed: ", value);
};

const handleOnChange = (value: string) => {
  emit("handleOnChange", value);
};

</script>
<template>
  <div class="custom-otp-class" style="display: flex; flex-direction: row">
    <v-otp-input input-classes="otp-input" ref="otpInput" v-model:value="otpCode" separator="-" :num-inputs="4"
      :should-auto-focus="true" input-type="letter-numeric" :placeholder="['*', '*', '*', '*']"
      @on-change="handleOnChange" :conditionalClass="['one', 'two', 'three', 'four']" @on-complete="handleOnComplete" />
  </div>
</template>

<style>
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