<script setup lang="ts">
import pauseable from "pauseable";
const props = defineProps({
  email: String,
  otpsendsuccess: Boolean,
})

const emit = defineEmits(['change-email'])

const { signUsingOtp, sendSignInOtp } = useAuthService()
const { loading, showLoading, hideLoading } = useLoader()

const userStore = useUserStore();
const { setToken, setUser, setUserInCookies } = userStore;

const { token } = storeToRefs(userStore);
const { email } = toRefs(props)

const timePassed = ref(OTP_EXPIRED_TIME);

const timerInterval = pauseable.setInterval(1000, () => {
  updateTimer();
});

const updateTimer = () => {
  if (timePassed.value > 0) {
    timePassed.value -= 1;
  }

  if (timePassed.value === 0) {
    errorResponse.value = ERROR_MESSAGE.OTP_EXP;
  }
};

const otpCode = ref("");
const errorResponse = ref("");

const verifyOtpService = async (payload) => {
  try {
    showLoading()
    const response = await signUsingOtp(payload)
    const { token, user } = response.data
    setToken(token)
    setUserInCookies(user)
    await navigateTo(ROUTE_CONSTANTS.HOME)
    console.log(response)
  } catch (error) {
    const message = handleQueryResponse(error)
    errorResponse.value = message
  } finally {
    hideLoading()
  }
}

const handleOtpChange = (data: string) => {
  otpCode.value = data;
}

const signinService = async (data: any) => {
  try {
    const response = await sendSignInOtp(data)
  } catch (error) {
    console.log(error);
  }
}

const resentOtp = () => {
  const payload = {
    input: email.value,
  };
  signinService(payload)
}

const resetOtpData = () => {
  emit('change-email')
}

const signUsingOtpRequest = () => {
  if (otpCode.value) {
    const payload = {
      input: email.value,
      otp: otpCode.value
    }
    // console.log(payload)
    verifyOtpService(payload)
  }
}

</script>
<template>
  <div class="flex flex-col gap-6 w-full">
    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
      {{ STRING_DATA.VERIFY_EMAIL_MESSAGE }}
    </h1>
    <p>
      We have send an OTP on you email {{ email }}

      &nbsp;(<span class="custom-link-class" @click="resetOtpData">{{ STRING_DATA.CHANGE }}</span>)
    </p>
    <form class="w-full flex flex-col gap-6" @submit.prevent="signUsingOtpRequest">
      <div class="w-full flex items-center justify-center">
        <NxOtpInput :otpCode="otpCode" v-on:handle-on-change="handleOtpChange" />
      </div>
      <NxActionButton buttonLabel="VERIFY" :disabled="!otpCode" :isSubmit="true" :is-loading="loading" />
    </form>
    <span v-if="errorResponse" class="errorClass">{{
        errorResponse
      }}</span>
    <div class="flex justify-between">
      <span>
        {{ formatTimeForMinutes(timePassed) }}
      </span>
      <span class="custom-link-class" @click="resentOtp">
        Resend</span>
    </div>
  </div>
</template>
