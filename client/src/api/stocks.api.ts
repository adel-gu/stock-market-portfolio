import { useQuery } from '@tanstack/react-query';

export interface IStock {
  _id: string;
  company: String;
  description?: String;
  initial_price: Number;
  price_2002: Number;
  price_2007: Number;
  symbol?: String;
}

interface IResponse {
  status: string;
  data: {
    stocks: IStock[];
  };
}

const API_BASE_URL = 'http://localhost:5050/api/v1/' + 'stocks';

const useGetStocks = (query: string): IStock[] | undefined => {
  const getStocksRequest = async (): Promise<IResponse> => {
    const response = await fetch(`${API_BASE_URL}/?company=${query}`);

    if (!response.ok) throw new Error('Error fetching all stocks');

    return response.json();
  };

  const { data } = useQuery({
    queryKey: ['getAllStocks', query],
    queryFn: () => getStocksRequest(),
  });

  return data?.data.stocks;
};

export default useGetStocks;
