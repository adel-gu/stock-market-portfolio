import StockCard from '../components/StockCard';

const Home = () => {
  return (
    <div className="flex flex-col items-center gap-5 pt-8">
      <h1 className="text-5xl font-bold text-blue-500">
        Stock Market MERN app.
      </h1>
      <h1 className="text-3xl font-bold text-blue-300">Stocks</h1>
      <div className="w-full">
        <StockCard />
      </div>
    </div>
  );
};
export default Home;
