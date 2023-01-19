import { Post } from './post'
import { User } from './user'

export interface Comment {
  _id: string
  post: Post
  text: string
  author: User
  createdAt: Date
  updatedAt: Date
}
