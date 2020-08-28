import * as mongoose from 'mongoose';

export const PostSchema = new mongoose.Schema({
  owner: String,
  description: String,
  price: String,
  image: String,
});
