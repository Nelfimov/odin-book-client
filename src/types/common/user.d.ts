import { Friend } from './friend';

export interface User {
  _id: string;
  username: string;
  email: string;
  password: string;
  image: string;
  friends: Friend[];
}
