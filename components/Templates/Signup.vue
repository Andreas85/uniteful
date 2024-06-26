<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import {
  required,
  email,
  maxLength,
  minLength,
  helpers
} from '@vuelidate/validators'

const props = defineProps({
  isModal: {
    type: Boolean, default: false
  }
})

const emit = defineEmits(['show-login'])
const { isModal } = toRefs(props)

const { signUpService } = useAuthService()
const { loading, showLoading, hideLoading } = useLoader()
const { showError, showSuccess } = useToastComposable()
const errorResponse = ref('')
const otpsendsuccess = ref(false)
const formData = reactive({
  firstName: '',
  lastName: '',
  email: ''
})

const rules = {
  firstName: {
    required: helpers.withMessage(ERROR_MESSAGE.FIRST_NAME_REQ, required),
    minLength: helpers.withMessage(ERROR_MESSAGE.MIN_2, minLength(2)),
    maxLength: helpers.withMessage(ERROR_MESSAGE.MAX_PASS_30, maxLength(30))
  },
  lastName: {
    required: helpers.withMessage(ERROR_MESSAGE.LAST_NAME_REQ, required),
    minLength: helpers.withMessage(ERROR_MESSAGE.MIN_2, minLength(2)),
    maxLength: helpers.withMessage(ERROR_MESSAGE.MAX_PASS_30, maxLength(30))
  },
  email: {
    required: helpers.withMessage(ERROR_MESSAGE.EMAIL_REQ, required),
    email: helpers.withMessage(ERROR_MESSAGE.INVALID_EMAIL, email)
  }
}

const signupRequest = async (payload: {
  email: string;
  // firstName: firstName,
  // lastName: lastName
  name: string;
}) => {
  try {
    showLoading()
    const response = await signUpService(payload)
    showSuccess({ detail: STRING_DATA.EMAIL_OTP_SUCCESS_MESSAGE })
    otpsendsuccess.value = true
  } catch (error) {
    otpsendsuccess.value = false
    console.log(error)
    const message = handleQueryResponse(error)
    errorResponse.value = message
  } finally {
    hideLoading()
  }
}

const v$ = useVuelidate(rules, formData)
const submitForm = async () => {
  const result = await v$.value.$validate()
  console.log(result)
  if (result) {
    const { email, firstName, lastName } = formData
    const payload = {
      email,
      name: `${firstName} ${lastName}`
    }

    signupRequest(payload)
  } else {
    console.log('Invalid Form NOT Submitted')
  }
}

const handleOtpChange = (e: any) => {
  console.log(e)
}

const toggleOTPSucces = () => {
  otpsendsuccess.value = false
}

const handleCreateClick = () => {
  if (isModal.value) {
    emit('show-login')
  }
}

</script>
<template>
  <template v-if="!otpsendsuccess">
    <div class="flex flex-col items-start gap-6 w-full">
      <h2 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        {{ STRING_DATA.CREATE_ACCOUNT }}
      </h2>
      <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
        <AtomsBaseInput
          v-model="formData.firstName"
          :placeholder="'Enter your first name'"
          :label="'First name'"
          type="text"
          :error-message="v$?.firstName?.$error ? v$?.firstName?.$errors?.[0]?.$message : ''
          "
        />
        <AtomsBaseInput
          v-model="formData.lastName"
          :placeholder="'Enter your last name'"
          :label="'Last name'"
          type="text"
          :error-message="v$?.lastName?.$error ? v$?.lastName?.$errors?.[0]?.$message : ''
          "
        />
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
        <NxActionButton :is-submit="true" :button-label="STRING_DATA.REGISTER.toUpperCase()" :is-loading="loading" />
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          {{ STRING_DATA.ALREADY_HAVE_ACCOUNT }}
          <NuxtLink :to="isModal? '': ROUTE_CONSTANTS.LOGIN" class="custom-link-class" @click="handleCreateClick">
            {{ STRING_DATA.LOGIN }}
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
