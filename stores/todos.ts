export const useTodosStore = defineStore("todos", () => {
  const data = ref([]);
  function setTodosData(newData) {
    data.value = newData;
  }

  return { data, setTodosData };
});
