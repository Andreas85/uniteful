export function useBreadcrumbs(route) {
  const breadcrumbs = route.path
    .split("/")
    .filter((segment) => segment.trim() !== "");
  const last = breadcrumbs?.[breadcrumbs?.length - 1];
  if (!isNaN(last)) {
    breadcrumbs.pop();
  }

  const breadcrumbItems = breadcrumbs.map((breadcrumb, index) => {
    const pathSegments = breadcrumbs.slice(0, index + 1);
    const path = `/${pathSegments.join("/")}`;
    return {
      label: capitalizeFirstLetter(breadcrumb),
      path: path,
    };
  });

  return breadcrumbItems;
}
