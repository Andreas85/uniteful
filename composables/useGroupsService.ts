export const useGroupsService = () => {
  interface IPayloadUpdataGroup {
    name: string;
    groupValues: string[];
    visibility: Visibility;
  }

  interface Visibility {
    visibilityType: string;
  }

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
    return response;
  };

  const updateGroupService = async (payload: {
    id: string;
    formData: IPayloadUpdataGroup;
  }) => {
    const { id, formData } = payload;
    const URL = ENDPOINTS.GROUPS + "/" + id;
    console.log(URL);

    const response = await $api(URL, {
      method: "PUT",
      body: formData,
    });
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

  const fetchGroupDetailService = async (data) => {
    const URL = ENDPOINTS.GROUPS + "/" + data?.id;
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
    fetchGroupDetailService,
    updateGroupService,
  };
};
