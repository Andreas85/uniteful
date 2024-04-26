export const useGroupStore = defineStore('group', () => {
  const groupData = ref<IGroup>()
  const refresh = ref<boolean>(false)
  const setGroup = (data?: IGroup) => (groupData.value = data)

  const groupMembers = ref<any>()
  const setGroupMembers = (data?: any) => (groupMembers.value = data)

  return {
    groupData,
    setGroup,
    groupMembers,
    setGroupMembers
  }
})
