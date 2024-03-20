export function useBreadcrumbs(route) {
  const breadcrumbs = route.path
    .split("/")
    .filter((segment) => segment.trim() !== "");

  const updateBreadCrumbs = breadcrumbs.filter(
    (item) => !containsNumericValue(item) && item !== "edit"
  );
  const breadcrumbItems = updateBreadCrumbs.map((breadcrumb, index) => {
    const pathSegments = updateBreadCrumbs.slice(0, index + 1);
    const path = `/${pathSegments.join("/")}`;
    return {
      label: capitalizeFirstLetter(breadcrumb),
      path: path,
    };
  });

  return breadcrumbItems;
}
