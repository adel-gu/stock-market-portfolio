import { useState, useEffect } from 'react';
import useGetStocks from '../api/stocks.api';
import StockCard from '../components/StockCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [query, setQuery] = useState<string>('');
  const [searchInput, setSearchInput] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const data = useGetStocks(query, page);

  useEffect(() => {
    const handler = setTimeout(() => {
      setQuery(searchInput);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchInput, query]);

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const handlePageChange = (page: number) => {
    console.log('PAGE: ', page);
    setPage(page);
  };

  return (
    <div className="flex flex-col items-center gap-5 pt-8">
      <h1 className="text-5xl font-bold text-blue-500">
        Stock Market MERN app.
      </h1>
      <div className="ml-auto w-1/3 mt-12">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Search by company name..."
          onChange={handleOnChange}
        />
      </div>
      <div className="w-full grid gap-5">
        {data?.stocks &&
          data.stocks.map((stock) => (
            <StockCard key={stock._id} stock={stock} />
          ))}
      </div>
      <Pagination
        page={page}
        pages={data?.pages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default Home;
