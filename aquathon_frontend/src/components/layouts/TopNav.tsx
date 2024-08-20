'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

import { navigationMenuTriggerStyle } from '../ui/navigation-menu';

export function TopNav() {
  const pathname = usePathname();

  const menuItems = [
    { href: '/racer/setup', label: 'Setup' },
    { href: '/racer/competitors', label: 'Competitors' },
    { href: '/racer/timers', label: 'Timers' },
    { href: '/racer/dashboard', label: 'Dashboard' },
    { href: '/racer/result', label: 'Result' },
  ];

  return (
    <NavigationMenu className='w-full bg-white shadow-md'>
      <NavigationMenuList className='flex flex-row justify-start items-end space-x-4 px-6 h-14'>
        <NavigationMenuItem className='mr-48'>
          <Link href='/' passHref>
            <Image
              src='/assets/icons/ic_logo.svg'
              alt='Logo'
              width={210}
              height={140}
              className='cursor-pointer pl-4 pb-2'
            />
          </Link>
        </NavigationMenuItem>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href} className='px-4'>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} pb-6 pt-8 text-lg ${
                  pathname === item.href
                    ? 'border-b-4 border-primary rounded-none'
                    : 'rounded-none border-transparent border-b-4'
                }`}
              >
                {item.label}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
