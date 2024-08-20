import { Tag, Users, Settings, Bookmark, SquarePen, LayoutGrid, LucideIcon, Timer } from 'lucide-react';

type Submenu = {
  href: string;
  label: string;
  active: boolean;
};

type Menu = {
  href: string;
  label: string;
  active: boolean;
  icon: LucideIcon;
  submenus: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: '',
      menus: [
        {
          href: '/dashboard',
          label: 'Dashboard',
          active: pathname.includes('/dashboard'),
          icon: LayoutGrid,
          submenus: [],
        },
      ],
    },
    {
      groupLabel: '',
      menus: [
        {
          href: '/time_tracker',
          label: 'Time Tracker',
          active: pathname.includes('/Time'),
          icon: Timer,
          submenus: [],
        },
      ],
    },
  ];
}
