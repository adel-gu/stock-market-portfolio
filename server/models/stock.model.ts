import mongoose, { Document, Types } from 'mongoose';

interface IStock extends Document {
  company: String;
  description?: String;
  initial_price: Number;
  price_2002: Number;
  price_2007: Number;
  symbol?: String;
}

const stockSchema = new mongoose.Schema<IStock>({
  company: { type: String, required: [true, 'company field is required'] },
  description: String,
  initial_price: {
    type: Number,
    required: [true, 'initial price is required'],
    min: 1,
  },
  price_2002: {
    type: Number,
    required: [true, 'price_2002 field is required'],
    min: 1,
  },
  price_2007: {
    type: Number,
    required: [true, 'price_2007 field is required'],
    min: 1,
  },
  symbol: String,
});

const Stock = mongoose.model<IStock>('Stock', stockSchema);

export default Stock;
