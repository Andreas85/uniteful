export const useServiceTodos = () => {
  const { $api } = useNuxtApp();
  console.log(useNuxtApp(), ">>");
  // const get = async () => {
  //   // const response = await $api("/todos", { method: "GET" });
  //   // console.log(response, "response");
  // };
  return {
    // get,
    $api,
  };
};
