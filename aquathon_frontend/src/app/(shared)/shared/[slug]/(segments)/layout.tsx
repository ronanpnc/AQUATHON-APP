import '@/styles/globals.css';

export default function SharedLayout({ children }: { children: React.ReactNode; params: { slug: string } }) {
  return (
    <div>
        <h1>Welcome</h1>
      <main>{children}</main>
    </div>
  );
}
