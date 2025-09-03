import { Footer } from '@/components/Footer/Footer';
import { Header } from '@/components/Header/Header';
import { Main } from '@/components/MainHome/Main';
import { Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Main />
      <Footer />
    </>
  );
};
