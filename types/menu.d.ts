interface MenuItem {
  label?: string;
  icon?: string;
  command?: () =>void
}

interface Menu {
  label?: string;
  items?: MenuItem[];
}