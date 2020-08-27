import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  description: String,
  price: String,
  image: String,
});
