<script setup lang="ts">
import { useVuelidate } from "@vuelidate/core";
import { required, email, helpers } from "@vuelidate/validators";

definePageMeta({
  middleware: ["auth"]
  // or middleware: 'auth'
})

useHead({
  title: `Login | ${STRING_DATA.BRAND_NAME}`,
})

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
      formData: {
        input: email,
      },
    };

    // login(payload);
  } else {
    console.log("Invalid Form NOT Submitted");
  }
};

const userStore = useUserStore()
const { token } = storeToRefs(userStore)
const { signin, logout } = userStore

const setCookie = async () => {
  const payload = {
    username: 'kminchelle',
    password: '0lelplR',
  }
  await signin(payload)
  await navigateTo(ROUTE_CONSTANTS.HOME)
}

</script>
<template>
  <div class="auth-section-class">
    <div class="flex flex-col items-start gap-6 w-full">

      <h2 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
        {{ STRING_DATA.SIGN_IN_ACCOUNT }}
      </h2>
      <form class="w-full flex flex-col gap-6" @submit.prevent="submitForm">
        <AtomsBaseInput v-model="formData.email" :placeholder="'Enter your email'" :label="'Email'" type="email"
          :errorMessage="v$?.email?.$error ? v$?.email?.$errors?.[0]?.$message : ''
          " />
        <AtomsActionButton :isSubmit="true" :buttonLabel="STRING_DATA.LOGIN_USING_OTP.toUpperCase()" />
        <div class="link link-primary" @click="setCookie">Login as Guest</div>
        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
          {{ STRING_DATA.NOT_REGISTERED }}
          <NuxtLink :to="ROUTE_CONSTANTS.SIGN_UP" class="custom-link-class">
            {{ STRING_DATA.CREATE_ACCOUNT }}
          </NuxtLink>
        </p>
      </form>
    </div>

  </div>
</template>
