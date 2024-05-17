import express from 'express';

const router = express.Router();

router.route('/', stockController.getStocks);

export default router;
