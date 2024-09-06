import { type Metadata } from 'next';

import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Aquathon App',
  description: 'Race Time Tracker',
  icons: [{ rel: 'icon', url: '/assets/icons/ic_logo.svg' }],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <main className=''>{children}</main>;
}
