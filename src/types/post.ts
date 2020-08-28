import { Document } from 'mongoose';
export interface Post extends Document {
  readonly owner: string;
  readonly description: string;
  readonly price: string;
  readonly image: string;
}
