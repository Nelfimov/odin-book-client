import { User } from './user'

export interface Friend {
  _id: string
  status: string
  user: User
}
