export function useBreadcrumbs (route: { path: string }) {
  const breadcrumbs = route.path
    .split('/')
    .filter((segment: string) => segment.trim() !== '')

  const updateBreadCrumbs = breadcrumbs.filter(
    (item: string) => !containsNumericValue(item) && item !== 'edit'
  )
  const breadcrumbItems = updateBreadCrumbs.map((breadcrumb: string, index: number) => {
    const pathSegments = updateBreadCrumbs.slice(0, index + 1)
    const path = `/${pathSegments.join('/')}`
    return {
      label: capitalizeFirstLetter(breadcrumb),
      path
    }
  })

  breadcrumbItems.splice(0, 0, { label: 'Home', path: ROUTE_CONSTANTS.HOME })

  return breadcrumbItems
}
