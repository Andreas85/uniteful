export const useEventsService = () => {
  const { $api } = useNuxtApp()

  const fetchEventsService = async (data: {
    limit: number;
    page: number;
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { limit, page, success, fail } = data
    try {
      const response = (await $api(ENDPOINTS.EVENTS, {
        method: 'GET',
        query: { page, limit }
      })) as any
      const sendResponse = response.data as IResponseDataGroup
      success?.(sendResponse)
      return sendResponse
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const createEventService = async (data: any) => {
    const response = await $api(ENDPOINTS.EVENTS, {
      method: 'POST',
      body: data
    })
    return response
  }

  const updateEventService = async (payload: {
    id: string;
    formData: IPayloadUpdataEvent;
  }) => {
    const { id, formData } = payload
    const URL = ENDPOINTS.EVENTS + '/' + id
    const response = await $api(URL, {
      method: 'PUT',
      body: formData
    })
    return response
  }

  const fetchEventOwnershipService = async (data: {
    limit: number;
    page: number;
  }) => {
    const { page, limit } = data
    const response = await $api(ENDPOINTS.EVENTS_OWNERSHIP, {
      method: 'GET',
      query: { page, limit }
    }) as any
    const sendResponse = response.data
    // console.log(sendResponse);
    return sendResponse
  }

  const fetchEventDetailService = async (data: { id: string;fail?: (error: any) => void;
    success?: (data: any) => void; }) => {
    const { success, fail, id } = data
    try {
      const URL = ENDPOINTS.EVENTS + '/' + id
      const response = (await $api(URL, {
        method: 'GET'
      })) as any
      const sendResponse = response.data
      if (success) {
        success?.(sendResponse)
      }
      return sendResponse
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const fetchEventMembershipService = async (payload: {
    query: { limit?: number; page?: number };
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { success, fail, query } = payload
    const { limit, page } = query
    try {
      const URL = ENDPOINTS.EVENTS_OWNERSHIP
      const response = (await $api(URL, {
        method: 'GET',
        query: { page, limit }
      })) as any
      success?.(response.data)
    } catch (error: any) {
      fail?.(error.data)
    }
    // const { limit, page } = data
    // const response = await $api(ENDPOINTS.GROUPS_MEMBERSHIP, {
    //   method: 'GET',
    //   query: { page, limit }
    // })as any
    // const sendResponse = response.data
    // return sendResponse
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

  const fetchEventAttendeeService = async (payload: {
    query: {limit:number; page: number};
    eventId: string;
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { success, fail, query, eventId } = payload
    const { limit, page } = query
    try {
      const URL = ENDPOINTS.EVENTS + `/${eventId}` + '/members'
      const response = (await $api(URL, {
        method: 'GET',
        query: { page, limit }
      })) as any
      success?.(response.data)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const joinEventService = async (payload: {
    body: { eventId: string };
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { body, success, fail } = payload
    try {
      const URL = ENDPOINTS.EVENTS + '/join'
      const response = (await $api(URL, {
        method: 'POST',
        body
      })) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const leaveEventService = async (payload: {
    body: {eventId: string, reason: string};
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { body, success, fail } = payload
    try {
      const URL = ENDPOINTS.EVENTS + '/leave'
      const response = await $api(URL, {
        method: 'POST',
        body
      }) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const pendingReqeustForGroupService = async (payload: {
    query: { limit: number; page: number };
    groupId: string;
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { success, fail, query, groupId } = payload
    const { limit, page } = query
    try {
      const URL = ENDPOINTS.EVENTS + `/${groupId}` + '/pending-requests'
      const response = (await $api(URL, {
        method: 'GET',
        query: { page, limit }
      })) as any
      success?.(response.data)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const approveMemberRequestService = async (payload: {
    body: { groupId: string; memberId:string };
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { body, success, fail } = payload
    try {
      const URL = ENDPOINTS.EVENTS + '/approve'
      const response = (await $api(URL, {
        method: 'POST',
        body
      })) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const rejectMemberRequestService = async (payload: {
      body: { groupId: string, memberId:string };
      fail?: (error: any) => void;
      success?: (data: any) => void;
    }) => {
    const { body, success, fail } = payload
    try {
      const URL = ENDPOINTS.EVENTS + '/reject'
      const response = (await $api(URL, {
        method: 'POST',
        body
      })) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const makeModeratorRequestService = async (payload: {
    body: { groupId: string; memberId:string };
    fail?: (error: any) => void;
    success?: (data: any) => void;
  }) => {
    const { body, success, fail } = payload
    try {
      const URL = ENDPOINTS.EVENTS + '/make-moderator'
      const response = (await $api(URL, {
        method: 'POST',
        body
      })) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const removeModeratorRequestService = async (payload: {
      body: { groupId: string; memberId: string, reason?:string };
      fail?: (error: any) => void;
      success?: (data: any) => void;
    }) => {
    const { body, success, fail } = payload
    try {
      const URL = ENDPOINTS.EVENTS + '/remove-moderator'
      const response = (await $api(URL, {
        method: 'POST',
        body
      })) as any
      success?.(response)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const myPendingGroupReqeustService = async (payload: {
      query: { limit?: number; page?: number };
      fail?: (error: any) => void;
      success?: (data: any) => void;
    }) => {
    const { success, fail, query } = payload
    const { limit, page } = query
    try {
      const URL = ENDPOINTS.EVENTS + '/my-pending-requests'
      const response = (await $api(URL, {
        method: 'GET',
        query: { page, limit }
      })) as any
      success?.(response.data)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  const fetchInterestedPeopleEvent = async (payload: {
      query: { limit: number; page: number };
      eventId: string;
      fail?: (error: any) => void;
      success?: (data: any) => void;
    }) => {
    const { success, fail, query, eventId } = payload
    const { limit, page } = query
    try {
      const URL = ENDPOINTS.EVENTS + `/${eventId}` + '/wait-list'
      const response = (await $api(URL, {
        method: 'GET',
        query: { page, limit }
      })) as any
      success?.(response.data)
    } catch (error: any) {
      fail?.(error.data)
    }
  }

  return {
    fetchEventsService,
    fetchEventOwnershipService,
    createEventService,
    fetchEventDetailService,
    updateEventService,
    fetchEventMembershipService,
    joinEventService,
    leaveEventService,
    fetchEventAttendeeService,
    fetchInterestedPeopleEvent
  }
}
