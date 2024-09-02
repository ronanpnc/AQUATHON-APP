import '@/styles/globals.css';

import { TopNav } from '@/components/layouts/TopNav';

export default function RaceViewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <TopNav />
      <main className='pt-20'>{children}</main>
    </div>
  );
}
  