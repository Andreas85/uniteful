export const useImageUpload = () => {
  const { $api } = useNuxtApp();

  const awsPreSignedURLUpload = async (imageFile) => {
    const apiUrl = ENDPOINTS.AWS_SIGNED_URL + "?fileName=" + imageFile.name;
    const response = await $api(apiUrl, {
      method: "GET",
    });
    const signedUrl = response?.data;
    const uploadedFileUrl = signedUrl?.split("?")[0];
    await $fetch(signedUrl, {
      method: "PUT",
      body: imageFile,
    });
    return uploadedFileUrl;
  };

  return {
    awsPreSignedURLUpload,
  };
};
