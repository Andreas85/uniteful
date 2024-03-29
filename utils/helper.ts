import moment from 'moment'
import _ from 'lodash'
import type { LocationQueryValue } from 'vue-router'
export function capitalizeFirstLetter (data: string) {
  return data.charAt(0).toUpperCase() + data.slice(1).toLowerCase()
}

export function getTodayDate () {
  return new Date().toISOString().substr(0, 10)
}

export function getISODate (data: string) {
  return moment.utc(data).toISOString()
}
export function getRequiredDataFormat (data: string, format?: '') {
  const dateFormat = format ?? 'YYYY-MM-DD'
  return moment(data).format(dateFormat)
}

export const formatTimeForMinutes = (seconds: number) => {
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = seconds % 60

  const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : `${remainingSeconds}`

  return `${formattedMinutes}:${formattedSeconds}`
}

export const getUserDataInLocalStorage = () => {
  // return localStorage.getItem('token');
  const storedData = localStorage.getItem('united-user-data')
  return storedData ? JSON.parse(storedData) : null
}

export const setUserDataInLocalStorage = (data: any) => {
  const stringifiedData = JSON.stringify(data)
  localStorage.setItem('united-user-data', stringifiedData)
}

export const handleQueryResponse = (error: any) => {
  const result = error?.data?.result?.errText
  return result
}

export const containsNumericValue = (str: string) => {
  const regex = /\d/
  return regex.test(str)
}

export const setDataInQueryParams = (values: any) => {
  const data = btoa(JSON.stringify(values))
  return data
}

export const getDataFromQueryParams = (encodedString: string | any) => {
  const data = JSON.parse(atob(encodedString))
  return data
}

export const sanitizedUserDetail = (data: any) => {
  const result = _.cloneDeep(data)

  const selectedVisibility = VISIBILITY_TYPE.find(
    item => item?.code === data?.visibility?.visibilityType
  )

  const selectedRegistrationPolicy = REGISTRATION_POLICY.find(
    item => item?.code === data?.registrationPolicy?.policyType
  )

  const selectedAdmissionPolicy = GROUP_ADMISSION_POLICY.find(
    item => item?.code === data?.admissionPolicy?.policyType
  )

  if (data?.visibility?.visibilityType) {
    result.visibility.visibilityType = selectedVisibility
  }

  result.registrationPolicy = selectedRegistrationPolicy
  result.admissionPolicy = selectedAdmissionPolicy

  if (data?.visibility?.visibilityType === VISIBILITY.CHERRY_PICKED) {
    result.user_visibility = data?.userMap.filter(
      (item: { id: any }) => data?.visibility?.cherryPickedUsers?.includes(item?.id)
    )
  }

  if (data?.registrationPolicy?.policyType === VISIBILITY.CHERRY_PICKED) {
    result.user_registration_policy = data?.userMap.filter(
      (item: { id: any }) => data?.registrationPolicy?.cherryPickedUsers?.includes(item?.id)
    )
  }

  // console.log(selectedRegistrationPolicy, "helperw", data);
  return result
}

export const getUserName = (data: IUser) => {
  if (data) {
    return `${data.firstName} ${data.lastName}`
  }
}

export const getGroupStoreData = (data: IGroup) => {
  const storeData = _.cloneDeep(data)
  const { isOwner, isModerator } = data
  const isNormalUser = !isOwner && !isModerator
  if (isNormalUser) {
    storeData.isOrdinaryUser = isNormalUser
  }
  return storeData
}

export const getSubdomainFromHost = (host: string) => {
  return host?.split('.')?.[1] ? host.split('.')?.[0] : ''
}
