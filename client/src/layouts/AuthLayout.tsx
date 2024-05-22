import { Navigate, Outlet } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const AuthLayout = () => {
  const { isLoggedIn } = useAuthContext();
  if (isLoggedIn) return <Navigate to="/" />;
  return (
    <div className="container mx-auto">
      <Outlet />
    </div>
  );
};
export default AuthLayout;
