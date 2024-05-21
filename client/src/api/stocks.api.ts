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

interface IData {
  stocks?: IStock[];
  pages?: number;
}

interface IResponse {
  status: string;
  data: IData;
}

const API_BASE_URL = 'http://localhost:5050/api/v1/' + 'stocks';

const useGetStocks = (query: string, page: number): IData | undefined => {
  const getStocksRequest = async (): Promise<IResponse> => {
    const response = await fetch(
      `${API_BASE_URL}/?company=${query}&page=${page}`,
    );

    if (!response.ok) throw new Error('Error fetching all stocks');

    return response.json();
  };

  const { data } = useQuery({
    queryKey: ['getAllStocks', query, page],
    queryFn: () => getStocksRequest(),
  });

  return { stocks: data?.data.stocks, pages: data?.data.pages };
};

export default useGetStocks;
