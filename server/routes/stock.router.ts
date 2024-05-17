import express from 'express';
import stockController from '../controllers/stock.controller';

const router = express.Router();

router.route('/').get(stockController.getStocks);

export default router;
