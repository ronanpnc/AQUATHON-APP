import '@/styles/globals.css';

import { RaceTab } from '@/components/layouts/RaceTab';

export default function NestedLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <RaceTab />
        <main>{children}</main>
      </body>
    </html>
  );
}
