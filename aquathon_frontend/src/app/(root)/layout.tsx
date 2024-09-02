import '@/styles/globals.css';

export default function HomePageLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
