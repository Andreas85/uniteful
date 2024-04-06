export function useModal () {
  const openModal = ref(false)

  const showModal = () => (openModal.value = true)
  const closeModal = () => (openModal.value = false)

  return { openModal, showModal, closeModal }
}
