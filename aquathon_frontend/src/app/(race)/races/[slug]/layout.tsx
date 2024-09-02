import '@/styles/globals.css';

import { RaceDetailsNav } from '@/components/layouts/RaceDetailsNav';

export default function NestedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <RaceDetailsNav />
      <main>{children}</main>
    </div>
  );
}
