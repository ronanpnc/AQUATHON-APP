import '@/styles/globals.css';

import { TimeTrackingNav } from '@/components/layouts/TimeTrackingNav';

export default function SegmentsLayout({ children }: { children: React.ReactNode; params: { slug: string } }) {
  return (
    <div>
      <TimeTrackingNav />
      <main>{children}</main>
    </div>
  );
}
