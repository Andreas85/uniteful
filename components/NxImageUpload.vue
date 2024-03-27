<!-- eslint-disable vue/require-default-prop -->
<script setup lang="ts">
import { usePrimeVue } from 'primevue/config'
import Badge from 'primevue/badge'

const emit = defineEmits(['upload-event'])
const props = defineProps({
  fileName: { type: String, default: '' }, hasProfileImage: { type: Boolean, default: false }
})

const { fileName, hasProfileImage } = toRefs(props)
const $primevue = usePrimeVue()

const fileRef = ref<IFileRef>({
  blobUrl: '',
  base64Url: '',
  fileUrl: ''
})

const resetFileRef = () => {
  const reset = {
    blobUrl: '',
    base64Url: '',
    fileUrl: ''
  }
  fileRef.value = reset
}

const customBase64Uploader = () => {
  console.log(fileRef.value, 'fileRef.value')
  emit('upload-event', fileRef.value)
}

const handleRemove = () => {
  console.log('Revmoed')
  // resetFileRef()
}

const handleClearButton = () => {
  console.log('clear-Revmoed')
  resetFileRef()
}

const uploadComplete = async (event:any) => {
  console.log(event)
  const result = { blobUrl: '', base64Url: '', fileUrl: '' }
  const file = event?.files?.[0]
  const reader = new FileReader()
  const blob = await fetch(file.objectURL).then(r => r.blob()) // blob:url

  reader.readAsDataURL(blob)

  reader.onloadend = function () {
    const base64data = reader?.result ?? ''
    const blobUrl = URL.createObjectURL(blob) ?? ''

    // Update the filename here
    const newFilename = fileName.value
    const updatedFile = new File([blob], newFilename, { type: file.type }) ?? ''

    result.blobUrl = blobUrl
    result.base64Url = base64data
    result.fileUrl = updatedFile
    fileRef.value = result
  }
}

const formatSize = (bytes: number) => {
  const k = 1024
  const dm = 3
  const sizes = $primevue?.config?.locale?.fileSizeTypes

  if (bytes === 0) {
    return `0 ${sizes?.[0]}`
  }

  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm))

  return `${formattedSize} ${sizes?.[i]}`
}

const onRemoveTemplatingFile = (file: { size: number; }, removeFileCallback: (arg0: any) => void, index: any) => {
  removeFileCallback(index)
}

</script>

<template>
  <div class="card">
    <!-- {{ JSON.stringify(url) }} -->
    <Toast />
    <FileUpload
      custom-upload
      accept="image/png,image/gif,image/jpeg,image/webp"
      :max-file-size="1000000"
      @uploader="customBase64Uploader"
      @select="uploadComplete"
      @clear="handleClearButton"
      @remove="handleRemove"
    >
      <template #empty>
        <p>Select file to here to upload.</p>
      </template>
      <template
        v-if="hasProfileImage"
        #content="{ files, removeFileCallback }"
      >
        <div v-if="files.length > 0">
          <div class="flex flex-wrap p-0 sm:p-5 gap-5">
            <div
              v-for="(file, index) of files"
              :key="index"
              class="card m-0 flex flex-column border-1 surface-border align-items-center gap-4 has-profile-class w-full"
            >
              <div>
                <img role="presentation" :alt="file.name" :src="file.objectURL">
              </div>
              <div class="flex items-start justify-between gap-4">
                <div class=" flex flex-col gap-3">
                  <span class="f">{{ file.name }}</span>
                  <div class="flex justify-start items-center gap-4">
                    <div>{{ formatSize(file.size) }}</div>
                    <Badge value="Pending" severity="warning" />
                  </div>
                </div>
                <div>
                  <Icon
                    :name="'charm:cross'"
                    :width="'2rem'"
                    :height="'2rem'"
                    class="cursor-pointer"
                    @click="onRemoveTemplatingFile(file, removeFileCallback, index)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
    </FileUpload>
  </div>
</template>
