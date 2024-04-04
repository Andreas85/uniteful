export const useProfileService = () => {
  const { $api } = useNuxtApp()

  const updateProfileService = async (payload: {
    body: { name?: string; profileImage?: string };
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { body, success, fail } = payload
    try {
      const URL = ENDPOINTS.UPDATE_PROFILE
      const response = (await $api(URL, {
        method: 'PUT',
        body
      })) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const getProfileService = async (payload: {
      fail?: (error: any) => void;
      success?: (data: any) => void;
    }) => {
    const { success, fail } = payload
    try {
      const URL = ENDPOINTS.UPDATE_PROFILE
      const response = (await $api(URL, {
        method: 'GET'
      })) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  return {
    updateProfileService,
    getProfileService
  }
}
