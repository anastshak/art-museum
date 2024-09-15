import { Header } from '@/components/Header/Header';
import { Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};
