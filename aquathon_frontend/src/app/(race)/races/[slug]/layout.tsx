import '@/styles/globals.css';

import { RaceTab } from '@/components/layouts/RaceTab';

export default function NestedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <RaceTab />
      <main>{children}</main>
    </div>
  );
}
