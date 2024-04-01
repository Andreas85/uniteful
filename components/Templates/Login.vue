<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { required, email, helpers } from '@vuelidate/validators'

const props = defineProps({
  isModal: {
    type: Boolean, default: false
  }
})

const emit = defineEmits(['show-sign-up'])
const { isModal } = toRefs(props)

const { sendSignInOtp } = useAuthService()
const { loading, showLoading, hideLoading } = useLoader()

const otpsendsuccess = ref(false)
const errorResponse = ref('')
const formData = reactive({
  email: ''
})

const rules = {
  email: {
    required: helpers.withMessage(ERROR_MESSAGE.EMAIL_REQ, required),
    email: helpers.withMessage(ERROR_MESSAGE.INVALID_EMAIL, email)
  }
}

const v$ = useVuelidate(rules, formData)
const submitForm = async () => {
  const result = await v$.value.$validate()

  if (result) {
    const { email } = formData
    console.log('Api Call', email)
    const payload = {
      input: email
    }
    signinService(payload)
  } else {
    console.log('Invalid Form NOT Submitted')
  }
}

const signinService = async (data: any) => {
  try {
    showLoading()
    const response = await sendSignInOtp(data)
    otpsendsuccess.value = true
    console.log(response)
  } catch (error) {
    otpsendsuccess.value = false
    console.log(error)
    const message = handleQueryResponse(error)
    errorResponse.value = message
  } finally {
    hideLoading()
  }
}

const toggleOTPSucces = () => {
  otpsendsuccess.value = false
}

const handleCreateClick = () => {
  if (isModal.value) {
    emit('show-sign-up')
  }
}

</script>
<template>
  <template v-if="!otpsendsuccess">
    <div class="flex flex-col items-start gap-6 w-full">
      <!-- <NxGoogleSignIn /> -->
      <h2 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        {{ STRING_DATA.SIGN_IN_ACCOUNT }}
      </h2>
      <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
        <AtomsBaseInput
          v-model="formData.email"
          :placeholder="'Enter your email'"
          :label="'Email'"
          type="email"
          :error-message="v$?.email?.$error ? v$?.email?.$errors?.[0]?.$message : ''
          "
        />
        <span v-if="errorResponse" class="errorClass">{{
          errorResponse
        }}</span>
        <NxActionButton
          :is-submit="true"
          :button-label="STRING_DATA.LOGIN_USING_OTP.toUpperCase()"
          :is-loading="loading"
        />
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          {{ STRING_DATA.NOT_REGISTERED }}
          <NuxtLink :to="isModal? '': ROUTE_CONSTANTS.SIGN_UP" class="custom-link-class" @click="handleCreateClick">
            {{ STRING_DATA.CREATE_ACCOUNT }}
          </NuxtLink>
        </p>
      </form>
    </div>
  </template>
  <template v-else>
    <!-- OTP form -->
    <TemplatesNxVerifyOtp :is-modal="isModal" :email="formData.email" @change-email="toggleOTPSucces" />
  </template>
</template>
