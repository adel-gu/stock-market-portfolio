import { Request, Response } from 'express';
import Stock from '../models/stock.model';
import WatchList from '../models/watchlist.model';

const getStocks = async (req: Request, res: Response) => {
  try {
    let queryObj = { ...req.query };

    const excludeParams = ['page', 'limit', 'sort'];
    excludeParams.forEach((param) => delete queryObj[param]);

    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 4;
    const skip = (page - 1) * limit;

    const sort = req.query.sort
      ? (req.query.sort as string).split(',').join('')
      : 'initial_price';

    const queryStrRegex = queryObj.company
      ? RegExp(queryObj.company as string, 'i')
      : '';

    const query = Stock.find({ company: { $regex: queryStrRegex } })
      .skip(skip)
      .limit(limit)
      .sort(sort);
    const total = await Stock.countDocuments();
    const pages = Math.ceil(total / limit);

    const stocks = await query;
    res.status(200).json({
      status: 'success',
      data: {
        total,
        pages,
        page,
        stocks,
      },
    });
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const addStockToWatchList = async (req: Request, res: Response) => {
  try {
    const { stockId } = req.body;
    const stock = await Stock.findById(stockId);
    if (!stock)
      return res
        .status(404)
        .json({ status: 'error', message: 'Stock not found' });

    let watchList = await WatchList.findOne({ userId: req.userId });

    if (watchList) {
      if (watchList.stocks.includes(stockId))
        return res.status(500).json({
          status: 'fail',
          message: 'Stock is already added to user watch list',
        });

      watchList = await WatchList.findOneAndUpdate(
        { userId: req.userId },
        { $addToSet: { stocks: stockId } },
        { new: true },
      );
    } else {
      watchList = await WatchList.create({
        userId: req.userId,
        stocks: [stockId],
      });
    }

    res
      .status(200)
      .json({ status: 'success', message: 'Stock Added successfully' });
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getWatchList = async (req: Request, res: Response) => {
  try {
    const watchList = await WatchList.findOne({ userId: req.userId }).populate(
      'stocks',
    );
    res.status(200).json({ status: 'Success', data: watchList });
  } catch (error) {
    console.log('Error 💥: ', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

export default {
  getStocks,
  addStockToWatchList,
  getWatchList,
};
