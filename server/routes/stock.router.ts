import express from 'express';
import stockController from '../controllers/stock.controller';
import authController from '../controllers/auth.controller';

const router = express.Router();

router.route('/').get(stockController.getStocks);

router.use(authController.protect);
router.route('/add-watch-list').post(stockController.addStockToWatchList);
router.route('/watch-list').get(stockController.getWatchList);

export default router;
