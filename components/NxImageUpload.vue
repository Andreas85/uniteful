<script setup lang="ts">
export interface IFileRef {
  blobUrl: string;
  base64Url: string;
  fileUrl: string;
}

const emit = defineEmits(['upload-event'])
const props = defineProps({
  loading: Boolean,
  url: String,
})

const { loading, url } = props
const route = useRoute();
const fileRef = ref<IFileRef>({
  blobUrl: "",
  base64Url: "",
  fileUrl: ""
})

const resetFileRef = () => {
  const reset = {
    blobUrl: "",
    base64Url: "",
    fileUrl: ""
  }
  fileRef.value = reset
}

const customBase64Uploader = async (event) => {
  console.log(fileRef.value, "fileRef.value")
  emit('upload-event', fileRef.value)
};

const handleRemove = () => {
  console.log("Revmoed")
  // resetFileRef()
}


const handleClearButton = () => {
  console.log("clear-Revmoed")
  resetFileRef()
}

const handleProgress = (e) => {
  console.log(e)
}

const uploadComplete = async (event) => {
  console.log(event)
  const result = {}
  const file = event.files[0];
  const reader = new FileReader();
  let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

  reader.readAsDataURL(blob);

  reader.onloadend = function () {
    const base64data = reader.result;
    const blobUrl = URL.createObjectURL(blob)

    // Update the filename here
    const newFilename = `groups/${route.params.slug}.png`;
    const updatedFile = new File([blob], newFilename, { type: file.type });

    result.blobUrl = blobUrl;
    result.base64Url = base64data;
    result.fileUrl = updatedFile;
    fileRef.value = result;

  };
}

const removeUploadedFileCallback = () => {
  console.log("removeUploadedFileCallback")
}

const removeFileCallback = () => {
  console.log("removeFileCallback")
}

</script>


<template>
  <div class="card">
    <!-- {{ JSON.stringify(url) }} -->
    <Toast />
    <!-- :style="{width: '100%'}" -->
    <!-- :previewWidth="1200" -->
    <FileUpload  customUpload @uploader="customBase64Uploader" @select="uploadComplete"
      accept="image/png,image/gif,image/jpeg,image/webp" :maxFileSize="1000000" @clear="handleClearButton"
      @remove="handleRemove">
      <template #empty>
        <p>Select file to here to upload.</p>
      </template>

    </FileUpload>


  </div>
</template>
