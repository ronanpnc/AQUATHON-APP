import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import Image from 'next/image';
import Link from 'next/link';
import * as React from 'react';

import { navigationMenuTriggerStyle } from '../ui/navigation-menu';

export function TopNav() {
  return (
    <NavigationMenu className='w-full bg-white shadow-md'>
      <NavigationMenuList className='flex flex-row justify-start items-center space-x-4 py-4 px-6 h-16'>
        <NavigationMenuItem>
          <Link href='/' passHref>
            <Image
              src='/assets/icons/ic_logo.svg'
              alt='Logo'
              width={210}
              height={120}
              className='cursor-pointer pl-4'
            />
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem className='pl-48'>
          <Link href='/racer/setup' legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-base`}>Setup</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/racer/competitors' legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-base`}>Competitors</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/racer/timers' legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-base`}>Timers</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/racer/dashboard' legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-base`}>Dashboard</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/racer/result' legacyBehavior passHref>
            <NavigationMenuLink className={`${navigationMenuTriggerStyle()} text-base`}>Result</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
