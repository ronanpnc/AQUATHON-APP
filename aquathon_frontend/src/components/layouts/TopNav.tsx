'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@radix-ui/react-navigation-menu';
import Link from 'next/link';
import * as React from 'react';

import { navigationMenuTriggerStyle } from '../ui/navigation-menu';

export function TopNav() {
  return (
    <NavigationMenu className="w-full">
      <NavigationMenuList className="flex flex-row justify-start items-center space-x-4">
        <NavigationMenuItem>
          <Link href='/setup' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Setup</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/competitors' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Competitors</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/timers' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Timers</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/dashboard' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Dashboard</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href='/result' legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Result</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}