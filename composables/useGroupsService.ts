export const useGroupsService = () => {
  const { $api } = useNuxtApp();

  const fetchGroupsService = async () => {
    const response = await $api(ENDPOINTS.GROUPS, {
      method: "GET",
    });
    return response;
  };

  const createGroupService = async (data) => {
    const response = await $api(ENDPOINTS.GROUPS, {
      method: "POST",
      body: data,
    });
    console.log(response, "service");
    return response;
  };

  return {
    createGroupService,
    fetchGroupsService,
  };
};
