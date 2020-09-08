import { User } from 'src/types/user';
export interface friendDTO {
  name: string;
  email: string;
  userId: string;
}
export interface UserDTO {
  name: string;
  email: string;
  password: string;
  friends: [friendDTO];
}
