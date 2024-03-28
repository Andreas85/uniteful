export const useGroupsService = () => {
  const { $api } = useNuxtApp()

  const fetchGroupsService = async (data: {
    limit: number;
    page: number;
  }) => {
    const { limit, page } = data
    const response = await $api(ENDPOINTS.GROUPS, {
      method: 'GET',
      query: { page, limit }
    }) as any
    const sendResponse = response.data
    return sendResponse as IResponseDataGroup
  }

  const createGroupService = async (data: any) => {
    const response = await $api(ENDPOINTS.GROUPS, {
      method: 'POST',
      body: data
    })
    return response
  }

  const updateGroupService = async (payload: {
    id: string;
    formData: IPayloadUpdataGroup;
  }) => {
    const { id, formData } = payload
    const URL = ENDPOINTS.GROUPS + '/' + id
    const response = await $api(URL, {
      method: 'PUT',
      body: formData
    })
    return response
  }

  const fetchGroupOwnershipService = async (data: {
    limit: number;
    page: number;
  }) => {
    const { page, limit } = data
    const response = await $api(ENDPOINTS.GROUPS_OWNERSHIP, {
      method: 'GET',
      query: { page, limit }
    }) as any
    const sendResponse = response.data
    // console.log(sendResponse);
    return sendResponse
  }

  const fetchGroupDetailService = async (data: { id: string; }) => {
    const URL = ENDPOINTS.GROUPS + '/' + data?.id
    const response = (await $api(URL, {
      method: 'GET'
    })) as any
    const sendResponse = response.data
    return sendResponse
  }

  const fetchGroupMembershipService = async (data: {
    limit: string;
    page: string;
  }) => {
    const { limit, page } = data
    const response = await $api(ENDPOINTS.GROUPS_MEMBERSHIP, {
      method: 'GET',
      query: { page, limit }
    })as any
    const sendResponse = response.data
    return sendResponse
  }

  const fetchUserSearchervice = async (data: {
    searchString?: string;

  }) => {
    const { searchString } = data
    const URL = ENDPOINTS.USER_SEARCH_AUTO_COMPLETE + '/' + searchString
    const response = await $api(URL, {
      method: 'GET'
    }) as any
    const sendResponse = response.data
    return sendResponse
  }

  const fetchGroupMemberService = async (payload: {
    query: {limit:number; page: number};
    groupId: string;
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { success, fail, query, groupId } = payload
    const { limit, page } = query
    try {
      const URL = ENDPOINTS.GROUPS + `/${groupId}` + '/members'
      const response = (await $api(URL, {
        method: 'GET',
        query: { page, limit }
      })) as any
      success?.(response.data)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const joinGroupService = async (payload: {
    body: { groupId: string };
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { body, success, fail } = payload
    try {
      const URL = ENDPOINTS.GROUPS + '/join'
      const response = (await $api(URL, {
        method: 'POST',
        body
      })) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const leaveGroupService = async (payload: {
    body: {groupId: string};
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { body, success, fail } = payload
    try {
      const URL = ENDPOINTS.GROUPS + '/leave'
      const response = await $api(URL, {
        method: 'POST',
        body
      }) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  return {
    createGroupService,
    fetchGroupsService,
    fetchGroupOwnershipService,
    fetchGroupMembershipService,
    fetchGroupDetailService,
    updateGroupService,
    fetchUserSearchervice,
    fetchGroupMemberService,
    joinGroupService,
    leaveGroupService
  }
}
