import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { useEffect } from 'react';

const AuthLayout = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isAuthLoading } = useAuthContext();

  if (isAuthLoading) return <span>Loading...</span>;

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) navigate('/login', { replace: true });
  }, [isLoggedIn, isAuthLoading]);

  if (isLoggedIn)
    return (
      <div className="container mx-auto">
        <Outlet />
      </div>
    );
};
export default AuthLayout;
