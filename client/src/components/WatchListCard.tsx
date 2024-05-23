import { IStock } from '../api/stocks.api';

interface Props {
  stock: IStock;
}
const WatchListCard = ({ stock }: Props) => {
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h5 className="mb-2 text-sm font-bold tracking-tight text-blue-600">
        {stock.symbol}
      </h5>

      <h3 className="mb-2 text-2xl font-semibold tracking-tight text-gray-900">
        {stock.company}
        <span className="block text-sm">
          <span>Initial Price: </span>
          <span className="text-blue-600">
            {stock.initial_price.toString()} $
          </span>
        </span>
      </h3>

      <p className="mb-3 font-normal text-gray-500 line-clamp-4">
        {stock.description}
      </p>
      <div className="w-full flex justify-between items-center text-gray-400 text-sm">
        <span>Price 2002: {stock.price_2002.toString()} $</span>
        <span>Price 2007: {stock.price_2007.toString()} $</span>
      </div>
    </div>
  );
};
export default WatchListCard;
