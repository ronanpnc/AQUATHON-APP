import '@/styles/globals.css';

import { TopNav } from '@/components/layouts/TopNav';

export default function HomePageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <TopNav />
      <main>{children}</main>
    </div>
  );
}
