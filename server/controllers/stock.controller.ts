import { Request, Response } from 'express';
import Stock from '../models/stock.model';

const getStocks = async (req: Request, res: Response) => {
  try {
    const stocks = await Stock.find();
    res.status(200).json({ status: 'success', data: { stocks } });
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  getStocks,
};
