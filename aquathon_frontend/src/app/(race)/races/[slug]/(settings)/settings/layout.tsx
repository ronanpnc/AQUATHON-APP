import '@/styles/globals.css';

export default function SettingsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
