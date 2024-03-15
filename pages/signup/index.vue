<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import {
  required,
  email,
  maxLength,
  minLength,
  helpers,
} from "@vuelidate/validators";

definePageMeta({
  middleware: ["auth"]
})

useHead({
  title: `Signup | ${STRING_DATA.BRAND_NAME}`,
})

const { signUpService } = useAuthService();
const { loading, showLoading, hideLoading } = useLoader()
const errorResponse = ref("");

const otpsendsuccess = ref(false);
const formData = reactive({
  firstName: "",
  lastName: "",
  email: "",
});

const rules = {
  firstName: {
    required: helpers.withMessage(ERROR_MESSAGE.FIRST_NAME_REQ, required),
    minLength: helpers.withMessage(ERROR_MESSAGE.MIN_2, minLength(2)),
    maxLength: helpers.withMessage(ERROR_MESSAGE.MAX_PASS_30, maxLength(30)),
  },
  lastName: {
    required: helpers.withMessage(ERROR_MESSAGE.LAST_NAME_REQ, required),
    minLength: helpers.withMessage(ERROR_MESSAGE.MIN_2, minLength(2)),
    maxLength: helpers.withMessage(ERROR_MESSAGE.MAX_PASS_30, maxLength(30)),
  },
  email: {
    required: helpers.withMessage(ERROR_MESSAGE.EMAIL_REQ, required),
    email: helpers.withMessage(ERROR_MESSAGE.INVALID_EMAIL, email),
  },
};

const loginService = async (payload) => {
  try {
    showLoading()
    const response = await signUpService(payload)
    otpsendsuccess.value = true
  } catch (error) {
    otpsendsuccess.value = false
    const message = handleQueryResponse(error)
    errorResponse.value = message
  } finally {
    hideLoading()
  }
}

const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();
  console.log(result)
  if (result) {
    const { email, firstName, lastName } = formData;
    const payload = {
      email: email,
      firstName: firstName,
      lastName: lastName
    }

    loginService(payload);
  } else {
    console.log("Invalid Form NOT Submitted");
  }
};

const handleOtpChange = (e) => {
  console.log(e)
}

const toggleOTPSucces = () => {
  otpsendsuccess.value = false
}
</script>
<template>
  <div class="auth-section-class">
    <template v-if="!otpsendsuccess">
      <div class="flex flex-col items-start gap-6 w-full">
        <h2 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          {{ STRING_DATA.CREATE_ACCOUNT }}
        </h2>
        <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
          <AtomsBaseInput v-model="formData.firstName" :placeholder="'Enter your firstname'" :label="'Firstname'"
            type="text" :errorMessage="v$?.firstName?.$error ? v$?.firstName?.$errors?.[0]?.$message : ''
      " />
          <AtomsBaseInput v-model="formData.lastName" :placeholder="'Enter your lastname'" :label="'Lastname'"
            type="text" :errorMessage="v$?.lastName?.$error ? v$?.lastName?.$errors?.[0]?.$message : ''
      " />
          <AtomsBaseInput v-model="formData.email" :placeholder="'Enter your email'" :label="'Email'" type="email"
            :errorMessage="v$?.email?.$error ? v$?.email?.$errors?.[0]?.$message : ''
      " />
          <span v-if="errorResponse" class="errorClass">{{
      errorResponse
    }}</span>
          <NxActionButton :isSubmit="true" :buttonLabel="STRING_DATA.REGISTER.toUpperCase()" :is-loading="loading" />
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            {{ STRING_DATA.ALREADY_HAVE_ACCOUNT }}
            <NuxtLink :to="ROUTE_CONSTANTS.LOGIN" class="custom-link-class">
              {{ STRING_DATA.LOGIN }}
            </NuxtLink>
          </p>
        </form>
      </div>
    </template>
    <template v-else>
      <!-- OTP form -->
      <TemplatesNxVerifyOtp :email="formData.email" v-on:change-email="toggleOTPSucces" />
    </template>

  </div>
</template>
