import '@/styles/globals.css';

import { RaceDetailsNav } from '@/components/layouts/RaceDetailsNav';

export default function RaceDetailLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { slug: string };
}) {
  return (
    <div>
      <RaceDetailsNav raceId={params.slug} />
      <main>{children}</main>
    </div>
  );
}
