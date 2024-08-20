'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useStore } from 'zustand';

import { Menu } from './menu';
import { SidebarToggle } from './sidebar-toggle';
import { Button } from '../ui/button';

import { useSidebarToggle } from '~/hooks/use-sidebar-toggle';
import { cn } from '~/lib/utils';

export function Sidebar() {
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <aside
      className={cn(
        'fixed top-0 left-0 z-20 h-screen -translate-x-full lg:translate-x-0 transition-[width] ease-in-out duration-300 bg-white',
        sidebar?.isOpen === false ? 'w-[90px]' : 'w-64',
      )}
    >
      <SidebarToggle isOpen={sidebar?.isOpen} setIsOpen={sidebar?.setIsOpen} />
      <div className='relative h-full flex flex-col px-3 py-4 shadow-md dark:shadow-zinc-800'>
        <Button
          className={cn(
            'transition-transform ease-in-out duration-300 mb-1',
            sidebar?.isOpen === false ? 'translate-x-1' : 'translate-x-0',
          )}
          variant='link'
          asChild
        >
          <Link href='/' className='flex items-center gap-2'>
            <Image
              src='/assets/icons/ic_logo_sidebar.svg'
              alt='Logo'
              width={210}
              height={120}
              className={cn('cursor-pointer', sidebar?.isOpen === true
                ? "-translate-x-96 opacity-0 hidden"
                : "translate-x-0 opacity-100")}
            />
            <Image
              src='/assets/icons/ic_logo.svg'
              alt='Logo'
              width={210}
              height={120}
              className={cn('cursor-pointer', sidebar?.isOpen === false
                ? "-translate-x-96 opacity-0 hidden"
                : "translate-x-0 opacity-100")}
            />
          </Link>
        </Button>
        <Menu
          isOpen={sidebar?.isOpen}
        />
      </div>
    </aside>
  );
}
