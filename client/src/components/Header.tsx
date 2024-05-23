import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

const Header = () => {
  const { isLoggedIn } = useAuthContext();
  return (
    <div className="bg-blue-600">
      <div className="container mx-auto text-white">
        <div className="flex justify-between items-center py-8">
          <div className="flex items-baseline gap-6">
            <Link to="/" className="text-3xl font-bold">
              MarketStock.io
            </Link>
            {isLoggedIn && (
              <Link to="/watch-list" className="text-xl font-bold underline">
                Watch list
              </Link>
            )}
          </div>
          {/* Desktop */}
          {isLoggedIn ? (
            <button className="bg-white text-blue-600 font-bold py-2 px-5 rounded-md">
              Log Out
            </button>
          ) : (
            <Link
              className="bg-white text-blue-600 font-bold py-2 px-5 rounded-md"
              to="/auth/login"
            >
              Log In
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};
export default Header;
