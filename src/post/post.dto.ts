import { User } from 'src/types/user';
export interface owner {
  name: string;
  email: string;
  userId: string;
}
export interface PostDTO {
  price: string;
  description: string;
  image: string;
  owner: owner;
}
export type UpdatePostDTO = Partial<PostDTO>;
