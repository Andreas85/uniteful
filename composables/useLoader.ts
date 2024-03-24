export function useLoader () {
  const loading = ref(false)

  const showLoading = () => (loading.value = true)
  const hideLoading = () => (loading.value = false)

  return { loading, showLoading, hideLoading }
}
