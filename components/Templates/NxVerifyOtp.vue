<script setup lang="ts">
import pauseable from 'pauseable'
const props = defineProps({
  email: { type: String, default: '' },
  otpsendsuccess: Boolean,
  isModal: { type: Boolean, default: false }
})

const emit = defineEmits(['change-email'])

const { signUsingOtp, sendSignInOtp } = useAuthService()
const { loading, showLoading, hideLoading } = useLoader()

const userStore = useUserStore()
const { setToken, setUser, setUserInCookies } = userStore
const { showError, showSuccess } = useToastComposable()

const { token } = storeToRefs(userStore)
const { email, isModal } = toRefs(props)

const timePassed = ref(OTP_EXPIRED_TIME)

const timerInterval = pauseable.setInterval(1000, () => {
  updateTimer()
})

const updateTimer = () => {
  if (timePassed.value > 0) {
    timePassed.value -= 1
  }

  if (timePassed.value === 0) {
    errorResponse.value = ERROR_MESSAGE.OTP_EXP
  }
}

const otpCode = ref('')
const errorResponse = ref('')

const verifyOtpService = async (payload: {input: string, otp: string}) => {
  try {
    showLoading()
    const response = await signUsingOtp(payload)
    const { token, user } = response.data
    setToken(token)
    setUserInCookies(user)
    console.log(response)
    if (isModal.value) {
      await refreshNuxtData(NUXT_ASYNC_DATA_KEY.HOME_PAGE_GROUP_DETAIL)
      return
    }
    await navigateTo(ROUTE_CONSTANTS.HOME)
  } catch (error) {
    const message = handleQueryResponse(error)
    errorResponse.value = message
  } finally {
    hideLoading()
  }
}

const handleOtpChange = (data: string) => {
  otpCode.value = data
}

const signinService = async (data: any) => {
  try {
    const response = await sendSignInOtp(data)
    showSuccess({ detail: 'OTP resend successfully' })
    timePassed.value = OTP_EXPIRED_TIME
    errorResponse.value = ''
  } catch (error) {
    const message = handleQueryResponse(error)
    console.log(error)
    errorResponse.value = message
  }
}

const resentOtp = () => {
  const payload = {
    input: email.value
  }
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
        <NxOtpInput :otp-code="otpCode" @handle-on-change="handleOtpChange" />
      </div>
      <NxActionButton button-label="VERIFY" :disabled="!otpCode" :is-submit="true" :is-loading="loading" />
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
