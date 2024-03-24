export const useTodosStore = defineStore('todos', () => {
  const data = ref([])
  function setTodosData (newData: any) {
    data.value = newData
  }

  return { data, setTodosData }
})
