export const useImageUpload = () => {
  const { $api } = useNuxtApp();

  const awsPreSignedURLUpload = (imageFile: FileList[0]) => {
    const apiUrl = "/upload?fileName=" + imageFile.name;
    return $api(apiUrl, {
      method: "GET",
    })
      .then(function (response: any) {
        return response?.signedUrl;
      })
      .then(function (signedUrl) {
        const uploadedFileUrl = signedUrl?.split("?")[0];
        fetch(signedUrl, {
          method: "PUT",
          body: imageFile,
        });
        return uploadedFileUrl;
      });
  };
  return {
    awsPreSignedURLUpload,
  };
};
