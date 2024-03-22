<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

definePageMeta({
  middleware: ["auth"],
  // or middleware: 'auth'
});

useHead({
  title: `Login | ${STRING_DATA.BRAND_NAME}`,
});

const { sendSignInOtp } = useAuthService();
const { loading, showLoading, hideLoading } = useLoader()

const {showError, showSuccess} = useToastComposable()

const otpsendsuccess = ref(false);
const errorResponse = ref("");
const formData = reactive({
  email: "",
});

const rules = {
  email: {
    required: helpers.withMessage(ERROR_MESSAGE.EMAIL_REQ, required),
    email: helpers.withMessage(ERROR_MESSAGE.INVALID_EMAIL, email),
  },
};

const v$ = useVuelidate(rules, formData);
const submitForm = async () => {
  const result = await v$.value.$validate();

  if (result) {
    const { email } = formData;
    console.log("Api Call", email);
    const payload = {
      input: email,
    };
    signinService(payload);
  } else {
    console.log("Invalid Form NOT Submitted");
  }
};

const signinService = async (data: any) => {
  try {
    showLoading()
    const response = await sendSignInOtp(data)
    otpsendsuccess.value = true;
    showSuccess({detail: STRING_DATA.EMAIL_OTP_SUCCESS_MESSAGE})
    console.log(response)
  } catch (error) {
    otpsendsuccess.value = false;
    console.log(error)
    const message = handleQueryResponse(error)
    errorResponse.value = message
  } finally {
    hideLoading()
  }
}

const toggleOTPSucces = () => {
  otpsendsuccess.value = false;
};

</script>
<template>
  <div class="auth-section-class">
    <template v-if="!otpsendsuccess">
      <div class="flex flex-col items-start gap-6 w-full">
        <!-- <NxGoogleSignIn /> -->
        <h2 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
          {{ STRING_DATA.SIGN_IN_ACCOUNT }}
        </h2>
        <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
          <AtomsBaseInput v-model="formData.email" :placeholder="'Enter your email'" :label="'Email'" type="email"
            :errorMessage="v$?.email?.$error ? v$?.email?.$errors?.[0]?.$message : ''
      " />
          <span v-if="errorResponse" class="errorClass">{{
      errorResponse
    }}</span>
          <NxActionButton :isSubmit="true" :buttonLabel="STRING_DATA.LOGIN_USING_OTP.toUpperCase()"
            :is-loading="loading" />
          <p class="text-sm font-light text-gray-500 dark:text-gray-400">
            {{ STRING_DATA.NOT_REGISTERED }}
            <NuxtLink :to="ROUTE_CONSTANTS.SIGN_UP" class="custom-link-class">
              {{ STRING_DATA.CREATE_ACCOUNT }}
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
