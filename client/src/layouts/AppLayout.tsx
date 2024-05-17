import { Outlet } from 'react-router-dom';

import Header from '../components/Header';

const AppLayout = () => {
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <Outlet />
      </div>
    </>
  );
};

export default AppLayout;
