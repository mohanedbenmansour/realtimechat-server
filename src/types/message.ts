import { Document } from 'mongoose';

export interface Message extends Document {
  sender: string;
  receiver: string;
  message: string;
}
