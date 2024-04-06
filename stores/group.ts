export const useGroupStore = defineStore('group', () => {
  const groupData = ref<IGroup>()
  const setGroup = (data?: IGroup) => (groupData.value = data)
  return {
    groupData, setGroup
  }
})
