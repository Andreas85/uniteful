export function useBreadcrumbs(route) {
  const breadcrumbs = route.path
    .split("/")
    .filter((segment) => segment.trim() !== "");

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
