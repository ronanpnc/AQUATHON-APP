import { type Metadata } from 'next';
import { Inter } from 'next/font/google';

import '@/styles/globals.css';

import ReactQueryProvider from '@/utils/providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Aquathon DEV App',
  description: 'Race Time Tracker',
  icons: [{ rel: 'icon', url: '/assets/icons/ic_logo.svg' }],
};

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' className={inter.className}>
      <body>
        <ReactQueryProvider>
          <main>{children}</main>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
