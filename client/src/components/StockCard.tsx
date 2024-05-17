import { IStock } from '../api/stocks.api';

interface Props {
  stock: IStock;
}

const StockCard = ({ stock }: Props) => {
  const getRandomColor = () => {
    const colors = ['text-[#FF0000]', 'text-[#00FF00]']; // Red and Green
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div className="border-4 border-blue-300 flex justify-between items-center p-5 rounded-md shadow-md">
      <h1 className="text-blue-600 text-xl font-bold">
        {stock.company} - {stock.symbol}
      </h1>
      <p className={`font-bold text-2xl ${getRandomColor()}`}>
        {stock.initial_price.toString()}
      </p>
      <button className="bg-green-600 text-white font-bold py-2 px-5 rounded-md">
        Add to My Watchlist
      </button>
    </div>
  );
};
export default StockCard;
