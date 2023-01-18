import { User } from './user'

export interface Comment {
  _id: string
  post: string
  text: string
  author: User
  createdAt: Date
  updatedAt: Date
}
