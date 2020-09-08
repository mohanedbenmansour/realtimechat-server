import * as mongoose from 'mongoose';
export const owner = new mongoose.Schema({
  name: String,
  email: String,
  userId: String,
});

export const PostSchema = new mongoose.Schema({
  owner: owner,
  description: String,
  price: String,
  image: String,
});
