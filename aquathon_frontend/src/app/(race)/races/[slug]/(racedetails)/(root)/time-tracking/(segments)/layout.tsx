import '@/styles/globals.css';

export default function SegmentsLayout({ children }: { children: React.ReactNode; params: { slug: string } }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
