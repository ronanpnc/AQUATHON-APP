import '@/styles/globals.css';

import Container from '@/components/Container';
import { TopNav } from '@/components/layouts/TopNav';

export default function RaceViewLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div>
      <TopNav />
      <Container>
        <main className='pt-20'>{children}</main>
      </Container>
    </div>
  );
}
