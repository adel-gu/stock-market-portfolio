import mongoose, { Types } from 'mongoose';

interface IWatchList {
  userId: Types.ObjectId;
  stocks: Types.ObjectId[];
}

const watchListSchema = new mongoose.Schema<IWatchList>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  stocks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Stock' }],
});

const WatchList = mongoose.model<IWatchList>('WatchList', watchListSchema);
export default WatchList;
