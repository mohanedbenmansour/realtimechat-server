import { Document } from 'mongoose';
import { User } from './user';
export interface Post extends Document {
  readonly owner: User;
  readonly description: string;
  readonly price: string;
  readonly image: string;
}
