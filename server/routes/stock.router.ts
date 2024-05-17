import express from 'express';

const router = express.Router();

router.route('/').get(stockController.getStocks);

export default router;
