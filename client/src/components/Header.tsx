import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div className="bg-blue-600">
      <div className="container mx-auto text-white">
        <div className="flex justify-between items-center py-8">
          <Link to="/" className="text-3xl font-bold">
            MarketStock.io
          </Link>
          {/* Desktop */}
          <button className="bg-white text-blue-600 font-bold py-2 px-5 rounded-md">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
};
export default Header;
