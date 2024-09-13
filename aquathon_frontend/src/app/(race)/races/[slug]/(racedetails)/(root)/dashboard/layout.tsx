import { Metadata } from 'next';

import '@/styles/globals.css';

export const metadata : Metadata = {};
export default function RaceDetailLayout({
  children,
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
