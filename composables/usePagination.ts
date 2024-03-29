export function usePagination () {
  const route = useRoute()
  const pageRef = ref(
    !!route.query.q ? getDataFromQueryParams(route?.query?.q) : 0
  )
  const limitRef = ref(6)
  const totalPage = ref(0)
  // console.log(pageRef.value, "page")
  const updateRouteQuery = () => {
    const encryptvalue = setDataInQueryParams(pageRef.value)
    navigateTo(`${route.path}?q=${encryptvalue}`)
  }

  return { pageRef, limitRef, totalPage, updateRouteQuery }
}
