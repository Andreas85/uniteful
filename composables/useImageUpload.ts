export const useImageUpload = () => {
  const { $api } = useNuxtApp()

  const awsPreSignedURLUpload = async (imageFile: any) => {
    const apiUrl = ENDPOINTS.AWS_SIGNED_URL + '?fileName=' + imageFile.name
    const response = await $api(apiUrl, {
      method: 'GET'
    }) as any
    const signedUrl = response?.data
    const uploadedFileUrl = signedUrl?.split('?')[0]
    await $fetch(signedUrl, {
      method: 'PUT',
      body: imageFile
    })
    return uploadedFileUrl
  }

  return {
    awsPreSignedURLUpload
  }
}
