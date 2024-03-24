export function useToastComposable () {
  interface IToast {
    detail?: string;
    life?: string | number | undefined;
  }

  const getOptions = (payload: IToast) => {
    console.log(payload)
    const { detail = '', life = '' } = payload
    return {
      detail: detail ?? 'Message Content',
      life: 3000
    }
  }

  const toast = useToast()

  const showSuccess = (payload: IToast) => {
    toast.add({
      severity: 'success',
      summary: 'Success',
      ...getOptions(payload)
    })
  }

  const showInfo = (payload: IToast) => {
    toast.add({
      severity: 'info',
      summary: 'Info ',
      ...getOptions(payload)
    })
  }

  const showWarn = (payload: IToast) => {
    toast.add({
      severity: 'warn',
      summary: 'Warn ',
      ...getOptions(payload)
    })
  }

  const showError = (payload: IToast) => {
    const { detail = '', life = 3000 } = payload
    toast.add({
      severity: 'error',
      summary: 'Error ',
      detail: detail ?? 'Message Content',
      life: Number(life) ?? 3000
      // ...getOptions(payload),
    })
  }

  const showSecondary = (payload: IToast) => {
    toast.add({
      severity: 'secondary',
      summary: 'Secondary Message',
      ...getOptions(payload)
    })
  }

  const showContrast = (payload: IToast) => {
    toast.add({
      severity: 'contrast',
      summary: 'Contrast Message',
      ...getOptions(payload)
    })
  }

  return {
    showSuccess,
    showError,
    showContrast,
    showWarn,
    showSecondary,
    showInfo
  }
}
