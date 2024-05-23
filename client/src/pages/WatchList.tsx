import { Navigate } from 'react-router-dom';
import { useGetWatchList } from '../api/stocks.api';
import { useAuthContext } from '../context/AuthContext';
import { useEffect, useState } from 'react';
import WatchListCard from '../components/WatchListCard';

interface IStock extends Document {
  company: String;
  description?: String;
  initial_price: Number;
  price_2002: Number;
  price_2007: Number;
  symbol?: String;
}

const WatchList = () => {
  const { isLoggedIn, isAuthLoading } = useAuthContext();
  const { stocks, isGetWatchListLoading } = useGetWatchList();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!isGetWatchListLoading && !isGetWatchListLoading) {
      setLoading(false);
    }
  }, [isAuthLoading, isGetWatchListLoading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth/sign-up" />;
  }

  if (!stocks) {
    return <span>You have not stocks added to your watch-list</span>;
  }

  return (
    <div className="grid grid-cols-4 gap-5 mt-12">
      {[...stocks].map((stock) => (
        <WatchListCard key={stock._id} stock={stock} />
      ))}
    </div>
  );
};
export default WatchList;
