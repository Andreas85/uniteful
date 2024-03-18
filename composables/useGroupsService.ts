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

  const fetchGroupOwnershipService = async (data: {
    limit: number;
    page: number;
  }) => {
    const { page, limit } = data;
    const response = await $api(ENDPOINTS.GROUPS_OWNERSHIP, {
      method: "GET",
      query: { page: page, limit: limit },
    });
    const sendResponse = response.data;
    // console.log(sendResponse);
    return sendResponse;
  };

  const fetchGroupOwnershipDetailService = async (data) => {
    const URL = ENDPOINTS.GROUPS_OWNERSHIP + "/" + data?.id;
    const response = await $api(URL, {
      method: "GET",
    });
    const sendResponse = response.data;
    return sendResponse;
  };

  const fetchGroupMembershipService = async (data: {
    limit: string;
    page: string;
  }) => {
    const { limit, page } = data;
    const response = await $api(ENDPOINTS.GROUPS_MEMBERSHIP, {
      method: "GET",
      query: { page: page, limit: limit },
    });
    const sendResponse = response.data;
    return sendResponse;
  };

  return {
    createGroupService,
    fetchGroupsService,
    fetchGroupOwnershipService,
    fetchGroupMembershipService,
    fetchGroupOwnershipDetailService,
  };
};
