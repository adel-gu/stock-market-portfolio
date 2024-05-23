import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuthContext } from '../context/AuthContext';

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

export const useGetStocks = (
  query: string,
  page: number,
): IData | undefined => {
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

export const useAddStockToWatchList = () => {
  const { showToast } = useAuthContext();
  const AddStockToWatchListRequest = async (id: string) => {
    const response = await fetch(`${API_BASE_URL}/add-watch-list`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ stockId: id }),
    });

    if (!response.ok)
      throw new Error("Can't add an existing stock to watch list");

    return response.json();
  };

  const { mutateAsync: AddStockToWatchList } = useMutation({
    mutationKey: ['addStockToWatchList'],
    mutationFn: AddStockToWatchListRequest,
    onSuccess: () => {
      showToast({
        message: 'Stock added to watch list successfully',
        type: 'SUCCESS',
      });
    },
    onError: (err: Error) => {
      showToast({
        message: err.message,
        type: 'ERROR',
      });
    },
  });

  return { AddStockToWatchList };
};
