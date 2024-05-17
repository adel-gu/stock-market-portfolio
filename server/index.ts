import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.DB_CONNECTION_STRING_URI || 7000;
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

app.listen(PORT, () => {
  connectToDataBase();
  console.log(`App running on port: ${PORT}`);
});
