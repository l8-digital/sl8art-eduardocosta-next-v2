'use client';
import Cookies from '@/components/Cookie/Cookie';
import { Header } from '@/components/Header/Header';
import { Footer } from '@/components/Footer/Footer';

export default function PagesLayout({ children }: { children: React.ReactNode }) {

  return (
    <>
      <Header theme='black'/>
      {children}
      <Cookies />
      <Footer />
    </>
  );
}
