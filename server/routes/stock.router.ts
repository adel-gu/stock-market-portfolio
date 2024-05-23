import express from 'express';
import stockController from '../controllers/stock.controller';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.route('/').get(stockController.getStocks);
router
  .route('/add-watch-list')
  .post(authController.protect, stockController.addStockToWatchList);

export default router;
