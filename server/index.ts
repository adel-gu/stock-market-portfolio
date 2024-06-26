import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import stockRouter from './routes/stock.router';
import userRouter from './routes/user.router';

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

const PORT = process.env.PORT || 7000;
const NODE_ENV = process.env.NODE_NEV;
const DB_CONNECTION_URI =
  NODE_ENV === 'prod'
    ? process.env.DB_CONNECTION_PROD_URI
    : process.env.DB_CONNECTION_DEV_URI;

const connectToDataBase = async () => {
  try {
    await mongoose.connect(DB_CONNECTION_URI as string);
    console.log('Database connected successfully 🚀');
  } catch (error) {
    console.log('Error 💥: ', error);
  }
};

app.use('/api/v1/stocks', stockRouter);
app.use('/api/v1/users', userRouter);

app.listen(PORT, () => {
  connectToDataBase();
  console.log(`App running on port: ${PORT}`);
});
