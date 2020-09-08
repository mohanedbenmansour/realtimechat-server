import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  sender: String,
  receiver: String,
  message: String,
});
