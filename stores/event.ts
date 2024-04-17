export const useEventStore = defineStore('event', () => {
  const eventData = ref<IEventDetail>()
  const setEvent = (data?: IEventDetail) => (eventData.value = data)
  return {
    eventData, setEvent
  }
})
