import { Suspense } from 'react';
import Header from '@/components/Header';
import Pricing from '@/components/Pricing';
import Footer from '@/components/Footer';
import QuestionsList from '@/components/QuestionsList';

export default function Home() {
  return (
    <>
      <Suspense>
        <Header />
      </Suspense>
      <main>
        <QuestionsList />
        <Pricing />
      </main>
      <Footer />
    </>
  );
}
