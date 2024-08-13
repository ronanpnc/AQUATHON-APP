import '~/styles/globals.css';

import { type Metadata } from 'next';

import { TopNav } from '~/components/layouts/TopNav';

export const metadata: Metadata = {
  title: 'Aquathon App',
  description: 'Race Time Tracker',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en'>
      <body>
        <TopNav />
        <main>{children}</main>
      </body>
    </html>
  );
}
