import { User } from './user';
import { Like } from './like';

export interface Post {
  _id: string;
  text: string;
  title: string;
  createdAt: Date;
  author: User;
  likes: Like;
  textPreview: string;
}
