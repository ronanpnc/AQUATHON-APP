import { Metadata } from 'next';

import '@/styles/globals.css';

import { RaceDetailsNav } from '@/components/layouts/RaceDetailsNav';
export const metadata : Metadata = {};
export default function RaceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
