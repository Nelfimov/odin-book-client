import { Post } from './post'
import { Comment } from './comment'
import { User } from './user'

export interface Data {
  success: boolean
  token?: string
  message?: string
  post?: Post
  posts?: Post[]
  comment?: Comment
  comments?: Comment[]
  user?: User
}
