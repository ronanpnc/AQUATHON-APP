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
import * as React from 'react';

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
      <NavigationMenuList className='flex flex-row justify-start items-center space-x-4 py-4 px-6 h-16'>
        <NavigationMenuItem className='mr-48'>
          <Link href='/' passHref>
            <Image
              src='/assets/icons/ic_logo.svg'
              alt='Logo'
              width={210}
              height={140}
              className='cursor-pointer pl-4'
            />
          </Link>
        </NavigationMenuItem>
        {menuItems.map((item) => (
          <NavigationMenuItem key={item.href} className='px-4'>
            <Link href={item.href} legacyBehavior passHref>
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} text-base ${
                  pathname === item.href ? 'border-b-2 border-current' : ''
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