import { Link } from 'react-router-dom';
import { IStock, useAddStockToWatchList } from '../api/stocks.api';
import { useAuthContext } from '../context/AuthContext';

interface Props {
  stock: IStock;
}

const StockCard = ({ stock }: Props) => {
  const { AddStockToWatchList } = useAddStockToWatchList();
  const { isLoggedIn } = useAuthContext();
  const getRandomColor = () => {
    const colors = ['text-[#FF0000]', 'text-[#00FF00]']; // Red and Green
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleStockAddToWatchList = (id: string) => {
    AddStockToWatchList(stock._id);
  };

  return (
    <div className="border-4 border-blue-300 flex justify-between items-center p-5 rounded-md shadow-md">
      <h1 className="text-blue-600 text-xl font-bold">
        {stock.company} - {stock.symbol}
      </h1>
      <p className={`font-bold text-2xl ${getRandomColor()}`}>
        {stock.initial_price.toString()}
      </p>
      {isLoggedIn ? (
        <button
          className="bg-green-600 text-white font-bold py-2 px-5 rounded-md"
          onClick={() => handleStockAddToWatchList(stock._id)}
        >
          Add to My Watch list
        </button>
      ) : (
        <Link to="/auth/login" className="text-sm underline">
          Login to add to watch list
        </Link>
      )}
    </div>
  );
};
export default StockCard;
