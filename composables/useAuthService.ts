export const useAuthService = () => {
  const { $api } = useNuxtApp()

  const signUpService = async (data: any) => {
    const response = await $api(ENDPOINTS.SIGN_UP, {
      method: 'POST',
      body: data
    })
    return response
  }

  const signUsingOtp = async (data: any) => {
    const response = await $api(ENDPOINTS.SIGN_OTP, {
      method: 'POST',
      body: data
    })
    return response
  }

  const sendSignInOtp = async (data: any) => {
    const response = await $api(ENDPOINTS.SEND_SIGNIN_OTP, {
      method: 'POST',
      body: data
    })
    return response
  }

  return {
    sendSignInOtp,
    signUpService,
    signUsingOtp
  }
}
