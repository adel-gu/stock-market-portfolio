import useGetStocks from '../api/stocks.api';
import StockCard from '../components/StockCard';

const Home = () => {
  const stocks = useGetStocks();

  return (
    <div className="flex flex-col items-center gap-5 pt-8">
      <h1 className="text-5xl font-bold text-blue-500">
        Stock Market MERN app.
      </h1>
      <h1 className="text-3xl font-bold text-blue-300">Stocks</h1>
      <div className="w-full grid gap-5">
        {stocks &&
          stocks.map((stock) => <StockCard key={stock._id} stock={stock} />)}
      </div>
    </div>
  );
};
export default Home;
